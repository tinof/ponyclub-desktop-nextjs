'use client'

import dynamic from 'next/dynamic'
import React from 'react'

// Dynamically import Gallery with ssr: false
const Gallery = dynamic(() => import('@/components/ui/Gallery').then(mod => mod.Gallery), {
  ssr: false,
  loading: () => <div className='h-96 w-full bg-gray-200 animate-pulse rounded-lg' />,
})

type GalleryImage = {
  src: string
  alt: string
}

type DynamicGalleryProps = {
  images: GalleryImage[]
  title: string
  ariaLabel: string
}

export default function DynamicGallery({ images, title, ariaLabel }: DynamicGalleryProps) {
  return <Gallery images={images} title={title} ariaLabel={ariaLabel} />
}
