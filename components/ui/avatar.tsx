'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import { cn } from '@/lib/utils';
// Import the specialized AvatarImage variant from OptimizedImage.tsx
import { AvatarImage as OptimizedAvatarImageVariant } from './OptimizedImage';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      `
      relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full
    `,
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

// Redefine AvatarImage as a simple functional component using the OptimizedAvatarImageVariant
// This removes ref forwarding capability from this specific AvatarImage component.
// Props are derived from OptimizedAvatarImageVariant's expected props.
// OptimizedAvatarImageVariant expects Omit<OptimizedImageProps, 'imageType'>
// OptimizedImageProps is Omit<ImageProps, 'src' | 'alt'> & { src: string; alt: string; ... }
// So, props will be Omit<ImageProps, 'src' | 'alt' | 'imageType'> & { src: string; alt: string; ... other OptimizedImageProps without imageType }
// For simplicity, let's use ComponentPropsWithoutRef from the imported variant.
type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof OptimizedAvatarImageVariant
> & {
  className?: string;
};

const AvatarImage = ({ className, ...props }: AvatarImageProps) => (
  <OptimizedAvatarImageVariant
    className={cn('aspect-square h-full w-full', className)}
    {...props} // Spread remaining props, src and alt must be provided by the user
  />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName; // Or a new name like "PonyClubOptimizedAvatarImage"

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      `
      flex h-full w-full items-center justify-center rounded-full bg-muted
    `,
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
