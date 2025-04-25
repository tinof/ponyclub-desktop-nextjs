"use client"

import { useEffect, useState } from "react"
import HamburgerMenu from "./hamburger-menu"
import DesktopMenu from "./desktop-menu"

export default function ResponsiveNavigation() {
  // Initialize with desktop to avoid hydration mismatch (server renders with desktop)
  const [isMobile, setIsMobile] = useState(false)
  
  // Track window size and update viewport state
  useEffect(() => {
    // Function to check window width and update state
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024) // Consider screens below 1024px as mobile/tablet
    }
    
    // Initial check
    checkScreenSize()
    
    // Set up listener for window resize
    window.addEventListener('resize', checkScreenSize)
    
    // Clean up listener
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <>
      {isMobile ? (
        <HamburgerMenu />
      ) : (
        <DesktopMenu />
      )}
    </>
  )
} 