# SinOdio - Detector de Discurso de Odio con IA

**Versión 3.0** | Especializado en Español Latinoamericano

Detector de lenguaje de odio con inteligencia artificial, especializado en identificar tanto discurso de odio **explícito** como **sutil/normalizado** en español de América Latina.

## 🚀 Descripción

**SinOdio** es una aplicación web moderna que utiliza inteligencia artificial de última generación para detectar lenguaje de odio en textos en español latinoamericano. Construida con Next.js 15, TypeScript, y respaldada por un modelo BETO (BERT en Español) fine-tuned con ~35,000 ejemplos especializados.

El modelo v3 representa una mejora significativa de **+21% en F1 score** comparado con versiones anteriores, con énfasis en detectar lenguaje discriminatorio normalizado que muchas veces pasa desapercibido.

**Tecnología para comunicar sin odio. Espacios digitales más seguros e inclusivos.**

## 🎯 Problema Social que Resuelve

El discurso de odio en español latinoamericano frecuentemente se presenta de forma **normalizada y sutil**, haciendo difícil su detección. Frases discriminatorias disfrazadas de "opiniones" o "humor" perpetúan violencia hacia grupos vulnerables (mujeres, LGBTQ+, migrantes, indígenas, personas con discapacidad).

**SinOdio** combate esto identificando tanto lenguaje explícitamente violento como discriminación encubierta, ayudando a crear espacios digitales más seguros para comunidades hispanohablantes en América Latina.

## 📊 Métricas Impactantes

### Modelo de IA (v3)
- **Accuracy**: 91.85% (+14% vs v1)
- **F1 Score**: 87.00% (+21% vs v1)
- **Precision**: 83.30% (+22% vs v1)
- **Recall**: 91.03% (detecta 91 de cada 100 casos reales)
- **Dataset**: ~35,000 ejemplos de LATAM (Chile, México, Argentina, Colombia, Perú)

### Categorías de Discriminación Detectadas
✓ Xenofobia e inmigración | ✓ Género y sexismo | ✓ Orientación sexual (LGBTQ+)
✓ Raza y etnicidad | ✓ Clase social (aporofobia) | ✓ Discapacidad (capacitismo) | ✓ Pueblos indígenas

## ✨ Características

- 🤖 **Modelo BETO v3** - 110M parámetros, fine-tuned para español LATAM
- ⚡ **Análisis en tiempo real** - Respuesta < 2 segundos
- 🎯 **Detección avanzada** - Identifica hate speech explícito y normalizado
- 📊 **Métricas transparentes** - Visualización de confianza y probabilidades
- 🎨 **UI moderna** - Diseñada con shadcn/ui y Tailwind CSS
- 🌐 **100% en español** - Optimizado para variantes latinoamericanas
- 🔒 **Open Source** - Apache 2.0 License

## 🛠️ Stack Técnico Destacado

