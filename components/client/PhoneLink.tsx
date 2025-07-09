"use client";

import { Phone } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

import { gtagEvent, sendAdsConversion } from "@/lib/analytics";

interface PhoneLinkProps {
  phone: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  onClick?: () => void;
}

export default function PhoneLink({
  phone,
  children,
  className = "",
  showIcon = true,
  onClick,
}: PhoneLinkProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect device type on mount
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ["mobile", "android", "iphone", "ipad", "tablet"];
      const isMobileUA = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );
      const isMobileScreen = window.innerWidth <= 768;
      setIsMobile(isMobileUA || isMobileScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePhoneClick = useCallback(() => {
    const deviceType = isMobile ? "mobile" : "desktop";
    // Track phone click event with device information
    gtagEvent("phone_click", {
      event_category: "Contact",
      event_label: `Phone CTA - ${deviceType}`,
      phone_number: phone,
      device_type: deviceType,
      page_location: typeof window !== "undefined" ? window.location.href : "",
      page_title: typeof window !== "undefined" ? document.title : "",
    });

    // Send Google Ads conversion with device-specific label
    const phoneConversionLabel = isMobile
      ? process.env.NEXT_PUBLIC_ADS_LABEL_PHONE_MOBILE
      : process.env.NEXT_PUBLIC_ADS_LABEL_PHONE_DESKTOP;

    if (phoneConversionLabel) {
      sendAdsConversion(phoneConversionLabel, 0);
    } else {
      // Fallback to generic phone label if device-specific not available
      const genericLabel = process.env.NEXT_PUBLIC_ADS_LABEL_PHONE;
      if (genericLabel) {
        sendAdsConversion(genericLabel, 0);
      } else if (process.env.NODE_ENV === "development") {
        console.warn(
          `[PhoneLink] Missing phone conversion labels. Expected: NEXT_PUBLIC_ADS_LABEL_PHONE_${deviceType.toUpperCase()} or NEXT_PUBLIC_ADS_LABEL_PHONE`
        );
      }
    }

    // Call custom onClick handler if provided
    if (onClick) {
      onClick();
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[PhoneLink] Phone click tracked: ${phone} (${deviceType})`);
    }
  }, [phone, onClick, isMobile]);

  // Clean phone number for tel: link (remove spaces and formatting)
  const cleanPhone = phone.replace(/\s+/g, "");

  return (
    <a
      href={`tel:${cleanPhone}`}
      onClick={handlePhoneClick}
      className={className}
    >
      {showIcon && <Phone className="h-4 w-4" />}
      {children || <span>{phone}</span>}
    </a>
  );
}
