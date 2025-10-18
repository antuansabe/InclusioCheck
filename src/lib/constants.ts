// src/lib/constants.ts

import type { TextExample, ModelMetrics } from './types';

/**
 * Información del modelo
 */
export const MODEL_INFO = {
  name: 'InclusioCheck-BETO-HateSpeech',
  owner: 'antonn-dromundo',
  fullName: 'antonn-dromundo/InclusioCheck-BETO-HateSpeech',
  huggingFaceUrl: 'https://huggingface.co/antonn-dromundo/InclusioCheck-BETO-HateSpeech',
} as const;

/**
 * Métricas del modelo
 */
export const MODEL_METRICS: ModelMetrics = {
  accuracy: 82.02,
  f1Score: 82.28,
  precision: 77.73,
  recall: 88.40,
};

/**
 * Ejemplos de texto para probar
 */
export const TEXT_EXAMPLES: TextExample[] = [
  {
    text: 'Me encanta la diversidad cultural de mi ciudad',
    isHate: false,
    category: 'positive',
  },
  {
    text: 'Todos los inmigrantes son delincuentes',
    isHate: true,
    category: 'xenophobia',
  },
  {
    text: 'Las mujeres merecen igualdad de oportunidades',
    isHate: false,
    category: 'positive',
  },
  {
    text: 'Los homosexuales son una aberración',
    isHate: true,
    category: 'homophobia',
  },
  {
    text: 'Respeto todas las religiones y culturas',
    isHate: false,
    category: 'positive',
  },
  {
    text: 'Los musulmanes son todos terroristas',
    isHate: true,
    category: 'islamophobia',
  },
];

/**
 * Configuración de la aplicación
 */
export const APP_CONFIG = {
  name: 'InclusioCheck',
  description: 'Detector de Lenguaje de Odio en Español con IA',
  author: 'Antonio Dromundo',
  repository: 'https://github.com/tu-usuario/inclusiocheck',
  maxTextLength: 500,
} as const;

/**
 * URLs y enlaces
 */
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/antonndromundo/',
  github: 'https://github.com/antuansabe',
  huggingface: 'https://huggingface.co/antonn-dromundo',
} as const;
