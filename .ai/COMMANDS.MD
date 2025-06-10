# Project Commands

This document lists common CLI commands for the Pony Club project, derived from the `scripts` section of `package.json`.

## Development
-   **`pnpm dev`**
    -   Command: `next dev --turbopack`
    -   Description: Starts the Next.js development server using Turbopack for faster builds. This is likely the primary command for local development.

-   **`pnpm dev:webpack`**
    -   Command: `next dev`
    -   Description: Starts the Next.js development server using Webpack. Useful if you encounter issues with Turbopack or need Webpack-specific features.

-   **`pnpm dev:trace`**
    -   Command: `NEXT_TURBOPACK_TRACING=1 next dev --turbopack`
    -   Description: Starts the Next.js development server with Turbopack tracing enabled, for debugging Turbopack performance.

## Build & Production
-   **`pnpm build`**
    -   Command: `pnpm audit --audit-level moderate && node scripts/generate-sitemap-data.js && next build`
    -   Description: Builds the application for production. Includes security audit, sitemap generation, and Next.js build with TypeScript checking.

-   **`pnpm start`**
    -   Command: `next start`
    -   Description: Starts the Next.js production server after a successful build.

## Linting & Analysis
-   **`pnpm lint`**
    -   Command: `next lint`
    -   Description: Runs ESLint to check for code quality and style issues.

-   **`pnpm analyze`**
    -   Command: `ANALYZE=true next build`
    -   Description: Builds the application and opens the Webpack Bundle Analyzer (or equivalent for Turbopack if supported) to inspect bundle sizes.

## Type Checking & Security
-   **`npx tsc --noEmit`**
    -   Description: Type check TypeScript files without building. Useful for catching type errors during development.

-   **`npx tsc --noEmit --watch`**
    -   Description: Continuous type checking in watch mode for development.

-   **`pnpm audit`**
    -   Command: `pnpm audit --audit-level moderate`
    -   Description: Check for security vulnerabilities in dependencies. Included in build process.

## Testing & Debugging
-   **CSP Violation Testing**
    -   Open browser console and check for Content Security Policy violations
    -   Look for "Refused to execute..." or "Refused to load..." messages

-   **GDPR Consent Testing**
    -   Clear localStorage: `localStorage.removeItem('ponyclub-cookie-consent')`
    -   Refresh page to test consent banner functionality

-   **Google Maps Testing**
    -   Ensure `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in `.env.local`
    -   Accept analytics cookies to enable map loading

Remember to use `pnpm` (or `npm run`, `yarn` depending on your package manager, though `pnpm-lock.yaml` suggests `pnpm`) to execute these scripts (e.g., `pnpm dev`).
