# Google Maps Integration Documentation

## Overview

This document details the comprehensive Google Maps integration implemented for the Pony Club website, including CSP-compliant implementation, GDPR consent requirements, custom controls, and TypeScript configurations.

**Last Updated:** January 2025  
**Status:** ✅ Production Ready  
**GDPR Compliance:** ✅ Implemented  
**CSP Compliance:** ✅ No Violations

## Architecture Overview

### Core Components

#### 1. Main Map Component
**Location:** `/components/google-map.tsx`
- CSP-compliant Google Maps implementation
- Custom zoom controls and directions button
- GDPR consent integration
- Error handling and loading states
- Accessibility features (ARIA labels, keyboard navigation)

#### 2. Dynamic Loading Component
**Location:** `/components/DynamicGoogleMap.tsx`
- Intersection Observer for performance optimization
- Lazy loading to improve page speed
- Fallback loading skeleton

#### 3. Script Loader Utility
**Location:** `/components/ui/script-loader.tsx`
- CSP-compliant script loading
- Proper nonce handling for security

## Business Configuration

### Location Details
```typescript
const BUSINESS_COORDINATES = { lat: 39.3257662, lng: 20.6069899 };
const BUSINESS_NAME = "Pony Club Acheron";
const DEFAULT_ZOOM = 16; // Enhanced zoom level for better detail
```

### Google Maps Configuration
```typescript
const mapInstance = new google.maps.Map(mapRef.current, {
  center: BUSINESS_COORDINATES,
  zoom: DEFAULT_ZOOM,
  mapTypeId: "roadmap",
  zoomControl: false, // Custom controls used instead
  mapTypeControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  gestureHandling: 'cooperative', // Better mobile experience
});
```

## Custom Features

### 1. Custom Zoom Controls
- **Location**: Top-right corner of map
- **Features**: 
  - Plus/minus buttons with hover effects
  - Keyboard navigation support (+ and - keys)
  - Accessibility labels and focus management
  - Smooth zoom transitions

### 2. Get Directions Button
- **Location**: Bottom-right corner of map
- **Functionality**: Opens Google Maps with directions to business
- **Features**:
  - Responsive design (text hidden on small screens)
  - Keyboard navigation (Ctrl/Cmd + D shortcut)
  - Proper ARIA labels for accessibility

### 3. Business Marker & Info Window
- **Custom Info Window**: Business name, activities, and directions button
- **CSP-Compliant**: No inline event handlers, proper DOM event listeners
- **Activities Listed**: Rafting, Horse Riding, Trekking

## GDPR Integration

### Consent Requirements
The map requires analytics consent to load, ensuring GDPR compliance:

```typescript
if (!consent?.analytics) {
  if (consent === null) {
    setError("Please accept analytics cookies in the banner below to view the interactive map.");
  } else {
    setError("Analytics cookies are required to display the interactive map.");
  }
  return;
}
```

### User Experience Flow
1. **First Visit**: Map shows consent requirement message
2. **GDPR Banner**: User sees consent banner at bottom of page
3. **Accept Analytics**: Map loads with full functionality
4. **Reject Analytics**: Map shows informative error message

## CSP (Content Security Policy) Implementation

### Script Sources Whitelist
```typescript
scriptSrc: [
  "'strict-dynamic'",
  "'unsafe-inline'", // Fallback for older browsers
  "https://maps.googleapis.com",
  "https://www.gstatic.com",
  "https://apis.google.com",
]
```

### Worker Sources
```typescript
workerSrc: [
  "'self'",
  "blob:",
  "https://maps.googleapis.com",
]
```

### Key CSP Compliance Features
- ✅ **No Inline Scripts**: All event handlers use proper DOM event listeners
- ✅ **Nonce-based Loading**: Scripts loaded with proper CSP nonces
- ✅ **Worker Support**: Blob URLs allowed for Google Maps workers
- ✅ **Strict Dynamic**: Modern CSP approach for script loading

## TypeScript Configuration

### Global Type Definitions
**Location:** `/types/global.d.ts`

