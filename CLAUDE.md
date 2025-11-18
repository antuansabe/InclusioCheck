# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SinOdio** - A Next.js hate speech detection application using AI. Uses BETO (BERT in Spanish) fine-tuned model specialized in **Latin American Spanish** to identify both explicit and **subtle/normalized** hate speech in real-time.

**Author**: Antonio Dromundo (antuansabe@gmail.com)
**Model**: antonn-dromundo/SinOdio-BETO-HateSpeech-Detector-v3
**Dataset**: antonn-dromundo/SinOdio-LATAM-Regional-HateSpeech
**Gradio Space**: antonn-dromundo/SinOdio-HateSpeech-Detector
**License**: Apache 2.0
**Version**: v3 (November 2025)

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3.4.17
- **UI Components**: shadcn/ui (New York style, neutral base)
- **Icons**: Lucide React
- **AI Backend**: Gradio Client API (@gradio/client v2.0.0-dev.1)
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

**Optional (not currently used):**

Create `.env.local` file with:
```bash
HUGGINGFACE_API_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_MODEL_ID=antonn-dromundo/SinOdio-BETO-HateSpeech-Detector-v3
```

**Note**: The current implementation uses Gradio Client API which connects directly to the HuggingFace Space without requiring API tokens.

## Application Architecture

### Data Flow (Gradio Client Integration)

1. **User Input** → `src/components/features/Analyzer.tsx`
   - Client-side React component with form and state management
   - Validates text length (max 500 chars from `APP_CONFIG.maxTextLength`)
   - Makes POST request to `/api/analyze`

2. **API Route** → `src/app/api/analyze/route.ts`
   - **CRITICAL**: Uses Node.js runtime (NOT Edge Runtime)
   - Gradio Client requires Node.js runtime to function
   - Connects to HuggingFace Gradio Space: `antonn-dromundo/SinOdio-HateSpeech-Detector`
   - Parameter name must be `"texto"` (Spanish) as required by the Gradio Space
   - Returns `AnalysisResponse` from `src/types/api.ts`

3. **Gradio Space Response Structure**
   ```typescript
   // Gradio returns: [prediction_object, message]
   [
     {
       label: "✅ Lenguaje Inclusivo" | "⚠️ Discurso de Odio/Excluyente",
       confidences: [
         { label: "✅ Lenguaje Inclusivo", confidence: 0.99 },
         { label: "⚠️ Discurso de Odio/Excluyente", confidence: 0.01 }
       ]
     },
     "✅ Este texto parece inclusivo y respetuoso (confianza: 99.0%)"
   ]
   ```

4. **Response Processing**
   - Extract probabilities from `confidences` array
   - Determine `predictedClass`: 0 (inclusive) or 1 (hate speech)
   - Calculate confidence as max probability
   - Return formatted `AnalysisResponse`

5. **Result Display** → `src/components/features/Analyzer.tsx`
   - Shows probability bars for both classes
   - Displays message and confidence percentage
   - Color-coded: green for inclusive, red for hate speech

### Type System (Important!)

Two separate type definition files:

1. **`src/lib/types.ts`** - Legacy types (mostly unused now)
   - `HuggingFaceResponse`, `AnalysisResult`, `AnalysisState`
   - `TextExample`, `ModelMetrics`
   - Keep for backwards compatibility

2. **`src/types/api.ts`** - Current API types (actively used)
   - `AnalysisResponse`: API response with probabilities
   - `ApiError`: Error response structure
   - `isApiError()`: Type guard function
   - `PredictionResult`: Individual prediction interface

### Component Organization

```
src/
├── app/
│   ├── api/analyze/route.ts    # Gradio Client integration (Node.js runtime)
│   ├── layout.tsx              # Root layout with Geist fonts
│   ├── page.tsx                # Home page (client component)
│   └── globals.css             # Tailwind + theme variables
├── components/
│   ├── ui/                     # shadcn/ui primitives (button, card, etc.)
│   ├── layout/                 # Header, Footer, Container
│   ├── features/               # Core app features
│   │   ├── Analyzer.tsx        # Main text analysis component
│   │   ├── ResultCard.tsx      # Analysis result display (legacy)
│   │   └── ExamplesGrid.tsx    # Pre-made text examples
│   └── shared/                 # Reusable components
│       ├── MetricsCard.tsx     # Model metrics display
│       └── LoadingState.tsx    # Loading skeleton
├── lib/
│   ├── constants.ts            # App config, model metrics, examples
│   ├── types.ts                # Legacy TypeScript interfaces
│   └── utils.ts                # cn() utility for className merging
└── types/
    └── api.ts                  # Current API types for Gradio integration
```

