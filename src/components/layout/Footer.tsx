import { APP_CONFIG } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12 sm:mt-16 md:mt-20">
      <div className="container py-6 sm:py-8">
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>Desarrollado con ❤️ por {APP_CONFIG.author}</p>
          <p>Modelo entrenado con 14,530 ejemplos • Apache 2.0 License</p>
          <p>© {currentYear} {APP_CONFIG.name}</p>
        </div>
      </div>
    </footer>
  );
}
