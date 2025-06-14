'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import menu components
const HamburgerMenu = dynamic(() => import('./hamburger-menu'), { ssr: false });
const DesktopMenu = dynamic(() => import('./desktop-menu'), { ssr: false });

export default function ResponsiveNavigation() {
  // Initialize with a value that matches server render, then update on client
  // Setting initial to false (desktop) is fine if server always renders desktop first.
  // Or, consider initializing to null/undefined and showing a loader/placeholder
  // to avoid rendering anything until client-side check is done,
  // but this might cause layout shift or flicker.
  // Current approach of useState(false) and then client-side update is common.
  const [isMobile, setIsMobile] = useState(false); // Default to desktop for SSR consistency

  // Track window size and update viewport state
  useEffect(() => {
    // Function to check window width and update state
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Consider screens below 1024px as mobile/tablet
    };

    // Initial check
    checkScreenSize();

    // Set up listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return <>{isMobile ? <HamburgerMenu /> : <DesktopMenu />}</>;
}
