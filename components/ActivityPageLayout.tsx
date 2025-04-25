import Image from "next/image";
import Link from "next/link";
import { Roboto_Slab } from 'next/font/google'; // Assuming font is defined similarly to layout
import BookingButton from "./booking-button";
import ResponsiveNavigation from "./responsive-navigation";
// Remove imports for the components we no longer use

// Define Roboto Slab font instance (adjust weights/subsets as needed, mirroring layout.tsx)
const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  variable: '--font-roboto-slab',
  weight: ['400', '700', '900'], // Match weights used in the project
});

interface ActivityPageLayoutProps {
  title: string; // Now expects the translated string
  subtitle: string; // Now expects the translated string
  heroImageSrc: string;
  heroImageAlt: string;
  descriptionTitle: string; // Title for the description section
  descriptionContent: React.ReactNode;
  detailsTitle: string; // Title for the details section
  detailsContent: React.ReactNode;
  pricingTitle: string; // Title for the pricing section
  pricingContent: React.ReactNode;
  showBookingButton?: boolean; // Optional prop to show/hide booking button
  useSingleColumn?: boolean; // Optional prop to use single column layout
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
  showBookingButton = true, // Default to true for backward compatibility
  useSingleColumn = false // Default to false for backward compatibility
}: ActivityPageLayoutProps) {
  // Removed useLanguage hook call

  // Determine container width based on layout preference
  const containerClasses = useSingleColumn 
    ? "container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col gap-8" 
    : "container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex flex-col gap-8";

  return (
    <main className="relative min-h-screen bg-[#f5f0e8] overflow-hidden">
      {/* Logo - Fixed Position with responsive size */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/" className="flex items-center">
          <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md border border-amber-100 hover:bg-white transition-colors">
            <Image
              src="/images/ponyclub_logo.png"
              alt="Acheron River Excursion"
              fill
              className="object-contain p-1"
            />
            <div className="absolute -inset-[0.5px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/20 via-[#6b8362]/30 to-transparent blur-sm"></div>
          </div>
        </Link>
      </div>

      {/* Responsive Navigation */}
      <div className="absolute top-4 right-4 z-50">
        <ResponsiveNavigation />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] mt-16">
        <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden shadow-xl border border-amber-200/30">
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            className="object-cover object-[center_20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
        </div>
        
        {/* Hero Title Box */}
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

      {/* Hero Bottom Text Banner */}
      <div className="relative mx-4 -mt-8 z-20">
        <div className="bg-white/90 backdrop-blur-sm py-4 px-6 rounded-lg shadow-lg border border-amber-100 max-w-3xl mx-auto">
          <p className={`${robotoSlab.variable} font-roboto-slab text-lg md:text-xl text-center text-amber-800`}>
            {descriptionTitle}
          </p>
          <div className="absolute -inset-[0.5px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/30 via-[#6b8362]/20 to-amber-200/30 blur-sm"></div>
        </div>
      </div>

      {/* Content Section - With enhanced styling */}
      <div className={containerClasses}>
        {/* Description Section */}
        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
          <div className="prose max-w-none text-gray-700">
            {descriptionContent}
          </div>
          <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
        </div>
        
        {/* Details Section */}
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
  );
}
