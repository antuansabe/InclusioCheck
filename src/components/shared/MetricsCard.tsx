import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MetricsCardProps {
  title: string;
  value: number;
  description?: string;
  showProgress?: boolean;
  icon?: React.ReactNode;
}

export default function MetricsCard({
  title,
  value,
  description,
  showProgress = true,
  icon
}: MetricsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardDescription className="text-sm font-medium">{title}</CardDescription>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <CardTitle className="text-3xl font-bold text-primary">
          {value}%
        </CardTitle>
      </CardHeader>
      {showProgress && (
        <CardContent>
          <Progress value={value} className="h-2" />
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
