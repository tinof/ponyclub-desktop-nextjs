'use client'

import { MapPin, Minus, Navigation, Plus } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ScriptLoader } from '@/components/ui/script-loader'
import { useGDPR } from '@/contexts/gdpr-context'

// Business coordinates for Pony Club Acheron
const BUSINESS_COORDINATES = { lat: 39.3257662, lng: 20.6069899 }
const BUSINESS_NAME = 'Pony Club Acheron'
const DEFAULT_ZOOM = 16 // 2 levels closer than previous 14

export default function GoogleMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const mapRef = useRef<HTMLDivElement>(null)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { consent } = useGDPR()

  // Custom zoom control handlers
  const handleZoomIn = useCallback(() => {
    if (map) {
      const currentZoom = map.getZoom() || DEFAULT_ZOOM
      map.setZoom(currentZoom + 1)
    }
  }, [map])

  const handleZoomOut = useCallback(() => {
    if (map) {
      const currentZoom = map.getZoom() || DEFAULT_ZOOM
      map.setZoom(Math.max(currentZoom - 1, 1)) // Minimum zoom level 1
    }
  }, [map])

  // Get directions to business
  const handleGetDirections = useCallback(() => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_COORDINATES.lat},${BUSINESS_COORDINATES.lng}&destination_place_id=ChIJYZ6W_v9zXBMRSyYk4s7OGBg`
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  // Keyboard navigation support
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, action: 'zoomIn' | 'zoomOut' | 'directions') => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        switch (action) {
          case 'zoomIn':
            handleZoomIn()
            break
          case 'zoomOut':
            handleZoomOut()
            break
          case 'directions':
            handleGetDirections()
            break
        }
      }
    },
    [handleZoomIn, handleZoomOut, handleGetDirections]
  )

  // Set up global callback for Google Maps
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ;(window as any).initGoogleMaps = () => {
        console.log('Google Maps API ready via callback')
        setIsScriptLoaded(true)
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).initGoogleMaps
      }
    }
  }, [])

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !apiKey || !isScriptLoaded || !consent?.analytics) return

    // Check if Google Maps API is fully loaded and Map constructor is available
    if (
      (window as any).google &&
      (window as any).google.maps &&
      (window as any).google.maps.Map &&
      typeof (window as any).google.maps.Map === 'function'
    ) {
      try {
        setIsLoading(true)
        setError(null)

        const mapInstance = new (window as any).google.maps.Map(mapRef.current, {
          center: BUSINESS_COORDINATES,
          zoom: DEFAULT_ZOOM,
          mapTypeId: 'roadmap',
          zoomControl: false, // Disable default zoom controls
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: (window as any).google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: (window as any).google.maps.ControlPosition.TOP_CENTER,
          },
          streetViewControl: true,
          streetViewControlOptions: {
            position: (window as any).google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: (window as any).google.maps.ControlPosition.RIGHT_TOP,
          },
          gestureHandling: 'cooperative', // Better mobile experience
        })

        // Create enhanced marker
        const marker = new (window as any).google.maps.Marker({
          position: BUSINESS_COORDINATES,
          map: mapInstance,
          title: BUSINESS_NAME,
          animation: (window as any).google.maps.Animation.DROP,
        })

        // Create info window with business details (CSP-compliant - no inline scripts)
        const infoWindowContent = document.createElement('div')
        infoWindowContent.style.cssText = 'padding: 10px; font-family: system-ui, -apple-system, sans-serif;'

        const title = document.createElement('h3')
        title.style.cssText = 'margin: 0 0 8px 0; color: #6b8362; font-size: 16px; font-weight: bold;'
        title.textContent = BUSINESS_NAME

        const subtitle = document.createElement('p')
        subtitle.style.cssText = 'margin: 0 0 8px 0; color: #666; font-size: 14px;'
        subtitle.textContent = 'Adventure Tourism & Ecotourism'

        const activities = document.createElement('p')
        activities.style.cssText = 'margin: 0 0 10px 0; color: #666; font-size: 13px;'
        activities.textContent = 'Rafting • Horse Riding • Trekking'

        const directionsButton = document.createElement('button')
        directionsButton.style.cssText = `
          background: #6b8362;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: background-color 0.2s ease;
        `
        directionsButton.textContent = 'Get Directions'

        // Add proper event listeners (CSP-compliant)
        directionsButton.addEventListener('click', () => {
          window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_COORDINATES.lat},${BUSINESS_COORDINATES.lng}`,
            '_blank'
          )
        })

        directionsButton.addEventListener('mouseenter', () => {
          directionsButton.style.background = '#5a6f53'
        })

        directionsButton.addEventListener('mouseleave', () => {
          directionsButton.style.background = '#6b8362'
        })

        // Assemble the info window content
        infoWindowContent.appendChild(title)
        infoWindowContent.appendChild(subtitle)
        infoWindowContent.appendChild(activities)
        infoWindowContent.appendChild(directionsButton)

        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: infoWindowContent,
        })

        // Open info window when marker is clicked
        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker)
        })

        setMap(mapInstance)
        setIsLoading(false)
        console.log('Google Maps initialized successfully')
      } catch (error) {
        console.error('Error initializing Google Maps:', error)
        setError('Failed to load map. Please try refreshing the page.')
        setIsLoading(false)
        // Retry after a short delay
        setTimeout(() => {
          initializeMap()
        }, 2000)
      }
    } else {
      console.log('Google Maps API not fully loaded yet, retrying...')
      // Retry after a short delay if the API isn't ready
      setTimeout(() => {
        initializeMap()
      }, 100)
    }
  }, [apiKey, isScriptLoaded, consent])

  // Initialize map when dependencies are ready
  useEffect(() => {
    if (!apiKey) {
      console.error(
        'Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.'
      )
      setError('API Key configuration is missing.')
      setIsLoading(false)
      return
    }

    if (!consent?.analytics) {
      console.log('Google Maps not loaded - analytics consent required', { consent })
      setIsLoading(false)
      if (consent === null) {
        setError('Please accept analytics cookies in the banner below to view the interactive map.')
      } else {
        setError(
          'Analytics cookies are required to display the interactive map. You can change your preferences in the cookie settings.'
        )
      }
      return
    }

    initializeMap()
  }, [apiKey, initializeMap, consent])

  // Global keyboard shortcuts for map
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when map container is focused or when no input is focused
      const activeElement = document.activeElement
      const isInputFocused = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA'

      if (!isInputFocused && mapRef.current?.contains(activeElement as Node)) {
        switch (event.key) {
          case '+':
          case '=':
            event.preventDefault()
            handleZoomIn()
            break
          case '-':
          case '_':
            event.preventDefault()
            handleZoomOut()
            break
          case 'd':
          case 'D':
            if (event.ctrlKey || event.metaKey) {
              event.preventDefault()
              handleGetDirections()
            }
            break
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleZoomIn, handleZoomOut, handleGetDirections])

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className='h-[400px] w-full rounded-lg shadow-xl bg-gray-200 animate-pulse border border-amber-100/70'>
      <div className='h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
          <p className='text-gray-600 font-medium'>Loading map...</p>
        </div>
      </div>
    </div>
  )

  if (!apiKey) {
    return (
      <div className='h-[400px] w-full rounded-lg shadow-xl bg-gray-200 flex items-center justify-center text-center p-4 border border-amber-100/70'>
        <div>
          <MapPin className='w-12 h-12 text-red-500 mx-auto mb-3' />
          <p className='text-red-600 font-semibold'>
            Map cannot be displayed. <br /> API Key configuration is missing.
          </p>
        </div>
      </div>
    )
  }

  if (!consent?.analytics) {
    return (
      <div className='h-[400px] w-full rounded-lg shadow-xl bg-gray-200 flex items-center justify-center text-center p-4 border border-amber-100/70'>
        <div>
          <MapPin className='w-12 h-12 text-gray-500 mx-auto mb-3' />
          <p className='text-gray-600 font-semibold'>
            Map requires analytics consent to load. <br /> Please accept analytics cookies to view the map.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='h-[400px] w-full rounded-lg shadow-xl bg-gray-200 flex items-center justify-center text-center p-4 border border-amber-100/70'>
        <div>
          <MapPin className='w-12 h-12 text-red-500 mx-auto mb-3' />
          <p className='text-red-600 font-semibold mb-3'>{error}</p>
          <button
            onClick={() => {
              setError(null)
              setIsLoading(true)
              initializeMap()
            }}
            className='px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium'
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div
      className='relative h-[400px] w-full rounded-lg shadow-xl overflow-hidden border border-amber-100/70 hover:shadow-2xl transition-shadow duration-300'
      role='application'
      aria-label='Interactive map showing Pony Club Acheron location'
    >
      <ScriptLoader
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`}
        strategy='afterInteractive'
      />

      {/* Map container */}
      <div
        ref={mapRef}
        className='h-full w-full'
        style={{ border: 0 }}
        tabIndex={0}
        role='img'
        aria-label='Map showing Pony Club Acheron location at coordinates 39.3257662, 20.6069899'
      />

      {/* Custom zoom controls */}
      <div className='absolute top-4 right-4 flex flex-col gap-2 z-10' role='group' aria-label='Map zoom controls'>
        <button
          onClick={handleZoomIn}
          onKeyDown={e => handleKeyDown(e, 'zoomIn')}
          className='w-10 h-10 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-md flex items-center justify-center transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
          aria-label='Zoom in on map'
          title='Zoom in (+ key)'
          tabIndex={0}
        >
          <Plus className='w-5 h-5 text-gray-700' />
        </button>
        <button
          onClick={handleZoomOut}
          onKeyDown={e => handleKeyDown(e, 'zoomOut')}
          className='w-10 h-10 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-md flex items-center justify-center transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
          aria-label='Zoom out on map'
          title='Zoom out (- key)'
          tabIndex={0}
        >
          <Minus className='w-5 h-5 text-gray-700' />
        </button>
      </div>

      {/* Get directions button */}
      <div className='absolute bottom-4 right-4 z-10'>
        <button
          onClick={handleGetDirections}
          onKeyDown={e => handleKeyDown(e, 'directions')}
          className='px-4 py-2 bg-[#6b8362] hover:bg-[#5a6f53] text-white rounded-lg shadow-md flex items-center gap-2 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 font-medium text-sm'
          aria-label='Get directions to Pony Club Acheron'
          title='Get directions to our location'
          tabIndex={0}
        >
          <Navigation className='w-4 h-4' />
          <span className='hidden sm:inline'>Directions</span>
        </button>
      </div>
    </div>
  )
}
