# CI/CD Pipeline Documentation

This document describes the automated CI/CD pipeline for the Pony Club project, including setup, configuration, and troubleshooting.

## Overview

The project uses GitHub Actions for continuous integration and deployment. The pipeline ensures code quality, security, and build integrity before changes are merged or deployed.

## Pipeline Configuration

### Workflow File Location
- **File**: `.github/workflows/ci.yml`
- **Triggers**: Push to `main`/`develop` branches, Pull Requests
- **Runner**: Ubuntu Latest

### Pipeline Jobs

#### 1. Lint and Type Check Job

**Purpose**: Validates code quality and type safety

**Steps**:
1. **Checkout code** - Retrieves the latest code
2. **Setup Node.js** - Installs Node.js v18 with npm cache
3. **Setup pnpm** - Installs latest pnpm package manager
4. **Install dependencies** - Runs `pnpm install --frozen-lockfile`
5. **Type check** - Executes `pnpm type-check`
6. **Run Knip** - Executes `pnpm knip` for unused code detection
7. **Security audit** - Runs `pnpm security:audit`

**Duration**: ~2-3 minutes

#### 2. Build Job

**Purpose**: Verifies the application builds successfully

**Dependencies**: Requires `lint-and-type-check` job to pass

**Steps**:
1. **Checkout code** - Retrieves the latest code
2. **Setup Node.js** - Installs Node.js v18 with npm cache
3. **Setup pnpm** - Installs latest pnpm package manager
4. **Install dependencies** - Runs `pnpm install --frozen-lockfile`
5. **Build application** - Executes `pnpm build`
6. **Upload artifacts** - Stores build files for 1 day

**Duration**: ~3-5 minutes

## Quality Checks Explained

### TypeScript Type Checking

**Command**: `pnpm type-check`
**Purpose**: Ensures all TypeScript code compiles without errors

**Common Failures**:
- Missing type definitions
- Incorrect type usage
- Import/export errors

**Resolution**:
```bash
# Run locally to debug
pnpm type-check

# Fix type errors in your code
# Add missing type definitions if needed
```

### Knip Analysis

**Command**: `pnpm knip`
**Purpose**: Detects unused files, dependencies, and exports

**What it checks**:
- Unused files that aren't imported anywhere
- Dependencies in package.json that aren't used
- Exported functions/components that aren't imported
- Missing dependencies that are used but not listed

**Common Failures**:
- Genuinely unused code that should be removed
- False positives that need configuration updates
- Missing dependencies after cleanup

**Resolution**:
```bash
# Run locally to see issues
pnpm knip

# For false positives, update knip.json:
{
  "ignore": ["path/to/file.ts"],
  "ignoreDependencies": ["package-name"]
}

# For genuine issues, clean up the code
```

### Security Audit

**Command**: `pnpm security:audit`
**Purpose**: Checks for known security vulnerabilities in dependencies

**Common Failures**:
- Outdated packages with security issues
- Transitive dependencies with vulnerabilities

**Resolution**:
```bash
# Run locally to see vulnerabilities
pnpm audit

# Fix automatically if possible
pnpm audit fix

# Update specific packages
pnpm update vulnerable-package
```

### Build Verification

**Command**: `pnpm build`
**Purpose**: Ensures the application can be built for production

**Common Failures**:
- Missing dependencies
- Build configuration errors
- Runtime errors during build

**Resolution**:
```bash
# Test build locally
pnpm build

# Check for missing dependencies
# Fix configuration issues
# Resolve any runtime errors
```

## Troubleshooting CI Failures

### Knip Failures

#### Scenario 1: False Positive - Used Code Reported as Unused

**Error Example**:
```
Unused files (1)
components/ui/button.tsx
```

**Solution**:
1. Verify the file is actually used
2. If it's a UI component used indirectly, update `knip.json`:
   ```json
   {
     "ignore": ["components/ui/**/*.tsx"]
   }
   ```

#### Scenario 2: Unused Dependencies

**Error Example**:
```
Unused dependencies (3)
@radix-ui/react-button
lodash
date-fns
```

**Solution**:
1. Remove genuinely unused packages:
   ```bash
   pnpm remove unused-package
   ```
2. For indirect dependencies, add to ignore list:
   ```json
   {
     "ignoreDependencies": ["@radix-ui/react-button"]
   }
   ```

