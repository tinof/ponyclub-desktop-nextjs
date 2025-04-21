"use client"

interface GoogleMapProps {
  apiKey?: string
}

export default function GoogleMap({ apiKey = "AIzaSyBwaJVGFhnhN-WKtiLn6KSa7PvRrauytHQ" }: GoogleMapProps) {
  const coordinates = "39.32581744774602,20.606971798121965";
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&center=${coordinates}&q=${coordinates}&zoom=14&maptype=roadmap`;

  return (
    <div className="h-[400px] w-full rounded-lg shadow-md overflow-hidden relative">
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
    </div>
  )
} 