'use client'

import dynamic from 'next/dynamic'
import React, { useState, useEffect, useRef } from 'react'

// Dynamically import GoogleMap with ssr: false
const GoogleMapComponent = dynamic(() => import('@/components/google-map'), {
  ssr: false,
  loading: () => (
    <div className='h-[400px] w-full bg-gray-200 animate-pulse rounded-lg shadow-xl border border-amber-100/70' />
  ),
})

export default function DynamicGoogleMap() {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.unobserve(entry.target) // Stop observing once visible
        }
      },
      {
        rootMargin: '100px', // Load when the map is 100px away from viewport
      }
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current)
      }
    }
  }, [])

  return (
    <div ref={mapRef} className='h-[400px] w-full'>
      {' '}
      {/* Container for observer and to maintain space */}
      {isIntersecting ? (
        <GoogleMapComponent />
      ) : (
        <div className='h-[400px] w-full bg-gray-200 animate-pulse rounded-lg shadow-xl border border-amber-100/70' />
      )}
    </div>
  )
}
