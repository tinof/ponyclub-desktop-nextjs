/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false, // Don't auto-open browser
});

const nextConfig = {
  // Optimized Turbopack configuration for Next.js 15
  turbopack: {
    // Configure path aliases for better module resolution
    resolveAlias: {
      '@': './',
      '@/components': './components',
      '@/lib': './lib',
      '@/contexts': './contexts',
      '@/hooks': './hooks',
      '@/types': './types',
    },
  },
  // Modern JavaScript compilation for better performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental features for performance
  experimental: {
    // Use modern JavaScript features
    esmExternals: true,
    // Optimize CSS
    optimizeCss: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [
      16, 32, 48, 64, 80, 96, 120, 128, 160, 184, 192, 224, 256, 320, 360, 384,
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Next.js 15 built-in critical CSS inlining (replaces deprecated critters)
    inlineCss: true,
    scrollRestoration: true,
    staleTimes: {
      dynamic: 30, // seconds
      static: 180, // seconds
    },
  },
  async redirects() {
    return [
      // Example 301 redirects from old WordPress URLs to new Next.js routes
      { source: '/horse-riding/', destination: '/riding', permanent: true },
      {
        source: '/the-river-village/',
        destination: '/river-village',
        permanent: true,
      },
      { source: '/contact/', destination: '/contact', permanent: true },
      {
        source: '/rafting-and-kayaking/',
        destination: '/rafting',
        permanent: true,
      },
      { source: '/trekking/', destination: '/trekking', permanent: true },
      // Add more mappings as needed
    ];
  },

  async headers() {
    return [
      // Note: Security headers (CSP, HSTS, etc.) are now handled in middleware.ts
      // This provides better performance and dynamic nonce generation
      {
        // Cache-Control for static assets with specific extensions
        source:
          '/:path(.+)\\.(js|css|xml|json|txt|map|ico|svg|png|jpg|jpeg|gif|webp|avif|woff|woff2|ttf|otf|eot|mp4|webm|pdf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  output: 'standalone',
  poweredByHeader: false,
};

// Conditionally apply bundle analyzer only for production builds (webpack)
// Since Turbopack only supports dev, bundle analyzer should only run on builds
module.exports =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'manteyo-oy',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
