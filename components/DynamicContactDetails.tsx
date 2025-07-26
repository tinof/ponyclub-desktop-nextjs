"use client";

import dynamic from "next/dynamic";

// Dynamically import ContactDetailsEnhanced with ssr: false
const ContactDetailsEnhanced = dynamic(
  () =>
    import(
      /* webpackChunkName: "contact-details" */ "@/components/contact-details-enhanced"
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className={`
      h-80 w-full animate-pulse rounded-lg bg-gray-200 flex items-center justify-center
    `}
      >
        <span className="text-gray-500">Loading contact details...</span>
      </div>
    ),
  },
);

export default function DynamicContactDetails() {
  return <ContactDetailsEnhanced />;
}
