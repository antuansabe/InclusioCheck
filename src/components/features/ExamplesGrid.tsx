'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TEXT_EXAMPLES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ExamplesGridProps {
  onSelectExample: (text: string) => void;
}

export default function ExamplesGrid({ onSelectExample }: ExamplesGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Casos de Uso Reales</CardTitle>
        <CardDescription>
          Explora escenarios del mundo real donde SinOdio puede ayudarte. Haz clic para analizar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEXT_EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => onSelectExample(example.text)}
              className={cn(
                "text-left p-4 border-2 rounded-xl transition-all duration-200",
                "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "group relative overflow-hidden",
                example.isHate
                  ? "border-red-200 hover:border-red-400 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                  : "border-green-200 hover:border-green-400 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-950"
              )}
            >
              {/* Header con icono y caso de uso */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {example.icon && (
                    <span className="text-xl" role="img" aria-label={example.useCase}>
                      {example.icon}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {example.useCase}
                  </span>
                </div>
                <span className="text-lg shrink-0" role="img" aria-label={example.isHate ? "hate speech" : "inclusive"}>
                  {example.isHate ? '❌' : '✅'}
                </span>
              </div>

              {/* Scenario */}
              {example.scenario && (
                <p className="text-xs text-muted-foreground mb-2 italic">
                  {example.scenario}
                </p>
              )}

              {/* Texto del ejemplo */}
              <p className="text-sm font-medium line-clamp-3 mb-3">
                {example.text}
              </p>

              {/* Category badge */}
              {example.category && (
                <span className={cn(
                  "inline-block px-2.5 py-1 text-xs font-medium rounded-full",
                  example.isHate
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                    : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                )}>
                  {example.category}
                </span>
              )}

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
