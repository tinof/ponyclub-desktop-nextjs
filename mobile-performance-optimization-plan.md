# Mobile-First Performance Optimization Plan
## Next.js 15 - Ponyclub.gr

### Executive Summary

**Current State (Production - https://www.ponyclub.gr):**
- Desktop Performance: 99/100 Lighthouse score ✅ (Excellent - maintain this)
- **Mobile Performance: 31/100 Lighthouse score** ❌ (CRITICAL - worse than initially assessed)

**Current Mobile Metrics (Production):**
- Largest Contentful Paint (LCP): **4.8s** 🔴 Poor
- Cumulative Layout Shift (CLS): **0.467** 🔴 Poor
- Total Blocking Time (TBT): **1,260ms** 🔴 Poor
- First Contentful Paint (FCP): **1.9s** 🟠 Needs Improvement
- Speed Index: **6.2s** 🔴 Poor

**Target Metrics (Mobile-First):**
- Mobile Lighthouse Score: 90+/100 (from 31/100) - **190% improvement needed**
- Largest Contentful Paint (LCP): <2.5s (from 4.8s) - **48% reduction needed**
- Total Blocking Time (TBT): <300ms (from 1,260ms) - **76% reduction needed**
- Cumulative Layout Shift (CLS): <0.1 (from 0.467) - **79% reduction needed**
- First Contentful Paint (FCP): <1.8s (from 1.9s) - **5% improvement needed**
- Speed Index: <3.4s (from 6.2s) - **45% reduction needed**

**Priority:** HIGH - Mobile users are primary audience

---

## Root Cause Analysis

### Critical Mobile Performance Issues Identified (Production Data):

1. **Total Blocking Time (1,260ms)** - CRITICAL: JavaScript blocking main thread for 1.26 seconds
2. **Largest Contentful Paint (4.8s)** - CRITICAL: Nearly 5 seconds to render main content
3. **Cumulative Layout Shift (0.467)** - CRITICAL: Major layout instability (Bokun widgets primary culprit)
4. **Speed Index (6.2s)** - CRITICAL: Very slow visual completion
5. **First Contentful Paint (1.9s)** - MODERATE: Acceptable but can improve

### Root Causes (Based on PageSpeed Analysis):
1. **Unused JavaScript (556 KiB)** - Largest opportunity for improvement
2. **Bokun Widget Layout Shifts** - `div.sc-gueYoa` causing major CLS issues
3. **JavaScript Execution Time** - 1,260ms main thread blocking
4. **Improperly Sized Images** - 45 KiB potential savings
5. **Unused CSS (17 KiB)** - Additional optimization opportunity

### Contributing Factors:
- Massive JavaScript bundle with unused code
- Third-party Bokun widgets causing severe layout shifts
- Unoptimized image serving
- Render-blocking resources on mobile networks
- Poor code splitting and lazy loading implementation

---

## Phase 1: EMERGENCY JavaScript Bundle Reduction (Week 1)
**Priority: CRITICAL | Impact: MASSIVE | Effort: HIGH**
**Target: Remove 556 KiB unused JavaScript + Optimize TBT from 1,260ms to <300ms**

### 1.1 URGENT: Unused JavaScript Elimination
**Target: Remove 556 KiB of unused JavaScript identified by PageSpeed**

```bash
# Step 1: Analyze current bundle
pnpm run build
pnpm run analyze

# Step 2: Identify unused dependencies
npx depcheck
npx webpack-bundle-analyzer .next/static/chunks/*.js
```

### 1.2 Mobile-Specific Code Splitting
```javascript
// next.config.js - Enhanced mobile-first splitting
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Mobile-optimized chunks
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            maxSize: 200000, // Reduced for mobile
            minSize: 15000,
          },
          // Separate mobile-critical chunks
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            maxSize: 150000,
          },
          // UI library chunks
          ui: {
            test: /[\\/]node_modules[\\/](@mui|framer-motion)[\\/]/,
            name: 'ui',
            chunks: 'all',
            maxSize: 180000,
          }
        }
      };
    }
    return config;
  }
};
```

### 1.2 Progressive Enhancement Implementation
```javascript
// components/ProgressiveImage.js
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProgressiveImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="progressive-image-container">
      <Image
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        priority={props.priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
}
```

### 1.3 Mobile-First Dynamic Imports
```javascript
// Lazy load heavy components for mobile
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div className="skeleton-loader" />,
  ssr: false // Skip SSR for mobile-specific components
});

// Mobile-conditional loading
const MobileOptimizedComponent = dynamic(
  () => import('./MobileOptimizedComponent'),
  { 
    loading: () => <div>Loading...</div>,
    ssr: true 
  }
);
```

**Expected Impact:**
- **TBT reduction: 1,260ms → 400-500ms (60-70% improvement)**
- **Bundle size reduction: 556 KiB+ (30-40% total bundle reduction)**
- **LCP improvement: 4.8s → 3.5-4.0s (20-25% improvement)**

---

## Phase 2: CRITICAL Bokun Widget CLS Fix (Week 2)
**Priority: CRITICAL | Impact: MASSIVE | Effort: HIGH**
**Target: Fix CLS from 0.467 to <0.1 (79% improvement) - Focus on Bokun widgets**

### 2.1 Font Loading Optimization
```javascript
// next.config.js - Font optimization
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT/FOUT
  adjustFontFallback: true, // Reduce CLS
  fallback: ['system-ui', 'arial'],
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
});
```

### 2.2 Image Dimension Enforcement
```javascript
// utils/imageOptimization.js
export const getImageDimensions = (src) => {
  // Implement image dimension detection
  // Return { width, height } to prevent CLS
};

// components/OptimizedImage.js
import Image from 'next/image';

export default function OptimizedImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={props.width || 800}
      height={props.height || 600}
      sizes="(max-width: 768px) 100vw, 50vw"
      priority={props.priority || false}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
}
```

### 2.1 URGENT: Bokun Widget CLS Fix
**Target: Fix `div.sc-gueYoa` layout shifts identified by PageSpeed**

```javascript
// components/BokunsWidgetContainer.js
import { useEffect, useRef, useState } from 'react';

export default function BokunsWidgetContainer({ widgetId }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });

  useEffect(() => {
    // Pre-allocate space for Bokun widget to prevent CLS
    if (containerRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: Math.max(entry.contentRect.height, 400)
          });
        }
      });

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="bokun-widget-container"
      style={{
        minHeight: `${dimensions.height}px`,
        width: '100%',
        // Prevent layout shift during loading
        contain: 'layout style paint',
      }}
    >
      {/* Bokun widget will load here */}
      <div id={widgetId} />
    </div>
  );
}
```

### 2.2 Third-Party Script Optimization
```javascript
// components/OptimizedScripts.js
import Script from 'next/script';

export default function OptimizedScripts() {
  return (
    <>
      {/* Defer non-critical scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="lazyOnload"
      />
      
      {/* Bokun widget - mobile optimized */}
      <Script
        id="bokun-widget"
        strategy="lazyOnload"
        onLoad={() => {
          // Initialize only when needed
          if (typeof window !== 'undefined' && window.innerWidth > 768) {
            // Load full widget for desktop
          } else {
            // Load minimal widget for mobile
          }
        }}
      />
    </>
  );
}
```

**Expected Impact:**
- **CLS reduction: 0.467 → <0.1 (79% improvement)**
- **LCP improvement: 4.8s → 3.5s (27% improvement)**
- **Speed Index improvement: 6.2s → 4.5s (27% improvement)**

---

## Phase 3: Image Optimization & Resource Loading (Week 3)
**Priority: HIGH | Impact: MEDIUM | Effort: MEDIUM**
**Target: Optimize 45 KiB image savings + Improve LCP from 4.8s to <2.5s**

### 3.1 URGENT: Image Size Optimization
**Target: Implement "Properly size images" recommendation (45 KiB savings)**

```javascript
// next.config.js - Enhanced image optimization
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    // Mobile-first responsive breakpoints
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1200,
    }
  },
};

// components/OptimizedHeroImage.js
import Image from 'next/image';

export default function OptimizedHeroImage({ src, alt, priority = true }) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
      }}
      quality={85} // Optimized for mobile
    />
  );
}
```

### 3.2 Critical Resource Prioritization
```javascript
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Preload critical mobile resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Mobile-specific meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### 3.2 Service Worker Implementation
```javascript
// public/sw.js - Mobile-optimized caching
const CACHE_NAME = 'ponyclub-mobile-v1';
const MOBILE_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  // Critical mobile assets only
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(MOBILE_ASSETS))
  );
});

