"use client"

import { GoogleMapsEmbed } from '@next/third-parties/google'

export default function GoogleMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    console.error("Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.")
    return (
      <div className="h-[400px] w-full rounded-lg shadow-xl bg-gray-200 flex items-center justify-center text-center p-4 border border-amber-100/70">
        <p className="text-red-600 font-semibold">Map cannot be displayed. <br /> API Key configuration is missing.</p>
      </div>
    )
  }

  return (
    <div className="relative h-[400px] w-full rounded-lg shadow-xl overflow-hidden border border-amber-100/70 hover:shadow-2xl transition-shadow duration-300">
      <GoogleMapsEmbed
        apiKey={apiKey}
        mode="place"
        q="Pony Club Ecotourism, Glyki, Greece"
        height="400px" // Changed to string
        width="100%"
        style="border:0;" // Changed to string
        allowfullscreen // Changed to lowercase
        loading="lazy" // Default is lazy, but explicit is fine
        zoom="14" // zoom is a number according to docs, changed to string
        maptype="roadmap"
      />
      {/* Optional: if you still want the inner border overlay, though it might interfere with map interaction if not styled carefully */}
      {/* <div className="absolute inset-0 pointer-events-none border rounded-lg border-amber-200/30"></div> */}
    </div>
  )
}
