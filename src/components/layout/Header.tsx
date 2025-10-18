import Link from 'next/link';
import { ShieldCheck, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SOCIAL_LINKS, APP_CONFIG } from '@/lib/constants';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-xl font-bold">{APP_CONFIG.name}</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {APP_CONFIG.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">LinkedIn</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
