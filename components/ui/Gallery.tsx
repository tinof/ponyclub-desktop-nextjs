'use client';

import { useState } from 'react';

import { Dialog, DialogContent } from './dialog';
import { GalleryImage, OptimizedImage } from './OptimizedImage';

interface GalleryProps {
  images: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  title: string;
  ariaLabel?: string;
}

export function Gallery({
  images,
  title,
  ariaLabel = 'Photo gallery',
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div
      className={`
        relative rounded-lg border border-amber-100/70 bg-white/80 p-6 shadow-lg
        backdrop-blur-xs transition-shadow duration-300
        hover:shadow-xl
      `}
    >
      <h2
        className={`
          relative mb-4 inline-block text-2xl font-bold text-amber-800
        `}
      >
        {title}
        <div
          className={`
            absolute -bottom-1 left-0 h-[2px] w-full bg-linear-to-r
            from-transparent via-amber-500/50 to-transparent
          `}
        />
      </h2>

      <div
        className={`
          grid grid-cols-1 gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        `}
        role="region"
        aria-label={ariaLabel}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`
              relative h-64 cursor-pointer overflow-hidden rounded-xl border
              border-amber-100/70 shadow-md transition-all duration-300
              hover:scale-[1.02] hover:shadow-xl
            `}
            onClick={() => setSelectedImage(index)}
          >
            <GalleryImage
              src={image.src}
              alt={image.alt}
              fill
              index={index}
              className={`
              object-cover
            `}
            />
            <div
              className={`
                absolute inset-0 bg-linear-to-b from-black/5 to-transparent
              `}
            />
          </div>
        ))}
      </div>

      <div
        className={`
          absolute -inset-[1px] -z-10 rounded-lg bg-linear-to-tr
          from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-xs
        `}
      />

      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent
          className={`
            max-w-5xl overflow-hidden rounded-xl bg-white/90 p-0
            backdrop-blur-md
          `}
        >
          {selectedImage !== null && (
            <div className="relative h-[80vh]">
              <OptimizedImage // Use OptimizedImage here
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 90vw, 1024px"
                className="object-contain"
                priority // Keep priority for LCP candidate
                // imageType="default" // Or let OptimizedImage decide based on props
              />
              <button
                onClick={() => setSelectedImage(null)}
                className={`
                  absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2
                  backdrop-blur-xs
                  hover:bg-white
                `}
                aria-label="Close image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
