"use client"

import ActivityPageLayout from "@/components/ActivityPageLayout"; // Import the layout
import { useLanguage } from "@/contexts/language-context"; // Keep useLanguage
import Image from "next/image"; // Import Image component
import { useState } from "react"; // Import useState for modal state

export default function TrekkingPage() {
  const { t } = useLanguage(); // Get translations object (though not used for titles yet)
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  // Define content sections using JSX with the updated content
  const descriptionContent = (
    <div className="space-y-4">
      <p>Simple tour of the sources. It takes place throughout the year and is preferred by almost all visitors.</p>
      <p>Glyki, Springs of Acheron river.</p>
      <p>Duration 15 min – 1 h. Easy path to walk with children and to see the river area and the springs.</p>
      <p>Glyki, Tzavelaina staircase, Dala bridge return through the river gorge. Duration 2 hours, takes place from May to early October.</p>
      <p>Souli, Dala bridge, Glyki. Duration 3-4 hours, moderate, and it is usually preferred by mountaineering and nature clubs.</p>
      <p>Mills of Souli – Acheron sources. Experts consider it one of the most beautiful and exciting routes in Greece. Duration 3-4 hours, and it is moderate to difficult. It takes place from May to early October, because for most of the route we walk in the water.</p>
      <p>Our company is the only one in the field that provides guides and organizes these routes.</p>
    </div>
  );

  const detailsContent = (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-bold text-[#c27a5f] mb-2">What's Included</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Professional guide</li>
          <li>Trail maps</li>
          <li>Walking sticks (if needed)</li>
          <li>Light refreshments</li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#c27a5f] mb-2">What to Bring</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Comfortable hiking shoes</li>
          <li>Weather-appropriate clothing</li>
          <li>Water bottle</li>
          <li>Camera</li>
        </ul>
      </div>
    </div>
  );

  // Replace pricing content with map image
  const mapContent = (
    <div className="mt-4">
      <div 
        className="relative w-full h-[400px] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image 
          src="/images/ponyClub_map.jpg" 
          alt="Trekking Routes Map" 
          fill 
          className="object-contain"
        />
      </div>
      <p className="text-center text-sm mt-2 text-gray-500 italic">Click on map to enlarge</p>
      
      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-full max-w-7xl h-[90vh]">
            <Image 
              src="/images/ponyClub_map.jpg" 
              alt="Trekking Routes Map" 
              fill 
              className="object-contain"
              priority
            />
            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-2 text-black"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              aria-label="Close map"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ActivityPageLayout
      title="Trekking" // TODO: Replace with t.trekking.title or similar once added
      subtitle="through Nature" // TODO: Replace with t.trekking.subtitle or similar once added
      heroImageSrc="/images/round1.jpg" // Specific image for trekking
      heroImageAlt="Trekking near Acheron River" // TODO: Replace with t.trekking.heroAlt or similar once added
      // Using hardcoded titles for now as keys are missing in translations
      descriptionTitle="Trekking Adventure"
      descriptionContent={descriptionContent}
      detailsTitle="Details & Requirements"
      detailsContent={detailsContent}
      pricingTitle="Trekking Routes Map"
      pricingContent={mapContent}
    />
  );
}
