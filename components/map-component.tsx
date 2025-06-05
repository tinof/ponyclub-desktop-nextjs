"use client"
import dynamic from "next/dynamic"

// Create a placeholder component to show while map is loading
function MapPlaceholder() {
  return (
    <div className="h-[400px] w-full rounded-lg shadow-md bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
}

// Create the actual map component that will be dynamically imported
const MapWithNoSSR = dynamic(() => import("./map-with-no-ssr"), {
  ssr: false,
  loading: MapPlaceholder,
})

export default function MapComponent() {
  // Acheron River coordinates in Greece
  const acheronRiverCoordinates: [number, number] = [39.2369, 20.5247]
  
  const markers = [
    {
      position: acheronRiverCoordinates,
      popup: "<b>Acheron River</b><br>1-day excursion starting point"
    }
  ]

  return (
    <MapWithNoSSR 
      center={acheronRiverCoordinates}
      zoom={13}
      markers={markers}
      className="h-[400px] w-full rounded-lg shadow-md z-10"
    />
  )
}
