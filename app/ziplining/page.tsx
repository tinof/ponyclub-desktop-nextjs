"use client"

import ActivityPageLayout from "@/components/ActivityPageLayout";
import { useLanguage } from "@/contexts/language-context";
import { zipliningGalleryImages } from "@/lib/gallery-data";
import DynamicGallery from "@/components/DynamicGallery";

export default function ZipliningPage() {
  const { t, language } = useLanguage();

  // Basic content for now, can be expanded later
  const descriptionContent = (
    <div className="space-y-4">
      <p>Experience the thrill of ziplining through the spectacular natural setting of Acheron River canyon. Our ziplines offer stunning views of the turquoise waters and lush greenery while providing an adrenaline rush like no other.</p>
      <p>Perfect for adventure seekers of all levels, our ziplining experience is conducted with the highest safety standards and professional guides.</p>
      <p>The activity takes approximately 30-40 minutes, depending on the number of participants.</p>
    </div>
  );

  const detailsContent = (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-[#c27a5f] mb-3 relative inline-block">
          What's Included
          <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c27a5f]/50 to-transparent"></div>
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Professional guides</li>
          <li>All safety equipment</li>
          <li>Brief training session</li>
          <li>Multiple zipline runs</li>
        </ul>
        <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#c27a5f]/20 blur-sm"></div>
      </div>
      <div className="relative bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-[#c27a5f] mb-3 relative inline-block">
          What to Bring
          <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c27a5f]/50 to-transparent"></div>
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Comfortable clothes</li>
          <li>Closed-toe shoes</li>
          <li>Sunscreen</li>
          <li>Water bottle</li>
        </ul>
        <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#c27a5f]/20 blur-sm"></div>
      </div>
    </div>
  );

  const pricingContent = (
    <div className="space-y-8">
      <div className="program-card frosted-card bg-[#6b8362] relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
        <div className="absolute inset-0 bg-pattern opacity-20 mix-blend-overlay"></div>
        <div className="relative m-4 p-6 backdrop-blur-md bg-white/30 border border-white/25 rounded-xl shadow-xl flex flex-col items-center text-white">
          <div className="absolute -inset-[1px] -z-10 rounded-xl bg-gradient-to-tr from-[#6b8362]/30 via-white/40 to-[#6b8362]/30 blur-[2px]"></div>
          <h3 className="gradient-text text-2xl mb-4 font-bold animate-text-shine">ZIPLINING ADVENTURE</h3>
          <ul className="space-y-2 text-center">
            <li>Multiple zipline segments</li>
            <li>Stunning canyon views</li>
            <li>Professional equipment & guides</li>
            <li className="font-bold text-xl mt-4">30 € per person</li>
          </ul>
        </div>
      </div>
      
      {/* Ziplining Gallery */}
      <DynamicGallery 
        images={zipliningGalleryImages} 
        title="Ziplining Photo Gallery" 
        ariaLabel="Ziplining adventure photo gallery at Acheron River" 
      />
    </div>
  );

  return (
    <ActivityPageLayout
      title="Ziplining"
      subtitle="Adventure"
      heroImageSrc="/images/Ziplining_OverBlueRiver_Natural_LushFoilage.jpg"
      heroImageAlt="Ziplining adventure over blue river with natural lush foliage"
      descriptionTitle="Thrilling Zipline Experience"
      descriptionContent={descriptionContent}
      detailsTitle="Experience Details"
      detailsContent={detailsContent}
      pricingTitle="Pricing & Gallery"
      pricingContent={pricingContent}
    />
  );
}
