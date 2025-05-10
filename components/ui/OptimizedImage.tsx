'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { optimizeImageProps, optimizeHeroImage, optimizeGalleryImage } from '@/lib/image-optimization';

export type OptimizedImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
  imageType?: 'default' | 'hero' | 'gallery' | 'avatar' | 'logo' | 'thumbnail';
  index?: number; // For gallery images
  aspectRatio?: string; // For setting specific aspect ratios
  containerClassName?: string; // For styling the container
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
  ...props
}: OptimizedImageProps) {
  // Apply image-type specific optimizations
  const optimizedProps = (() => {
    switch (imageType) {
      case 'hero':
        return optimizeHeroImage(props);
      case 'gallery':
        return optimizeGalleryImage(props, index);
      default:
        return optimizeImageProps({ ...props, type: imageType as any });
    }
  })();
  
  // If using fill, we need to wrap in a container with relative positioning
  if (optimizedProps.fill) {
    // Apply responsive aspect ratio if provided
    const aspectRatioClass = aspectRatio 
      ? `aspect-${aspectRatio}` 
      : '';
      
    // For hero images, make sure we don't have both priority and loading
    const imageProps = imageType === 'hero' 
      ? { 
          src: props.src,
          alt: props.alt,
          fill: true,
          sizes: optimizedProps.sizes || "100vw",
          quality: optimizedProps.quality,
          priority: true,
          className: `object-cover ${className || ''}`
        }
      : {
          src: props.src,
          alt: props.alt,
          fill: true,
          sizes: optimizedProps.sizes || "100vw",
          quality: optimizedProps.quality,
          priority: optimizedProps.priority,
          loading: !optimizedProps.priority ? (optimizedProps.loading || 'lazy') : undefined,
          className: `object-cover ${className || ''}`
        };
      
    return (
      <div 
        className={`relative overflow-hidden ${aspectRatioClass} ${containerClassName || ''}`}
        style={!aspectRatioClass ? { height: '100%' } : undefined}
      >
        <Image
          {...imageProps}
        />
      </div>
    );
  }
  
  // For non-fill images, just render the optimized Image component
  // Make sure hero images don't have both priority and loading
  const imageProps = imageType === 'hero'
    ? {
        src: props.src,
        alt: props.alt,
        width: optimizedProps.width,
        height: optimizedProps.height,
        quality: optimizedProps.quality,
        priority: true,
        sizes: optimizedProps.sizes,
        className
      }
    : {
        src: props.src,
        alt: props.alt,
        width: optimizedProps.width,
        height: optimizedProps.height,
        quality: optimizedProps.quality,
        priority: optimizedProps.priority,
        loading: !optimizedProps.priority ? (optimizedProps.loading || 'lazy') : undefined,
        sizes: optimizedProps.sizes,
        className
      };
      
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
export function GalleryImage({ index = 0, ...props }: Omit<OptimizedImageProps, 'imageType'> & { index?: number }) {
  return <OptimizedImage {...props} imageType="gallery" index={index} />;
}

/**
 * AvatarImage component - Specialized for avatar images
 */
export function AvatarImage(props: Omit<OptimizedImageProps, 'imageType'>) {
  return <OptimizedImage {...props} imageType="avatar" />;
}

export default OptimizedImage; 