### Key Architecture Decisions

1. **Gradio Client API Integration**
   - Uses `@gradio/client` v2.0.0-dev.1 (production dependency)
   - **IMPORTANT**: Must use Node.js runtime, NOT Edge Runtime
   - Connects to Space: `antonn-dromundo/SinOdio-HateSpeech-Detector`
   - Parameter name MUST be `"texto"` (not "text")
   - Response structure is `[{label, confidences}, message]`

2. **App Router**: Uses Next.js 15 App Router (NOT Pages Router)
   - All pages are in `src/app/`
   - API route uses Node.js runtime (removed `export const runtime = 'edge'`)
   - Client components marked with `'use client'`

3. **State Management**: Local React state with `useState`
   - `Analyzer` component manages analysis lifecycle
   - Direct state variables (not union type): `isLoading`, `result`, `error`
   - Example selection flows from `ExamplesGrid` → `page.tsx` → `Analyzer`

4. **Styling System**:
   - Tailwind CSS with custom design tokens in `globals.css`
   - Dark mode via `.dark` class selector (OKLCH color space)
   - `cn()` utility combines clsx + tailwind-merge for conditional classes
   - Responsive design: mobile-first with breakpoints (sm, md, lg, xl, 2xl)

5. **Constants & Configuration**:
   - All model info, metrics, and examples centralized in `src/lib/constants.ts`
   - **Model v3 metrics**: accuracy 91.85%, F1 87.00%, precision 83.30%, recall 91.03%
   - **Training data**: ~35,000 examples (LATAM regional dataset)
   - **Improvements over v1**: +14% accuracy, +21% F1, +22% precision, +19% recall
   - 6 pre-made text examples showcasing subtle hate speech cases

## Critical Implementation Notes

### DO NOT:
- ❌ Install `@gradio/client` as devDependency (must be production dependency)
- ❌ Use Edge Runtime in `/api/analyze` (Gradio requires Node.js runtime)
- ❌ Use parameter name "text" (must use "texto" for Gradio Space)
- ❌ Expect old HuggingFace Inference API response format
- ❌ Try to extract probabilities from `labelDict["✅ Lenguaje Inclusivo"]` directly

### DO:
- ✅ Keep `@gradio/client` in dependencies (not devDependencies)
- ✅ Use Node.js runtime (no runtime export or `runtime = 'nodejs'`)
- ✅ Use parameter name `"texto"` when calling `client.predict()`
- ✅ Parse Gradio response structure correctly: `[{label, confidences}, message]`
- ✅ Extract probabilities from `confidences` array by iterating and matching labels

## Adding shadcn/ui Components

Current installed components:
- button, card, textarea, badge, progress, alert, skeleton

To add new components:
```bash
npx shadcn@latest add [component-name] -y
```

Configuration in `components.json`:
- Style: "new-york"
- Base color: "neutral"
- RSC: enabled
- CSS variables: enabled
- Icon library: Lucide

## API Error Handling

The `/api/analyze` route handles:
- **400**: Invalid or empty text, text exceeds 500 chars
- **500**: Gradio connection errors, unexpected response format

Error responses use `ApiError` type from `src/types/api.ts`:
```typescript
{
  error: string;
  details?: string;
}
```

## Common Development Tasks

**Modify model metrics**: Edit `MODEL_METRICS` in `src/lib/constants.ts`

**Add new text examples**: Add to `TEXT_EXAMPLES` array in `src/lib/constants.ts`

**Change text length limit**: Update `maxTextLength` in `APP_CONFIG` (constants.ts)

**Update Gradio Space URL**: Change `SPACE_URL` in `src/app/api/analyze/route.ts`

**Modify API types**: Edit `src/types/api.ts` (not `src/lib/types.ts`)

## TypeScript Configuration

- Path alias: `@/*` → `./src/*`
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler
- Incremental compilation enabled

Key aliases in `components.json`:
```json
{
  "components": "@/components",
  "utils": "@/lib/utils",
  "ui": "@/components/ui",
  "lib": "@/lib",
  "hooks": "@/hooks"
}
```

## Build & Deployment

Build output goes to `.next/` directory.

For production:
```bash
npm run build  # Creates optimized production build
npm start      # Starts production server
```

**Vercel deployment**:
- Automatically detects Next.js and deploys
- No environment variables required for current Gradio implementation
- Ensure build succeeds locally before deploying

## Model Information (v3)

