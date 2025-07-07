# Biome v2.0 Configuration Guide

This document explains how to install, configure, and use Biome v2.0 as the unified linter and formatter in this Next.js 15 project. This guide reflects our optimized production configuration and best practices.

---

## 1. Installation

Add Biome v2.0 as a dev dependency:

```bash
pnpm add -D @biomejs/biome@^2.0.6
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
  "$schema": "https://biomejs.dev/schemas/2.0.6/schema.json",
  "files": {
    "ignoreUnknown": false,
    "includes": [
      "**",
      "!.next/**",
      "!node_modules/**",
      "!dist/**",
      "!build/**",
      "!coverage/**",
      "!.turbo/**",
      "!tsconfig.tsbuildinfo",
      "!pnpm-lock.yaml",
      "!package-lock.json",
      "!yarn.lock",
      "!public/~partytown/**",
      "!data/**/*.js",
      "!**/*.min.js",
      "!**/*.generated.*"
    ]
  },
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "linter": {
    "enabled": true,
    "domains": {
      "next": "recommended",
      "react": "recommended"
    },
    "rules": {
      "complexity": {
        "noUselessFragments": "warn"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      },
      "security": {
        "noDangerouslySetInnerHtml": "warn"
      },
      "style": {
        "useImportType": "error"
      },
      "correctness": {
        "useExhaustiveDependencies": "warn"
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
      "trailingCommas": "es5",
      "semicolons": "always"
    }
  },
  "json": {
    "formatter": {
      "enabled": true,
      "indentWidth": 2
    }
  },
  "assist": {
    "enabled": true
  }
}
```

### 2.1 Key Configuration Features

#### Schema Reference
- `$schema`: Provides IDE autocomplete and validation for Biome v2.0.6

#### Global File Inclusion
- Uses global `files.includes` with negation patterns instead of tool-specific includes
- More efficient and maintainable than duplicating patterns across tools

#### Next.js 15 Optimized Exclusions
- `.next/**`: Build output directory
- `.turbo/**`: Turbopack cache
- `public/~partytown/**`: Partytown worker files
- `data/**/*.js`: Generated Bokun widget files
- `**/*.generated.*`: Any generated files

#### Enhanced Linting Rules
- `useImportType`: Enforces proper TypeScript import types
- `useExhaustiveDependencies`: Warns about missing React hook dependencies
- `noUselessFragments`: Warns about unnecessary React fragments
- `noExplicitAny`: Warns about explicit `any` types

#### Language-Specific Settings
- **JavaScript/TypeScript**: Consistent double quotes, semicolons, ES5 trailing commas
- **JSON**: Proper indentation and formatting enabled

---

## 3. Next.js 15 Specific Considerations

### 3.1 Turbopack Integration
Our configuration properly excludes Turbopack cache files (`.turbo/**`) for optimal performance.

### 3.2 Tailwind v4 CSS Handling
Note: Biome v2.0 may have parsing issues with Tailwind v4's `@theme` syntax. Consider:
- Excluding problematic CSS files if needed: `"!app/globals.css"`
- Using PostCSS for CSS processing instead

### 3.3 Partytown Integration
Excludes Partytown worker files (`public/~partytown/**`) to prevent unnecessary processing.

### 3.4 Performance Optimization
- Uses global file inclusion patterns for efficiency
- Excludes build artifacts and dependencies
- Processes ~110 files in typical runs (vs 1000+ without proper exclusions)

---

## 4. CLI Flags & Commands

### 4.1 Essential Flags
- `--max-diagnostics=N`: Raise diagnostic limit (default: 20, we use 2000)
- `--write`: Apply safe fixes automatically
- `--unsafe`: Also apply fixes flagged as unsafe
- `--no-errors-on-unmatched`: Don't error when no files match patterns

### 4.2 Common Commands
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

## 5. Best Practices

### 5.1 Configuration Best Practices
1. **Use Global File Inclusion**: Prefer `files.includes` over tool-specific includes
2. **Leverage Negation Patterns**: Use `!pattern` to exclude files efficiently
3. **Enable Schema Validation**: Always include `$schema` for IDE support
4. **Optimize for Performance**: Exclude build artifacts and large generated files

