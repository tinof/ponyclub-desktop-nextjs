import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';

const RidingPage = () => {
  const bokunExperienceId = "1020659"; // Riding experience ID

  return (
    <ActivityPageLayout
      title="Riding"
      subtitle=""
      descriptionTitle=""
      descriptionContent={<DynamicBokunWidget experienceId={bokunExperienceId} />}
      detailsTitle=""
      detailsContent={<></>}
      pricingTitle=""
      pricingContent={<></>}
      showBookingButton={false}
      fullWidthContent={true}
    />
  );
};

export default RidingPage;
