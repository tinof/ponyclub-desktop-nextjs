"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import SiteHeader from "./site-header.tsx"; // Added SiteHeader import

// Dynamic import for Footer since it's always below the fold
const DynamicFooter = dynamic(() => import("./Footer.tsx"), {
  ssr: false,
  loading: () => (
    <div className="h-32 w-full animate-pulse bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">Loading footer...</span>
    </div>
  ),
});

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    // More defensive check for homepage
    if (pathname) {
      setIsHomePage(pathname === "/" || pathname === "");
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {/* Apply pt-20 to main to account for fixed SiteHeader */}
      <main className="grow bg-[#f9f7f2] pt-20">
        {/* Page content */}
        {children}
      </main>
      {!isHomePage && <DynamicFooter />}
    </div>
  );
}
