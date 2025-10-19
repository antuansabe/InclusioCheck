# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SinOdio** - A Next.js application for hate speech detection using AI. Detector de lenguaje de odio con inteligencia artificial.

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui (New York style, neutral base color)
- **Fonts**: Geist Sans & Geist Mono (via next/font)
- **Package Manager**: npm

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (available at http://localhost:3000)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### App Router Structure
- Uses Next.js 15 App Router (not Pages Router)
- Main application code in `src/app/`
- Root layout at `src/app/layout.tsx` with Geist font configuration
- Global styles at `src/app/globals.css`

### Styling System
- **Tailwind v4** with CSS variables for theming
- Design tokens defined in `@theme inline` block in globals.css
- Dark mode support via `.dark` class with OKLCH color space
- Custom radius values: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Base radius: `0.625rem` (10px)

### UI Components (shadcn/ui)
- Components located in `src/components/ui/`
- Configuration in `components.json` at project root
- Installed components: button, card, textarea, badge, progress, alert
- Import aliases configured: `@/components`, `@/lib`, `@/hooks`
- Utility function `cn()` in `src/lib/utils.ts` for class merging (clsx + tailwind-merge)

### TypeScript Configuration
- Path alias `@/*` maps to `./src/*`
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler

## Key Configuration Files

- `components.json` - shadcn/ui configuration (style: new-york, RSC enabled)
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS with Tailwind plugin
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint with Next.js core-web-vitals and TypeScript rules

## Component Development

When adding new shadcn/ui components:
```bash
npx shadcn@latest add [component-name] -y
```

All shadcn components use:
- Lucide icons
- CSS variables for theming
- TypeScript with proper typing
- Accessible patterns (ARIA attributes)

## Styling Conventions

- Use Tailwind utility classes with the `cn()` helper for conditional styles
- Color tokens use OKLCH color space for better perceptual uniformity
- Dark mode colors automatically applied via `.dark` class
- Custom properties available: `--color-*`, `--radius-*`, `--font-*`