```typescript
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date | 'update',
      config?: { /* comprehensive config types */ }
    ) => void;
  }
}
```

### Google Maps Types
- **Package**: `@types/google.maps@3.58.1`
- **Usage**: Provides complete TypeScript support for Google Maps API
- **Benefits**: Type safety, IntelliSense, compile-time error checking

## Performance Optimizations

### 1. Lazy Loading
- Map only loads when scrolled into view
- Intersection Observer API for efficient detection
- Loading skeleton during initialization

### 2. Script Loading Strategy
```typescript
<Script
  src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`}
  strategy="afterInteractive"
/>
```

### 3. Error Handling
- API key validation
- Network error recovery
- Graceful degradation for consent denial
- Retry mechanisms for failed loads

## Security Features

### 1. API Key Protection
- Environment variable storage (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
- Client-side validation
- Error handling for missing configuration

### 2. CSP Compliance
- No `eval()` or inline scripts
- Proper nonce handling
- Whitelist-based resource loading

### 3. GDPR Privacy Protection
- No tracking without explicit consent
- Clear consent messaging
- User control over data collection

## Testing & Verification

### Manual Testing Checklist
- [ ] Map loads after accepting analytics cookies
- [ ] Custom zoom controls function properly
- [ ] Get directions button opens Google Maps
- [ ] Keyboard navigation works
- [ ] Mobile responsiveness verified
- [ ] Error states display correctly
- [ ] GDPR consent flow works

### Browser Console Verification
Look for these success messages:
```
Google Maps API ready via callback
Google Maps initialized successfully
[GDPR] Consent applied: {analytics: true}
```

### CSP Violation Monitoring
- No CSP violations in browser console
- All scripts load with proper nonces
- No blocked resources in Network tab

## Troubleshooting Guide

### Common Issues

#### Map Not Loading
1. **Check API Key**: Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
2. **Check Consent**: Ensure analytics cookies are accepted
3. **Check Console**: Look for JavaScript errors or CSP violations
4. **Check Network**: Verify Google Maps API requests are successful

#### CSP Violations
1. **Check Middleware**: Verify CSP configuration in `middleware.ts`
2. **Check Nonces**: Ensure scripts load with proper nonces
3. **Check Domains**: Verify all required domains are whitelisted

#### TypeScript Errors
1. **Check Types**: Ensure `@types/google.maps` is installed
2. **Check Declarations**: Verify global types in `types/global.d.ts`
3. **Check Imports**: Ensure proper import statements

### Error Messages & Solutions

#### "Please accept analytics cookies..."
- **Cause**: User hasn't accepted analytics consent
- **Solution**: Accept cookies via GDPR banner

#### "API Key configuration is missing"
- **Cause**: Missing or invalid Google Maps API key
- **Solution**: Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local`

#### "Failed to load map"
- **Cause**: Network error or API quota exceeded
- **Solution**: Check network connection and Google Cloud Console

## Future Enhancements

### Potential Improvements
- [ ] **Multiple Markers**: Add markers for different activity locations
- [ ] **Route Planning**: Integrate directions API for activity routes
- [ ] **Street View**: Add street view integration for location preview
- [ ] **Clustering**: Implement marker clustering for multiple locations
- [ ] **Offline Support**: Add offline map capabilities
- [ ] **Custom Styling**: Implement custom map themes

### Performance Optimizations
- [ ] **Map Tiles Caching**: Implement tile caching for better performance
- [ ] **Progressive Loading**: Load map features progressively
- [ ] **WebP Images**: Use WebP format for custom markers

## Dependencies

### Required Packages
```json
{
  "@types/google.maps": "^3.58.1",
  "@nosecone/next": "^1.0.0",
  "next": "^15.3.2",
  "react": "^19.1.0"
}
```

### Environment Variables
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Google Cloud Console Setup
1. Enable Google Maps JavaScript API
2. Enable Places API (if using places features)
3. Configure API key restrictions
4. Set up billing account for production use

---

This Google Maps integration provides a secure, GDPR-compliant, and user-friendly mapping solution that enhances the Pony Club website's functionality while maintaining high security and privacy standards.
