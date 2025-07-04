'use client';

import { useCallback } from 'react';

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
  trackingLabel = 'Unknown',
  packageName = 'Unknown Package',
  packagePrice = '0',
}: BookingButtonProps) {
  // Comprehensive tracking function for analytics
  const trackBookingClick = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Extract numeric price for conversion tracking
    const numericPrice =
      Number.parseFloat(packagePrice.replace(/[^\d.]/g, '')) || 0;

    // Google Analytics 4 Event Tracking
    if (window.gtag) {
      // Standard GA4 event
      window.gtag('event', 'book_now_click', {
        event_category: 'Booking',
        event_label: trackingLabel,
        package_name: packageName,
        package_price: numericPrice,
        currency: 'EUR',
        button_id: id,
        page_location: window.location.href,
        page_title: document.title,
      });

      // Enhanced Ecommerce - Begin Checkout Event
      window.gtag('event', 'begin_checkout', {
        currency: 'EUR',
        value: numericPrice,
        items: [
          {
            item_id: id,
            item_name: packageName,
            item_category: 'Adventure Package',
            price: numericPrice,
            quantity: 1,
          },
        ],
      });

      // Google Ads Conversion Tracking
      const googleAdsConversionId =
        process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
      const googleAdsConversionLabel =
        process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

      if (googleAdsConversionId && googleAdsConversionLabel) {
        window.gtag('event', 'conversion', {
          send_to: `${googleAdsConversionId}/${googleAdsConversionLabel}`,
          value: numericPrice,
          currency: 'EUR',
          transaction_id: `booking_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        });
      } else if (process.env.NODE_ENV === 'development') {
        console.warn(
          '[Booking Tracking] Google Ads conversion tracking not configured. Please set NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID and NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL environment variables.',
        );
      }
    }

    // Vercel Analytics (if available)
    if (window.va) {
      type VercelAnalytics = (
        event: string,
        data: { name: string; data: Record<string, unknown> },
      ) => void;
      (window.va as VercelAnalytics)('event', {
        name: 'Book Now Click',
        data: {
          package: packageName,
          price: numericPrice,
          button_id: id,
          label: trackingLabel,
        },
      });
    }

    // Facebook Pixel (if available)
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: packageName,
        content_category: 'Adventure Package',
        value: numericPrice,
        currency: 'EUR',
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[Booking Tracking] ${trackingLabel} clicked - Package: ${packageName}, Price: €${numericPrice}`,
      );
    }
  }, [trackingLabel, packageName, packagePrice, id]);

  const handleBookNowClick = () => {
    // Defer tracking the click to avoid interfering with Bokun's immediate action
    setTimeout(() => {
      trackBookingClick();
    }, 0); // Defer to the next tick of the event loop

    // Allow Bokun's native click handler to execute immediately
    // No need for manual re-initialization or re-clicking the button here,
    // as Bokun's script should handle it if properly loaded.
  };

  return (
    <button
      className={`
        bokunButton
        ${className}
      `}
      id={id}
      data-src={dataSrc}
      data-testid="widget-book-button"
      onClick={handleBookNowClick}
      aria-label={`Book ${packageName} package for ${packagePrice}`}
      aria-describedby={`${id}-description`}
    >
      {children}
      <span id={`${id}-description`} className="sr-only">
        Opens booking form for {packageName} adventure package
      </span>
    </button>
  );
}
