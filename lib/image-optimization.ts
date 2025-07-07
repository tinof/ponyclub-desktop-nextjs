import type { ImageProps } from "next/image";

/**
 * Default size attribute values to use when rendering images
 * These help prevent layout shifts (CLS) by reserving space before image loads
 * Optimized based on PageSpeed insights for better responsive image delivery
 * Mobile-first approach: smaller images for mobile devices to improve loading speed
 */
export const DEFAULT_IMAGE_SIZES = {
  // Hero images: Full width on mobile, optimized for different breakpoints
  hero: "(max-width:480px)100vw,(max-width:768px)100vw,(max-width:1024px)100vw,1920px",

  // Gallery images: Smaller on mobile for faster loading
  gallery:
    "(max-width:480px)150px,(max-width:640px)165px,(max-width:1024px)248px,248px",

  // Card images: Responsive sizing with mobile optimization
  card: "(max-width:480px)100vw,(max-width:640px)100vw,(max-width:1024px)50vw,400px",

  // Avatar images: Very small on mobile
  avatar: "(max-width:480px)32px,(max-width:768px)40px,60px",

  // Logo images: Optimized for different screen sizes
  logo: "(max-width:480px)160px,(max-width:768px)184px,(max-width:1024px)224px,256px",

  // Thumbnail images: Small and efficient
  thumbnail:
    "(max-width:480px)64px,(max-width:640px)80px,(max-width:768px)128px,192px",

  // Full-width images (like maps, banners)
  fullWidth:
    "(max-width:480px)100vw,(max-width:768px)100vw,(max-width:1200px)100vw,1200px",

  // Content images within text
  content:
    "(max-width:480px)100vw,(max-width:768px)80vw,(max-width:1024px)60vw,800px",
};

/**
 * Image quality settings for different types of images
 * Optimized based on PageSpeed insights - reduced quality for better compression
 */
export const IMAGE_QUALITY = {
  high: 65, // Reduced from 75 for better compression
  medium: 55, // Reduced from 65 for better compression
  low: 45, // Reduced from 50 for better compression
};

/**
 * Helper function to optimize props for Next.js Image component
 * Ensures proper sizes, quality, and loading strategies
 */
export function optimizeImageProps(
  props: Partial<ImageProps> & {
    src: string;
    alt: string;
    type?: keyof typeof DEFAULT_IMAGE_SIZES;
    fetchPriority?: "high" | "low" | "auto";
    enableBlurPlaceholder?: boolean;
  }
): Partial<ImageProps> {
  const {
    type = "card",
    fetchPriority,
    enableBlurPlaceholder,
    ...rest
  } = props;

  // Base optimized props
  const optimizedProps: Partial<ImageProps> = {
    ...rest,
    sizes: props.sizes || DEFAULT_IMAGE_SIZES[type],
    quality: props.quality || IMAGE_QUALITY.medium,
    // Unless explicitly set to eager or priority is true, default to lazy loading
    loading: props.priority ? undefined : props.loading || "lazy",
  };

  // Add fetchPriority for LCP optimization
  if (fetchPriority) {
    (optimizedProps as ImageProps & { fetchPriority?: string }).fetchPriority =
      fetchPriority;
  }

  // Add blur placeholder for better perceived performance
  if (enableBlurPlaceholder && !props.priority) {
    optimizedProps.placeholder = "blur";
    // Generate a simple blur data URL for better UX
    optimizedProps.blurDataURL = generateBlurDataURL();
  }

  // Add width/height for non-fill images
  if (!(props.fill || props.width || props.height)) {
    // Default placeholder dimensions to avoid layout shift if not using fill
    optimizedProps.width = 1200;
    optimizedProps.height = 800;
  }

  return optimizedProps;
}

/**
 * Generate a simple blur data URL for placeholder
 */
export function generateBlurDataURL(): string {
  // Simple 1x1 pixel blur data URL - very lightweight
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=";
}

/**
 * Apply optimized props to hero image
 */
export function optimizeHeroImage(
  props: Partial<ImageProps> & { src: string; alt: string }
): Partial<ImageProps> {
  return {
    ...optimizeImageProps({
      ...props,
      type: "hero",
      priority: true,
      fetchPriority: "high", // High priority for LCP
    }),
    quality: IMAGE_QUALITY.high,
  };
}

/**
 * Apply optimized props to gallery image
 */
export function optimizeGalleryImage(
  props: Partial<ImageProps> & { src: string; alt: string },
  index = 0
): Partial<ImageProps> {
  return {
    ...optimizeImageProps({
      ...props,
      type: "gallery",
      enableBlurPlaceholder: index > 2, // Enable blur for images after the first 3
      fetchPriority: index === 0 ? "high" : "auto", // High priority for first image
    }),
    // Only eagerly load first 3-6 images
    loading: index < 6 ? "eager" : "lazy",
    // First image should be high quality, rest medium
    quality: index === 0 ? IMAGE_QUALITY.high : IMAGE_QUALITY.medium,
  };
}

/**
 * Apply optimized props to content images (within articles/text)
 */
export function optimizeContentImage(
  props: Partial<ImageProps> & { src: string; alt: string }
): Partial<ImageProps> {
  return {
    ...optimizeImageProps({
      ...props,
      type: "content",
      enableBlurPlaceholder: true,
      fetchPriority: "auto",
    }),
    quality: IMAGE_QUALITY.medium,
  };
}

/**
 * Apply optimized props to full-width images (maps, banners)
 */
export function optimizeFullWidthImage(
  props: Partial<ImageProps> & { src: string; alt: string },
  isAboveFold = false
): Partial<ImageProps> {
  return {
    ...optimizeImageProps({
      ...props,
      type: "fullWidth",
      priority: isAboveFold,
      fetchPriority: isAboveFold ? "high" : "auto",
      enableBlurPlaceholder: !isAboveFold,
    }),
    quality: isAboveFold ? IMAGE_QUALITY.high : IMAGE_QUALITY.medium,
  };
}

/**
 * Apply optimized props to avatar/profile images
 */
export function optimizeAvatarImage(
  props: Partial<ImageProps> & { src: string; alt: string }
): Partial<ImageProps> {
  return {
    ...optimizeImageProps({
      ...props,
      type: "avatar",
      enableBlurPlaceholder: true,
    }),
    quality: IMAGE_QUALITY.low, // Avatars can be lower quality since they're small
  };
}

/**
 * Get the proper image format extension based on browser support
 * This helps with client-side format selection (server-side is handled by Next.js)
 */
export function getOptimalImageFormat(): "webp" | "jpg" {
  if (typeof window !== "undefined") {
    // Check WebP support
    const canvas = document.createElement("canvas");
    if (canvas.getContext?.("2d")) {
      if (canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0) {
        return "webp";
      }
    }
  }
  return "jpg";
}
