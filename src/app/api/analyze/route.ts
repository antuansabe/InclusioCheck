// src/app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@gradio/client';
import type { AnalysisResponse, ApiError } from '@/types/api';

// URL del Space v3 en HuggingFace
const SPACE_URL = "antonn-dromundo/SinOdio-HateSpeech-Detector";

// Timeouts más generosos para cold starts del Gradio Space
const CONNECTION_TIMEOUT = 90000; // 90 segundos para conectar (cold start puede tardar)
const PREDICTION_TIMEOUT = 90000; // 90 segundos para la predicción

// Helper para crear timeout promise
function timeoutPromise<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: La solicitud tardó demasiado. El servicio puede estar iniciándose, intenta de nuevo en unos segundos.')), timeoutMs)
    ),
  ]);
}

// Helper para retry con exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 2,
  baseDelay: number = 2000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      const delay = baseDelay * Math.pow(2, i);
      console.log(`⚠️  Intento ${i + 1} falló, reintentando en ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries reached');
}

export async function POST(request: NextRequest) {
  try {
    // Obtener el texto del body
    const { text } = await request.json();

    console.log('📝 Análisis solicitado para texto:', text.substring(0, 50) + '...');

    // Validación
    if (!text || typeof text !== 'string') {
      const error: ApiError = {
        error: 'Texto inválido',
        details: 'Debes proporcionar un texto válido para analizar'
      };
      return NextResponse.json(error, { status: 400 });
    }

    if (text.trim().length === 0) {
      const error: ApiError = {
        error: 'Texto vacío',
        details: 'El texto no puede estar vacío'
      };
      return NextResponse.json(error, { status: 400 });
    }

    if (text.length > 500) {
      const error: ApiError = {
        error: 'Texto muy largo',
        details: 'El texto no puede exceder 500 caracteres'
      };
      return NextResponse.json(error, { status: 400 });
    }

    console.log('🔌 Conectando con Gradio Space:', SPACE_URL);
    console.log('⏱️  Nota: Primera conexión puede tardar hasta 90 segundos (cold start)...');

    // Conectar con Gradio Client con timeout generoso para cold starts y retry
    const client = await retryWithBackoff(
      () => timeoutPromise(
        Client.connect(SPACE_URL),
        CONNECTION_TIMEOUT
      ),
      2 // Máximo 2 intentos
    );

    console.log('✅ Conexión establecida, enviando predicción...');

    // Hacer la predicción con timeout y retry
    // IMPORTANTE: Gradio Space usa parámetros posicionales (array), NO nombrados (objeto)
    const result = await retryWithBackoff(
      () => timeoutPromise(
        client.predict("/detectar_odio", [
          text  // Parámetro posicional: el texto a analizar
        ]),
        PREDICTION_TIMEOUT
      ),
      2 // Máximo 2 intentos
    );

    console.log('📊 Respuesta recibida de Gradio:', JSON.stringify(result.data));

    // Procesar la respuesta de Gradio
    // El resultado es un array: [clasificación, número, mensaje]
    // Ejemplos:
    //   - Sin hate: ["NO CONTIENE HATE SPEECH", 1, "Este texto no contiene discurso de odio aparente."]
    //   - Con hate: ["HATE SPEECH DETECTADO", 1, "Este texto contiene discurso de odio..."]
    const gradioResponse = result.data as [string, number, string];

    const [clasificacion, numero, message] = gradioResponse;

    console.log('🔍 Clasificación:', clasificacion);
    console.log('🔢 Número:', numero);
    console.log('💬 Mensaje:', message);

    // Determinar si es hate speech basándonos en la CLASIFICACIÓN (no en el número)
    // El número siempre es 1, la clasificación es lo que distingue los casos
    // Buscar "HATE SPEECH DETECTADO" o verificar que NO contenga "NO CONTIENE"
    const isHateSpeech = clasificacion.includes("HATE SPEECH DETECTADO") ||
                         (clasificacion.includes("HATE SPEECH") && !clasificacion.includes("NO CONTIENE"));

    // predictedClass: 0 = Lenguaje Inclusivo, 1 = Hate Speech
    const predictedClass = isHateSpeech ? 1 : 0;

    // Para las probabilidades, usamos valores aproximados basados en la confianza del modelo
    // El modelo v3 tiene ~92% recall y ~83% precision
    const confidence = 0.90; // Valor de confianza alto

    const hateProb = isHateSpeech ? confidence : (1 - confidence);
    const inclusiveProb = isHateSpeech ? (1 - confidence) : confidence;

    console.log('✨ Análisis completado - Clase:', predictedClass, 'Hate:', isHateSpeech);

    // Construir respuesta
    const response: AnalysisResponse = {
      probabilities: {
        "✅ Lenguaje Inclusivo": inclusiveProb,
        "⚠️ Discurso de Odio/Excluyente": hateProb
      },
      message: message || '',
      predictedClass,
      confidence
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Error en análisis:', error);

    // Determinar el tipo de error para dar mejor feedback
    let errorMessage = 'Error al procesar el texto';
    let errorDetails = 'Error desconocido';

    if (error instanceof Error) {
      errorDetails = error.message;

      // Personalizar mensajes según el tipo de error
      if (error.message.includes('Timeout')) {
        errorMessage = 'El servicio está tardando demasiado en responder';
        errorDetails = 'El modelo de IA puede estar iniciándose (cold start). Por favor, espera 30 segundos e intenta nuevamente.';
      } else if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'No se pudo conectar con el servicio';
        errorDetails = 'El servicio de análisis no está disponible temporalmente. Intenta de nuevo en unos minutos.';
      } else if (error.message.includes('predict')) {
        errorMessage = 'Error al ejecutar la predicción';
        errorDetails = 'Hubo un problema al analizar el texto. Verifica que el texto sea válido e intenta nuevamente.';
      }
    }

    const apiError: ApiError = {
      error: errorMessage,
      details: errorDetails
    };

    return NextResponse.json(apiError, { status: 500 });
  }
}
