import type React from "react"
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube, Clock } from "lucide-react"

export default function ContactDetails() {
  return (
    <div className="bg-[#f5f0e8] p-6 md:p-8 rounded-lg shadow-md transform rotate-1 border-2 border-[#6b8362]/30">
      <h2 className="text-center text-3xl mb-6 font-bold text-[#6b8362]">CONTACT US</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="text-[#c27a5f] h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">LOCATION</h3>
            <p className="font-medium">Springs of Acheron River</p>
            <p>Glyki, Thesporitas</p>
            <p>46200, Greece</p>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-4 pt-4 border-t border-[#6b8362]/30">
          <Phone className="text-[#c27a5f] h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">Phone</h3>
            <p>+ 30 698 661 7090</p>
            <p className="text-sm italic">We speak Greek, English and Finnish.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="text-[#c27a5f] h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase">E-mail</h3>
            <p>info@ponyclub.gr</p>
            <p className="text-sm italic mt-1">During summer season we kindly ask you to call us, as it gets busy and we can be a bit slow to answer to email (1-2 days)</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 mt-4 pt-4 border-t border-[#6b8362]/30">
          <Clock className="text-[#c27a5f] h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#6b8362] uppercase mb-2">Opening Hours:</h3>
            <p className="text-sm">10.00 to 18.00 every day</p>
            <p className="text-sm italic mt-1">During season, otherwise we are open on request</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-6 pt-4 border-t border-[#6b8362]/30">
          <h3 className="text-center font-bold mb-3 text-[#6b8362]">FOLLOW US</h3>
          <div className="flex justify-center space-x-4">
            <SocialIcon href="https://facebook.com" icon={<Facebook />} label="Facebook" />
            <SocialIcon href="https://instagram.com" icon={<Instagram />} label="Instagram" />
            <SocialIcon href="https://twitter.com" icon={<Twitter />} label="Twitter" />
            <SocialIcon href="https://youtube.com" icon={<Youtube />} label="YouTube" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for social media icons
function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center"
      aria-label={label}
    >
      <div className="p-2 rounded-full bg-[#c27a5f]/10 text-[#c27a5f] group-hover:bg-[#c27a5f] group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="sr-only">{label}</span>
    </a>
  )
}
