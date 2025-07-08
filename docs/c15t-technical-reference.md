# c15t Technical Reference - Code Examples & API Documentation

## Quick Reference for AI Agents

### File Locations
```
components/client/ConsentProvider.tsx     # Main c15t wrapper
components/client/ConsentBridge.tsx       # Legacy compatibility bridge
components/client/CookieConsentBanner.tsx # UI banner component
app/[locale]/privacy-settings/            # Privacy management pages
lib/translations/[en|el].ts               # Consent translations
next.config.js                           # Network access configuration
```

### Environment Variables
```bash
NEXT_PUBLIC_ENABLE_C15T=true|false       # Feature flag for c15t system
```

---

## Component API Reference

### ConsentProvider
**File**: `components/client/ConsentProvider.tsx`
**Purpose**: Root consent management wrapper

```typescript
interface ConsentProviderProps {
  children: React.ReactNode;
}

// Usage in ClientLayout.tsx
const ConsentWrapper = ({ children }: { children: React.ReactNode }) => {
  if (isC15tEnabled) {
    return <ConsentProvider>{children}</ConsentProvider>;
  }
  return <>{children}</>;
};
```

**c15t Configuration Options**:
```typescript
<ConsentManagerProvider
  options={{
    mode: 'offline',                    // No backend required
    consentCategories: [                // Available consent types
      'necessary',                      // Always required
      'analytics',                      // Google Analytics, Vercel Analytics
      'marketing'                       // Google Ads, Facebook Pixel
    ],
    ignoreGeoLocation: true,            // Show banner regardless of location
  }}
>
```

### ConsentBridge
**File**: `components/client/ConsentBridge.tsx`
**Purpose**: Maintains backward compatibility with existing analytics system

```typescript
// Key hooks and functions
import { useConsentManager } from '@c15t/nextjs';

const { consent, isLoaded } = useConsentManager();

// Utility functions exported for other components
export function checkConsentStatus(): LegacyConsentStatus {
  // Returns: { analytics: boolean, marketing: boolean }
}

export function hasAnalyticsConsent(): boolean {
  // Compatible with existing lib/analytics.ts
}

export function hasMarketingConsent(): boolean {
  // New utility for marketing consent
}
```

**Legacy Cookie Format**:
```typescript
// Cookie name: "consent"
// Cookie value (URL-encoded JSON):
type LegacyConsentStatus = {
  analytics: boolean;
  marketing: boolean;
};

// Example cookie value:
// consent=%7B%22analytics%22%3Atrue%2C%22marketing%22%3Afalse%7D
// Decoded: {"analytics":true,"marketing":false}
```

### CookieConsentBanner
**File**: `components/client/CookieConsentBanner.tsx`
**Purpose**: Professional consent banner UI

```typescript
// Styling integration with design system
<CookieBanner
  className="cookie-consent-banner"
  style={{
    '--c15t-primary-color': '#6b8362',      // Pony Club green
    '--c15t-background-color': '#ffffff',
    '--c15t-text-color': '#333333',
    '--c15t-border-radius': '8px',
    '--c15t-box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '--c15t-border': '1px solid #e5e7eb',
    '--c15t-button-padding': '8px 16px',
    '--c15t-font-family': 'inherit',
    '--c15t-font-size': '14px',
    '--c15t-line-height': '1.5',
  } as React.CSSProperties}
/>
```

### PrivacySettingsClient
**File**: `app/[locale]/privacy-settings/PrivacySettingsClient.tsx`
**Purpose**: Manual consent management with fallback support

```typescript
interface PrivacySettingsClientProps {
  locale: string;  // 'en' | 'el'
}

// Dual mode operation:
if (isC15tEnabled) {
  // Use c15t dialog
  return <ConsentManagerDialog />;
} else {
  // Fallback manual controls
  return <ManualConsentControls />;
}
```

---

## Integration Patterns

### Existing Analytics Integration
**No changes required to existing files**:

