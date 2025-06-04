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

export function Gallery({ images, title, ariaLabel = 'Photo gallery' }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="relative bg-white/80 backdrop-blur-xs p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-amber-800 mb-4 relative inline-block">
        {title}
        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-amber-500/50 to-transparent"></div>
      </h2>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
        role="region" 
        aria-label={ariaLabel}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative h-64 cursor-pointer rounded-xl overflow-hidden shadow-md border border-amber-100/70 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            onClick={() => setSelectedImage(index)}
          >
            <GalleryImage
              src={image.src}
              alt={image.alt}
              fill
              index={index}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/5 to-transparent"></div>
          </div>
        ))}
      </div>
      
      <div className="absolute -inset-[1px] -z-10 rounded-lg bg-linear-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-xs"></div>
      
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl bg-white/90 backdrop-blur-md p-0 rounded-xl overflow-hidden">
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
                className="absolute top-4 right-4 bg-white/80 hover:bg-white backdrop-blur-xs p-2 rounded-full z-10"
                aria-label="Close image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
