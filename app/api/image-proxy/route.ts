import { type NextRequest, NextResponse } from "next/server";

// PERFORMANCE OPTIMIZATION: Configure caching for API route
// This route handles dynamic image proxying, so it should remain dynamic
// but with aggressive caching headers (already implemented below)
export const dynamic = "force-dynamic"; // Required for query parameter handling
export const runtime = "nodejs"; // Use Node.js runtime for better performance with image processing

// Move regex to top level for performance
const GOOGLE_IMAGES_SIZE_REGEX = /=.*$/;

/**
 * Enhanced Image Proxy API Route
 *
 * This route proxies external images (especially Google Reviews images)
 * to enable Next.js image optimization and better caching control.
 *
 * Features:
 * - Aggressive caching for performance
 * - Size optimization parameters
 * - WebP/AVIF format support (handled by Next.js)
 * - Security domain validation
 *
 * Usage:
 * - Basic: /api/image-proxy?url=https://lh3.googleusercontent.com/...
 * - With size: /api/image-proxy?url=...&w=400&h=300
 * - With quality: /api/image-proxy?url=...&q=75
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");
  const width = searchParams.get("w");
  const height = searchParams.get("h");
  const quality = searchParams.get("q");

  // Validate the image URL
  if (!imageUrl) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 },
    );
  }

  // Security: Only allow specific domains to prevent abuse
  const allowedDomains = [
    "lh3.googleusercontent.com",
    "lh4.googleusercontent.com",
    "lh5.googleusercontent.com",
    "lh6.googleusercontent.com",
    "images.unsplash.com",
  ];

  let hostname: string;
  try {
    hostname = new URL(imageUrl).hostname;
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  if (!allowedDomains.includes(hostname)) {
    return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
  }

  try {
    // Build optimized URL for Google images if size parameters are provided
    let optimizedUrl = imageUrl;
    if (hostname.includes("googleusercontent.com") && (width || height)) {
      // Google Images supports size parameters: =s400 for square, =w400-h300 for specific dimensions
      const sizeParam =
        width && height ? `=w${width}-h${height}` : `=s${width || height}`;
      optimizedUrl = imageUrl.includes("=")
        ? imageUrl.replace(GOOGLE_IMAGES_SIZE_REGEX, sizeParam)
        : `${imageUrl}${sizeParam}`;
    }

    // Fetch the image from the external URL with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(optimizedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NextJS Image Proxy)",
        Accept: "image/webp,image/avif,image/*,*/*;q=0.8",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch image: ${response.status} ${response.statusText}`,
        },
        { status: response.status },
      );
    }

    // Validate content type
    const contentType = response.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid content type - not an image" },
        { status: 400 },
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();

    // Validate image size (prevent abuse)
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    if (imageBuffer.byteLength > maxSize) {
      return NextResponse.json({ error: "Image too large" }, { status: 413 });
    }

    // Generate cache key for better ETag
    const cacheKey = `${imageUrl}-${width || "auto"}-${height || "auto"}-${quality || "auto"}`;
    const etag = `"${Buffer.from(cacheKey).toString("base64").slice(0, 16)}"`;

    // Create response with enhanced caching headers for optimal performance
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Browser cache: 1 year for immutable images
        "Cache-Control":
          "public, max-age=31536000, immutable, stale-while-revalidate=86400",
        // CDN cache: 1 year with stale-while-revalidate
        "CDN-Cache-Control":
          "public, max-age=31536000, stale-while-revalidate=86400",
        "Vercel-CDN-Cache-Control":
          "public, max-age=31536000, stale-while-revalidate=86400",
        // Additional performance headers
        Vary: "Accept-Encoding, Accept",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-Content-Security-Policy": "default-src 'none'; img-src 'self'",
        // Enhanced ETag for better cache validation
        ETag: etag,
        // Add content length for better caching
        "Content-Length": imageBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    // Enhanced error logging
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Image proxy error:", {
      url: imageUrl,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });

    // Handle specific error types
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 408 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
