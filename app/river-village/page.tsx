"use client"

import ActivityPageLayout from "@/components/ActivityPageLayout";
import { useLanguage } from "@/contexts/language-context";
import { OptimizedImage } from "@/components/ui/OptimizedImage"; // Import OptimizedImage

export default function RiverVillagePage() {
  const { t, language } = useLanguage();

  // Use dangerouslySetInnerHTML to render content from translations
  const descriptionContent = (
    <div dangerouslySetInnerHTML={{ __html: t.riverVillage.descriptionContent }} />
  );

  // Add Natura 2000 logo to the details content
  const detailsContent = (
    <div>
      <div dangerouslySetInnerHTML={{ __html: t.riverVillage.detailsContent }} />
      
      {/* Natura 2000 logo */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-center text-sm text-gray-600 italic mb-3">
          {language === "en" ? "Protected by EU's Natura 2000 program" : "Προστατεύεται από το πρόγραμμα Natura 2000 της ΕΕ"}
        </p>
        <div className="relative w-48 h-32 bg-white/90 p-3 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow">
          <OptimizedImage 
            src="/images/natura_2000.png" 
            alt="Natura 2000 Logo" 
            fill 
            className="object-contain"
            imageType="logo" // Specify imageType as logo
          />
          <div className="absolute -inset-[0.5px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/20 via-[#6b8362]/30 to-transparent blur-sm"></div>
        </div>
      </div>
    </div>
  );
  
  return (
    <ActivityPageLayout
      title={t.riverVillage.pageTitle}
      subtitle={t.riverVillage.pageSubtitle}
      heroImageSrc="/images/round1.jpg"
      heroImageAlt={t.riverVillage.heroAlt}
      descriptionTitle={t.riverVillage.descriptionTitle}
      descriptionContent={descriptionContent}
      detailsTitle={t.riverVillage.detailsTitle}
      detailsContent={detailsContent}
      pricingTitle=""
      pricingContent={null}
    />
  );
}
