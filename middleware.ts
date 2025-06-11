import type { NoseconeOptions } from '@nosecone/next'
import { createMiddleware as createNoseconeMiddleware, defaults as noseconeDefaults } from '@nosecone/next'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const locales = ['en', 'el']
const defaultLocale = 'en'

const isDev = process.env.NODE_ENV === 'development'

// Define additional script sources for development
const devScriptSources = isDev
  ? (["'unsafe-eval'", "'unsafe-inline'", 'https://vercel.live', 'https://va.vercel-scripts.com'] as const)
  : ([] as const)

// Define additional connect sources for development
const devConnectSources = isDev
  ? (['ws://localhost:3000', 'https://vercel.live', 'https://va.vercel-scripts.com'] as const)
  : ([] as const)

const noseconeOptions: NoseconeOptions = {
  ...noseconeDefaults,
  // Disable COEP to prevent cross-origin resource blocking
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: isDev
    ? false // Disable CSP entirely in development to allow all inline scripts
    : {
        // Use nosecone defaults with nonces for production
        ...noseconeDefaults.contentSecurityPolicy,
        directives: {
          ...noseconeDefaults.contentSecurityPolicy.directives,
          baseUri: ["'none'"],
          childSrc: ["'none'"],
          defaultSrc: ["'self'"],
          objectSrc: ["'none'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          manifestSrc: ["'self'"],
          mediaSrc: ["'self'"],
          scriptSrc: [
            ...noseconeDefaults.contentSecurityPolicy.directives.scriptSrc,
            "'strict-dynamic'" as const,
            'https://widgets.bokun.io' as const,
            'https://static.bokun.io' as const,
            'https://cdn.bokun.io' as const,
            'https://assets.bokun.io' as const,
            'https://www.googletagmanager.com' as const,
            'https://www.google-analytics.com' as const,
            'https://maps.googleapis.com' as const,
            'https://js-agent.newrelic.com' as const,
            'https://featurable.com' as const,
            'https://www.gstatic.com' as const,
            'https://apis.google.com' as const,
            'https://vercel.live' as const, // Added for Vercel preview toolbar script
            "'sha256-VYskjExgHaP1F6hubwqGdG9++A8I+HfVOuylfR5fUJ0='" as const, // Added for Bokun widget's inline script
          ],
          // Add worker-src directive to allow blob workers
          workerSrc: [
            "'self'",
            'blob:',
            'https://widgets.bokun.io',
            'https://static.bokun.io',
            'https://maps.googleapis.com',
          ],
          styleSrc: [
            ...noseconeDefaults.contentSecurityPolicy.directives.styleSrc,
            'https://fonts.googleapis.com' as const,
            'https://widgets.bokun.io' as const,
            'https://static.bokun.io' as const,
            'https://cdn.bokun.io' as const,
          ],
          imgSrc: [
            ...noseconeDefaults.contentSecurityPolicy.directives.imgSrc,
            'https://images.unsplash.com' as const,
            'https://maps.googleapis.com' as const,
            'https://maps.gstatic.com' as const,
            'https://www.google-analytics.com' as const,
            'https://widgets.bokun.io' as const,
            'https://static.bokun.io' as const,
            'https://cdn.bokun.io' as const,
            'https://assets.bokun.io' as const,
            'https://ponyclub.gr' as const,
            'https://www.ponyclub.gr' as const,
            'https://www.googletagmanager.com' as const,
            'https://pagead2.googlesyndication.com' as const,
            'https://media-cdn.tripadvisor.com' as const,
            'https://lh3.googleusercontent.com' as const,
            'https://www.google.com' as const,
            'https://www.google.fi' as const,
            'https://www.google.co.uk' as const,
            'https://www.google.de' as const,
            'https://www.google.fr' as const,
            'https://www.google.it' as const,
            'https://www.google.es' as const,
            'https://www.google.nl' as const,
            'https://www.google.be' as const,
            'https://www.google.at' as const,
            'https://www.google.ch' as const,
            'https://www.google.se' as const,
            'https://www.google.no' as const,
            'https://www.google.dk' as const,
            'https://www.google.pl' as const,
            'https://www.google.cz' as const,
            'https://www.google.hu' as const,
            'https://www.google.ro' as const,
            'https://www.google.bg' as const,
            'https://www.google.hr' as const,
            'https://www.google.si' as const,
            'https://www.google.sk' as const,
            'https://www.google.lt' as const,
            'https://www.google.lv' as const,
            'https://www.google.ee' as const,
            'https://www.google.ie' as const,
            'https://www.google.pt' as const,
            'https://www.google.gr' as const,
            'https://www.google.cy' as const,
            'https://www.google.mt' as const,
            'https://www.google.lu' as const,
            'https://googleads.g.doubleclick.net' as const,
          ],
          fontSrc: [
            ...noseconeDefaults.contentSecurityPolicy.directives.fontSrc,
            'https://fonts.gstatic.com' as const,
            'https://widgets.bokun.io' as const,
            'https://static.bokun.io' as const,
          ],
          connectSrc: [
            ...noseconeDefaults.contentSecurityPolicy.directives.connectSrc,
            'https://analytics.google.com' as const,
            'https://region1.google-analytics.com' as const,
            'https://region1.analytics.google.com' as const,
            'https://widgets.bokun.io' as const,
            'https://static.bokun.io' as const,
            'https://cdn.bokun.io' as const,
            'https://api.bokun.io' as const,
            'https://maps.googleapis.com' as const,
            'https://pagead2.googlesyndication.com' as const,
            'https://featurable.com' as const, // Added for react-google-reviews
            'https://www.google.com' as const,
            'https://google.com' as const,
            'https://googleads.g.doubleclick.net' as const,
            'https://stats.g.doubleclick.net' as const,
            ...devConnectSources,
          ],
          frameSrc: [
            "'self'" as const, // Added 'self'
            'https://widgets.bokun.io' as const,
            'https://static.bokun.io' as const,
            'https://www.google.com' as const,
            'https://www.googletagmanager.com' as const,
            'https://vercel.live' as const, // Added for Vercel preview toolbar
          ],
          upgradeInsecureRequests: process.env.NODE_ENV === 'production',
          reportUri: ['/api/csp-violations'], // Add CSP violation reporting endpoint
        },
      },
  // Vercel toolbar helper for previews
  ...(process.env.VERCEL_ENV === 'preview' ? { withVercelToolbar: true } : {}),
  strictTransportSecurity: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true,
  },
  xFrameOptions: { action: 'deny' },
  referrerPolicy: { policy: ['no-referrer'] },
}

const configuredNoseconeMiddleware = createNoseconeMiddleware(noseconeOptions)

export async function middleware(request: NextRequest) {
  let response = await configuredNoseconeMiddleware()

  if (!response) {
    response = NextResponse.next()
  }

  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (!pathnameHasLocale) {
    // Check for a saved locale preference in the cookie
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
    const chosenLocale = locales.includes(localeCookie as string) ? localeCookie : defaultLocale

    const newPathname = pathname === '/' ? `/${chosenLocale}` : `/${chosenLocale}${pathname}`
    const url = request.nextUrl.clone()
    url.pathname = newPathname

    const i18nRedirectResponse = NextResponse.redirect(url)
    // Copy headers from the security middleware response to the redirect response
    response.headers.forEach((value, key) => {
      if (!i18nRedirectResponse.headers.has(key)) {
        i18nRedirectResponse.headers.set(key, value)
      }
    })
    return i18nRedirectResponse
  }

  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=()')

  return response
}

export const config = {
  matcher: [
    '/((?!api|monitoring|_next/static|_next/image|images|assets|fonts|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.webmanifest|.*\\..*).*)',
  ],
}
