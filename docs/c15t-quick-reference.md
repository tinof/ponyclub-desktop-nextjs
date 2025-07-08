# c15t Quick Reference Card for AI Agents

## 🚨 Emergency Actions

### Immediate Rollback
```bash
NEXT_PUBLIC_ENABLE_C15T=false
# Redeploy - reverts to existing consent system
```

### Health Check Command
```typescript
// Paste in browser console
(function(){const e=document.cookie.split('; ').find(r=>r.startsWith('consent='));console.log('c15t enabled:',process.env.NEXT_PUBLIC_ENABLE_C15T!=="false");console.log('gtag available:',typeof window.gtag==='function');if(e){const c=JSON.parse(decodeURIComponent(e.split('=')[1]));console.log('consent:',c);}else{console.log('No consent cookie');}})();
```

---

## 📁 File Locations

| Component | File Path | Purpose |
|-----------|-----------|---------|
| **ConsentProvider** | `components/client/ConsentProvider.tsx` | Main c15t wrapper |
| **ConsentBridge** | `components/client/ConsentBridge.tsx` | Legacy compatibility |
| **CookieConsentBanner** | `components/client/CookieConsentBanner.tsx` | UI banner |
| **PrivacySettings** | `app/[locale]/privacy-settings/` | Settings page |
| **Translations** | `lib/translations/[en\|el].ts` | Consent text |
| **Config** | `next.config.js` | Network access |

---

## ⚙️ Environment Variables

```bash
# Feature flag (main control)
NEXT_PUBLIC_ENABLE_C15T=true|false

# Analytics (existing, unchanged)
NEXT_PUBLIC_GA_ID=G-6J3ELVNTQE
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
```

---

## 🔧 Key Code Patterns

### Feature Flag Check
```typescript
const isC15tEnabled = process.env.NEXT_PUBLIC_ENABLE_C15T !== "false";
```

### Consent Status Check
```typescript
import { checkConsentStatus } from '@/components/client/ConsentBridge';
const { analytics, marketing } = checkConsentStatus();
```

### Legacy Cookie Format
```typescript
// Cookie: "consent"
// Value: {"analytics": boolean, "marketing": boolean}
```

### c15t Configuration
```typescript
<ConsentManagerProvider
  options={{
    mode: 'offline',
    consentCategories: ['necessary', 'analytics', 'marketing'],
    ignoreGeoLocation: true,
  }}
>
```

---

## 🔍 Debugging Commands

### Clear Consent (Testing)
```typescript
document.cookie = 'consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
localStorage.removeItem('c15t-consent');
location.reload();
```

### Check Integration
```typescript
// 1. Feature flag
console.log('c15t enabled:', process.env.NEXT_PUBLIC_ENABLE_C15T !== "false");

// 2. Consent state
import { checkConsentStatus } from '@/components/client/ConsentBridge';
console.log('consent:', checkConsentStatus());

// 3. Analytics
console.log('gtag:', typeof window.gtag === 'function');
```

### Network Access Check
```typescript
console.log('Network IP:', /^\d+\.\d+\.\d+\.\d+/.test(location.hostname));
```

---

## 🏗️ Architecture Flow

```
User Action
    ↓
c15t ConsentManagerProvider
    ↓
ConsentBridge (sync to legacy format)
    ↓
Cookie: {"analytics": boolean, "marketing": boolean}
    ↓
GoogleAnalytics.tsx (unchanged)
    ↓
lib/analytics.ts (unchanged)
    ↓
Tracking Services
```

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Set `NEXT_PUBLIC_ENABLE_C15T=false` initially
- [ ] Deploy and verify existing system works
- [ ] No console errors or warnings

### Testing Phase
- [ ] Set `NEXT_PUBLIC_ENABLE_C15T=true`
- [ ] Clear consent cookies for testing
- [ ] Verify banner appears on first visit
- [ ] Test accept/reject/custom consent flows
- [ ] Verify analytics load correctly with consent
- [ ] Test privacy settings page (`/[locale]/privacy-settings`)
- [ ] Test both English and Greek languages

### Production Rollout
- [ ] Monitor analytics tracking rates
- [ ] Check consent banner appearance rates
- [ ] Monitor console errors
- [ ] Verify no performance regression
- [ ] Have rollback plan ready

