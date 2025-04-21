"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface SocialIconProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialIconWithTooltip({ href, icon, label }: SocialIconProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#6b8362] hover:text-[#c27a5f] transition-colors duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon}
      </a>
      {showTooltip && (
        <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  )
}

export default function ContactDetailsEnhanced() {
  const { t } = useLanguage()

  return (
    <div className="bg-[#f5f0e8] p-6 md:p-8 rounded-lg shadow-md transform rotate-1 border-2 border-[#6b8362]/30">
      <h2 className="text-center text-3xl mb-6 font-bold text-[#6b8362]">{t.contact.title}</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="text-[#c27a5f] h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">LOCATION</h3>
            <p className="font-medium">{t.contact.businessName}</p>
            <p>{t.contact.address1}</p>
            <p>{t.contact.address2}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-4 pt-4 border-t border-[#6b8362]/30">
          <Phone className="text-[#c27a5f] h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">Phone</h3>
            <p>{t.contact.phone1}</p>
            <p className="text-sm italic">{t.contact.phone2}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="text-[#c27a5f] h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">E-mail</h3>
            <p>{t.contact.email}</p>
            <p className="text-sm italic mt-1">{t.contact.emailNote}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 mt-4 pt-4 border-t border-[#6b8362]/30">
          <Clock className="text-[#c27a5f] h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase mb-2">{t.contact.openingHours}</h3>
            <p className="text-sm whitespace-pre-line">{t.contact.openingHoursDetails}</p>
            <p className="text-sm italic mt-1">{t.contact.openingHoursSeason}</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-6 pt-4 border-t border-[#6b8362]/30">
          <h3 className="text-center font-bold mb-3 text-[#6b8362]">{t.contact.followUs}</h3>
          <div className="flex justify-center space-x-6">
            <SocialIconWithTooltip
              href="https://facebook.com"
              icon={<Facebook className="h-5 w-5" />}
              label="Facebook"
            />
            <SocialIconWithTooltip
              href="https://instagram.com"
              icon={<Instagram className="h-5 w-5" />}
              label="Instagram"
            />
            <SocialIconWithTooltip href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
            <SocialIconWithTooltip href="https://youtube.com" icon={<Youtube className="h-5 w-5" />} label="YouTube" />
          </div>
        </div>
      </div>
    </div>
  )
}
