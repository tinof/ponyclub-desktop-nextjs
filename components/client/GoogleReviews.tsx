'use client'

import { useEffect } from 'react'
import { ReactGoogleReviews } from 'react-google-reviews'
import 'react-google-reviews/dist/index.css'

export default function GoogleReviews() {
  const featurableWidgetId = 'e22fc7c6-97ba-49d1-8391-7b5f236ffb84'

  useEffect(() => {
    // Add accessibility attributes and performance optimizations to Google Reviews elements
    const addAccessibilityAndPerformanceAttributes = () => {
      // Add aria-labels to navigation buttons
      const prevButton = document.querySelector('.css-1en7e4i')
      const nextButton = document.querySelector('.css-hzpebr')

      if (prevButton && !prevButton.getAttribute('aria-label')) {
        prevButton.setAttribute('aria-label', 'Previous review')
      }
      if (nextButton && !nextButton.getAttribute('aria-label')) {
        nextButton.setAttribute('aria-label', 'Next review')
      }

      // Add alt text and lazy loading to profile images
      const profileImages = document.querySelectorAll('.css-1pelb8y')
      profileImages.forEach((img, index) => {
        if (!img.getAttribute('alt')) {
          img.setAttribute('alt', `Google reviewer profile picture ${index + 1}`)
        }
        // Add lazy loading to profile images for better performance
        if (!img.getAttribute('loading')) {
          img.setAttribute('loading', 'lazy')
        }
        // Add decoding attribute for better performance
        if (!img.getAttribute('decoding')) {
          img.setAttribute('decoding', 'async')
        }
      })
    }

    // Run immediately and also after a delay to catch dynamically loaded content
    addAccessibilityAndPerformanceAttributes()
    const timer = setTimeout(addAccessibilityAndPerformanceAttributes, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`
        mt-6 mb-20 px-4
        md:px-8
      `}
    >
      <div className='mx-auto max-w-6xl rounded-2xl bg-white/90 p-4 shadow-md'>
        <ReactGoogleReviews layout='carousel' featurableId={featurableWidgetId} />
      </div>
    </div>
  )
}
