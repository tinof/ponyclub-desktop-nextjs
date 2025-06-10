# TypeScript Configuration & Type Safety

## Overview

This document details the comprehensive TypeScript configuration for the Pony Club website, including global type declarations, third-party integration types, and build system optimizations.

**Last Updated:** January 2025  
**TypeScript Version:** 5.8.3  
**Build Status:** ✅ No Compilation Errors  
**Type Safety:** ✅ Comprehensive Coverage

## Global Type Declarations

### Location: `/types/global.d.ts`

This file contains all global type declarations for third-party integrations and browser APIs.

#### Google Analytics & Tracking Types

```typescript
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date | 'update',
      config?: {
        [key: string]: any
        send_to?: string
        value?: number
        currency?: string
        transaction_id?: string
        event_category?: string
        event_label?: string
        package_name?: string
        package_price?: number
        button_id?: string
        page_location?: string
        page_title?: string
        analytics_storage?: 'granted' | 'denied'
        ad_storage?: 'granted' | 'denied'
        ad_user_data?: 'granted' | 'denied'
        ad_personalization?: 'granted' | 'denied'
        analytics_consent?: boolean
        marketing_consent?: boolean
        consent_method?: string
        items?: Array<{
          item_id?: string
          item_name?: string
          item_category?: string
          price?: number
          quantity?: number
        }>
      }
    ) => void

    fbq?: (
      command: 'track' | 'consent',
      eventName: string | 'grant' | 'revoke',
      properties?: {
        [key: string]: any
        content_name?: string
        content_category?: string
        value?: number
        currency?: string
      }
    ) => void
  }
}
```

## Third-Party Type Dependencies

### Google Maps Types

**Package:** `@types/google.maps@3.58.1`

```json
{
  "devDependencies": {
    "@types/google.maps": "^3.58.1"
  }
}
```

**Usage in Components:**

```typescript
import { useRef, useState } from 'react'

const mapRef = useRef<HTMLDivElement>(null)
const [map, setMap] = useState<google.maps.Map | null>(null)

// Full TypeScript support for Google Maps API
const mapInstance = new google.maps.Map(mapRef.current, {
  center: { lat: 39.3257662, lng: 20.6069899 },
  zoom: 16,
  mapTypeId: 'roadmap',
})
```

### Benefits of Official Types

- ✅ **IntelliSense Support**: Full autocomplete for Google Maps API
- ✅ **Compile-time Validation**: Catch errors before runtime
- ✅ **Documentation Integration**: Inline documentation in IDE
- ✅ **Refactoring Safety**: Safe renaming and restructuring

## GDPR Context Types

### Cookie Consent Interface

```typescript
export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface GDPRContextType {
  consent: CookieConsent | null
  showBanner: boolean
  showCustomize: boolean
  acceptAll: () => void
  rejectAll: () => void
  saveCustom: (consent: CookieConsent) => void
  openCustomize: () => void
  closeBanner: () => void
}
```

### Usage in Components

```typescript
import { useGDPR } from '@/contexts/gdpr-context'

export default function GoogleMap() {
  const { consent } = useGDPR()

  // TypeScript ensures consent is properly typed
  if (!consent?.analytics) {
    // Handle consent requirement
    return
  }

  // Map initialization with type safety
}
```

## Component Type Patterns

### Props Interface Definitions

```typescript
interface GoogleMapProps {
  apiKey?: string
  center?: google.maps.LatLngLiteral
  zoom?: number
  className?: string
}

interface BookingButtonProps {
  packageName: string
  packagePrice: number
  experienceId: string
  buttonId: string
  className?: string
  children: React.ReactNode
}
```

### Event Handler Types

```typescript
// Keyboard event handlers with proper typing
const handleKeyDown = useCallback((event: React.KeyboardEvent, action: 'zoomIn' | 'zoomOut' | 'directions') => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    // Type-safe action handling
  }
}, [])

// Mouse event handlers
const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
  // Type-safe click handling
}, [])
```

