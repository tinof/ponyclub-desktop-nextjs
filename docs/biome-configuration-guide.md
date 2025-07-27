# Biome v2.1 Configuration Guide

This document explains how to install, configure, and use Biome v2.1 as the unified linter and formatter in this Next.js 15 project. This guide reflects our optimized production configuration and best practices for VSCode integration.

---

## 1. Installation

Add Biome v2.1 as a dev dependency:

```bash
pnpm add -D @biomejs/biome@^2.1.2
```

Update your `package.json` scripts:

```json
"scripts": {
  "lint": "biome lint --max-diagnostics=2000 .",
  "format": "biome format --write .",
  "check": "biome check --write --max-diagnostics=2000 ."
}
```

- `lint`: Run the linter only with increased diagnostic limit
- `format`: Apply code formatting only
- `check`: Run both lint and format with safe auto-fixes

---

## 2. Optimized Configuration (`biome.json`)

Our production-ready configuration for Next.js 15 with TypeScript:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.1.2/schema.json",
  "files": {
    "includes": [
      "**",
      "!node_modules/**",
      "!.next/**",
      "!out/**",
      "!build/**",
      "!dist/**",
      "!.vercel/**",
      "!.turbo/**",
      "!public/~partytown/**",
      "!critical-css/**",
      "!bundle-analysis/**",
      "!.biome-cache/**",
      "!google-ads-data/**",
      "!.augment/**",
      "!.clinerules/**",
      "!docs/**",
      "!specs/**",
      "!.ai/**",
      "!.github/**",
      "!.husky/**",
      "!public/images/**",
      "!public/favicon_io/**",
      "!*.tsbuildinfo",
      "!next-env.d.ts",
      "!biome-report.txt",
      "!tracing.json",
      "!*.tmp",
      "!*.temp",
      "!*.log",
      "!*.md",
      "!*.yml",
      "!*.yaml",
      "!*.png",
      "!*.jpg",
      "!*.jpeg",
      "!*.gif",
      "!*.svg",
      "!*.ico",
      "!*.webp",
      "!*.txt",
      "!.npmrc",
      "!.browserslistrc",
      "!.aidigestignore",
      "!pnpm-lock.yaml",
      "!pnpm-workspace.yaml"
    ],
    "ignoreUnknown": true
  },
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true,
    "defaultBranch": "main"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": "warn",
      "a11y": "warn",
      "complexity": {
        "recommended": true,
        "noUselessFragments": "off"
      },
      "nursery": {
        "recommended": true
      },
      "correctness": {
        "recommended": true,
        "useExhaustiveDependencies": "warn"
      },
      "security": {
        "recommended": true,
        "noDangerouslySetInnerHtml": "off"
      },
      "performance": "warn",
      "suspicious": {
        "recommended": true,
        "noExplicitAny": "warn"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "jsxQuoteStyle": "double",
      "trailingCommas": "all",
      "semicolons": "always",
      "arrowParentheses": "asNeeded"
    }
  },
  "json": {
    "formatter": {
      "enabled": true,
      "indentWidth": 2
    }
  },
  "css": {
    "formatter": {
      "enabled": true,
      "indentWidth": 2
    }
  },
  "assist": {
    "enabled": true
  },
  "overrides": [
    {
      "includes": [
        "scripts/**",
        "next.config.js",
        "middleware.ts",
        "postcss.config.mjs",
        "tailwind.config.js",
        "knip.json",
        "lefthook.yml"
      ],
      "linter": {
        "rules": {
          "correctness": {
            "noNodejsModules": "off"
          }
        }
      }
    },
    {
      "includes": [
        "app/**/privacy-settings/**",
        "components/**/Consent*.tsx",
        "components/**/c15t*.tsx",
        "components/**/ConsentBridge.tsx"
      ],
      "linter": {
        "rules": {
          "suspicious": {
            "noDocumentCookie": "off",
            "noExplicitAny": "off"
          }
        }
      }
    },
    {
      "includes": ["types/**/*.d.ts"],
      "linter": {
        "rules": {
          "style": {
            "useExportType": "off"
          },
          "suspicious": {
            "noExplicitAny": "off"
          }
        }
      }
    },
    {
      "includes": [
        "app/**/page.tsx",
        "app/**/layout.tsx",
        "app/**/not-found.tsx",
        "app/**/error.tsx",
        "app/**/loading.tsx",
        "app/**/global-error.tsx"
      ],
      "linter": {
        "rules": {
          "style": {
            "noDefaultExport": "off",
            "useComponentExportOnlyModules": "off",
            "noProcessEnv": "off"
          }
        }
      }
    }
  ]
}
```

### 2.1 Key Configuration Features

#### Schema Reference
- `$schema`: Provides IDE autocomplete and validation for Biome v2.1.2

#### File Inclusion Strategy
- Uses `files.includes` with negated patterns (`!pattern/**`) for precise control
- Starts with `**` to include all files, then excludes unwanted directories and file types
- Uses `ignoreUnknown: true` to suppress warnings for unsupported file types
- Optimized for VSCode extension performance

#### Next.js 15 Optimized Exclusions
- `.next/**`: Build output directory
- `.turbo/**`: Turbopack cache
- `public/~partytown/**`: Partytown worker files
- `public/images/**`: Image assets
- `google-ads-data/**`: Analytics data files
- Build artifacts: `dist/**`, `build/**`, `.vercel/**`
- Configuration and lock files: `*.md`, `*.yml`, `pnpm-lock.yaml`

#### Enhanced Linting Rules
- **Style rules enabled**: `style: "warn"` for consistent coding patterns
- **Accessibility rules enabled**: `a11y: "warn"` for better accessibility
- **Nursery rules enabled**: `nursery.recommended: true` for latest improvements
- **Security rules enabled**: `security.recommended: true` with selective overrides
- `useExhaustiveDependencies`: Warns about missing React hook dependencies
- `noExplicitAny`: Warns about explicit `any` types

#### Language-Specific Settings
- **JavaScript/TypeScript**: Double quotes, semicolons, modern trailing commas (`"all"`), cleaner arrow functions (`"asNeeded"`)
- **JSON**: Proper indentation and formatting enabled
- **CSS**: Formatting support enabled

#### Override Configurations
- **Next.js App Router files**: Allows default exports and mixed exports for `page.tsx`, `layout.tsx`, etc.
- **Configuration files**: Permits Node.js modules in `next.config.js`, `middleware.ts`, etc.
- **Type definition files**: Relaxed rules for `.d.ts` files
- **Privacy/consent components**: Special handling for GDPR compliance components

---

## 3. VSCode Extension Setup & Performance

### 3.1 Installing the Extension

Install the official Biome extension from the VS Code Marketplace:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Biome" 
4. Install the official extension by "biomejs"

### 3.2 Recommended VSCode Settings

Add these settings to your VS Code `settings.json` for optimal performance:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "biome.enabled": true,
  "biome.requireConfiguration": true
}
```

#### Setting Explanations:

- **`editor.formatOnSave`**: Automatically formats files when saving
- **`editor.defaultFormatter`**: Uses Biome as the default formatter
- **`source.fixAll.biome`**: Applies safe auto-fixes on save
- **`source.organizeImports.biome`**: Sorts imports on save
- **`biome.requireConfiguration`**: Only activates Biome when `biome.json` is present

### 3.3 Performance Optimization

#### Why Our Configuration Prevents High CPU Usage

1. **Optimized File Inclusion**: We use `files.includes` with negated patterns instead of experimental features like `experimentalScannerIgnores` which can cause performance issues with the VSCode extension.

2. **Comprehensive Exclusion Patterns**: Our configuration excludes:
   - Large directories (`node_modules`, `.next`, `.turbo`)
   - Image files (`*.png`, `*.jpg`, `*.svg`, etc.)
   - Build artifacts and dependencies (`dist`, `build`, `.vercel`)
   - Configuration and lock files (`*.md`, `*.yml`, `pnpm-lock.yaml`)
   - Project-specific directories (`.ai`, `.github`, `.husky`, `docs`, `specs`)

3. **VCS Integration**: `useIgnoreFile: true` leverages your `.gitignore` for additional exclusions.

4. **Unknown File Handling**: `ignoreUnknown: true` prevents warnings for unsupported file types.

#### Additional Performance Settings

For workspace-specific optimization, add to your `.vscode/settings.json`:

```json
{
  "biome.lsp.trace.server": "off",
  "biome.runFromTemporaryLocation": false
}
```

### 3.4 Troubleshooting High CPU Usage

If you experience high CPU usage:

1. **Check Configuration**: Ensure you're using `files.includes` with negated patterns (not experimental features)
2. **Restart Extension**: Disable and re-enable the Biome extension
3. **Clear Cache**: Close VS Code completely, kill any `biome` processes, then restart
4. **Check File Count**: Run `pnpm biome check --max-diagnostics=0` to see how many files are processed

#### Debugging Commands

```bash
# Test configuration without processing
pnpm biome check --max-diagnostics=0 --no-errors-on-unmatched

# Check which files Biome processes
pnpm biome lint --reporter=json | jq '.diagnostics[].location.path' | sort | uniq

# Performance timing
time pnpm biome check --max-diagnostics=0
```

---

## 4. Next.js 15 Specific Considerations

### 4.1 Turbopack Integration
Our configuration properly excludes Turbopack cache files (`.turbo/**`) for optimal performance.

### 4.2 Tailwind v4 CSS Handling
Note: Biome v2.1 may have parsing issues with Tailwind v4's `@theme` syntax. Consider:
- Excluding problematic CSS files if needed: add `"app/globals.css"` to ignore list
- Using PostCSS for CSS processing instead

### 4.3 Partytown Integration
Excludes Partytown worker files (`public/~partytown/**`) to prevent unnecessary processing.

### 4.4 Performance Optimization
- Uses stable file exclusion patterns for efficiency
- Excludes build artifacts and dependencies
- Processes ~110 files in typical runs (vs 1000+ without proper exclusions)

---

## 5. CLI Flags & Commands

### 5.1 Essential Flags
- `--max-diagnostics=N`: Raise diagnostic limit (default: 20, we use 2000)
- `--write`: Apply safe fixes automatically
- `--unsafe`: Also apply fixes flagged as unsafe
- `--no-errors-on-unmatched`: Don't error when no files match patterns

### 5.2 Common Commands
```bash
# Check and fix with high diagnostic limit
pnpm biome check --write --max-diagnostics=2000

# Format only
pnpm biome format --write .

# Lint only with custom limit
pnpm biome lint --max-diagnostics=50

# Check specific files
pnpm biome check --write app/**/*.tsx
```

---

## 6. Best Practices

### 6.1 Configuration Best Practices
1. **Use Stable Features**: Prefer `files.includes` with negated patterns over experimental features
2. **Leverage Glob Patterns**: Use efficient glob patterns for exclusions starting with `**` then negating unwanted paths
3. **Enable Schema Validation**: Always include `$schema` for IDE support
4. **Optimize for Performance**: Exclude build artifacts, images, and large generated files
5. **Use Overrides**: Configure specific rules for different file types (App Router, config files, type definitions)

### 6.2 Development Workflow
1. **Pre-commit Integration**: Run `pnpm check` before commits
2. **IDE Integration**: Configure your editor to use Biome for formatting
3. **Gradual Adoption**: Start with warnings, then promote to errors
4. **Document Exceptions**: Use `// biome-ignore ruleName: reason` for intentional violations

