"use client"

import { useRef, useCallback } from "react"
import { useGDPR } from "@/contexts/gdpr-context"

interface BookingButtonProps {
  id: string;
  dataSrc: string;
  className?: string;
  children: React.ReactNode;
  trackingLabel?: string; // For identifying which button was clicked
  packageName?: string; // For enhanced ecommerce tracking
  packagePrice?: string; // For conversion value tracking
}

export default function BookingButton({
  id,
  dataSrc,
  className,
  children,
  trackingLabel = "Unknown",
  packageName = "Unknown Package",
  packagePrice = "0"
}: BookingButtonProps) {
  const clickedButtonRef = useRef<HTMLButtonElement | null>(null);
  const bokunReadyAttempts = useRef(0);
  const { consent } = useGDPR();

  const ensureBokunIsReadyAndOpen = useCallback(() => {
    if (window.BokunWidgets && (typeof window.BokunWidgets.init === 'function' || typeof window.BokunWidgets.reinit === 'function')) {
      // Check if a modal is already open (very basic check, might need refinement)
      if (document.querySelector('.bokunModalContainer') || document.querySelector('.bokun-modal-open')) {
        return;
      }

      if (clickedButtonRef.current) {
        // It's possible Bokun's scripts have now attached proper listeners.
        // A direct click might be better than trying to call their internal modal functions.
        clickedButtonRef.current.click();
        clickedButtonRef.current = null; // Clear after attempting
      }
      bokunReadyAttempts.current = 0; // Reset attempts
    } else if (bokunReadyAttempts.current < 30) { // Try for ~3 seconds
      bokunReadyAttempts.current++;
      setTimeout(ensureBokunIsReadyAndOpen, 100);
    } else {
      bokunReadyAttempts.current = 0; // Reset attempts
    }
  }, []);

  // Comprehensive tracking function for GDPR-compliant analytics
  const trackBookingClick = useCallback(() => {
    if (typeof window === 'undefined' || !consent) return;

    // Extract numeric price for conversion tracking
    const numericPrice = parseFloat(packagePrice.replace(/[^\d.]/g, '')) || 0;

    // Google Analytics 4 Event Tracking (only if analytics consent given)
    if (window.gtag && consent.analytics) {
      // Standard GA4 event
      window.gtag('event', 'book_now_click', {
        event_category: 'Booking',
        event_label: trackingLabel,
        package_name: packageName,
        package_price: numericPrice,
        currency: 'EUR',
        button_id: id,
        page_location: window.location.href,
        page_title: document.title
      });

      // Enhanced Ecommerce - Begin Checkout Event
      window.gtag('event', 'begin_checkout', {
        currency: 'EUR',
        value: numericPrice,
        items: [{
          item_id: id,
          item_name: packageName,
          item_category: 'Adventure Package',
          price: numericPrice,
          quantity: 1
        }]
      });

      // Google Ads Conversion Tracking
      const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
      const googleAdsConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
      
      if (googleAdsConversionId && googleAdsConversionLabel) {
        window.gtag('event', 'conversion', {
          send_to: `${googleAdsConversionId}/${googleAdsConversionLabel}`,
          value: numericPrice,
          currency: 'EUR',
          transaction_id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
      } else {
        console.warn('[Booking Tracking] Google Ads conversion tracking not configured. Please set NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID and NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL environment variables.');
      }
    }

    // Vercel Analytics (if available and analytics consent given)
    if (window.va && consent.analytics) {
      (window.va as any)('event', {
        name: 'Book Now Click',
        data: {
          package: packageName,
          price: numericPrice,
          button_id: id,
          label: trackingLabel
        }
      });
    }

    // Facebook Pixel (if available and marketing consent given)
    if (window.fbq && consent.marketing) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: packageName,
        content_category: 'Adventure Package',
        value: numericPrice,
        currency: 'EUR'
      });
    }

    console.log(`[Booking Tracking] ${trackingLabel} clicked - Package: ${packageName}, Price: €${numericPrice}`, 'Consent:', consent);
  }, [trackingLabel, packageName, packagePrice, id, consent]);

  const handleBookNowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Track the click immediately
    trackBookingClick();

    clickedButtonRef.current = event.currentTarget;
    ensureBokunIsReadyAndOpen(); // Direct call as loader is global
  };

  return (
    <button
      className={`bokunButton ${className}`}
      id={id}
      data-src={dataSrc}
      data-testid="widget-book-button"
      onClick={handleBookNowClick}
    >
      {children}
    </button>
  );
}