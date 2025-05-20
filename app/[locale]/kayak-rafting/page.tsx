import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';

const KayakRaftingPage = () => {
  const bokunWidget = (
    <>
      <script
        type="text/javascript"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
        async
      />
      <div
        className="bokunWidget"
        data-src="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020611"
      ></div>
      <noscript>Please enable javascript in your browser to book</noscript>
    </>
  );

  return (
    <ActivityPageLayout
      title="Kayak & Rafting" // Provide a title
      subtitle="" // Empty subtitle
      descriptionTitle="" // Let Bokun handle content titles
      descriptionContent={bokunWidget} // Pass the widget here
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
