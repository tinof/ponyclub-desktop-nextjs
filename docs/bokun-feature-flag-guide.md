# Bokun Feature Flag System

## Overview

This document describes the feature flag system implemented to conditionally disable Bokun scripts for mobile-first performance optimization testing.

## Environment Variable

### `NEXT_PUBLIC_ENABLE_BOKUN`

- **Type**: String
- **Default**: `'true'` (if not set)
- **Values**: 
  - `'true'` - Enable Bokun scripts (production behavior)
  - `'false'` - Disable Bokun scripts (performance testing)

## Implementation Details

### Components Affected

1. **BokunScripts** (`components/client/BokunScripts.tsx`)
   - Returns `null` when disabled
   - Skips loading the main Bokun widget loader script

2. **ClientLayout** (`components/ClientLayout.tsx`)
   - Disables BokunInitializer component
   - Removes hidden Bokun widget container

3. **LocaleLayout** (`app/[locale]/layout.tsx`)
   - Conditionally removes Bokun preconnect links
   - Reduces DNS prefetching overhead

## Usage

### For Performance Testing (Disable Bokun)

Create or update `.env.local`:
```bash
NEXT_PUBLIC_ENABLE_BOKUN=false
```

### For Production (Enable Bokun)

Create or update `.env.local`:
```bash
NEXT_PUBLIC_ENABLE_BOKUN=true
```

Or simply remove the variable (defaults to enabled).

## Testing Workflow

### 1. Disable Bokun for Baseline Testing
```bash
echo "NEXT_PUBLIC_ENABLE_BOKUN=false" > .env.local
pnpm build
pnpm start
```

### 2. Run Performance Audits
Test key pages with Bokun disabled:
- `/en/packages`
- `/gr/packages` 
- `/en/rafting`
- `/gr/rafting`

### 3. Re-enable Bokun
```bash
echo "NEXT_PUBLIC_ENABLE_BOKUN=true" > .env.local
pnpm build
pnpm start
```

### 4. Compare Performance Metrics
Document the difference in:
- Performance Score
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- TBT (Total Blocking Time)
- TTI (Time to Interactive)

## Mobile-First Performance Targets

With Bokun disabled, we aim to achieve:
- **Performance Score**: 90+/100
- **LCP**: <2.5s
- **TBT**: <300ms
- **CLS**: <0.1
- **TTI**: <3.8s

## Restoration

To restore full Bokun functionality:
1. Set `NEXT_PUBLIC_ENABLE_BOKUN=true`
2. Rebuild the application
3. All Bokun widgets and scripts will function normally

## Notes

- The feature flag only affects script loading, not widget components
- Widget components will gracefully handle missing scripts
- Development console logs indicate when Bokun is disabled
- No code changes needed to switch between enabled/disabled states
