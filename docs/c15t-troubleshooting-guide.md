# c15t Troubleshooting & Maintenance Guide

## Emergency Procedures

### Immediate Rollback (Zero Downtime)
If c15t system causes issues, execute immediate rollback:

```bash
# Set environment variable
NEXT_PUBLIC_ENABLE_C15T=false

# Redeploy or restart application
# No code changes required - system reverts to existing consent management
```

**Result**: Existing GoogleAnalytics.tsx and lib/analytics.ts resume full control
**Impact**: Zero user disruption, all analytics continue working
**Time**: < 5 minutes to rollback

---

## Diagnostic Commands

### System Health Check
```typescript
// Run in browser console for comprehensive system status
(function c15tHealthCheck() {
  console.group('🔍 c15t System Health Check');
  
  // 1. Feature flag status
  const c15tEnabled = typeof window !== 'undefined' && 
    process.env.NEXT_PUBLIC_ENABLE_C15T !== "false";
  console.log('✅ c15t Enabled:', c15tEnabled);
  
  // 2. Package availability
  try {
    const hasC15t = typeof window.c15t !== 'undefined' || 
      document.querySelector('[data-c15t]') !== null;
    console.log('📦 c15t Package Loaded:', hasC15t);
  } catch (e) {
    console.log('📦 c15t Package Loaded:', false);
  }
  
  // 3. Consent cookie status
  const consentCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('consent='));
  
  if (consentCookie) {
    try {
      const consent = JSON.parse(decodeURIComponent(consentCookie.split('=')[1]));
      console.log('🍪 Legacy Cookie Format Valid:', 
        typeof consent.analytics === 'boolean' && 
        typeof consent.marketing === 'boolean'
      );
      console.log('🍪 Current Consent State:', consent);
    } catch (e) {
      console.log('🍪 Legacy Cookie Format Valid:', false);
      console.error('Cookie parse error:', e);
    }
  } else {
    console.log('🍪 No Consent Cookie Found');
  }
  
  // 4. Analytics availability
  console.log('📊 Google Analytics Available:', typeof window.gtag === 'function');
  
  // 5. Storage events
  let storageEventFired = false;
  const testHandler = () => { storageEventFired = true; };
  window.addEventListener('storage', testHandler);
  window.dispatchEvent(new Event('storage'));
  setTimeout(() => {
    console.log('📡 Storage Events Working:', storageEventFired);
    window.removeEventListener('storage', testHandler);
  }, 100);
  
  console.groupEnd();
})();
```

### Network Connectivity Check
```typescript
// Check development network access
(function networkCheck() {
  console.group('🌐 Network Access Check');
  
  const currentHost = window.location.host;
  console.log('Current Host:', currentHost);
  
  // Check if accessing via network IP
  const isNetworkAccess = /^\d+\.\d+\.\d+\.\d+/.test(window.location.hostname);
  console.log('Network Access:', isNetworkAccess);
  
  if (isNetworkAccess) {
    console.log('✅ Accessing via network IP - allowedDevOrigins should be configured');
  } else {
    console.log('ℹ️ Accessing via localhost - no special configuration needed');
  }
  
  console.groupEnd();
})();
```

---

## Common Issues & Solutions

### Issue 1: Consent Banner Not Appearing

#### Symptoms
- No consent banner visible on first visit
- Page loads normally but no consent UI

#### Diagnostic Steps
```typescript
// Check feature flag
console.log('Feature flag:', process.env.NEXT_PUBLIC_ENABLE_C15T);

// Check for existing consent
const hasExistingConsent = document.cookie.includes('consent=');
console.log('Has existing consent:', hasExistingConsent);

// Check component mounting
const bannerElement = document.querySelector('.cookie-consent-banner');
console.log('Banner element found:', !!bannerElement);
```

#### Solutions
1. **Feature Flag Issue**:
   ```bash
   # Verify environment variable
   NEXT_PUBLIC_ENABLE_C15T=true
   ```

2. **Existing Consent Blocking Banner**:
   ```typescript
   // Clear consent for testing
   document.cookie = 'consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
   localStorage.removeItem('c15t-consent');
   location.reload();
   ```

