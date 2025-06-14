'use client';

import Link from 'next/link';

import ResponsiveNavigation from '@/components/responsive-navigation';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export default function TestFooterPage() {
  return (
    <>
      <header
        className={`
          fixed top-0 right-0 left-0 z-40 flex items-center justify-between
          border-b border-gray-200 bg-[#FAF7F2] px-4 py-3
          sm:px-6
          lg:px-8
        `}
      >
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center">
            <div
              className={`
                relative h-12 w-48
                md:h-14 md:w-56
                lg:h-16 lg:w-64
              `}
            >
              <OptimizedImage
                src="/images/ponyclub_logo.png"
                alt="Pony Club Logo"
                fill
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-contain p-1"
                imageType="logo"
              />
            </div>
          </Link>
        </div>

        {/* Responsive Navigation */}
        <div>
          <ResponsiveNavigation />
        </div>
      </header>

      <main className="pt-20">
        {' '}
        {/* Added main wrapper and padding-top */}
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold">Test Footer Page</h1>
          <p className="mt-4">
            This is a test page to verify that the footer is working correctly.
          </p>
          <p className="mt-2">You should see the footer below this content.</p>
        </div>
      </main>
    </>
  );
}
