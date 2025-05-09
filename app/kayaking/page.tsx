import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';

const KayakingPage = () => {
  return (
    <ActivityPageLayout
      title="Kayaking" // Provide a title
      subtitle="" // Empty subtitle
      heroImageSrc="/images/Rafting_Group_Blue_Adventure_River.jpg" // Use a relevant hero image
      heroImageAlt="Kayaking Adventure"
      descriptionTitle="" // Let Bokun handle content titles
      descriptionContent={<DynamicBokunWidget experienceId="1020669" />} // Use DynamicBokunWidget component
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
