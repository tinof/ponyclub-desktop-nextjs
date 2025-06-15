import type { Metadata } from 'next';

import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';
import StructuredData from '@/components/StructuredData';
import { generateActivityStructuredData } from '@/lib/structured-data';
interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'el'
      ? 'Rafting Αχέροντας Τιμές | Ασφαλής Κατάβαση για Οικογένειες'
      : 'Acheron River Rafting Prices | Safe Family Rafting Tours';
  const description =
    locale === 'el'
      ? 'Δείτε τις τιμές για rafting στον Αχέροντα. Προσφέρουμε ασφαλείς καταβάσεις για οικογένειες και αρχάριους. Κλείστε την περιπέτειά σας σήμερα!'
      : 'See our Acheron River rafting prices. We offer safe river descents perfect for families and beginners. Book your adventure today!';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/rafting`,
    },
  };
}

const RaftingPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === 'el';

  // Define the experience ID for rafting
  const bokunExperienceId = '1020611';

  // Content is now managed through Bokun widget for easier maintenance
  // SEO content has been moved to Bokun descriptions
  const seoContent = null;

  // Generate structured data for this activity
  const structuredData = generateActivityStructuredData('rafting', locale);

  return (
    <>
      <StructuredData data={structuredData} />
      <ActivityPageLayout
        title="Rafting"
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

export default RaftingPage;
