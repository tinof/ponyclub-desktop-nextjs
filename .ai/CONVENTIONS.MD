# Project Conventions

This project follows modern web development best practices, with specific rules defined in `.cursor/rules.md`. Below is a summary of the most critical conventions to follow.

## Key Conventions

- **File & Directory Naming**: Use `kebab-case` for all directories and non-component files (e.g., `lib/utils.ts`, `components/auth-flow`). Component files should be `PascalCase` (e.g., `components/auth-flow/UserProfile.tsx`).
- **Component Architecture**:
  - Default to React Server Components (RSCs). Only use `'use client'` when client-side interactivity or browser APIs are essential.
  - Keep components small and focused on a single responsibility.
  - Colocate components with their specific hooks, types, and child components in the same directory.
- **State Management**:
  - Prefer URL state for filterable/shareable views (using `nuqs` or similar).
  - Use React 19's `useActionState` for form submissions and mutations.
  - Minimize client-side state; fetch data on the server whenever possible.
- **TypeScript**:
  - Use `strict` mode. Do not use `any`.
  - Prefer `interface` for object shapes and `type` for unions, intersections, and primitives.
  - Define specific types for API responses, props, and function signatures. Avoid inference for public APIs.
- **Styling**:
  - Use Tailwind CSS utility classes directly in JSX.
  - Create reusable, styled components using `cva` (class-variance-authority) for complex variants.
  - Avoid custom CSS files where a utility class or a CSS variable in `globals.css` would suffice.
