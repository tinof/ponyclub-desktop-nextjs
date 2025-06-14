# Project Maintenance Guide

This guide outlines regular maintenance tasks and best practices for keeping the Pony Club project healthy, secure, and performant.

## Regular Maintenance Tasks

### Weekly Tasks

#### 1. Dependency Health Check
```bash
# Check for security vulnerabilities
pnpm audit

# Update patch versions (safe updates)
pnpm update

# Run quality checks after updates
pnpm type-check
pnpm knip
pnpm build
```

#### 2. Code Cleanliness Review
```bash
# Check for unused code
pnpm knip

# Review and clean up any reported issues
# Update knip.json if false positives are found
```

#### 3. Performance Monitoring
```bash
# Analyze bundle size
pnpm analyze

# Check for performance regressions
pnpm performance:check
```

### Monthly Tasks

#### 1. Major Dependency Updates
```bash
# Check for outdated packages
pnpm outdated

# Update major versions carefully (test thoroughly)
pnpm add package-name@latest

# Run full test suite after major updates
pnpm type-check
pnpm knip
pnpm build
```

#### 2. Knip Configuration Review
- Review `knip.json` for outdated ignore patterns
- Remove ignore rules for dependencies that are no longer used
- Add new patterns for recently added UI components or utilities

#### 3. Documentation Updates
- Update README.md with any new scripts or processes
- Review and update DEVELOPMENT.md for accuracy
- Update this MAINTENANCE.md with new procedures

### Quarterly Tasks

#### 1. Comprehensive Security Audit
```bash
# Run detailed security audit
pnpm security:audit

# Review and update security-related dependencies
# Check for any security advisories for used packages
```

#### 2. Performance Optimization
```bash
# Compress and optimize assets
pnpm performance:compress-video

# Review and optimize images in /public/images/
# Analyze Core Web Vitals and performance metrics
```

#### 3. Codebase Health Assessment
- Review overall project structure
- Identify and refactor any technical debt
- Update TypeScript and Next.js to latest stable versions

## Knip Configuration Management

### Understanding the Current Configuration

The `knip.json` file contains several important sections:

```json
{
  "entry": ["scripts/**/*.js"],           // Entry points for analysis
  "ignore": [                             // Files to completely ignore
    "components/ui/**/*.tsx",             // shadcn/ui components
    "hooks/use-mobile.tsx",               // Utility hooks
    "lib/gallery-data/**/*.ts",           // Data files
    "lib/image-optimization.ts"           // Utility functions
  ],
  "ignoreDependencies": [                 // Dependencies to ignore
    "tailwindcss",                        // Build tools
    "@radix-ui/react-*",                  // UI primitives
    "cmdk", "sonner", "vaul"              // UI components
  ],
  "ignoreExportsUsedInFile": true         // Ignore internal exports
}
```

### When to Update Knip Configuration

#### Adding New UI Components
When installing new shadcn/ui components:

1. **Install the component:**
   ```bash
   npx shadcn-ui@latest add button
   ```

2. **Check if Knip reports it as unused:**
   ```bash
   pnpm knip
   ```

3. **If reported as unused, add to ignore patterns:**
   ```json
   {
     "ignoreDependencies": [
       "@radix-ui/react-button"
     ]
   }
   ```

#### Adding Utility Libraries
For packages that provide utilities used indirectly:

1. **Add to ignoreDependencies:**
   ```json
   {
     "ignoreDependencies": [
       "lodash",
       "date-fns"
     ]
   }
   ```

2. **Document the reason:**
   ```json
   {
     "ignoreDependencies": [
       "lodash",  // Used by recharts internally
       "date-fns" // Used in utility functions
     ]
   }
   ```

#### Removing Outdated Ignores
Regularly review and clean up:

1. **Check if ignored dependencies are still needed:**
   ```bash
   # Temporarily remove from ignore list
   # Run knip to see if still unused
   pnpm knip
   ```

2. **Remove genuinely unused packages:**
   ```bash
   pnpm remove unused-package
   ```

3. **Update knip.json to remove the ignore rule**

### Common Knip Patterns

#### UI Component Libraries
```json
{
  "ignore": [
    "components/ui/**/*.tsx"
  ],
  "ignoreDependencies": [
    "@radix-ui/react-*",
    "class-variance-authority",
    "cmdk",
    "sonner",
    "vaul"
  ]
}
```

#### Data and Utility Files
```json
{
  "ignore": [
    "lib/data/**/*.ts",
    "lib/utils/**/*.ts",
    "types/**/*.d.ts"
  ]
}
```

