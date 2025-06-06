# Pony Club: PageSpeed Optimization Plan

**I. Executive Summary**

The primary goal is to improve the Core Web Vitals (LCP, TBT, CLS) and overall PageSpeed Index. Key areas of focus will be:
1.  **Aggressive Image Optimization:** Addressing oversized images, formats, and compression.
2.  **Reducing Render-Blocking Resources:** Optimizing CSS and JavaScript delivery.
3.  **Minimizing Third-Party Script Impact:** Deferring, lazy-loading, or finding alternatives for heavy third-party scripts (Elfsight, Bokun, Google Maps/Tag Manager).
4.  **Efficient JavaScript Usage:** Reducing unused code and modernizing JavaScript delivery.
5.  **Optimizing LCP Element:** Ensuring the hero video/poster is loaded as efficiently as possible.

**II. Image Optimization Strategy**

This is the area with the largest immediate potential savings (Est. 358 KiB).

*   **A. Hero Element Optimization (LCP Candidate: `/images/hero-image.webp` poster for `/images/hero-video.mp4`)**
    1.  **Poster Image (`/images/hero-image.webp`):**
        *   **Instruction:** Manually optimize this image. It's currently 178.9 KiB and can be reduced.
            *   Resize it to match its *maximum displayed dimensions* on common devices. The report notes it's 630x768 but displayed at 613x460 on Moto G Power. Determine the largest viewport it needs to cover and resize accordingly.
            *   Aggressively compress it using a tool like Squoosh.app or ImageOptim, targeting a high-quality WebP.
            *   Ensure it's served directly from `public/` and not processed by `next/image` if it's a poster for a video element, to avoid `/_next/image` overhead for this specific critical LCP asset.
        *   **File to check:** The component rendering the hero video/image (likely in `components/hero/HeroSection.tsx` or similar).
    2.  **Hero Video (`/images/hero-video.mp4`):**
        *   **Instruction:** This video is 1.9MB, which is very large for an initial payload.
            *   **Compress:** Re-encode the video with a tool like HandBrake, targeting a lower bitrate suitable for web background video. Aim for a much smaller file size (e.g., <1MB if possible without severe quality loss).
            *   **Format:** Consider using WebM format alongside MP4 for better compression, and let the browser choose.
            *   **Preload:** The report notes `preload="metadata"` is used. For an autoplaying hero video, this is generally correct.
            *   **`fetchpriority="high"`:** The report suggests adding `fetchpriority="high"` to the LCP image. While the LCP is the *poster*, if the video itself is critical for the initial view and starts playing immediately, consider if the video tag or its sources should also have high priority. However, the poster is usually the LCP element.
        *   **File to check:** Component rendering the hero video.

