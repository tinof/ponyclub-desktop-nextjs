# Project Structure

## Root Level Organization

```
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
├── lib/                   # Utility functions and data
├── contexts/              # React context providers
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── public/                # Static assets
├── docs/                  # Project documentation
└── scripts/               # Build and utility scripts
```

## App Router Structure (`app/`)

- **`[locale]/`** - Internationalized routes (en/el)
  - **`page.tsx`** - Route pages
  - **`layout.tsx`** - Shared layouts
  - **`not-found.tsx`** - 404 pages
  - **`error.tsx`** - Error boundaries
- **`api/`** - API routes
- **`globals.css`** - Global styles with Tailwind v4
- **`fonts.ts`** - Font configuration

## Component Architecture (`components/`)

- **`ui/`** - Base UI components (buttons, cards, etc.)
- **`client/`** - Client-side only components
- **`icons/`** - Custom icon components
- **Root level** - Page-specific and layout components

## Library Structure (`lib/`)

- **`translations/`** - i18n translation files
- **`gallery-data/`** - Image gallery configurations
- **Utility files** - Helper functions, data, and configurations

## Key Conventions

### File Naming

- **Pages**: `page.tsx` (App Router convention)
- **Layouts**: `layout.tsx` (App Router convention)
- **Components**: PascalCase (e.g., `BookingButton.tsx`)
- **Utilities**: camelCase (e.g., `use-media-query.ts`)
- **Types**: camelCase with `.d.ts` extension

### Component Organization

- **Server Components**: Default in App Router
- **Client Components**: Marked with `"use client"` directive
- **Shared Components**: In `/components` root
- **Page-specific**: Co-located with pages when appropriate

### Import Patterns

- **Absolute imports**: Use `@/` prefix for project root
- **Type imports**: Use `import type` for TypeScript types
- **Dynamic imports**: For code splitting and client components

### Styling Conventions

- **Tailwind v4**: Utility classes with `@utility` blocks
- **CSS Variables**: HSL color system with semantic naming
- **Component styles**: Co-located with components when needed
- **Global styles**: In `app/globals.css`

### Internationalization

- **Route structure**: `/[locale]/page-name`
- **Translation files**: `lib/translations/{locale}.ts`
- **Middleware**: Handles locale detection and routing
- **Default locale**: English (`en`)

### Performance Patterns

- **Static generation**: Preferred for most pages
- **Image optimization**: Next.js Image component with AVIF/WebP
- **Code splitting**: Automatic with dynamic imports
- **Bundle optimization**: Configured in `next.config.js`
