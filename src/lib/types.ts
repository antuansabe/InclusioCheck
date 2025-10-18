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
