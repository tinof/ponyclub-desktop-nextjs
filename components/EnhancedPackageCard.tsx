'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Waves, MountainSnow, Sailboat, User } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import BookingButton from '@/components/client/BookingButton';

interface PackageCardProps {
  title: string;
  badge: string;
  activities: {
    primary: string;
    riding: string;
    hiking: string;
  };
  pricing: {
    adults?: string;
    children?: string;
    perPerson?: string;
  };
  images: {
    main: string;
    top: string;
    bottom: string;
  };
  bookingId: string;
  dataSrc: string;
  bookNowText: string;
  packageName: string;
  packagePrice: string;
  trackingLabel: string;
  variant: 'green' | 'amber';
}

export default function EnhancedPackageCard({
  title,
  badge,
  activities,
  pricing,
  images,
  bookingId,
  dataSrc,
  bookNowText,
  packageName,
  packagePrice,
  trackingLabel,
  variant
}: PackageCardProps) {
  const [nonce, setNonce] = useState('');

  useEffect(() => {
    // Get nonce from meta tag
    const metaNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content') || '';
    setNonce(metaNonce);
  }, []);
  const colorTheme = {
    green: {
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      badge: 'bg-yellow-400 text-yellow-900',
      glass: 'bg-white/10',
      border: 'border-white/15',
      icon: 'text-emerald-300',
      priceBox: 'bg-white/20',
      button: 'from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600',
      text: 'text-emerald-50'
    },
    amber: {
      gradient: 'from-amber-400 via-orange-500 to-red-500',
      badge: 'bg-blue-400 text-blue-900',
      glass: 'bg-white/10',
      border: 'border-white/15',
      icon: 'text-amber-300',
      priceBox: 'bg-white/20',
      button: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      text: 'text-amber-50'
    }
  };

  const theme = colorTheme[variant];

  const renderActivityIcon = (index: number) => {
    if (index === 0) {
      return variant === 'green' ? 
        <Waves className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" /> : 
        <Sailboat className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />;
    }
    return <MountainSnow className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />;
  };

  return (
    <div className={`bg-gradient-to-tr ${theme.gradient} p-1 rounded-3xl shadow-2xl w-full max-w-md mx-auto`}>
      <div className={`${theme.glass} backdrop-blur-xl border ${theme.border} shadow-2xl rounded-3xl overflow-hidden w-full h-full flex flex-col`}>
        <div className="p-4 sm:p-6 md:p-8 flex flex-col h-full min-h-[580px] sm:min-h-[620px]">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
            <span className={`${theme.badge} text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap`}>
              {badge}
            </span>
          </div>

          {/* Image Mosaic */}
          <div className="mosaic-grid h-44 sm:h-52 mb-4 sm:mb-6 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
            <div className="relative mosaic-main">
              <OptimizedImage
                src={images.main}
                alt={`${title} main activity`}
                fill
                sizes="(max-width: 512px) 45vw, 240px"
                className="w-full h-full object-cover"
                imageType="default"
              />
            </div>
            <div className="relative mosaic-top">
              <OptimizedImage
                src={images.top}
                alt={`${title} activity 2`}
                fill
                sizes="(max-width: 512px) 45vw, 240px"
                className="w-full h-full object-cover"
                imageType="default"
              />
            </div>
            <div className="relative mosaic-bottom">
              <OptimizedImage
                src={images.bottom}
                alt={`${title} activity 3`}
                fill
                sizes="(max-width: 512px) 45vw, 240px"
                className="w-full h-full object-cover"
                imageType="default"
              />
            </div>
          </div>

          {/* Activities List */}
          <ul className={`space-y-2 sm:space-y-3 ${theme.text} mb-6 sm:mb-8 flex-grow`}>
            {[activities.primary, activities.riding, activities.hiking].map((activity, index) => (
              <li key={index} className="flex items-center text-sm sm:text-base">
                <span className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 ${theme.icon} mr-2 sm:mr-3 bg-white/20 rounded-full flex-shrink-0`}>
                  {renderActivityIcon(index)}
                </span>
                <span className="flex-1">{activity}</span>
              </li>
            ))}
          </ul>

          {/* Pricing */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4 flex-shrink-0">
            {pricing.adults && (
              <div className={`flex justify-between items-center ${theme.priceBox} backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 shadow-inner`}>
                <p className="text-base sm:text-lg font-semibold text-white">Adults</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{pricing.adults}</p>
              </div>
            )}
            
            {pricing.children && (
              <div className={`flex justify-between items-center ${theme.priceBox} backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 shadow-inner`}>
                <div>
                  <p className="text-base sm:text-lg font-semibold text-white">Children</p>
                  <p className="text-xs sm:text-sm text-white/80">under 12 years old</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">{pricing.children}</p>
              </div>
            )}

            {pricing.perPerson && (
              <div className={`flex justify-between items-center ${theme.priceBox} backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 shadow-inner`}>
                <div className="flex items-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2" />
                  <p className="text-base sm:text-lg font-semibold text-white">Per Person</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">{pricing.perPerson}</p>
              </div>
            )}

            {/* Add empty space for cards with less pricing info to maintain height */}
            {!pricing.children && !pricing.perPerson && (
              <div className="h-16 sm:h-20"></div>
            )}
            {!pricing.adults && !pricing.children && !pricing.perPerson && (
              <div className="h-32 sm:h-40"></div>
            )}
          </div>

          {/* Book Now Button */}
          <div className="mt-auto flex-shrink-0">
            <BookingButton
              id={bookingId}
              dataSrc={dataSrc}
              className={`w-full bg-gradient-to-r ${theme.button} text-white font-semibold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-base sm:text-lg shadow-lg hover:shadow-xl`}
              trackingLabel={trackingLabel}
              packageName={packageName}
              packagePrice={packagePrice}
            >
              {bookNowText}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </BookingButton>
          </div>
        </div>
      </div>

      <style jsx nonce={nonce}>{`
        .mosaic-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 6px;
        }
        .mosaic-main {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
        }
        .mosaic-top {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        .mosaic-bottom {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }
      `}</style>
    </div>
  );
}
