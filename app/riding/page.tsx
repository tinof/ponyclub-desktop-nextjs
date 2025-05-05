import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';

const RidingPage = () => {
  const bokunWidget = (
    <>
      <script
        type="text/javascript"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
        async
      />
      <div
        className="bokunWidget"
        data-src="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020659"
      ></div>
      <noscript>Please enable javascript in your browser to book</noscript>
    </>
  );

  return (
    <ActivityPageLayout
      title="Riding"
      subtitle=""
      heroImageSrc="/images/round2.jpg"
      heroImageAlt="Horse Riding Adventure"
      descriptionTitle=""
      descriptionContent={bokunWidget}
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
