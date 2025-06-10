import { NextRequest, NextResponse } from 'next/server';
import { createMiddleware as createNoseconeMiddleware, defaults as noseconeDefaults, withVercelToolbar } from '@nosecone/next';
import type { NoseconeOptions } from '@nosecone/next';

const locales = ['en', 'el'];
const defaultLocale = 'en';

const isDev = process.env.NODE_ENV === 'development';

// Define additional script sources for development
const devScriptSources = isDev ? ["'unsafe-eval'", "https://vercel.live", "https://va.vercel-scripts.com"] as const : [] as const;

// Define additional connect sources for development
const devConnectSources = isDev ? [
  "ws://localhost:3000",
  "https://vercel.live",
  "https://va.vercel-scripts.com"
] as const : [] as const;

const noseconeOptions: NoseconeOptions = {
  ...noseconeDefaults,
  // Disable COEP to prevent cross-origin resource blocking
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    ...noseconeDefaults.contentSecurityPolicy,
    directives: {
      ...noseconeDefaults.contentSecurityPolicy.directives,
      scriptSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.scriptSrc,
        "'strict-dynamic'",
        "'unsafe-inline'", // Fallback for older browsers that don't support strict-dynamic
        "https://widgets.bokun.io",
        "https://static.bokun.io",
        "https://cdn.bokun.io",
        "https://assets.bokun.io",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://maps.googleapis.com",
        "https://static.elfsight.com",
        "https://universe-static.elfsightcdn.com",
        "https://js-agent.newrelic.com",
        // Additional domains for third-party scripts that might create inline scripts
        "https://www.gstatic.com",
        "https://apis.google.com",
        ...devScriptSources
      ],
      // Add worker-src directive to allow blob workers
      workerSrc: [
        "'self'",
        "blob:",
        "https://widgets.bokun.io",
        "https://static.bokun.io",
        "https://maps.googleapis.com",
      ],
      styleSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.styleSrc,
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://widgets.bokun.io",
        "https://static.bokun.io",
        "https://cdn.bokun.io",
      ],
      imgSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.imgSrc,
        "https://images.unsplash.com",
        "https://maps.googleapis.com",
        "https://maps.gstatic.com",
        "https://www.google-analytics.com",
        "https://widgets.bokun.io",
        "https://static.bokun.io",
        "https://cdn.bokun.io",
        "https://assets.bokun.io",
        "https://ponyclub.gr",
        "https://www.ponyclub.gr",
        "https://www.googletagmanager.com",
        "https://pagead2.googlesyndication.com",
        "https://phosphor.utils.elfsightcdn.com",
        "https://media-cdn.tripadvisor.com",
        "https://lh3.googleusercontent.com",
        "https://www.google.com",
        "https://www.google.fi",
        "https://www.google.co.uk",
        "https://www.google.de",
        "https://www.google.fr",
        "https://www.google.it",
        "https://www.google.es",
        "https://www.google.nl",
        "https://www.google.be",
        "https://www.google.at",
        "https://www.google.ch",
        "https://www.google.se",
        "https://www.google.no",
        "https://www.google.dk",
        "https://www.google.pl",
        "https://www.google.cz",
        "https://www.google.hu",
        "https://www.google.ro",
        "https://www.google.bg",
        "https://www.google.hr",
        "https://www.google.si",
        "https://www.google.sk",
        "https://www.google.lt",
        "https://www.google.lv",
        "https://www.google.ee",
        "https://www.google.ie",
        "https://www.google.pt",
        "https://www.google.gr",
        "https://www.google.cy",
        "https://www.google.mt",
        "https://www.google.lu",
        "https://googleads.g.doubleclick.net",
      ],
      fontSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.fontSrc,
        "https://fonts.gstatic.com",
        "https://widgets.bokun.io",
        "https://static.bokun.io",
        "data:",
      ],
      connectSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.connectSrc,
        "https://analytics.google.com",
        "https://region1.google-analytics.com",
        "https://region1.analytics.google.com",
        "https://widgets.bokun.io",
        "https://static.bokun.io",
        "https://cdn.bokun.io",
        "https://api.bokun.io",
        "https://maps.googleapis.com",
        "https://core.service.elfsight.com",
        "https://pagead2.googlesyndication.com",
        "https://static.elfsight.com",
        "https://service-reviews-ultimate.elfsight.com",
        "https://www.google.com",
        "https://google.com",
        "https://googleads.g.doubleclick.net",
        "https://stats.g.doubleclick.net",
        ...devConnectSources
      ],
      frameSrc: [
        "https://widgets.bokun.io",
        "https://static.bokun.io",
        "https://www.google.com",
        "https://www.googletagmanager.com",
      ],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production',
    },
  },
  // Vercel toolbar helper for previews
  ...(process.env.VERCEL_ENV === "preview"
    ? { withVercelToolbar: true }
    : {}),
  strictTransportSecurity: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true,
  },
  xFrameOptions: { action: 'deny' },
  referrerPolicy: { policy: ['no-referrer'] },
};

const configuredNoseconeMiddleware = createNoseconeMiddleware(noseconeOptions);

export async function middleware(request: NextRequest) {
  let response = await configuredNoseconeMiddleware();

  if (!response) {
    response = NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Check for a saved locale preference in the cookie
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
    const chosenLocale = locales.includes(localeCookie as string) ? localeCookie : defaultLocale;

    const newPathname = pathname === '/' ? `/${chosenLocale}` : `/${chosenLocale}${pathname}`;
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    
    const i18nRedirectResponse = NextResponse.redirect(url);
    // Copy headers from the security middleware response to the redirect response
    response.headers.forEach((value, key) => {
      if (!i18nRedirectResponse.headers.has(key)) {
        i18nRedirectResponse.headers.set(key, value);
      }
    });
    return i18nRedirectResponse;
  }

  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=()');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|assets|fonts|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.webmanifest|.*\\..*).*)',
  ],
};
