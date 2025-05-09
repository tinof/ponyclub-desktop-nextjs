/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'your-trusted-domain.com',
      },
    ],
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
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
      {
        // General headers for all paths. Next.js/Vercel will set appropriate Cache-Control for pages.
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: *.bokun.io *.elfsight.com vercel.live *.vercel.live; style-src 'self' 'unsafe-inline' https: *.bokun.io *.elfsight.com; img-src 'self' https: data:; font-src 'self' https: data:; connect-src 'self' https: *.bokun.io *.elfsight.com vercel.live *.vercel.live;" },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Removed aggressive Cache-Control from here.
        ],
      },
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

module.exports = withBundleAnalyzer(nextConfig);
