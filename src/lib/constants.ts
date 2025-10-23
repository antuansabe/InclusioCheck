// src/lib/constants.ts

import type { TextExample, ModelMetrics } from './types';

/**
 * Información del modelo
 */
export const MODEL_INFO = {
  name: 'SinOdio-BETO-HateSpeech',
  owner: 'antonn-dromundo',
  fullName: 'antonn-dromundo/SinOdio-BETO-HateSpeech',
  huggingFaceUrl: 'https://huggingface.co/antonn-dromundo/SinOdio-BETO-HateSpeech',
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
  description: 'Detector de lenguaje de odio con inteligencia artificial',
  tagline: 'Tecnología para comunicar sin odio',
  author: 'Antonio Dromundo',
  repository: 'https://github.com/antuansabe/SinOdio',
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
