"use client";

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(true);
  
  useEffect(() => {
    // More defensive check for homepage
    console.log("Current pathname:", pathname);
    if (pathname) {
      setIsHomePage(pathname === '/' || pathname === '');
    }
  }, [pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {children}
      </div>
      {/* Hidden debug message */}
      <div className="hidden">Current path: {pathname || 'undefined'}, Is homepage: {isHomePage ? 'yes' : 'no'}</div>
      {!isHomePage && <Footer />}
    </div>
  );
} 