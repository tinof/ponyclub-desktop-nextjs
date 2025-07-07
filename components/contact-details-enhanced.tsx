"use client";

import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { useLanguage } from "@/contexts/language-context";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialIconWithTooltip({ href, icon, label }: SocialIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          text-[#6b8362] transition-colors duration-200
          hover:text-[#c27a5f]
        `}
        aria-label={label}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon}
      </a>
      {showTooltip && (
        <div
          className={`
            absolute -bottom-9 left-1/2 -translate-x-1/2 transform rounded
            bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white
          `}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export default function ContactDetailsEnhanced() {
  const { t } = useLanguage();

  return (
    <div
      className={`
        relative rotate-1 transform rounded-lg border border-amber-100/70
        bg-white/80 p-6 shadow-xl backdrop-blur-xs transition-shadow
        duration-300
        hover:shadow-2xl
        md:p-8
      `}
    >
      <h2
        className={`
          relative mb-6 inline-block w-full text-center text-3xl font-bold
          text-[#6b8362]
        `}
      >
        {t.contact.title}
        <div
          className={`
            absolute -bottom-1 left-0 h-[2px] w-full bg-linear-to-r
            from-transparent via-[#6b8362]/70 to-transparent
          `}
        />
      </h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#c27a5f]" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">
              {t.contact.location}
            </h3>
            <p className="font-medium">{t.contact.businessName}</p>
            <p>{t.contact.address1}</p>
            <p>{t.contact.address2}</p>
          </div>
        </div>

        <div
          className={`
            mt-4 flex items-start gap-3 border-t border-[#6b8362]/30 pt-4
          `}
        >
          <Phone className="mt-1 h-6 w-6 shrink-0 text-[#c27a5f]" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">
              {t.contact.phone}
            </h3>
            <p>{t.contact.phone1}</p>
            <p className="text-sm italic">{t.contact.phone2}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="mt-1 h-6 w-6 shrink-0 text-[#c27a5f]" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">
              {t.contact.emailLabel}
            </h3>
            <p>{t.contact.email}</p>
            <p className="mt-1 text-sm italic">{t.contact.emailNote}</p>
          </div>
        </div>

        <div
          className={`
            mt-4 flex items-start gap-3 border-t border-[#6b8362]/30 pt-4
          `}
        >
          <Clock className="mt-1 h-6 w-6 shrink-0 text-[#c27a5f]" />
          <div>
            <h3 className="mb-2 font-bold text-[#6b8362] uppercase">
              {t.contact.openingHours}
            </h3>
            <p className="text-sm whitespace-pre-line">
              {t.contact.openingHoursDetails}
            </p>
            <p className="mt-1 text-sm italic">
              {t.contact.openingHoursSeason}
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-6 border-t border-[#6b8362]/30 pt-4">
          <h3 className="mb-3 text-center font-bold text-[#6b8362]">
            {t.contact.followUs}
          </h3>
          <div className="flex justify-center space-x-6">
            <SocialIconWithTooltip
              href="https://www.facebook.com/ponyclubgreece"
              icon={
                <Facebook
                  className={`
                    h-5 w-5 transition-transform duration-200
                    hover:scale-125
                  `}
                />
              }
              label="Facebook"
            />
            <SocialIconWithTooltip
              href="https://www.instagram.com/ponyclub_greece/"
              icon={
                <Instagram
                  className={`
                    h-5 w-5 transition-transform duration-200
                    hover:scale-125
                  `}
                />
              }
              label="Instagram"
            />
          </div>
        </div>
      </div>
      <div
        className={`
          absolute -inset-[1px] -z-10 rounded-lg bg-linear-to-tr
          from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-xs
        `}
      />
    </div>
  );
}
