# ESLint Setup for AI-Assisted Development

## Overview

This project is configured with ESLint optimized for Next.js 15, React 19,
TypeScript, and AI-assisted development workflows. The configuration includes
rules that help maintain clean, readable, and analyzable code.

## Configuration Files

### 📄 `.eslintrc.json`

The main ESLint configuration file with rules optimized for:

- Next.js 15 best practices
- React 19 patterns
- TypeScript strict mode
- Import organization
- Code complexity management
- AI-friendly code structure

### 📄 `.prettierrc.json`

Prettier configuration for consistent formatting:

- 120 character line length (optimized for AI analysis)
- Single quotes for consistency
- No semicolons (cleaner code)
- Trailing commas for better git diffs

### 📄 `.vscode/settings.json`

VS Code settings for optimal developer experience:

- ESLint integration and auto-fix on save
- Format on save with Prettier
- TypeScript enhanced features
- Import organization
- File nesting for better project navigation

## Available Scripts

### Linting Commands

```bash
# Run ESLint (Next.js default)
pnpm run lint

# Run ESLint with auto-fix
pnpm run lint:fix

# Run ESLint manually with extensions
pnpm run lint:check

# Format code with Prettier
pnpm run format

# Check formatting without changing files
pnpm run format:check

# Type checking with TypeScript
pnpm run type-check

# Run all quality checks
pnpm run code-quality

# Auto-fix linting and formatting issues
pnpm run fix-all
```

## Key Features for AI-Assisted Development

### 1. **Import Organization**

Automatically organizes imports in a logical order:

1. Built-in Node.js modules
2. External packages (React, Next.js, etc.)
3. Internal modules (from `@/` paths)
4. Parent directory imports
5. Sibling imports
6. Index file imports

### 2. **Code Complexity Management**

- Maximum function complexity: 15
- Maximum nesting depth: 4
- Maximum parameters: 5
- Line length limit: 120 characters

### 3. **TypeScript Integration**

- Consistent type imports (`import type`)
- Unused variable detection (with `_` prefix allowance)
- Explicit type enforcement
- No `any` type warnings

### 4. **React 19 Optimizations**

- No React import required in JSX files
- React Hooks rules enforcement
- Accessibility checks
- Next.js specific optimizations

## VS Code Integration

### Required Extensions

The setup includes recommendations for essential extensions:

- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **TypeScript** (`ms-vscode.vscode-typescript-next`)
- **Tailwind CSS** (`bradlc.vscode-tailwindcss`)

### Auto-Fix on Save

The configuration automatically:

- Fixes ESLint errors
- Organizes imports
- Removes unused imports
- Formats code with Prettier
- Shows inline error indicators

## AI-Friendly Code Rules

### 1. **Consistent Naming**

- Use descriptive variable names
- Prefix unused variables with `_`
- Use camelCase for variables and functions

### 2. **Function Structure**

- Keep functions under 15 complexity points
- Limit parameters to 5 maximum
- Use early returns for better readability

### 3. **Import Management**

- Group related imports together
- Use consistent import styles
- Separate type imports from value imports

### 4. **Error Handling**

- Console statements are warnings (not errors)
- Unused variables are warnings (can be prefixed with `_`)
- Type safety is enforced but flexible

## Troubleshooting

### Common Issues

#### ESLint not running

```bash
# Check ESLint installation
pnpm list eslint

# Restart VS Code ESLint server
Cmd+Shift+P → "ESLint: Restart ESLint Server"
```

#### Prettier conflicts with ESLint

The configuration includes `eslint-config-prettier` to resolve conflicts
automatically.

#### Import ordering issues

Run the fix command to automatically organize imports:

```bash
pnpm run lint:fix
```

### Performance Tips

1. **File Watching**: Large projects may need adjusted file watcher limits
2. **ESLint Cache**: ESLint uses caching by default for better performance
3. **Turbo Mode**: The project uses Turbo for faster development builds

## Working with AI Assistants

### Optimal Practices

1. **Run linting before AI reviews**:

   ```bash
   pnpm run code-quality
   ```

2. **Use descriptive commit messages** with linting status:

   ```bash
   git commit -m "feat: add new component (ESLint clean)"
   ```

3. **Include linting fixes in AI prompts**:
   ```
   "Please fix this component and ensure it passes ESLint validation"
   ```

### AI-Friendly Code Structure

The ESLint configuration encourages:

- **Modular components** (lower complexity)
- **Clear type definitions** (explicit types)
- **Organized imports** (easier to analyze)
- **Consistent formatting** (reduced noise in diffs)

## Configuration Customization

### Adding New Rules

Edit `.eslintrc.json` to add custom rules:

```json
{
  "rules": {
    "your-custom-rule": "error"
  }
}
```

### Disabling Rules for Specific Files

Use ESLint comments in files:

```typescript
/* eslint-disable rule-name */
// Code that needs to ignore specific rules
/* eslint-enable rule-name */
```

### Project-Specific Overrides

The configuration includes patterns for:

- Config files (more lenient rules)
- Type definition files (`.d.ts`)
- Test files (if added later)

## Integration with CI/CD

### GitHub Actions Example

```yaml
- name: Lint and Type Check
  run: |
    pnpm run code-quality
    pnpm run build
```

### Pre-commit Hooks

Consider adding Husky for pre-commit linting:

```bash
pnpm add --save-dev husky lint-staged
```

## Benefits for Team Development

1. **Consistent Code Style**: All team members follow the same formatting
2. **Early Error Detection**: Catch issues before they reach production
3. **AI-Friendly Diffs**: Clean, organized code is easier for AI to analyze
4. **Better Code Reviews**: Focus on logic rather than style issues
5. **Reduced Technical Debt**: Automated quality checks prevent accumulation

---

## Next Steps

1. **Run the initial cleanup**:

   ```bash
   pnpm run fix-all
   ```

2. **Review remaining warnings** and fix manually as needed

3. **Commit the ESLint setup**:

   ```bash
   git add .eslintrc.json .prettierrc.json .vscode/
   git commit -m "setup: configure ESLint for AI-assisted development"
   ```

4. **Start developing** with enhanced code quality and AI assistance!

The setup is now complete and optimized for both human developers and AI
assistants. The linting rules will help maintain clean, analyzable code
throughout the development process.
