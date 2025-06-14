# Pony Club

A web application built with Next.js and React.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15.2)
- **UI Library**: [React](https://react.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v3.4)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with Zod
  validation
- **Typescript**: For type safety and developer experience
- **Visualization**: Recharts for data visualization
- **Icons**: Lucide React
- **Maps**: Google Maps Embed (via @next/third-parties)

## Local Development

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm package manager

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd ponyclub-v0
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see
   the application.

## Available Scripts

The following scripts are available for development and production:

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm dev:webpack` - Start development server with Webpack
- `pnpm dev:trace` - Start development server with Turbopack tracing enabled

### Build & Production
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm analyze` - Analyze bundle size

### Quality & Maintenance
- `pnpm type-check` - Run TypeScript type checking
- `pnpm knip` - Detect unused files, dependencies, and exports
- `pnpm security:audit` - Run security audit
- `pnpm performance:check` - Run performance checks
- `pnpm performance:compress-video` - Compress hero video assets

## Production Build

To create and run a production build locally:

```bash
pnpm build
pnpm start
```

## Code Quality & Maintenance

This project maintains high code quality and cleanliness through multiple automated tools:

### Type Safety
- **TypeScript** with strict mode configuration
- Automated type checking during build process
- Runtime type validation where needed

### Code Cleanliness
- **Knip** for detecting unused files, dependencies, and exports
- Automated dependency cleanup and optimization
- CI/CD integration to prevent code bloat

### Performance & Security
- Performance monitoring and optimization
- Regular security audits of dependencies
- Bundle size analysis and optimization

### Running Code Quality Checks

To run all code quality checks locally:

```bash
# Type checking
pnpm type-check

# Unused code detection
pnpm knip

# Security audit
pnpm security:audit
```

### About Knip

[Knip](https://knip.dev/) is a comprehensive tool that finds unused files, dependencies, and exports in your project. It helps maintain a clean codebase by:

- **Detecting unused dependencies** - Identifies packages that can be safely removed
- **Finding unused files** - Locates components and modules that are no longer imported
- **Cleaning exports** - Removes unused exports from modules
- **Preventing code bloat** - Runs in CI to catch unused code before it's merged

**Benefits:**
- Faster builds and smaller bundle sizes
- Reduced maintenance overhead
- Cleaner, more maintainable codebase
- Lower security surface area

> **Note**: This project previously used ESLint and Prettier for code formatting and linting. These tools have been removed in preparation for migration to Biome, a faster all-in-one toolchain for web projects.

## CI/CD Pipeline

This project includes automated CI/CD checks that run on every pull request and push to main branches:

### Automated Checks
- **Type Safety**: TypeScript compilation and type checking
- **Code Cleanliness**: Knip analysis for unused code detection
- **Security**: Dependency vulnerability scanning
- **Build Verification**: Ensures the application builds successfully

### GitHub Actions Workflow

The CI pipeline (`.github/workflows/ci.yml`) runs the following jobs:

1. **Lint and Type Check**
   - Install dependencies with pnpm
   - Run TypeScript type checking
   - Execute Knip for unused code detection
   - Perform security audit

2. **Build**
   - Create production build
   - Upload build artifacts for verification

### Troubleshooting CI Failures

**Knip Failures:**
- Review the unused files/dependencies reported
- Update `knip.json` configuration if false positives are detected
- Remove genuinely unused code before merging

**Type Check Failures:**
- Fix TypeScript errors locally with `pnpm type-check`
- Ensure all imports and exports are properly typed

**Build Failures:**
- Test the build locally with `pnpm build`
- Check for missing dependencies or configuration issues

## Deployment to Vercel

### Option 1: Deploy from the Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: next build (default)
   - Output Directory: .next (default)
   - Install Command: pnpm install (make sure to select pnpm as package manager)
6. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:

   ```bash
   pnpm install -g vercel
   ```

2. Log in to Vercel:

   ```bash
   vercel login
   ```

3. Deploy from your project directory:

   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

For more deployment options and configuration, refer to the
[Vercel documentation](https://vercel.com/docs).

## Documentation

### Development Guides
- **[Development Guide](DEVELOPMENT.md)** - Comprehensive setup and workflow instructions
- **[Maintenance Guide](MAINTENANCE.md)** - Regular maintenance tasks and best practices
- **[CI/CD Pipeline](docs/ci-cd-pipeline.md)** - Automated testing and deployment documentation
- **[Package Management](docs/package-management.md)** - Dependency management and Knip integration

### Project Documentation
- **[Performance Optimization](docs/performance-optimization-implementation.md)** - Performance improvement strategies
- **[GDPR Implementation](docs/gdpr-implementation.md)** - Privacy compliance documentation
- **[Google Analytics Setup](docs/google-analytics-tracking-implementation.md)** - Analytics configuration
- **[Turbopack Optimization](docs/turbopack-optimization.md)** - Build optimization with Turbopack

### Quick Reference
- **Code Quality**: Run `pnpm type-check && pnpm knip` before committing
- **Security**: Run `pnpm security:audit` weekly
- **Performance**: Use `pnpm analyze` to monitor bundle size
- **Maintenance**: Follow the [Maintenance Guide](MAINTENANCE.md) for regular tasks
