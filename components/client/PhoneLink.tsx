"use client";

import { Phone } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

import { trackPhoneClick } from "@/lib/analytics";

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

    // Use centralized GTM tracking function with device type
    trackPhoneClick({
      phoneNumber: phone,
      device: deviceType,
    });

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
