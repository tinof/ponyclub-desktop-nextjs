import { Roboto_Slab } from 'next/font/google';

// ResponsiveNavigation and Link/OptimizedImage for logo are no longer needed here directly.
// SiteHeader is now part of PageLayout.
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
  title: _title,
  subtitle: _subtitle,
  descriptionTitle: _descriptionTitle,
  descriptionContent,
  detailsTitle,
  detailsContent,
  pricingTitle,
  pricingContent,
  showBookingButton: _showBookingButton = true,
  useSingleColumn = false,
  fullWidthContent: _fullWidthContent = false,
}: ActivityPageLayoutProps) {
  // Determine content max-width class based on column preference
  const contentMaxWidthClass = useSingleColumn ? 'max-w-none' : 'max-w-none';

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
            <div
              className={`
                relative rounded-lg border border-amber-100/70 bg-white/80 p-6
                shadow-lg backdrop-blur-sm transition-shadow duration-300
                hover:shadow-xl
              `}
            >
              <div
                className={`
                  prose
                  ${contentMaxWidthClass}
                  text-gray-700
                `}
              >
                {descriptionContent}
              </div>
              <div
                className={`
                  absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr
                  from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm
                `}
              />
            </div>
          )}

          {/* Details Section - Always inside container */}
          {detailsTitle && detailsContent && (
            <div
              className={`
                relative rounded-lg border border-amber-100/70 bg-white/80 p-6
                shadow-lg backdrop-blur-sm transition-shadow duration-300
                hover:shadow-xl
              `}
            >
              <h2
                className={`
                  ${robotoSlab.variable}
                  relative mb-4 inline-block font-roboto-slab text-2xl font-bold
                  text-amber-800
                `}
              >
                {detailsTitle}
                <div
                  className={`
                    absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r
                    from-transparent via-amber-500/50 to-transparent
                  `}
                />
              </h2>
              <div
                className={`
                  prose
                  ${contentMaxWidthClass}
                  text-gray-700
                `}
              >
                {detailsContent}
              </div>
              <div
                className={`
                  absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr
                  from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm
                `}
              />
            </div>
          )}

          {/* Pricing Section */}
          {pricingTitle && pricingContent && (
            <div
              className={`
                relative rounded-lg border border-amber-100/70 bg-white/80 p-6
                shadow-lg backdrop-blur-sm transition-shadow duration-300
                hover:shadow-xl
              `}
            >
              <h2
                className={`
                  ${robotoSlab.variable}
                  relative mb-4 inline-block font-roboto-slab text-2xl font-bold
                  text-amber-800
                `}
              >
                {pricingTitle}
                <div
                  className={`
                    absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r
                    from-transparent via-amber-500/50 to-transparent
                  `}
                />
              </h2>
              <div
                className={`
                  prose
                  ${contentMaxWidthClass}
                  text-gray-700
                `}
              >
                {pricingContent}
              </div>
              <div
                className={`
                  absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr
                  from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm
                `}
              />
            </div>
          )}

          {/* If pricingTitle is not provided but pricingContent is, show just the content */}
          {!pricingTitle && pricingContent && (
            <div
              className={`
                relative rounded-lg border border-amber-100/70 bg-white/80 p-6
                shadow-lg backdrop-blur-sm transition-shadow duration-300
                hover:shadow-xl
              `}
            >
              <div
                className={`
                  prose
                  ${contentMaxWidthClass}
                  text-gray-700
                `}
              >
                {pricingContent}
              </div>
              <div
                className={`
                  absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr
                  from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm
                `}
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