### 5.2 Development Workflow
1. **Pre-commit Integration**: Run `pnpm check` before commits
2. **IDE Integration**: Configure your editor to use Biome for formatting
3. **Gradual Adoption**: Start with warnings, then promote to errors
4. **Document Exceptions**: Use `// biome-ignore ruleName: reason` for intentional violations

### 5.3 Team Collaboration
1. **Consistent Configuration**: Share the same `biome.json` across team
2. **Version Pinning**: Pin Biome version in `package.json` for consistency
3. **CI Integration**: Run checks in CI/CD pipeline
4. **Documentation**: Keep this guide updated with configuration changes

---

## 6. Troubleshooting

### 6.1 Common Issues

#### Configuration Validation Errors
```bash
# Error: Found an unknown key `ignore`
```
**Solution**: Use negation patterns in `files.includes` instead of separate `ignore` field.

#### CSS Parsing Errors
```bash
# Error: expected `,` but instead found `px`
```
**Solution**: Exclude problematic CSS files or use PostCSS for processing.

#### Performance Issues
```bash
# Biome is slow or processing too many files
```
**Solution**: Review and optimize `files.includes` patterns, exclude build artifacts.

### 6.2 File Inclusion Debugging
```bash
# Test which files Biome will process
pnpm biome check --max-diagnostics=0 --no-errors-on-unmatched
```

### 6.3 Rule-Specific Issues
```bash
# Disable specific rules temporarily
// biome-ignore lint/suspicious/noExplicitAny: Legacy code needs refactoring
const data: any = legacyFunction();
```

---

## 7. Migration from ESLint/Prettier

### 7.1 Removing Old Tools
```bash
# Remove old dependencies
pnpm remove eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Remove config files
rm .eslintrc.json .prettierrc .prettierignore
```

### 7.2 Package.json Updates
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

## 8. AI Agent Instructions

When automating Biome configuration tasks:

### 8.1 Configuration Analysis
1. **Parse `biome.json`**: Read schema, files, linter, formatter sections
2. **Validate Patterns**: Ensure glob patterns match actual project structure
3. **Check Performance**: Verify exclusion patterns for build artifacts

### 8.2 Automated Updates
1. **Schema Updates**: Keep `$schema` URL current with Biome version
2. **Rule Adjustments**: Modify rules based on project needs and error patterns
3. **File Pattern Updates**: Adjust includes/excludes as project structure evolves

### 8.3 Testing Configuration
```bash
# Validate configuration
pnpm biome check --max-diagnostics=10 --no-errors-on-unmatched

# Test performance
time pnpm biome check --max-diagnostics=0
```

### 8.4 Integration Commands
```bash
# CI/CD integration
pnpm exec biome check --max-diagnostics=2000 .

# Pre-commit hook
pnpm biome check --write --max-diagnostics=50 --staged
```

This guide reflects our production-tested Biome v2.0 configuration optimized for Next.js 15 with TypeScript, ensuring consistent code quality and formatting across the entire codebase.

