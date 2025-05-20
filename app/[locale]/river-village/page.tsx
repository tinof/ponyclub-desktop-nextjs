"use client"

import ActivityPageLayout from "@/components/ActivityPageLayout";
import { useLanguage } from "@/contexts/language-context";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Roboto_Slab } from 'next/font/google';

// Define Roboto Slab font instance
const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  variable: '--font-roboto-slab',
  weight: ['400', '700', '900'],
});

export default function RiverVillagePage() {
  const { t, language } = useLanguage();

  // Enhanced description content with glassmorphism effect
  const descriptionContent = (
    <div className="relative p-6 rounded-2xl overflow-hidden group transform hover:scale-[1.01] transition-all duration-500 shadow-xl">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#f5f0e8]/95 via-white/90 to-[#f5f0e8]/95 backdrop-blur-md rounded-2xl"></div>
      <div className="absolute inset-0 -z-20 bg-[#6b8362]/5 rounded-2xl"></div>
      
      {/* Decorative effects */}
      <div className="absolute -inset-[3px] -z-10 rounded-2xl pointer-events-none opacity-70">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-amber-200/30 via-transparent to-[#6b8362]/20"></div>
      </div>
      <div className="absolute inset-0 rounded-2xl border border-amber-200/30 pointer-events-none"></div>
      
      {/* Title with underline effect */}
      <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl font-bold text-[#3E5A35] mb-6 relative inline-block`}>
        {t.riverVillage.descriptionTitle}
        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
      </h2>
      
      {/* Content */}
      <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: t.riverVillage.descriptionContent }} />
    </div>
  );

  // Enhanced details content with Natura 2000 logo
  const detailsContent = (
    <div className="relative p-6 rounded-2xl overflow-hidden group transform hover:scale-[1.01] transition-all duration-500 shadow-xl">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#f5f0e8]/95 via-white/90 to-[#f5f0e8]/95 backdrop-blur-md rounded-2xl"></div>
      <div className="absolute inset-0 -z-20 bg-[#6b8362]/5 rounded-2xl"></div>
      
      {/* Decorative effects */}
      <div className="absolute -inset-[3px] -z-10 rounded-2xl pointer-events-none opacity-70">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-amber-200/30 via-transparent to-[#6b8362]/20"></div>
      </div>
      <div className="absolute inset-0 rounded-2xl border border-amber-200/30 pointer-events-none"></div>
      
      {/* Title with underline effect */}
      <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl font-bold text-[#3E5A35] mb-6 relative inline-block`}>
        {t.riverVillage.detailsTitle}
        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
      </h2>
      
      {/* Content */}
      <div className="prose max-w-none text-gray-700">
        <div dangerouslySetInnerHTML={{ __html: t.riverVillage.detailsContent }} />
        
        {/* Natura 2000 logo with enhanced styling */}
        <div className="mt-8 flex flex-col items-center">
          <p className="text-center text-sm text-gray-600 italic mb-3">
            {language === "en" ? "Protected by EU's Natura 2000 program" : "Προστατεύεται από το πρόγραμμα Natura 2000 της ΕΕ"}
          </p>
          <div className="relative w-48 h-32 bg-white/80 p-3 rounded-xl shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
            <OptimizedImage 
              src="/images/natura_2000.png" 
              alt="Natura 2000 Logo" 
              fill 
              className="object-contain"
              imageType="logo"
            />
            <div className="absolute -inset-[1px] -z-10 rounded-xl bg-linear-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-xs"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <ActivityPageLayout
      title={t.riverVillage.pageTitle}
      subtitle={t.riverVillage.pageSubtitle}
      descriptionTitle=""
      descriptionContent={descriptionContent}
      detailsTitle={t.riverVillage.detailsTitle}
      detailsContent={detailsContent}
      pricingTitle=""
      pricingContent={null}
      useSingleColumn={true}
    />
  );
}
