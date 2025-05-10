"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  // Determine if it's the homepage directly from the pathname
  const isHomePage = pathname === '/' || pathname === '';
  
  // Debug log, can be removed in production
  console.log("Current pathname:", pathname, "Is homepage:", isHomePage);
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow">
        {children}
      </div>
      {/* Hidden debug message */}
      <div className="hidden">Current path: {pathname || 'undefined'}, Is homepage: {isHomePage ? 'yes' : 'no'}</div>
      {!isHomePage && <Footer />}
    </div>
  );
}
