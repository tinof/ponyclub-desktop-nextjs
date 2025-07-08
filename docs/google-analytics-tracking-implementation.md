# Google Analytics Tracking Implementation - Pony Club Web App

## Overview

This document outlines the comprehensive Google Analytics tracking
implementation for the Pony Club adventure activities booking website. The
implementation includes GA4 events, enhanced ecommerce tracking, and conversion
tracking.

## Current Implementation Status

**Last Updated:** January 8, 2025
**Status:** ✅ Active and Working
**GDPR Compliance:** ✅ Active with Consent Management

## Architecture Overview

### 1. Consent-Gated Google Analytics Implementation

**Location:** `/components/client/GoogleAnalytics.tsx`

- Google Analytics implementation with full consent management
- GA4 scripts only load when user has given analytics consent
- Real-time consent monitoring with cookie-based state management
- Partytown web worker implementation for performance optimization

### 2. Centralized Analytics Helper

**Location:** `/lib/analytics.ts`

- Centralized tracking functions with consent checking
- Unified interface for GA4, Google Ads, Vercel Analytics, and Facebook Pixel
- Environment-driven configuration with debug logging
- GDPR-compliant event firing with consent validation

### 3. Booking Button Component

**Location:** `/components/client/BookingButton.tsx`

- Core component handling booking interactions
- Uses centralized analytics helper for consistent tracking
- Supports package-specific conversion labels
- GDPR-compliant event firing through analytics helper

### 4. Phone Link Component

**Location:** `/components/client/PhoneLink.tsx`

- Reusable component for phone call-to-action tracking
- Automatic Google Ads conversion tracking for phone clicks
- Integrated into desktop and mobile menu components
- Consent-aware tracking implementation

## Tracking Events Implemented

### 1. Google Analytics 4 (GA4) Events

#### Standard Events

```javascript
// Book Now Click Event
window.gtag('event', 'book_now_click', {
  event_category: 'Booking',
  event_label: trackingLabel,
  package_name: packageName,
  package_price: numericPrice,
  currency: 'EUR',
  button_id: id,
  page_location: window.location.href,
  page_title: document.title,
})
```

#### Enhanced Ecommerce Events

```javascript
// Begin Checkout Event
window.gtag('event', 'begin_checkout', {
  currency: 'EUR',
  value: numericPrice,
  items: [
    {
      item_id: id,
      item_name: packageName,
      item_category: 'Adventure Package',
      price: numericPrice,
      quantity: 1,
    },
  ],
})
```

### 2. Google Ads Conversion Tracking

```javascript
window.gtag('event', 'conversion', {
  send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Needs actual values
  value: numericPrice,
  currency: 'EUR',
  transaction_id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
})
```

### 3. Additional Tracking Platforms

#### Vercel Analytics

```javascript
window.va('track', 'Book Now Click', {
  package: packageName,
  price: numericPrice,
  button_id: id,
  label: trackingLabel,
})
```

#### Facebook Pixel

```javascript
window.fbq('track', 'InitiateCheckout', {
  content_name: packageName,
  content_category: 'Adventure Package',
  value: numericPrice,
  currency: 'EUR',
})
```

## Tracked Packages on Homepage

### Package 1 - Rafting Adventure

- **Tracking Label:** "Homepage Package 1"
- **Package Name:** "Package 1 - Rafting + Riding + Hiking"
- **Price:** €20 (Adults), €10 (Children under 12)
- **Bokun Widget ID:** `bokun_5b20d531_ca57_4550_94c0_0511c35077a0`
- **Data Source:**
  `https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020598?partialView=1`

### Package 2 - Kayaking Adventure

- **Tracking Label:** "Homepage Package 2"
- **Package Name:** "Package 2 - Kayak + Riding + Hiking"
- **Price:** €25 per person
- **Bokun Widget ID:** `bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53`
- **Data Source:**
  `https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020569?partialView=1`

## Implementation Details

### BookingButton Props

```typescript
interface BookingButtonProps {
  id: string
  dataSrc: string
  className?: string
  children: React.ReactNode
  trackingLabel?: string // For identifying which button was clicked
  packageName?: string // For enhanced ecommerce tracking
  packagePrice?: string // For conversion value tracking
}
```

### Tracking Function

The `trackBookingClick` function in BookingButton component:

