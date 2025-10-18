import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MODEL_METRICS, APP_CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="secondary">
          ✅ Fase 1 Completada
        </Badge>
        <h1 className="text-4xl font-bold mb-4">
          {APP_CONFIG.name}
        </h1>
        <p className="text-xl text-muted-foreground">
          {APP_CONFIG.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardDescription>Accuracy</CardDescription>
            <CardTitle className="text-3xl">{MODEL_METRICS.accuracy}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>F1 Score</CardDescription>
            <CardTitle className="text-3xl">{MODEL_METRICS.f1Score}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Precision</CardDescription>
            <CardTitle className="text-3xl">{MODEL_METRICS.precision}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Recall</CardDescription>
            <CardTitle className="text-3xl">{MODEL_METRICS.recall}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>🎉 Setup Completo</CardTitle>
          <CardDescription>
            Todos los componentes base están instalados y funcionando
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✅ Next.js 14 con App Router</li>
            <li>✅ TypeScript configurado</li>
            <li>✅ shadcn/ui componentes</li>
            <li>✅ Tailwind CSS</li>
            <li>✅ Layout components (Header, Footer)</li>
            <li>✅ Types y Constants</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
