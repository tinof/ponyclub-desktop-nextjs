# Performance Optimization Plan for PonyClub.gr

## Current Performance Issues
Based on Lighthouse audits (Mobile Score: 55, LCP: 15.3s, FCP: 5.7s, CLS: 0):

- **Mobile Performance Score**: 55/100 (Target: 85+)
- **Critical Issues**:
  - Largest Contentful Paint: 15.3s (Target: <2.5s)
  - First Contentful Paint: 5.7s (Target: <1.8s)
  - Speed Index: 10.5s
  - Time to Interactive: (Previous: 19.2s, needs re-evaluation after LCP fixes)
  - Cumulative Layout Shift: 0 (Excellent!)

## Implementation Progress (Previous Sessions)

### Completed Optimizations:

1.  **Image Optimization Framework**
    *   [x] Created optimized image utility library (`lib/image-optimization.ts`)
    *   [x] Implemented standardized image dimensions and quality settings
    *   [x] Created OptimizedImage component with specialized variants (Gallery, Hero, Avatar)
    *   [x] Added proper sizes attribute to prevent layout shifts
    *   [x] Added poster image for homepage hero video.
    *   [x] Updated `sizes` attribute for homepage circular thumbnail images.

2.  **JavaScript Optimization**
    *   [x] Created script loader component for third-party scripts
    *   [x] Implemented intersection observer-based lazy loading for scripts
    *   [x] Applied to Bokun booking scripts and Elfsight reviews widget
    *   [x] Dynamically imported GoogleMap, Gallery, BokunWidget, ContactDetailsEnhanced components.

3.  **Next.js Configuration Enhancements (Previous)**
    *   [x] Configured modern image formats (WebP, AVIF) in next.config.mjs (Note: LCP image still needs conversion)
    *   [x] Refined caching headers for static assets in next.config.mjs
    *   [x] Added appropriate content security policy headers
    *   [x] Activated SWC minification for better performance

## IV. General Refactoring & Production Readiness (Summary of Nov 5, 2025 Session)

This session focused on broader refactoring, configuration cleanup, and preparing for dependency migrations, rather than direct performance optimizations.

*   **Configuration Updates:**
    *   **`tsconfig.json`**:
        *   `compilerOptions.target` updated from `"ES6"` to `"ES2022"`.
        *   `compilerOptions.skipLibCheck` set to `false` (was `true`).
        *   Added path mapping for `lucide-react` in an attempt to resolve a type error.
    *   **`next.config.js`**:
        *   Removed placeholder domain from `images.remotePatterns`.
        *   Changed `images.contentDispositionType` from `'attachment'` to `'inline'`.
        *   Added `experimental.staleTimes` configuration for client-side router cache.
    *   **`.gitignore`**:
        *   Removed `next-env.d.ts` to include it in version control.
*   **Code Cleanup:**
    *   Removed `console.log` statements and hidden debug HTML from `components/PageLayout.tsx` and `app/page.tsx`.
    *   Removed commented-out Hero section and related unused props from `components/ActivityPageLayout.tsx`.
*   **Layout Centralization & Adjustments:**
    *   Moved `SiteHeader` component into `components/PageLayout.tsx` for global consistency.
    *   `components/PageLayout.tsx` now manages the main top padding (`pt-20`) and background color (`bg-[#f5f0e8]`) for page content.
    *   Removed `SiteHeader` and associated padding/background styles from `app/page.tsx` and `components/ActivityPageLayout.tsx`.
*   **Root Layout (`app/layout.tsx`) Enhancements:**
    *   Converted `RootLayout` to a client component (`"use client";`).
    *   Introduced an `HtmlWrapper` sub-component to use `useLanguage` hook for setting the `<html>` tag's `lang` attribute dynamically.
    *   Moved static `<link rel="canonical">` and JSON-LD `<Script>` content into the `metadata` object.
    *   Refactored `app/layout.tsx` to be a Server Component, moving client-side logic (including `useLanguage` for `<html>` tag, `ThemeProvider`, Vercel Analytics/Speed Insights) into a new `components/ClientLayout.tsx` component. This resolved build errors related to `"use client"` and `metadata` export, and missing `<html>`/`<body>` tags.
    *   Removed manual Vercel Preview Comments script (`vercel.live/analytics`).
    *   Vercel Analytics (`<Analytics />`) and Speed Insights (`<SpeedInsights />`) are now in the server-side `app/layout.tsx`.
    *   Exported `fetchCache = 'default-cache';` for Next.js 15 data fetching strategy.
