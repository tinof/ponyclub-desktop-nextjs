"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ScriptLoader } from "./ui/script-loader";
import { useGDPR } from "@/contexts/gdpr-context";

export default function GoogleMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { consent } = useGDPR();

  // Set up global callback for Google Maps
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).initGoogleMaps = () => {
        console.log('Google Maps API ready via callback');
        setIsScriptLoaded(true);
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).initGoogleMaps;
      }
    };
  }, []);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !apiKey || !isScriptLoaded || !consent?.analytics) return;

    // Check if Google Maps API is fully loaded and Map constructor is available
    if (
      (window as any).google && 
      (window as any).google.maps && 
      (window as any).google.maps.Map &&
      typeof (window as any).google.maps.Map === 'function'
    ) {
      try {
        const map = new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: 39.2167, lng: 20.7167 }, // Coordinates for Glyki, Greece
          zoom: 14,
          mapTypeId: "roadmap",
        });

        const marker = new (window as any).google.maps.Marker({
          position: { lat: 39.2167, lng: 20.7167 },
          map,
          title: "Pony Club Ecotourism",
        });
        
        console.log('Google Maps initialized successfully');
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        // Retry after a short delay
        setTimeout(() => {
          initializeMap();
        }, 500);
      }
    } else {
      console.log('Google Maps API not fully loaded yet, retrying...');
      // Retry after a short delay if the API isn't ready
      setTimeout(() => {
        initializeMap();
      }, 100);
    }
  }, [apiKey, isScriptLoaded]);

  useEffect(() => {
    if (!apiKey) {
      console.error(
        "Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file."
      );
      return;
    }

    if (!consent?.analytics) {
      console.log("Google Maps not loaded - analytics consent required");
      return;
    }

    initializeMap();
  }, [apiKey, initializeMap, consent]);



  if (!apiKey) {
    return (
      <div className="h-[400px] w-full rounded-lg shadow-xl bg-gray-200 flex items-center justify-center text-center p-4 border border-amber-100/70">
        <p className="text-red-600 font-semibold">
          Map cannot be displayed. <br /> API Key configuration is missing.
        </p>
      </div>
    );
  }

  if (!consent?.analytics) {
    return (
      <div className="h-[400px] w-full rounded-lg shadow-xl bg-gray-200 flex items-center justify-center text-center p-4 border border-amber-100/70">
        <p className="text-gray-600 font-semibold">
          Map requires analytics consent to load. <br /> Please accept analytics cookies to view the map.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] w-full rounded-lg shadow-xl overflow-hidden border border-amber-100/70 hover:shadow-2xl transition-shadow duration-300">
      <ScriptLoader
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`}
        strategy="afterInteractive"
      />
      <div ref={mapRef} className="h-full w-full" style={{ border: 0 }} />
    </div>
  );
}
