import ActivityPageLayout from "@/components/ActivityPageLayout";
import DynamicBokunWidget from "@/components/DynamicBokunWidget"; // Import this

// PERFORMANCE OPTIMIZATION: ISR configuration for activity pages
// Activity content may change periodically (pricing, availability, seasonal updates)
export const revalidate = 3600; // Revalidate every hour

const KayakRaftingPage = () => {
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