---

## 🔧 Common Fixes

### Banner Not Appearing
```typescript
// 1. Check feature flag
process.env.NEXT_PUBLIC_ENABLE_C15T !== "false"

// 2. Clear existing consent
document.cookie = 'consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

// 3. Check for errors
console.error // Look for c15t-related errors
```

### Analytics Not Loading
```typescript
// 1. Check consent sync
import { checkConsentStatus } from '@/components/client/ConsentBridge';
checkConsentStatus().analytics // Should be true

// 2. Trigger storage event
window.dispatchEvent(new Event('storage'));

// 3. Check GoogleAnalytics.tsx state
// (Add temporary logging to verify consent detection)
```

### Styling Issues
```css
/* Check CSS variables in app/globals.css */
.cookie-consent-banner {
  --c15t-primary-color: #6b8362;
  --c15t-background-color: #ffffff;
}
```

### Network Access Issues
```javascript
// Check next.config.js allowedDevOrigins
allowedDevOrigins: [
  '192.168.86.115:3000',
  /^192\.168\.\d{1,3}\.\d{1,3}:3000$/,
]
```

---

## 📊 Monitoring Points

### Key Metrics
- **Banner Appearance**: ~100% for new visitors
- **Consent Grant Rate**: Monitor user behavior
- **Analytics Loading**: No decrease in tracking
- **Error Rate**: Zero c15t-related errors
- **Performance**: No load time regression

### Alert Thresholds
- Banner appearance < 90%
- Analytics tracking drops > 10%
- Console errors containing 'c15t'
- Page load time increase > 200ms

---

## 🔄 Integration Points

### Existing System (Unchanged)
- `GoogleAnalytics.tsx` - continues reading same cookie format
- `lib/analytics.ts` - all functions work unchanged
- `hasAnalyticsConsent()` - existing function preserved
- Storage event monitoring - existing pattern maintained

### New System (c15t)
- `ConsentProvider` - wraps c15t functionality
- `ConsentBridge` - maintains backward compatibility
- `CookieConsentBanner` - professional UI
- Privacy settings - enhanced user control

---

## 📝 Translation Keys

### Required Keys (both en.ts and el.ts)
```typescript
consent: {
  banner: { title, description, acceptAll, rejectAll, settings },
  categories: { 
    necessary: { name, description },
    analytics: { name, description },
    marketing: { name, description }
  },
  settings: { title, description, save, acceptAll, rejectAll },
  privacy: { title, description, privacyPolicy, cookiePolicy }
}
```

---

## 🛠️ Maintenance Tasks

### Weekly
- [ ] Check for c15t package updates
- [ ] Monitor consent grant rates
- [ ] Review console error logs

### Monthly
- [ ] Verify GDPR compliance
- [ ] Test consent flow end-to-end
- [ ] Review analytics tracking accuracy

### Quarterly
- [ ] Update translations if needed
- [ ] Review and update documentation
- [ ] Assess new c15t features

---

## 📞 Escalation Path

1. **Level 1**: Feature flag toggle, clear cookies
2. **Level 2**: Component integration check, console errors
3. **Level 3**: Package compatibility, bundle analysis
4. **Level 4**: Rollback to existing system

### Rollback Decision Matrix
| Issue | Severity | Action |
|-------|----------|--------|
| Banner not appearing | Low | Debug, fix in next release |
| Analytics not loading | High | Immediate rollback |
| Console errors | Medium | Fix if affecting functionality |
| Performance regression | High | Immediate rollback |
| GDPR compliance issue | Critical | Immediate rollback + legal review |

---

## 💡 Pro Tips for AI Agents

1. **Always test feature flag toggle** - system must work in both states
2. **Preserve existing analytics** - never break GoogleAnalytics.tsx
3. **Monitor storage events** - critical for real-time consent updates
4. **Use development health check** - paste console command for quick diagnosis
5. **Rollback is safe** - feature flag provides instant recovery
6. **Cookie format is sacred** - maintain exact JSON structure for compatibility
7. **Network config is dev-only** - allowedDevOrigins has zero production impact

This quick reference provides the essential information needed for rapid diagnosis, maintenance, and development of the c15t consent management system.
