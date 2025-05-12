# Tech Context: Pony Club Ecotourism

## 1. Core Technologies
-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript
-   **UI Library:** React 19
-   **Styling:** Tailwind CSS
-   **UI Components:** Shadcn UI, Radix UI
-   **Package Manager:** pnpm (inferred from `pnpm-lock.yaml` and `pnpm-workspace.yaml`)

## 2. Key Libraries & Tools (Inferred from File Structure & `.cursorrules`)

### Frontend & UI
-   **`next/dynamic`:** For dynamic imports and code splitting.
-   **`nuqs`:** For URL state management.
-   **React Context API:** For global state (e.g., language, Maps API).
-   **`lucide-react` (likely):** For icons, commonly used with Shadcn UI.
-   **`class-variance-authority` (cva) & `clsx` (or similar):** For conditional class names, often used with Tailwind CSS and Shadcn UI.
-   **`tailwindcss-animate`:** For Tailwind animations.
-   **`@radix-ui/*`:** Core headless components powering Shadcn UI.
-   **`components/ui/OptimizedImage.tsx`:** Suggests a custom component for image optimization, possibly wrapping `next/image`.
-   **`components/ui/Gallery.tsx`:** Custom gallery component.
-   **`components/google-map.tsx` / `components/DynamicGoogleMap.tsx` / `contexts/maps-api-context.tsx`:** Integration with Google Maps API.

### State Management & Forms
-   **React 19 `useActionState` & `useFormStatus`:** For handling form submissions with Server Actions.
-   **React `useState`, `useReducer`, `useContext`:** Standard React hooks for state.

### Internationalization (i18n)
-   Custom solution using JSON files (`lib/translations/`) and React Context (`contexts/language-context.tsx`).
-   `lib/use-bokun-language.ts`: Hook for Bokun widget language synchronization.

### Utilities & Helpers
-   **`lib/utils.ts`:** General utility functions (e.g., `cn` for merging Tailwind classes).
-   **`lib/bokun-lang.ts`:** Bokun language mapping or utilities.
-   **`lib/image-optimization.ts`:** Helper functions for image optimization.
-   **`hooks/use-mobile.tsx`:** Custom hook to detect mobile devices.
-   **`hooks/use-toast.ts` & `components/ui/use-toast.ts` / `components/ui/sonner.tsx` / `components/ui/toaster.tsx`:** Toast notification system.

### Third-Party Integrations
-   **Bokun:** Tour booking and widget integration (`BokunWidgetsLoader.js`, `components/BokunWidget.tsx`, `types/bokun.d.ts`).
-   **Google Maps API:** For displaying maps.

## 3. Development Setup & Environment
-   **Node.js Environment:** Required for Next.js.
-   **pnpm:** Used as the package manager.
    -   `pnpm install` to install dependencies.
    -   `pnpm dev` to run the development server (typically).
    -   `pnpm build` to build for production.
    -   `pnpm start` to run a production server.
-   **TypeScript Configuration:** `tsconfig.json` defines TypeScript compiler options.
    -   Strict mode enabled.
    -   Path aliases like `@/*` for `./src/*` (though current structure uses `app/`, `components/` etc. at root, so paths might be `@/components/*`, `@/lib/*`).
-   **Next.js Configuration:** `next.config.js` (or `.mjs`) for Next.js specific settings.
    -   May include settings for `bundlePagesRouterDependencies`, `serverExternalPackages`, and `experimental.staleTimes` as per `.cursorrules`.
-   **PostCSS Configuration:** `postcss.config.mjs` for Tailwind CSS and Autoprefixer.
-   **ESLint & Prettier (Assumed):** For code linting and formatting, standard in modern web development. `.cursorrules` implies their use.

## 4. Technical Constraints & Considerations
-   **Next.js 15 App Router Paradigm:** Adherence to RSCs, Client Components, Server Actions, and new caching behaviors is crucial.
-   **Performance:** Focus on Core Web Vitals, image optimization, code splitting, and efficient data fetching.
-   **Accessibility (a11y):** Adherence to WCAG guidelines, proper ARIA attributes, keyboard navigation. Shadcn UI/Radix UI helps, but custom components must also be accessible.
-   **TypeScript Strictness:** Maintain type safety throughout the codebase.
-   **SEO:** Utilize Next.js metadata API, sitemap generation, and semantic HTML.
-   **Bokun Integration Limitations:** The capabilities and limitations of the Bokun widget/API will influence booking functionality.
-   **Google Maps API Quotas & Billing:** Usage of Google Maps API needs to be monitored.

## 5. Tool Usage Patterns (Based on `.cursorrules` and Project Structure)
-   **Component Scaffolding:** New components are placed in `components/` or `components/ui/`.
-   **Styling:** Utility classes from Tailwind CSS are applied directly in JSX.
-   **State:** Prefer server-derived state or URL state (`nuqs`). Client-side state is localized or managed via Context for broader concerns.
-   **Data Fetching:** Primarily in Server Components. Route Handlers for API endpoints.
-   **Forms:** Use Server Actions with `useActionState` and `useFormStatus`.
-   **Type Definitions:** Custom types are defined in `types/` or co-located with components/modules if specific.

## 6. Dependencies (Key entries from `package.json`)

**Core Framework & UI:**
- `next: "15.3.2"`
- `react: "19.1.0"`
- `react-dom: "19.1.0"`
- `tailwindcss: "4.1.6"` (via `devDependencies`)
- `typescript: "5.8.3"` (via `devDependencies`)

**UI Components & Libraries (Radix UI, Shadcn UI related):**
- `@radix-ui/react-accordion: "1.2.10"`
- `@radix-ui/react-dialog: "1.1.13"`
- `@radix-ui/react-dropdown-menu: "2.1.14"`
- `@radix-ui/react-label: "2.1.6"`
- `@radix-ui/react-navigation-menu: "1.2.12"`
- `@radix-ui/react-popover: "1.1.13"`
- `@radix-ui/react-select: "2.2.4"`
- `@radix-ui/react-slot: "1.2.2"`
- `@radix-ui/react-tabs: "1.1.11"`
- `class-variance-authority: "0.7.1"`
- `clsx: "2.1.1"`
- `lucide-react: "0.509.0"`
- `tailwind-merge: "3.2.0"`
- `tailwindcss-animate: "1.0.7"`

**State Management & Forms:**
- `@hookform/resolvers: "5.0.1"`
- `react-hook-form: "7.56.3"`
- `zod: "3.24.4"`
- `next-themes: "0.4.6"` (for theme management)
- `sonner: "2.0.3"` (for toast notifications)

**Utilities & Other Key Libraries:**
- `@next/third-parties: "15.3.2"` (e.g. for Google Maps)
- `date-fns: "4.1.0"`
- `embla-carousel-react: "8.6.0"`
- `leaflet: "1.9.4"` (for maps, if used directly alongside Google Maps or as an alternative)
- `recharts: "2.15.3"` (for charts)
- `vaul: "1.1.2"` (drawer component)

**Development Dependencies (Key):**
- `@next/bundle-analyzer: "15.3.2"`
- `@types/react: "19.1.3"`
- `@types/node: "22.15.17"`
- `autoprefixer: "10.4.21"`
- `postcss: "8.5.3"`

*(Note: `pnpm` is the package manager, its version is managed globally or via corepack, not typically listed in `package.json` dependencies.)*
