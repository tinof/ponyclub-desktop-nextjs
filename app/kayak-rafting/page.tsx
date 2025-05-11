import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';

const KayakRaftingPage = () => {
  const bokunExperienceId = "1020611"; // Kayak & Rafting experience ID

  return (
    <ActivityPageLayout
      title="Kayak & Rafting" // Provide a title
      subtitle="" // Empty subtitle
      descriptionTitle="" // Let Bokun handle content titles
      descriptionContent={<DynamicBokunWidget experienceId={bokunExperienceId} />} // Pass the widget here
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

export default KayakRaftingPage;
