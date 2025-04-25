import Image from "next/image";
import { Roboto_Slab } from 'next/font/google'; // Assuming font is defined similarly to layout
import ActivitiesMenu from "./activities-menu";
import LanguageSelector from "./language-selector";
import BookingButton from "./booking-button";
// Removed useLanguage import

// Define Roboto Slab font instance (adjust weights/subsets as needed, mirroring layout.tsx)
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
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
      {/* Header/Nav elements - Replicated from existing pages */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <ActivitiesMenu />
        <LanguageSelector />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <Image
          src={heroImageSrc}
          alt={heroImageAlt}
          fill
          className="object-cover object-[center_20%]" // Changed from 35% to 20% to show more of the top part
          priority
        />
        {/* Hero Title Box - Replicated styling from existing pages */}
        <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16">
          {/* Using a darker overlay as suggested in recommendation #3 */}
          <div className="relative bg-black/60 px-8 py-6 rounded-2xl max-w-3xl shadow-lg border-2 border-white/30">
            <h1
              className={`${robotoSlab.variable} font-roboto-slab text-white text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-bold px-4`}
            >
              {/* Using text-shadow-lg utility from globals.css */}
              {/* Use the passed title and subtitle props directly */}
              <span className="block mb-2 text-shadow-lg">{title}</span>
              <span className="block font-extrabold tracking-wide text-shadow-lg">{subtitle}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section - Replicated structure and styling */}
      <div className={containerClasses}>
        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl font-bold text-[#6b8362] mb-4`}>{descriptionTitle}</h2>
          <div className="prose max-w-none text-gray-700">
            {descriptionContent}
          </div>
        </div>
        {/* Details Section */}
        {detailsTitle && detailsContent && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl font-bold text-[#6b8362] mb-4`}>{detailsTitle}</h2>
            <div className="prose max-w-none text-gray-700">
              {detailsContent}
            </div>
          </div>
        )}
        {/* Pricing Section */}
        {pricingTitle && pricingContent && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl font-bold text-[#6b8362] mb-4`}>{pricingTitle}</h2>
            <div className="prose max-w-none text-gray-700">
              {pricingContent}
            </div>
          </div>
        )}

        {/* If pricingTitle is not provided but pricingContent is, show just the content */}
        {!pricingTitle && pricingContent && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="prose max-w-none text-gray-700">
              {pricingContent}
            </div>
          </div>
        )}
      </div>

      {/* Book Now Button */}
      {showBookingButton && (
        <div className="flex justify-center mt-8 mb-12">
          <BookingButton />
        </div>
      )}

      {/* Footer placeholder - Add if there's a common footer */}
      {/* <footer className="bg-[#6b8362] text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Acheron Adventures</p>
      </footer> */}
    </main>
  );
}
