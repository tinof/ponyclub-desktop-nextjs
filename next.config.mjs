/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizeCss: false,
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
}

export default nextConfig