### 6.3 Team Collaboration
1. **Consistent Configuration**: Share the same `biome.json` across team
2. **Version Pinning**: Pin Biome version in `package.json` for consistency
3. **CI Integration**: Run checks in CI/CD pipeline
4. **Documentation**: Keep this guide updated with configuration changes

---

## 7. Troubleshooting

### 7.1 Common Issues

#### VSCode Extension High CPU Usage
```
Issue: Biome extension consuming 100% CPU
```
**Solution**: Ensure you're using `files.includes` with negated patterns instead of experimental features. Restart VS Code and kill any lingering `biome` processes.

#### Configuration Validation Errors
```bash
# Error: Found an unknown key `experimentalScannerIgnores`
```
**Solution**: Use `files.includes` with negated patterns instead of experimental scanner ignores.

#### CSS Parsing Errors
```bash
# Error: expected `,` but instead found `px`
```
**Solution**: Exclude problematic CSS files or use PostCSS for processing.

#### Performance Issues
```bash
# Biome is slow or processing too many files
```
**Solution**: Review and optimize `files.includes` patterns, ensure proper exclusion of build artifacts and large directories.

### 7.2 File Inclusion Debugging
```bash
# Test which files Biome will process
pnpm biome check --max-diagnostics=0 --no-errors-on-unmatched

# Count processed files
pnpm biome lint --reporter=summary
```

