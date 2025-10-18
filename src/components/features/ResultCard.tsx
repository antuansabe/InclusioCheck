import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import type { AnalysisResult } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const { isHateSpeech, confidence } = result;

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Result Badge */}
      <Card
        className={cn(
          "border-2 transition-all duration-300",
          isHateSpeech
            ? "bg-red-50 border-red-300 dark:bg-red-950 dark:border-red-800"
            : "bg-green-50 border-green-300 dark:bg-green-950 dark:border-green-800"
        )}
      >
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            {isHateSpeech ? (
              <ShieldAlert className="h-12 w-12 text-red-600 dark:text-red-400" />
            ) : (
              <ShieldCheck className="h-12 w-12 text-green-600 dark:text-green-400" />
            )}
            <div className="flex-1">
              <h3 className={cn(
                "text-2xl font-bold mb-1",
                isHateSpeech
                  ? "text-red-700 dark:text-red-300"
                  : "text-green-700 dark:text-green-300"
              )}>
                {isHateSpeech ? 'Lenguaje de Odio Detectado' : 'Texto Inclusivo'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Confianza: {confidence}%
              </p>
            </div>
          </div>
          <Progress
            value={confidence}
            className={cn(
              "h-2 mt-4",
              isHateSpeech ? "[&>div]:bg-red-600" : "[&>div]:bg-green-600"
            )}
          />
        </CardContent>
      </Card>

      {/* Explanation Alert */}
      <Alert>
        <AlertDescription className="text-sm">
          {isHateSpeech ? (
            <>
              <strong>⚠️ Se detectó contenido potencialmente ofensivo.</strong> El modelo
              identificó elementos de lenguaje de odio. Considera reformular el mensaje
              con lenguaje más inclusivo y respetuoso.
            </>
          ) : (
            <>
              <strong>✅ El texto parece ser inclusivo.</strong> No se detectaron elementos
              de lenguaje de odio. Recuerda que el contexto cultural y la intención siempre
              son importantes en la comunicación.
            </>
          )}
        </AlertDescription>
      </Alert>

      {/* Metadata */}
      <div className="flex justify-between text-xs text-muted-foreground border-t pt-3">
        <span>Analizado: {new Date(result.timestamp).toLocaleString('es-ES')}</span>
        <span>Modelo: BETO (BERT español)</span>
      </div>
    </div>
  );
}
