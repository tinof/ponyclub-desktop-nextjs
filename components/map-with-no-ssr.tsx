"use client"

import { useEffect, useRef } from "react"

export default function MapWithNoSSR() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only import Leaflet on the client side
    const loadMap = async () => {
      if (typeof window === "undefined" || !mapRef.current) return

      try {
        // Dynamically import Leaflet
        const L = (await import("leaflet")).default

        // Import Leaflet CSS
        await import("leaflet/dist/leaflet.css")

        // Acheron River coordinates in Greece
        const acheronRiverCoordinates: [number, number] = [39.2369, 20.5247]

        // Initialize map
        const map = L.map(mapRef.current).setView(acheronRiverCoordinates, 13)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Add marker for Acheron River
        const marker = L.marker(acheronRiverCoordinates).addTo(map)
        marker.bindPopup("<b>Acheron River</b><br>1-day excursion starting point").openPopup()

        // Cleanup on unmount
        return () => {
          map.remove()
        }
      } catch (error) {
        console.error("Error loading map:", error)
        // Show fallback content if map fails to load
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
              <div class="text-center p-4">
                <p class="text-gray-700 mb-2">Map could not be loaded</p>
                <p class="text-sm text-gray-500">Please visit <a href="https://www.google.com/maps/search/Acheron+River,+Greece" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Google Maps</a> to view the location</p>
              </div>
            </div>
          `
        }
      }
    }

    loadMap()
  }, [])

  return <div ref={mapRef} className="h-[400px] w-full rounded-lg shadow-md z-10" />
}
