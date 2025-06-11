# Project Commands

This document lists common CLI commands for the Pony Club project, derived from the `scripts` section of `package.json`.

## Development

- **`pnpm dev`**

  - Command: `next dev --turbopack`
  - Description: Starts the Next.js development server using Turbopack for faster builds. This is likely the primary command for local development.

- **`pnpm dev:webpack`**

  - Command: `next dev`
  - Description: Starts the Next.js development server using Webpack. Useful if you encounter issues with Turbopack or need Webpack-specific features.

- **`pnpm dev:trace`**
  - Command: `NEXT_TURBOPACK_TRACING=1 next dev --turbopack`
  - Description: Starts the Next.js development server with Turbopack tracing enabled, for debugging Turbopack performance.

## Build & Production

- **`pnpm build`**

  - Command: `pnpm audit --audit-level moderate && node scripts/generate-sitemap-data.js && next build && cp -r public .next/standalone/`
  - Description: Builds the application for production. Includes a security audit, sitemap generation, the Next.js build, and copies the `public` directory into the `.next/standalone` output for the self-contained server.

- **`pnpm start`**
  - Command: `node .next/standalone/server.js`
  - Description: Starts the application from the standalone production build. This is the command to run on the production server.

## Linting & Analysis

- **`pnpm lint`**

  - Command: `next lint`
  - Description: Runs ESLint to check for code quality and style issues.

- **`pnpm lint:fix`**

  - Command: `next lint --fix`
  - Description: Automatically fixes fixable ESLint issues.

- **`pnpm format`**

  - Command: `prettier --write .`
  - Description: Formats all project files with Prettier.

- **`pnpm code-quality`**

  - Command: `pnpm run type-check && pnpm run lint:report && pnpm run format:check`
  - Description: A comprehensive check that runs TypeScript validation, generates an ESLint report, and verifies Prettier formatting without making changes.

- **`pnpm fix-all`**

  - Command: `pnpm run lint:fix && pnpm run format`
  - Description: A convenient script to automatically fix both ESLint and Prettier issues.

- **`pnpm analyze`**
  - Command: `ANALYZE=true next build`
  - Description: Builds the application and opens the Webpack Bundle Analyzer (or equivalent for Turbopack if supported) to inspect bundle sizes.

## Type Checking & Security

- **`npx tsc --noEmit`**

  - Description: Type check TypeScript files without building. Useful for catching type errors during development.

- **`npx tsc --noEmit --watch`**

  - Description: Continuous type checking in watch mode for development.

- **`pnpm security:audit`**
  - Command: `pnpm audit --audit-level moderate`
  - Description: Checks for security vulnerabilities in dependencies with a moderate or higher severity.

## Testing & Debugging

- **CSP Violation Testing**

  - Open browser console and check for Content Security Policy violations
  - Look for "Refused to execute..." or "Refused to load..." messages

- **GDPR Consent Testing**

  - Clear localStorage: `localStorage.removeItem('ponyclub-cookie-consent')`
  - Refresh page to test consent banner functionality

- **Google Maps Testing**
  - Ensure `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in `.env.local`
  - Accept analytics cookies to enable map loading

Remember to use `pnpm` (or `npm run`, `yarn` depending on your package manager, though `pnpm-lock.yaml` suggests `pnpm`) to execute these scripts (e.g., `pnpm dev`).
