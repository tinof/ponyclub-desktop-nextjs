'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';

export default function DynamicGoogleMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div
        className={`
          h-[400px] w-full overflow-hidden rounded-lg border border-amber-100/70
          shadow-xl transition-shadow duration-300 flex items-center justify-center
          bg-gray-50
        `}
      >
        <p className="text-gray-500">
          Map unavailable - API key not configured
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        h-[400px] w-full overflow-hidden rounded-lg border border-amber-100/70
        shadow-xl transition-shadow duration-300
        hover:shadow-2xl
      `}
    >
      <GoogleMapsEmbed
        apiKey={apiKey}
        height={400}
        width="100%"
        mode="place"
        q="Pony+Club+Acheron"
        loading="lazy"
        allowfullscreen
        style="border: 0;"
      />
    </div>
  );
}
