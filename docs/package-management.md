# Package Management Documentation

This document explains the package.json configuration, dependency management, and the recent cleanup performed with Knip.

## Package.json Overview

### Scripts

The project includes several npm scripts for different development and maintenance tasks:

#### Development Scripts
```json
{
  "dev": "next dev --turbopack",           // Start dev server with Turbopack (recommended)
  "dev:webpack": "next dev",               // Start dev server with Webpack (fallback)
  "dev:trace": "NEXT_TURBOPACK_TRACING=1 next dev --turbopack"  // Dev with tracing
}
```

#### Build and Production Scripts
```json
{
  "build": "pnpm audit --audit-level moderate && node scripts/generate-sitemap-data.js && next build && cp -r public .next/standalone/",
  "start": "node .next/standalone/server.js",
  "analyze": "ANALYZE=true next build"
}
```

**Build Process Explained**:
1. **Security audit** - Checks for vulnerabilities before building
2. **Sitemap generation** - Creates sitemap data for SEO
3. **Next.js build** - Creates production build
4. **Asset copying** - Copies public assets to standalone build

#### Quality and Maintenance Scripts
```json
{
  "type-check": "tsc --noEmit",                              // TypeScript type checking
  "knip": "knip",                                           // Unused code detection
  "security:audit": "pnpm audit --audit-level moderate",    // Security vulnerability scan
  "performance:check": "node scripts/performance-check.js", // Performance analysis
  "performance:compress-video": "./scripts/compress-hero-video.sh"  // Video optimization
}
```

### Dependencies Structure

The project uses a clean, optimized dependency structure after Knip cleanup:

#### Core Framework Dependencies
- **Next.js 15.3.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.8.3** - Type safety

#### UI and Styling
- **Tailwind CSS 4.1.6** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives (multiple packages)
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

#### Development Tools
- **Knip** - Unused code detection
- **Bundle Analyzer** - Bundle size analysis
- **PostCSS** - CSS processing

## Knip Integration and Cleanup

### What Was Cleaned Up

During the Knip integration, the following cleanup was performed:

#### Removed Dependencies (40+ packages)
- **Unused Radix UI components** that weren't being used
- **Form libraries** (react-hook-form, zod) that weren't implemented
- **Utility libraries** (date-fns, lodash) that weren't used
- **UI components** (sonner, vaul, cmdk) that weren't implemented
- **Development tools** (cross-env, @types/lodash) that weren't needed

#### Removed Files (6 files)
- `components/activities-menu.tsx` - Unused navigation component
- `components/hero/HeroSection.tsx` - Unused hero component
- `components/language-selector.tsx` - Unused language switcher
- `components/standalone-menu-items.tsx` - Unused menu component
- `components/SummerProgramCard.tsx` - Unused card component
- `components/ui/use-toast.ts` - Unused toast hook

#### Cleaned Exports
- Removed unused exports from gallery data files
- Cleaned up unused utility function exports
- Removed duplicate exports

### Current Dependency Strategy

#### Kept Dependencies
The following dependencies were kept even though they might appear unused to Knip:

**Radix UI Components** (22 packages):
```json
{
  "@radix-ui/react-accordion": "^1.2.11",
  "@radix-ui/react-alert-dialog": "^1.1.14",
  // ... other Radix UI packages
}
```
**Reason**: Part of shadcn/ui component system, used indirectly

**UI Component Libraries**:
```json
{
  "cmdk": "^1.1.1",                    // Command palette component
  "embla-carousel-react": "^8.6.0",   // Carousel component
  "input-otp": "^1.4.2",              // OTP input component
  "react-day-picker": "^9.7.0",       // Date picker component
  "react-hook-form": "^7.57.0",       // Form management
  "react-resizable-panels": "^3.0.2", // Resizable panels
  "recharts": "^2.15.3",              // Chart library
  "sonner": "^2.0.5",                 // Toast notifications
  "vaul": "^1.1.2"                    // Drawer component
}
```
**Reason**: Part of UI component system, may be used by shadcn/ui components

#### Knip Configuration
The project uses a carefully configured `knip.json` to handle the UI component ecosystem:

