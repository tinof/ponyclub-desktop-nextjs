"use client";

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import SiteHeader from "./site-header"; // Added SiteHeader import

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(true);
  
  useEffect(() => {
    // More defensive check for homepage
    if (pathname) {
      setIsHomePage(pathname === '/' || pathname === '');
    }
  }, [pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      {/* Apply pt-20 to main to account for fixed SiteHeader */}
      <main className="grow pt-20 bg-[#f5f0e8]"> 
        {children}
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
}
