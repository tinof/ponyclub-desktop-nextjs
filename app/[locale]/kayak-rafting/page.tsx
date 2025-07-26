import type { Metadata } from "next";
import ActivityPageLayout from "@/components/ActivityPageLayout";
import DynamicBokunWidget from "@/components/DynamicBokunWidget"; // Import this

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
      ? "Kayak & Rafting Αχέροντας | Συνδυασμένη Περιπέτεια"
      : "Kayak & Rafting Acheron | Combined Adventure";
  const description =
    locale === "el"
      ? "Συνδυάστε kayak και rafting στον Αχέροντα για μια ολοκληρωμένη εμπειρία περιπέτειας. Ιδανικό για οικογένειες και αρχάριους."
      : "Combine kayaking and rafting at Acheron River for a complete adventure experience. Perfect for families and beginners.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/kayak-rafting`,
    },
  };
}

const KayakRaftingPage = async ({ params }: PageProps) => {
  const { locale: _locale } = await params;
  const bokunExperienceId = "1020611"; // Assuming this is the correct ID for Kayak & Rafting

  return (
    <ActivityPageLayout
      title="Kayak & Rafting"
      subtitle=""
      descriptionTitle=""
      descriptionContent={
        <DynamicBokunWidget experienceId={bokunExperienceId} />
      } // Use DynamicBokunWidget
      detailsTitle=""
      detailsContent={<></>}
      pricingTitle=""
      pricingContent={<></>}
      showBookingButton={false}
      fullWidthContent={true}
    >
      {/* Children are no longer directly placed here */}
    </ActivityPageLayout>
  );
};

export default KayakRaftingPage;
