"use client";

import Link from "next/link";
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import ResponsiveNavigation from '@/components/responsive-navigation';
import { useLanguage } from '@/contexts/language-context';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F2] border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16">
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

      <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center pt-20 bg-[#f5f0e8]"> {/* Added bg color and pt-20 */}
        <h1 className="text-6xl font-bold mb-4 text-amber-800">{t.notFound.title}</h1> {/* Styled heading */}
        <p className="mb-6 text-lg text-gray-700">
          {t.notFound.message}
        </p>
        <Link
          href="/"
          className="px-6 py-3 font-semibold text-white bg-[#6b8362] rounded-lg hover:bg-[#5a7053] transition-colors" /* Styled button */
        >
          {t.notFound.goHome}
        </Link>
      </main>
    </>
  );
}
