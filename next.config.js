/** @type {import('next').NextConfig} */

// Move regex patterns to top level for performance
const REACT_MODULES_REGEX = /[\\/]node_modules[\\/](react|react-dom)[\\/]/;
const NEXTJS_MODULES_REGEX = /[\\/]node_modules[\\/]next[\\/]/;
const FRAMER_MOTION_REGEX = /[\\/]node_modules[\\/]framer-motion[\\/]/;
const SENTRY_MODULES_REGEX = /[\\/]node_modules[\\/]@sentry[\\/]/;
const RADIX_UI_MODULES_REGEX = /[\\/]node_modules[\\/]@radix-ui[\\/]/;
const STYLES_REGEX = /\.(css|scss|sass)$/;
const VENDOR_MODULES_REGEX = /[\\/]node_modules[\\/]/;

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false, // Don't auto-open browser
  analyzerMode: "static", // Generate static HTML files
  reportFilename: "bundle-analysis.html",
  defaultSizes: "gzip", // Show gzipped sizes by default
});

const nextConfig = {
  serverExternalPackages: ["import-in-the-middle", "require-in-the-middle"],
  // Optimized Turbopack configuration for Next.js 15
  turbopack: {
    // Configure path aliases for better module resolution
    resolveAlias: {
      "@": "./",
      "@/components": "./components",
      "@/lib": "./lib",
      "@/contexts": "./contexts",
      "@/hooks": "./hooks",
      "@/types": "./types",
    },
  },
  // Modern JavaScript compilation for better performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [
      16, 32, 48, 64, 80, 96, 120, 128, 160, 184, 192, 224, 256, 320, 360, 384,
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  // Experimental features for performance

  experimental: {
    // Stable performance optimizations
    scrollRestoration: true,
    staleTimes: {
      dynamic: 30, // seconds
      static: 180, // seconds
    },
  },

  // Enhanced webpack optimizations for Tailwind v4 and CSS performance
  webpack: (config, { dev }) => {
    // Production optimizations
    if (!dev) {
      // Optimize bundle splitting with CSS-specific optimizations
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            // React and React-DOM in separate chunk
            react: {
              test: REACT_MODULES_REGEX,
              name: "react",
              chunks: "all",
              priority: 40,
            },
            // Next.js framework chunk
            nextjs: {
              test: NEXTJS_MODULES_REGEX,
              name: "nextjs",
              chunks: "all",
              priority: 35,
            },
            // Framer Motion in separate chunk (heavy animation library)
            framerMotion: {
              test: FRAMER_MOTION_REGEX,
              name: "framer-motion",
              chunks: "all",
              priority: 30,
            },
            // Sentry in separate chunk (monitoring)
            sentry: {
              test: SENTRY_MODULES_REGEX,
              name: "sentry",
              chunks: "all",
              priority: 25,
            },
            // Remaining Radix UI components (if any)
            radixUI: {
              test: RADIX_UI_MODULES_REGEX,
              name: "radix-ui",
              chunks: "all",
              priority: 20,
            },
            // CSS chunks for better caching
            styles: {
              name: "styles",
              test: STYLES_REGEX,
              chunks: "all",
              priority: 50,
              enforce: true,
            },
            // Default vendor chunk for remaining dependencies
            vendor: {
              test: VENDOR_MODULES_REGEX,
              name: "vendors",
              chunks: "all",
              priority: 10,
              minChunks: 1,
            },
            // Common chunks for shared code
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
  async redirects() {
    return [
      // Example 301 redirects from old WordPress URLs to new Next.js routes
      { source: "/horse-riding/", destination: "/riding", permanent: true },
      {
        source: "/the-river-village/",
        destination: "/river-village",
        permanent: true,
      },
      { source: "/contact/", destination: "/contact", permanent: true },
      {
        source: "/rafting-and-kayaking/",
        destination: "/rafting",
        permanent: true,
      },
      { source: "/trekking/", destination: "/trekking", permanent: true },
      // Add more mappings as needed
    ];
  },

  async headers() {
    return [
      // Note: Security headers (CSP, HSTS, etc.) are now handled in middleware.ts
      // This provides better performance and dynamic nonce generation

      // BFCACHE OPTIMIZATION: Configure HTML documents for back/forward cache compatibility
      // Remove 'no-store' directive that prevents bfcache restoration
      {
        source:
          "/((?!api|_next/static|_next/image|images|assets|fonts|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.webmanifest|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, max-age=0, must-revalidate",
          },
          // Add Permissions-Policy to prevent unload handlers that break bfcache
          {
            key: "Permissions-Policy",
            value: "unload=()",
          },
        ],
      },
      {
        // Cache-Control for static assets with specific extensions
        source:
          "/:path(.+)\\.(js|css|xml|json|txt|map|ico|svg|png|jpg|jpeg|gif|webp|avif|woff|woff2|ttf|otf|eot|mp4|webm|pdf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  output: "standalone",
  poweredByHeader: false,
};

// Conditionally apply bundle analyzer only for production builds (webpack)
// Since Turbopack only supports dev, bundle analyzer should only run on builds
module.exports =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
