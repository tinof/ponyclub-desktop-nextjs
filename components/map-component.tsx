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
  return <MapWithNoSSR />
}
