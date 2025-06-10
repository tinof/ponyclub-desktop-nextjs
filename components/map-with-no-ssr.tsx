'use client'

import L from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
})

interface MapProps {
  center: [number, number]
  zoom: number
  markers?: Array<{
    position: [number, number]
    popup?: string
  }>
  className?: string
}

export default function MapWithNoSSR({ center, zoom, markers = [], className = '' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    if (!mapRef.current) return

    const loadMap = async () => {
      try {
        const map = L.map(mapRef.current!).setView(center, zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map)

        // Add markers
        markers.forEach(({ position, popup }) => {
          const marker = L.marker(position).addTo(map)
          if (popup) {
            marker.bindPopup(popup)
          }
        })

        return () => {
          map.remove()
        }
      } catch (error) {
        console.error('Error loading map:', error)
        setMapError(true)
      }
    }

    loadMap()
  }, [center, zoom, markers])

  if (mapError) {
    return (
      <div className={`h-96 w-full ${className}`}>
        <div className='h-full w-full flex items-center justify-center bg-gray-100 rounded-lg'>
          <div className='text-center p-4'>
            <p className='text-gray-700 mb-2'>Map could not be loaded</p>
            <p className='text-sm text-gray-500'>
              Please visit{' '}
              <a
                href='https://www.google.com/maps/search/Acheron+River,+Greece'
                className='text-blue-500 underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                Google Maps
              </a>{' '}
              to view the location
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className={`h-96 w-full ${className}`} />
}
