import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define the locales and default locale from your next.config.js
const locales = ['en', 'el'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next(); // Continue without redirecting
  }

  // If no locale prefix, redirect to the same path with the default locale
  // This handles requests to `/` by redirecting to `/en` (or your defaultLocale)
  // It also handles requests like `/kayaking` by redirecting to `/en/kayaking`
  request.nextUrl.pathname = `/${defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;

  // For the root path specifically, ensure it doesn't become `//en/` if pathname was `/`
  if (pathname === '/') {
    request.nextUrl.pathname = `/${defaultLocale}`;
  } else {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  }

  return NextResponse.redirect(request.nextUrl);
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
