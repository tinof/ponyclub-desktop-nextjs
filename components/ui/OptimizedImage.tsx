'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';

import {
  optimizeGalleryImage,
  optimizeHeroImage,
  optimizeImageProps,
  optimizeContentImage,
  optimizeFullWidthImage,
  optimizeAvatarImage,
} from '@/lib/image-optimization';

export type OptimizedImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
  imageType?: 'default' | 'hero' | 'gallery' | 'avatar' | 'logo' | 'thumbnail' | 'content' | 'fullWidth';
  index?: number; // For gallery images
  aspectRatio?: string; // For setting specific aspect ratios
  containerClassName?: string; // For styling the container
  fetchPriority?: 'high' | 'low' | 'auto'; // For LCP optimization
  isAboveFold?: boolean; // For fullWidth images to determine priority
  enableBlurPlaceholder?: boolean; // Override blur placeholder setting
};

/**
 * OptimizedImage component - A wrapper around Next.js Image component
 * that automatically applies performance optimizations
 */
export function OptimizedImage({
  imageType = 'default',
  index = 0,
  aspectRatio,
  containerClassName,
  className,
  fetchPriority,
  isAboveFold = false,
  enableBlurPlaceholder,
  ...props
}: OptimizedImageProps) {
  // Apply image-type specific optimizations
  const optimizedProps = (() => {
    switch (imageType) {
      case 'hero':
        return optimizeHeroImage(props);
      case 'gallery':
        return optimizeGalleryImage(props, index);
      case 'avatar':
        return optimizeAvatarImage(props);
      case 'content':
        return optimizeContentImage(props);
      case 'fullWidth':
        return optimizeFullWidthImage(props, isAboveFold);
      default:
        return optimizeImageProps({
          ...props,
          type: imageType as any,
          fetchPriority,
          enableBlurPlaceholder,
        });
    }
  })();

  // If using fill, we need to wrap in a container with relative positioning
  if (optimizedProps.fill) {
    // Apply responsive aspect ratio if provided
    const aspectRatioClass = aspectRatio ? `aspect-${aspectRatio}` : '';

    // Build image props with all optimizations
    const imageProps: any = {
      src: props.src,
      alt: props.alt,
      fill: true,
      sizes: optimizedProps.sizes || '100vw',
      quality: optimizedProps.quality,
      priority: optimizedProps.priority,
      loading: !optimizedProps.priority ? optimizedProps.loading || 'lazy' : undefined,
      className: `object-cover ${className || ''}`,
    };

    // Add fetchPriority if available
    if (fetchPriority || (optimizedProps as any).fetchPriority) {
      imageProps.fetchPriority = fetchPriority || (optimizedProps as any).fetchPriority;
    }

    // Add blur placeholder if available
    if (optimizedProps.placeholder === 'blur' && optimizedProps.blurDataURL) {
      imageProps.placeholder = 'blur';
      imageProps.blurDataURL = optimizedProps.blurDataURL;
    }

    return (
      <div
        className={`
          relative overflow-hidden
          ${aspectRatioClass}
          ${containerClassName || ''}
        `}
        style={!aspectRatioClass ? { height: '100%' } : undefined}
      >
        <Image {...imageProps} />
      </div>
    );
  }

  // For non-fill images, build optimized props
  const imageProps: any = {
    src: props.src,
    alt: props.alt,
    width: optimizedProps.width,
    height: optimizedProps.height,
    quality: optimizedProps.quality,
    priority: optimizedProps.priority,
    loading: !optimizedProps.priority ? optimizedProps.loading || 'lazy' : undefined,
    sizes: optimizedProps.sizes,
    className,
  };

  // Add fetchPriority if available
  if (fetchPriority || (optimizedProps as any).fetchPriority) {
    imageProps.fetchPriority = fetchPriority || (optimizedProps as any).fetchPriority;
  }

  // Add blur placeholder if available
  if (optimizedProps.placeholder === 'blur' && optimizedProps.blurDataURL) {
    imageProps.placeholder = 'blur';
    imageProps.blurDataURL = optimizedProps.blurDataURL;
  }

  return <Image {...imageProps} />;
}

/**
 * HeroImage component - Specialized for hero images
 */
export function HeroImage(props: Omit<OptimizedImageProps, 'imageType'>) {
  return <OptimizedImage {...props} imageType="hero" />;
}

/**
 * GalleryImage component - Specialized for gallery images
 */
export function GalleryImage({
  index = 0,
  ...props
}: Omit<OptimizedImageProps, 'imageType'> & { index?: number }) {
  return <OptimizedImage {...props} imageType="gallery" index={index} />;
}

/**
 * AvatarImage component - Specialized for avatar images
 */
export function AvatarImage(props: Omit<OptimizedImageProps, 'imageType'>) {
  return <OptimizedImage {...props} imageType="avatar" />;
}

/**
 * ContentImage component - Specialized for images within content/articles
 */
export function ContentImage(props: Omit<OptimizedImageProps, 'imageType'>) {
  return <OptimizedImage {...props} imageType="content" />;
}

/**
 * FullWidthImage component - Specialized for full-width images like maps, banners
 */
export function FullWidthImage({
  isAboveFold = false,
  ...props
}: Omit<OptimizedImageProps, 'imageType'> & { isAboveFold?: boolean }) {
  return <OptimizedImage {...props} imageType="fullWidth" isAboveFold={isAboveFold} />;
}

export default OptimizedImage;
