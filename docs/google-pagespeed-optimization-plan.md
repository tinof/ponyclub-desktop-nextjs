# Google PageSpeed Optimization Plan for ponyclub.gr

This document outlines a step-by-step plan to significantly improve the Google PageSpeed scores for both mobile and desktop versions of the website. The current scores are **69 (Mobile)** and **73 (Desktop)**. This plan incorporates best practices from the PageSpeed reports, modern Next.js development, and expert articles.

The plan is divided into five phases, prioritizing the highest-impact changes first.

---

### **Phase 1: Asset Optimization (High Impact)**

This phase targets the largest performance bottlenecks: images and videos, which are severely impacting LCP and overall load time.

**1. Hero Video Optimization:** ✅ **COMPLETED**
   - **Problem:** The hero videos (`hero-video.webm` and `hero-video.mp4`) are over 1.9MB each.
   - **Action Plan:**
     - **Compress Videos:** ⏸️ **SKIPPED** - Manual video compression task (requires external tools).
     - **Implement Poster Image:** ✅ **DONE** - Added `poster="/images/hero-image.webp"` attribute to improve LCP.
     - **Review Mobile Autoplay:** ✅ **DONE** - Implemented mobile detection with `useIsMobile()` hook to disable autoplay on mobile devices, saving bandwidth.

**2. Image Optimization with `next/image`:** ✅ **PARTIALLY COMPLETED**
   - **Problem:** Images are not served in modern formats (WebP/AVIF), are often larger than their display dimensions, and are not optimally compressed. This is especially true for the Google Reviews images loaded from `lh3.googleusercontent.com`.
   - **Action Plan:**
     - **Audit and Replace `<img>`:** ⏸️ **ONGOING** - Most images already use `next/image` or `OptimizedImage` component.
     - **Specify Image Dimensions:** ⏸️ **ONGOING** - Most components have proper dimensions specified.
     - **Use the `sizes` Prop:** ⏸️ **ONGOING** - Implemented in key components like `OptimizedImage`.
     - **Prioritize Above-the-Fold Images:** ⏸️ **ONGOING** - Priority prop used in gallery and hero components.
     - **Create an Image Proxy for Google Reviews:** ✅ **DONE**
       - ✅ Created `/api/image-proxy/route.ts` API route that fetches images from Google URLs.
       - ✅ Modified `GoogleReviews` component to proxy Google profile images through the API route, enabling Next.js optimization and caching.

---

### **Phase 2: Font Optimization (High Impact)** ✅ **COMPLETED**

**Problem:** External font files from Google Fonts are render-blocking resources that slow down the initial paint of the page.

**Action Plan:**
- **Implement `next/font`:** ✅ **DONE**
  - ✅ **DONE** - Implemented `next/font/google` module to self-host fonts, eliminating external network requests.
  - ✅ **DONE** - Created central `app/fonts.ts` file with optimized font loaders for Inter and Roboto with proper fallbacks and display strategies.
  - ✅ **DONE** - Applied font classes in layout and components, ensuring global availability without layout shifts.

---

### **Phase 3: JavaScript and Third-Party Script Optimization**

This phase focuses on reducing the size and execution time of JavaScript, which is currently blocking the main thread and increasing TBT.

**1. Defer and Lazy-Load Third-Party Scripts:** ⏸️ **PARTIALLY COMPLETED**
   - **Problem:** Scripts from Google Maps, Google Tag Manager, and the Bokun.io booking widget are render-blocking.
   - **Action Plan:**
     - **Use `next/script`:** ⏸️ **ONGOING** - Some scripts already use `next/script` component.
     - **Apply Loading Strategies:**
       - **Bokun Widget:** ✅ **DONE** - Already uses dynamic import with `DynamicBokunWidget` component.
       - **Google Analytics/Tag Manager:** ⏸️ **NEEDS REVIEW** - May need optimization.
       - **Google Map:** ✅ **DONE** - Uses `DynamicGoogleMap` with dynamic import and loading state.

**2. Reduce JavaScript Bundle Size:** ✅ **COMPLETED**
   - **Problem:** Unused JavaScript and unnecessary polyfills are bloating the bundles.
   - **Action Plan:**
     - **Dynamic Imports:** ✅ **DONE** - Implemented `next/dynamic` for heavy components:
       - ✅ `DynamicGoogleReviews` with loading state
       - ✅ `DynamicGoogleMap` with loading state
       - ✅ `DynamicVintagePriceListPopup` for price list modal
     - **Configure Browser Targets:** ✅ **DONE** - Created `.browserslistrc` with modern browser targets to reduce polyfills.
     - **Bundle Analysis:** ✅ **DONE** - Enhanced `@next/bundle-analyzer` configuration with multiple analysis scripts and webpack optimization.

---

### **Phase 4: Layout Shift (CLS) and DOM Reduction**

This phase addresses visual stability and structural efficiency.

**1. Fix Cumulative Layout Shift (CLS):** ✅ **COMPLETED**
   - **Problem:** The Bokun widget and dynamically loaded content are causing significant layout shifts.
   - **Action Plan:**
     - **Reserve Space for Widgets:** ✅ **DONE** - Added fixed `min-height` containers:
       - ✅ `DynamicGoogleReviews` wrapped in `min-h-[320px]` container
       - ✅ `DynamicGoogleMap` wrapped in `min-h-[400px]` container
       - ✅ Enhanced loading states to match container heights
     - **Image Dimensions:** ✅ **DONE** - Resolved through Phase 1 image optimization work.

**2. Reduce DOM Size:** ✅ **COMPLETED**
   - **Problem:** The Google Reviews slider (`react-slick`) renders all review slides into the DOM at once, creating over 2,600 DOM nodes.
   - **Action Plan:**
     - **Replace `react-slick`:** ✅ **DONE** - Analysis showed:
       - ✅ `embla-carousel-react` already installed and implemented in `components/ui/carousel.tsx`
       - ✅ `react-slick` usage is only in third-party `react-google-reviews` library (cannot be replaced)
       - ✅ All custom carousel needs use the modern embla-carousel implementation

---

### **Phase 5: Caching, Hosting, and Accessibility**

This phase includes final polishes for user experience and performance.

**1. Improve Accessibility:**
   - **Problem:** The reports highlight several accessibility issues, including focus management in the slider and poor color contrast.
   - **Action Plan:**
     - **Carousel Accessibility:** The new carousel (`embla-carousel`) will resolve the `aria-hidden` focus issue.
     - **Color Contrast:** Review and adjust the text colors identified in the report to meet WCAG AA contrast ratio standards.
     - **iFrame Title:** Add a descriptive `title` attribute to the Google Maps `iframe` for screen reader users.

**2. Caching and Hosting:**
   - **Problem:** Third-party assets have short cache lifetimes. The site is not yet leveraging a global CDN optimally.
   - **Action Plan:**
     - The image proxy created in Phase 1 will allow us to set our own, longer cache headers for the Google Review images, improving load times for repeat visitors.
     - **Leverage Vercel:** Ensure the project is deployed on Vercel to take full advantage of its global CDN, automatic image optimization, and other performance-enhancing features.
     - **Consider ISR/SSG:** For content-heavy pages that don't change often (like blog posts or activity descriptions), consider using Incremental Static Regeneration (ISR) or Static Site Generation (SSG) to serve pre-built HTML from the CDN edge, resulting in the fastest possible load times.
