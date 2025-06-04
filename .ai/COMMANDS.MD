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
    -   Command: `node scripts/generate-sitemap-data.js && next build`
    -   Description: Builds the application for production. Includes a step to generate sitemap data before the Next.js build process.

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

Remember to use `pnpm` (or `npm run`, `yarn` depending on your package manager, though `pnpm-lock.yaml` suggests `pnpm`) to execute these scripts (e.g., `pnpm dev`).
