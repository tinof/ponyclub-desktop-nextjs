'use client'

import dynamic from 'next/dynamic'
import React from 'react'

// Dynamically import ContactDetailsEnhanced with ssr: false
const ContactDetailsEnhanced = dynamic(() => import('@/components/contact-details-enhanced'), {
  ssr: false,
  loading: () => <div className='h-80 w-full bg-gray-200 animate-pulse rounded-lg' />,
})

export default function DynamicContactDetails() {
  return <ContactDetailsEnhanced />
}
