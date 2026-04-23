# Portfolio - Quick Start Guide

## Setup
```bash
pnpm install          # Install dependencies
pnpm dev             # Start development server at localhost:3000
pnpm build           # Build for production
pnpm start           # Preview production build
pnpm lint            # Check & fix code quality with Biome
pnpm format          # Format all files with Biome
pnpm typecheck       # Verify TypeScript types
```

## Customize Your Data

**Step 1** - Edit `lib/constants.ts`:
- Replace name, title, tagline, bio
- Add your experience entries
- Update skills by category
- Replace contact information

**Step 2** - (Optional) Change fonts in `app/layout.tsx`:
- Go to Google Fonts and pick your preferred serif/sans pair
- Update font imports and Tailwind config accordingly

**Step 3** - (Optional) Adjust theme colors in `app/globals.css`:
- CSS variables use HSL format: `hsl(h s% l%)`
- Modify the `:root` block to change background, foreground, muted, etc.

## Notes

- This is a static export - no database or API needed
- Build output is in `.next/` folder (gitignored)
- Production-ready, optimized, and accessible
- All animations are GPU-accelerated and performant
- Uses Biome for linting/formatting (no ESLint/Prettier)

## Deploy

Deploy to Vercel (recommended):
```bash
pnpm i -g vercel
vercel --prod
```

Or any platform supporting Next.js (Netlify, Railway, AWS Amplify, etc.)
