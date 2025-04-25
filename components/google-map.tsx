"use client"

// Removed GoogleMapProps interface and apiKey prop

export default function GoogleMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const coordinates = "39.32581744774602,20.606971798121965";

  // Handle case where API key might not be set
  if (!apiKey) {
    console.error("Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.");
    // Optionally return a placeholder or error message
    return (
      <div className="h-[400px] w-full rounded-lg shadow-xl bg-gray-200 flex items-center justify-center text-center p-4 border border-amber-100/70">
        <p className="text-red-600 font-semibold">Map cannot be displayed. <br /> API Key configuration is missing.</p>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&center=${coordinates}&q=${coordinates}&zoom=14&maptype=roadmap`;

  return (
    <div className="relative h-[400px] w-full rounded-lg shadow-xl overflow-hidden border border-amber-100/70 hover:shadow-2xl transition-shadow duration-300">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map of Acheron Adventures"
      ></iframe>
      <div className="absolute inset-0 pointer-events-none border rounded-lg border-amber-200/30"></div>
    </div>
  )
}
