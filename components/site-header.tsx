"use client";

import Link from "next/link";

import ResponsiveNavigation from "@/components/responsive-navigation";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export default function SiteHeader() {
  return (
    <header
      className={`
        fixed top-0 right-0 left-0 z-40 flex items-center justify-between
        border-b border-border bg-background px-4 py-3 shadow-sm
        sm:px-6
        lg:px-8
      `}
    >
      {/* Logo */}
      <div>
        <Link href="/" className="flex items-center">
          <div
            className={`
              relative h-12 w-48
              md:h-14 md:w-56
              lg:h-16 lg:w-64
            `}
          >
            <OptimizedImage
              src="/images/ponyclub_logo.png"
              alt="Acheron River Excursion"
              fill
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
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
