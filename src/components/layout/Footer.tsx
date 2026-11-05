import { APP_CONFIG, TRAINING_DATA } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12 sm:mt-16 md:mt-20">
      <div className="container py-6 sm:py-8">
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>Desarrollado con ❤️ por {APP_CONFIG.author}</p>
          <p>Modelo v3 entrenado con ~{TRAINING_DATA.totalExamples.toLocaleString('en-US')} ejemplos • Apache 2.0 License</p>
          <p>
            Parte de{' '}
            <a href={APP_CONFIG.hub} className="underline underline-offset-4 hover:text-foreground" target="_blank" rel="noopener noreferrer">
              DignityAI
            </a>
            , recursos abiertos sobre discriminación en el español de América Latina.
          </p>
          <p>© {currentYear} {APP_CONFIG.name}</p>
        </div>
      </div>
    </footer>
  );
}
