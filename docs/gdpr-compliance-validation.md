# GDPR Compliance Validation Guide

## Overview

This document provides comprehensive testing procedures to validate GDPR compliance and Google Consent Mode v2 functionality for the Pony Club website.

## Prerequisites

1. **Development Environment**: Run `pnpm dev` on port 3000
2. **Production Testing**: Run `pnpm build && pnpm start` on port 3000
3. **Browser DevTools**: Chrome/Firefox Developer Tools open
4. **Clear State**: Clear all cookies, localStorage, and sessionStorage before each test

## Test Scenarios

### 1. Initial State Verification (No Consent)

**Objective**: Verify that no tracking occurs before user consent.

**Steps**:
1. Clear all browser data (cookies, localStorage, sessionStorage)
2. Visit `http://localhost:3000`
3. **DO NOT** interact with the consent banner

**Expected Results**:
- ✅ Consent banner appears
- ✅ No tracking cookies in DevTools > Application > Cookies
- ✅ No requests to tracking domains in Network tab
- ✅ Console shows: `gtag('consent', 'default', {...})` with all denied except security_storage
- ✅ Console shows: `[ConsentInitializer] Default consent state set to denied`

**Validation Commands**:
```javascript
// In browser console
console.log('Cookies:', document.cookie);
console.log('LocalStorage:', localStorage);
console.log('SessionStorage:', sessionStorage);
```

### 2. "Accept All" Flow Validation

**Objective**: Verify that all tracking starts immediately after accepting all cookies.

**Steps**:
1. Clear all browser data
2. Visit `http://localhost:3000`
3. Click "Accept All" on the consent banner
4. Wait 5 seconds for scripts to load

**Expected Results**:
- ✅ Consent banner disappears
- ✅ Tracking cookies appear immediately (_ga, _ga_*, _gid, etc.)
- ✅ Tracking requests visible in Network tab (googletagmanager.com, vercel-scripts.com)
- ✅ Console shows: `gtag('consent', 'update', {...})` with granted permissions
- ✅ Console shows: `[ConsentBridge] Updated Google Consent Mode v2`
- ✅ Banner doesn't reappear on page reload

**Validation Commands**:
```javascript
// Check consent state
const consentCookie = document.cookie.split('; ').find(row => row.startsWith('consent='));
if (consentCookie) {
  console.log('Consent:', JSON.parse(decodeURIComponent(consentCookie.split('=')[1])));
}

// Check Google Analytics
console.log('GA Loaded:', typeof gtag === 'function');
console.log('DataLayer:', window.dataLayer);
```

### 3. "Reject All" Flow Validation

**Objective**: Verify that no tracking occurs when rejecting all cookies.

**Steps**:
1. Clear all browser data
2. Visit `http://localhost:3000`
3. Click "Reject All" or "Manage Preferences" → Disable all → Save

**Expected Results**:
- ✅ No tracking cookies set
- ✅ No tracking scripts loaded
- ✅ Consent state remains denied in console
- ✅ Banner doesn't reappear on reload
- ✅ Console shows: `gtag('consent', 'update', {...})` with all denied

### 4. Custom Selection Validation

**Objective**: Verify granular consent controls work correctly.

**Steps**:
1. Clear all browser data
2. Visit `http://localhost:3000`
3. Click "Manage Preferences" or settings
4. Enable only "Analytics" (disable Marketing)
5. Save preferences

**Expected Results**:
- ✅ Only analytics cookies (_ga, _ga_*) are set
- ✅ Only analytics scripts load (Google Analytics, Vercel Analytics)
- ✅ Marketing scripts remain blocked (no Facebook Pixel)
- ✅ Console shows mixed consent state: analytics=granted, marketing=denied

### 5. Consent Revocation Testing

**Objective**: Verify that revoking consent cleans up tracking data.

**Steps**:
1. Start with "Accept All" consent
2. Verify tracking cookies are present
3. Open consent settings and revoke analytics consent
4. Save changes

**Expected Results**:
- ✅ Analytics cookies are removed from browser
- ✅ Analytics scripts stop loading on new pages
- ✅ Marketing scripts continue if still granted
- ✅ Console shows: `[ConsentBridge] Cleaned up cookies for revoked analytics consent`
- ✅ Google Consent Mode updated: `analytics_storage: 'denied'`

