'use client';

import { Badge } from "@/components/ui/badge";
import { MODEL_METRICS } from "@/lib/constants";
import MetricsCard from "@/components/shared/MetricsCard";
import Analyzer from "@/components/features/Analyzer";
import ExamplesGrid from "@/components/features/ExamplesGrid";
import { TrendingUp, Target, CheckCircle2, Zap } from "lucide-react";

export default function Home() {
  const handleExampleSelect = (text: string) => {
    // TODO: Conectar con el Analyzer en Fase 3
    console.log('Example selected:', text);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section con Gradiente */}
      <section className="relative py-10 md:py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        {/* Content */}
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 md:space-y-6 px-4">
            <Badge className="mb-2 md:mb-4" variant="secondary">
              Powered by BETO (BERT Español) • {MODEL_METRICS.f1Score}% F1 Score
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Detecta Lenguaje de Odio{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                en Tiempo Real
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Tecnología de IA entrenada con +14,000 ejemplos para identificar
              contenido ofensivo o discriminatorio en español
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-2 md:pt-4">
              <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-background border text-xs md:text-sm">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Análisis Instantáneo</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-background border text-xs md:text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>82% Precisión</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-background border text-xs md:text-sm">
                <Target className="h-4 w-4 text-blue-500" />
                <span>BERT Español</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-6 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Analyzer - 2 columns */}
          <div className="lg:col-span-2">
            <Analyzer />
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6 lg:space-y-8">
            {/* Metrics Cards */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-lg">Métricas del Modelo</h3>
              <MetricsCard
                title="Accuracy"
                value={MODEL_METRICS.accuracy}
                icon={<TrendingUp className="h-4 w-4" />}
                description="Precisión general del modelo"
              />
              <MetricsCard
                title="F1 Score"
                value={MODEL_METRICS.f1Score}
                icon={<Target className="h-4 w-4" />}
                description="Balance entre precisión y recall"
              />
              <MetricsCard
                title="Recall"
                value={MODEL_METRICS.recall}
                icon={<CheckCircle2 className="h-4 w-4" />}
                description="Capacidad de detectar hate speech"
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                {['BETO', 'Transformers', 'PyTorch', 'Next.js', 'TypeScript', 'shadcn/ui'].map((tech) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="container py-6 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ExamplesGrid onSelectExample={handleExampleSelect} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="py-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">14,530</div>
              <div className="text-sm sm:text-base text-muted-foreground">Ejemplos de Entrenamiento</div>
            </div>
            <div className="py-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">82.3%</div>
              <div className="text-sm sm:text-base text-muted-foreground">F1 Score</div>
            </div>
            <div className="py-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">110M</div>
              <div className="text-sm sm:text-base text-muted-foreground">Parámetros del Modelo</div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
