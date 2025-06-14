'use client';

import dynamic from 'next/dynamic';

// Dynamically import ContactDetailsEnhanced with ssr: false
const ContactDetailsEnhanced = dynamic(
  () => import('@/components/contact-details-enhanced'),
  {
    ssr: false,
    loading: () => (
      <div
        className={`
    h-80 w-full animate-pulse rounded-lg bg-gray-200
  `}
      />
    ),
  },
);

export default function DynamicContactDetails() {
  return <ContactDetailsEnhanced />;
}
