# Production Security Hardening for Pony Club Website

## Introduction

This document outlines a robust and automated Content Security Policy (CSP)
strategy for the Pony Club Next.js 15 application. The goal is to move away from
manual CSP error fixing and hashing, towards a maintainable, secure, and
automated CSP management workflow.

## Current CSP Challenges & Goals

The existing CSP implementation relies on manually maintaining a long list of
script hashes and nonces, which is error-prone and difficult to maintain. This
plan introduces an automated approach using the `@nosecone/next` library to
simplify nonce management, improve security, and streamline deployments.

## Recommended CSP Automation Strategy: Using `@nosecone/next`

### Why Nosecone?

- Designed specifically for Next.js and other modern JavaScript frameworks.
- Automatically generates and injects nonces for inline scripts, eliminating
  manual nonce management.
- Provides a type-safe API with pragmatic defaults for security headers.
- Supports environment-aware policies (development vs. production).
- Compatible with Vercel deployments and handles Vercel-specific tooling.
- Manages other critical security headers like HSTS, X-Frame-Options, and more.

### Implementation Steps

#### 1. Installation

Install the Nosecone package:

```bash
pnpm add @nosecone/next
```

#### 2. Middleware Configuration (`middleware.ts`)

Replace or augment your existing middleware with the following pattern:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createMiddleware as createNoseconeMiddleware } from '@nosecone/next'

const locales = ['en', 'el']
const defaultLocale = 'en'

const noseconeMiddleware = createNoseconeMiddleware({
  contentSecurityPolicy: {
    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'nonce-{NONCE}'",
        'https://widgets.bokun.io',
        'https://static.bokun.io',
        'https://cdn.bokun.io',
        'https://assets.bokun.io',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://maps.googleapis.com',
        'https://static.elfsight.com',
        'https://universe-static.elfsightcdn.com',
        'https://js-agent.newrelic.com',
        ...(process.env.NODE_ENV === 'development'
          ? [
              "'unsafe-eval'",
              'https://vercel.live',
              'https://va.vercel-scripts.com',
            ]
          : []),
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
        'https://widgets.bokun.io',
        'https://static.bokun.io',
        'https://cdn.bokun.io',
      ],
      'img-src': [
        "'self'",
        'https://images.unsplash.com',
        'https://maps.googleapis.com',
        'https://maps.gstatic.com',
        'https://www.google-analytics.com',
        'https://widgets.bokun.io',
        'https://static.bokun.io',
        'https://cdn.bokun.io',
        'https://assets.bokun.io',
        'https://ponyclub.gr',
        'https://www.ponyclub.gr',
        'https://www.googletagmanager.com',
        'https://pagead2.googlesyndication.com',
        'https://phosphor.utils.elfsightcdn.com',
        'https://media-cdn.tripadvisor.com',
        'https://lh3.googleusercontent.com',
        'https://www.google.com',
        'https://googleads.g.doubleclick.net',
        'data:',
        'blob:',
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'https://widgets.bokun.io',
        'https://static.bokun.io',
        'data:',
      ],
      'connect-src': [
        "'self'",
        'https://analytics.google.com',
        'https://region1.google-analytics.com',
        'https://region1.analytics.google.com',
        'https://widgets.bokun.io',
        'https://static.bokun.io',
        'https://cdn.bokun.io',
        'https://api.bokun.io',
        'https://maps.googleapis.com',
        'https://core.service.elfsight.com',
        'https://pagead2.googlesyndication.com',
        'https://static.elfsight.com',
        'https://service-reviews-ultimate.elfsight.com',
        'https://www.google.com',
        'https://googleads.g.doubleclick.net',
        ...(process.env.NODE_ENV === 'development'
          ? [
              'ws://localhost:3000',
              'https://vercel.live',
              'https://va.vercel-scripts.com',
            ]
          : []),
      ],
      'frame-src': [
        "'self'",
        'https://widgets.bokun.io',
        'https://static.bokun.io',
        'https://www.google.com',
        'https://www.googletagmanager.com',
      ],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': [],
    },
    reportOnly: false,
    // Uncomment and configure the following to enable CSP violation reporting:
    // reportUri: '/api/csp-violations',
  },
  httpStrictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
  xContentTypeOptions: 'nosniff',
  xFrameOptions: 'DENY',
  xXssProtection: '1; mode=block',
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: ['self'],
    payment: [],
  },
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  let response: NextResponse

  if (pathnameHasLocale) {
    response = NextResponse.next({ request })
  } else {
    const newPathname =
      pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
    const url = request.nextUrl.clone()
    url.pathname = newPathname
    response = NextResponse.redirect(url)
  }

  await noseconeMiddleware(request, response)

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|assets|fonts|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.webmanifest|.*\\..*).*)',
  ],
}
```

#### 3. Nonce Usage in Components

With Nosecone, nonce generation and injection are automatic. You should minimize
inline scripts and styles, but if you have custom inline scripts, use the nonce
provided by Nosecone via headers or meta tags.

#### 4. Removing Manual Hashes

The manual maintenance of script hashes in CSP can be removed. Nonce-based CSP
is more flexible and secure.

## Automated CSP Scanning & Validation Workflow

### Local Development

- Configure Nosecone with `reportOnly: true` to monitor CSP violations without
  blocking.
- Use browser developer tools to inspect CSP reports.

### Preview Deployments (Vercel)

- Deploy feature branches to Vercel preview URLs.
- Use tools like [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)
  and [Mozilla Observatory](https://observatory.mozilla.org/) to scan preview
  URLs.
- Check browser console for CSP errors.
- Adjust CSP configuration as needed and redeploy.

### Production Deployments

- Enforce full CSP with Nosecone.
- Set up a CSP violation reporting endpoint (e.g., `/api/csp-violations`) to
  collect violation reports.
- Use services like Sentry or Report URI for monitoring.

## Refined Vercel Deployment Workflow

1. Develop locally with `pnpm dev` using Nosecone in `reportOnly` mode.
2. Push feature branches; Vercel creates preview deployments.
3. Test preview URLs thoroughly, scan with CSP tools, and fix issues.
4. Merge to main branch to trigger production deployment.
5. Monitor production CSP reports and browser console for violations.

## Updating Existing Security Plan Sections

- Mark the old hash-based CSP system as superseded by the automated nonce-based
  approach with Nosecone.
- Update nonce system documentation to reflect Nosecone's automatic handling.
- Add CSP scanning and reporting steps to the security audit checklist.
- Note that the May 2025 patch log CSP script hashes fix is resolved by this new
  approach.

## Considerations & Best Practices

- Follow the principle of least privilege for allowed domains.
- Avoid `'unsafe-inline'` and `'unsafe-eval'` in production.
- Regularly review and update CSP directives.
- Keep `@nosecone/next` updated to benefit from improvements.

## Deployment Security

1. Pre-deployment:

```bash
pnpm audit --audit-level moderate
pnpm build
```

2. Post-deployment:

- Test all functionality with new CSP.
- Monitor browser console and CSP reporting endpoint.
- Use CSP scanning tools on preview and production URLs.

---

This automated CSP workflow will reduce manual errors, improve security, and
streamline your deployment process for the Pony Club website.
