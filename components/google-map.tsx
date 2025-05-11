"use client"

import { GoogleMapsEmbed } from '@next/third-parties/google'

export default function GoogleMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  // Use your business name and location so Google shows the place info card
  const placeQuery = "Pony Club Ecotourism, Glyki, Greece"

  // Handle case where API key might not be set
  if (!apiKey) {
    console.error(
      "Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file."
    )
    // Optionally return a placeholder or error message
    return (
      <div className="h-[400px] w-full rounded-lg shadow-xl bg-gray-200 flex items-center justify-center text-center p-4 border border-amber-100/70">
        <p className="text-red-600 font-semibold">
          Map cannot be displayed. <br /> API Key configuration is missing.
        </p>
      </div>
    )
  }

  return (
    <div className="relative h-[400px] w-full rounded-lg shadow-xl overflow-hidden border border-amber-100/70 hover:shadow-2xl transition-shadow duration-300">
      <GoogleMapsEmbed
        apiKey={apiKey}
        mode="place"
        q={placeQuery}
        height="100%" // The component expects a number for pixels or string for percentage
        width="100%"
        style="border:0;" // style prop takes a string
        allowfullscreen
        loading="lazy" // Default is lazy, but can be explicit
        zoom="14" // Zoom is a string for this component
        maptype="roadmap"
      />
      {/* This decorative border might need adjustment if GoogleMapsEmbed adds its own borders or structure */}
      <div className="absolute inset-0 pointer-events-none border rounded-lg border-amber-200/30"></div>
    </div>
  )
}