*   **SEO - Sitemap (`app/sitemap.ts`):**
    *   Updated `routeData` to include `/for-schools` and `/kayak-rafting`.
    *   Removed `/test-footer` from `routeData`.
*   **Bokun Widget Standardization:**
    *   Refactored `app/rafting/page.tsx` to use `DynamicBokunWidget` instead of direct script embedding.
    *   Removed `type="module"` and `as any` cast from the `<Script>` tag in `components/BokunWidget.tsx`.
    *   Refactored `BookingScripts` component in `components/ui/script-loader.tsx` to use `OptimizedScript` (which wraps `next/script`) instead of manual DOM script injection.
*   **Dependency & Type Resolution (Nov 5, 2025):**
    *   **`lucide-react` TypeScript Issue:** Resolved. The issue "Cannot find module 'lucide-react'" and subsequent type errors (like missing `ReactSVG`) were due to incompatibility between `lucide-react`'s types and React 19 RC. Downgrading React to `18.3.1` and removing an incorrect `tsconfig.json` path alias for `lucide-react` fixed this.
    *   **`recharts` Lodash Types:** Resolved by installing `@types/lodash` as `recharts` required it when `skipLibCheck: false`.
    *   **`react-day-picker` Type Issue in `components/ui/calendar.tsx`:** A persistent type error ("'IconLeft' does not exist in type 'Partial<CustomComponents>'") for `react-day-picker@9.6.7` was encountered. A temporary workaround using `as any` on the `components` prop definition in `components/ui/calendar.tsx` was applied to allow the build to pass. This needs a proper fix.

## V. Consolidated Future Plan: Refactoring, Migrations, and Optimizations

This plan integrates previous performance goals with broader refactoring tasks and upcoming dependency migrations.

**Phase 0: Pre-Migration Cleanup & Preparation (Completed & Ongoing)**

1.  **[x] Resolve `lucide-react` TypeScript Issue & Related Type Errors:**
    *   **Status:** Completed. Downgraded React from RC to `18.3.1`, removed incorrect tsconfig path, and installed `@types/lodash` for `recharts`. Build is now successful.
    *   **Note:** A temporary `as any` workaround was used for a `react-day-picker` type issue in `components/ui/calendar.tsx`. This should be properly investigated and fixed later.
2.  **Audit and Remove Unused Code:**
    *   **Action:** Manually audit components and utility functions for any unused JavaScript.
    *   **Action:** Review CSS for any non-Tailwind styles that could be unused.
3.  **Configuration Cleanup (CSP):**
    *   **`next.config.js`**: Investigate and attempt to tighten the Content Security Policy (CSP), particularly `'unsafe-inline'` and `'unsafe-eval'` in `script-src`, after Bokun/Elfsight integrations are stable.
4.  **SEO Content Placeholders:**
    *   **`app/rafting/page.tsx` (and similar activity pages):** Add placeholder sections or TODO comments for where unique, crawlable textual SEO content should be added to complement third-party widgets.

**Phase 1: Strategic Refactoring (Pre-Migration)**

5.  **Embrace Server Components (RSC):**
    *   **Targets:** `app/page.tsx` (Homepage), `components/Footer.tsx` (if `useLanguage` can be handled via props or server context), parts of `components/site-header.tsx` (if `ResponsiveNavigation` can be further split).
    *   **Action:** Incrementally refactor. This is a key step for improving initial load performance.
6.  **Bokun Integration Refinement (Homepage):**
    *   **Target:** `app/page.tsx`.
    *   **Action:** After standardizing script loading, evaluate if the complex Bokun initialization logic (`ensureBokunIsReadyAndOpen`, etc.) can be simplified or removed. Test thoroughly.

**Phase 2: Dependency Migrations**

