"use client";

import { Phone } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

import { trackAdsConversion, trackPhoneClick } from "@/lib/analytics";

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
  const [isRevealed, setIsRevealed] = useState(false);

  // Detect device type on mount
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ["mobile", "android", "iphone", "ipad", "tablet"];
      const isMobileUa = mobileKeywords.some(keyword =>
        userAgent.includes(keyword),
      );
      const isMobileScreen = window.innerWidth <= 768;
      setIsMobile(isMobileUa || isMobileScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePhoneClick = useCallback(
    (e: React.MouseEvent) => {
      const deviceType = isMobile ? "mobile" : "desktop";

      // Use centralized GTM tracking function with device type
      trackPhoneClick({
        phoneNumber: phone,
        device: deviceType,
      });

      // Track Google Ads conversion for phone clicks
      const phoneConversionLabels = {
        mobile: "-i5YCP39-e8aEMz6q8gp", // Phone Click - Mobile
        desktop: "9_TlCPj--e8aEMz6q8gp", // Phone Click - Desktop
      };

      trackAdsConversion({
        conversionLabel: phoneConversionLabels[deviceType],
        // Phone clicks don't have monetary value in the current setup
      });

      // Desktop click-to-reveal behavior
      if (!isMobile && !isRevealed) {
        e.preventDefault(); // Prevent tel: link from opening
        setIsRevealed(true); // Reveal the phone number
      }

      // Call custom onClick handler if provided
      if (onClick) {
        onClick();
      }

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[PhoneLink] Phone click tracked: ${phone} (${deviceType}), Conversion Label: ${phoneConversionLabels[deviceType]}`,
          !isMobile && !isRevealed ? " - Number revealed on desktop" : "",
        );
      }
    },
    [phone, onClick, isMobile, isRevealed],
  );

  // Clean phone number for tel: link (remove spaces and formatting)
  const cleanPhone = phone.replace(/\s+/g, "");

  // For mobile: always show as clickable tel: link
  if (isMobile) {
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

  // For desktop: click-to-reveal behavior
  if (!isRevealed) {
    // Show call-to-action button before reveal
    return (
      <button type="button" onClick={handlePhoneClick} className={className}>
        {showIcon && <Phone className="h-4 w-4" />}
        {children || <span>Show Phone Number</span>}
      </button>
    );
  }

  // After reveal: show phone number as non-clickable text
  return (
    <div className={className}>
      {showIcon && <Phone className="h-4 w-4" />}
      <span>{phone}</span>
    </div>
  );
}
