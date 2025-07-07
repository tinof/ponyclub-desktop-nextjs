"use client";

import dynamic from "next/dynamic";

// Dynamically import Gallery with ssr: false
const Gallery = dynamic(
  () =>
    import(/* webpackChunkName: "gallery" */ "@/components/ui/Gallery").then(
      (mod) => mod.Gallery
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className={`
      h-96 w-full animate-pulse rounded-lg bg-gray-200 flex items-center justify-center
    `}
      >
        <span className="text-gray-500">Loading gallery...</span>
      </div>
    ),
  }
);

type GalleryImage = {
  src: string;
  alt: string;
};

type DynamicGalleryProps = {
  images: GalleryImage[];
  title: string;
  ariaLabel: string;
};

export default function DynamicGallery({
  images,
  title,
  ariaLabel,
}: DynamicGalleryProps) {
  return <Gallery images={images} title={title} ariaLabel={ariaLabel} />;
}
