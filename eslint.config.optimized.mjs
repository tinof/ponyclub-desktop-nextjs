import { FlatCompat } from '@eslint/eslintrc'
import nextPlugin from '@next/eslint-plugin-next'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

const compat = new FlatCompat()

export default [
  {
    // Global ignores for the entire flat config
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.min.js',
      'public/**',
      '.vercel/**',
      '.turbo/**',
      '.trae/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'sentry.*.config.ts',
      'instrumentation*.ts',
    ],
  },
  nextPlugin.flatConfig.recommended, // Next.js and React 19 rules
  ...compat.extends('plugin:better-tailwindcss/recommended-warn'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': ts,
      react: react,
      'react-hooks': reactHooks,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'], // Enable type-aware linting
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'better-tailwindcss': {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: 'app/globals.css',
        callees: ['clsx', 'cn', 'cva'],
        tags: ['tw'],
        attributes: ['class', 'className'],
        variables: ['classes', 'className'],
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      // React rules optimized for React 19 (some are handled by next() already)
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+ JSX Transform
      'react/prop-types': 'off', // Replaced by TypeScript
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'warn',
      'react/jsx-key': 'error',

      // React Hooks rules (handled by next() but good to be explicit)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      eqeqeq: ['error', 'always'],

      // AI-assistance friendly rules (removed max-len - handled by Prettier)
      complexity: ['warn', 15],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 5],

      // Import organization (next() handles import/no-duplicates)
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // Disable Tailwind CSS multiline warnings for AI-generated code
      'better-tailwindcss/multiline': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': 'off',
    },
  },
  // IMPORTANT: Prettier config must be last to override conflicting rules
  prettierConfig,
]
