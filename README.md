# InclusioCheck

Detector de Lenguaje de Odio en Español con IA

## 🚀 Descripción

InclusioCheck es una aplicación web moderna que utiliza inteligencia artificial para detectar lenguaje de odio en textos en español. Está construida con Next.js 15, TypeScript, y utiliza el modelo BETO (BERT en Español) fine-tuned para la clasificación de hate speech.

## ✨ Características

- 🤖 Modelo basado en BETO (BERT en Español)
- ⚡ Análisis en tiempo real
- 📊 Visualización de métricas del modelo
- 🎨 Interfaz moderna con shadcn/ui
- 🌐 Totalmente en español
- 🔒 Apache 2.0 License

## 📈 Métricas del Modelo

- **Accuracy**: 82.02%
- **F1 Score**: 82.28%
- **Precision**: 77.73%
- **Recall**: 88.40%

Entrenado con **14,530 ejemplos** de texto en español.

## 🛠️ Tecnologías

- [Next.js 15](https://nextjs.org/) - Framework React con App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI reutilizables
- [Lucide React](https://lucide.dev/) - Iconos modernos
- [HuggingFace](https://huggingface.co/) - Hosting del modelo

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ instalado
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/antuansabe/InclusioCheck.git
cd InclusioCheck

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

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

## 🔗 Enlaces

- 🤗 [Modelo en HuggingFace](https://huggingface.co/antonn-dromundo/InclusioCheck-BETO-HateSpeech)
- 💼 [LinkedIn](https://www.linkedin.com/in/antonndromundo/)
- 🐙 [GitHub](https://github.com/antuansabe)

## 👨‍💻 Autor

**Antonio Domundo**
- Email: antuansabe@gmail.com
- GitHub: [@antuansabe](https://github.com/antuansabe)
- LinkedIn: [antonndromundo](https://www.linkedin.com/in/antonndromundo/)

## 📄 Licencia

Este proyecto está bajo la Licencia Apache 2.0 - ver el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- Modelo BETO desarrollado por [dccuchile](https://github.com/dccuchile/beto)
- Comunidad de HuggingFace por el hosting del modelo
- shadcn por los componentes UI

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
