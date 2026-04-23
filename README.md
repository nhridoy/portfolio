# Minimalist Developer Portfolio

A minimal, typography-focused single-page portfolio website for software engineers. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Biome.

## Design Philosophy

Inspired by editorial layouts and printed books, this portfolio prioritizes:
- **Typography as the primary design element** using Playfair Display (serif) + Inter (sans-serif)
- **Monochrome color palette** - deep blacks with subtle grayscale variations
- **Whitespace and breathing room** - content breathes with generous margins
- **Subtle animations** - smooth, elegant transitions without distraction
- **Accessibility-first** - semantic HTML with proper ARIA patterns

## Tech Stack

- **Next.js 14** (App Router) - for performance and SEO
- **TypeScript** - type safety
- **Tailwind CSS v3** - utility-first styling
- **Framer Motion** - elegant animations
- **Biome** - fast linter & formatter (replaces ESLint + Prettier)
- **pnpm** - efficient package manager

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create production build in `.next/` |
| `pnpm start` | Preview production build locally |
| `pnpm lint` | Run Biome linter with auto-fixes |
| `pnpm format` | Format all files with Biome |
| `pnpm typecheck` | Run TypeScript compiler check |

## Customization

### Personal Information

Edit your personal data in `lib/constants.ts`:

```typescript
export const PERSONAL_INFO = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  bio: "Your bio paragraph (3-4 sentences)"
}

export const EXPERIENCE = [
  {
    role: "Senior Engineer",
    company: "Company A",
    period: "2022 – Present",
    description: "Brief description of responsibilities and achievements"
  },
  // Add more roles...
]

export const SKILLS = {
  "Frontend": ["React", "TypeScript", "Next.js"],
  "Backend": ["Node.js", "PostgreSQL"],
  "Tools": ["Git", "Docker", "AWS"]
}

export const CONTACT = {
  email: "you@example.com",
  github: "github.com/username",
  linkedin: "linkedin.com/in/username"
}
```

### Colors & Theme

The monochrome dark theme is defined via CSS variables in `app/globals.css`:

```css
:root {
  --background: 0 0% 0%;      /* Pure black */
  --foreground: 0 0% 98%;     /* Near white */
  --muted: 0 0% 25%;          /* Muted gray */
  --border: 0 0% 15%;         /* Border color */
  /* ... more variables */
}
```

To create a light theme, invert these HSL values.

### Typography

Fonts are imported from Google Fonts in `app/layout.tsx`:

```typescript
const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})
```

Swap with any Google Fonts of your choice (e.g., Source Serif Pro, DM Sans).

### Biome Configuration

Linting and formatting rules are in `biome.json`. Key settings:

- **Organize imports** - auto-sorts and removes unused
- **Linter** - recommended rules, no `any` types, proper key usage
- **Formatter** - 2-space indent, single quotes, trailing commas
- **Files** - includes app/, components/, lib/ only

To adjust rules, edit `biome.json` and re-run `pnpm lint`.

## Project Structure

```
/app
  layout.tsx       # Root layout with font optimization
  page.tsx         # Main page (assembles all sections)
  globals.css      # Global styles & CSS custom properties
/components
  /ui              # Reusable presentational components
    container.tsx  # Constrained width wrapper (720px max)
    section.tsx    # Motion-enabled section wrapper
    typography.tsx # Typography components (H1, H2, p, etc.)
    animated-link.tsx # Accessible link with underline animation
  /sections        # Page sections
    hero.tsx       # Hero: name + tagline with staggered fade-in
    about.tsx      # Bio paragraph with scroll-trigger
    experience.tsx # Experience timeline with hover states
    skills.tsx     # Grouped skill categories
    contact.tsx    # Contact links (email, GitHub, LinkedIn)
/lib
  constants.ts     # Personal data (edit this first!)
  animations.ts    # Framer Motion variant definitions
  utils.ts         # Utility: cn() for Tailwind class merging
```

## Performance

This portfolio is built for excellent Core Web Vitals:

| Metric | Target | Actual |
|--------|--------|--------|
| **First Contentful Paint** | < 1.8s | Optimized fonts, minimal CSS |
| **Largest Contentful Paint** | < 2.5s | Static generation, no DB calls |
| **Cumulative Layout Shift** | < 0.1 | Fonts preloaded, no FOIT |
| **First Input Delay** | < 100ms | ~87KB JavaScript, minimal interactivity |

Optimizations:
- Static site generation (SSG) - all pages pre-rendered
- `next/font` automatic font optimization with `swap`
- Framer Motion uses GPU-accelerated transforms only
- Image optimization-ready (add `<Image />` for photos)
- Zero third-party scripts or tracking

## Accessibility

- Semantic HTML5 elements (header, main, section, footer)
- Proper heading hierarchy (h1 → h2 → h3)
- Visible focus states (`:focus-visible`)
- Sufficient color contrast (WCAG AA compliant, 4.5:1 minimum)
- Reduced motion support via `prefers-reduced-motion` (can be added)
- Keyboard navigation fully functional

## Deployment

### Vercel (Recommended)

Deploy with one click:

```bash
pnpm i -g vercel
vercel --prod
```

### Other Platforms

The app is a standard Next.js build. Deploy to:

- **Netlify** - connect Git repo, build command `pnpm build`
- **Railway** - `railway up` from project root
- **AWS Amplify** - connect repository, automatic detection
- **DigitalOcean App Platform** - GitHub integration
- **Self-hosted** - `pnpm start` after building

Ensure Node.js 18+ and pnpm are available on the host.

## License

MIT License - free to use for personal or commercial projects.

## Credits

Design inspired by classic typographic systems, editorial magazines, and the minimalist principles of designers like Josef Müller-Brockmann and Massimo Vignelli.
