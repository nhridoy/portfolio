# Migration Summary: ESLint → Biome + npm → pnpm

## Overview
This document summarizes the migration from ESLint to Biome and from npm to pnpm, along with package version updates.

## Changes Made

### 1. Package Manager: npm → pnpm
- Removed `package-lock.json`
- Added `"packageManager": "pnpm@9.12.0"` to `package.json`
- All dependencies now managed via pnpm

**Benefits**:
- Faster installs (hard linking)
- Disk space efficient
- Strict `node_modules` structure prevents "dependency hell"

### 2. Linter/Formatter: ESLint → Biome
- Removed: `eslint`, `eslint-config-next`, `.eslintrc.json`
- Added: `@biomejs/biome` as dev dependency
- Created `biome.json` configuration
- Updated `package.json` scripts:
  - `lint` → `biome check --write`
  - Added `format` → `biome format --write`

**Benefits**:
- Single tool for linting + formatting (faster)
- Zero-config for most TypeScript/React projects
- Bundled with Prettier-like formatting

### 3. Package Version Updates

| Package | Old Version | New Version |
|---------|-------------|-------------|
| next | ^14.2.0 | ^14.2.5 |
| framer-motion | ^11.0.0 | ^11.11.3 |
| class-variance-authority | ^0.7.0 | ^0.7.1 |
| clsx | ^2.1.0 | ^2.1.1 |
| tailwind-merge | ^2.2.0 | ^2.5.2 |
| @types/node | ^20.0.0 | ^20.11.30 |
| @types/react | ^18.3.0 | ^18.3.3 |
| @types/react-dom | ^18.3.0 | ^18.3.0 |
| autoprefixer | ^10.5.0 | ^10.4.20 |
| postcss | ^8.5.10 | ^8.4.45 |
| tailwindcss | ^3.4.19 | ^3.4.10 |
| typescript | ^5.0.0 | ^5.6.2 |

### 4. Config File Updates

- `postcss.config.mjs` - converted to ES module syntax (was mixed with ES module package type)
- `next.config.js` - converted to CommonJS (module.exports)
- Removed `type: "module"` from `package.json` (caused config conflicts)

### 5. Code Fixes

**Biome lint fixes**:
- `experience.tsx`: replaced array index as React key with `role-company` compound key
- `section.tsx`: replaced `any` type with `Variants` from `framer-motion`

## Verification

✅ **TypeScript**: `pnpm typecheck` - passes  
✅ **Build**: `pnpm build` - compiles successfully  
✅ **Lint**: `pnpm lint` - no errors  
✅ **Production size**: 53 kB page, 87.2 kB shared JavaScript

## Usage

### Install dependencies
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Production build
```bash
pnpm build
pnpm start
```

### Lint & Format
```bash
pnpm lint     # Check & fix issues
pnpm format   # Format all code
```

## Notes

- pnpm uses strict node_modules layout - no hoisting to root
- All config files now use consistent module format
- Biome provides faster feedback than ESLint + Prettier combo
- Git repository should be cleaned of old `node_modules` and lockfiles before committing

## Files Changed

```
✓ package.json           (dependencies, scripts, packageManager)
✓ biome.json             (new)
✓ postcss.config.mjs     (updated to ESM)
✓ next.config.js         (converted to CJS)
✗ .eslintrc.json         (removed)
✗ package-lock.json      (removed)
✓ components/sections/experience.tsx (key fix)
✓ components/ui/section.tsx (any → Variants)
```
