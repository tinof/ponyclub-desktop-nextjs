"use client";

import { useEffect, useState } from "react";
import { useIsMobileOrTablet } from "@/hooks/use-media-query";
import DesktopMenu from "./desktop-menu.tsx";
import HamburgerMenu from "./hamburger-menu.tsx";

export default function ResponsiveNavigation() {
  // Use the consistent media query hook for mobile/tablet detection
  const isMobileOrTablet = useIsMobileOrTablet();

  // Track if component has mounted to handle SSR properly
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // During SSR or before client-side hydration, render desktop menu by default
  // This prevents the navigation from being completely missing
  if (!hasMounted) {
    return <DesktopMenu />;
  }

  return <>{isMobileOrTablet ? <HamburgerMenu /> : <DesktopMenu />}</>;
}
