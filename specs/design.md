# Design Specification

## Overview

This document provides a comprehensive design specification for the Ponyclub project, combining architectural structure, technology stack, and development conventions for a tourism website offering adventure activities in Acheron River, Greece.

## Technology Stack

### Framework & Runtime

- **Next.js 15.3.5** - App Router with static generation
- **React 19** - Latest stable version
- **TypeScript 5.8.3** - Strict mode enabled
- **Node.js 18+** - Required runtime version

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Custom vintage design system** - Earthy green/beige palette

### Package Management

- **pnpm** - Primary package manager (required)
- **pnpm workspaces** - Monorepo structure

### Code Quality & Tooling

- **Biome** - Formatter and linter (replaces ESLint/Prettier)
- **Knip** - Unused code detection
- **Lefthook** - Git hooks management
- **TypeScript strict mode** - Type safety enforcement

### Performance & Analytics

- **Turbopack** - Fast development builds
- **Partytown** - Web worker for third-party scripts
- **Vercel Analytics** - Performance monitoring
- **Google Analytics 4** - User tracking (GDPR-compliant)

### Third-Party Integrations

- **Bokun** - Booking widget system (feature-flagged)
- **c15t** - GDPR consent management
- **Google Maps** - Location services
- **Google Reviews** - Review display widget

## Project Architecture

### Root Level Organization

```
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
├── lib/                   # Utility functions and data
├── contexts/              # React context providers
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── public/                # Static assets
├── docs/                  # Project documentation
└── scripts/               # Build and utility scripts
```

### App Router Structure (`app/`)

The application uses Next.js App Router with internationalization support:

- **`[locale]/`** - Internationalized routes (en/el)
  - **`page.tsx`** - Route pages
  - **`layout.tsx`** - Shared layouts
  - **`not-found.tsx`** - 404 pages
  - **`error.tsx`** - Error boundaries
- **`api/`** - API routes
- **`globals.css`** - Global styles with Tailwind v4
- **`fonts.ts`** - Font configuration

### Component Architecture (`components/`)

Components are organized by type and usage:

- **`ui/`** - Base UI components (buttons, cards, etc.)
- **`client/`** - Client-side only components
- **`icons/`** - Custom icon components
- **Root level** - Page-specific and layout components

### Library Structure (`lib/`)

Utility functions and configurations:

- **`translations/`** - i18n translation files
- **`gallery-data/`** - Image gallery configurations
- **Utility files** - Helper functions, data, and configurations

## Development Conventions

### File Naming

- **Pages**: `page.tsx` (App Router convention)
- **Layouts**: `layout.tsx` (App Router convention)
- **Components**: PascalCase (e.g., `BookingButton.tsx`)
- **Utilities**: camelCase (e.g., `use-media-query.ts`)
- **Types**: camelCase with `.d.ts` extension

### Component Organization

- **Server Components**: Default in App Router
- **Client Components**: Marked with `"use client"` directive
- **Shared Components**: In `/components` root
- **Page-specific**: Co-located with pages when appropriate

### Import Patterns

- **Absolute imports**: Use `@/` prefix for project root
- **Type imports**: Use `import type` for TypeScript types
- **Dynamic imports**: For code splitting and client components

### Styling Conventions

- **Tailwind v4**: Utility classes with `@utility` blocks
- **CSS Variables**: HSL color system with semantic naming
- **Component styles**: Co-located with components when needed
- **Global styles**: In `app/globals.css`

### Internationalization

- **Route structure**: `/[locale]/page-name`
- **Translation files**: `lib/translations/{locale}.ts`
- **Middleware**: Handles locale detection and routing
- **Default locale**: English (`en`)

### Performance Patterns

- **Static generation**: Preferred for most pages
- **Image optimization**: Next.js Image component with AVIF/WebP
- **Code splitting**: Automatic with dynamic imports
- **Bundle optimization**: Configured in `next.config.js`

