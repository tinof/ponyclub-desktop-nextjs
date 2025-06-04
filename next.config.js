/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
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
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 80, 96, 128, 160, 192, 224, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizeCss: { target: 'critical', minify: true },
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
      { source: '/the-river-village/', destination: '/river-village', permanent: true },
      { source: '/contact/', destination: '/contact', permanent: true },
      { source: '/rafting-and-kayaking/', destination: '/rafting', permanent: true },
      { source: '/trekking/', destination: '/trekking', permanent: true },
      // Add more mappings as needed
    ]
  },

  async headers() {
    return [
      // Note: Security headers (CSP, HSTS, etc.) are now handled in middleware.ts
      // This provides better performance and dynamic nonce generation
      {
        // Cache-Control for static assets with specific extensions
        source: '/:path(.+)\\.(js|css|xml|json|txt|map|ico|svg|png|jpg|jpeg|gif|webp|avif|woff|woff2|ttf|otf|eot|mp4|webm|pdf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  output: 'standalone',
  poweredByHeader: false,
}

// Conditionally apply bundle analyzer only for production builds (webpack)
// Since Turbopack only supports dev, bundle analyzer should only run on builds
module.exports = process.env.ANALYZE === 'true' 
  ? withBundleAnalyzer(nextConfig) 
  : nextConfig;
