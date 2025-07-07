"use client";

import { useEffect } from "react";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

export default function GoogleReviews() {
  const featurableWidgetId = "e22fc7c6-97ba-49d1-8391-7b5f236ffb84";

  useEffect(() => {
    // Add accessibility attributes and performance optimizations to Google Reviews elements
    const addAccessibilityAndPerformanceAttributes = () => {
      // Add aria-labels to navigation buttons
      const prevButton = document.querySelector(".css-1en7e4i");
      const nextButton = document.querySelector(".css-hzpebr");

      if (prevButton && !prevButton.getAttribute("aria-label")) {
        prevButton.setAttribute("aria-label", "Previous review");
      }
      if (nextButton && !nextButton.getAttribute("aria-label")) {
        nextButton.setAttribute("aria-label", "Next review");
      }

      // Fix ARIA hidden focus issue: Remove focusable elements from hidden slides
      const hiddenSlides = document.querySelectorAll(
        '.slick-slide[aria-hidden="true"]'
      );
      hiddenSlides.forEach((slide) => {
        const focusableElements = slide.querySelectorAll(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusableElements.forEach((element) => {
          // Store original tabindex to restore later if needed
          if (!element.hasAttribute("data-original-tabindex")) {
            const originalTabIndex = element.getAttribute("tabindex") || "0";
            element.setAttribute("data-original-tabindex", originalTabIndex);
          }
          // Make element non-focusable when slide is hidden
          element.setAttribute("tabindex", "-1");
        });
      });

      // Restore focusability for visible slides
      const visibleSlides = document.querySelectorAll(
        '.slick-slide:not([aria-hidden="true"])'
      );
      visibleSlides.forEach((slide) => {
        const focusableElements = slide.querySelectorAll(
          "[data-original-tabindex]"
        );
        focusableElements.forEach((element) => {
          const originalTabIndex =
            element.getAttribute("data-original-tabindex") || "0";
          element.setAttribute("tabindex", originalTabIndex);
        });
      });

      // Add alt text, lazy loading, and proxy Google images for better optimization
      const profileImages = document.querySelectorAll(".css-1pelb8y");
      profileImages.forEach((img, index) => {
        const imgElement = img as HTMLImageElement;

        if (!imgElement.getAttribute("alt")) {
          imgElement.setAttribute(
            "alt",
            `Google reviewer profile picture ${index + 1}`
          );
        }

        // Add lazy loading to profile images for better performance
        if (!imgElement.getAttribute("loading")) {
          imgElement.setAttribute("loading", "lazy");
        }

        // Add decoding attribute for better performance
        if (!imgElement.getAttribute("decoding")) {
          imgElement.setAttribute("decoding", "async");
        }

        // Proxy Google images through our API for better optimization and caching
        const currentSrc = imgElement.src;
        if (currentSrc?.includes("googleusercontent.com")) {
          const proxiedSrc = `/api/image-proxy?url=${encodeURIComponent(currentSrc)}`;
          imgElement.src = proxiedSrc;
        }
      });
    };

    // Run immediately and also after a delay to catch dynamically loaded content
    addAccessibilityAndPerformanceAttributes();
    const timer = setTimeout(addAccessibilityAndPerformanceAttributes, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        mt-6 mb-20 px-4
        md:px-8
      `}
    >
      <div className="mx-auto max-w-6xl rounded-2xl bg-white/90 p-4 shadow-md">
        <ReactGoogleReviews
          layout="carousel"
          featurableId={featurableWidgetId}
        />
      </div>
    </div>
  );
}