'''

useSortedClasses
JavaScript (and super languages)
Summary
Rule available since: v1.6.0
Diagnostic Category: lint/nursery/useSortedClasses
This rule has an unsafe fix.
The default severity of this rule is information.
Caution

This rule is part of the nursery group.

Description
Enforce the sorting of CSS utility classes.

This rule implements the same sorting algorithm as Tailwind CSS, but supports any utility class framework including UnoCSS.

It is analogous to prettier-plugin-tailwindcss.

Caution

Important notes
This rule is a work in progress, and is only partially implemented. Progress is being tracked in the following GitHub issue: https://github.com/biomejs/biome/issues/1274

Currently, utility class sorting is not part of the formatter, and is implemented as a linter rule instead, with an automatic fix. The fix is, at this stage, classified as unsafe. This means that it won’t be applied automatically as part of IDE actions such as “fix on save”.

We appreciate any feedback on this rule, and encourage you to try it out and report any issues you find.

Please read this entire documentation page before reporting an issue.

Notably, keep in mind that the following features are not supported yet:

Screen variant sorting (e.g. md:, max-lg:). Only static, dynamic and arbitrary variants are supported.
Custom utilitites and variants (such as ones introduced by Tailwind CSS plugins). Only the default Tailwind CSS configuration is supported.
Options such as prefix and separator.
Object properties (e.g. in clsx calls).
Please don’t report issues about these features.

Examples
Invalid
<div class="px-2 foo p-4 bar" />;

code-block.jsx:1:12 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ℹ These CSS classes should be sorted.
  
  > 1 │ <div class=“px-2 foo p-4 bar” />;
      │            ^^^^^^^^^^^^^^^^^^
    2 │ 
  
  ℹ Unsafe fix: Sort the classes.
  
    1   │ - <div·class=“px-2·foo·p-4·bar”·/>;
      1 │ + <div·class=“foo·bar·p-4·px-2”·/>;
    2 2 │   
  
<div class="hover:focus:m-2 foo hover:px-2 p-4">

code-block.jsx:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✖ expected &lt; but instead the file ends
  
    1 │ <div class=“hover:focus:m-2 foo hover:px-2 p-4”>
  > 2 │ 
      │ 
  
  ℹ the file ends here
  
    1 │ <div class=“hover:focus:m-2 foo hover:px-2 p-4”>
  > 2 │ 
      │ 
  
Options
Code-related
{
    "options": {
        "attributes": ["classList"],
        "functions": ["clsx", "cva", "tw", "tw.*"]
    }
}

attributes
Classes in the class and className JSX attributes are always sorted. Use this option to add more attributes that should be sorted.

functions
If specified, strings in the indicated functions will be sorted. This is useful when working with libraries like clsx or cva.

clsx("px-2 foo p-4 bar", {
    "some-css-class": condition,
});

clsx("some-css-class", {
    "block mx-4": condition,
});

Tagged template literals are also supported, for example:

tw`px-2`;
tw.div`px-2`;

tw`px-2 foo p-4 bar`;

tw.div`px-2 foo p-4 bar`;

Sort-related
Caution

At the moment, this rule does not support customizing the sort options. Instead, the default Tailwind CSS configuration is hard-coded.

Differences with Prettier
The main key difference is that Tailwind CSS and its Prettier plugin read and execute the tailwind.config.js JavaScript file, which Biome can’t do. Instead, Biome implements a simpler version of the configuration. The trade-offs are explained below.

Values are not known
The rule has no knowledge of values such as colors, font sizes, or spacing values, which are normally defined in a configuration file like tailwind.config.js. Instead, the rule matches utilities that support values in a simpler way: if they start with a known utility prefix, such as px- or text-, they’re considered valid.

This has two implications:

False positives: classes can be wrongly recognized as utilities even though their values are incorrect. For example, if there’s a px- utility defined in the configuration, it will match all of the following classes: px-2, px-1337, px-[not-actually-valid], px-literally-anything.

No distinction between different utilities that share the same prefix: for example, text-red-500 and text-lg are both interpreted as the same type of utility by this rule, even though the former refers to a color and the latter to a font size. This results in all utilities that share the same prefix being sorted together, regardless of their actual values.

Custom additions must be specified
The built-in Tailwind CSS preset (enabled by default) contains the set of utilities and variants that are available with the default configuration. More utilities and variants can be added through Tailwind CSS plugins. In Biome, these need to be manually specified in the Biome configuration file in order to “extend” the preset.

Presets can’t be modified
In Tailwind CSS, core plugins (which provide the default utilities and variants) can be disabled. In Biome, however, there is no way to disable parts of a preset: it’s all or nothing. A work-around is to, instead of using a preset, manually specify all utilities and variants in the Biome configuration file.

Whitespace is collapsed
The Tailwind CSS Prettier plugin preserves all original whitespace. This rule, however, collapses all whitespace (including newlines) into single spaces.

This is a deliberate decision. We’re unsure about this behavior, and would appreciate feedback on it. If this is a problem for you, please share a detailed explanation of your use case in the GitHub issue.

How to configure
biome.json
{
  "linter": {
    "rules": {
      "nursery": {
        "useSortedClasses": "error"
      }
    }
  }
}