7.  **Next.js Upgrade:**
    *   **Action:** Upgrade Next.js from `15.2.4` to the latest stable `15.3.x` version.
    *   **Action:** Review Next.js release notes for breaking changes. Update `next.config.js` if `staleTimes` or other experimental features have changed status or behavior.
    *   **Action:** Run `pnpm install` and test thoroughly.
8.  **React Upgrade Path (from 18.2):**
    *   **Action (Step 1 - Set to Stable React 18.3.1):** [COMPLETED] Updated `package.json` to use `react@^18.3.1`, `react-dom@^18.3.1`, and corresponding `@types/react@^18.3.0`, `@types/react-dom@^18.3.0`. This resolved type incompatibilities with `lucide-react`.
    *   **Action (Step 2 - Address React 18.3 Deprecation Warnings):** [NEXT STEP] Run the application with React 18.3.1, identify any deprecation warnings in the console, and refactor code accordingly to prepare for React 19.
    *   **Action (Step 3 - Upgrade to React 19):** Upgrade React from `18.3.1` to the latest stable React `19.x.x`. Update `package.json` for `react`, `react-dom`, and their types.
    *   **Action:** Run `pnpm install` and test thoroughly, paying close attention to React 19 features (`useActionState`, `useFormStatus`), hooks, and component behavior.

**Phase 3: Post-Migration Refinements & Polish**

9.  **Component-Level Improvements & Accessibility:**
    *   **Investigate `react-day-picker` Type Issue:** Properly fix the type error in `components/ui/calendar.tsx` for the `DayPicker` component's `components` prop, removing the temporary `as any` workaround.
    *   **Navigation Menus (`DesktopMenu`, `HamburgerMenu`):**
        *   Add ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-controls`).
        *   Ensure full keyboard navigation.
        *   Resolve "Activities" link inconsistency between desktop and mobile.
    *   **Review `OptimizedImage` Component:** (Requires seeing the code if not standard `next/image`) Ensure best practices.
    *   **Form Handling (if applicable):** Ensure new React 19 form APIs (`useActionState`, `useFormStatus`) are used as per `.cursorrules`.
10. **Final SEO Enhancements:**
    *   **Sitemap `lastModified` Automation:** Implement a robust solution (e.g., from file system mtimes or CMS).
    *   **Activity Page SEO Content:** Flesh out the unique textual content.
11. **Styling Review:**
    *   Attempt to make Bokun button styling more robust (if possible, less reliant on `!important` and IDs).
    *   Ensure overall visual consistency.
12. **Asset Optimization:**
    *   **LCP Image (`hero-image.jpeg`):** Convert to WebP/AVIF and ensure optimal delivery.
13. **Advanced Optimizations (If time/need permits):**
    *   **Critical CSS:** Investigate and potentially implement critical CSS extraction.
    *   **Next.js Specific Optimizations:** Consider Incremental Static Regeneration (ISR) for relevant pages.

**Phase 4: Testing & Final Review for Production**

14. **Thorough Testing:**
    *   Functional testing of all user flows.
    *   Responsive design testing across devices.
    *   Cross-browser compatibility checks.
15. **Performance Audit:**
    *   Use Lighthouse and Vercel Speed Insights to measure and iterate.
    *   Verify text compression (Gzip/Brotli) is active on Vercel.
16. **Accessibility Audit:**
    *   Use automated tools (Axe, WAVE) and manual checks (keyboard, screen reader).

**Future/Ongoing Considerations:**

*   **PWA Features:** Service worker, app manifest.
*   **Performance Monitoring:** Real User Monitoring (RUM), performance budgets.
*   **JavaScript Analysis:** Deeper bundle analysis (`@next/bundle-analyzer`) for first-party JS if TTI remains high.

## Success Metrics

- Mobile Performance Score: 85+
- Desktop Performance Score: 90+
- Time to Interactive: Under 5 seconds
- Cumulative Layout Shift: Under 0.1 (Currently 0 - Maintain!)
- Largest Contentful Paint: Under 2.5 seconds
- First Contentful Paint: Under 1.8 seconds

## Tools to Use

- Lighthouse/PageSpeed Insights
- WebPageTest
- Chrome DevTools Performance panel
- `@next/bundle-analyzer`
- Image editing tools for WebP/AVIF conversion (e.g., Squoosh, online converters)
- Accessibility testing tools (Axe, WAVE)
