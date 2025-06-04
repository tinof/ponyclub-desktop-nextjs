# Production Security Hardening for Pony Club Website

Based on my analysis of your Next.js 15 application, here's a comprehensive security plan to make it production-ready with best-practice CSP configuration:

## 🚨 Critical Security Issues to Address

### 1. **Exposed API Key**
✅ **COMPLETED** - API key security addressed

### 2. **CSP Security Improvements** 
✅ **IMPLEMENTED** - Enhanced middleware-based CSP with dynamic nonce generation

**Current Implementation:** We've implemented a superior middleware-based approach that provides:
- **Dynamic nonce generation** for each request (more secure than static CSP)
- **Environment-aware policies** (different rules for dev vs production)
- **Edge-level security** (headers set at middleware level for better performance)
- **Integrated with existing i18n routing**

The implementation includes:
- Enhanced `middleware.ts` with CSP and security headers
- Utility functions in `lib/nonce.ts` for components
- Cleaned `next.config.js` (security headers moved to middleware)

**Key Security Features:**
- Production removes `unsafe-eval` and uses `strict-dynamic`
- Development allows necessary unsafe directives for hot reloading
- Unique nonce per request prevents CSP bypass attacks
- Comprehensive security headers (HSTS, X-Frame-Options, etc.)

## 🔒 Additional Security Measures

### 3. **Environment Variables Security**

Create `.env.example`:
```bash
# Google Maps API Key (restrict to your domain in Google Cloud Console)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

# Optional: Analytics IDs
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 4. **CSP Nonce System**
✅ **IMPLEMENTED** - Dynamic nonce generation and utility functions

**Usage in Components:**
```typescript
// lib/nonce.ts - Already implemented
import { getNonce } from '@/lib/nonce';

// In Server Components with inline scripts
export default async function MyComponent() {
  const nonce = await getNonce();
  
  return (
    <>
      <script nonce={nonce}>
        {/* Your inline script */}
        console.log('This script uses CSP nonce');
      </script>
      <style nonce={nonce}>
        {/* Critical CSS that needs nonce */}
      </style>
    </>
  );
}

// For Client Components that need nonce
'use client';
import { useEffect, useState } from 'react';

export function ClientComponentWithScript() {
  const [nonce, setNonce] = useState('');
  
  useEffect(() => {
    // Get nonce from meta tag or header
    const metaNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
    if (metaNonce) setNonce(metaNonce);
  }, []);
  
  return (
    <script nonce={nonce}>
      {/* Client-side script */}
    </script>
  );
}
```

### 5. **Security Dependencies**

Add these security-focused packages:
```bash
pnpm add helmet @next/env
pnpm add -D @types/node
```

### 6. **Production Environment Setup**

**Vercel Deployment:**
- Set environment variables in Vercel dashboard
- Enable "Automatically expose System Environment Variables"
- Configure custom domains with SSL

**Environment Variables to Set:**
```bash
NODE_ENV=production
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_restricted_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 7. **API Key Security Best Practices**

**Google Maps API Key Restrictions:**
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Edit your API key
3. Add HTTP referrers restrictions:
   - `https://yourdomain.com/*`
   - `https://www.yourdomain.com/*`
4. Restrict to only needed APIs (Maps JavaScript API, Places API, etc.)

### 8. **Additional Security Headers**

Consider adding these headers for enhanced security:
```javascript
// In your headers configuration
{ key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
{ key: 'Cross-Origin-Resource-Policy', value: 'same-origin' }
```

## 🔍 Security Audit Checklist

### ✅ Completed
- [x] **Enhanced CSP with middleware** - Dynamic nonce generation implemented
- [x] **Security headers** - HSTS, X-Frame-Options, etc. configured
- [x] **Environment-aware policies** - Different CSP for dev/production
- [x] **Nonce utility system** - Helper functions for components
- [x] **Clean separation** - Security headers moved from next.config.js to middleware

### 🔄 Next Steps
- [ ] **Regenerate and restrict Google Maps API key** (if not done)
- [ ] **Test CSP in production** - Deploy and verify no console errors
- [ ] **Audit external domains** - Review all allowed CSP domains
- [ ] **Environment variable security** - Ensure proper .env setup
- [ ] **Run security audit:** `npm audit`
- [ ] **CSP violation monitoring** - Set up reporting endpoint
- [ ] **Rate limiting** - Consider for API routes
- [ ] **Security testing** - Browser dev tools CSP validation

### 🧪 Testing Commands
```bash
# Test the middleware implementation
npm run dev
# Check browser console for CSP violations
# Verify nonce generation in Network tab

# Production build test
npm run build
npm start
# Verify production CSP policies
```

## Edge Runtime Compatibility ✅ COMPLETED

**Issue Fixed**: The middleware was using Node.js `crypto` module which isn't supported in Edge Runtime.

**Solution Applied**:
- Removed Node.js `crypto` import from middleware.ts
- Used Web Crypto API (`crypto.randomUUID()`) which is natively available in Edge Runtime
- Maintained the same nonce generation functionality

**Result**: Middleware now compiles and runs successfully without Edge Runtime errors.

## 🚀 Deployment Security

1. **Pre-deployment:**
   ```bash
   # Security audit
   npm audit --audit-level moderate
   
   # Build test
   npm run build
   
   # CSP test in browser dev tools
   ```

2. **Post-deployment:**
   - Test all functionality with new CSP
   - Monitor browser console for CSP violations
   - Set up CSP reporting endpoint if needed

This configuration will significantly improve your security posture while maintaining functionality for your tourism business website.
        