// Implement stale-while-revalidate for mobile
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});
```

**Expected Impact:**
- **Image payload reduction: 45 KiB+ savings**
- **LCP improvement: 4.8s → 3.0s (38% improvement)**
- **FCP improvement: 1.9s → 1.5s (21% improvement)**

---

## Phase 4: Final Performance Polish (Week 4)
**Priority: MEDIUM | Impact: MEDIUM | Effort: MEDIUM**
**Target: Remove unused CSS (17 KiB) + Final optimizations to reach 90+ score**

### 4.1 URGENT: Unused CSS Removal
**Target: Remove 17 KiB unused CSS identified by PageSpeed**

```bash
# Step 1: Analyze unused CSS
npx purgecss --css .next/static/css/*.css --content .next/**/*.html --output purged-css/

# Step 2: Use PostCSS with PurgeCSS
npm install --save-dev @fullhuman/postcss-purgecss
```

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: [
                './pages/**/*.{js,ts,jsx,tsx}',
                './components/**/*.{js,ts,jsx,tsx}',
                './app/**/*.{js,ts,jsx,tsx}',
              ],
              defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: {
                standard: ['html', 'body'],
                deep: [/^bokun-/, /^sc-/], // Keep Bokun widget styles
              },
            },
          ],
        ]
      : []),
  ],
};
```

