# Troubleshooting Guide

## Overview

This comprehensive troubleshooting guide covers common issues related to Google Maps integration, CSP violations, GDPR compliance, TypeScript errors, and build system problems.

**Last Updated:** January 2025  
**Scope:** Production-Ready Solutions  
**Coverage:** All Major Integrations

## Google Maps Issues

### Map Not Loading

#### Symptom: Map container shows loading state indefinitely

**Possible Causes & Solutions:**

1. **Missing API Key**

   ```bash
   # Check environment variable
   echo $NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

   # Solution: Add to .env.local
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

2. **GDPR Consent Not Granted**

   ```typescript
   // Check consent status in browser console
   console.log('Consent:', consent)

   // Expected: { necessary: true, analytics: true, marketing: boolean }
   // If analytics: false, map won't load (by design)
   ```

3. **CSP Blocking Scripts**

   ```javascript
   // Check browser console for CSP violations
   // Look for: "Refused to load script from 'https://maps.googleapis.com'"

   // Solution: Verify middleware.ts includes:
   scriptSrc: ['https://maps.googleapis.com', 'https://www.gstatic.com']
   ```

#### Symptom: Map shows error message

**Error Messages & Solutions:**

- **"Please accept analytics cookies..."**

  - **Cause**: User hasn't accepted analytics consent
  - **Solution**: Accept cookies via GDPR banner

- **"API Key configuration is missing"**

  - **Cause**: Missing or invalid Google Maps API key
  - **Solution**: Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local`

- **"Failed to load map"**
  - **Cause**: Network error or API quota exceeded
  - **Solution**: Check network connection and Google Cloud Console

### Custom Controls Not Working

#### Symptom: Zoom buttons or directions button not visible

**Debugging Steps:**

1. **Check Component State**

   ```typescript
   // Add debugging to GoogleMap component
   console.log('Map state:', { isLoading, hasMap: !!map, hasError: !!error })
   ```

2. **Verify CSS Classes**

   ```css
   /* Ensure controls aren't hidden by CSS */
   .absolute.top-4.right-4 {
     z-index: 10;
   }
   .absolute.bottom-4.right-4 {
     z-index: 10;
   }
   ```

3. **Check Event Handlers**
   ```typescript
   // Verify click handlers are attached
   const handleZoomIn = useCallback(() => {
     console.log('Zoom in clicked')
     if (map) map.setZoom((map.getZoom() || 16) + 1)
   }, [map])
   ```

## CSP (Content Security Policy) Issues

### Script Blocked by CSP

#### Symptom: Console shows "Refused to execute inline script"

**Debugging Process:**

1. **Identify Violation Source**

   ```javascript
   // Browser console will show specific violation
   // Example: "Refused to execute inline script because it violates CSP directive 'script-src'"
   ```

2. **Check CSP Configuration**

   ```typescript
   // Verify in middleware.ts
   scriptSrc: [
     "'strict-dynamic'",
     "'unsafe-inline'", // Fallback for older browsers
     'https://domain-causing-issue.com',
   ]
   ```

3. **Fix Inline Scripts**

   ```typescript
   // WRONG: Inline event handler
   <button onclick="doSomething()">Click</button>

   // CORRECT: Event listener
   const button = document.createElement('button');
   button.addEventListener('click', doSomething);
   ```

### Worker Creation Blocked

#### Symptom: "Refused to create a worker from 'blob:'"

**Solution:**

```typescript
// Add to middleware.ts
workerSrc: [
  "'self'",
  'blob:', // Required for Google Maps and other widgets
  'https://widgets.bokun.io',
]
```

### Style Loading Issues

#### Symptom: Styles not loading from third-party domains

**Solution:**

```typescript
// Add domains to styleSrc in middleware.ts
styleSrc: ["'unsafe-inline'", 'https://fonts.googleapis.com', 'https://widgets.bokun.io']
```

## GDPR Compliance Issues

### Consent Banner Not Showing

#### Symptom: No GDPR banner appears on first visit

**Debugging Steps:**

1. **Check Local Storage**

   ```javascript
   // Clear existing consent to test banner
   localStorage.removeItem('ponyclub-cookie-consent')
   // Refresh page - banner should appear
   ```

2. **Verify Component Rendering**

   ```typescript
   // Check GDPRBanner component in browser dev tools
   // Should be present in DOM when showBanner is true
   ```

3. **Check Context Provider**
   ```typescript
   // Ensure GDPRProvider wraps the app in ClientLayout.tsx
   <GDPRProvider>
     <ThemeProvider>
       {children}
     </ThemeProvider>
     <GDPRBanner />
   </GDPRProvider>
   ```

### Tracking Not Working After Consent

#### Symptom: Analytics events not firing despite consent

**Debugging Process:**

1. **Verify Consent Application**

   ```javascript
   // Check browser console for:
   console.log('[GDPR] Consent applied:', consent)
   ```

2. **Check gtag Initialization**

   ```javascript
   // Verify gtag is available
   console.log('gtag available:', typeof window.gtag)
   ```

3. **Test Event Firing**
   ```javascript
   // Manual test in browser console
   window.gtag('event', 'test_event', { test: true })
   ```

## TypeScript Build Errors

### Common Compilation Errors

#### Error: "Property 'dataLayer' does not exist on type 'Window'"

**Solution:**

```typescript
// Ensure types/global.d.ts includes:
declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}
export {}
```

#### Error: "Cannot find namespace 'google'"

**Solution:**

