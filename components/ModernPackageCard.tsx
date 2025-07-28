"use client";

import Link from "next/link";
import BookingButton from "@/components/client/BookingButton";
import {
  HikingIcon,
  HorseRidingIcon,
  KayakingIcon,
  RaftingIcon,
} from "@/components/icons";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useLanguage } from "@/contexts/language-context";

interface ModernPackageCardProps {
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
  heroImage: string;
  bookingId: string;
  dataSrc: string;
  bookNowText: string;
  packageName: string;
  packagePrice: string;
  trackingLabel: string;
  variant: "popular" | "adventurous";
  packageType?: "package1" | "package2";
  sourcePage?: string;
  showLearnMoreLink?: boolean;
  isAboveFold?: boolean;
}

export default function ModernPackageCard({
  title,
  badge,
  activities,
  pricing,
  heroImage,
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
  isAboveFold = false,
}: ModernPackageCardProps) {
  const { language } = useLanguage();

  // Generate package page URL based on package type
  const packageUrl = packageType === "package1" ? "/package-1" : "/package-2";
  const learnMoreText = language === "el" ? "Μάθετε Περισσότερα" : "Learn More";

  const colorTheme = {
    popular: {
      badgeColor: "bg-amber-500 text-white",
      accentColor: "text-emerald-700",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
      borderColor: "border-emerald-200",
      cardBg: "bg-gradient-to-br from-emerald-50/30 to-white",
    },
    adventurous: {
      badgeColor: "bg-blue-500 text-white",
      accentColor: "text-blue-700",
      buttonColor: "bg-blue-600 hover:bg-blue-700 text-white",
      borderColor: "border-blue-200",
      cardBg: "bg-gradient-to-br from-blue-50/30 to-white",
    },
  };

  const theme = colorTheme[variant];

  // Activity icons
  const getActivityIcon = (activity: string) => {
    const iconProps = {
      size: 20,
      color: "#6B7280",
      className: "text-gray-500",
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
    return <span className="w-5 h-5 rounded-full bg-gray-300" />;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className={`
        relative rounded-2xl overflow-hidden shadow-xl
        ${theme.cardBg}
        border ${theme.borderColor}
        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
      `}
      >
        {/* Badge */}
        {badge && (
          <div
            className={`
            absolute top-4 right-4 z-10
            ${theme.badgeColor}
            px-3 py-1.5 rounded-full text-sm font-semibold
            shadow-lg backdrop-blur-sm
          `}
          >
            {badge}
          </div>
        )}

        {/* Hero Image */}
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={heroImage}
            alt={`${title} - Family adventure activities`}
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-300 hover:scale-105"
            imageType="default"
            isAboveFold={isAboveFold}
          />
          {/* Gentle overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 font-medium">
              {language === "el"
                ? "Ιδανικό για Οικογένειες"
                : "Perfect for Families"}
            </p>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {getActivityIcon(activities.primary)}
              </div>
              <span className="text-gray-700 font-medium">
                {activities.primary}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {getActivityIcon(activities.riding)}
              </div>
              <span className="text-gray-700 font-medium">
                {activities.riding}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {getActivityIcon(activities.hiking)}
              </div>
              <span className="text-gray-700 font-medium">
                {activities.hiking}
              </span>
            </div>
          </div>

          {/* Family Benefits */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">👨‍👩‍👧‍👦</span>
              <span className="font-semibold text-gray-800">
                {language === "el"
                  ? "Οικογενειακά Πλεονεκτήματα"
                  : "Family Benefits"}
              </span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                •{" "}
                {language === "el"
                  ? "Ασφαλές για παιδιά 6+ ετών"
                  : "Safe for children 6+ years"}
              </li>
              <li>
                •{" "}
                {language === "el"
                  ? "Επαγγελματικός οδηγός"
                  : "Professional guide included"}
              </li>
              <li>
                •{" "}
                {language === "el"
                  ? "Πλήρης εξοπλισμός ασφαλείας"
                  : "Complete safety equipment"}
              </li>
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
            <div className="text-center space-y-2">
              {pricing.adults && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {language === "el" ? "Ενήλικες" : "Adults"}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {pricing.adults}
                  </span>
                </div>
              )}
              {pricing.children && (
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-gray-600 text-sm">
                    {language === "el"
                      ? "Παιδιά (κάτω από 12)"
                      : "Children (under 12)"}
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {pricing.children}
                  </span>
                </div>
              )}
              {pricing.perPerson && (
                <div className="text-center">
                  <span className="text-gray-600 block text-sm">
                    {language === "el" ? "Ανά άτομο" : "Per Person"}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {pricing.perPerson}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            {/* Primary CTA */}
            <BookingButton
              id={bookingId}
              dataSrc={dataSrc}
              packageName={packageName}
              packagePrice={packagePrice}
              trackingLabel={trackingLabel}
              packageType={packageType}
              sourcePage={sourcePage}
              className={`
                w-full py-4 px-6 rounded-xl font-bold text-lg
                ${theme.buttonColor}
                transform transition-all duration-200
                hover:scale-105 hover:shadow-lg
                focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50
                relative overflow-hidden
                before:absolute before:inset-0 before:bg-white/20 
                before:translate-x-[-100%] before:transition-transform before:duration-300
                hover:before:translate-x-[100%]
              `}
            >
              <span className="relative z-10">{bookNowText}</span>
            </BookingButton>

            {/* Learn More Link */}
            {showLearnMoreLink && (
              <Link
                href={packageUrl}
                className="
                  block w-full py-3 px-6 text-center rounded-xl
                  border-2 border-gray-300 text-gray-700 font-semibold
                  hover:border-gray-400 hover:bg-gray-50
                  transition-all duration-200
                  hover:shadow-md
                "
              >
                {learnMoreText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
