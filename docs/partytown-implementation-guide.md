# Partytown Integration Guide for AI Agent

This guide provides detailed instructions for implementing Partytown in the Pony Club Next.js 15 App Router project, combining the latest official Partytown documentation with Next.js Script component best practices.

---

## 1. Overview

Partytown helps offload third-party scripts to a web worker, improving main thread responsiveness and overall performance.

### 1.1 Experimental Worker Strategy

- Available only in the `pages/` directory (not supported in the Next.js 13+ App Router).
- Requires enabling `nextScriptWorkers` in `next.config.js`.
- Usage example in `pages/home.tsx`:

```tsx
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="worker" />
    </>
  );
}
```

### 1.2 Stable Manual Setup (Recommended for App Router)

- Install Partytown package.
- Copy Partytown worker files before build.
- Add `<Partytown />` React component in the `<head>`.
- Convert third-party scripts to use `type="text/partytown"`.

---

## 2. Step-by-Step Manual Setup

### 2.1 Install Partytown

```bash
pnpm install @qwik.dev/partytown
```

### 2.2 Update Build Scripts

Add a `partytown` script to `package.json` and modify the `build` script:

```json
"scripts": {
  "partytown": "partytown copylib public/~partytown",
  "build": "npm run partytown && node scripts/generate-sitemap-data.js && next build && cp -r public .next/standalone/"
}
```

### 2.3 Add `<Partytown />` Component in Root Layout

In `app/[locale]/layout.tsx`:

```tsx
import { Partytown } from '@qwik.dev/partytown/react';

export default function LocaleLayout({ children, params }) {
  const locale = /* get locale from params */;

  return (
    <html lang={locale}>
      <head>
        {/* Forward Google Analytics events */}
        <Partytown forward={['dataLayer.push', 'gtag']} debug={false} />
        {/* Third-party scripts */}
        <script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"
          type="text/partytown"
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXX');`,
          }}
        />
        <script
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=..."
          type="text/partytown"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2.4 Remove Old `<Script strategy="lazyOnload" />` Instances

Remove any previous usage of Next.js `<Script>` components with `strategy="lazyOnload"` for these scripts to avoid duplication.

---

## 3. Script Loading Strategies

- `beforeInteractive`: Load scripts before hydration; use for critical scripts in root layout.
- `afterInteractive`: Default; load scripts after hydration.
- `lazyOnload`: Load scripts during browser idle time.
- `worker`: Experimental; offload scripts to web worker (only in `pages/` directory).

---

## 4. Inline Scripts

For inline scripts that should run in the web worker, use:

```tsx
<script
  type="text/partytown"
  dangerouslySetInnerHTML={{
    __html: "/* Inlined Third-Party Script */",
  }}
/>
```

---

## 5. Verification Checklist

- `public/~partytown/` directory exists after build.
- No 404 errors for Partytown assets.
- Google Analytics and other scripts function correctly.
- Lighthouse and Core Web Vitals show improved main-thread performance.

---

## 6. Rollback Plan

If any issues arise, revert affected scripts to use Next.js `<Script>` with `strategy="lazyOnload"` and keep Partytown for others.

---

This guide should be followed precisely to implement Partytown correctly in the Next.js 15 App Router environment.
