import { NextRequest, NextResponse } from 'next/server';

/**
 * Image Proxy API Route
 * 
 * This route proxies external images (especially Google Reviews images) 
 * to enable Next.js image optimization and better caching control.
 * 
 * Usage: /api/image-proxy?url=https://lh3.googleusercontent.com/...
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  // Validate the image URL
  if (!imageUrl) {
    return NextResponse.json(
      { error: 'Missing url parameter' },
      { status: 400 }
    );
  }

  // Security: Only allow specific domains to prevent abuse
  const allowedDomains = [
    'lh3.googleusercontent.com',
    'lh4.googleusercontent.com',
    'lh5.googleusercontent.com',
    'lh6.googleusercontent.com',
    'images.unsplash.com',
  ];

  let hostname: string;
  try {
    hostname = new URL(imageUrl).hostname;
  } catch {
    return NextResponse.json(
      { error: 'Invalid URL format' },
      { status: 400 }
    );
  }

  if (!allowedDomains.includes(hostname)) {
    return NextResponse.json(
      { error: 'Domain not allowed' },
      { status: 403 }
    );
  }

  try {
    // Fetch the image from the external URL
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS Image Proxy)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: response.status }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Create response with enhanced caching headers for optimal performance
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Browser cache: 1 year for immutable images
        'Cache-Control': 'public, max-age=31536000, immutable, stale-while-revalidate=86400',
        // CDN cache: 1 year with stale-while-revalidate
        'CDN-Cache-Control': 'public, max-age=31536000, stale-while-revalidate=86400',
        'Vercel-CDN-Cache-Control': 'public, max-age=31536000, stale-while-revalidate=86400',
        // Additional performance headers
        'Vary': 'Accept-Encoding',
        'X-Content-Type-Options': 'nosniff',
        // ETag for better cache validation
        'ETag': `"${Buffer.from(imageUrl).toString('base64').slice(0, 16)}"`,
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
