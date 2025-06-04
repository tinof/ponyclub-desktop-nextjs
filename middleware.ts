import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define the locales and default locale from your next.config.js
const locales = ['en', 'el'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Function to generate a random nonce using Web Crypto API
  function generateNonce() {
    return crypto.randomUUID().replace(/-/g, '');
  }

  // Generate nonce for CSP using Web Crypto API
  const nonce = generateNonce();
  const isDev = process.env.NODE_ENV === 'development';
  
  // CSP configuration with environment-aware settings
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ${
      isDev 
        ? "'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com" 
        : "'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://static.bokun.io https://widgets.bokun.io https://maps.googleapis.com"
    };
    style-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://fonts.googleapis.com https://widgets.bokun.io;
    img-src 'self' https://images.unsplash.com https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com data: blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://analytics.google.com https://region1.google-analytics.com https://widgets.bokun.io https://maps.googleapis.com;
    frame-src 'self' https://widgets.bokun.io https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  // Handle locale routing (existing logic)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let response: NextResponse;

  if (pathnameHasLocale) {
    response = NextResponse.next();
  } else {
    // Redirect logic for locale handling
    if (pathname === '/') {
      request.nextUrl.pathname = `/${defaultLocale}`;
    } else {
      request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    }
    response = NextResponse.redirect(request.nextUrl);
  }

  // Set security headers with dynamic nonce
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
  response.headers.set('x-nonce', nonce);
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=()');

  return response;
}

export const config = {
  // Matcher to specify paths where the middleware should run.
  // This aims to skip:
  // - API routes
  // - Next.js internal static files (_next/static, _next/image)
  // - Files in the public directory (e.g., /images, /fonts, /favicon.ico, files with extensions)
  matcher: [
    '/((?!api|_next/static|_next/image|images|assets|fonts|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.webmanifest|.*\\..*).*)',
    // The above regex tries to exclude paths that look like file paths (containing a dot)
    // and common static asset folders.
    // It's important that this matcher correctly excludes requests for static assets
    // to prevent them from being incorrectly redirected with a locale prefix.
  ],
};
