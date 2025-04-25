"use client"

import ActivityPageLayout from "@/components/ActivityPageLayout"; // Import the layout
import { useLanguage } from "@/contexts/language-context"; // Keep useLanguage

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
      <div className="bg-[#c27a5f]/10 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-[#c27a5f] mb-3 border-b border-[#c27a5f]/30 pb-2">{t.programs.program1.title}</h3>
        <ul className="space-y-2 text-gray-700">
          <li>{t.programs.program1.rafting}</li>
          <li>{t.programs.program1.riding}</li>
          <li>{t.programs.program1.hiking}</li>
          <li className="font-semibold pt-2">{t.programs.program1.priceAdults}</li>
          <li className="font-semibold">{t.programs.program1.priceChildren}</li>
        </ul>
      </div>

      {/* Program 2 */}
      <div className="bg-[#6b8362]/10 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-[#6b8362] mb-3 border-b border-[#6b8362]/30 pb-2">{t.programs.program2.title}</h3>
        <ul className="space-y-2 text-gray-700">
          <li>{t.programs.program2.kayak}</li>
          <li>{t.programs.program2.riding}</li>
          <li>{t.programs.program2.hiking}</li>
          <li className="font-semibold pt-2">{t.programs.program2.price}</li>
        </ul>
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
