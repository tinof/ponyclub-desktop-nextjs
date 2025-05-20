import { Roboto_Slab } from 'next/font/google';
import BookingButton from "./booking-button";
// ResponsiveNavigation and Link/OptimizedImage for logo are no longer needed here directly.
// SiteHeader is now part of PageLayout.
// OptimizedImage might be used elsewhere if other image components are part of the content.
import { OptimizedImage } from "./ui/OptimizedImage";
import { Container } from './ui/Container'; // Import the Container component

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
  // Determine content max-width class based on column preference
  let contentMaxWidthClass = useSingleColumn 
    ? "max-w-none" 
    : "max-w-none";

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
      <Container className="py-6">
        <div className="flex flex-col gap-8">
          {/* Description Section */}
          {descriptionContent && (
            <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
              <div className={`prose ${contentMaxWidthClass} text-gray-700`}>
                {descriptionContent}
              </div>
              <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
            </div>
          )}

          {/* Details Section - Always inside container */}
          {detailsTitle && detailsContent && (
            <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
              <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl font-bold text-amber-800 mb-4 relative inline-block`}>
                {detailsTitle}
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
              </h2>
              <div className={`prose ${contentMaxWidthClass} text-gray-700`}>
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
              <div className={`prose ${contentMaxWidthClass} text-gray-700`}>
                {pricingContent}
              </div>
              <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
            </div>
          )}

          {/* If pricingTitle is not provided but pricingContent is, show just the content */}
          {!pricingTitle && pricingContent && (
            <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
              <div className={`prose ${contentMaxWidthClass} text-gray-700`}>
                {pricingContent}
              </div>
              <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
            </div>
          )}
        </div>
      </Container>

      {/* Book Now Button */}
      {showBookingButton && (
        <Container className="flex justify-center py-8">
          <div className="relative">
            <BookingButton />
            <div className="absolute -inset-[2px] -z-10 rounded-full bg-gradient-to-r from-amber-200/50 via-[#6b8362]/40 to-amber-200/50 blur-sm"></div>
          </div>
        </Container>
      )}
    </>
  );
}
