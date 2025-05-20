import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';

const RaftingPage = () => {
  // The Bokun widget will be handled by DynamicBokunWidget
  const bokunExperienceId = "1020611"; // Rafting experience ID

  return (
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
      showBookingButton={false} // Hide default button
      fullWidthContent={true} // Enable full width for Bokun widget
    >
      {/* Children are no longer directly placed here */}
    </ActivityPageLayout>
  );
};

export default RaftingPage;