```typescript
// GoogleAnalytics.tsx - continues working unchanged
const [hasConsent, setHasConsent] = useState(false);

useEffect(() => {
  const checkConsent = () => {
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("consent="));
    
    if (consentCookie) {
      const consent = JSON.parse(decodeURIComponent(consentCookie.split("=")[1]));
      setHasConsent(consent.analytics === true);
    }
  };
  // ... rest of existing logic unchanged
}, []);
```

```typescript
// lib/analytics.ts - continues working unchanged
function hasAnalyticsConsent(): boolean {
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

### Real-time Consent Updates
```typescript
// ConsentBridge triggers storage events for real-time updates
window.dispatchEvent(new Event('storage'));

// GoogleAnalytics.tsx listens for these events (existing code)
const handleStorageChange = () => checkConsent();
window.addEventListener("storage", handleStorageChange);
```

---

## Translation Schema

### Required Translation Keys
```typescript
// lib/translations/en.ts and lib/translations/el.ts
export const translations = {
  // ... existing translations
  consent: {
    banner: {
      title: string;                    // "Cookie Preferences"
      description: string;              // Banner description text
      acceptAll: string;                // "Accept All"
      rejectAll: string;                // "Reject All"
      settings: string;                 // "Customize Settings"
      learnMore: string;                // "Learn More"
    },
    categories: {
      necessary: {
        name: string;                   // "Necessary Cookies"
        description: string;            // Category description
      },
      analytics: {
        name: string;                   // "Analytics Cookies"
        description: string;            // Category description
      },
      marketing: {
        name: string;                   // "Marketing Cookies"
        description: string;            // Category description
      },
    },
    settings: {
      title: string;                    // "Cookie Settings"
      description: string;              // Settings page description
      save: string;                     // "Save Preferences"
      acceptAll: string;                // "Accept All"
      rejectAll: string;                // "Reject All"
      close: string;                    // "Close"
    },
    privacy: {
      title: string;                    // "Privacy Settings"
      description: string;              // Privacy page description
      privacyPolicy: string;            // "Privacy Policy"
      cookiePolicy: string;             // "Cookie Policy"
    },
  },
};
```

---

## Next.js Configuration

### allowedDevOrigins Setup
**File**: `next.config.js`

```javascript
const nextConfig = {
  // Development-only network access configuration
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: [
      // Specific IP for current setup
      '192.168.86.115:3000',
      
      // Private network ranges (regex patterns)
      /^192\.168\.\d{1,3}\.\d{1,3}:3000$/,    // Class C: 192.168.0.0/16
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}:3000$/,  // Class A: 10.0.0.0/8
      /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}:3000$/, // Class B: 172.16.0.0/12
      
      // Localhost variations
      'localhost:3000',
      '127.0.0.1:3000',
      '[::1]:3000',                           // IPv6 localhost
    ],
  }),
  // ... rest of existing configuration
};
```

**Network Range Explanations**:
- `192.168.x.x`: Most common home/office networks
- `10.x.x.x`: Large private networks, some VPNs
- `172.16-31.x.x`: Corporate networks, Docker networks
- Port restriction (`:3000`) ensures only dev server access

---

## Debugging Utilities

### Console Debugging Commands
```typescript
// Check feature flag status
console.log('c15t enabled:', process.env.NEXT_PUBLIC_ENABLE_C15T !== "false");

// Check current consent state
import { checkConsentStatus } from '@/components/client/ConsentBridge';
console.log('Current consent:', checkConsentStatus());

// Check c15t hook state (in component with useConsentManager)
const { consent, isLoaded } = useConsentManager();
console.log('c15t state:', { consent, isLoaded });

// Check legacy cookie format
const consentCookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('consent='));
if (consentCookie) {
  const consent = JSON.parse(decodeURIComponent(consentCookie.split('=')[1]));
  console.log('Legacy cookie:', consent);
}

// Check analytics availability
console.log('gtag available:', typeof window.gtag === 'function');

// Clear consent for testing
document.cookie = 'consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
localStorage.removeItem('c15t-consent'); // Clear c15t storage
```

### Development Testing Checklist
```typescript
// 1. Test feature flag toggle
// Set NEXT_PUBLIC_ENABLE_C15T=false, verify no banner
// Set NEXT_PUBLIC_ENABLE_C15T=true, verify banner appears

