// src/types/api.ts
export interface PredictionResult {
  label: string;
  confidence: number;
}

export interface AnalysisResponse {
  probabilities: {
    "✅ Lenguaje Inclusivo": number;
    "⚠️ Discurso de Odio/Excluyente": number;
  };
  message: string;
  predictedClass: 0 | 1;
  confidence: number;
}

export interface ApiError {
  error: string;
  details?: string;
}

export type ApiResponse = AnalysisResponse | ApiError;

// Type guard para verificar si es un error
export function isApiError(response: ApiResponse): response is ApiError {
  return 'error' in response;
}
