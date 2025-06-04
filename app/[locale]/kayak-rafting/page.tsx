import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget'; // Import this

const KayakRaftingPage = () => {
  const bokunExperienceId = "1020611"; // Assuming this is the correct ID for Kayak & Rafting

  return (
    <ActivityPageLayout
      title="Kayak & Rafting"
      subtitle=""
      descriptionTitle=""
      descriptionContent={<DynamicBokunWidget experienceId={bokunExperienceId} />} // Use DynamicBokunWidget
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