3. **Component Not Mounting**:
   ```typescript
   // Check ClientLayout.tsx integration
   // Verify ConsentWrapper is rendering ConsentProvider
   // Check for JavaScript errors in console
   ```

### Issue 2: Analytics Not Loading After Consent

#### Symptoms
- User grants consent but Google Analytics doesn't load
- gtag function not available despite consent

#### Diagnostic Steps
```typescript
// Check consent state synchronization
import { checkConsentStatus } from '@/components/client/ConsentBridge';
const consentStatus = checkConsentStatus();
console.log('Consent status:', consentStatus);

// Check GoogleAnalytics.tsx state
// (Temporarily add logging to GoogleAnalytics.tsx)
console.log('GA component consent check:', hasConsent);

// Verify storage event firing
let eventCount = 0;
window.addEventListener('storage', () => {
  eventCount++;
  console.log('Storage event fired:', eventCount);
});
```

#### Solutions
1. **ConsentBridge Not Working**:
   ```typescript
   // Check ConsentBridge is mounted
   // Verify useConsentManager hook is working
   // Check for errors in ConsentBridge component
   ```

2. **Storage Event Not Firing**:
   ```typescript
   // Manually trigger storage event
   window.dispatchEvent(new Event('storage'));
   
   // Check if GoogleAnalytics.tsx receives it
   ```

3. **Cookie Format Mismatch**:
   ```typescript
   // Verify cookie format
   const cookie = document.cookie.split('; ').find(row => row.startsWith('consent='));
   const consent = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
   
   // Should be: { analytics: boolean, marketing: boolean }
   console.log('Cookie format correct:', 
     typeof consent.analytics === 'boolean' && 
     typeof consent.marketing === 'boolean'
   );
   ```

### Issue 3: Network Access Problems (Development)

#### Symptoms
- Cannot access dev server from mobile devices
- CORS errors when accessing from network IP
- Next.js warnings about cross-origin requests

#### Diagnostic Steps
```bash
# Check Next.js server output
pnpm dev
# Should show: Network: http://192.168.86.115:3000

# Test network connectivity
ping 192.168.86.115

# Check firewall (macOS)
sudo pfctl -sr | grep 3000

# Check firewall (Windows)
netsh advfirewall firewall show rule name="Node.js"
```

#### Solutions
1. **allowedDevOrigins Not Configured**:
   ```javascript
   // Verify next.config.js has allowedDevOrigins
   // Check it includes your network IP
   '192.168.86.115:3000',
   ```

2. **Firewall Blocking Access**:
   ```bash
   # macOS: Allow Node.js through firewall
   # Windows: Add firewall rule for Node.js
   # Router: Check if device isolation is enabled
   ```

3. **Wrong Network Configuration**:
   ```bash
   # Check IP address
   ifconfig | grep inet  # macOS/Linux
   ipconfig | findstr IPv4  # Windows
   
   # Update allowedDevOrigins with correct IP
   ```

### Issue 4: Styling Problems

#### Symptoms
- Consent banner doesn't match site design
- Banner appears unstyled or with default styling
- CSS variables not applied

#### Diagnostic Steps
```css
/* Check CSS variables in browser dev tools */
.cookie-consent-banner {
  /* These should be set: */
  --c15t-primary-color: #6b8362;
  --c15t-background-color: #ffffff;
  /* ... other variables */
}
```

#### Solutions
1. **CSS Variables Not Loaded**:
   ```css
   /* Verify in app/globals.css */
   .cookie-consent-banner {
     /* All CSS variables should be defined here */
   }
   ```

2. **Tailwind CSS Conflicts**:
   ```css
   /* Add !important to critical styles if needed */
   .c15t-banner {
     background-color: var(--c15t-background-color) !important;
   }
   ```

3. **Component Class Not Applied**:
   ```typescript
   // Verify CookieConsentBanner.tsx has className
   <CookieBanner className="cookie-consent-banner" />
   ```

---

## Performance Monitoring

### Bundle Size Monitoring
```bash
# Analyze bundle size impact
ANALYZE=true pnpm build

# Check for c15t in bundle analysis
# Look for @c15t/nextjs in vendors chunk
```

