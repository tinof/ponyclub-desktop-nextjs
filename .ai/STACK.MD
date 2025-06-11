# Project Stack

This document lists the key technologies, libraries, and integrations used in the Pony Club project. Specific versions are noted where applicable and can be cross-referenced with `package.json`.

## Core Frameworks & Libraries

- **Next.js:** 15.3.2
- **React:** 19.1.0
- **TypeScript:** 5.8.3 (devDependencies)
- **Tailwind CSS:** 4.1.6 (devDependencies, with `@tailwindcss/postcss`)

## UI & Component Libraries

- **Radix UI:** Various components (see `package.json` for specific versions like `@radix-ui/react-accordion`, `@radix-ui/react-dialog`, etc.)
- **Shadcn UI:** Inferred (based on `components.json`, `tailwind-merge`, `clsx`, `class-variance-authority`, `tailwindcss-animate`, and extensive use of Radix UI primitives).
- **Lucide React:** 0.509.0 (for icons)
- **Tailwind Merge:** 3.2.0
- **clsx:** 2.1.1
- **class-variance-authority:** 0.7.1
- **tailwindcss-animate:** 1.0.7

## Forms & Validation

- **React Hook Form:** 7.56.3
- **Zod:** 3.24.4
- **@hookform/resolvers:** 5.0.1 (likely for Zod integration with React Hook Form)
- **input-otp:** 1.4.2

## State Management & Theming

- **Next-Themes:** 0.4.6 (for theme management, e.g., dark mode)

## Analytics & Monitoring

- **@sentry/nextjs:** ^9.27.0 (for error and performance monitoring)
- **@vercel/analytics:** 1.5.0
- **@vercel/speed-insights:** 1.2.0

## Maps & Location Services

- **@next/third-parties:** 15.3.2 (GoogleMapsEmbed component for simplified map integration)
- **Google Maps Embed API:** Used via Next.js third-party integration for performance and simplicity

## Security & Compliance

- **@nosecone/next:** CSP (Content Security Policy) automation and security headers
- **GDPR Compliance:** Custom implementation for cookie consent and privacy compliance

## Other Notable Libraries

- **date-fns:** 4.1.0 (for date utilities)
- **embla-carousel-react:** 8.6.0 (for carousels)
- **framer-motion:** 12.12.1 (for animations)
- **recharts:** 2.15.3 (for charts)
- **sonner:** 2.0.3 (for toast notifications)
- **vaul:** 1.1.2 (for drawers)
- **cmdk:** 1.1.1 (for command menus)
- **react-resizable-panels:** 3.0.1

## Performance & Optimization

- **critters:** ^0.0.25 (for inlining critical CSS)

## Development Tools

- **PostCSS:** 8.5.3
- **Autoprefixer:** 10.4.21
- **ESLint:** ^9.28.0 (with a comprehensive plugin set for React, Next.js, and TypeScript)
- **Prettier:** ^3.5.3 (for automated code formatting)
- **@next/bundle-analyzer:** 15.3.2 (for inspecting bundle sizes)

This list is not exhaustive but covers the primary components of the project's technology stack. Refer to `package.json` for a complete list of dependencies.
