import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APP_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.name,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  authors: [{ name: APP_CONFIG.author }],
  creator: APP_CONFIG.author,
  keywords: [
    "hate speech detection",
    "detector de lenguaje de odio",
    "NLP",
    "BERT",
    "BETO",
    "Spanish",
    "español",
    "machine learning",
    "inteligencia artificial",
    "AI",
    "text classification",
    "clasificación de texto",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://inclusiocheck.vercel.app", // Actualizar después del deploy
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    siteName: APP_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    creator: "@tu_twitter", // Actualizar con tu handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
