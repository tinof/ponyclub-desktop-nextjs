"use client"

import Script from "next/script";

export default function BookingButton() {
  return (
    <>
      <Script
        src="https://integrations.beyonk.com/v1/sdk"
        strategy="lazyOnload"
        onLoad={() => {
          // Optionally, you can add any initialization logic here if needed
          // For most cases, the <portal-button> custom element will be available after script load
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <portal-button organisation="pjpem0f0" color="hsl(var(--river-accent))"></portal-button>
      </div>
    </>
  );
}
