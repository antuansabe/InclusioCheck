# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SinOdio** - A Next.js hate speech detection application using AI. Uses BETO (BERT in Spanish) fine-tuned model to identify offensive or discriminatory content in Spanish text in real-time.

**Author**: Antonio Dromundo (antuansabe@gmail.com)
**Model**: antonn-dromundo/SinOdio-BETO-HateSpeech (hosted on HuggingFace)
**License**: Apache 2.0

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3.4.17
- **UI Components**: shadcn/ui (New York style, neutral base)
- **Icons**: Lucide React
- **AI Backend**: HuggingFace Inference API
- **Package Manager**: npm

## Development Commands

```bash
# Install dependencies
npm install

# Run development server at http://localhost:3000
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Add new shadcn/ui component
npx shadcn@latest add [component-name] -y
```

## Environment Variables

**Required for API functionality:**

Create `.env.local` file with:
```bash
HUGGINGFACE_API_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_MODEL_ID=antonn-dromundo/SinOdio-BETO-HateSpeech
```

Get HuggingFace token at: https://huggingface.co/settings/tokens

## Application Architecture

### Data Flow

1. **User Input** → `src/components/features/Analyzer.tsx`
   - Client-side React component with form and state management
   - Validates text length (max 500 chars from `APP_CONFIG.maxTextLength`)
   - Makes POST request to `/api/analyze`

2. **API Route** → `src/app/api/analyze/route.ts`
   - Next.js Edge Runtime API route
   - Validates request and calls HuggingFace Inference API
   - Returns `{ isHateSpeech, confidence, label, timestamp }`
   - Error handling for model loading (503), invalid token (401), etc.

3. **HuggingFace Model**
   - Returns predictions as `[{ label: 'LABEL_0' | 'LABEL_1', score: number }]`
   - LABEL_0 = No hate speech, LABEL_1 = Hate speech
   - Threshold: 0.5 score determines classification

4. **Result Display** → `src/components/features/ResultCard.tsx`
   - Shows analysis result with color-coded badges
   - Displays confidence percentage

### Component Organization

```
src/
├── app/
│   ├── api/analyze/route.ts    # HuggingFace API integration (Edge runtime)
│   ├── layout.tsx              # Root layout with Geist fonts
│   ├── page.tsx                # Home page (client component)
│   └── globals.css             # Tailwind + theme variables
├── components/
│   ├── ui/                     # shadcn/ui primitives (button, card, etc.)
│   ├── layout/                 # Header, Footer, Container
│   ├── features/               # Core app features
│   │   ├── Analyzer.tsx        # Main text analysis component
│   │   ├── ResultCard.tsx      # Analysis result display
│   │   └── ExamplesGrid.tsx    # Pre-made text examples
│   └── shared/                 # Reusable components
│       ├── MetricsCard.tsx     # Model metrics display
│       └── LoadingState.tsx    # Loading skeleton
└── lib/
    ├── constants.ts            # App config, model metrics, examples
    ├── types.ts                # TypeScript interfaces
    └── utils.ts                # cn() utility for className merging
```

### Key Architecture Decisions

1. **App Router**: Uses Next.js 15 App Router (NOT Pages Router)
   - All pages are in `src/app/`
   - API routes use Edge Runtime for better performance
   - Client components marked with `'use client'`

2. **Type System**: Comprehensive TypeScript types in `src/lib/types.ts`
   - `AnalysisState`: Union type for loading/success/error states
   - `HuggingFaceResponse`: API response shape from HF
   - `AnalysisResult`: Processed result for UI display

3. **State Management**: Local React state with `useState`
   - `Analyzer` component manages analysis lifecycle
   - Example selection flows from `ExamplesGrid` → `page.tsx` → `Analyzer`
   - Uses `key` prop to reset Analyzer when example changes

4. **Styling System**:
   - Tailwind CSS with custom design tokens in `globals.css`
   - Dark mode via `.dark` class selector (OKLCH color space)
   - `cn()` utility combines clsx + tailwind-merge for conditional classes
   - Responsive design: mobile-first with breakpoints (sm, md, lg)

5. **Constants & Configuration**:
   - All model info, metrics, and examples centralized in `src/lib/constants.ts`
   - Model metrics: accuracy 82.02%, F1 82.28%, precision 77.73%, recall 88.40%
   - 14,530 training examples
   - 6 pre-made text examples showcasing subtle hate speech cases

## Adding shadcn/ui Components

Current installed components:
- button, card, textarea, badge, progress, alert, skeleton

To add new components:
```bash
npx shadcn@latest add [component-name] -y
```

Components use:
- Radix UI primitives for accessibility
- CSS variables for theming (defined in globals.css)
- TypeScript with proper typing
- `cn()` utility for conditional styling

## API Error Handling

The `/api/analyze` route handles:
- **400**: Invalid or empty text, text exceeds 500 chars
- **401**: Invalid HuggingFace API token
- **500**: Missing env vars, unexpected model response format
- **503**: Model is loading (prompt user to retry in 20 seconds)

## Common Development Tasks

**Modify model metrics**: Edit `MODEL_METRICS` in `src/lib/constants.ts`

**Add new text examples**: Add to `TEXT_EXAMPLES` array in `src/lib/constants.ts`

**Change text length limit**: Update `maxTextLength` in `APP_CONFIG` (constants.ts)

**Modify API endpoint**: Update in `src/components/features/Analyzer.tsx` (line 44)

**Update model ID**: Change in `.env.local` or `src/lib/constants.ts` (MODEL_INFO)

## TypeScript Configuration

- Path alias: `@/*` → `./src/*`
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler
- Incremental compilation enabled

## Build & Deployment

Build output goes to `.next/` directory.

For production:
```bash
npm run build  # Creates optimized production build
npm start      # Starts production server
```

**Vercel deployment**: Automatically detects Next.js and deploys. Ensure environment variables are set in Vercel dashboard.

## Model Information

- **Base model**: BETO (BERT Spanish)
- **Training data**: 14,530 Spanish text examples
- **Task**: Binary classification (hate speech vs. no hate speech)
- **HuggingFace**: https://huggingface.co/antonn-dromundo/SinOdio-BETO-HateSpeech
- **Parameters**: 110M (BERT-base architecture)

## Important Notes

- The API route uses Edge Runtime (`export const runtime = 'edge'`) for faster cold starts
- HuggingFace models may need warm-up time (20-30 seconds) on first request after inactivity
- All text processing happens server-side for security
- Client never receives HuggingFace token (only in API route)
- Maximum text length enforced both client-side and server-side
