# 🚨 CRITICAL Performance Regression Recovery Plan

## Current Status: URGENT
- **Google PageSpeed Score**: 62% (Grade C) - DOWN from previous excellent performance
- **LCP**: 4.1s (CRITICAL - was 0.2-0.6s)
- **Bundle Size**: 4.8 MB total, 459 kB First Load JS
- **Major Issues**: Double image downloads, massive JS bundles, third-party script blocking

## ✅ COMPLETED FIXES

### 1. ✅ Fixed Double Image Download (COMPLETED)
**Problem**: Hero image downloading twice (66KB optimized + 183KB original)
**Root Cause**: Video `poster="/images/hero-image.webp"` attribute in `components/HomePageContent.tsx:83`
**Solution**: Removed poster attribute - OptimizedImage component already handles the background
**Impact**: Eliminates 183KB unnecessary download, should improve LCP significantly

### 2. ✅ Fixed Middleware TypeScript Error (COMPLETED)
**Problem**: Build failing due to undefined chosenLocale type
**Solution**: Added fallback `chosenLocale || defaultLocale` in middleware.ts:224
**Impact**: Enables proper builds and deployments

### 3. ✅ Fixed i18n Redirect Issue (COMPLETED - per user)
**Problem**: 594ms redirect delay from root to /en
**Status**: User confirmed this is already resolved

## 🔥 CRITICAL REMAINING ISSUES

### 1. 🚨 MASSIVE JavaScript Bundle (366KB vendors chunk)
**Current State**: 
- First Load JS: 459 kB
- Vendors chunk: 366 kB (80% of bundle!)
- Bundle analyzer report: `/Users/tfotiou/Documents/GitHub/ponyclub-v0/.next/analyze/client.html`

**Investigation Needed**:
- Open bundle analyzer to identify what's in the 366KB vendors chunk
- Likely candidates: Large libraries, duplicate dependencies, unnecessary imports
- Check for: React components, UI libraries, third-party widgets loaded synchronously

**Action Plan**:
1. Analyze bundle composition via browser report
2. Identify largest contributors (likely suspects: Bokun widgets, Google Maps, UI libraries)
3. Implement dynamic imports for non-critical components
4. Move third-party scripts to lazy loading
5. Split vendor chunks more granularly

### 2. 🚨 Third-Party Script Blocking
**Current State**: Scripts loading with preload strategy causing render blocking
**Known Issues**:
- Bokun widgets loading synchronously
- Google Maps API blocking
- Featurable scripts preloaded incorrectly

**Action Plan**:
1. Audit all Script components in layout.tsx
2. Change strategy from 'beforeInteractive'/'afterInteractive' to 'lazyOnload'
3. Implement proper Partytown for heavy third-party scripts
4. Use intersection observer for widget loading

### 3. 🚨 Image Optimization Verification
**Status**: Need to verify the poster fix resolved the issue
**Action Plan**:
1. Deploy changes and test
2. Run new HAR analysis to confirm single image download
3. Verify LCP improvement

## 📋 IMMEDIATE NEXT STEPS (Priority Order)

### Step 1: Bundle Analysis & Optimization
```bash
# 1. Open bundle analyzer (already generated)
open /Users/tfotiou/Documents/GitHub/ponyclub-v0/.next/analyze/client.html

# 2. Identify largest chunks and plan dynamic imports
# 3. Implement code splitting for heavy components
```

### Step 2: Third-Party Script Audit
```bash
# 1. Audit all Script tags in app/[locale]/layout.tsx
# 2. Change loading strategies to lazyOnload
# 3. Implement Partytown for heavy scripts
```

### Step 3: Performance Testing
```bash
# 1. Build and deploy changes
pnpm build
pnpm start

# 2. Test on key pages:
# - https://localhost:3000/en (homepage)
# - https://localhost:3000/en/packages (packages page)
# - https://localhost:3000/en/rafting (rafting page)

# 3. Run Lighthouse audits
# 4. Generate new HAR files for comparison
```

## 🎯 TARGET METRICS
- **LCP**: < 2.5s (currently 4.1s)
- **First Load JS**: < 300KB (currently 459KB)
- **PageSpeed Score**: > 90% (currently 62%)
- **Bundle Size**: < 3MB (currently 4.8MB)

## 📁 KEY FILES TO MONITOR
- `components/HomePageContent.tsx` - Hero image implementation ✅ FIXED
- `app/[locale]/layout.tsx` - Script loading configuration
- `next.config.js` - Bundle optimization settings
- `middleware.ts` - i18n routing ✅ FIXED
- Bundle analyzer reports in `.next/analyze/`

## 🔍 INVESTIGATION TOOLS
- Bundle Analyzer: `.next/analyze/client.html`
- Lighthouse DevTools
- Network tab HAR analysis
- Core Web Vitals monitoring

## ⚠️ CRITICAL NOTES
1. **Performance Priority**: Focus on performance over security during this recovery phase
2. **Testing Required**: Each fix must be tested with Lighthouse before proceeding
3. **Bundle Analysis**: The 366KB vendors chunk is the primary culprit
4. **User Preference**: Use pnpm for all package management
5. **Port**: Development server runs on port 3000

## 📞 CONTINUATION CONTEXT
When continuing this work:
1. Start by opening the bundle analyzer report to identify the 366KB vendors chunk contents
2. Focus on the largest contributors first (likely Bokun widgets, Google Maps, UI libraries)
3. Implement dynamic imports and lazy loading systematically
4. Test each change with Lighthouse on key pages
5. The double image download fix should show immediate LCP improvement once deployed

**Status**: Ready for bundle analysis and third-party script optimization phase.
