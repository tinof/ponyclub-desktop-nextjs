import type { Metadata } from "next";

import ActivityPageLayout from "@/components/ActivityPageLayout";
import DynamicBokunWidget from "@/components/DynamicBokunWidget";
import StructuredData from "@/components/StructuredData";
import { generateActivityStructuredData } from "@/lib/structured-data";

// PERFORMANCE OPTIMIZATION: ISR configuration for activity pages
// Activity content may change periodically (pricing, availability, seasonal updates)
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "el"
      ? "Kayak Αχέροντας Τιμές | Ασφαλές Kayak για Οικογένειες"
      : "Acheron River Kayak Prices | Safe Family Kayaking Tours";
  const description =
    locale === "el"
      ? "Δείτε τις τιμές για kayak στον Αχέροντα. Προσφέρουμε ασφαλείς εκδρομές kayak για οικογένειες και αρχάριους. Κλείστε την περιπέτειά σας σήμερα!"
      : "See our Acheron River kayak prices. We offer safe kayaking tours perfect for families and beginners. Book your adventure today!";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/kayaking`,
    },
  };
}

const KayakingPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const _isGreek = locale === "el";

  // Define the experience ID
  const bokunExperienceId = "1020669";

  // Content is now managed through Bokun widget for easier maintenance
  // SEO content has been moved to Bokun descriptions
  const _seoContent = null;

  // Generate structured data for this activity
  const structuredData = generateActivityStructuredData("kayaking", locale);

  return (
    <>
      <StructuredData data={structuredData} />
      <ActivityPageLayout
        title="Kayaking"
        subtitle=""
        descriptionTitle=""
        descriptionContent={
          <DynamicBokunWidget experienceId={bokunExperienceId} />
        }
        detailsTitle=""
        detailsContent={<></>}
        pricingTitle=""
        pricingContent={<></>}
        showBookingButton={false}
        fullWidthContent={true}
      />
    </>
  );
};

export default KayakingPage;
