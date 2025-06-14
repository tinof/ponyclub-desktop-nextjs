# Biome Integration: Formatting and Linting

This project uses [Biome v2.0 beta](https://biomejs.dev/) for code formatting and linting. Biome is an all-in-one toolchain that is extremely fast and designed to replace multiple tools like Prettier and ESLint.

## What's New in Biome v2.0 Beta

We're using the cutting-edge Biome v2.0 beta which includes exciting new features:

- **Multi-file analysis**: Lint rules can now analyze across files (e.g., detecting import cycles)
- **Improved Import Organizer**: Better import sorting and merging
- **Assists**: Actions without diagnostics (like sorting object keys)
- **Enhanced suppressions**: File-level and range-based suppression
- **Type-aware rules**: Early support for type-based linting (like `noFloatingPromises`)

## Workflow

### Automatic Formatting on Save

If you are using VS Code, the recommended [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) should be installed. The project includes a `.vscode/settings.json` file that enables format-on-save automatically.

**Important**: Make sure to use the **prerelease version** of the Biome VS Code extension for v2.0 beta compatibility.

### Manual Commands

You can run Biome manually using the following npm scripts:

- **`pnpm run format`**: Formats all files in the project.
- **`pnpm run lint`**: Lints all files and applies safe fixes.
- **`pnpm run check`**: Runs all checks (format, lint, organize imports) and applies safe fixes. This is the most comprehensive command and is recommended before committing code.

### Advanced Usage

For more control, you can run Biome directly:

```bash
# Check specific files/directories
npx biome check --write app/ components/

# Apply unsafe fixes (use with caution)
npx biome check --write --unsafe .

# Check without applying fixes
npx biome check .

# Format only (no linting)
npx biome format --write .

# Lint only (no formatting)
npx biome lint --write .
```

## Configuration

The Biome configuration is located in the `biome.json` file in the project root. It has been set up with sensible defaults for a Next.js and React project.

### Key Configuration Features

- **Import Organization**: Automatically enabled via the assist system
- **Formatter**: Configured for 2-space indentation, single quotes, and 80-character line width
- **Linter**: Uses recommended rules with some customizations for TypeScript/React
- **Multi-file Analysis**: Enabled by default for advanced linting capabilities

## Migration from ESLint/Prettier

This project has migrated from ESLint and Prettier to Biome. The migration provides:

- **Faster performance**: Biome is significantly faster than ESLint + Prettier
- **Unified tooling**: One tool for formatting, linting, and import organization
- **Better error messages**: More helpful diagnostics and suggestions
- **Advanced features**: Multi-file analysis and type-aware rules

## Common Issues and Solutions

### Performance

Biome v2.0 includes multi-file analysis which may be slower on large projects. If you experience performance issues:

1. Use specific paths instead of `.` when possible
2. Consider excluding large directories in `biome.json`
3. Report performance issues to the Biome team

### VS Code Integration

Make sure you:

1. Install the **prerelease** version of the Biome extension
2. Disable any conflicting extensions (ESLint, Prettier)
3. Restart VS Code after installing the extension

### Suppressing Rules

Biome v2.0 offers multiple ways to suppress rules:

```javascript
// Suppress a single line
// biome-ignore lint/suspicious/noExplicitAny: explanation here
const data: any = {};

// Suppress entire file
// biome-ignore-all lint/suspicious/noExplicitAny

// Suppress a range
// biome-ignore-start lint/suspicious/noExplicitAny
const data1: any = {};
const data2: any = {};
// biome-ignore-end
```

## Development Workflow

1. **Before committing**: Run `pnpm run check` to ensure all files are properly formatted and linted
2. **During development**: Let VS Code format on save, or run `pnpm run format` as needed
3. **Code review**: Biome will catch most issues automatically, focus on logic and architecture

## Troubleshooting

If you encounter issues:

1. Check that you're using Biome v2.0 beta: `npx biome --version`
2. Ensure VS Code extension is the prerelease version
3. Try restarting the Biome language server in VS Code
4. Check the Biome configuration in `biome.json`

For more information, visit the [Biome documentation](https://next.biomejs.dev/).