## Build System Integration

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "types/**/*.d.ts"],
  "exclude": ["node_modules"]
}
```

### Next.js Integration

- ✅ **Automatic Type Checking**: Built into Next.js build process
- ✅ **Incremental Compilation**: Fast rebuilds with type checking
- ✅ **Path Mapping**: Clean imports with `@/` prefix
- ✅ **Plugin Support**: Next.js TypeScript plugin integration

## Error Resolution Strategies

### Common TypeScript Issues & Solutions

#### 1. Window Property Errors

**Error:** `Property 'gtag' does not exist on type 'Window'`

**Solution:** Add to global type declarations

```typescript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
```

#### 2. Google Maps Namespace Errors

**Error:** `Cannot find namespace 'google'`

**Solution:** Install official types

```bash
pnpm add -D @types/google.maps
```

#### 3. Conflicting Type Declarations

**Error:** `All declarations of 'dataLayer' must have identical modifiers`

**Solution:** Centralize declarations in single file

- Remove duplicate declarations from component files
- Use optional properties (`dataLayer?: unknown[]`)
- Maintain single source of truth in `types/global.d.ts`

#### 4. Third-Party Module Types

**Error:** `Could not find a declaration file for module 'some-package'`

**Solutions:**

```typescript
// Option 1: Install @types package
pnpm add -D @types/some-package

// Option 2: Create custom declaration
declare module 'some-package' {
  export function someFunction(): void;
}

// Option 3: Use any type (last resort)
declare module 'some-package';
```

## Type Safety Best Practices

### 1. Strict Type Checking

```typescript
// Enable strict mode in tsconfig.json
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"strictFunctionTypes": true
```

### 2. Proper Error Handling

```typescript
// Type-safe error handling
const [error, setError] = useState<string | null>(null)

// Proper null checking
if (consent?.analytics) {
  // Safe to access analytics property
}
```

### 3. Generic Type Usage

```typescript
// Generic hook for API calls
function useApi<T>(url: string): {
  data: T | null
  loading: boolean
  error: string | null
} {
  // Implementation with proper typing
}
```

### 4. Enum Usage for Constants

```typescript
enum MapZoomLevel {
  CLOSE = 16,
  MEDIUM = 14,
  FAR = 12,
}

enum ConsentStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
}
```

## Development Workflow

### Type Checking Commands

```bash
# Type check without building
npx tsc --noEmit

# Type check with watch mode
npx tsc --noEmit --watch

# Build with type checking
pnpm build
```

### IDE Integration

- ✅ **VS Code**: Full TypeScript support with extensions
- ✅ **IntelliSense**: Autocomplete and error highlighting
- ✅ **Error Squiggles**: Real-time error detection
- ✅ **Quick Fixes**: Automated error resolution suggestions

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "tsc --noEmit && lint-staged"
    }
  }
}
```

## Performance Optimizations

### 1. Incremental Compilation

- TypeScript compiler caches type information
- Faster subsequent builds
- Only recompiles changed files

### 2. Skip Library Checking

```json
{
  "compilerOptions": {
    "skipLibCheck": true // Skip type checking of declaration files
  }
}
```

### 3. Isolated Modules

```json
{
  "compilerOptions": {
    "isolatedModules": true // Ensure each file can be transpiled independently
  }
}
```

## Testing Type Safety

### Unit Test Types

```typescript
import { render, screen } from '@testing-library/react';
import { GoogleMap } from '@/components/google-map';

// Type-safe test props
const mockProps: GoogleMapProps = {
  apiKey: 'test-key',
  center: { lat: 0, lng: 0 },
  zoom: 10
};

test('renders map component', () => {
  render(<GoogleMap {...mockProps} />);
  // Type-safe assertions
});
```

### Mock Types

```typescript
// Type-safe mocks for testing
const mockGtag = jest.fn() as jest.MockedFunction<typeof window.gtag>
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
})
```

## Future Enhancements

### Planned Type Improvements

- [ ] **Stricter Null Checks**: Eliminate all `any` types
- [ ] **Custom Type Guards**: Runtime type validation
- [ ] **Branded Types**: Enhanced type safety for IDs and tokens
- [ ] **Template Literal Types**: Better string type validation

### Advanced TypeScript Features

- [ ] **Conditional Types**: Complex type relationships
- [ ] **Mapped Types**: Dynamic type transformations
- [ ] **Utility Types**: Enhanced type manipulation
- [ ] **Declaration Merging**: Extend third-party types

---

This TypeScript configuration provides comprehensive type safety while maintaining developer productivity and build performance.
