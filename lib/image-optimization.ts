import type { ImageProps } from 'next/image';

/**
 * Default size attribute values to use when rendering images
 * These help prevent layout shifts (CLS) by reserving space before image loads
 * Optimized based on PageSpeed insights for better responsive image delivery
 */
export const DEFAULT_IMAGE_SIZES = {
  hero: '(max-width:640px)100vw,(max-width:1024px)100vw,1920px',
  gallery: '(max-width:640px)165px,(max-width:1024px)248px,248px',
  card: '(max-width:640px)100vw,(max-width:1024px)50vw,400px',
  avatar: '(max-width:480px)40px,60px',
  logo: '(max-width:768px)184px,224px,256px',
  thumbnail: '(max-width:640px)80px,(max-width:768px)128px,192px',
}

/**
 * Image quality settings for different types of images
 * Optimized based on PageSpeed insights - reduced quality for better compression
 */
export const IMAGE_QUALITY = {
  high: 65, // Reduced from 75 for better compression
  medium: 55, // Reduced from 65 for better compression
  low: 45, // Reduced from 50 for better compression
}

/**
 * Helper function to optimize props for Next.js Image component
 * Ensures proper sizes, quality, and loading strategies
 */
export function optimizeImageProps(
  props: Partial<ImageProps> & { src: string; alt: string; type?: keyof typeof DEFAULT_IMAGE_SIZES }
): Partial<ImageProps> {
  const { type = 'card', ...rest } = props

  // Base optimized props
  const optimizedProps: Partial<ImageProps> = {
    ...rest,
    sizes: props.sizes || DEFAULT_IMAGE_SIZES[type],
    quality: props.quality || IMAGE_QUALITY.medium,
    // Unless explicitly set to eager or priority is true, default to lazy loading
    loading: props.priority ? undefined : props.loading || 'lazy',
  }

  // Add width/height for non-fill images
  if (!props.fill && !props.width && !props.height) {
    // Default placeholder dimensions to avoid layout shift if not using fill
    optimizedProps.width = 1200
    optimizedProps.height = 800
  }

  return optimizedProps
}

/**
 * Apply optimized props to hero image
 */
export function optimizeHeroImage(props: Partial<ImageProps> & { src: string; alt: string }): Partial<ImageProps> {
  return {
    ...optimizeImageProps({ ...props, type: 'hero', priority: true }),
    quality: IMAGE_QUALITY.high,
  }
}

/**
 * Apply optimized props to gallery image
 */
export function optimizeGalleryImage(
  props: Partial<ImageProps> & { src: string; alt: string },
  index = 0
): Partial<ImageProps> {
  return {
    ...optimizeImageProps({ ...props, type: 'gallery' }),
    // Only eagerly load first 3-6 images
    loading: index < 6 ? 'eager' : 'lazy',
    // First image should be high quality, rest medium
    quality: index === 0 ? IMAGE_QUALITY.high : IMAGE_QUALITY.medium,
  }
}

/**
 * Get the proper image format extension based on browser support
 * This helps with client-side format selection (server-side is handled by Next.js)
 */
export function getOptimalImageFormat(): 'webp' | 'jpg' {
  if (typeof window !== 'undefined') {
    // Check WebP support
    const canvas = document.createElement('canvas')
    if (canvas.getContext && canvas.getContext('2d')) {
      if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
        return 'webp'
      }
    }
  }
  return 'jpg'
}
