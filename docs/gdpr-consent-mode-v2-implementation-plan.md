# GDPR & Google Consent Mode v2 Compliance Implementation Plan

## Overview

This document provides a comprehensive step-by-step plan for making the Pony Club website fully GDPR and Google Consent Mode v2 compliant. The plan is designed to be executed by an AI coding agent and ensures that all third-party scripts are properly gated behind user consent.

## Current State Analysis

Based on the existing codebase, the website already has:
- ✅ c15t cookie consent system implemented
- ✅ Basic consent bridge to existing analytics system
- ✅ Privacy settings page
- ✅ Bilingual support (English/Greek)

**Missing Components:**
- ❌ Google Consent Mode v2 integration
- ❌ Proper script gating for all third-party services
- ❌ Comprehensive third-party script audit and categorization

## Implementation Plan

### Phase 1: Audit & Script Identification

**Objective:** Identify every third-party script that sets cookies or performs tracking and categorize it.

#### 1.1 Full Codebase Scan
**Files to examine:**
- `app/[locale]/layout.tsx` - Main layout and head scripts
- `components/ClientLayout.tsx` - Client-side layout components
- `components/client/GoogleAnalytics.tsx` - Current GA implementation
- `components/client/BokunScripts.tsx` - Booking widget scripts
- `components/PartyTownConfig.tsx` - Partytown configuration
- All components in `components/client/` directory

**Script patterns to search for:**
```bash
# Search patterns for third-party scripts
- <script src=
- next/script
- googletagmanager.com
- google-analytics.com
- connect.facebook.net
- hotjar.com
- vercel-insights.com
- bokun.io
- any other external domains
```

#### 1.2 Script Categorization
Each identified script should be mapped to consent categories:

| Script Type | Consent Category | Examples |
|-------------|------------------|----------|
| Essential functionality | `necessary` | Error reporting, security |
| Analytics & Performance | `analytics` | Google Analytics, Vercel Analytics |
| Marketing & Advertising | `marketing` | Facebook Pixel, Google Ads |
| Booking & Reservations | `necessary` or `analytics` | Bokun widgets (depending on tracking) |

#### 1.3 Current c15t Configuration Review
**Files to analyze:**
- `lib/c15t-config.ts` - c15t configuration
- `components/client/ConsentProvider.tsx` - Consent provider setup
- `components/client/ConsentBridge.tsx` - Existing consent bridge

### Phase 2: Google Consent Mode v2 (GCMv2) Implementation

**Objective:** Integrate with Google's Consent Mode v2 API to properly signal consent states.

#### 2.1 Create ConsentInitializer Component
**File:** `components/client/ConsentInitializer.tsx`

**Purpose:** Send default consent state to Google BEFORE any tracking scripts load.

**Implementation Requirements:**
```typescript
// ConsentInitializer.tsx
import Script from 'next/script';

export default function ConsentInitializer() {
  return (
    <Script
      id="consent-initializer"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Set default consent state (DENIED for all)
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted'
          });
        `
      }}
    />
  );
}
```

#### 2.2 Integrate ConsentInitializer into Layout
**File:** `app/[locale]/layout.tsx`

Add ConsentInitializer to the `<head>` section before any other scripts.

#### 2.3 Upgrade ConsentBridge for GCMv2
**File:** `components/client/ConsentBridge.tsx`

**Enhancement:** Extend existing useEffect to call Google Consent Mode v2 API when consent changes.

**Consent Mapping:**
```typescript
// c15t category -> Google Consent Mode v2 mapping
const consentMapping = {
  analytics: ['analytics_storage'],
  marketing: ['ad_storage', 'ad_user_data', 'ad_personalization'],
  necessary: ['functionality_storage', 'security_storage']
};
```

**Implementation:**
```typescript
// In ConsentBridge.tsx useEffect
useEffect(() => {
  if (!isLoaded || !consent) return;

  const analyticsConsent = consent.categories?.analytics?.granted || false;
  const marketingConsent = consent.categories?.marketing?.granted || false;

  // Update legacy cookie format (existing code)
  updateLegacyCookie(analyticsConsent, marketingConsent);

  // NEW: Update Google Consent Mode v2
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': analyticsConsent ? 'granted' : 'denied',
      'ad_storage': marketingConsent ? 'granted' : 'denied',
      'ad_user_data': marketingConsent ? 'granted' : 'denied',
      'ad_personalization': marketingConsent ? 'granted' : 'denied',
      'functionality_storage': 'granted', // Usually always granted
      'personalization_storage': analyticsConsent ? 'granted' : 'denied'
    });
  }

  // Trigger storage event (existing code)
  window.dispatchEvent(new Event('storage'));
}, [consent, isLoaded]);
```

### Phase 3: Gating & Refactoring Third-Party Scripts

**Objective:** Prevent scripts from loading before explicit consent and refactor loading mechanisms.

#### 3.1 Refactor Google Analytics Implementation
**File:** `components/client/GoogleAnalytics.tsx`

**Option A: Use c15t's Built-in GTM Integration**
Update `ConsentManagerProvider` options:
```typescript
// In ConsentProvider.tsx or wherever ConsentManagerProvider is configured
const options = {
  mode: 'c15t',
  backendURL: 'https://your-instance.c15t.dev',
  unstable_googleTagManager: {
    id: 'GTM-XXXXXXX' // Your GTM container ID
  }
};
```

**Option B: Enhanced Manual Implementation**
If keeping manual implementation, wrap GA script in ConsentGate:
```typescript
<ConsentGate category="analytics">
  <GoogleAnalyticsScript />
