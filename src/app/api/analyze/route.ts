// src/app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@gradio/client';
import type { AnalysisResponse, ApiError } from '@/types/api';

// URL de tu Space en HuggingFace
const SPACE_URL = "antonn-dromundo/SinOdio-Demo";

export async function POST(request: NextRequest) {
  try {
    // Obtener el texto del body
    const { text } = await request.json();

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

    // Conectar con Gradio Client
    const client = await Client.connect(SPACE_URL);

    // Hacer la predicción
    const result = await client.predict("/predict", {
      texto: text
    });

    // Procesar la respuesta de Gradio
    // El resultado viene en result.data
    const gradioResponse = result.data as any;

    // Gradio devuelve [prediction_object, message]
    const predictionObject = gradioResponse[0];
    const message = gradioResponse[1];

    // El objeto de predicción tiene: { label: string, confidences: Array }
    const confidences = predictionObject.confidences;

    // Extraer probabilidades del array de confidences
    let inclusiveProb = 0;
    let hateProb = 0;

    for (const conf of confidences) {
      if (conf.label === "✅ Lenguaje Inclusivo") {
        inclusiveProb = conf.confidence;
      } else if (conf.label === "⚠️ Discurso de Odio/Excluyente") {
        hateProb = conf.confidence;
      }
    }

    // Determinar clase predicha
    const predictedClass = inclusiveProb > hateProb ? 0 : 1;
    const confidence = Math.max(inclusiveProb, hateProb);

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
    console.error('Error en análisis:', error);

    const apiError: ApiError = {
      error: 'Error al procesar el texto',
      details: error instanceof Error ? error.message : 'Error desconocido'
    };

    return NextResponse.json(apiError, { status: 500 });
  }
}
