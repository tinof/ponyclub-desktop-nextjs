# Pony Club

[![CI/CD Pipeline](https://github.com/[username]/ponyclub-v0/actions/workflows/ci.yml/badge.svg)](https://github.com/[username]/ponyclub-v0/actions/workflows/ci.yml)

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

- **CI/CD**: GitHub Actions with parallel quality checks

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

### Code Quality & CI
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run automated tests (placeholder - configure Jest/Vitest)

### Maintenance & Analysis
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

This project maintains high code quality through a comprehensive suite of automated tools and processes:

### 🛠️ Code Formatting & Linting with Biome

We use [Biome](https://biomejs.dev/) as our formatter and linter to ensure consistent code style and catch issues early.

- Biome is installed as a dev dependency: `@biomejs/biome`
- Configuration is in `biome.json` at the project root
- Run formatting and linting with:

```bash
pnpm check          # Format, lint, and apply safe fixes
pnpm lint           # Lint only
pnpm format         # Format only
```

- For performance profiling, use:

```bash
pnpm lint:trace     # Lint with tracing logs
pnpm check:trace    # Check with tracing logs
```

- Editor integration: Use the Biome VS Code extension for real-time feedback and auto-format on save.

### 🔧 Git Hooks with Lefthook

We use [Lefthook](https://github.com/evilmartians/lefthook) to automate code quality checks on git actions.

- Install hooks locally with:

```bash
npx lefthook install
```

- Hooks run on:

  - **pre-commit**: Formats, lints, and stages fixes on staged files
  - **pre-push**: Runs Biome check, type-check, and security audit on pushed files

### 🔍 Type Safety & Analysis

- **TypeScript** with strict mode configuration
- **Knip** for detecting unused files, dependencies, and exports
- Automated type checking during build process
- Runtime type validation where needed

### 🛡️ Security & Performance

- Regular security audits of dependencies
- Performance monitoring and optimization
- Bundle size analysis and optimization
- Automated vulnerability scanning

### 📋 Pre-Commit Quality Checklist

Before pushing code, run these commands locally:

```bash
# 1. Format and lint your code
pnpm check

# 2. Verify TypeScript types
pnpm type-check

# 3. Check for unused code
pnpm knip

# 4. Security audit
pnpm security:audit

# 5. Test the build
pnpm build
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

## 🔄 CI/CD Pipeline

Our professional CI/CD pipeline ensures code quality and prevents issues from reaching production through automated checks on every pull request and push.

### 🏗️ GitHub Actions Workflow Architecture

The pipeline (`.github/workflows/ci.yml`) uses **3 parallel jobs** for maximum efficiency:

#### 1. 🔍 Quality Checks Job
**Runs in parallel** - Fast feedback on code quality issues
```yaml
- TypeScript Type Check             # pnpm type-check
- Knip (Unused Code) Check         # pnpm knip
- Security Audit Dependencies      # pnpm security:audit
```

#### 2. 🧪 Automated Tests Job
**Runs in parallel** - Validates functionality
```yaml
- Unit Tests                       # pnpm test
- Component Tests                  # (Ready for Jest/Vitest setup)
- Integration Tests                # (Expandable)
```

#### 3. 🏗️ Build Verification Job
**Runs after** quality checks and tests pass
```yaml
- Production Build                 # pnpm build
- Build Artifact Verification      # Ensures deployability
```

### ⚡ Pipeline Benefits

- **Parallel Execution**: Quality checks and tests run simultaneously
- **Fast Feedback**: Issues caught in ~2-3 minutes
- **Quality Gates**: Prevents bad code from merging
- **Build Safety**: Ensures production deployability
- **Developer Experience**: Clear error messages and actionable feedback

### 🎯 Quality Gates & Standards

The CI pipeline enforces these standards:

| Check | Tool | Purpose | Failure Impact |
|-------|------|---------|----------------|
| **Type Safety** | TypeScript | Runtime error prevention | ❌ Blocks merge |
| **Unused Code** | Knip | Codebase cleanliness | ⚠️ Warning (configurable) |
| **Security** | pnpm audit | Vulnerability detection | ⚠️ Warning (moderate+) |
| **Build** | Next.js | Production readiness | ❌ Blocks merge |

### 🚨 Troubleshooting CI Failures

#### **TypeScript Failures**
```bash
# Check types locally
pnpm type-check

# Common fixes:
# - Add missing type annotations
# - Fix import/export types
# - Update component prop types
```

#### **Knip Failures (Unused Code)**
```bash
# Review unused items
pnpm knip

# Actions:
# - Remove unused files/dependencies
# - Update knip.json if false positive
# - Add to ignore list if intentionally unused
```

#### **Security Audit Failures**
```bash
# Check vulnerabilities
pnpm security:audit

# Fix high/critical issues:
pnpm audit --fix
```

#### **Build Failures**
```bash
# Test build locally
pnpm build

# Common issues:
# - Missing environment variables
# - Import/export errors
# - Configuration problems
```

### 🔧 Local Development Integration

**Before pushing code:**
```bash
# Quick check (recommended)
pnpm ci:check && pnpm type-check

# Full quality check
pnpm check && pnpm type-check && pnpm knip

# Test production build
pnpm build
```

**IDE Integration:**
- Biome extension provides real-time feedback
- TypeScript errors shown inline
- Auto-format on save available

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
- **Pre-Commit**: Run `pnpm ci:check && pnpm type-check` before pushing
- **Code Quality**: Use `pnpm check` to format and fix issues automatically
- **Security**: Run `pnpm security:audit` weekly
- **Performance**: Use `pnpm analyze` to monitor bundle size
- **CI Status**: Check GitHub Actions for pipeline status
- **Maintenance**: Follow the [Maintenance Guide](MAINTENANCE.md) for regular tasks
