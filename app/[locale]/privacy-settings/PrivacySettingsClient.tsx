"use client";

import { useEffect, useState } from "react";

interface PrivacySettingsClientProps {
  locale: string;
}

// Helper function to get current consent status from cookies
function getConsentStatus() {
  if (typeof window === "undefined") {
    return { analytics: false, marketing: false };
  }

  try {
    const consentCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("consent="));

    if (consentCookie) {
      const consent = JSON.parse(
        decodeURIComponent(consentCookie.split("=")[1]),
      );
      return {
        analytics: consent.analytics || false,
        marketing: consent.marketing || false,
      };
    }
  } catch (error) {
    console.warn("Error reading consent cookie:", error);
  }

  return { analytics: false, marketing: false };
}

export default function PrivacySettingsClient({
  locale,
}: PrivacySettingsClientProps) {
  const [currentConsent, setCurrentConsent] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Get current consent status
    setCurrentConsent(getConsentStatus());
  }, []);

  const handleConsentChange = (analytics: boolean, marketing: boolean) => {
    // Update the cookie format
    const consent = { analytics, marketing };
    const cookieValue = encodeURIComponent(JSON.stringify(consent));
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    document.cookie = `consent=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    // Update local state
    setCurrentConsent(consent);

    // Trigger storage event for other components
    window.dispatchEvent(new Event("storage"));

    // Show success message
    alert(
      locale === "el"
        ? "Οι προτιμήσεις σας αποθηκεύτηκαν επιτυχώς!"
        : "Your preferences have been saved successfully!",
    );
  };

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === "el" ? "Κατηγορίες Cookies" : "Cookie Categories"}
        </h3>

        <div className="space-y-4">
          {/* Necessary Cookies - Always enabled */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                {locale === "el" ? "Απαραίτητα Cookies" : "Necessary Cookies"}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {locale === "el"
                  ? "Βασικά cookies που απαιτούνται για τη λειτουργία του ιστότοπου."
                  : "Essential cookies required for the website to function properly."}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {locale === "el" ? "Πάντα ενεργό" : "Always Active"}
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                {locale === "el" ? "Αναλυτικά Cookies" : "Analytics Cookies"}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {locale === "el"
                  ? "Μας βοηθούν να κατανοήσουμε πώς οι επισκέπτες χρησιμοποιούν τον ιστότοπό μας."
                  : "Help us understand how visitors interact with our website."}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={currentConsent.analytics}
                onChange={e =>
                  handleConsentChange(
                    e.target.checked,
                    currentConsent.marketing,
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600" />
            </label>
          </div>

          {/* Marketing Cookies */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                {locale === "el" ? "Cookies Μάρκετινγκ" : "Marketing Cookies"}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {locale === "el"
                  ? "Χρησιμοποιούνται για εξατομικευμένες διαφημίσεις και παρακολούθηση καμπανιών."
                  : "Used for personalized advertisements and campaign tracking."}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={currentConsent.marketing}
                onChange={e =>
                  handleConsentChange(
                    currentConsent.analytics,
                    e.target.checked,
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600" />
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={() => handleConsentChange(true, true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {locale === "el" ? "Αποδοχή Όλων" : "Accept All"}
          </button>
          <button
            type="button"
            onClick={() => handleConsentChange(false, false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {locale === "el" ? "Απόρριψη Όλων" : "Reject All"}
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          {locale === "el"
            ? "Οι αλλαγές θα εφαρμοστούν αμέσως. Μπορείτε να επιστρέψετε σε αυτή τη σελίδα ανά πάσα στιγμή για να αλλάξετε τις προτιμήσεις σας."
            : "Changes will be applied immediately. You can return to this page at any time to change your preferences."}
        </p>
      </div>
    </div>
  );
}