### 7.3 Rule-Specific Issues
```bash
# Disable specific rules temporarily
// biome-ignore lint/suspicious/noExplicitAny: Legacy code needs refactoring
const data: any = legacyFunction();
```

---

## 8. Migration from ESLint/Prettier

### 8.1 Removing Old Tools
```bash
# Remove old dependencies
pnpm remove eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Remove config files
rm .eslintrc.json .prettierrc .prettierignore
```

### 8.2 Package.json Updates
```json
{
  "scripts": {
    "lint": "biome lint --max-diagnostics=2000 .",
    "format": "biome format --write .",
    "check": "biome check --write --max-diagnostics=2000 ."
  }
}
```

---

## 9. VSCode Extension Settings Reference

### 9.1 Available Settings

#### `biome.enabled`
- **Default**: `true`
- **Scopes**: global, workspace, workspace folder
- Controls whether the extension creates LSP sessions

#### `biome.requireConfiguration`
- **Default**: `false` (recommended: `true`)
- **Scopes**: global, workspace, workspace folder
- Only activates when `biome.json` is present

#### `biome.lsp.bin`
- **Default**: `undefined`
- **Scopes**: global, workspace, workspace folder
- Override path to biome binary

#### `biome.lsp.trace.server`
- **Default**: `off`
- **Scopes**: global
- Logging level: `off`, `messages`, `verbose`