```bash
# Install Google Maps types
pnpm add -D @types/google.maps

# Verify in package.json devDependencies
"@types/google.maps": "^3.58.1"
```

#### Error: "All declarations of 'X' must have identical modifiers"

**Solution:**

```typescript
// Remove duplicate declarations from component files
// Keep only one declaration in types/global.d.ts
// Use optional properties: property?: type
```

### Build Process Issues

#### Symptom: Build fails with TypeScript errors

**Debugging Steps:**

1. **Check TypeScript Version**

   ```bash
   npx tsc --version
   # Should match version in package.json
   ```

2. **Clean Build Cache**

   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   pnpm build
   ```

3. **Type Check Only**
   ```bash
   npx tsc --noEmit
   # Shows TypeScript errors without building
   ```

## Environment & Configuration Issues

### Environment Variables Not Loading

#### Symptom: API keys or configuration missing

**Debugging Steps:**

1. **Check File Location**

   ```bash
   # .env.local should be in project root
   ls -la .env.local
   ```

2. **Verify Variable Names**

   ```bash
   # Client-side variables must start with NEXT_PUBLIC_
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
   ```

3. **Restart Development Server**
   ```bash
   # Environment changes require restart
   pnpm dev
   ```

### Build vs Development Differences

#### Symptom: Works in development but fails in production

**Common Causes:**

1. **Environment Variables**

   ```bash
   # Check production environment has all required variables
   # Vercel: Add in dashboard settings
   # Other hosts: Configure according to platform
   ```

2. **CSP Differences**

   ```typescript
   // Check if development-only CSP rules are needed
   const devScriptSources = isDev ? ["'unsafe-eval'"] : []
   ```

3. **Static Generation Issues**
   ```typescript
   // Ensure dynamic content is properly handled
   // Check for client-side only code in SSR context
   ```

## Performance Issues

### Slow Map Loading

#### Symptom: Map takes long time to initialize

**Optimization Steps:**

1. **Lazy Loading**

   ```typescript
   // Ensure DynamicGoogleMap uses intersection observer
   // Map should only load when scrolled into view
   ```

2. **Script Loading Strategy**

   ```typescript
   // Use afterInteractive strategy
   <Script strategy="afterInteractive" />
   ```

3. **API Key Restrictions**
   ```bash
   # Check Google Cloud Console for API restrictions
   # Ensure key is properly configured for domain
   ```

### Large Bundle Size

#### Symptom: Slow page loads due to large JavaScript bundles

**Analysis & Solutions:**

1. **Bundle Analysis**

   ```bash
   pnpm analyze
   # Opens webpack bundle analyzer
   ```

2. **Dynamic Imports**
   ```typescript
   // Use dynamic imports for large components
   const GoogleMap = dynamic(() => import('./GoogleMap'), {
     loading: () => <LoadingSkeleton />
   });
   ```

## Testing Procedures

### Manual Testing Checklist

#### Google Maps Integration

- [ ] Map loads after accepting analytics cookies
- [ ] Custom zoom controls work (+ and - buttons)
- [ ] Get directions button opens Google Maps
- [ ] Keyboard navigation functions (+ and - keys)
- [ ] Mobile responsiveness verified
- [ ] Error states display correctly for consent denial

#### GDPR Compliance

- [ ] Banner appears on first visit
- [ ] Accept All enables all tracking
- [ ] Reject All disables non-essential tracking
- [ ] Customize modal works properly
- [ ] Consent persists across page loads
- [ ] Translations work in both languages

#### CSP Security

- [ ] No CSP violations in browser console
- [ ] All scripts load with proper nonces
- [ ] No blocked resources in Network tab
- [ ] Security headers present in response

### Automated Testing

#### Build Verification

```bash
# Full build test
pnpm audit --audit-level moderate
pnpm build
pnpm start

# Type checking
npx tsc --noEmit

# Linting
pnpm lint
```

#### Security Testing

```bash
# Check security headers
curl -I https://your-domain.com

# CSP validation
# Use online tools like CSP Evaluator
```

## Emergency Fixes

### Quick CSP Bypass (Development Only)

```typescript
// TEMPORARY: Add to middleware.ts for debugging
scriptSrc: ["'unsafe-inline'", "'unsafe-eval'"]
// REMOVE before production deployment
```

### Disable GDPR for Testing

```typescript
// TEMPORARY: Force consent for testing
const mockConsent = { necessary: true, analytics: true, marketing: true }
// REMOVE before production deployment
```

### Skip TypeScript Errors

```bash
# TEMPORARY: Build without type checking
SKIP_TYPE_CHECK=true pnpm build
# FIX TypeScript errors before production
```

## Getting Help

### Debug Information to Collect

When reporting issues, include:

1. **Browser Console Output**

   - JavaScript errors
   - CSP violations
   - Network failures

2. **Environment Details**

   - Node.js version
   - Package manager version
   - Operating system

3. **Configuration Files**

   - middleware.ts (CSP configuration)
   - tsconfig.json (TypeScript settings)
   - .env.local (sanitized, no secrets)

4. **Reproduction Steps**
   - Exact steps to reproduce issue
   - Expected vs actual behavior
   - Screenshots if applicable

### Useful Commands for Debugging

```bash
# Check all environment variables
printenv | grep NEXT_PUBLIC

# Verify package versions
pnpm list

# Check for security vulnerabilities
pnpm audit

# Analyze bundle size
pnpm analyze

# Type check without building
npx tsc --noEmit --watch
```

---

This troubleshooting guide covers the most common issues encountered during development and deployment. Keep it updated as new issues are discovered and resolved.
