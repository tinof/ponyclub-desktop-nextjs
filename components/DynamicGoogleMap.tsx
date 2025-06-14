'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';

export default function DynamicGoogleMap() {
  return (
    <div
      className={`
        h-[400px] w-full overflow-hidden rounded-lg border border-amber-100/70
        shadow-xl transition-shadow duration-300
        hover:shadow-2xl
      `}
    >
      <GoogleMapsEmbed
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
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