- Extracts numeric price for conversion tracking
- Fires multiple tracking events based on user consent
- Includes comprehensive event data for analytics
- Generates unique transaction IDs for conversions

## GDPR Compliance Features

### Active Consent Management System

- **Analytics consent required** for all GA4, Google Ads, and Vercel Analytics events
- **Marketing consent required** for Facebook Pixel tracking
- **Real-time consent monitoring** with cookie-based state management
- **No tracking events fired** without proper user consent
- **Consent validation** on every tracking event through centralized helper
- **Cookie-based consent storage** with JSON format for granular permissions

### Data Privacy

- Transaction IDs are anonymized with timestamps and random strings
- No personally identifiable information tracked
- Respects user privacy preferences

## Files Modified/Created

### Core Tracking Files

- `/components/client/BookingButton.tsx` - Main tracking implementation
- `/components/client/GoogleAnalytics.tsx` - Standard Analytics initialization

### Homepage Implementation

- `/app/[locale]/page.tsx` - Package cards with tracking buttons

### Documentation

- `/docs/google-ads-tracking-setup.md` - Google Ads setup guide
- `/docs/book-now-tracking-implementation.md` - Booking tracking details

## Configuration Requirements

### Google Analytics 4

- ✅ GA4 property configured
- ✅ Enhanced ecommerce enabled
- ✅ Custom events configured

### Google Ads

- ✅ Conversion tracking code implemented
- ✅ Environment variable configuration system
- ⚠️ **Action Required:** Configure actual conversion ID and label in
  `.env.local`
- 📋 **Setup Guide:** See `/docs/google-ads-conversion-setup.md`

### Facebook Pixel

- ✅ Pixel integration implemented
- ✅ InitiateCheckout event configured

## Performance Considerations

### Lazy Loading

- All tracking scripts loaded conditionally based on consent
- No performance impact when consent is denied

### Error Handling

- Graceful fallbacks when tracking services unavailable
- Console logging for debugging purposes

## Testing & Validation

### Verified Working

- ✅ Package cards visible on homepage
- ✅ Booking buttons functional
- ✅ Translation keys properly configured
- ✅ GDPR consent system working
- ✅ Event firing based on consent status

### Testing Checklist

- [ ] Verify GA4 events in Google Analytics Real-Time reports
- [ ] Test conversion tracking in Google Ads
- [ ] Validate Facebook Pixel events in Events Manager
- [ ] Confirm GDPR compliance across different consent scenarios

## Troubleshooting Guide

### Common Issues

#### Package Cards Not Visible

- **Cause:** Missing translation keys (`bookNow`)
- **Solution:** Ensure `t.booking.bookNow` exists in both English and Greek
  translations
- **Status:** ✅ Fixed (May 28, 2025)

#### Google Ads Conversion Tracking Not Working

- **Check:** Environment variables are set in `.env.local`
- **Check:** Variables start with `NEXT_PUBLIC_` prefix
- **Check:** Development server restarted after env changes
- **Check:** Console for configuration warnings
- **Solution:** Follow setup guide in `/docs/google-ads-conversion-setup.md`

#### Tracking Events Not Firing

- **Check:** GDPR consent status
- **Check:** Console errors for tracking scripts
- **Check:** Network tab for blocked requests

#### Bokun Widget Integration

- **Verify:** Widget IDs match Bokun dashboard
- **Verify:** Data source URLs are accessible
- **Verify:** BokunStyles component loaded

## Future Enhancements

### Recommended Improvements

1. **Server-Side Tracking:** Implement GA4 Measurement Protocol for server-side
   events
2. **Enhanced Attribution:** Add UTM parameter tracking
3. **Custom Dimensions:** Add user journey tracking
4. **A/B Testing:** Implement conversion rate optimization testing
5. **Funnel Analysis:** Track complete booking funnel

### Analytics Expansion

- Add scroll tracking for engagement metrics
- Implement search functionality tracking
- Track video engagement on hero section
- Monitor page load performance metrics

## Contact & Maintenance

- Regular review of tracking implementation recommended
- Google Analytics 4 property should be monitored for data accuracy
- GDPR compliance should be audited annually
- Conversion tracking values should be validated monthly

---

**Note:** This documentation should be updated whenever tracking implementation
changes are made to maintain accuracy and context for future development work.
