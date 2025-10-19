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
 * Incluye casos sutiles y ambiguos para demostrar el valor del detector
 */
export const TEXT_EXAMPLES: TextExample[] = [
  {
    text: 'Recibí este mensaje: "Me encanta trabajar con gente de diferentes culturas, cada día aprendo algo nuevo del equipo"',
    isHate: false,
    category: 'Contenido inclusivo',
    useCase: 'WhatsApp',
    scenario: 'Mensaje recibido',
    icon: '💬',
  },
  {
    text: 'Campaña: "Nuestro barrio está cambiando mucho últimamente... hay que proteger nuestras tradiciones y valores de siempre" - ¿Lo publico?',
    isHate: true,
    category: 'Xenofobia sutil',
    useCase: 'Community Manager',
    scenario: 'Borrador de publicación',
    icon: '📱',
  },
  {
    text: 'Tweet: "No soy machista, pero las mujeres son naturalmente más emocionales, por eso son mejores en trabajos de cuidado"',
    isHate: true,
    category: 'Sexismo encubierto',
    useCase: 'Twitter/X',
    scenario: 'Antes de tuitear',
    icon: '🐦',
  },
  {
    text: 'Comentario: "Respeto a todos, pero los niños necesitan un papá y una mamá, es lo natural. Solo quiero lo mejor para ellos"',
    isHate: true,
    category: 'Homofobia disfrazada',
    useCase: 'Moderación',
    scenario: 'Comentario reportado',
    icon: '⚠️',
  },
  {
    text: 'Post: "En nuestra empresa celebramos el talento sin importar género, origen, orientación o creencias. Todos son bienvenidos 🌈"',
    isHate: false,
    category: 'Contenido inclusivo',
    useCase: 'Redes Sociales',
    scenario: 'Publicación corporativa',
    icon: '📸',
  },
  {
    text: 'Chat: "Eres muy inteligente... para ser mujer latina jaja, lo digo como cumplido eh, no te ofendas"',
    isHate: true,
    category: 'Microagresión',
    useCase: 'Chat Gaming',
    scenario: 'Reporte de jugador',
    icon: '🎮',
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
