'use client';

import Link from 'next/link'; // Added Link for logo
import { useEffect } from 'react';

import ResponsiveNavigation from '@/components/responsive-navigation';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useLanguage } from '@/contexts/language-context';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Log error in development, send to monitoring service in production
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    // In production, you might want to send this to a logging service
    // like Sentry, LogRocket, etc.
  }, [error]);

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

      <main
        className={`
          flex min-h-screen flex-col items-center justify-center bg-[#f5f0e8]
          p-4 pt-20 text-center
        `}
      >
        {' '}
        {/* Added bg color and pt-20 */}
        <h1
          className={`
            mb-4 text-5xl font-bold text-amber-800
            md:text-6xl
          `}
        >
          {t.error.title}
        </h1>{' '}
        {/* Styled heading */}
        <p className="mb-6 text-lg text-gray-700">{t.error.message}</p>
        <button
          type="button"
          onClick={() => reset()}
          className={`
            rounded-lg bg-[#c27a5f] px-6 py-3 font-semibold text-white
            transition-colors
            hover:bg-[#b06c50]
          `} /* Styled button (using a site color) */
        >
          {t.error.tryAgain}
        </button>
      </main>
    </>
  );
}
