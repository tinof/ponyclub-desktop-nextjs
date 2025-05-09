import Link from "next/link";
import { Roboto_Slab } from 'next/font/google';
import BookingButton from "./booking-button";
import ResponsiveNavigation from "./responsive-navigation";
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
  heroImageSrc: string;
  heroImageAlt: string;
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
  let containerClasses = "py-12 flex flex-col gap-8"; // Base classes
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
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F2] border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16">
              <OptimizedImage
                src="/images/ponyclub_logo.png"
                alt="Acheron River Excursion"
                fill
                imageType="logo"
                className="object-contain p-1"
              />
            </div>
          </Link>
        </div>

        {/* Responsive Navigation */}
        <div>
          <ResponsiveNavigation />
        </div>
      </header>

      <main className="relative min-h-screen bg-[#f5f0e8] overflow-hidden pt-20 pb-0">
        {/* Content Section - Now always uses the calculated containerClasses */}
        <div className={containerClasses}>
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
        <div className="flex justify-center mt-8 mb-0">
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
