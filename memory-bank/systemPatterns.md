# System Patterns: Pony Club Ecotourism

## 1. System Architecture Overview
The Pony Club Ecotourism website is a Next.js 15 application, leveraging the App Router. This architecture promotes server-centric rendering with React Server Components (RSC) by default, aiming for optimal performance and SEO. Client-side interactivity is introduced selectively using 'use client' directives.

```mermaid
graph TD
    A[User Browser] --> B(Next.js Server / Vercel);
    B --> C{App Router};
    C --> D[Server Components (RSC)];
    C --> E['Client Components ("use client")'];
    D --> F[Data Fetching (Server-Side)];
    F --> G[External APIs/Services e.g. Bokun];
    E --> H[Browser APIs];
    E --> G;
    B --> I[Static Assets (public/)];
    B --> J[API Routes (Route Handlers)];
    J --> G;

    subgraph Next.js Application
        C
        D
        E
        F
        I
        J
    end
```

## 2. Key Technical Decisions & Patterns

### 2.1. Next.js App Router
-   **Directory Structure:** Feature-based routing with `page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`, and `loading.tsx` (optional) files within the `app/` directory.
-   **Server Components (RSC):** Components are RSCs by default. Data fetching and logic that doesn't require browser APIs or interactivity should reside in RSCs.
-   **Client Components:** Components requiring state, effects, event listeners, or browser APIs are marked with `"use client"`. Minimize their usage and push them to the leaves of the component tree where possible.
-   **Layouts:** Used for shared UI across multiple routes. Layouts preserve state and do not re-render on navigation between child segments.
-   **Route Handlers:** For creating API endpoints, located in `route.ts` files within the `app` directory.

### 2.2. Component Design
-   **Modularity:** Components are designed to be modular and reusable, located in the `components/` directory.
-   **Shadcn UI & Radix UI:** Leveraged for pre-built, accessible, and customizable UI primitives (e.g., `components/ui/`). These are typically composed to create more complex application-specific components.
-   **Styling:** Tailwind CSS is the primary styling solution, promoting a utility-first approach. Global styles are in `app/globals.css`.
-   **Responsive Design:** Mobile-first approach using Tailwind's responsive prefixes (sm, md, lg, xl). Hooks like `use-mobile` (if custom) or media queries assist in adapting components.
-   **Dynamic Imports / `next/dynamic`:** Used for components that are not critical for the initial paint or are client-side only (e.g., `DynamicBokunWidget.tsx`, `DynamicGoogleMap.tsx`) to improve performance via code splitting.

### 2.3. State Management
-   **URL State:** `nuqs` library is preferred for managing state in URL query parameters, making state shareable and bookmarkable.
-   **React Context API:** Used for global state that needs to be shared across components, such as language (`contexts/language-context.tsx`) or Maps API status (`contexts/maps-api-context.tsx`).
-   **Local Component State:** `useState` and `useReducer` for component-level state.
-   **Server Actions & `useActionState`:** For form submissions and mutations, leveraging Next.js Server Actions. `useActionState` (React 19) is used for managing form state, and `useFormStatus` for pending states.

### 2.4. Data Fetching
-   **Server Components:** Primary method for data fetching using `async/await` directly within RSCs.
-   **Caching:** Next.js 15 changes default fetch behavior.
    -   `cache: 'force-cache'` for explicitly cached requests.
    -   `fetchCache = 'default-cache'` for layout/page-level caching.
    -   Route Handlers can be configured with `export const dynamic = 'force-static'` for caching.
-   **Client-Side Data Fetching:** Libraries like SWR or React Query can be used in Client Components if real-time updates or more complex client-side caching/synchronization is needed, though server-side fetching is preferred.
-   **Bokun Integration:** Data/widgets from Bokun are integrated, likely via client-side scripts (`BokunWidgetsLoader.js`, `components/BokunWidget.tsx`) or API calls if available.

### 2.5. Internationalization (i18n)
-   **Translations:** JSON files for different languages (e.g., `lib/translations/en.ts`, `lib/translations/el.ts`).
-   **Language Context:** `contexts/language-context.tsx` likely manages the current language.
-   **Custom Hooks:** `lib/use-bokun-language.ts` suggests adapting Bokun widget language based on site language.

### 2.6. Error Handling
-   **`error.tsx`:** Defines error UI for specific route segments.
-   **`not-found.tsx`:** Defines UI for 404 errors.
-   **Error Boundaries:** React Error Boundaries are used in Client Components to catch rendering errors within a part of the UI.

### 2.7. SEO
-   **`app/sitemap.ts`:** Programmatically generates the sitemap.
-   **Metadata API:** Next.js built-in Metadata API (e.g., `export const metadata = {...}`) for managing `<head>` tags in `layout.tsx` and `page.tsx`.
-   **Semantic HTML:** Using appropriate HTML tags for content structure.

## 3. Critical Implementation Paths
-   **Activity Pages (`app/[activity]/page.tsx`):** These are central to showcasing offerings. They need to dynamically render content based on the activity, including text, galleries, and Bokun widgets. `ActivityPageLayout.tsx` likely provides a common structure.
-   **Navigation (`components/responsive-navigation.tsx`, `components/site-header.tsx`, `components/desktop-menu.tsx`, `components/hamburger-menu.tsx`):** Ensuring intuitive and responsive navigation across devices is crucial for user experience.
-   **Bokun Widget Integration (`components/BokunWidget.tsx`, `components/DynamicBokunWidget.tsx`, `BokunWidgetsLoader.js`):** This is key for the booking functionality. Proper loading, language synchronization, and error handling are important.
-   **Image Handling & Optimization (`components/ui/OptimizedImage.tsx`, `lib/image-optimization.ts`, `public/images/`):** Given the visual nature of a tourism website, efficient image loading and optimization (e.g., using `next/image` or a custom solution) are critical for performance.
-   **Language Switching (`components/language-selector.tsx`, `contexts/language-context.tsx`):** Smooth and persistent language selection.

## 4. Code Structure Conventions
-   **`app/`:** Routing, pages, layouts.
-   **`components/`:** Reusable UI components.
    -   **`components/ui/`:** Generic UI primitives, often from Shadcn/Radix.
-   **`lib/`:** Utility functions, helper scripts, data transformations, translation logic.
-   **`contexts/`:** React Context API providers.
-   **`hooks/`:** Custom React hooks.
-   **`public/`:** Static assets (images, fonts, favicons).
-   **`types/`:** TypeScript type definitions.
-   Lowercase with dashes for directory names (e.g., `for-schools`, `kayak-rafting`).
-   PascalCase for component file names (e.g., `ActivityPageLayout.tsx`).
