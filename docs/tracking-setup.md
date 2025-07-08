# Google Analytics & Ads Tracking Setup - Pony Club

## Overview

This document provides comprehensive setup instructions for Google Analytics 4 (GA4) and Google Ads conversion tracking on the Pony Club website. The implementation is GDPR-compliant, mobile-first optimized, and uses a centralized analytics helper for consistent tracking.

**Based on Google Search Console Data:**
- Homepage receives 76% of traffic (25/33 clicks) - critical for conversion tracking
- Mobile dominates with 78% of traffic (35/45 clicks) - phone CTA tracking essential
- Package pages not indexed by Google - major missed opportunity
- Low overall traffic (45 clicks/3 months) makes every conversion valuable

## Architecture

### Centralized Analytics Helper

**Location:** `/lib/analytics.ts`

The centralized helper provides:
- GDPR consent checking for all tracking events
- Consistent error handling and debug logging
- Unified interface for GA4, Google Ads, Vercel Analytics, and Facebook Pixel
- Environment-driven configuration

### Key Components

1. **GoogleAnalytics.tsx** - GA4 bootstrap with Partytown (consent-gated)
2. **PhoneLink.tsx** - Mobile/desktop-aware phone CTA component with device-specific tracking
3. **BookingButton.tsx** - Source-aware package booking tracking with dynamic conversion labels
4. **EngagementTracker.tsx** - Micro-conversion tracking for scroll depth and time on page
5. **Analytics Helper** - Centralized tracking functions with GDPR compliance

## Environment Variables Setup

Add these variables to your `.env.local` file:

```bash
# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=G-6J3ELVNTQE

# Google Ads Conversion Tracking
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX

# Package Booking Conversion Labels (Source-Aware)
# Homepage package bookings (76% of traffic - high priority)
NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE1=XXXXXXXX
NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE2=YYYYYYYY

# Package page bookings (direct package interest)
NEXT_PUBLIC_ADS_LABEL_PACKAGE1=XXXXXXXX
NEXT_PUBLIC_ADS_LABEL_PACKAGE2=YYYYYYYY

# Phone Click Conversion Labels (Mobile-First - 78% of traffic)
# Mobile phone clicks (high priority)
NEXT_PUBLIC_ADS_LABEL_PHONE_MOBILE=ZZZZZZZ
# Desktop phone clicks
NEXT_PUBLIC_ADS_LABEL_PHONE_DESKTOP=AAAAAAA
# Generic phone label (fallback)
NEXT_PUBLIC_ADS_LABEL_PHONE=BBBBBBB
```

## Google Ads Setup

### Step 1: Create Conversion Actions

In Google Ads, create separate conversion actions for:

1. **Package 1 Bookings**
   - Name: "Package 1 Booking"
   - Category: Purchase
   - Value: Use different values for each conversion
   - Count: One

2. **Package 2 Bookings**
   - Name: "Package 2 Booking"  
   - Category: Purchase
   - Value: Use different values for each conversion
   - Count: One

3. **Phone Clicks**
   - Name: "Phone Click"
   - Category: Phone calls
   - Value: 0 (or assign value for lead scoring)
   - Count: One

### Step 2: Get Conversion IDs and Labels

After creating each conversion action, Google Ads provides:
- **Conversion ID**: Format `AW-XXXXXXXXXX` (same for all)
- **Conversion Label**: Unique string for each action

### Step 3: Update Environment Variables

Replace the placeholder values in `.env.local` with your actual IDs and labels.

## Critical: Package Page Indexing Fix

**Issue:** Google Search Console shows package pages are "unknown to Google"
**Impact:** Missing significant organic traffic and conversion opportunities

### Immediate Actions Required

1. **Submit to Google Search Console**
   ```
   Submit URLs:
   - https://yoursite.com/en/package-1
   - https://yoursite.com/en/package-2
   - https://yoursite.com/gr/package-1
   - https://yoursite.com/gr/package-2
   ```

2. **Add Internal Links**
   - Link to package pages from homepage
   - Add package navigation in main menu
   - Include package links in footer

3. **Create XML Sitemap**
   - Include all package page URLs
   - Submit sitemap to GSC
   - Monitor indexing status

4. **Add Structured Data**
   - Product schema for packages
   - LocalBusiness schema
   - Review schema if applicable

## Mobile-First Tracking Strategy

**Priority:** Mobile users represent 78% of traffic - optimize for mobile conversions first