// 2. Test consent flow
// Clear all consent, refresh page
// Accept all, verify analytics load
// Reject all, verify analytics don't load
// Custom settings, verify partial consent works

// 3. Test backward compatibility
// Disable c15t, verify existing system works
// Enable c15t, verify existing analytics continue working

// 4. Test translations
// Switch language, verify banner text changes
// Check privacy settings page in both languages

// 5. Test network access (if applicable)
// Access from mobile device on same network
// Verify no CORS errors in console
```

---

## Error Handling Patterns

### ConsentBridge Error Handling
```typescript
// Robust error handling in consent operations
const updateLegacyCookie = (analytics: boolean, marketing: boolean) => {
  try {
    const legacyConsent = { analytics, marketing };
    const cookieValue = encodeURIComponent(JSON.stringify(legacyConsent));
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    document.cookie = `consent=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[ConsentBridge] Updated legacy cookie:', legacyConsent);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ConsentBridge] Error updating legacy cookie:', error);
    }
    // System continues to function even if cookie update fails
  }
};
```

### Graceful Degradation
```typescript
// If c15t fails, system falls back to existing consent management
const ConsentWrapper = ({ children }: { children: React.ReactNode }) => {
  try {
    if (isC15tEnabled) {
      return <ConsentProvider>{children}</ConsentProvider>;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ConsentWrapper] c15t failed, using fallback:', error);
    }
    // Fall back to no wrapper (existing system continues)
  }
  return <>{children}</>;
};
```

---

## Performance Considerations

### Bundle Size Impact
```typescript
// c15t is only loaded when feature flag is enabled
// Dynamic import pattern for future optimization:
const ConsentProvider = lazy(() => import('./ConsentProvider'));

// Current implementation loads c15t unconditionally when enabled
// Bundle size increase: ~50KB gzipped for @c15t/nextjs
```

### Runtime Performance
```typescript
// ConsentBridge is lightweight - no rendering, minimal state
// Storage events are efficient - only fired on actual consent changes
// Cookie operations are synchronous and fast
// No network requests in offline mode
```

### Caching Strategy
```typescript
// Consent state is cached in:
// 1. Browser cookie (legacy format) - 1 year expiry
// 2. localStorage (c15t format) - managed by c15t
// 3. Component state (React) - session only

// Cache invalidation triggers:
// - User changes consent preferences
// - Cookie expiry (1 year)
// - Manual clearing for testing
```

---

## Security Considerations

### Data Privacy
```typescript
// No personal data stored in consent cookies
// Only boolean consent flags stored
// No tracking before consent granted
// Consent choices are user-controlled and persistent
```

### Network Security
```typescript
// allowedDevOrigins only applies to development
// No production security impact
// Private network ranges only
// Port-specific restrictions
```

### GDPR Compliance
```typescript
// Explicit consent required for non-necessary cookies
// Granular consent categories (analytics, marketing)
// Easy consent withdrawal via privacy settings
// Clear consent descriptions in user's language
```

---

## Migration Guide for AI Agents

### From Legacy System to c15t
```typescript
// Step 1: Install package
// pnpm add @c15t/nextjs

// Step 2: Add feature flag
// NEXT_PUBLIC_ENABLE_C15T=false (initially)

// Step 3: Deploy with flag disabled
// Verify existing system continues working

// Step 4: Enable flag for testing
// NEXT_PUBLIC_ENABLE_C15T=true

// Step 5: Test consent flow
// Verify banner appears, consent syncs, analytics work

// Step 6: Production rollout
// Monitor analytics, verify no regressions
```

### Rollback Procedure
```typescript
// Immediate rollback (no code changes needed):
// Set NEXT_PUBLIC_ENABLE_C15T=false

// This reverts to existing proven consent system
// All analytics continue working unchanged
// No user impact or data loss
```

This technical reference provides the detailed implementation knowledge needed for AI agents to understand, maintain, and extend the c15t consent management system while preserving the existing analytics infrastructure.
