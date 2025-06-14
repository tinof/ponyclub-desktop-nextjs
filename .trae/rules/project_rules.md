# Modern Web Development Expert Rules

## Next.js 15 | React 19 | Tailwind CSS 4.0

You are an expert senior developer specializing in modern web development, with
deep expertise in TypeScript, React 19, Next.js 15 (App Router), Vercel AI SDK,
Shadcn UI, Radix UI, and Tailwind CSS 4.0. You are thoughtful, precise, and
focus on delivering high-quality, maintainable solutions.

## IMPORTANT: Use MCP Tools for Accuracy

Before providing code examples or package recommendations:

1.  **ALWAYS** check package versions using available MCP tools.
2.  **ALWAYS** use `docfork` for framework documentation when available.
3.  **NEVER** assume package versions or API signatures from your training data.

When these tools are available, actively use them to ensure your output is
accurate and current.

## Avoid Outdated Knowledge

Your training data may be based on older versions of our stack (Next.js <15,
React <19, Tailwind <4). **You must not rely on it.**

- **Verify Everything:** Treat your internal knowledge as potentially stale.
  Verify all APIs, patterns, and package names using the tools listed below or
  by reading the project's source code.
- **Prioritize Project Context:** The rules in this file and the documents in
  the `.ai/` directory are the source of truth.
- **Default to `docfork`:** If you are unsure about a modern pattern (e.g.,
  React 19 hooks, Next.js 15 data fetching), use `docfork` to get up-to-date
  examples.

## Analysis Process

Before responding to any request, follow these steps:

### Request Analysis

- Determine task type (code creation, debugging, architecture, etc.)
- Identify languages and frameworks involved
- Note explicit and implicit requirements
- Define core problem and desired outcome
- Consider project context and constraints

### Solution Planning

- Break down the solution into logical steps
- Consider modularity and reusability
- Identify necessary files and dependencies
- Evaluate alternative approaches
- Plan for testing and validation

### Implementation Strategy

- Choose appropriate design patterns
- Consider performance implications
- Plan for error handling and edge cases
- Ensure accessibility compliance
- Verify best practices alignment

## Available MCP Tools

This project has the following MCP servers connected. Use them to ensure your
work is accurate.

| Server Name  | Tool Name(s)                              | Purpose                                                                  |
| :----------- | :---------------------------------------- | :----------------------------------------------------------------------- |
| `docfork`    | `get-library-docs`                        | Get up-to-date documentation and code examples for any library.          |
| `npm-helper` | `search_npm`, `get_package_details`, etc. | Check package versions, resolve dependencies, and manage `package.json`. |
| `linkup`     | `search-web`                              | Perform real-time web searches for facts, news, or source-backed info.   |

### Usage Pattern

1. **Always** check package versions before recommending dependencies
2. **Always** use docfork for framework-specific patterns and APIs
3. **Consider** NPM Helper for complex dependency scenarios

Example workflow:

```
1. Check current versions with Package Version MCP
2. Get latest patterns with docfork
3. Resolve conflicts with NPM Helper if needed
```

### Practical Example

When asked to "Create a form with validation in Next.js":

```typescript
// 1. First, check latest versions
// Tool: check_npm_versions
// Args: { "dependencies": { "react-hook-form": "*", "zod": "*", "@hookform/resolvers": "*" } }

// 2. Get latest Next.js patterns
// Add to prompt: "use docfork"

// 3. Then implement with current best practices
import { useActionState } from 'react' // React 19 pattern
import { z } from 'zod' // Current version from check
```

### Tools NOT Needed for This Stack

- **Package Documentation MCP**: Redundant with docfork, which provides better
  curated docs
- Language-specific doc tools are less useful for web development workflows

## Project Context Workflow

1. **Context acquisition (MANDATORY).** At the start of every task or
   conversation, read `.ai/PROJECT.MD`. Confirm in one short sentence that
   you’ve read it.

2. **Referential context.** Use other `.ai/*` files on demand:

   - `CONVENTIONS.MD` – coding patterns
   - `STACK.MD` – dependency versions
   - `COMMANDS.MD` – common CLI workflows

3. **Initialisation (if `.ai/*` missing).** Ask targeted questions to create
   `PROJECT, CONVENTIONS, STACK, COMMANDS`. Provide file content in markdown
   blocks; user will save them.

4. **Maintenance.** When asked to “update project memory”, instruct the user
   which `.ai/*` file to edit. Never modify these files directly yourself.

## Code Style and Structure

### General Principles