</ConsentGate>
```

#### 3.2 Create Generic ConsentGate Component
**File:** `components/client/ConsentGate.tsx`

**Purpose:** Conditionally render children based on consent status.

**Implementation:**
```typescript
import { useConsentManager } from '@c15t/nextjs';
import { ReactNode } from 'react';

interface ConsentGateProps {
  category: 'necessary' | 'analytics' | 'marketing';
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ConsentGate({ 
  category, 
  children, 
  fallback = null 
}: ConsentGateProps) {
  const { consent, isLoaded } = useConsentManager();
  
  if (!isLoaded) {
    return fallback;
  }
  
  const hasConsent = consent?.categories?.[category]?.granted || false;
  
  return hasConsent ? <>{children}</> : <>{fallback}</>;
}
```

#### 3.3 Wrap All Third-Party Scripts
**Files to update:**
- `components/client/BokunScripts.tsx` - Wrap with appropriate ConsentGate
- Any Facebook Pixel implementation - Wrap with `<ConsentGate category="marketing">`
- Any other tracking scripts - Wrap based on their purpose

**Example implementation:**
```typescript
// For marketing scripts
<ConsentGate category="marketing">
  <FacebookPixelScript />
</ConsentGate>

// For analytics scripts
<ConsentGate category="analytics">
  <VercelAnalyticsScript />
</ConsentGate>

// For booking functionality (if it sets tracking cookies)
<ConsentGate category="analytics">
  <BokunTrackingScript />
</ConsentGate>
```

### Phase 4: Enhanced Script Detection and Dynamic Loading

**Objective:** Implement more sophisticated script management for better compliance.

#### 4.1 Create ScriptManager Component
**File:** `components/client/ScriptManager.tsx`

**Purpose:** Centralized management of all third-party scripts with consent-based loading.

**Features:**
- Dynamic script injection based on consent
- Script cleanup when consent is revoked
- Loading state management

#### 4.2 Implement Consent Change Handlers
**Enhancement to ConsentBridge.tsx:**

Add logic to handle consent revocation:
```typescript
// When consent is revoked, clean up scripts and cookies
const handleConsentRevocation = (category: string) => {
  if (category === 'analytics') {
    // Remove analytics cookies
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = '_ga_*=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  
  if (category === 'marketing') {
    // Remove marketing cookies
    document.cookie = '_fbp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = '_fbc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};
```

### Phase 5: Validation & Testing Strategy

**Objective:** Provide clear validation steps to ensure compliance.

#### 5.1 Initial State Verification (No Consent)
**Test Steps:**
1. Clear all cookies and localStorage
2. Visit the website
3. **Expected Results:**
   - Consent banner appears
   - No tracking cookies in DevTools > Application > Cookies
   - No requests to tracking domains in Network tab
   - Console shows: `gtag('consent', 'default', {...})` with all denied

#### 5.2 "Accept All" Flow Validation
**Test Steps:**
1. Click "Accept All" on banner
2. **Expected Results:**
   - Tracking cookies appear immediately
   - Tracking requests visible in Network tab
   - Console shows: `gtag('consent', 'update', {...})` with granted permissions
   - Banner doesn't reappear on reload

#### 5.3 "Reject All" Flow Validation
**Test Steps:**
1. Clear storage, click "Reject All"
2. **Expected Results:**
   - No tracking cookies set
   - No tracking scripts loaded
   - Consent state remains denied
   - Banner doesn't reappear on reload

#### 5.4 Custom Selection Validation
**Test Steps:**
1. Clear storage, open settings, grant only analytics
2. **Expected Results:**
   - Only analytics cookies (_ga, _ga_*) are set
   - Only analytics scripts load
   - Marketing scripts remain blocked

#### 5.5 Consent Revocation Testing
**Test Steps:**
1. Grant all consent, then revoke analytics
2. **Expected Results:**
   - Analytics cookies are removed
   - Analytics scripts stop loading
   - Marketing scripts continue if still granted

### Phase 6: Documentation and Monitoring

**Objective:** Document the implementation and set up monitoring.

#### 6.1 Update Documentation
**Files to create/update:**
- `docs/gdpr-compliance-validation.md` - Testing procedures
- `docs/consent-management-architecture.md` - Technical documentation
- Update `docs/c15t-ai-agent-guide.md` with new components

#### 6.2 Implement Compliance Monitoring
**Create:** `components/client/ComplianceMonitor.tsx`

**Purpose:** 
- Monitor consent state changes
- Log compliance events
- Alert on potential violations

## Implementation Priority

### High Priority (Phase 1-2)
1. ✅ **ConsentInitializer creation and integration** - Critical for GCMv2
2. ✅ **ConsentBridge enhancement** - Core consent mode functionality
3. ✅ **Third-party script audit** - Identify all compliance gaps

### Medium Priority (Phase 3)
4. ✅ **ConsentGate component** - Systematic script gating
5. ✅ **Google Analytics refactoring** - Largest tracking surface
6. ✅ **Wrap all other scripts** - Ensure full compliance

### Low Priority (Phase 4-6)
7. ✅ **ScriptManager component** - Advanced, but good for long-term maintenance
8. ✅ **Consent revocation handling** - Important for user rights
9. ✅ **Documentation and monitoring** - Finalize and ensure future compliance