### Runtime Performance
```typescript
// Monitor consent operations performance
console.time('consent-check');
const consent = checkConsentStatus();
console.timeEnd('consent-check');

// Should be < 1ms for cookie operations
```

### Memory Usage
```typescript
// Check for memory leaks in consent components
// Monitor in Chrome DevTools > Memory tab
// Look for increasing heap size over time
```

---

## Maintenance Tasks

### Regular Health Checks
```typescript
// Weekly automated check (add to CI/CD)
describe('c15t System Health', () => {
  test('feature flag responds correctly', () => {
    // Test both enabled and disabled states
  });
  
  test('consent bridge maintains cookie format', () => {
    // Verify cookie structure
  });
  
  test('analytics integration works', () => {
    // Test consent → analytics flow
  });
});
```

### Dependency Updates
```bash
# Check for c15t updates
pnpm outdated @c15t/nextjs

# Update with caution - test thoroughly
pnpm update @c15t/nextjs

# Verify no breaking changes in consent flow
```

### Translation Updates
```typescript
// When adding new languages, update:
// 1. lib/translations/[locale].ts
// 2. ConsentProvider language handling
// 3. Privacy settings page routes
```

---

## Monitoring & Alerts

### Key Metrics to Monitor
1. **Consent Banner Appearance Rate**: Should be ~100% for new visitors
2. **Consent Grant Rate**: Monitor user acceptance patterns
3. **Analytics Loading Success**: Verify tracking continues working
4. **Error Rate**: Monitor console errors related to consent
5. **Page Load Performance**: Ensure no performance regression

### Alert Conditions
```typescript
// Set up monitoring for:
// 1. Consent banner not appearing (< 90% of new visitors)
// 2. Analytics tracking drops (> 10% decrease)
// 3. JavaScript errors containing 'c15t' or 'consent'
// 4. Page load time increase (> 200ms regression)
```

### Logging Strategy
```typescript
// Production logging (minimal)
if (process.env.NODE_ENV === 'production') {
  // Only log critical errors
  console.error('[c15t] Critical error:', error);
}

// Development logging (verbose)
if (process.env.NODE_ENV === 'development') {
  console.log('[c15t] Consent changed:', consent);
  console.log('[c15t] Cookie updated:', legacyConsent);
}
```

---

## Recovery Procedures

### Data Recovery
```typescript
// If consent data is lost, users can:
// 1. Visit /[locale]/privacy-settings to reset preferences
// 2. Clear all cookies and start fresh
// 3. Use browser settings to manage cookies manually

// No critical data loss possible - only preference settings
```

### System Recovery
```typescript
// If c15t system fails completely:
// 1. Set NEXT_PUBLIC_ENABLE_C15T=false (immediate rollback)
// 2. Existing GoogleAnalytics.tsx takes over
// 3. All analytics continue working normally
// 4. Users can still manage consent via existing mechanisms
```

### Gradual Re-enablement
```typescript
// After fixing issues:
// 1. Test in development with NEXT_PUBLIC_ENABLE_C15T=true
// 2. Deploy to staging environment
// 3. Verify consent flow works correctly
// 4. Monitor for 24 hours before full rollout
// 5. Gradually enable for production traffic
```

---

## Contact & Escalation

### Internal Escalation
1. **Level 1**: Check feature flag, clear cookies, verify basic functionality
2. **Level 2**: Review console errors, check component integration
3. **Level 3**: Analyze bundle, review c15t package compatibility
4. **Level 4**: Consider rollback to existing system

### External Resources
- **c15t Documentation**: https://c15t.com/docs
- **Next.js allowedDevOrigins**: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
- **GDPR Compliance**: Verify with legal team for regulatory requirements

### Emergency Contacts
- **Development Team**: For code-related issues
- **DevOps Team**: For deployment and environment variables
- **Legal Team**: For GDPR compliance questions
- **Analytics Team**: For tracking verification

This troubleshooting guide provides systematic approaches to identify, diagnose, and resolve issues with the c15t consent management system while maintaining system reliability and user experience.