*   **B. General Image Optimization (using `next/image`)**
    1.  **Responsive Sizes (`sizes` prop):**
        *   **Instruction:** For all `next/image` components, meticulously define the `sizes` prop. The report highlights multiple images larger than their displayed dimensions.
            *   Example: `/_next/image?url=%2Fimages%2Fround2.jpg&w=384&q=75` is 384x195 but displayed at 165x248. This indicates a mismatch in aspect ratio or incorrect `sizes` prop.
            *   **Developer Action:** Audit each `next/image` instance. Use browser developer tools to inspect the rendered size of images at various breakpoints and set the `sizes` prop accurately.
            *   Refer to Next.js docs: [Image Optimization - Sizes](https://nextjs.org/docs/app/building-your-application/optimizing/images#sizes)
        *   **Files to check:** All components using `next/image`. There's a `components/ui/OptimizedImage.tsx` which might be a wrapper; ensure it correctly passes or calculates `sizes`.
    2.  **Image Compression (`quality` prop & Loader Settings):**
        *   **Instruction:** The report suggests "increasing the image compression factor."
            *   Review the default `quality` prop for `next/image` (default is 75). For non-critical images, consider lowering this slightly (e.g., 65-70).
            *   Ensure Vercel's image optimization is configured to output modern formats like AVIF and WebP. This should be default behavior on Vercel.
            *   **Developer Action:** For images specifically called out (e.g., `round2.jpg`, `ponyclub_logo.png`), check their source quality. Pre-optimize source images before committing them to the repository if they are excessively large.
        *   **File to check:** `next.config.js` for any image loader configurations (though defaults are usually fine).
    3.  **Placeholders:**
        *   **Instruction:** For below-the-fold images, use placeholders (`placeholder="blur"` or `placeholder="empty"`) to improve perceived load time and prevent layout shifts.
        *   **Files to check:** Components using `next/image` for images that are not immediately visible.

*   **C. Third-Party Image Optimization**
    1.  **Google User Content Image (`lh3.googleusercontent.com`):**
        *   **Instruction:** This image is 120x120 but displayed at 40x40. It's likely from a Google review or similar integration (Elfsight?).
            *   If this comes from a third-party widget (e.g., Elfsight reviews), there might be limited control. Check if the widget offers settings for image sizes.
            *   If it's an avatar you control, upload a correctly sized version.
        *   **Files to check:** Components integrating Google reviews or similar services (e.g., `components/client/ReviewsSection.tsx` if it uses Elfsight).

**III. Critical Rendering Path Optimization**

*   **A. CSS Optimization**
    1.  **Render-Blocking CSS (`…css/713eaa5c2eadeb35.css`, `…css/d515496b8f5b2e0a.css`):**
        *   **Instruction:** Next.js typically handles CSS bundling efficiently. These are likely generated CSS chunks.
            *   **Critical CSS Inlining:** For Next.js with App Router, this is largely handled automatically. However, ensure Tailwind CSS is configured optimally. Tailwind 4.0's new engine is designed to be very efficient.
            *   **Reduce CSS Size:**
                *   Audit for unused CSS. While Tailwind is good at purging, custom CSS or large component library CSS might contribute.
                *   Ensure Tailwind's `content` paths in `tailwind.config.mjs` (or CSS `@import` in v4) are precise to maximize purging.
            *   **Asynchronous CSS Loading (Advanced):** For non-critical CSS, consider strategies like `media="print"` and `onload="this.media='all'"`. However, this can be complex with Next.js's built-in CSS handling. Prioritize reducing CSS size first.
        *   **Files to check:** `app/globals.css`, `tailwind.config.mjs` (or its v4 equivalent if migrated), and any global CSS imports.
    2.  **Font Loading Strategy:**
        *   **Instruction:** Although not directly flagged as render-blocking in this report snippet, fonts are a common culprit.
            *   Use `next/font` for all local and Google Fonts. This provides automatic font optimization, including `font-display: swap` and preloading.
            *   Ensure this is implemented consistently.
        *   **Files to check:** `app/[locale]/layout.tsx` or any component where fonts are loaded.

**IV. JavaScript Optimization**

*   **A. Reduce Unused JavaScript (Est. Savings 486 KiB)**
    1.  **Third-Party Scripts (Elfsight, Bokun, GTM):** These are the main contributors.
        *   **Instruction:** See section IV.B below.
    2.  **First-Party Chunks (`…chunks/967-5fed4a969c53b60b.js`):**
        *   **Instruction:**
            *   **Dynamic Imports:** Aggressively use `next/dynamic` for components that are not critical for the initial view, are below the fold, or are based on user interaction (e.g., modals, complex UI elements not immediately visible).
            *   **Code Splitting:** Review page structures. If pages are monolithic, break them into smaller components that can be loaded on demand.
            *   **Server Components:** Leverage React Server Components (RSC) as much as possible. Keep client components small and focused.
        *   **Files to check:** Large page components, components rendering modals, tabs, or other interactive UI that isn't immediately needed. `components/DynamicBokunWidget.tsx`, `components/DynamicContactDetails.tsx`, etc., suggest dynamic loading is already considered. Verify its effectiveness.
        *   **Tool:** Use `pnpm analyze` (from `.ai/COMMANDS.MD`) to inspect bundle contents and identify what's in these chunks.

*   **B. Optimize Third-Party Scripts**
    1.  **Elfsight Widget (`allInOneReviews.js` - 1MB payload, 1.4s CPU time):**
        *   **Instruction:** This is a major performance bottleneck.
            *   **Lazy Load/Defer:** Ensure it's loaded with `strategy="lazyOnload"` if using `next/script`, or manually defer its loading until after the main content is interactive.
            *   **Interaction-Based Loading:** Load the script only when the user scrolls near the reviews section or clicks a "Show Reviews" button.
            *   **Placeholder:** Use a static placeholder for the reviews section and load the widget on interaction.
            *   **Alternative:** Explore lighter alternatives for displaying reviews if Elfsight proves too heavy despite optimizations.
        *   **Files to check:** `components/client/ReviewsSection.tsx` or wherever Elfsight is integrated. `components/ui/script-loader.tsx` might be relevant.
    2.  **Bokun Widgets (`BokunWidgets.869f943….js`):**
        *   **Instruction:** Similar to Elfsight, these booking widgets can be heavy.
            *   Ensure they are loaded dynamically (`next/dynamic` for the component wrapping the widget script) and only when necessary.
            *   The existence of `components/DynamicBokunWidget.tsx` is good. Ensure it's truly deferring the script load effectively.
            *   Consider loading Bokun widgets only when the user interacts with a "Book Now" call to action, rather than on page load.
        *   **Files to check:** `components/BokunWidget.tsx`, `components/DynamicBokunWidget.tsx`.
    3.  **Google Tag Manager (GTM):**
        *   **Instruction:**
            *   Load GTM via `next/script` with `strategy="afterInteractive"`.
            *   Audit GTM tags: Remove any unused or redundant tags. Ensure tags within GTM are also optimized (e.g., non-blocking, efficiently written).
        *   **Files to check:** `components/client/GDPRGoogleAnalytics.tsx` or wherever GTM is initialized.
    4.  **Google Maps API:**
        *   **Instruction:**
            *   Load the Maps API script asynchronously and defer its execution.
            *   Only load it on pages/components that actually display a map.
            *   Consider a static image placeholder for the map, loading the interactive map on user click/interaction.
        *   **Files to check:** `components/google-map.tsx`, `components/map-component.tsx`, `components/map-with-no-ssr.tsx`, `contexts/maps-api-context.tsx`.

*   **C. Address Legacy JavaScript (Polyfills - `chunks/951-1643eeba56b2ddc8.js`)**
    1.  **Instruction:** Next.js 15 aims to minimize polyfills for modern browsers.
        *   **Target Browsers:** Review `browserslist` configuration in `package.json` or `.browserslistrc`. Ensure it targets modern browsers, which will reduce the need for polyfills.
        *   **Next.js Configuration:** Check `next.config.js` for any settings that might force older compatibility. By default, Next.js should be optimizing this.
        *   **Babel Config:** If there's a custom `.babelrc`, ensure it's not overly aggressive with transpilation. (Usually not needed with Next.js).
        *   The report lists polyfills like `Array.prototype.at`, `Object.fromEntries`, etc. These are part of ES2022/ES2019. If your `browserslist` is modern, these shouldn't be heavily polyfilled.
        *   This might also be due to older dependencies. Audit dependencies for known polyfill issues.
    2.  **File to check:** `package.json` (for `browserslist`), `next.config.js`.

**V. Caching Strategy**

*   **A. Third-Party Script Caching (Elfsight, Google Maps):**
    1.  **Instruction:** The report notes short cache TTLs (1h, 30m) for these resources.
        *   **Limited Control:** You generally can't control the cache headers of third-party scripts directly.
        *   **Mitigation:** The best approach is to reduce reliance on these scripts or load them very efficiently (as per IV.B). If they are loaded deferred/lazily, their caching impact on initial load is lessened.
        *   **Service Worker (Advanced):** For very aggressive caching control of third-party assets, a service worker could be used, but this adds complexity. Probably overkill unless other methods fail.

*   **B. Next.js Caching:**
    1.  **Instruction:** Ensure optimal use of Next.js caching for data and assets.
        *   **Data Fetching:** Use appropriate caching strategies (e.g., `revalidate` times) for `fetch` calls in Server Components.
        *   **Static Assets:** Assets in `public/` and optimized images via `next/image` should be cached effectively by Vercel's CDN.
        *   Refer to `.clinerules/.rules.md` for Next.js 15 caching (`fetchCache`, `revalidate`).
    2.  **File to check:** Data fetching functions, `next.config.js` for cache-related headers (if any custom ones are set).

**VI. LCP (Largest Contentful Paint) Specific Actions**

*   **LCP Element:** `main.relative > div.relative > div.absolute > video.absolute` (poster is `/images/hero-image.webp`)
    1.  **Optimize Poster Image:** Already covered in II.A.1. This is critical.
    2.  **`fetchpriority="high"`:**
        *   **Instruction:** Apply `fetchpriority="high"` to the LCP image (the poster). If the `<video>` tag itself is considered the LCP element by the browser in some scenarios (e.g., if the poster fails to load or is transparent), ensure the video's poster attribute points to an optimized image.
        *   **Developer Action:** Add `fetchPriority="high"` (React prop name) to the `<img>` tag if the poster is rendered as a separate image, or ensure the `<video poster="...">` is in the initial HTML and the poster image is highly optimized. If using `next/image` for the poster (if it's not a direct video poster), set the `priority` prop.
        *   The report says "LCP request discovery: lazy load not applied, fetchpriority=high should be applied". This implies the poster image is the LCP and needs this attribute.
    3.  **Element Render Delay (180 ms):**
        *   **Instruction:** This delay means the browser knew about the LCP element, but something prevented it from rendering sooner.
            *   Ensure no JavaScript is manipulating or inserting the LCP element late. It should be present in the initial server-rendered HTML.
            *   Minimize CSS that could be complex to calculate for the LCP element and its parents.
        *   **Files to check:** The component rendering the hero section.

**VII. Reducing Main Thread Work**

*   **A. Minimize Forced Reflows (Layout Thrashing):**
    1.  **Elfsight Widget:** The primary culprit (`allInOneReviews.js:66:13035` - 114ms).
        *   **Instruction:** Deferring/lazy-loading this script (as per IV.B.1) is the best way to mitigate its impact on initial load. If it runs after the page is interactive, its reflows are less damaging to TBT.
    2.  **First-Party Code:** `error-322470fc50a527e8.js:1:485` (33ms). This seems to be an error page. While errors should be rare, optimize error page rendering if it's a concern.
    3.  **General Practice:** Avoid JavaScript that reads layout-triggering properties (like `offsetHeight`, `offsetWidth`) and then writes to the DOM in a loop or quick succession. Batch reads and writes.

*   **B. Optimize Script Execution (Reduce JavaScript execution time 1.6s):**
    1.  **Instruction:** This is largely tied to optimizing third-party scripts and reducing unused JavaScript (covered in IV.A and IV.B).
    2.  **Efficient Client Components:** Ensure client components are lean and performant. Profile using React DevTools if specific first-party components are slow.

**VIII. Network Payload Reduction**

*   **Total Size: 5,177 KiB**
    1.  **Hero Video (`/images/hero-video.mp4` - 1,932.9 KiB):** Already covered in II.A.2. This is the single largest asset.
    2.  **Hero Image (`/images/hero-image.webp` - 179.6 KiB):** Covered in II.A.1.
    3.  **Elfsight Widget (`allInOneReviews.js` - 1,041.7 KiB):** Covered in IV.B.1.
    4.  **Bokun Widgets (various JS files - ~353 KiB total):** Covered in IV.B.2.
    5.  **Instruction:** Systematically address the largest contributors identified in the PageSpeed report under "Avoid enormous network payloads." The strategies above cover most of these.

**IX. Tools & Measurement**

1.  **Webpack Bundle Analyzer / Turbopack Analysis:**
    *   **Instruction:** Use `pnpm analyze` (from `.ai/COMMANDS.MD`) to visualize JavaScript bundle sizes and compositions. This helps identify large modules or unexpected dependencies.
2.  **Lighthouse / PageSpeed Insights:**
    *   **Instruction:** Continuously test changes with Lighthouse in Chrome DevTools (throttled, incognito) and periodically with PageSpeed Insights.
3.  **Vercel Analytics & Speed Insights:**
    *   **Instruction:** Monitor real-user data via Vercel's built-in tools (already in stack: `@vercel/analytics`, `@vercel/speed-insights`). This gives insights into how actual users experience the site.
4.  **Chrome DevTools Performance Panel:**
    *   **Instruction:** For deep dives into main-thread work, script execution, and layout reflows, use the Performance panel.

**X. Phased Implementation & Prioritization**

Suggest tackling issues in this order for maximum impact:

1.  **Phase 1: Critical LCP & Image Optimization (Highest Impact)**
    *   Optimize hero video poster image (`/images/hero-image.webp`) manually (resize, compress).
    *   Add `fetchPriority="high"` to the LCP element (hero poster).
    *   Compress hero video (`/images/hero-video.mp4`).
    *   Audit and implement `sizes` prop for all major `next/image` instances.
    *   Pre-optimize large source images.
2.  **Phase 2: Third-Party Script Optimization**
    *   Aggressively lazy-load/defer Elfsight, Bokun, and Google Maps scripts. Load on interaction where possible.
    *   Optimize GTM loading and audit tags.
3.  **Phase 3: JavaScript Code & CSS**
    *   Use `pnpm analyze` to identify large JS chunks; apply dynamic imports for non-critical components.
    *   Review `browserslist` and Next.js config regarding polyfills.
    *   Audit CSS for potential bloat.
4.  **Phase 4: Advanced & Fine-tuning**
    *   Deeper dive into forced reflows if still an issue.
    *   Explore service workers for caching if necessary (low priority).
    *   Continuously monitor and iterate.
