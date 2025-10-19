// src/lib/types.ts

/**
 * Respuesta de la API de HuggingFace
 */
export interface HuggingFaceResponse {
  label: 'LABEL_0' | 'LABEL_1';
  score: number;
}

/**
 * Resultado procesado para mostrar en UI
 */
export interface AnalysisResult {
  isHateSpeech: boolean;
  confidence: number;
  label: string;
  timestamp: Date;
}

/**
 * Estado del análisis
 */
export type AnalysisState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: AnalysisResult }
  | { status: 'error'; error: string };

/**
 * Ejemplo de texto para probar
 */
export interface TextExample {
  text: string;
  isHate: boolean;
  category?: string;
  useCase?: string; // Caso de uso (ej: "WhatsApp", "Twitter", etc.)
  scenario?: string; // Descripción del escenario
  icon?: string; // Emoji del caso de uso
}

/**
 * Métricas del modelo
 */
export interface ModelMetrics {
  accuracy: number;
  f1Score: number;
  precision: number;
  recall: number;
}

/**
 * Props genéricos
 */
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Respuesta de nuestra API /api/analyze
 */
export interface APIAnalysisResponse {
  isHateSpeech: boolean;
  confidence: number;
  label: string;
  timestamp: string;
}

/**
 * Respuesta de error de la API
 */
export interface APIErrorResponse {
  error: string;
  details?: string;
}

/**
 * Request body para /api/analyze
 */
export interface AnalyzeRequest {
  text: string;
}
