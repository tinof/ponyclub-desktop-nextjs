"use client";

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function Footer() {
  const { t } = useLanguage();
  const mapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Pony+Club+Ecotourism";
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative mt-12 py-8 px-4 bg-[#f5f0e8] border-t-2 border-amber-200">
      <div className="container mx-auto max-w-5xl">
        <div className="relative bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-amber-100/70 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-center text-3xl mb-6 font-bold text-[#6b8362] relative inline-block w-full">
            {t.footer.contactUs}
            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-[#c27a5f]" />
                <div>
                  <p className="font-medium">{t.footer.address.line1}</p>
                  <p>{t.footer.address.line2}</p>
                  <p>{t.footer.address.line3}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-[#c27a5f]" />
                <div>
                  <p>{t.footer.phone}</p>
                  <p className="text-sm mt-1">{t.footer.phoneLang}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-[#c27a5f]" />
                <div>
                  <p>{t.footer.email}</p>
                  <p className="text-sm mt-1 text-gray-600">{t.footer.emailNote}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1 text-[#c27a5f]" />
                <div>
                  <p className="font-medium">{t.footer.openHours.title}</p>
                  <p>{t.footer.openHours.schedule}</p>
                  <p className="text-sm text-gray-600">{t.footer.openHours.season}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href={mapsUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#6b8362] rounded-md hover:bg-[#5a7053] group"
                >
                  <span className="w-full h-full bg-gradient-to-br from-[#6b8362] via-[#7b9372] to-[#6b8362] absolute"></span>
                  <span className="relative flex items-center gap-2 text-white group-hover:scale-105 transition-transform duration-300">
                    <MapPin className="h-5 w-5" />
                    <span>Find Us / {t.footer.findUs}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>{t.footer.copyright.replace("{year}", currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
} 