#### Scenario 3: Missing Dependencies

**Error Example**:
```
Unlisted dependencies (1)
some-package  components/MyComponent.tsx
```

**Solution**:
```bash
pnpm add some-package
```

### Type Check Failures

#### Scenario 1: Missing Type Definitions

**Error Example**:
```
Could not find a declaration file for module 'some-package'
```

**Solution**:
```bash
pnpm add -D @types/some-package
```

#### Scenario 2: Type Errors

**Error Example**:
```
Type 'string' is not assignable to type 'number'
```

**Solution**:
1. Fix the type error in your code
2. Add proper type annotations
3. Use type assertions if necessary (carefully)

### Build Failures

#### Scenario 1: Missing Dependencies

**Error Example**:
```
Module not found: Can't resolve 'missing-package'
```

**Solution**:
```bash
pnpm add missing-package
```

#### Scenario 2: Configuration Issues

**Error Example**:
```
Invalid configuration in next.config.js
```

**Solution**:
1. Review and fix configuration files
2. Check for syntax errors
3. Validate configuration against documentation

### Security Audit Failures

#### Scenario 1: High Severity Vulnerabilities

**Error Example**:
```
found 3 high severity vulnerabilities
```

**Solution**:
1. Update vulnerable packages immediately:
   ```bash
   pnpm audit fix
   ```
2. If auto-fix doesn't work, update manually:
   ```bash
   pnpm update vulnerable-package
   ```

## Local Development Workflow

### Before Pushing Code

Always run these checks locally before pushing:

```bash
# Install dependencies
pnpm install

# Run all quality checks
pnpm type-check
pnpm knip
pnpm security:audit

# Test production build
pnpm build
```

### Fixing Issues Locally

1. **Type errors**: Fix TypeScript issues
2. **Knip issues**: Clean up unused code or update configuration
3. **Security issues**: Update vulnerable dependencies
4. **Build errors**: Resolve missing dependencies or configuration issues

## Pipeline Maintenance

### Updating Node.js Version

To update the Node.js version used in CI:

1. **Update workflow file**:
   ```yaml
   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
       node-version: '20'  # Update version here
   ```

2. **Test locally** with the new Node.js version
3. **Update documentation** to reflect the change

### Adding New Quality Checks

To add new checks to the pipeline:

1. **Add to workflow**:
   ```yaml
   - name: New Check
     run: pnpm new-check-command
   ```

2. **Add corresponding script** to package.json:
   ```json
   {
     "scripts": {
       "new-check": "new-check-command"
     }
   }
   ```

3. **Update documentation** and development guides

### Updating Action Versions

Regularly update GitHub Actions to latest versions:

```yaml
- uses: actions/checkout@v4      # Check for v5
- uses: actions/setup-node@v4    # Check for v5
- uses: pnpm/action-setup@v4     # Check for v5
```

## Performance Optimization

### Caching Strategy

The pipeline uses several caching mechanisms:

1. **Node.js cache**: Caches npm packages
2. **pnpm cache**: Caches pnpm store
3. **Build cache**: Next.js build cache (if configured)

### Parallel Execution

Currently, jobs run sequentially for safety. Consider parallelizing independent checks:

```yaml
jobs:
  type-check:
    # TypeScript checking
  
  knip-check:
    # Unused code detection
  
  security-audit:
    # Security scanning
  
  build:
    needs: [type-check, knip-check, security-audit]
    # Build only after all checks pass
```

## Monitoring and Alerts

### Key Metrics to Monitor

- **Build success rate**: Should be >95%
- **Build duration**: Should remain stable
- **Queue time**: Should be minimal
- **Failure patterns**: Identify recurring issues

### Setting Up Notifications

Configure GitHub notifications for:
- Failed builds on main branch
- Security vulnerabilities
- Long-running builds

## Best Practices

### For Developers

1. **Run checks locally** before pushing
2. **Fix issues promptly** when CI fails
3. **Keep dependencies updated** regularly
4. **Monitor build times** and optimize if needed

### For Maintainers

1. **Review CI failures** promptly
2. **Update pipeline configuration** as needed
3. **Monitor security advisories** for dependencies
4. **Keep documentation current** with pipeline changes

This CI/CD pipeline ensures code quality and prevents issues from reaching production while maintaining developer productivity.
