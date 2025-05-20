import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget'; // Import the dynamic component

const KayakingPage = () => {
  // Define the experience ID
  const bokunExperienceId = "1020669";

  return (
    <ActivityPageLayout
      title="Kayaking" // Provide a title
      subtitle="" // Empty subtitle
      descriptionTitle="" // Let Bokun handle content titles
      // Use the DynamicBokunWidget component
      descriptionContent={<DynamicBokunWidget experienceId={bokunExperienceId} />}
      detailsTitle=""
      detailsContent={<></>} // Empty content
      pricingTitle=""
      pricingContent={<></>} // Empty content
      showBookingButton={false} // Hide default button
      fullWidthContent={true} // Enable full width for Bokun widget
    >
      {/* Children are no longer directly placed here */}
    </ActivityPageLayout>
  );
};

export default KayakingPage;
