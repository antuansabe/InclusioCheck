'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { AnalysisResponse } from '@/types/api';
import { isApiError } from '@/types/api';

interface AnalyzerProps {
  initialText?: string;
}

export default function Analyzer({ initialText = '' }: AnalyzerProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Agregar contador de caracteres
  const charCount = text.length;
  const maxChars = 500;

  // Actualizar texto cuando cambia initialText
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  // Función para analizar texto
  const handleAnalyze = async () => {
    // Reset estados
    setError(null);
    setResult(null);

    // Validaciones
    if (!text.trim()) {
      setError('Por favor ingresa un texto para analizar');
      return;
    }

    if (text.length > maxChars) {
      setError(`El texto no puede exceder ${maxChars} caracteres`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok || isApiError(data)) {
        setError(data.error || 'Error al analizar el texto');
        return;
      }

      setResult(data);
    } catch (err) {
      setError('Error de conexión. Por favor intenta nuevamente.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para limpiar
  const handleClear = () => {
    setText('');
    setResult(null);
    setError(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analizador de Texto</CardTitle>
        <CardDescription>
          Ingresa el texto que quieres analizar y obtén resultados en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Text Input */}
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Escribe o pega aquí el texto que deseas analizar..."
              className="min-h-[150px] resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={maxChars}
              disabled={isLoading}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {charCount}/{maxChars}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAnalyze}
              className="flex-1"
              disabled={isLoading || !text.trim()}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analizando...
                </>
              ) : (
                'Analizar Texto'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isLoading}
            >
              Limpiar
            </Button>
          </div>
        </div>

        {/* Mostrar Error */}
        {error && (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">⚠️ {error}</p>
          </div>
        )}

        {/* Mostrar Resultado */}
        {result && (
          <div className="space-y-4 mt-6">
            <div className={`p-6 border rounded-lg ${
              result.predictedClass === 0
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}>
              <h3 className="font-semibold text-lg mb-2">
                {result.predictedClass === 0 ? '✅ Lenguaje Inclusivo' : '⚠️ Discurso de Odio'}
              </h3>
              <p className="text-sm mb-4">{result.message}</p>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Lenguaje Inclusivo</span>
                  <span className="font-semibold">
                    {(result.probabilities["✅ Lenguaje Inclusivo"] * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.probabilities["✅ Lenguaje Inclusivo"] * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-sm mt-3">
                  <span>Discurso de Odio</span>
                  <span className="font-semibold">
                    {(result.probabilities["⚠️ Discurso de Odio/Excluyente"] * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.probabilities["⚠️ Discurso de Odio/Excluyente"] * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <Alert className="mt-4">
          <AlertDescription className="text-xs">
            💡 <strong>Nota:</strong> Esta herramienta utiliza IA para detectar patrones de lenguaje.
            Los resultados son de apoyo y deben considerarse junto con el contexto y la intención.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
