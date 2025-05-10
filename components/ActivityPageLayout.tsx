import { Roboto_Slab } from 'next/font/google';
import BookingButton from "./booking-button";
// ResponsiveNavigation and Link/OptimizedImage for logo are no longer needed here directly.
// SiteHeader is now part of PageLayout.
// OptimizedImage might be used elsewhere if other image components are part of the content.
import { OptimizedImage } from "./ui/OptimizedImage";

// Define Roboto Slab font instance
const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  variable: '--font-roboto-slab',
  weight: ['400', '700', '900'],
});

interface ActivityPageLayoutProps {
  title: string;
  subtitle: string;
  descriptionTitle: string;
  descriptionContent: React.ReactNode;
  detailsTitle: string;
  detailsContent: React.ReactNode;
  pricingTitle: string;
  pricingContent: React.ReactNode;
  showBookingButton?: boolean;
  useSingleColumn?: boolean;
  fullWidthContent?: boolean;
}

export default function ActivityPageLayout({
  title,
  subtitle,
  descriptionTitle,
  descriptionContent,
  detailsTitle,
  detailsContent,
  pricingTitle,
  pricingContent,
  showBookingButton = true,
  useSingleColumn = false,
  fullWidthContent = false
}: ActivityPageLayoutProps) {
  // Determine container classes based on layout preference
  let containerClasses = "pt-24 pb-12 flex flex-col gap-8"; // Base classes
  if (fullWidthContent) {
    containerClasses += " w-full"; 
  } else {
    containerClasses += " container mx-auto px-4 sm:px-6 lg:px-8";
    if (useSingleColumn) {
      containerClasses += " max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl";
    } else {
      containerClasses += " max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl";
    }
  }

  return (
    <>
      {/* 
        SiteHeader is now rendered by PageLayout.
        The main PageLayout's <main> tag has pt-20 and the background color.
        This component's content will be rendered inside that <main> tag.
        The containerClasses will define the layout for the content of this specific activity page.
        Adjusting pt-24 to pt-4 in containerClasses to provide a small top padding for the content block itself,
        relative to the PageLayout's main content area.
      */}
      <div className={containerClasses.replace('pt-24', 'pt-4')}>
        {/* Description Section - Conditionally render wrapper */}
        {fullWidthContent ? (
          // Render content directly for full width (no extra wrapper/prose)
          descriptionContent
        ) : (
          // Render with default styling wrapper if not full width
          descriptionContent && (
            <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
              <div className="prose max-w-none text-gray-700">
                {descriptionContent}
              </div>
              <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
            </div>
          )
        )}

        {/* Details Section - Always inside container */}
        {detailsTitle && detailsContent && (
          <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
            <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl font-bold text-amber-800 mb-4 relative inline-block`}>
              {detailsTitle}
              <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
            </h2>
            <div className="prose max-w-none text-gray-700">
              {detailsContent}
            </div>
            <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
          </div>
        )}
        
        {/* Pricing Section */}
        {pricingTitle && pricingContent && (
          <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
            <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl font-bold text-amber-800 mb-4 relative inline-block`}>
              {pricingTitle}
              <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
            </h2>
            <div className="prose max-w-none text-gray-700">
              {pricingContent}
            </div>
            <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
          </div>
        )}

        {/* If pricingTitle is not provided but pricingContent is, show just the content */}
        {!pricingTitle && pricingContent && (
          <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
            <div className="prose max-w-none text-gray-700">
              {pricingContent}
            </div>
            <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
          </div>
        )}
      </div>

      {/* Book Now Button */}
      {showBookingButton && (
        <div className="flex justify-center mt-8 mb-12">
          <div className="relative">
            <BookingButton />
            <div className="absolute -inset-[2px] -z-10 rounded-full bg-gradient-to-r from-amber-200/50 via-[#6b8362]/40 to-amber-200/50 blur-sm"></div>
          </div>
        </div>
      )}
    </>
  );
}
