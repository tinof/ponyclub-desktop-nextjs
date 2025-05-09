"use client"

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GoogleMap with ssr: false
const GoogleMap = dynamic(() => import('@/components/google-map'), { 
  ssr: false, 
  loading: () => <div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg" /> 
});

export default function DynamicGoogleMap() {
  return <GoogleMap />;
} 