# Development Guide

This guide provides detailed instructions for developers working on the Pony Club project.

## Quick Start

### Prerequisites

- **Node.js** (v18 or later)
- **pnpm** package manager
- **Git** for version control

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd ponyclub-v0
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Verify setup by running quality checks:**
   ```bash
   pnpm type-check
   pnpm knip
   ```

## Development Workflow

### Daily Development

1. **Start your work session:**
   ```bash
   # Pull latest changes
   git pull origin main
   
   # Install any new dependencies
   pnpm install
   
   # Start development server
   pnpm dev
   ```

2. **Before committing changes:**
   ```bash
   # Run all quality checks
   pnpm type-check
   pnpm knip
   pnpm security:audit
   
   # Test production build
   pnpm build
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: your descriptive commit message"
   git push origin your-branch
   ```

### Code Quality Standards

#### TypeScript
- Use strict TypeScript configuration
- Avoid `any` types - use proper typing
- Export types and interfaces when needed by other modules
- Run `pnpm type-check` before committing

#### Clean Code with Knip
- Run `pnpm knip` regularly to detect unused code
- Remove unused imports, files, and dependencies
- Keep the codebase lean and maintainable

### Working with Dependencies

#### Adding New Dependencies

1. **Install the package:**
   ```bash
   # Production dependency
   pnpm add package-name
   
   # Development dependency
   pnpm add -D package-name
   ```

2. **Update Knip configuration if needed:**
   - If adding UI components that aren't directly imported, add to `ignoreDependencies` in `knip.json`
   - If adding utility libraries that may have unused exports, consider adding to `ignore` patterns

3. **Verify the addition:**
   ```bash
   pnpm knip
   pnpm build
   ```

#### Removing Dependencies

1. **Use pnpm to remove:**
   ```bash
   pnpm remove package-name
   ```

2. **Clean up related code:**
   - Remove imports and usage
   - Update type definitions if needed
   - Remove from Knip ignore lists if applicable

3. **Verify removal:**
   ```bash
   pnpm knip
   pnpm build
   ```

## Handling Knip Warnings

### Understanding Knip Output

Knip reports several types of issues:

- **Unused files**: Files that aren't imported anywhere
- **Unused dependencies**: Packages in package.json that aren't used
- **Unused exports**: Exported functions/components that aren't imported elsewhere
- **Unlisted dependencies**: Packages used in code but not in package.json

### Resolving Knip Issues

#### 1. Unused Files
```bash
# Review the file
cat path/to/unused-file.tsx

# If truly unused, remove it
rm path/to/unused-file.tsx

# If it's a future component, add to knip.json ignore list
```

#### 2. Unused Dependencies
```bash
# Remove genuinely unused packages
pnpm remove package-name

# For UI libraries that may be used indirectly, add to knip.json:
# "ignoreDependencies": ["package-name"]
```

#### 3. False Positives

Some code may be flagged incorrectly. Update `knip.json`:

```json
{
  "ignore": [
    "components/ui/**/*.tsx",  // UI component library
    "lib/utils/**/*.ts"        // Utility functions
  ],
  "ignoreDependencies": [
    "@radix-ui/react-*",       // UI primitives
    "utility-package"          // Specific packages
  ]
}
```

### Common Knip Scenarios

#### Adding New UI Components
When adding shadcn/ui components:

1. Install the component dependencies
2. Add Radix UI packages to `ignoreDependencies` if needed
3. Add component files to ignore patterns if they're not directly imported

#### Working with Utility Functions
For shared utilities that may not be immediately used:

1. Keep exports minimal - only export what's needed
2. Use `ignoreExportsUsedInFile: true` for internal utilities
3. Document the purpose of utility functions

## Troubleshooting

### Common Issues

#### Knip Reports False Positives
- **Solution**: Update `knip.json` configuration
- **Check**: Ensure the file/dependency is actually used
- **Document**: Add comments explaining why something is ignored

#### Build Fails After Dependency Cleanup
- **Solution**: Check for missing dependencies
- **Fix**: `pnpm add missing-package`
- **Verify**: Run `pnpm build` again

#### TypeScript Errors After Knip Cleanup
- **Solution**: Check for removed type definitions
- **Fix**: Add back necessary `@types/*` packages
- **Verify**: Run `pnpm type-check`

### Getting Help

1. **Check the logs**: Review the full error output
2. **Run diagnostics**: Use `pnpm type-check` and `pnpm knip` individually
3. **Review configuration**: Check `knip.json` and `tsconfig.json`
4. **Test locally**: Always verify changes work before pushing

## Best Practices

### Code Organization
- Keep components focused and single-purpose
- Use proper TypeScript types
- Export only what's needed by other modules
- Organize files logically in the project structure

### Dependency Management
- Regularly run `pnpm knip` to catch unused code early
- Keep dependencies up to date with security patches
- Prefer smaller, focused packages over large utility libraries
- Document why specific packages are ignored in Knip configuration

### Performance
- Monitor bundle size with `pnpm analyze`
- Remove unused code promptly
- Use dynamic imports for large components when appropriate
- Optimize images and assets regularly

## Project Structure

```
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components (ignored by Knip)
│   └── ...               # Custom components
├── lib/                  # Utility functions and configurations
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
├── .github/workflows/    # CI/CD configuration
├── knip.json            # Knip configuration
└── package.json         # Dependencies and scripts
```

This structure helps maintain clean separation of concerns and makes it easier for Knip to analyze the codebase effectively.