### 4.2 Intersection Observer for Mobile
```javascript
// hooks/useIntersectionObserver.js
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [targetRef, isIntersecting];
}
```

### 4.2 Mobile-Specific Component Loading
```javascript
// components/MobileOptimizedLayout.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DesktopComponent = dynamic(() => import('./DesktopComponent'));
const MobileComponent = dynamic(() => import('./MobileComponent'));

export default function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileComponent /> : <DesktopComponent />;
}
```

**Expected Impact:**
- **CSS payload reduction: 17 KiB+ savings**
- **Final performance score: 31/100 → 90+/100**
- **Speed Index: 6.2s → <3.4s (45% improvement)**

---

## Implementation Timeline

### Week 1: EMERGENCY JavaScript Bundle Reduction
- [ ] **URGENT:** Analyze and remove 556 KiB unused JavaScript
- [ ] Implement aggressive code splitting for mobile
- [ ] Remove unused dependencies with depcheck
- [ ] **Target:** TBT reduction from 1,260ms to 400-500ms

### Week 2: CRITICAL Bokun Widget CLS Fix
- [ ] **URGENT:** Fix `div.sc-gueYoa` layout shifts (CLS: 0.467 → <0.1)
- [ ] Implement Bokun widget container with pre-allocated space
- [ ] Optimize font loading with display: swap
- [ ] **Target:** CLS reduction of 79%

### Week 3: Image & Resource Optimization
- [ ] **URGENT:** Implement "Properly size images" (45 KiB savings)
- [ ] Optimize Next.js Image component for mobile
- [ ] Implement critical resource prioritization
- [ ] **Target:** LCP improvement from 4.8s to 3.0s

### Week 4: Final Performance Polish
- [ ] **URGENT:** Remove 17 KiB unused CSS
- [ ] Implement PostCSS PurgeCSS optimization
- [ ] Final performance testing and validation
- [ ] **Target:** Mobile score from 31/100 to 90+/100

---

## Testing & Validation Strategy

### Performance Testing Protocol:
1. **Lighthouse Mobile Audits** - After each phase completion
2. **Real Device Testing** - iPhone/Android on 3G/4G networks
3. **Core Web Vitals Monitoring** - Continuous measurement
4. **A/B Testing** - Compare optimized vs current mobile experience

### Key Pages to Test:
- `/[locale]/packages` (Primary conversion page)
- `/rafting` (High-traffic page)
- Homepage (`/`)
- Product detail pages

### Success Criteria:
- Mobile Lighthouse Score: 90+/100
- LCP: <2.5s consistently
- TBT: <300ms
- CLS: <0.1
- TTI: <3.8s

---

## Expected Performance Improvements

| Metric | Current (Production) | Target | Expected Improvement |
|--------|---------------------|--------|---------------------|
| **Lighthouse Score** | **31/100** | **90+/100** | **+190%** |
| **LCP** | **4.8s** | **<2.5s** | **-48%** |
| **TBT** | **1,260ms** | **<300ms** | **-76%** |
| **CLS** | **0.467** | **<0.1** | **-79%** |
| **FCP** | **1.9s** | **<1.8s** | **-5%** |
| **Speed Index** | **6.2s** | **<3.4s** | **-45%** |

### Key Optimization Targets (Based on PageSpeed Analysis):
1. **Remove 556 KiB unused JavaScript** (Highest impact)
2. **Fix Bokun widget CLS issues** (`div.sc-gueYoa`)
3. **Optimize image sizes** (45 KiB savings)
4. **Remove 17 KiB unused CSS**
5. **Reduce JavaScript execution time** (1,260ms → <300ms)

---

## Risk Mitigation

### Potential Risks:
1. **Desktop Performance Regression** - Maintain 99/100 score
2. **Feature Functionality Impact** - Ensure all features work on mobile
3. **Third-Party Integration Issues** - Test Bokun widgets thoroughly

### Mitigation Strategies:
1. **Gradual Rollout** - Implement changes incrementally
2. **Feature Flags** - Use feature toggles for new optimizations
3. **Rollback Plan** - Maintain ability to revert changes quickly
4. **Monitoring** - Continuous performance monitoring

---

## Next Steps

1. **Immediate Action:** Begin Phase 1 implementation
2. **Team Coordination:** Assign developers to each phase
3. **Monitoring Setup:** Implement performance tracking
4. **Stakeholder Communication:** Regular progress updates

**Success depends on mobile-first approach while maintaining excellent desktop performance.**
