import type { Metadata } from 'next';

import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';
import StructuredData from '@/components/StructuredData';
import { generateActivityStructuredData } from '@/lib/structured-data';

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
    locale === 'el'
      ? 'Ιππασία Αχέροντας Τιμές | Ασφαλείς Βόλτες για Αρχάριους'
      : 'Acheron Horse Riding Prices | Safe Beginner-Friendly Tours';
  const description =
    locale === 'el'
      ? 'Δείτε τις τιμές για ιππασία στον Αχέροντα. Προσφέρουμε ασφαλείς βόλτες με άλογα για αρχάριους και οικογένειες. Κλείστε την περιπέτειά σας σήμερα!'
      : 'See our Acheron horse riding prices. We offer safe horseback rides perfect for beginners and families. Book your adventure today!';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/riding`,
    },
  };
}

const RidingPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const _isGreek = locale === 'el';
  const bokunExperienceId = '1020659'; // Riding experience ID

  // Content is now managed through Bokun widget for easier maintenance
  // SEO content has been moved to Bokun descriptions
  const _seoContent = null;

  // Generate structured data for this activity
  const structuredData = generateActivityStructuredData('riding', locale);

  return (
    <>
      <StructuredData data={structuredData} />
      <ActivityPageLayout
        title="Riding"
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

export default RidingPage;
