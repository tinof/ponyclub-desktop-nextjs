'use client';

import { MountainSnow, Sailboat, User, Waves } from 'lucide-react';
import { useEffect, useState } from 'react';

import BookingButton from '@/components/client/BookingButton';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

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
  variant,
}: PackageCardProps) {
  const [nonce, setNonce] = useState('');

  useEffect(() => {
    // Get nonce from meta tag
    const metaNonce =
      document
        .querySelector('meta[name="csp-nonce"]')
        ?.getAttribute('content') || '';
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
      button:
        'from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600',
      text: 'text-emerald-50',
    },
    amber: {
      gradient: 'from-amber-400 via-orange-500 to-red-500',
      badge: 'bg-blue-400 text-blue-900',
      glass: 'bg-white/10',
      border: 'border-white/15',
      icon: 'text-amber-300',
      priceBox: 'bg-white/20',
      button:
        'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      text: 'text-amber-50',
    },
  };

  const theme = colorTheme[variant];

  const renderActivityIcon = (index: number) => {
    if (index === 0) {
      return variant === 'green' ? (
        <Waves
          className={`
            h-3 w-3 text-white
            sm:h-4 sm:w-4
            md:h-5 md:w-5
          `}
        />
      ) : (
        <Sailboat
          className={`
            h-3 w-3 text-white
            sm:h-4 sm:w-4
            md:h-5 md:w-5
          `}
        />
      );
    }
    return (
      <MountainSnow
        className={`
          h-3 w-3 text-white
          sm:h-4 sm:w-4
          md:h-5 md:w-5
        `}
      />
    );
  };

  return (
    <div
      className={`
        bg-gradient-to-tr
        ${theme.gradient}
        mx-auto w-full max-w-md rounded-3xl p-1 shadow-2xl
      `}
    >
      <div
        className={`
          ${theme.glass}
          border backdrop-blur-xl
          ${theme.border}
          flex h-full w-full flex-col overflow-hidden rounded-3xl shadow-2xl
        `}
      >
        <div
          className={`
            flex h-full min-h-[580px] flex-col p-4
            sm:min-h-[620px] sm:p-6
            md:p-8
          `}
        >
          {/* Header */}
          <div className="mb-4 flex flex-shrink-0 items-start justify-between">
            <h2
              className={`
                text-2xl font-bold text-white
                sm:text-3xl
              `}
            >
              {title}
            </h2>
            <span
              className={`
                ${theme.badge}
                rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap
                shadow-md
                sm:text-sm
              `}
            >
              {badge}
            </span>
          </div>

          {/* Image Mosaic */}
          <div
            className={`
              mosaic-grid mb-4 h-44 flex-shrink-0 overflow-hidden rounded-xl
              border border-white/20
              sm:mb-6 sm:h-52
            `}
          >
            <div className="mosaic-main relative">
              <OptimizedImage
                src={images.main}
                alt={`${title} main activity`}
                fill
                sizes="(max-width: 512px) 45vw, 240px"
                className="h-full w-full object-cover"
                imageType="default"
              />
            </div>
            <div className="mosaic-top relative">
              <OptimizedImage
                src={images.top}
                alt={`${title} activity 2`}
                fill
                sizes="(max-width: 512px) 45vw, 240px"
                className="h-full w-full object-cover"
                imageType="default"
              />
            </div>
            <div className="mosaic-bottom relative">
              <OptimizedImage
                src={images.bottom}
                alt={`${title} activity 3`}
                fill
                sizes="(max-width: 512px) 45vw, 240px"
                className="h-full w-full object-cover"
                imageType="default"
              />
            </div>
          </div>

          {/* Activities List */}
          <ul
            className={`
              space-y-2
              sm:space-y-3
              ${theme.text}
              mb-6 flex-grow
              sm:mb-8
            `}
          >
            {[activities.primary, activities.riding, activities.hiking].map(
              (activity, index) => (
                <li
                  key={activity}
                  className={`
                  flex items-center text-sm
                  sm:text-base
                `}
                >
                  <span
                    className={`
                    inline-flex h-6 w-6 items-center justify-center
                    sm:h-8 sm:w-8
                    ${theme.icon}
                    mr-2 flex-shrink-0 rounded-full bg-white/20
                    sm:mr-3
                  `}
                  >
                    {renderActivityIcon(index)}
                  </span>
                  <span className="flex-1">{activity}</span>
                </li>
              ),
            )}
          </ul>

          {/* Pricing */}
          <div
            className={`
              mb-6 flex-shrink-0 space-y-3
              sm:mb-8 sm:space-y-4
            `}
          >
            {pricing.adults && (
              <div
                className={`
                  flex items-center justify-between
                  ${theme.priceBox}
                  rounded-xl border border-white/10 p-3 shadow-inner
                  backdrop-blur-sm
                  sm:p-4
                `}
              >
                <p
                  className={`
                    text-base font-semibold text-white
                    sm:text-lg
                  `}
                >
                  Adults
                </p>
                <p
                  className={`
                    text-xl font-bold text-white
                    sm:text-2xl
                  `}
                >
                  {pricing.adults}
                </p>
              </div>
            )}

            {pricing.children && (
              <div
                className={`
                  flex items-center justify-between
                  ${theme.priceBox}
                  rounded-xl border border-white/10 p-3 shadow-inner
                  backdrop-blur-sm
                  sm:p-4
                `}
              >
                <div>
                  <p
                    className={`
                      text-base font-semibold text-white
                      sm:text-lg
                    `}
                  >
                    Children
                  </p>
                  <p
                    className={`
                      text-xs text-white/80
                      sm:text-sm
                    `}
                  >
                    under 12 years old
                  </p>
                </div>
                <p
                  className={`
                    text-xl font-bold text-white
                    sm:text-2xl
                  `}
                >
                  {pricing.children}
                </p>
              </div>
            )}

            {pricing.perPerson && (
              <div
                className={`
                  flex items-center justify-between
                  ${theme.priceBox}
                  rounded-xl border border-white/10 p-3 shadow-inner
                  backdrop-blur-sm
                  sm:p-4
                `}
              >
                <div className="flex items-center">
                  <User
                    className={`
                      mr-2 h-4 w-4 text-white
                      sm:h-5 sm:w-5
                    `}
                  />
                  <p
                    className={`
                      text-base font-semibold text-white
                      sm:text-lg
                    `}
                  >
                    Per Person
                  </p>
                </div>
                <p
                  className={`
                    text-xl font-bold text-white
                    sm:text-2xl
                  `}
                >
                  {pricing.perPerson}
                </p>
              </div>
            )}

            {/* Add empty space for cards with less pricing info to maintain height */}
            {!pricing.children && !pricing.perPerson && (
              <div
                className={`
                  h-16
                  sm:h-20
                `}
              />
            )}
            {!pricing.adults && !pricing.children && !pricing.perPerson && (
              <div
                className={`
                  h-32
                  sm:h-40
                `}
              />
            )}
          </div>

          {/* Book Now Button */}
          <div className="mt-auto flex-shrink-0">
            <BookingButton
              id={bookingId}
              dataSrc={dataSrc}
              className={`
                w-full bg-gradient-to-r
                ${theme.button}
                flex transform items-center justify-center rounded-xl px-4 py-3
                text-base font-semibold text-white shadow-lg transition
                duration-300 ease-in-out
                hover:scale-105 hover:shadow-xl
                sm:px-6 sm:py-3.5 sm:text-lg
              `}
              trackingLabel={trackingLabel}
              packageName={packageName}
              packagePrice={packagePrice}
            >
              {bookNowText}
              <svg
                className={`
                  ml-2 h-4 w-4
                  sm:h-5 sm:w-5
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
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
