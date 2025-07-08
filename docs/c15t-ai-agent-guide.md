# c15t Cookie Consent Management - AI Agent Guide

## Table of Contents
1. [System Overview](#system-overview)
2. [Implementation Status](#implementation-status)
3. [Architecture Documentation](#architecture-documentation)
4. [Configuration Guide](#configuration-guide)
5. [Integration Points](#integration-points)
6. [Feature Flags](#feature-flags)
7. [Testing & Validation](#testing--validation)
8. [Deployment Strategy](#deployment-strategy)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Maintenance & Future Development](#maintenance--future-development)

---

## System Overview

### Purpose
The c15t cookie consent management system provides a professional, GDPR-compliant consent banner for the Pony Club website while maintaining 100% backward compatibility with the existing analytics infrastructure.

### Key Implementation Principles
- **Offline Mode**: Uses `@c15t/nextjs` in offline mode (no backend required)
- **Backward Compatibility**: Bridges c15t consent state to existing JSON cookie format
- **Feature Flag Approach**: Gradual rollout with `NEXT_PUBLIC_ENABLE_C15T` environment variable
- **Zero Breaking Changes**: Existing `GoogleAnalytics.tsx` and `lib/analytics.ts` continue working unchanged

### Package Dependencies
```json
{
  "@c15t/nextjs": "1.4.2"
}
```

---

## Implementation Status

**Status:** ✅ Implemented and Ready for Testing  
**Date:** January 8, 2025  
**Compatibility:** Maintains full backward compatibility with existing analytics system

### Core Features Implemented
- ✅ Professional consent banner with Pony Club vintage design
- ✅ Bilingual support (English/Greek)
- ✅ Backward compatibility bridge to existing analytics system
- ✅ Privacy settings page with manual controls
- ✅ Feature flag support for gradual rollout
- ✅ Real-time consent synchronization
- ✅ GDPR compliance

---

## Architecture Documentation

### File Structure
```
components/client/
├── ConsentProvider.tsx          # Main c15t wrapper component
├── ConsentBridge.tsx           # Bridges c15t to legacy cookie format
├── CookieConsentBanner.tsx     # Professional consent banner UI
└── GoogleAnalytics.tsx         # Existing analytics (unchanged)

app/[locale]/privacy-settings/
├── page.tsx                    # Privacy settings page
└── PrivacySettingsClient.tsx   # Client-side privacy controls

lib/
├── analytics.ts                # Existing analytics helper (unchanged)
├── c15t-config.ts             # c15t configuration
└── translations/
    ├── en.ts                   # English consent translations
    └── el.ts                   # Greek consent translations
```

### Component Hierarchy & Integration Points
```
ClientLayout (components/ClientLayout.tsx) - CRITICAL INTEGRATION POINT
├── ConsentWrapper (conditional via NEXT_PUBLIC_ENABLE_C15T)
│   └── ConsentProvider (wraps entire app when enabled)
│       ├── ConsentBridge (invisible bridge component)
│       └── ThemeProvider
│           ├── LanguageProvider
│           │   └── PageLayout
│           │       └── {children}
│           └── CookieConsentBanner (renders at app level when enabled)
└── BokunInitializer (hidden widget container)
```

**CRITICAL**: The c15t system is integrated in `components/ClientLayout.tsx` with these key elements:
- Feature flag check: `const isC15tEnabled = process.env.NEXT_PUBLIC_ENABLE_C15T !== "false"`
- Conditional wrapper: `ConsentWrapper` component that conditionally wraps children
- Banner placement: `{isC15tEnabled && <CookieConsentBanner />}` renders at app level

### Core Components

#### 1. ConsentProvider (`components/client/ConsentProvider.tsx`)
**Purpose**: Wraps the c15t ConsentManagerProvider with offline configuration

**Key Implementation**:
```typescript
import { ConsentManagerProvider } from '@c15t/nextjs';

export default function ConsentProvider({ children }: ConsentProviderProps) {
  return (
    <ConsentManagerProvider
      options={{
        mode: 'offline', // No backend required
        consentCategories: ['necessary', 'analytics', 'marketing'],
        ignoreGeoLocation: true,
      }}
    >
      <ConsentBridge />
      {children}
    </ConsentManagerProvider>
  );
}
```

#### 2. ConsentBridge (`components/client/ConsentBridge.tsx`)
**Purpose**: Critical component that maintains backward compatibility

**Key Functionality**:
- Monitors c15t consent changes via `useConsentManager()` hook
- Updates legacy cookie format: `{"analytics": boolean, "marketing": boolean}`
- Triggers storage events for real-time consent monitoring
- Provides utility functions for consent checking

**Critical Implementation**:
```typescript
import { useConsentManager } from '@c15t/nextjs';

export default function ConsentBridge() {
  const { consent, isLoaded } = useConsentManager();

  useEffect(() => {
    if (!isLoaded || !consent) return;

    const analyticsConsent = consent.categories?.analytics?.granted || false;
    const marketingConsent = consent.categories?.marketing?.granted || false;

    // Update legacy cookie format
    updateLegacyCookie(analyticsConsent, marketingConsent);
    
    // Trigger storage event for GoogleAnalytics.tsx
    window.dispatchEvent(new Event('storage'));
  }, [consent, isLoaded]);

  return null; // Invisible bridge component
}
```

#### 3. CookieConsentBanner (`components/client/CookieConsentBanner.tsx`)
**Purpose**: Professional consent banner UI with Pony Club vintage design

**Styling Integration**:
```typescript
style={{
  '--c15t-primary-color': '#6b8362',
  '--c15t-background-color': '#ffffff',
  // ... other design tokens
}}
```

### Data Flow Architecture
```
User Interaction
    ↓
c15t ConsentManagerProvider
    ↓
ConsentBridge (monitors consent changes)
    ↓
Legacy Cookie Update ({"analytics": boolean, "marketing": boolean})
    ↓
Storage Event Dispatch
    ↓
GoogleAnalytics.tsx (existing component, unchanged)
    ↓
lib/analytics.ts (existing helper, unchanged)
    ↓
Google Analytics/Ads Loading
```

### Critical Integration Points

#### ClientLayout.tsx Integration (MOST IMPORTANT)
The c15t system is integrated in `components/ClientLayout.tsx` - this is the **single most critical file** for c15t functionality:

```typescript
// File: components/ClientLayout.tsx

// 1. Feature flag check
const isC15tEnabled = process.env.NEXT_PUBLIC_ENABLE_C15T !== "false";

// 2. Conditional wrapper component
const ConsentWrapper = ({ children }: { children: React.ReactNode }) => {
  if (isC15tEnabled) {
    return <ConsentProvider>{children}</ConsentProvider>;
  }
  return <>{children}</>;
};

// 3. Main render with banner placement
return (
  <ConsentWrapper>
    <ThemeProvider>
      <LanguageProvider>
        <PageLayout>{children}</PageLayout>
        {/* Banner renders at app level when enabled */}
        {isC15tEnabled && <CookieConsentBanner />}
      </LanguageProvider>
    </ThemeProvider>
  </ConsentWrapper>
);
```

**CRITICAL**: If the banner is not appearing, check this file first. The components are often commented out during development due to TypeScript issues, but they should be enabled in production.

#### Environment Configuration
```bash
# .env.local
NEXT_PUBLIC_ENABLE_C15T=true  # Must be "true" (string) to enable
```

#### Package Dependencies
```json
{
  "@c15t/nextjs": "^1.4.3"
}
Analytics Services (GA4, Google Ads, etc.)
```

---

## Configuration Guide

### c15t Configuration (`lib/c15t-config.ts`)
- Offline mode configuration (no backend required)
- Consent categories: `necessary`, `analytics`, `marketing`
- Service integrations for Google Analytics, Google Ads, Vercel Analytics, Facebook Pixel
- Bilingual support (English/Greek)
- Custom styling configuration

### Next.js Development Configuration

#### allowedDevOrigins Configuration
**File**: `next.config.js`
**Purpose**: Enables cross-origin requests from local network devices

```javascript
const nextConfig = {
  // Development-only network access configuration
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: [
      '192.168.86.115:3000',
      /^192\.168\.\d{1,3}\.\d{1,3}:3000$/,
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}:3000$/,
      /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}:3000$/,
      'localhost:3000',
      '127.0.0.1:3000',
      '[::1]:3000',
    ],
  }),
};
```

---

## Integration Points

### Backward Compatibility Bridge

#### Legacy Cookie Format
The system maintains the existing cookie format used by `GoogleAnalytics.tsx` and `lib/analytics.ts`:

```typescript
// Cookie name: "consent"
// Cookie value (URL-encoded JSON):
{
  "analytics": boolean,
  "marketing": boolean
}
```

#### Existing Analytics System Integration
- ✅ `GoogleAnalytics.tsx` continues working unchanged
- ✅ `lib/analytics.ts` consent checking functions preserved
- ✅ JSON cookie format maintained
- ✅ Real-time consent monitoring preserved

#### Consent State Synchronization
**c15t → Legacy Cookie Flow**:
```typescript
// In ConsentBridge.tsx
const analyticsConsent = consent.categories?.analytics?.granted || false;
const marketingConsent = consent.categories?.marketing?.granted || false;

const legacyConsent = { analytics: analyticsConsent, marketing: marketingConsent };
const cookieValue = encodeURIComponent(JSON.stringify(legacyConsent));
document.cookie = `consent=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

// Trigger storage event for real-time updates
window.dispatchEvent(new Event('storage'));
```

### Layout Integration (`components/ClientLayout.tsx`)
- Feature flag support (`NEXT_PUBLIC_ENABLE_C15T`)
- Conditional rendering of c15t components
- Maintains existing layout structure

### Translation Integration

#### Bilingual Support
**Files**: `lib/translations/en.ts`, `lib/translations/el.ts`

**New Translation Keys Added**:
```typescript
consent: {
  banner: {
    title: string,
    description: string,
    acceptAll: string,
    rejectAll: string,
    settings: string,
    learnMore: string,
  },
  categories: {
    necessary: { name: string, description: string },
    analytics: { name: string, description: string },
    marketing: { name: string, description: string },
  },
  settings: {
    title: string,
    description: string,
    save: string,
    acceptAll: string,
    rejectAll: string,
    close: string,
  },
  privacy: {
    title: string,
    description: string,
    privacyPolicy: string,
    cookiePolicy: string,
  },
}
```

---

## Feature Flags

### Environment Variables

#### NEXT_PUBLIC_ENABLE_C15T
**Purpose**: Controls c15t system activation for gradual rollout

```bash
# Enable c15t consent system
NEXT_PUBLIC_ENABLE_C15T=true

# Disable c15t (use existing system only)
NEXT_PUBLIC_ENABLE_C15T=false
```

**Implementation in ClientLayout.tsx**:
```typescript
export default function ClientLayout({ children, initialLocale }: ClientLayoutProps) {
  const isC15tEnabled = process.env.NEXT_PUBLIC_ENABLE_C15T !== "false";

  const ConsentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isC15tEnabled) {
      return <ConsentProvider>{children}</ConsentProvider>;
    }
    return <>{children}</>;
  };

  return (
    <LanguageProvider initialLang={initialLocale}>
      <ConsentWrapper>
        {/* ... rest of layout */}
        {isC15tEnabled && <CookieConsentBanner />}
      </ConsentWrapper>
    </LanguageProvider>
  );
}
```

### Gradual Rollout Strategy

#### Phase 1: Deployment with c15t Disabled
```bash
NEXT_PUBLIC_ENABLE_C15T=false
```
- Deploy with existing system only
- Verify no regressions
- Confirm analytics continue working

#### Phase 2: Testing with c15t Enabled
```bash
NEXT_PUBLIC_ENABLE_C15T=true
```
- Enable c15t for testing
- Verify consent banner appears
- Test consent state synchronization
- Confirm analytics respect consent choices

#### Phase 3: Production Rollout
```bash
NEXT_PUBLIC_ENABLE_C15T=true
```
- Full production deployment
- Monitor analytics tracking
- Verify GDPR compliance

---

## Testing & Validation

### Development Testing Workflow

#### Step 1: Verify Implementation Status
```bash
# 1. Check if components are enabled in ClientLayout.tsx
grep -n "ConsentProvider\|CookieConsentBanner" components/ClientLayout.tsx

# 2. Verify environment configuration
grep "NEXT_PUBLIC_ENABLE_C15T" .env.local

# 3. Confirm package installation
pnpm list @c15t/nextjs
```

#### Step 2: Development Server Testing
```bash
# Start development server
pnpm dev

# Test on http://localhost:3000/en
# Expected: Banner should appear for first-time visitors
```

#### Step 3: Production Build Testing
```bash
# Build and test production
pnpm build && pnpm start

# Test on http://localhost:3000/en
# Expected: Same behavior as development
```

#### Step 4: Browser Console Debugging
```javascript
// Add these debug logs to components during testing:

// In ConsentProvider.tsx:
console.log("[ConsentProvider] Rendering with language:", language);

// In CookieConsentBanner.tsx:
console.log("[CookieConsentBanner] Rendering with language:", language);

// In ConsentBridge.tsx:
console.log("[ConsentBridge] Consent state changed:", consentState);
```

### Manual Testing Checklist

#### 1. Banner Display
- [ ] Banner appears on first visit
- [ ] Banner respects language selection
- [ ] Banner styling matches design system
- [ ] Banner is responsive on mobile/desktop

#### 2. Consent Functionality
- [ ] Accept All works correctly
- [ ] Reject All works correctly
- [ ] Custom settings work correctly
- [ ] Consent persists across sessions

#### 3. Analytics Integration
- [ ] Google Analytics loads only with consent
- [ ] Existing analytics functions work unchanged
- [ ] Real-time consent changes are respected
- [ ] Storage events trigger properly

#### 4. Privacy Settings Page
- [ ] Accessible at `/[locale]/privacy-settings`
- [ ] Manual controls work when c15t disabled
- [ ] Settings persist correctly
- [ ] Bilingual support works

#### 5. Feature Flag Testing
- [ ] System works with `NEXT_PUBLIC_ENABLE_C15T=true`
- [ ] System works with `NEXT_PUBLIC_ENABLE_C15T=false`
- [ ] No errors in either configuration
- [ ] Graceful fallback behavior

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Android Chrome)

### System Health Check
```typescript
// 1. Feature flag status
console.log('c15t enabled:', process.env.NEXT_PUBLIC_ENABLE_C15T !== "false");

// 2. Consent state
import { checkConsentStatus } from '@/components/client/ConsentBridge';
console.log('Current consent:', checkConsentStatus());

// 3. Analytics loading
console.log('gtag available:', typeof window.gtag === 'function');

// 4. Cookie format validation
const cookie = document.cookie.split('; ').find(row => row.startsWith('consent='));
if (cookie) {
  const consent = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
  console.log('Cookie format valid:', 
    typeof consent.analytics === 'boolean' && 
    typeof consent.marketing === 'boolean'
  );
}
```

---

## Deployment Strategy

### Pre-deployment Steps
1. Set `NEXT_PUBLIC_ENABLE_C15T=false` initially
2. Deploy and verify existing functionality
3. Enable c15t with `NEXT_PUBLIC_ENABLE_C15T=true`
4. Test consent banner functionality
5. Monitor analytics tracking

### Production Configuration
```bash
# Recommended production settings
NEXT_PUBLIC_ENABLE_C15T=true
NEXT_PUBLIC_ENABLE_BOKUN=true
```

### Environment Configuration
```bash
# Production
NEXT_PUBLIC_ENABLE_C15T=true

# Staging/Testing
NEXT_PUBLIC_ENABLE_C15T=true

# Development
NEXT_PUBLIC_ENABLE_C15T=true # or false for testing legacy system
```

### Rollback Strategy
If issues arise, immediately set:
```bash
NEXT_PUBLIC_ENABLE_C15T=false
```
This reverts to the existing, proven consent system without code changes.

---

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Consent Banner Not Appearing
**Symptoms**: No consent banner visible on first visit

**MOST COMMON CAUSE**: Components commented out in `ClientLayout.tsx`

**Critical Check First**:
```typescript
// 1. Check if components are enabled in ClientLayout.tsx
// File: components/ClientLayout.tsx
// Look for these lines - they should NOT be commented out:
import ConsentProvider from "@/components/client/ConsentProvider";
import CookieConsentBanner from "@/components/client/CookieConsentBanner";

// And in the JSX:
{isC15tEnabled && <CookieConsentBanner />}

// ConsentProvider should wrap the children:
<ConsentProvider>{children}</ConsentProvider>
```

**Additional Debugging Steps**:
```typescript
// 2. Check feature flag
console.log('c15t enabled:', process.env.NEXT_PUBLIC_ENABLE_C15T !== "false");

// 3. Check existing consent cookie
const consentCookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('consent='));
console.log('Existing consent:', consentCookie);

// 4. Clear consent for testing
document.cookie = 'consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

// 5. Add debug logging to components
// In ConsentProvider.tsx:
console.log("[ConsentProvider] Rendering with language:", language);
// In CookieConsentBanner.tsx:
console.log("[CookieConsentBanner] Rendering with language:", language);
```

**Solutions (in order of priority)**:
1. **Check `components/ClientLayout.tsx`** - Ensure c15t imports and components are NOT commented out
2. Verify `NEXT_PUBLIC_ENABLE_C15T=true` in `.env.local`
3. Clear existing consent cookie for testing
4. Check browser console for TypeScript/runtime errors
5. Verify c15t package installation: `pnpm list @c15t/nextjs`
6. Test in incognito/private browsing mode to simulate first-time visitor

#### 2. Banner Works in Development but Not Production
**Symptoms**: Banner appears in `pnpm dev` but not in `pnpm build && pnpm start`

**Common Causes**:
- Existing consent cookies from development testing
- Console logging disabled in production (debug messages won't show)
- Environment variables not properly loaded in production build

**Debugging Steps**:
```bash
# 1. Verify production build includes environment variables
pnpm build
# Check build output for NEXT_PUBLIC_ENABLE_C15T references

# 2. Clear all cookies before testing production
# Use browser dev tools or incognito mode

# 3. Check production server logs
pnpm start
# Look for any runtime errors in terminal output
```

**Solutions**:
1. Test production build in incognito/private browsing mode
2. Verify `.env.local` is properly configured for production
3. Clear all site cookies before testing
4. Check that c15t package is included in production bundle
5. Temporarily add production-safe debug logging to verify component rendering

#### 3. Analytics Not Working After Consent
**Symptoms**: Google Analytics not loading despite consent granted

**Debugging Steps**:
```typescript
// Check consent status
import { checkConsentStatus } from '@/components/client/ConsentBridge';
console.log('Consent status:', checkConsentStatus());

// Check GoogleAnalytics.tsx state
// (Add temporary logging to GoogleAnalytics.tsx)
console.log('GA consent check result:', hasConsent);
```

**Solutions**:
- Verify ConsentBridge is triggering storage events
- Check cookie format matches expected JSON structure
- Ensure GoogleAnalytics.tsx is receiving storage events
- Verify analytics IDs are correctly configured

#### 3. Styling Issues
**Symptoms**: Consent banner doesn't match site design

**Debugging Steps**:
```css
/* Check if CSS variables are applied */
.cookie-consent-banner {
  /* Verify these variables are set */
  --c15t-primary-color: #6b8362;
  --c15t-background-color: #ffffff;
  /* ... other variables */
}
```

**Solutions**:
- Verify CSS variables in `app/globals.css`
- Check component className application
- Inspect element styles in browser dev tools
- Ensure Tailwind CSS isn't conflicting

#### 4. Network Access Issues (Development)
**Symptoms**: Cannot access dev server from mobile devices

**Debugging Steps**:
```bash
# Check Next.js server binding
pnpm dev
# Should show: Network: http://192.168.86.115:3000

# Test network connectivity
ping 192.168.86.115
```

**Solutions**:
- Verify `allowedDevOrigins` configuration in `next.config.js`
- Check firewall settings
- Ensure devices are on same network
- Verify IP address matches configuration

### Debug Mode
Set `NODE_ENV=development` for detailed console logging from consent bridge and analytics functions.

---

## Key Implementation Learnings

### Most Common Issues (Based on Real Debugging Experience)

#### 1. Components Commented Out in ClientLayout.tsx
**Issue**: The #1 reason for "banner not appearing" is that the c15t imports and components are commented out in `components/ClientLayout.tsx`.

**Why This Happens**: During development, TypeScript compilation issues may cause developers to temporarily comment out the components. These comments are often forgotten.

**Solution**: Always check `ClientLayout.tsx` first when troubleshooting banner visibility issues.

#### 2. Development vs Production Behavior Differences
**Issue**: Banner works in `pnpm dev` but not in `pnpm build && pnpm start`.

**Why This Happens**:
- Existing consent cookies from development testing
- Debug console logs disabled in production
- Environment variable loading differences

**Solution**: Test production builds in incognito mode and verify environment variables are properly loaded.

#### 3. ConsentBridge Integration Critical for Analytics
**Issue**: The ConsentBridge component is essential for backward compatibility with existing analytics.

**Why This Matters**: Without ConsentBridge, the existing `GoogleAnalytics.tsx` and `lib/analytics.ts` won't receive consent updates.

**Solution**: Never disable ConsentBridge unless you're specifically testing banner display issues.

### Debugging Methodology That Works

1. **Check ClientLayout.tsx first** - Verify components are not commented out
2. **Verify environment variables** - Ensure `NEXT_PUBLIC_ENABLE_C15T=true`
3. **Add debug logging** - Use console.log in components during development
4. **Test in incognito mode** - Simulates first-time visitor experience
5. **Check browser console** - Look for TypeScript/runtime errors
6. **Test both dev and production** - Use `pnpm dev` and `pnpm build && pnpm start`

---

## Maintenance & Future Development

### For AI Coding Agents

#### Adding New Consent Categories

**Step 1**: Update ConsentProvider configuration
```typescript
// In components/client/ConsentProvider.tsx
<ConsentManagerProvider
  options={{
    mode: 'offline',
    consentCategories: ['necessary', 'analytics', 'marketing', 'preferences'], // Add new category
    ignoreGeoLocation: true,
  }}
>
```

**Step 2**: Update ConsentBridge to handle new category
```typescript
// In components/client/ConsentBridge.tsx
const preferencesConsent = consent.categories?.preferences?.granted || false;

// Update legacy cookie format (if needed)
const legacyConsent = {
  analytics: analyticsConsent,
  marketing: marketingConsent,
  preferences: preferencesConsent, // Add new field
};
```

**Step 3**: Update translations
```typescript
// In lib/translations/en.ts and lib/translations/el.ts
consent: {
  categories: {
    // ... existing categories
    preferences: {
      name: "Preference Cookies",
      description: "Remember your preferences and settings.",
    },
  },
}
```

#### Modifying UI Components

**Banner Customization**:
- Modify `CookieConsentBanner.tsx` for layout changes
- Update CSS variables in `app/globals.css` for styling
- Add new translation keys for custom text

**Privacy Settings Enhancement**:
- Extend `PrivacySettingsClient.tsx` for additional controls
- Add new routes under `app/[locale]/privacy-settings/`
- Implement additional consent management features

#### Integration with New Analytics Services

**Step 1**: Add service configuration to ConsentProvider
```typescript
// Consider if new service needs different consent category
consentCategories: ['necessary', 'analytics', 'marketing', 'social-media']
```

**Step 2**: Update ConsentBridge for new service
```typescript
// Add new consent field if needed
const socialMediaConsent = consent.categories?.['social-media']?.granted || false;
```

**Step 3**: Update existing analytics helper
```typescript
// In lib/analytics.ts
export function hasSocialMediaConsent(): boolean {
  const consent = checkConsentStatus();
  return consent.socialMedia || false; // Add new field
}
```

### Code Quality Guidelines

#### Component Structure
- Keep components focused on single responsibility
- Maintain separation between c15t logic and legacy compatibility
- Use TypeScript for all new components
- Follow existing naming conventions

#### Error Handling
- Wrap consent operations in try-catch blocks
- Provide fallback behavior when c15t fails
- Log errors in development mode only
- Maintain system functionality even if consent system fails

#### Performance Considerations
- ConsentBridge should remain lightweight (no rendering)
- Minimize re-renders in consent components
- Use React.memo for static components
- Avoid unnecessary consent state checks

#### Testing Strategy
- Test both c15t enabled and disabled modes
- Verify backward compatibility with existing analytics
- Test consent state persistence across sessions
- Validate GDPR compliance requirements

### Design & Styling

#### Custom CSS (`app/globals.css`)
- Matches Pony Club vintage design system
- Primary color: `#6b8362` (your green theme)
- Responsive design for mobile/desktop
- Professional banner and modal styling

#### Design Features
- Backdrop blur effects
- Smooth transitions and hover states
- Mobile-first responsive design
- Accessibility-compliant controls

### Privacy Settings Page (`app/[locale]/privacy-settings/`)
- Dedicated page for consent management
- Fallback manual controls if c15t is disabled
- Bilingual support
- Dual mode operation:
  - **c15t Enabled**: Uses `ConsentManagerDialog` component
  - **c15t Disabled**: Provides manual toggle controls with direct cookie manipulation

---

## Summary

This c15t implementation provides a professional consent management system while maintaining 100% backward compatibility. The architecture is designed for:

- **Zero Risk Deployment**: Feature flag allows instant rollback
- **Gradual Migration**: Existing system continues working unchanged
- **Future Extensibility**: Clean architecture for adding new features
- **Developer Experience**: Comprehensive tooling and documentation
- **GDPR Compliance**: Professional consent management with legal compliance

The system bridges modern consent management (c15t) with existing analytics infrastructure, ensuring a smooth transition and robust functionality for both current and future requirements.

### Key Implementation Benefits
- ✅ **Backward Compatibility**: Zero breaking changes to existing code
- ✅ **Professional UI**: Modern consent banner matching site design
- ✅ **Bilingual Support**: Complete English/Greek translations
- ✅ **Feature Flags**: Safe, gradual rollout capability
- ✅ **Real-time Sync**: Immediate consent state updates
- ✅ **GDPR Compliance**: Full legal compliance with EU regulations
- ✅ **Developer Tools**: Comprehensive debugging and monitoring

### Next Steps for AI Agents
1. **Test the implementation** on localhost:3000
2. **Verify consent banner** appears and functions correctly
3. **Test analytics integration** with consent granted/denied
4. **Check privacy settings page** at `/[locale]/privacy-settings`
5. **Deploy with feature flag** for gradual rollout
6. **Monitor system performance** and user experience

For issues or questions about this implementation:
- Check browser console for error messages
- Verify environment variables are set correctly
- Test with feature flag disabled as fallback
- Review existing analytics documentation in `/docs/`

+++++++ REPLACE
</diff>
</replace_in_file>
