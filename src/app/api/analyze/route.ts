import { NextRequest, NextResponse } from 'next/server';

// Tipos de respuesta
interface HuggingFaceAPIResponse {
  label: string;
  score: number;
}

interface AnalysisResponse {
  isHateSpeech: boolean;
  confidence: number;
  label: string;
  timestamp: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

// Configuración
const HF_API_URL = 'https://api-inference.huggingface.co/models';
const MODEL_ID = process.env.NEXT_PUBLIC_MODEL_ID;
const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

export async function POST(request: NextRequest) {
  try {
    // Validar que existe el token
    if (!HF_TOKEN) {
      console.error('HuggingFace token no configurado');
      return NextResponse.json(
        { error: 'Configuración de API inválida' } as ErrorResponse,
        { status: 500 }
      );
    }

    // Validar que existe el modelo
    if (!MODEL_ID) {
      console.error('Model ID no configurado');
      return NextResponse.json(
        { error: 'Configuración de modelo inválida' } as ErrorResponse,
        { status: 500 }
      );
    }

    // Parsear el body
    const body = await request.json();
    const { text } = body;

    // Validar input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Texto inválido o vacío' } as ErrorResponse,
        { status: 400 }
      );
    }

    // Validar longitud
    if (text.length > 500) {
      return NextResponse.json(
        { error: 'El texto excede el límite de 500 caracteres' } as ErrorResponse,
        { status: 400 }
      );
    }

    console.log('Analizando texto:', text.substring(0, 50) + '...');

    // Llamar a HuggingFace API
    const response = await fetch(`${HF_API_URL}/${MODEL_ID}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    // Manejar errores de HF
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de HuggingFace:', response.status, errorText);

      // Errores comunes
      if (response.status === 503) {
        return NextResponse.json(
          {
            error: 'El modelo está cargando. Intenta de nuevo en 20 segundos.',
            details: 'Model is loading'
          } as ErrorResponse,
          { status: 503 }
        );
      }

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Token de API inválido' } as ErrorResponse,
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          error: 'Error al comunicarse con el modelo de IA',
          details: errorText
        } as ErrorResponse,
        { status: response.status }
      );
    }

    // Parsear respuesta
    const data = await response.json() as HuggingFaceAPIResponse[][];

    // HuggingFace devuelve un array de arrays
    if (!data || !data[0] || !data[0][0]) {
      console.error('Formato de respuesta inesperado:', data);
      return NextResponse.json(
        { error: 'Formato de respuesta inválido del modelo' } as ErrorResponse,
        { status: 500 }
      );
    }

    // Obtener la predicción con mayor score
    const predictions = data[0];
    const hateSpeechPrediction = predictions.find(p => p.label === 'LABEL_1');
    const noHatePrediction = predictions.find(p => p.label === 'LABEL_0');

    // Determinar el resultado
    const isHateSpeech = hateSpeechPrediction && hateSpeechPrediction.score > 0.5;
    const confidence = Math.round(
      (isHateSpeech ? hateSpeechPrediction!.score : noHatePrediction!.score) * 100
    );

    // Construir respuesta
    const result: AnalysisResponse = {
      isHateSpeech: !!isHateSpeech,
      confidence,
      label: isHateSpeech ? 'Hate Speech' : 'No Hate Speech',
      timestamp: new Date().toISOString(),
    };

    console.log('Resultado:', result);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error en API route:', error);
    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      } as ErrorResponse,
      { status: 500 }
    );
  }
}

// Configuración de runtime (opcional, para Vercel)
export const runtime = 'edge';
