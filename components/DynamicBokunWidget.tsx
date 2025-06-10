'use client'

import dynamic from 'next/dynamic'
import React, { useState, useEffect, useRef } from 'react'

// Dynamically import BokunWidget with ssr: false and a loading placeholder
const BokunWidget = dynamic(() => import('@/components/BokunWidget'), {
  ssr: false,
  loading: () => <div className='h-96 w-full bg-gray-200 animate-pulse rounded-lg' />,
})

type DynamicBokunWidgetProps = {
  experienceId: string
  partialView?: number
}

export default function DynamicBokunWidget({ experienceId, partialView }: DynamicBokunWidgetProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Load when the placeholder is intersecting or nearly intersecting
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect() // Stop observing once loaded
        }
      },
      {
        rootMargin: '200px 0px', // Load when 200px away from viewport
        threshold: 0.01, // Trigger even if only 1% is visible
      }
    )

    observer.observe(ref.current)

    // Cleanup observer on component unmount
    return () => {
      if (observer && ref.current) {
        observer.unobserve(ref.current)
      }
      observer.disconnect()
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  return (
    <div ref={ref} style={{ minHeight: '384px' }}>
      {' '}
      {/* Wrapper div for observer, with min-height matching placeholder */}
      {shouldLoad ? (
        <BokunWidget experienceId={experienceId} partialView={partialView} />
      ) : (
        // Render the loading placeholder defined in dynamic import
        <div className='h-96 w-full bg-gray-200 animate-pulse rounded-lg' />
      )}
    </div>
  )
}
