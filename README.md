# Minimalist Developer Portfolio

A lightweight, typography-first single-page portfolio built with Next.js 16.2.4 and TypeScript.

This repository contains a minimal, performance-focused portfolio template that emphasizes
typography, accessibility, and simple motion. It is intended as a starting point for
software engineers who want a clean, fast personal site.

---

## Features

- Typography-led editorial design using Playfair Display + Inter
- Monochrome, accessible color system with CSS variables
- Small bundle size and optimized fonts for fast LCP
- Motion-driven micro-interactions using Framer Motion
- TypeScript, Tailwind CSS, and Biome for linting/formatting

## Tech Stack

- Next.js 16.2.4 (App Router)
- TypeScript
- Tailwind CSS 4.2.4
- React 19.2.5 / React DOM 19.2.5
- Framer Motion 12.38.0
- Biome 2.4.14 (linter/formatter)
- pnpm 9.12.0

## Quick Start

Prerequisites: Node.js 18+ and `pnpm` 9.12.0 installed.

1. Install dependencies

```bash
pnpm install
```

2. Run the development server

```bash
pnpm dev
```

3. Open http://localhost:3000

## Available Scripts

- `pnpm dev` — Run Next.js dev server
- `pnpm build` — Build for production
- `pnpm start` — Preview production build
- `pnpm lint` — Run Biome linter (auto-fix where possible)
- `pnpm format` — Format project with Biome
- `pnpm typecheck` — Run TypeScript checker

## Customize

- Personal content and site data live in [lib/constants.ts](lib/constants.ts).
- Global theme variables are in [app/globals.css](app/globals.css).
- Fonts are configured in [app/layout.tsx](app/layout.tsx).

To update your name, title, work history, skills, or contact links, edit
`PERSONAL_INFO`, `EXPERIENCE`, and `CONTACT` in [lib/constants.ts](lib/constants.ts).

## Project Structure (high level)

- `app/` — Next.js App Router files: `layout.tsx`, `page.tsx`, global CSS
- `components/` — UI primitives and section components
- `lib/` — Constants, helpers, and motion variants
- `public/` — Static assets

See the code comments and small components for guidance on adding content.

## Performance & Accessibility

This template is built with performance in mind: fonts are optimized, animations
use GPU-accelerated transforms, and pages are static where possible. Accessibility
considerations include semantic HTML, visible focus states, and sufficient contrast.

## Deploy

Recommended: Vercel. From repo root:

```bash
pnpm build
pnpm start
```

Or deploy directly with Vercel:

```bash
pnpm i -g vercel
vercel --prod
```

## Contributing

This is a personal portfolio template. Suggested contributions: bug fixes,
accessibility improvements, or optional feature additions (dark/light theme,
image gallery, analytics stub). Open a PR with focused changes and a brief
description.

## License

MIT — reuse freely for personal or commercial projects.

---

If you'd like, I can now run a quick lint/format pass or open the site locally.