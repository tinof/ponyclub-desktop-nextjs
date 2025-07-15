# Technology Stack

## Framework & Runtime

- **Next.js 15.3.5** - App Router with static generation
- **React 19** - Latest stable version
- **TypeScript 5.8.3** - Strict mode enabled
- **Node.js 18+** - Required runtime version

## Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Custom vintage design system** - Earthy green/beige palette

## Package Management

- **pnpm** - Primary package manager (required)
- **pnpm workspaces** - Monorepo structure

## Code Quality & Tooling

- **Biome** - Formatter and linter (replaces ESLint/Prettier)
- **Knip** - Unused code detection
- **Lefthook** - Git hooks management
- **TypeScript strict mode** - Type safety enforcement

## Performance & Analytics

- **Turbopack** - Fast development builds
- **Partytown** - Web worker for third-party scripts
- **Vercel Analytics** - Performance monitoring
- **Google Analytics 4** - User tracking (GDPR-compliant)

## Third-Party Integrations

- **Bokun** - Booking widget system (feature-flagged)
- **c15t** - GDPR consent management
- **Google Maps** - Location services
- **Google Reviews** - Review display widget

## Common Commands

### Development

```bash
pnpm dev              # Start dev server with Turbopack
pnpm dev:webpack      # Start dev server with Webpack
pnpm dev:trace        # Start dev with tracing enabled
```

### Build & Production

```bash
pnpm build           # Production build with optimizations
pnpm start           # Start production server
pnpm analyze         # Bundle size analysis
```

### Code Quality

```bash
pnpm check           # Format, lint, and fix issues
pnpm type-check      # TypeScript validation
pnpm knip            # Find unused code
pnpm security:audit  # Security vulnerability check
```

### Testing & CI

```bash
pnpm test            # Run tests (placeholder)
pnpm ci:check        # Pre-commit quality checks
```

## Build Configuration

- **Output**: Standalone mode for containerization
- **Static generation**: Enabled for performance
- **Image optimization**: AVIF/WebP with multiple sizes
- **Bundle splitting**: Optimized chunks for caching
- **CSP**: Content Security Policy (currently disabled for static gen)