### 9.2 Workspace Configuration Example

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "biome.enabled": true,
  "biome.requireConfiguration": true,
  "biome.lsp.trace.server": "off"
}
```

---

## 10. AI Agent Instructions

When automating Biome configuration tasks:

### 10.1 Configuration Analysis
1. **Parse `biome.json`**: Read schema, files, linter, formatter sections
2. **Validate Patterns**: Ensure glob patterns match actual project structure
3. **Check Performance**: Verify exclusion patterns for build artifacts

### 10.2 Automated Updates
1. **Schema Updates**: Keep `$schema` URL current with Biome version
2. **Rule Adjustments**: Modify rules based on project needs and error patterns
3. **File Pattern Updates**: Adjust ignores as project structure evolves

### 10.3 Testing Configuration
```bash
# Validate configuration
pnpm biome check --max-diagnostics=10 --no-errors-on-unmatched

# Test performance
time pnpm biome check --max-diagnostics=0
```

### 10.4 Integration Commands
```bash
# CI/CD integration
pnpm exec biome check --max-diagnostics=2000 .

# Pre-commit hook
pnpm biome check --write --max-diagnostics=50 --staged
```

---

This guide reflects our production-tested Biome v2.1 configuration optimized for Next.js 15 with TypeScript, ensuring consistent code quality, formatting, and optimal VSCode extension performance across the entire codebase.
