# Project Stack

This document lists the key technologies, libraries, and integrations used in the Pony Club project. Specific versions are noted where applicable and can be cross-referenced with `package.json`.

## Core Frameworks & Libraries
-   **Next.js:** 15.3.2
-   **React:** 19.1.0
-   **TypeScript:** 5.8.3 (devDependencies)
-   **Tailwind CSS:** 4.1.6 (devDependencies, with `@tailwindcss/postcss`)

## UI & Component Libraries
-   **Radix UI:** Various components (see `package.json` for specific versions like `@radix-ui/react-accordion`, `@radix-ui/react-dialog`, etc.)
-   **Shadcn UI:** Inferred (based on `components.json`, `tailwind-merge`, `clsx`, `class-variance-authority`, `tailwindcss-animate`, and extensive use of Radix UI primitives).
-   **Lucide React:** 0.509.0 (for icons)
-   **Tailwind Merge:** 3.2.0
-   **clsx:** 2.1.1
-   **class-variance-authority:** 0.7.1
-   **tailwindcss-animate:** 1.0.7

## Forms & Validation
-   **React Hook Form:** 7.56.3
-   **Zod:** 3.24.4
-   **@hookform/resolvers:** 5.0.1 (likely for Zod integration with React Hook Form)
-   **input-otp:** 1.4.2

## State Management & Theming
-   **Next-Themes:** 0.4.6 (for theme management, e.g., dark mode)

## Analytics & Monitoring
-   **@vercel/analytics:** 1.5.0
-   **@vercel/speed-insights:** 1.2.0

## Other Notable Libraries
-   **date-fns:** 4.1.0 (for date utilities)
-   **embla-carousel-react:** 8.6.0 (for carousels)
-   **framer-motion:** 12.12.1 (for animations)
-   **leaflet:** 1.9.4 (for maps, with `@types/leaflet`)
-   **recharts:** 2.15.3 (for charts)
-   **sonner:** 2.0.3 (for toast notifications)
-   **vaul:** 1.1.2 (for drawers)

## Development Tools
-   **PostCSS:** 8.5.3
-   **Autoprefixer:** 10.4.21
-   **ESLint:** (via `next lint`)
-   **Prettier:** (Assumed, standard for most projects, though not explicitly in `package.json` scripts/deps)

This list is not exhaustive but covers the primary components of the project's technology stack. Refer to `package.json` for a complete list of dependencies.
