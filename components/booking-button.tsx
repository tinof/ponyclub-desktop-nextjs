"use client"

import { useEffect } from "react"

export default function BookingButton() {
  useEffect(() => {
    // Check if the script is already present
    if (!document.querySelector('script[src="https://integrations.beyonk.com/v1/sdk"]')) {
      const script = document.createElement("script");
      script.src = "https://integrations.beyonk.com/v1/sdk";
      script.type = "module";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <portal-button organisation="pjpem0f0" color="#6B8262"></portal-button>
    </div>
  );
}
