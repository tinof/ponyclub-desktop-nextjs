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
  
  // Debug message in JSX
  return (
    <>
      {children}
      {/* Hidden debug message */}
      <div className="hidden">Current path: {pathname || 'undefined'}, Is homepage: {isHomePage ? 'yes' : 'no'}</div>
      {!isHomePage && <Footer />}
    </>
  );
} 