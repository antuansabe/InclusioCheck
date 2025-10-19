'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';
import type { AnalysisResult, AnalysisState } from '@/lib/types';
import ResultCard from './ResultCard';

interface AnalyzerProps {
  initialText?: string;
}

export default function Analyzer({ initialText = '' }: AnalyzerProps) {
  const [text, setText] = useState(initialText);
  const [analysisState, setAnalysisState] = useState<AnalysisState>({ status: 'idle' });

  // Actualizar texto cuando cambia initialText
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setAnalysisState({ status: 'error', error: 'Por favor ingresa un texto' });
      return;
    }

    if (text.length > APP_CONFIG.maxTextLength) {
      setAnalysisState({
        status: 'error',
        error: `El texto no puede exceder ${APP_CONFIG.maxTextLength} caracteres`
      });
      return;
    }

    // Iniciar loading
    setAnalysisState({ status: 'loading' });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejar errores específicos
        if (response.status === 503) {
          setAnalysisState({
            status: 'error',
            error: '⏳ El modelo está cargando. Espera 20 segundos e intenta de nuevo.'
          });
          return;
        }

        setAnalysisState({
          status: 'error',
          error: data.error || 'Error al analizar el texto'
        });
        return;
      }

      // Éxito - convertir timestamp de string a Date
      const result: AnalysisResult = {
        ...data,
        timestamp: new Date(data.timestamp)
      };

      setAnalysisState({ status: 'success', data: result });

    } catch (error) {
      console.error('Error en análisis:', error);
      setAnalysisState({
        status: 'error',
        error: 'Error de conexión. Verifica tu internet e intenta de nuevo.'
      });
    }
  };

  const isLoading = analysisState.status === 'loading';
  const result = analysisState.status === 'success' ? analysisState.data : null;
  const error = analysisState.status === 'error' ? analysisState.error : null;

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
        <div className="space-y-2">
          <Textarea
            placeholder="Ejemplo: 'Me encanta la diversidad cultural de mi ciudad'"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] resize-none text-base"
            maxLength={APP_CONFIG.maxTextLength}
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Máximo {APP_CONFIG.maxTextLength} caracteres</span>
            <span className={text.length > APP_CONFIG.maxTextLength * 0.9 ? 'text-orange-500 font-medium' : ''}>
              {text.length} / {APP_CONFIG.maxTextLength}
            </span>
          </div>
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Analizar Texto
            </>
          )}
        </Button>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="animate-in fade-in duration-300">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Result */}
        {result && (
          <div className="pt-4 border-t">
            <ResultCard result={result} />
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
