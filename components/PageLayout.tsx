'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import Footer from './Footer';
import SiteHeader from './site-header'; // Added SiteHeader import

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
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {/* Apply pt-20 to main to account for fixed SiteHeader */}
      <main className="grow bg-[#f9f7f2] pt-20">
        {/* Page content */}
        {children}
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
}
