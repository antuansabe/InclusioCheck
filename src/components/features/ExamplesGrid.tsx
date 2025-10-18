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
        <CardTitle>Ejemplos de Prueba</CardTitle>
        <CardDescription>
          Haz clic en cualquier ejemplo para probarlo instantáneamente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {TEXT_EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => onSelectExample(example.text)}
              className={cn(
                "text-left p-4 border-2 rounded-lg transition-all duration-200",
                "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                example.isHate
                  ? "border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                  : "border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-950"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0" role="img" aria-label={example.isHate ? "hate speech" : "inclusive"}>
                  {example.isHate ? '❌' : '✅'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">
                    {example.text}
                  </p>
                  {example.category && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                      {example.category}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