#### Build and Development Tools
```json
{
  "ignoreDependencies": [
    "tailwindcss",
    "autoprefixer",
    "postcss",
    "@types/*"
  ]
}
```

## Dependency Management Best Practices

### Adding Dependencies

1. **Research before adding:**
   - Check bundle size impact
   - Review security and maintenance status
   - Consider alternatives

2. **Install and test:**
   ```bash
   pnpm add package-name
   pnpm knip
   pnpm build
   ```

3. **Update documentation:**
   - Add to README.md tech stack if significant
   - Update knip.json if needed
   - Document usage in code comments

### Removing Dependencies

1. **Identify unused packages:**
   ```bash
   pnpm knip
   ```

2. **Remove safely:**
   ```bash
   pnpm remove package-name
   ```

3. **Clean up references:**
   - Remove imports and usage
   - Remove from knip.json ignore lists
   - Update type definitions

4. **Verify removal:**
   ```bash
   pnpm knip
   pnpm build
   ```

### Updating Dependencies

#### Patch Updates (Safe)
```bash
# Update all patch versions
pnpm update

# Or update specific package
pnpm update package-name
```

#### Minor Updates (Caution)
```bash
# Check what would be updated
pnpm outdated

# Update specific package
pnpm add package-name@^2.1.0
```

#### Major Updates (Careful Testing)
```bash
# Update one at a time
pnpm add package-name@latest

# Test thoroughly
pnpm type-check
pnpm knip
pnpm build
pnpm dev  # Manual testing
```

## Troubleshooting Common Issues

### Knip False Positives

**Issue**: Knip reports used code as unused
**Solution**: 
1. Verify the code is actually used
2. Add to appropriate ignore pattern in knip.json
3. Document why it's ignored

### Build Failures After Cleanup

**Issue**: Build fails after removing dependencies
**Solution**:
1. Check error messages for missing packages
2. Add back necessary dependencies
3. Update knip.json to ignore if needed

### Performance Regressions

**Issue**: Bundle size increases unexpectedly
**Solution**:
1. Run `pnpm analyze` to identify large packages
2. Check for duplicate dependencies
3. Consider code splitting for large components

## CI/CD Maintenance

### GitHub Actions Workflow

The CI pipeline requires occasional maintenance:

#### Updating Node.js Version
```yaml
# In .github/workflows/ci.yml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Update as needed
```

#### Updating Action Versions
```yaml
# Keep actions up to date
- uses: actions/checkout@v4      # Latest
- uses: actions/setup-node@v4    # Latest
- uses: pnpm/action-setup@v4     # Latest
```

#### Adding New Checks
To add new quality checks to CI:

1. **Add to the workflow:**
   ```yaml
   - name: New Check
     run: pnpm new-check-command
   ```

2. **Test locally first:**
   ```bash
   pnpm new-check-command
   ```

3. **Update documentation**

## Emergency Procedures

### Critical Security Vulnerability

1. **Immediate response:**
   ```bash
   pnpm audit
   pnpm audit fix
   ```

2. **If auto-fix isn't available:**
   ```bash
   pnpm update vulnerable-package
   ```

3. **Test and deploy quickly:**
   ```bash
   pnpm build
   # Deploy to production immediately
   ```

### Build System Failure

1. **Clear caches:**
   ```bash
   rm -rf .next
   rm -rf node_modules
   pnpm install
   ```

2. **Check for dependency conflicts:**
   ```bash
   pnpm ls
   ```

3. **Revert recent changes if needed**

### Knip Configuration Corruption

1. **Restore from git:**
   ```bash
   git checkout HEAD -- knip.json
   ```

2. **Or recreate minimal config:**
   ```json
   {
     "$schema": "https://unpkg.com/knip@5/schema.json",
     "ignore": ["components/ui/**/*.tsx"],
     "ignoreDependencies": ["@radix-ui/react-*"]
   }
   ```

## Monitoring and Metrics

### Key Metrics to Track

- **Bundle size**: Monitor with `pnpm analyze`
- **Build time**: Track CI build duration
- **Dependency count**: Keep lean with regular Knip runs
- **Security vulnerabilities**: Weekly audit checks
- **Performance scores**: Use Lighthouse CI

### Setting Up Alerts

Consider setting up alerts for:
- Failed CI builds
- Security vulnerabilities
- Bundle size increases > 10%
- Build time increases > 20%

This maintenance guide should be reviewed and updated quarterly to ensure it remains current with project needs and best practices.