### Overview
- **Version**: v3 (November 2025)
- **Base model**: BETO (dariolopez/bert-base-spanish-wwm-cased)
- **Specialization**: Latin American Spanish hate speech detection
- **Task**: Binary classification (hate speech vs. no hate speech)
- **Focus**: Detects both explicit and subtle/normalized discrimination
- **HuggingFace Model**: https://huggingface.co/antonn-dromundo/SinOdio-BETO-HateSpeech-Detector-v3
- **Dataset**: https://huggingface.co/datasets/antonn-dromundo/SinOdio-LATAM-Regional-HateSpeech
- **Gradio Space**: https://huggingface.co/spaces/antonn-dromundo/SinOdio-HateSpeech-Detector

### Model Architecture
- **Parameters**: 110M (BERT-base architecture)
- **Model size**: 439 MB
- **Max sequence length**: 128 tokens
- **Architecture**: BETO (BERT para español)

### Training Details
- **Training data**: ~35,000 Spanish text examples
- **Dataset sources**:
  - SinOdio-LATAM-Regional-HateSpeech (primary)
  - Spanish Hate Speech Superset
  - Synthetic balanced examples
- **Regional coverage**: Chile, México, Argentina, Colombia, Perú
- **Epochs**: 2
- **Learning rate**: 2e-5
- **Batch size**: 16
- **Optimizer**: AdamW with 200 warmup steps
- **Hardware**: NVIDIA T4 (Google Colab Pro)
- **Training time**: ~30 minutes

### Performance Metrics (v3)

| Metric | v3 (Current) | v1 (Legacy) | Improvement |
|--------|--------------|-------------|-------------|
| **Accuracy** | 91.85% | 77.82% | +14.03% |
| **F1 Score** | 87.00% | 66.19% | +20.81% |
| **Precision** | 83.30% | 60.96% | +22.34% |
| **Recall** | 91.03% | 72.40% | +18.63% |

**Design Philosophy**: Prioritizes **Recall over Precision**
- **High Recall (91%)**: Detects 91 of every 100 real hate speech cases
- **Good Precision (83%)**: 83% of flagged content is actually hate speech
- **Rationale**: Better to detect harmful content (avoid false negatives) than miss it

### Detection Categories
The model identifies discrimination related to:
- Immigration and xenophobia
- Gender and sexism
- Sexual orientation and identity (LGBTQ+)
- Race and ethnicity
- Social class (aporophobia)
- Disability (ableism)
- Indigenous peoples

## Testing & Validation

The v3 model has been tested across multiple scenarios:

### Test Categories
1. **Inclusive text**: High confidence in detecting non-hateful content
2. **Explicit hate speech**: Strong detection of obvious discrimination
3. **Subtle hate speech**: Improved detection of normalized/disguised discrimination
4. **Ambiguous text**: Appropriate uncertainty levels for edge cases

### API Testing

To test the API locally:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"Me encanta trabajar con gente diversa"}'
```

Expected response format:
```json
{
  "probabilities": {
    "✅ Lenguaje Inclusivo": 0.99,
    "⚠️ Discurso de Odio/Excluyente": 0.01
  },
  "message": "✅ Este texto parece inclusivo y respetuoso (confianza: 99.0%)",
  "predictedClass": 0,
  "confidence": 0.99
}
```

### Example Test Cases

**Inclusive text:**
```
"los inmigrantes enriquecen nuestra cultura"
Expected: NO HATE (~99% confidence)
```

**Subtle hate speech:**
```
"las mujeres simplemente son más emocionales, es biología"
Expected: HATE (~99% confidence)
```

## Model Limitations

### Known Limitations
- **Context dependency**: May struggle with highly contextual or sarcastic content
- **Regional variations**: Optimized for LATAM Spanish; may have lower accuracy for Spain Spanish
- **Language evolution**: Hate speech evolves; model requires periodic updates
- **False positives**: ~17% of flagged content may not be actual hate speech
- **Not a replacement**: Should complement human moderation, not replace it

### Recommended Usage
- Use as part of a human-in-the-loop moderation system
- Review flagged content before taking action
- Update model periodically with new examples
- Consider cultural context when interpreting results

## Version History

### v3 (November 2025) - **Current**
- ✅ Major performance improvements (+21% F1 score)
- ✅ Specialized training on LATAM regional dataset
- ✅ Enhanced detection of subtle/normalized hate speech
- ✅ Improved recall (91%) for better hate speech detection
- ✅ Regional coverage: Chile, México, Argentina, Colombia, Perú
- ✅ ~35,000 training examples

### v2 (November 2025)
- ✅ Integration of SinOdio-LATAM dataset
- ✅ Significant improvement in subtle hate speech detection
- ✅ Regional dialect support

### v1 (October 2025)
- ✅ Initial public release
- ✅ F1 66.19%, Accuracy 77.82%
- ✅ Basic hate speech detection
- ✅ 14,530 training examples