### Device-Specific Phone Tracking
```typescript
// Automatic device detection in PhoneLink component
const isMobile = detectMobileDevice(); // User agent + screen size
const conversionLabel = isMobile
  ? process.env.NEXT_PUBLIC_ADS_LABEL_PHONE_MOBILE
  : process.env.NEXT_PUBLIC_ADS_LABEL_PHONE_DESKTOP;
```

### Source-Aware Booking Tracking
```typescript
// Homepage bookings (76% of traffic)
<BookingButton
  sourcePage="homepage"
  packageType="package1"
  // Uses NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE1
/>

// Package page bookings (when indexed)
<BookingButton
  sourcePage="package-page"
  packageType="package1"
  // Uses NEXT_PUBLIC_ADS_LABEL_PACKAGE1
/>
```

### Engagement Micro-Conversions
For low-traffic optimization, track:
- Scroll depth (25%, 50%, 75%, 90%)
- Time on page (30s, 60s, 2min, 5min)
- Content interactions
- Page engagement quality

## Implementation Details

### Tracking Events

#### Booking Button Clicks
```typescript
// Automatically tracked when BookingButton is clicked
trackBookingClick({
  packageName: "Adventure Package",
  packagePrice: 150,
  buttonId: "package-1-btn",
  trackingLabel: "Package 1 Homepage",
  conversionLabel: process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE1
});
```

#### Phone Link Clicks
```typescript
// Automatically tracked when PhoneLink is clicked
gtagEvent("phone_click", {
  event_category: "Contact",
  event_label: "Phone CTA",
  phone_number: "+30 26650 61314"
});

sendAdsConversion(process.env.NEXT_PUBLIC_ADS_LABEL_PHONE, 0);
```

### GDPR Compliance

All tracking events are gated by user consent:

```typescript
function hasAnalyticsConsent(): boolean {
  // Checks for consent cookie from existing consent system
  const consentCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("consent="));
    
  if (consentCookie) {
    const consent = JSON.parse(decodeURIComponent(consentCookie.split("=")[1]));
    return consent.analytics;
  }
  return false;
}
```

### Debug Mode

In development, all tracking events are logged to console:

```javascript
// Enable debug logging
NODE_ENV=development

// Console output examples:
[gtag] book_now_click {package_name: "Adventure Package", ...}
[gtag] phone_click {event_category: "Contact", ...}
[BookingButton] Package 1 Homepage clicked - Package: Adventure Package, Price: €150
```

## Testing & Validation

### Development Testing

1. Set `NODE_ENV=development` 
2. Open browser console
3. Click booking buttons and phone links
4. Verify debug logs appear
5. Check consent blocking works (clear consent cookie)

### Production Testing

1. Use Google Tag Assistant browser extension
2. Enable Google Ads conversion tracking test mode
3. Verify events fire in Google Analytics Real-Time reports
4. Check Google Ads for conversion data (24-48 hour delay)

### Testing Checklist

- [ ] GA4 events fire with correct parameters
- [ ] Google Ads conversions track with proper labels
- [ ] Consent system blocks events when disabled
- [ ] Debug logging works in development
- [ ] No console errors in production
- [ ] Different conversion labels for different packages
- [ ] Phone click tracking works

## Troubleshooting

### Common Issues

**Environment Variables Not Loading**
- Ensure `.env.local` is in project root
- Variable names must start with `NEXT_PUBLIC_`
- Restart development server after changes

**Conversions Not Showing in Google Ads**
- Verify conversion action is enabled
- Check conversion ID/label are correct
- Allow 24-48 hours for data to appear
- Test with Google Tag Assistant

**GDPR Blocking Events**
- Ensure user has accepted analytics cookies
- Check browser console for consent status
- Test with different consent scenarios

**Debug Logs Not Appearing**
- Verify `NODE_ENV=development`
- Check browser console is open
- Ensure no ad blockers are interfering

## Security Notes

- `.env.local` is automatically ignored by Git
- `NEXT_PUBLIC_` variables are safe for client-side use
- Never commit actual conversion IDs to version control
- Use different conversion actions for staging/production

## Package-Specific Implementation

To use different conversion labels per package:

```tsx
// Homepage - Package 1
<BookingButton
  conversionLabel={process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE1}
  // ... other props
/>

// Homepage - Package 2  
<BookingButton
  conversionLabel={process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE2}
  // ... other props
/>
```

## Performance Impact

- Google Analytics runs in Partytown web worker (no main thread impact)
- Tracking events are non-blocking
- Consent checks are cached
- Debug logging only in development
- All tracking respects user privacy preferences
