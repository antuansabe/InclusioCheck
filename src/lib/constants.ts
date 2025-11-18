// src/lib/constants.ts

import type { TextExample, ModelMetrics } from './types';

/**
 * Información del modelo
 */
export const MODEL_INFO = {
  name: 'SinOdio-BETO-HateSpeech-Detector-v3',
  version: 'v3',
  owner: 'antonn-dromundo',
  fullName: 'antonn-dromundo/SinOdio-BETO-HateSpeech-Detector-v3',
  huggingFaceUrl: 'https://huggingface.co/antonn-dromundo/SinOdio-BETO-HateSpeech-Detector-v3',
  gradioSpace: 'antonn-dromundo/SinOdio-HateSpeech-Detector',
  gradioSpaceUrl: 'https://huggingface.co/spaces/antonn-dromundo/SinOdio-HateSpeech-Detector',
} as const;

/**
 * Métricas del modelo v3
 * Mejoras significativas respecto a v1:
 * - Accuracy: +14.03% (de 77.82% a 91.85%)
 * - F1 Score: +20.81% (de 0.6619 a 0.87)
 * - Precision: +22.34% (de 60.96% a 83.30%)
 * - Recall: +18.63% (de 72.40% a 91.03%)
 */
export const MODEL_METRICS: ModelMetrics = {
  accuracy: 91.85,
  f1Score: 87.00,
  precision: 83.30,
  recall: 91.03,
};

/**
 * Datos de entrenamiento del modelo v3
 */
export const TRAINING_DATA = {
  totalExamples: 35000,
  baseModel: 'BETO (BERT para español)',
  parameters: '110M',
  modelSize: '439 MB',
  trainingTime: '~30 minutos',
  hardware: 'NVIDIA T4 (Google Colab Pro)',
  epochs: 2,
  learningRate: 2e-5,
  batchSize: 16,
  maxSequenceLength: 128,
} as const;

/**
 * Ejemplos de texto con casos de uso reales
 * Incluye casos obvios y claros para demostrar la detección del modelo
 */
export const TEXT_EXAMPLES: TextExample[] = [
  {
    text: 'Me encanta trabajar con personas de todas las culturas. La diversidad enriquece nuestro equipo y nos hace más creativos.',
    isHate: false,
    category: 'Contenido inclusivo',
    useCase: 'Redes Sociales',
    scenario: 'Post corporativo',
    icon: '✅',
  },
  {
    text: 'Los inmigrantes vienen a quitarnos el trabajo y destrozan nuestro país. Hay que echarlos a todos de aquí.',
    isHate: true,
    category: 'Xenofobia',
    useCase: 'Moderación',
    scenario: 'Comentario reportado',
    icon: '⚠️',
  },
  {
    text: 'Las mujeres son inferiores a los hombres y solo sirven para estar en la cocina. No pueden hacer trabajos importantes.',
    isHate: true,
    category: 'Sexismo',
    useCase: 'Chat',
    scenario: 'Mensaje ofensivo',
    icon: '🚫',
  },
  {
    text: 'Respeto todas las orientaciones sexuales. El amor es amor y cada persona merece ser feliz con quien elija.',
    isHate: false,
    category: 'Contenido inclusivo',
    useCase: 'Twitter/X',
    scenario: 'Tweet de apoyo',
    icon: '🏳️‍🌈',
  },
  {
    text: 'Los gitanos son todos ladrones y sucios. No quiero que vivan en mi barrio ni cerca de mi familia.',
    isHate: true,
    category: 'Racismo',
    useCase: 'Community Manager',
    scenario: 'Comentario flaggeado',
    icon: '❌',
  },
  {
    text: 'En nuestra organización valoramos la igualdad de oportunidades. Todos merecen un trato justo sin importar su origen o identidad.',
    isHate: false,
    category: 'Contenido inclusivo',
    useCase: 'LinkedIn',
    scenario: 'Publicación empresarial',
    icon: '💼',
  },
];

/**
 * Configuración de la aplicación
 */
export const APP_CONFIG = {
  name: 'SinOdio',
  description: 'Detector de discurso de odio especializado en español latinoamericano con IA',
  tagline: 'Protegiendo la dignidad humana con IA',
  subtitle: 'Detecta hate speech explícito y sutil en español',
  author: 'Antonio Dromundo',
  email: 'antuansabe@gmail.com',
  repository: 'https://github.com/antuansabe/SinOdio',
  maxTextLength: 500,
  version: 'v3',
  license: 'Apache 2.0',
  language: 'es',
  region: 'LATAM',
} as const;

/**
 * URLs y enlaces
 */
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/antonndromundo/',
  github: 'https://github.com/antuansabe',
  huggingface: 'https://huggingface.co/antonn-dromundo',
} as const;
