# Google PageSpeed Optimization - Continuation Prompt

## Context Summary

I am continuing the Google PageSpeed optimization work for a Next.js 15 application (ponyclub.gr) that was systematically implementing performance improvements based on a 5-phase optimization plan. The goal is to improve PageSpeed scores from current levels (69 Mobile, 73 Desktop) through technical implementations.

## Work Completed So Far

### Phase 1: Asset Optimization ✅ COMPLETED
- **Hero Video Optimization**: 
  - ✅ Added `poster="/images/hero-image.webp"` attribute to video element for improved LCP
  - ✅ Implemented mobile autoplay control using `useIsMobile()` hook to disable autoplay on mobile devices
  - ⏸️ Manual video compression skipped (requires external tools)

- **Image Proxy API**: 
  - ✅ Created `/api/image-proxy/route.ts` API route for Google Reviews images
  - ✅ Modified `GoogleReviews` component to proxy Google profile images through API
  - ✅ Enabled Next.js optimization and caching for third-party images

### Phase 2: Font Optimization ✅ COMPLETED  
- ✅ Created centralized `app/fonts.ts` with optimized font loading
- ✅ Implemented `next/font/google` for Inter and Roboto fonts
- ✅ Added proper fallback strategies and display swap
- ✅ Applied fonts globally without layout shifts

### Phase 3: JavaScript Optimization ✅ COMPLETED
- **Dynamic Imports**: 
  - ✅ `DynamicGoogleReviews` with loading state in `components/HomePageContent.tsx`
  - ✅ `DynamicGoogleMap` with loading state  
  - ✅ `DynamicVintagePriceListPopup` for price list modal in `components/client/PriceListButton.tsx`

- **Bundle Analysis & Browser Targeting**:
  - ✅ Enhanced `@next/bundle-analyzer` configuration in `next.config.js`
  - ✅ Created `.browserslistrc` with modern browser targets
  - ✅ Added webpack optimization for bundle splitting
  - ✅ Enhanced package.json scripts for comprehensive bundle analysis

### Phase 4: Layout Shift Fixes & DOM Reduction ✅ COMPLETED
- **CLS Improvements**:
  - ✅ Added `min-h-[320px]` container around `DynamicGoogleReviews` (line 459-462 in HomePageContent.tsx)
  - ✅ Added `min-h-[400px]` container around `DynamicGoogleMap` (line 487-492 in HomePageContent.tsx)  
  - ✅ Updated loading state height to match container (h-80 = 320px)

- **DOM Reduction**:
  - ✅ Confirmed `embla-carousel-react` already implemented in `components/ui/carousel.tsx`
  - ✅ Verified `react-slick` only used in third-party `react-google-reviews` library (cannot be replaced)

## Current Status

**All major optimization phases (1-4) are complete.** The remaining work is **Phase 5: Accessibility and Caching improvements**.

## What Needs To Be Done Next

### Phase 5: Accessibility and Caching (REMAINING WORK)

Based on `docs/google-pagespeed-optimization-plan.md` lines 91-104:

#### 1. Accessibility Improvements Needed:
- **Color Contrast**: Review and adjust text colors to meet WCAG AA contrast ratio standards
- **iFrame Title**: Add descriptive `title` attribute to Google Maps iframe for screen readers
- **ARIA Labels**: Ensure proper ARIA labeling throughout the application
- **Focus Management**: Review focus management in interactive components

#### 2. Caching Strategy Improvements:
- **Image Proxy Caching**: The existing `/api/image-proxy/route.ts` needs enhanced cache headers
- **Vercel Optimization**: Ensure optimal Vercel deployment configuration  
- **ISR/SSG**: Consider Incremental Static Regeneration for content-heavy pages

## Technical Implementation Details

### Key Files Modified:
- `components/HomePageContent.tsx` - Hero video optimization, dynamic imports, CLS fixes
- `app/fonts.ts` - Centralized font management
- `app/api/image-proxy/route.ts` - Google Reviews image proxy
- `components/client/GoogleReviews.tsx` - Image proxy integration
- `components/client/PriceListButton.tsx` - Dynamic import for popup
- `next.config.js` - Bundle analyzer and webpack optimization
- `.browserslistrc` - Modern browser targeting
- `package.json` - Enhanced bundle analysis scripts

### Current Architecture:
- **Next.js 15** with Turbopack
- **Dynamic imports** using `next/dynamic` for heavy components
- **Font optimization** with `next/font/google`
- **Image optimization** with custom proxy API and `next/image`
- **Modern carousel** with `embla-carousel-react`
- **Responsive design** with custom media query hooks (`useIsMobile`, etc.)

## Immediate Next Steps

1. **Accessibility Audit**: 
   - Run accessibility analysis on the application
   - Identify color contrast issues
   - Check ARIA labeling completeness
   - Verify keyboard navigation

2. **Google Maps iFrame Enhancement**:
   - Locate Google Maps iframe implementation
   - Add descriptive `title` attribute

3. **Cache Headers Optimization**:
   - Enhance `/api/image-proxy/route.ts` with longer cache lifetimes
   - Review and optimize other caching strategies

4. **Final Performance Testing**:
   - Run Google PageSpeed Insights after accessibility fixes
   - Document performance improvements achieved

## Success Metrics
- Target: Improve from 69 Mobile / 73 Desktop PageSpeed scores
- Focus: Accessibility compliance (WCAG AA)
- Measure: Core Web Vitals (LCP, CLS, TBT improvements)

Please continue with Phase 5 accessibility and caching improvements, starting with an accessibility audit of the current application.