**Validation Commands**:
```javascript
// Before revocation
console.log('Before:', document.cookie.includes('_ga'));

// After revocation (should be false)
console.log('After:', document.cookie.includes('_ga'));
```

### 6. Cross-Page Persistence Testing

**Objective**: Verify consent choices persist across navigation.

**Steps**:
1. Set specific consent preferences (e.g., analytics=true, marketing=false)
2. Navigate to different pages: `/en/rafting`, `/en/packages`, `/el`
3. Refresh pages multiple times

**Expected Results**:
- ✅ Consent banner doesn't reappear
- ✅ Same tracking behavior on all pages
- ✅ Consent cookie persists across navigation
- ✅ Same scripts load/don't load consistently

## Technical Validation

### Google Consent Mode v2 Verification

**Check Default State**:
```javascript
// Should show in console on page load
// gtag('consent', 'default', {
//   'analytics_storage': 'denied',
//   'ad_storage': 'denied',
//   'ad_user_data': 'denied',
//   'ad_personalization': 'denied',
//   'functionality_storage': 'denied',
//   'personalization_storage': 'denied',
//   'security_storage': 'granted'
// });
```

**Check Update State** (after consent given):
```javascript
// Should show in console after consent
// gtag('consent', 'update', {
//   'analytics_storage': 'granted',
//   'ad_storage': 'granted', // if marketing consent given
//   // ... etc
// });
```

### Cookie Validation

**Analytics Cookies** (when analytics consent granted):
- `_ga` - Google Analytics client ID
- `_ga_*` - Google Analytics session data
- `_gid` - Google Analytics session ID
- `consent` - Our legacy consent cookie

**Marketing Cookies** (when marketing consent granted):
- `_fbp` - Facebook Pixel browser ID
- `_fbc` - Facebook Pixel click ID

### Network Request Validation

**Analytics Requests** (when analytics consent granted):
- `https://www.googletagmanager.com/gtag/js`
- `https://www.google-analytics.com/g/collect`
- `https://va.vercel-scripts.com/v1/script.debug.js`

**Marketing Requests** (when marketing consent granted):
- `https://connect.facebook.net/en_US/fbevents.js`

## Troubleshooting

### Common Issues

1. **Scripts loading without consent**:
   - Check ConsentGate wrapper in layout
   - Verify ConsentInitializer loads first
   - Check console for consent state

2. **Consent not persisting**:
   - Check cookie expiration (should be 1 year)
   - Verify cookie domain settings
   - Check for JavaScript errors

3. **Google Consent Mode not working**:
   - Verify ConsentInitializer runs before GA scripts
   - Check gtag function availability
   - Verify consent mapping in ConsentBridge

### Debug Commands

```javascript
// Check c15t consent state
window.c15t?.getConsent?.();

// Check legacy consent cookie
const consent = document.cookie.split('; ').find(row => row.startsWith('consent='));
console.log('Legacy consent:', consent ? JSON.parse(decodeURIComponent(consent.split('=')[1])) : 'None');

// Check Google Analytics
console.log('GA available:', typeof gtag === 'function');
console.log('DataLayer:', window.dataLayer);

// Check Vercel Analytics
console.log('Vercel Analytics:', typeof window.va === 'function');
```

## Compliance Checklist

- [ ] Default consent state denies all tracking
- [ ] Consent banner appears on first visit
- [ ] "Accept All" enables all tracking immediately
- [ ] "Reject All" prevents all tracking
- [ ] Granular consent controls work correctly
- [ ] Consent revocation cleans up cookies
- [ ] Consent persists across pages and sessions
- [ ] Google Consent Mode v2 signals are sent correctly
- [ ] No tracking requests before consent
- [ ] All tracking scripts respect consent state

## Performance Impact

After implementation, verify:
- [ ] Page load times remain acceptable
- [ ] Core Web Vitals scores maintained
- [ ] No JavaScript errors in console
- [ ] Consent banner loads quickly
- [ ] Script loading doesn't block page rendering
