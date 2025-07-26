"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BookingButton from "@/components/client/BookingButton";
import {
  HikingIcon,
  HorseRidingIcon,
  KayakingIcon,
  RaftingIcon,
} from "@/components/icons";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useLanguage } from "@/contexts/language-context";

interface VintagePackageCardProps {
  title: string;
  badge: string;
  activities: {
    primary: string;
    riding: string;
    hiking: string;
  };
  pricing: {
    adults?: string;
    children?: string;
    perPerson?: string;
  };
  images: {
    main: string;
    top: string;
    bottom: string;
  };
  bookingId: string;
  dataSrc: string;
  bookNowText: string;
  packageName: string;
  packagePrice: string;
  trackingLabel: string;
  variant: "green" | "orange";
  packageType?: "package1" | "package2";
  sourcePage?: string;
  showLearnMoreLink?: boolean;
}

export default function VintagePackageCard({
  title,
  badge,
  activities,
  pricing,
  images,
  bookingId,
  dataSrc,
  bookNowText,
  packageName,
  packagePrice,
  trackingLabel,
  variant,
  packageType,
  sourcePage,
  showLearnMoreLink = true,
}: VintagePackageCardProps) {
  const [nonce, setNonce] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    // Get nonce from meta tag
    const metaNonce =
      document
        .querySelector('meta[name="csp-nonce"]')
        ?.getAttribute("content") || "";
    setNonce(metaNonce);
  }, []);

  // Generate package page URL based on package type
  const packageUrl = packageType === "package1" ? "/package-1" : "/package-2";
  const learnMoreText = language === "el" ? "Μάθετε Περισσότερα" : "Learn More";

  const colorTheme = {
    green: {
      border: "border-emerald-800",
      background: "bg-gradient-to-br from-amber-50 via-green-50 to-emerald-100",
      badge: "bg-amber-400 text-amber-900",
      text: "text-emerald-900",
      price: "text-emerald-800",
      button: "bg-emerald-700 hover:bg-emerald-800 text-white",
      accent: "text-emerald-700",
      cardBg: "#f7f5f0",
      borderColor: "#2d5a3d",
    },
    orange: {
      border: "border-orange-800",
      background: "bg-gradient-to-br from-amber-50 via-orange-50 to-red-100",
      badge: "bg-blue-400 text-blue-900",
      text: "text-orange-900",
      price: "text-orange-800",
      button: "bg-orange-700 hover:bg-orange-800 text-white",
      accent: "text-orange-700",
      cardBg: "#faf6f0",
      borderColor: "#c2410c",
    },
  };

  const theme = colorTheme[variant];

  // Activity icons (using custom SVG icons)
  const getActivityIcon = (activity: string) => {
    const iconProps = {
      size: 18,
      color: theme.borderColor,
      className: "drop-shadow-sm",
    };

    if (activity.toLowerCase().includes("rafting")) {
      return <RaftingIcon {...iconProps} />;
    }
    if (activity.toLowerCase().includes("kayak")) {
      return <KayakingIcon {...iconProps} />;
    }
    if (activity.toLowerCase().includes("riding")) {
      return <HorseRidingIcon {...iconProps} />;
    }
    if (activity.toLowerCase().includes("hiking")) {
      return <HikingIcon {...iconProps} />;
    }
    return <span className="text-lg">•</span>; // Default bullet point
  };

  return (
    <div
      className={`
      relative mx-auto w-full max-w-sm
      vintage-card
    `}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`
          absolute -top-2 -right-2 z-10
          ${theme.badge}
          px-3 py-1 rounded-full text-xs font-bold
          shadow-md transform rotate-12
        `}
        >
          {badge}
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-4 relative">
          <h2
            className={`
            text-3xl font-bold ${theme.text}
            font-serif tracking-wider uppercase
            drop-shadow-sm
          `}
          >
            {title}
          </h2>
          <div
            className={`
            absolute -bottom-1 left-1/2 transform -translate-x-1/2
            w-16 h-0.5 ${theme.border.replace("border-", "bg-")}
            opacity-60
          `}
          />
        </div>

        {/* Image Grid */}
        <div className="vintage-image-grid mb-4 h-40">
          <div className="vintage-main relative">
            <OptimizedImage
              src={images.main}
              alt={`${title} main activity`}
              fill={true}
              sizes="(max-width: 512px) 45vw, 240px"
              className="h-full w-full object-cover sepia-[0.3] contrast-[1.1]"
              imageType="default"
            />
          </div>
          <div className="vintage-top relative">
            <OptimizedImage
              src={images.top}
              alt={`${title} activity 2`}
              fill={true}
              sizes="(max-width: 512px) 45vw, 240px"
              className="h-full w-full object-cover sepia-[0.3] contrast-[1.1]"
              imageType="default"
            />
          </div>
          <div className="vintage-bottom relative">
            <OptimizedImage
              src={images.bottom}
              alt={`${title} activity 3`}
              fill={true}
              sizes="(max-width: 512px) 45vw, 240px"
              className="h-full w-full object-cover sepia-[0.3] contrast-[1.1]"
              imageType="default"
            />
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-3 mb-6">
          <div className={`flex items-center text-sm ${theme.text} font-serif`}>
            <div className="mr-3 w-6 h-6 flex items-center justify-center flex-shrink-0">
              {getActivityIcon(activities.primary)}
            </div>
            <span className="font-semibold tracking-wide">
              {activities.primary}
            </span>
          </div>
          <div className={`flex items-center text-sm ${theme.text} font-serif`}>
            <div className="mr-3 w-6 h-6 flex items-center justify-center flex-shrink-0">
              {getActivityIcon(activities.riding)}
            </div>
            <span className="font-semibold tracking-wide">
              {activities.riding}
            </span>
          </div>
          <div className={`flex items-center text-sm ${theme.text} font-serif`}>
            <div className="mr-3 w-6 h-6 flex items-center justify-center flex-shrink-0">
              {getActivityIcon(activities.hiking)}
            </div>
            <span className="font-semibold tracking-wide">
              {activities.hiking}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6 text-center space-y-2">
          {pricing.adults && (
            <div
              className={`${theme.price} border-t-2 border-b-2 ${theme.border} py-3 bg-white/20`}
            >
              <div className="text-base font-bold font-serif tracking-wide uppercase">
                Adults
              </div>
              <div className="text-4xl font-bold font-serif tracking-wider">
                {pricing.adults}
              </div>
            </div>
          )}
          {pricing.children && (
            <div
              className={`${theme.price} border-t-2 border-b-2 ${theme.border} py-3 bg-white/20`}
            >
              <div className="text-sm font-bold font-serif tracking-wide uppercase">
                Children (under 12 years old)
              </div>
              <div className="text-3xl font-bold font-serif tracking-wider">
                {pricing.children}
              </div>
            </div>
          )}
          {pricing.perPerson && (
            <div
              className={`${theme.price} border-t-2 border-b-2 ${theme.border} py-3 bg-white/20`}
            >
              <div className="text-base font-bold font-serif tracking-wide uppercase">
                Per Person
              </div>
              <div className="text-4xl font-bold font-serif tracking-wider">
                {pricing.perPerson}
              </div>
            </div>
          )}
        </div>

        {/* Learn More Link - Critical for SEO */}
        {showLearnMoreLink && (
          <div className="text-center mb-4">
            <Link
              href={packageUrl}
              className={`
              inline-block px-6 py-2 text-sm font-medium
              border-2 rounded-lg transition-all duration-300
              hover:scale-105 hover:shadow-md
              ${theme.border} ${theme.text}
              bg-white hover:bg-gray-50
              font-serif tracking-wider uppercase
            `}
            >
              {learnMoreText}
            </Link>
          </div>
        )}

        {/* Book Now Button */}
        <div className="text-center">
          <BookingButton
            id={bookingId}
            dataSrc={dataSrc}
            packageName={packageName}
            packagePrice={packagePrice}
            trackingLabel={trackingLabel}
            packageType={packageType}
            sourcePage={sourcePage}
            className={`
              w-full py-4 px-8 rounded-lg font-bold text-lg
              ${theme.button}
              transform transition-all duration-200
              hover:scale-105 hover:shadow-xl
              border-3 border-current
              font-serif tracking-wider uppercase
              shadow-lg
              relative overflow-hidden
            `}
          >
            {bookNowText}
          </BookingButton>
        </div>
      </div>

      {/* Vintage styling */}
      <style jsx={true} nonce={nonce}>{`
        .vintage-card {
          position: relative;
          background-color: ${theme.cardBg};
          background-image:
            radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.02) 0%, transparent 50%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(139, 69, 19, 0.01) 20px,
              rgba(139, 69, 19, 0.01) 40px
            );
          box-shadow:
            inset 0 0 20px rgba(139, 69, 19, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.15),
            0 4px 8px rgba(0, 0, 0, 0.1);
          border: 6px solid ${theme.borderColor};
          border-radius: 12px;
        }

        .vintage-card::before {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          background: linear-gradient(45deg,
            ${theme.borderColor} 0%,
            transparent 25%,
            transparent 75%,
            ${theme.borderColor} 100%);
          border-radius: 16px;
          z-index: -1;
          opacity: 0.3;
        }

        .vintage-card::after {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          border: 2px solid ${theme.borderColor};
          border-radius: 8px;
          opacity: 0.2;
          pointer-events: none;
        }

        .vintage-image-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 3px;
          border: 3px solid ${theme.borderColor};
          border-radius: 6px;
          overflow: hidden;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .vintage-main {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
          border-right: 2px solid ${theme.borderColor};
        }

        .vintage-top {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          border-bottom: 1px solid ${theme.borderColor};
        }

        .vintage-bottom {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
          border-top: 1px solid ${theme.borderColor};
        }
      `}</style>
    </div>
  );
}
