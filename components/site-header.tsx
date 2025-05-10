"use client";

import Link from "next/link";
import ResponsiveNavigation from "@/components/responsive-navigation";
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F2] border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link href="/" className="flex items-center">
          <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16">
            <OptimizedImage
              src="/images/ponyclub_logo.png"
              alt="Acheron River Excursion"
              fill
              imageType="logo"
              className="object-contain p-1"
            />
          </div>
        </Link>
      </div>

      {/* Responsive Navigation */}
      <div>
        <ResponsiveNavigation />
      </div>
    </header>
  );
}