## Development Workflow

### Common Commands

#### Development

```bash
pnpm dev              # Start dev server with Turbopack
pnpm dev:webpack      # Start dev server with Webpack
pnpm dev:trace        # Start dev with tracing enabled
```

#### Build & Production

```bash
pnpm build           # Production build with optimizations
pnpm start           # Start production server
pnpm analyze         # Bundle size analysis
```

#### Code Quality

```bash
pnpm check           # Format, lint, and fix issues
pnpm type-check      # TypeScript validation
pnpm knip            # Find unused code
pnpm security:audit  # Security vulnerability check
```

#### Testing & CI

```bash
pnpm test            # Run tests (placeholder)
pnpm ci:check        # Pre-commit quality checks
```

## Build Configuration

### Production Optimizations

- **Output**: Standalone mode for containerization
- **Static generation**: Enabled for performance
- **Image optimization**: AVIF/WebP with multiple sizes
- **Bundle splitting**: Optimized chunks for caching
- **CSP**: Content Security Policy (currently disabled for static gen)

### Development Features

- **Turbopack**: Fast development builds
- **Hot reload**: Component-level updates
- **Type checking**: Real-time TypeScript validation
- **Linting**: Automatic code quality checks

## Business Context

### Target Audience

- Tourists visiting Greece seeking outdoor adventures
- Families looking for safe, guided activities
- Adventure enthusiasts interested in river sports
- International visitors (primary English, secondary Greek)

### Key Features

- Multilingual support (English/Greek) with i18n routing
- Online booking integration via Bokun widgets
- GDPR-compliant consent management with c15t
- Performance-optimized with static generation
- Google Analytics and conversion tracking
- Responsive design with vintage/rustic aesthetic
- SEO-optimized with structured data

## Security & Privacy

### GDPR Compliance

- **c15t consent management**: Cookie consent handling
- **Privacy settings**: User control over data collection
- **Analytics**: GDPR-compliant tracking implementation

### Content Security

- **CSP headers**: Content Security Policy configuration
- **Input validation**: TypeScript strict mode
- **Dependency scanning**: Regular security audits

## Performance Optimization

### Frontend Performance

- **Static generation**: Pre-built pages for faster loading
- **Image optimization**: Modern formats with responsive sizing
- **Code splitting**: Lazy loading for unused components
- **Bundle analysis**: Regular size monitoring

### Third-Party Integration

- **Partytown**: Web worker for external scripts
- **Feature flags**: Conditional loading of heavy integrations
- **Analytics**: Performance monitoring with Vercel Analytics

## Accessibility & SEO

### Accessibility Features

- **Radix UI**: Accessible component primitives
- **Semantic HTML**: Proper heading hierarchy
- **ARIA labels**: Screen reader support
- **Keyboard navigation**: Full accessibility support

### SEO Optimization

- **Static generation**: Search engine friendly
- **Structured data**: Rich snippets for better indexing
- **Sitemap**: Automatic generation
- **Meta tags**: Optimized for search engines

## Deployment & Monitoring

### Build Process

- **Static export**: Self-contained build output
- **Asset optimization**: Compressed images and fonts
- **Bundle splitting**: Optimized caching strategy
- **Error handling**: Graceful degradation

### Monitoring

- **Vercel Analytics**: Performance tracking
- **Google Analytics**: User behavior analysis
- **Error boundaries**: Graceful error handling
- **Build monitoring**: CI/CD pipeline integration

## Design System

### Visual Identity

- **Custom vintage design system**: Earthy green/beige palette
- **Responsive design**: Mobile-first approach
- **Consistent typography**: Semantic heading hierarchy
- **Brand consistency**: Cohesive visual language

### Component Library

- **Reusable components**: Modular design system
- **Accessibility-first**: WCAG compliance
- **Performance-optimized**: Lazy loading and code splitting
- **Type-safe**: Full TypeScript coverage
