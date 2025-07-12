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

'''

NextJS related documentation:

How to optimize third-party libraries
@next/third-parties is a library that provides a collection of components and utilities that improve the performance and developer experience of loading popular third-party libraries in your Next.js application.

All third-party integrations provided by @next/third-parties have been optimized for performance and ease of use.

Getting Started
To get started, install the @next/third-parties library:

Terminal

npm install @next/third-parties@latest next@latest
@next/third-parties is currently an experimental library under active development. We recommend installing it with the latest or canary flags while we work on adding more third-party integrations.

Google Third-Parties
All supported third-party libraries from Google can be imported from @next/third-parties/google.

Google Tag Manager
The GoogleTagManager component can be used to instantiate a Google Tag Manager container to your page. By default, it fetches the original inline script after hydration occurs on the page.

To load Google Tag Manager for all routes, include the component directly in your root layout and pass in your GTM container ID:

app/layout.tsx
TypeScript

TypeScript

import { GoogleTagManager } from '@next/third-parties/google'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body>{children}</body>
    </html>
  )
}
To load Google Tag Manager for a single route, include the component in your page file:

app/page.js

import { GoogleTagManager } from '@next/third-parties/google'
 
export default function Page() {
  return <GoogleTagManager gtmId="GTM-XYZ" />
}
Sending Events
The sendGTMEvent function can be used to track user interactions on your page by sending events using the dataLayer object. For this function to work, the <GoogleTagManager /> component must be included in either a parent layout, page, or component, or directly in the same file.

app/page.js

'use client'
 
import { sendGTMEvent } from '@next/third-parties/google'
 
export function EventButton() {
  return (
    <div>
      <button
        onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}
      >
        Send Event
      </button>
    </div>
  )
}
Refer to the Tag Manager developer documentation to learn about the different variables and events that can be passed into the function.

Server-side Tagging
If you're using a server-side tag manager and serving gtm.js scripts from your tagging server you can use gtmScriptUrl option to specify the URL of the script.

Options
Options to pass to the Google Tag Manager. For a full list of options, read the Google Tag Manager docs.

Name	Type	Description
gtmId	Required	Your GTM container ID. Usually starts with GTM-.
gtmScriptUrl	Optional	GTM script URL. Defaults to https://www.googletagmanager.com/gtm.js.
dataLayer	Optional	Data layer object to instantiate the container with.
dataLayerName	Optional	Name of the data layer. Defaults to dataLayer.
auth	Optional	Value of authentication parameter (gtm_auth) for environment snippets.
preview	Optional	Value of preview parameter (gtm_preview) for environment snippets.
Google Analytics
The GoogleAnalytics component can be used to include Google Analytics 4 to your page via the Google tag (gtag.js). By default, it fetches the original scripts after hydration occurs on the page.

Recommendation: If Google Tag Manager is already included in your application, you can configure Google Analytics directly using it, rather than including Google Analytics as a separate component. Refer to the documentation to learn more about the differences between Tag Manager and gtag.js.

To load Google Analytics for all routes, include the component directly in your root layout and pass in your measurement ID:

app/layout.tsx
TypeScript

TypeScript

import { GoogleAnalytics } from '@next/third-parties/google'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  )
}
To load Google Analytics for a single route, include the component in your page file:

app/page.js

import { GoogleAnalytics } from '@next/third-parties/google'
 
export default function Page() {
  return <GoogleAnalytics gaId="G-XYZ" />
}
Sending Events
The sendGAEvent function can be used to measure user interactions on your page by sending events using the dataLayer object. For this function to work, the <GoogleAnalytics /> component must be included in either a parent layout, page, or component, or directly in the same file.

app/page.js

'use client'
 
import { sendGAEvent } from '@next/third-parties/google'
 
export function EventButton() {
  return (
    <div>
      <button
        onClick={() => sendGAEvent('event', 'buttonClicked', { value: 'xyz' })}
      >
        Send Event
      </button>
    </div>
  )
}
Refer to the Google Analytics developer documentation to learn more about event parameters.

Tracking Pageviews
Google Analytics automatically tracks pageviews when the browser history state changes. This means that client-side navigations between Next.js routes will send pageview data without any configuration.

To ensure that client-side navigations are being measured correctly, verify that the “Enhanced Measurement” property is enabled in your Admin panel and the “Page changes based on browser history events” checkbox is selected.

Note: If you decide to manually send pageview events, make sure to disable the default pageview measurement to avoid having duplicate data. Refer to the Google Analytics developer documentation to learn more.

Options
Options to pass to the <GoogleAnalytics> component.

Name	Type	Description
gaId	Required	Your measurement ID. Usually starts with G-.
dataLayerName	Optional	Name of the data layer. Defaults to dataLayer.
nonce	Optional	A nonce.
Google Maps Embed
The GoogleMapsEmbed component can be used to add a Google Maps Embed to your page. By default, it uses the loading attribute to lazy-load the embed below the fold.

app/page.js

import { GoogleMapsEmbed } from '@next/third-parties/google'
 
export default function Page() {
  return (
    <GoogleMapsEmbed
      apiKey="XYZ"
      height={200}
      width="100%"
      mode="place"
      q="Brooklyn+Bridge,New+York,NY"
    />
  )
}
Options
Options to pass to the Google Maps Embed. For a full list of options, read the Google Map Embed docs.

Name	Type	Description
apiKey	Required	Your api key.
mode	Required	Map mode
height	Optional	Height of the embed. Defaults to auto.
width	Optional	Width of the embed. Defaults to auto.
style	Optional	Pass styles to the iframe.
allowfullscreen	Optional	Property to allow certain map parts to go full screen.
loading	Optional	Defaults to lazy. Consider changing if you know your embed will be above the fold.
q	Optional	Defines map marker location. This may be required depending on the map mode.
center	Optional	Defines the center of the map view.
zoom	Optional	Sets initial zoom level of the map.
maptype	Optional	Defines type of map tiles to load.
language	Optional	Defines the language to use for UI elements and for the display of labels on map tiles.
region	Optional	Defines the appropriate borders and labels to display, based on geo-political sensitivities.
YouTube Embed
The YouTubeEmbed component can be used to load and display a YouTube embed. This component loads faster by using lite-youtube-embed under the hood.

app/page.js

import { YouTubeEmbed } from '@next/third-parties/google'
 
export default function Page() {
  return <YouTubeEmbed videoid="ogfYd705cRs" height={400} params="controls=0" />
}
Options
Name	Type	Description
videoid	Required	YouTube video id.
width	Optional	Width of the video container. Defaults to auto
height	Optional	Height of the video container. Defaults to auto
playlabel	Optional	A visually hidden label for the play button for accessibility.
params	Optional	The video player params defined here.
Params are passed as a query param string.
Eg: params="controls=0&start=10&end=30"
style	Optional	Used to apply styles to the video container.