### Machine Learning & AI
- **[BETO](https://github.com/dccuchile/beto)** (BERT en Español) - 110M parámetros
- **[Transformers](https://huggingface.co/docs/transformers)** - Fine-tuning con PyTorch
- **[HuggingFace Spaces](https://huggingface.co/spaces/antonn-dromundo/SinOdio-HateSpeech-Detector)** - Deployment del modelo
- **[Gradio Client API](https://www.gradio.app/docs/python-client)** - Integración serverless

### Full-Stack Development
- **[Next.js 15.5](https://nextjs.org/)** - App Router, Server Components, API Routes
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development
- **[React 19](https://react.dev/)** - UI framework con hooks modernos
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first styling

### UI/UX
- **[shadcn/ui](https://ui.shadcn.com/)** - Sistema de componentes (New York style)
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos accesibles
- **[Lucide React](https://lucide.dev/)** - Iconografía moderna

### Production & DevOps
- **[Vercel](https://vercel.com/)** - Deployment optimizado con edge functions
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD ready
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Code quality

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** 18+ (v22.18.0 recomendado)
- **npm** 9+ o pnpm

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/antuansabe/InclusioCheck.git
cd inclusiocheck

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**Nota**: La primera petición puede tardar 60-90 segundos (cold start del modelo en HuggingFace). Peticiones subsecuentes: < 2 segundos.

### Deployment a Producción

El proyecto está optimizado para deployment en **Vercel** con configuración zero-config:

```bash
# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para guía completa de deployment en Vercel.

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/              # App Router de Next.js
│   ├── api/         # API routes
│   ├── layout.tsx   # Layout principal
│   └── page.tsx     # Página principal
├── components/      # Componentes React
│   ├── ui/         # Componentes de shadcn/ui
│   ├── layout/     # Header, Footer, Container
│   ├── features/   # Componentes de características
│   └── shared/     # Componentes compartidos
└── lib/            # Utilidades y configuración
    ├── constants.ts # Constantes de la app
    ├── types.ts     # Tipos TypeScript
    └── utils.ts     # Funciones auxiliares
```

## 🔗 Enlaces del Proyecto

### Recursos de IA
- 🤗 **[Modelo v3](https://huggingface.co/antonn-dromundo/SinOdio-BETO-HateSpeech-Detector-v3)** - HuggingFace Model Hub
- 🚀 **[Gradio Space](https://huggingface.co/spaces/antonn-dromundo/SinOdio-HateSpeech-Detector)** - Demo interactiva del modelo
- 📊 **[Dataset LATAM](https://huggingface.co/datasets/antonn-dromundo/SinOdio-LATAM-Regional-HateSpeech)** - Dataset de entrenamiento

### Repositorio
- 🐙 **[GitHub](https://github.com/antuansabe/InclusioCheck)** - Código fuente
- 📖 **[Documentación](./CLAUDE.md)** - Guía técnica completa
- 🚀 **[Deployment Guide](./DEPLOYMENT.md)** - Guía de despliegue

## 👨‍💻 Autor

**Antonio Dromundo**
- Email: antuansabe@gmail.com
- GitHub: [@antuansabe](https://github.com/antuansabe)
- LinkedIn: [antonndromundo](https://www.linkedin.com/in/antonndromundo/)

## 📄 Licencia

Este proyecto está bajo la Licencia Apache 2.0 - ver el archivo LICENSE para más detalles.

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 15 App                        │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │   Frontend  │  │  API Routes  │  │  Components   │   │
│  │  (React 19) │──│  (Node.js)   │──│  (shadcn/ui)  │   │
│  └─────────────┘  └──────────────┘  └───────────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ Gradio Client API
                       │ (HTTP/SSE)
                       ▼
┌─────────────────────────────────────────────────────────┐
│            HuggingFace Space (Gradio)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  BETO Model (110M params)                        │   │
│  │  ├─ Tokenizer (Spanish BERT)                     │   │
│  │  ├─ Transformer Layers (12)                      │   │
│  │  └─ Classification Head (binary)                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                       │
                       ▼
              Response: [label, score, message]
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.

## 🙏 Agradecimientos

- **[dccuchile](https://github.com/dccuchile/beto)** - Modelo BETO base
- **[HuggingFace](https://huggingface.co/)** - Platform y hosting del modelo
- **[shadcn](https://twitter.com/shadcn)** - Sistema de componentes UI
- **[Vercel](https://vercel.com/)** - Hosting y deployment
- Comunidad de desarrolladores open source

## 📜 Versiones

- **v3.0** (Nov 2025) - Modelo mejorado (+21% F1), dataset LATAM, retry mechanism
- **v2.0** (Nov 2025) - Integración dataset regional, detección mejorada
- **v1.0** (Oct 2025) - Release inicial, modelo base

---

<div align="center">

⭐ **Si este proyecto te ayuda, considera darle una estrella en GitHub** ⭐

**[Demo Live](https://sinodio.vercel.app)** • **[Reportar Bug](https://github.com/antuansabe/InclusioCheck/issues)** • **[Request Feature](https://github.com/antuansabe/InclusioCheck/issues)**

Hecho con ❤️ para comunidades hispanohablantes en América Latina

</div>