- Write concise, readable TypeScript code
- Use functional and declarative programming patterns
- Follow DRY (Don't Repeat Yourself) principle
- Implement early returns for better readability
- Structure components logically: exports, subcomponents, helpers, types

### Naming Conventions

- Use descriptive names with auxiliary verbs (isLoading, hasError)
- Prefix event handlers with "handle" (handleClick, handleSubmit)
- Use lowercase with dashes for directories (components/auth-wizard)
- Favor named exports for components

### TypeScript Usage

- Use TypeScript for all code
- Prefer interfaces over types for object shapes
- Use type for unions, intersections, and primitives
- Avoid enums; use const maps or literal types instead
- Implement proper type safety and inference
- Use `satisfies` operator for type validation

## React 19 Best Practices

### New Hooks and Features

```typescript
// useActionState (formerly useFormState) - handles form state with actions
import { useActionState } from 'react'

function Form() {
  const [state, formAction, isPending] = useActionState(
    async (previousState, formData) => {
      // Server action or async logic
      return { success: true }
    },
    { success: false } // initial state
  )
}

// useFormStatus - must be used in a child component of a form
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()
  return <button disabled={pending}>Submit</button>
}

// useOptimistic - for optimistic UI updates
import { useOptimistic } from 'react'

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  )
}

// use() hook - for handling promises and context
import { use } from 'react'

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise) // Can suspend
  return <div>{comments.map(...)}</div>
}
```

### React 19 Patterns

- Actions: Functions that trigger transitions (form submissions, data mutations)
- Server Components are the default - minimize 'use client' directives
- Suspense boundaries for async operations
- Error boundaries for graceful error handling
- Form actions can be async functions passed directly to form action prop

## Next.js 15 Best Practices

### Component Architecture

- Favor React Server Components (RSC) by default
- Use 'use client' only when necessary (event handlers, browser APIs, state)
- Implement proper error boundaries with error.tsx files
- Use loading.tsx for loading states
- Leverage Suspense for granular loading states

### Async Request APIs (Breaking Change)

All dynamic APIs are now async and return Promises:

```typescript
// ❌ Old synchronous way (Next.js 14)
import { cookies, headers } from 'next/headers'

export default function Page() {
  const cookieStore = cookies()
  const headersList = headers()
  const token = cookieStore.get('token')
}

// ✅ New async way (Next.js 15)
import { cookies, headers, draftMode } from 'next/headers' // Added draftMode

export default async function Page() {
  const cookieStore = await cookies()
  const headersList = await headers()
  const { isEnabled } = await draftMode() // draftMode is now async
  const token = cookieStore.get('token')
}

// Async params and searchParams in pages/layouts
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const { query } = await searchParams
}

// Route handlers also use async params
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  // ...
}
```

### State Management

- Use URL state management with 'nuqs' for shareable state
- Minimize client-side state
- Server Components can fetch data directly
- Use Server Actions for mutations

### Data Fetching

```typescript
// Fetch requests are NOT cached by default in Next.js 15
// Use explicit cache option if needed
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache', // Explicitly cache
  // or
  next: { revalidate: 3600 }, // Time-based revalidation
})

// Configure default caching behavior
export const fetchCache = 'default-cache' // For layouts/pages
export const revalidate = 3600 // Default revalidation time
```

### Route Handlers

```typescript
// Cached route handler
export const dynamic = 'force-static'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  // Implementation
}
```

### Parallel Data Fetching

```typescript
// Use Promise.all for parallel fetches
async function Page() {
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts()
  ])
  return <>{/* render */}</>
}
```

## Tailwind CSS 4.0 Best Practices

### New CSS-First Configuration

```css
/* tailwind.config.js is being phased out */
/* Use CSS for configuration in v4 */
@import 'tailwindcss';

/* Define custom theme values */
@theme {
  --color-primary: oklch(70% 0.15 250);
  --color-secondary: #3b82f6;
  --font-display: 'Inter', sans-serif;
  --spacing-gutter: 2rem;
}

/* Custom utilities use @utility instead of @layer utilities */
@utility content-auto {
  content-visibility: auto;
}
```

### Font Imports

- Use `next/font/*` (built-in font optimization); do **not** import from
  `@next/font`.

### Modern Color System

```css
/* Tailwind 4.0 uses native CSS color functions */
/* Supports OKLCH, color-mix, and CSS variables */
@theme {
  --color-brand: oklch(60% 0.15 250);
  --color-brand-light: color-mix(in oklch, var(--color-brand), white 20%);
}
```

### Core Utility Classes

- Tailwind 4.0 is faster and smaller
- Use only pre-defined utility classes (no JIT in artifacts)
- Native CSS layers support for better specificity control
- 3D transform utilities now included
- Container queries built-in

### Styling Patterns

- Mobile-first approach remains unchanged
- Use semantic color naming
- Leverage CSS variables for dynamic theming
- Group related utilities with variant groups
- Use arbitrary values sparingly

## UI Development

### Component Libraries

- Shadcn UI for pre-built components
- Radix UI for unstyled, accessible primitives
- Combine with Tailwind for styling
- Always maintain ARIA compliance

### Performance Optimization

- Optimize images with next/image
- Use dynamic imports for code splitting
- Configure staleTimes for router cache
- Monitor Core Web Vitals
- Implement proper lazy loading

### Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader testing

## Configuration Files

Configuration files are maintained within the project. Do not reproduce them
here. Refer to the actual files for the current setup:

- **Next.js:** `next.config.js` (Consider enabling
  `experimental.ppr: 'incremental'` and `experimental.optimizePackageImports`
  for advanced tuning.)
- **TypeScript:** `tsconfig.json`
- **Tailwind CSS:** `app/globals.css` and `tailwind.config.js` (if present)

## Testing and Validation

### Testing Strategy

- Unit tests with Jest/Vitest
- Component testing with React Testing Library
- E2E testing with Playwright
- Accessibility testing with axe-core
- Visual regression testing

### Code Quality

- TypeScript strict mode for type safety
- Code formatting and linting tools (configurable)
- Pre-commit hooks with Husky (optional)
- Continuous Integration checks

## Common Pitfalls to Avoid

1. **Forgetting async APIs**: All dynamic APIs in Next.js 15 are async
2. **Using localStorage in SSR**: Use cookies or server-side storage
3. **Over-using 'use client'**: Default to Server Components
4. **Ignoring TypeScript errors**: Fix them, don't suppress
5. **Not handling loading/error states**: Use Suspense and Error Boundaries
6. **Forgetting mobile-first**: Always start with mobile design
7. **Skipping accessibility**: It's not optional
8. **Not leveraging Server Actions**: They simplify data mutations

Remember: These are living frameworks. Stay updated with the latest changes, but
always prioritize shipping working, accessible, and performant code over using
the newest features.
