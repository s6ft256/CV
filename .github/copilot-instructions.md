# Copilot Instructions for CV Website

## Architecture Overview

This is a **React 18 + TypeScript + Vite** portfolio/CV site deployed to GitHub Pages (root directory). Key architectural decisions:

- **Build to Root**: Production files are generated in the repository root for direct hosting.
- **Source Index**: The entry `index.html` template lives in [src/index.html](../src/index.html) to avoid being overwritten by the build.
- **Vite Config**: [vite.config.ts](../vite.config.ts) sets `root: 'src'` and `outDir: '../'`.
- **Lazy loading**: All sections below-the-fold use `React.lazy()` with `<Suspense>` (see [App.tsx](../src/App.tsx))
- **CSS theming**: Colors defined as CSS variables in [index.css](../src/index.css), consumed via Tailwind config at [tailwind.config.cjs](../tailwind.config.cjs) (e.g., `bg: 'var(--bg)'`)
- **Data-driven**: Resume content lives in [src/data/resume.ts](../src/data/resume.ts) with strict TypeScript interfaces from [src/types/index.ts](../src/types/index.ts)
- **GitHub integration**: `Projects` and `GitHubStats` components fetch live data from GitHub API using `VITE_GITHUB_USERNAME` env var

## Component Patterns

### Creating New Sections

Wrap content sections with `<Section>` for consistent spacing/titles and `<Card>` for item containers:

```tsx
import Section from './Section'
import Card from './Card'

export default function NewSection() {
  return (
    <Section id="section-id" title="Title" subtitle="Description" gradient>
      <Card hover glow="blue">
        {/* content */}
      </Card>
    </Section>
  )
}
```

### Card Options

- `hover`: Enables lift effect and glow on hover
- `glow`: `'blue'` | `'accent'` | `'none'` for hover glow color
- `gradient`: Adds gradient background

### Adding Data Types

1. Add interface to [src/types/index.ts](../src/types/index.ts)
2. Export data from [src/data/resume.ts](../src/data/resume.ts)
3. Import and use in component

## Developer Commands

```bash
npm run dev          # Dev server at localhost:5173
npm run build        # Build to /docs (GitHub Pages output)
npm run test         # Vitest in watch mode
npm run type-check   # TypeScript validation only
npm run lint:fix     # Auto-fix ESLint issues
```

## Testing Conventions

- Tests in `src/test/` mirror component names (e.g., `Experience.test.tsx`)
- Use `@testing-library/react` with `screen` queries
- Mock `window.matchMedia` is pre-configured in [src/test/setup.ts](../src/test/setup.ts)
- Test against actual resume data, not mocked data

Example pattern from [Experience.test.tsx](../src/test/Experience.test.tsx):

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Experience from '../components/Experience'

describe('Experience', () => {
  it('renders experience cards', () => {
    render(<Experience />)
    expect(screen.getByText(/Senior Full-Stack Developer/i)).toBeInTheDocument()
  })
})
```

## Environment Variables

All env vars use `VITE_` prefix for client-side access via `import.meta.env`:

- `VITE_EMAIL`, `VITE_PHONE`, `VITE_WHATSAPP` - Contact info
- `VITE_GITHUB_USERNAME` - Powers GitHub API calls in `Projects` and `GitHubStats`
- `VITE_GA_TRACKING_ID`, `VITE_PLAUSIBLE_DOMAIN` - Analytics (optional)

## Styling Guidelines

- Use Tailwind utility classes with custom colors: `text-text`, `bg-primary`, `text-muted`, `bg-card-bg`
- Responsive: Mobile-first with `md:` and `lg:` breakpoints
- Dark mode via `.dark` class on root element
- Custom animations defined in [tailwind.config.cjs](../tailwind.config.cjs): `animate-fade-in`, `animate-float`, `animate-flag-wave`

## Build & Deployment

- Build output: `/docs` folder (configured for GitHub Pages)
- Bundle analysis: `npm run build` generates [docs/stats.html](../docs/stats.html)
- Vendor chunk splitting: React/ReactDOM are separated for caching