```json
{
  "ignore": [
    "components/ui/**/*.tsx",        // Ignore all UI components
    "lib/gallery-data/**/*.ts",     // Ignore data files
    "lib/image-optimization.ts"     // Ignore utility functions
  ],
  "ignoreDependencies": [
    "@radix-ui/react-*",            // Ignore all Radix UI packages
    "class-variance-authority",      // UI utility
    "cmdk", "sonner", "vaul",       // UI components
    "react-day-picker",             // Date picker
    "react-hook-form",              // Form library
    "react-resizable-panels",       // Panel component
    "recharts",                     // Charts
    "embla-carousel-react",         // Carousel
    "input-otp"                     // OTP input
  ]
}
```

## Dependency Management Best Practices

### Adding New Dependencies

1. **Research first**:
   ```bash
   # Check bundle size impact
   npm info package-name
   
   # Check security and maintenance
   npm audit package-name
   ```

2. **Install and configure**:
   ```bash
   # Add the package
   pnpm add package-name
   
   # Update Knip config if needed
   # Add to ignoreDependencies if it's a UI component
   ```

3. **Verify the addition**:
   ```bash
   pnpm knip
   pnpm build
   ```

### Removing Dependencies

1. **Use Knip to identify unused packages**:
   ```bash
   pnpm knip
   ```

2. **Remove safely**:
   ```bash
   pnpm remove package-name
   ```

3. **Clean up configuration**:
   - Remove from `knip.json` ignore lists
   - Remove related imports and usage
   - Update documentation

### Updating Dependencies

#### Regular Updates (Weekly)
```bash
# Update patch versions (safe)
pnpm update

# Check for security issues
pnpm audit
```

#### Major Updates (Monthly)
```bash
# Check what's outdated
pnpm outdated

# Update major versions carefully
pnpm add package-name@latest

# Test thoroughly after updates
pnpm type-check
pnpm knip
pnpm build
```

## Package Manager Configuration

### pnpm Workspace
The project uses pnpm workspaces configured in `pnpm-workspace.yaml`:

```yaml
ignoredBuiltDependencies:
  - '@sentry/cli'
  - '@tailwindcss/oxide'
  - '@vercel/speed-insights'
  - iframe-resizer
  - sharp
  - unrs-resolver
```

### Resolution and Overrides
The package.json includes specific resolutions for compatibility:

```json
{
  "resolutions": {
    "rollup": "^2.79.1",              // Security fix
    "rollup-plugin-terser": "^7.0.2", // Security fix
    "@types/react": "19.1.3",         // Version consistency
    "@types/react-dom": "19.1.3"      // Version consistency
  },
  "overrides": {
    "@types/react": "19.1.3",         // Force specific version
    "@types/react-dom": "19.1.3",     // Force specific version
    "@types/pg": "8.6.0"              // Compatibility fix
  }
}
```

## Troubleshooting

### Common Issues After Dependency Changes

#### Build Failures
```bash
# Clear caches and reinstall
rm -rf .next node_modules
pnpm install
pnpm build
```

#### Type Errors
```bash
# Check for missing type definitions
pnpm add -D @types/missing-package

# Run type check
pnpm type-check
```

#### Knip False Positives
```bash
# Update knip.json configuration
{
  "ignoreDependencies": ["new-package"]
}

# Or ignore specific files
{
  "ignore": ["path/to/file.ts"]
}
```

### Emergency Dependency Recovery

If you accidentally remove a needed dependency:

1. **Check the error message** for the missing package name
2. **Reinstall the package**:
   ```bash
   pnpm add missing-package
   ```
3. **Update Knip configuration** to prevent future removal:
   ```json
   {
     "ignoreDependencies": ["missing-package"]
   }
   ```

## Monitoring and Maintenance

### Regular Tasks

**Weekly**:
- Run `pnpm knip` to check for new unused code
- Update patch versions with `pnpm update`
- Check security with `pnpm audit`

**Monthly**:
- Review and update major versions
- Clean up Knip configuration
- Analyze bundle size with `pnpm analyze`

**Quarterly**:
- Review entire dependency list
- Update Node.js and pnpm versions
- Audit and optimize bundle size

### Key Metrics to Track

- **Total dependencies**: Keep under 100 for maintainability
- **Bundle size**: Monitor with `pnpm analyze`
- **Security vulnerabilities**: Should be zero
- **Build time**: Should remain stable

This package management strategy ensures a clean, secure, and maintainable codebase while supporting the project's UI component ecosystem.
