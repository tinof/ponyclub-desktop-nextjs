"use client"

import ActivityPageLayout from "@/components/ActivityPageLayout"; // Import the layout
import { useLanguage } from "@/contexts/language-context"; // Keep useLanguage
import { Gallery } from "@/components/ui/Gallery"; // Import Gallery component
import { ridingGalleryImages } from "@/lib/gallery-data"; // Import riding gallery images

export default function RidingPage() {
  const { t } = useLanguage(); // Get translations object

  // Use translations for content sections
  const descriptionContent = (
    // Use dangerouslySetInnerHTML to render the HTML string from translation
    <div dangerouslySetInnerHTML={{ __html: t.riding.descriptionContent }} />
  );

  // Use the provided detailsContent 
  const detailsContent = (
    <div dangerouslySetInnerHTML={{ __html: t.riding.detailsContent }} />
  );

  // Define pricing content using Program translations - now in a single column
  const pricingContent = (
    <div className="flex flex-col gap-6">
      {/* Program 1 */}
      <div className="program-card frosted-card bg-[#c27a5f] relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
        <div className="absolute inset-0 bg-pattern opacity-20 mix-blend-overlay"></div>
        <div className="relative m-4 p-6 backdrop-blur-md bg-white/30 border border-white/25 rounded-xl shadow-xl flex flex-col items-center text-stone-800">
          <div className="absolute -inset-[1px] -z-10 rounded-xl bg-gradient-to-tr from-[#c27a5f]/30 via-white/40 to-[#c27a5f]/30 blur-[2px]"></div>
          <h3 className="gradient-text text-2xl mb-4 font-bold animate-text-shine">{t.programs.program1.title}</h3>
          <ul className="space-y-2 text-center">
            <li className="drop-shadow-sm">{t.programs.program1.rafting}</li>
            <li className="drop-shadow-sm">{t.programs.program1.riding}</li>
            <li className="drop-shadow-sm mb-4">{t.programs.program1.hiking}</li>
            <li className="font-bold text-xl mb-1 text-shadow-sm">{t.programs.program1.priceAdults}</li>
            <li className="font-medium">{t.programs.program1.priceChildren}</li>
          </ul>
        </div>
      </div>

      {/* Program 2 */}
      <div className="program-card frosted-card bg-[#6b8362] relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
        <div className="absolute inset-0 bg-pattern opacity-20 mix-blend-overlay"></div>
        <div className="relative m-4 p-6 backdrop-blur-md bg-white/30 border border-white/25 rounded-xl shadow-xl flex flex-col items-center text-white">
          <div className="absolute -inset-[1px] -z-10 rounded-xl bg-gradient-to-tr from-[#6b8362]/30 via-white/40 to-[#6b8362]/30 blur-[2px]"></div>
          <h3 className="gradient-text text-2xl mb-4 font-bold animate-text-shine">{t.programs.program2.title}</h3>
          <ul className="space-y-2 text-center">
            <li className="drop-shadow-sm">{t.programs.program2.kayak}</li>
            <li className="drop-shadow-sm">{t.programs.program2.riding}</li>
            <li className="drop-shadow-sm mb-4">{t.programs.program2.hiking}</li>
            <li className="font-bold text-xl mb-1 text-shadow-sm">{t.programs.program2.price}</li>
          </ul>
        </div>
      </div>
      
      {/* Riding Gallery */}
      <div className="mt-8">
        <Gallery 
          images={ridingGalleryImages} 
          title={t.gallery?.ridingTitle || "Horse Riding Gallery"} 
          ariaLabel={t.gallery?.ridingAriaLabel || "Horse riding photo gallery at Acheron River"}
        />
      </div>
    </div>
  );

  return (
    <ActivityPageLayout
      // Use translated titles and alt text
      title={t.riding.pageTitle}
      subtitle={t.riding.pageSubtitle}
      heroImageSrc="/images/round2.jpg" // Keep specific image for riding
      heroImageAlt={t.riding.heroAlt}
      // Use translated section titles
      descriptionTitle={t.riding.descriptionTitle}
      descriptionContent={descriptionContent}
      detailsTitle={t.riding.detailsTitle}
      detailsContent={detailsContent}
      // No separate pricing title needed as titles are in the programs
      // pricingTitle={t.riding.pricingTitle} // REMOVED
      pricingContent={pricingContent}
      useSingleColumn={true} // Add a flag to use single column layout
    />
  );
}
