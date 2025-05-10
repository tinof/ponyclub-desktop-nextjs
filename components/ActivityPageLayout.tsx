import { Roboto_Slab } from 'next/font/google';
import BookingButton from "./booking-button";
// ResponsiveNavigation and Link/OptimizedImage for logo are no longer needed here directly
// as SiteHeader will handle them.
import SiteHeader from "./site-header"; // Added SiteHeader import
// HeroImage might still be used if the hero section is uncommented, OptimizedImage might be used elsewhere.
import { HeroImage, OptimizedImage } from "./ui/OptimizedImage";

// Define Roboto Slab font instance
const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  variable: '--font-roboto-slab',
  weight: ['400', '700', '900'],
});

interface ActivityPageLayoutProps {
  title: string;
  subtitle: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
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
  heroImageSrc,
  heroImageAlt,
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
      <SiteHeader />
      <main className="relative min-h-screen bg-[#f5f0e8] overflow-hidden">
      {/* The existing pt-24 on containerClasses should provide space for the fixed SiteHeader */}
      {/* Hero Section -- COMMENTED OUT
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] mt-16">
        <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden shadow-xl border border-amber-200/30">
          <HeroImage
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            className="object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16">
          <div className="relative bg-amber-800/40 px-8 py-6 rounded-2xl max-w-3xl shadow-xl border-2 border-amber-200/50 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-300">
            <h1
              className={`${robotoSlab.variable} font-roboto-slab text-amber-50 text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-bold px-4`}
            >
              <span className="block mb-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{title}</span>
              <span className="block font-extrabold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{subtitle}</span>
            </h1>
            <div className="absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-b from-amber-200/20 to-transparent blur-sm"></div>
          </div>
        </div>
      </div>
      */}

      {/* Hero Bottom Text Banner -- COMMENTED OUT
      <div className="relative mx-4 -mt-8 z-20">
        <div className="bg-white/90 backdrop-blur-sm py-4 px-6 rounded-lg shadow-lg border border-amber-100 max-w-3xl mx-auto">
          <p className={`${robotoSlab.variable} font-roboto-slab text-lg md:text-xl text-center text-amber-800`}>
            {descriptionTitle}
          </p>
          <div className="absolute -inset-[0.5px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/30 via-[#6b8362]/20 to-amber-200/30 blur-sm"></div>
        </div>
      </div>
      */}

      {/* Content Section - Now always uses the calculated containerClasses */}
      <div className={containerClasses}> {/* This already has pt-24 */}
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
    </main>
    </>
  );
}
