'use client'

import { Roboto_Slab } from 'next/font/google'
import React from 'react'

import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { PulsatingButton } from '@/components/ui/pulsating-button'
import { useLanguage } from '@/contexts/language-context' // Assuming this context provides 't' for translations
import { cn } from '@/lib/utils'

const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  weight: ['400', '700'],
  variable: '--font-roboto-slab',
})

interface ActivityHighlight {
  icon: React.ElementType
  text: string
}

interface SummerProgramCardProps {
  title: string
  price: number
  priceSuffix?: string // e.g., "€ Adults" or "€ per person"
  priceDetails?: string // e.g., "10 € children under 12 years old"
  videoSrc?: string
  imageSrc: string // Fallback if video isn't available or for poster
  highlights: ActivityHighlight[]
  badgeLabel?: string
  badgeColor?: string // Tailwind color class e.g., "bg-green-500"
  bookingId: string
  bokunDataSrc: string
  onBookNowClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  isPopular?: boolean // To conditionally apply "Most Popular" styling or different BorderBeam
}

export function SummerProgramCard({
  title,
  price,
  priceSuffix = '€',
  priceDetails,
  videoSrc,
  imageSrc,
  highlights,
  badgeLabel,
  badgeColor = 'bg-green-500',
  bookingId,
  bokunDataSrc,
  onBookNowClick,
  isPopular = false,
}: SummerProgramCardProps) {
  const { t } = useLanguage() // For "Book Now" and other potential translations

  return (
    <div
      className={`
        group relative w-full
        md:w-1/2
      `}
    >
      <div
        className={`
          relative h-[600px] transform overflow-hidden rounded-2xl border-l-4
          border-[#19563F] shadow-xl transition-all duration-500
          hover:translate-y-[-8px] hover:scale-[1.03]
          md:h-[650px]
        `}
      >
        {/* Background: Video or Image */}
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload='metadata' // Changed from none to metadata for faster first frame
            className='absolute inset-0 z-0 h-full w-full object-cover'
            poster={imageSrc} // Use imageSrc as poster
          />
        ) : (
          <OptimizedImage
            src={imageSrc}
            alt={title}
            fill
            sizes='(max-width: 767px) 100vw, 50vw'
            className='z-0 object-cover'
            imageType='default'
            priority // Consider making this conditional if many cards
          />
        )}

        {/* Subtle Topo Lines Background for the entire card section - to be added in parent page.tsx */}
        {/* <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-500/10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]"
        /> */}

        {/* Glass Overlay / Content Protection */}
        <div
          className={`
            absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40
            to-transparent
          `}
        ></div>

        {/* Card Content Layer */}
        <div className='absolute inset-0 z-20 flex h-full flex-col p-6'>
          {/* Top Section - Badge and Title */}
          <div className='mb-4'>
            {badgeLabel && (
              <div
                className={cn(
                  `
                    mb-3 inline-block rounded-full border border-white/20 px-4
                    py-1.5 text-xs font-semibold text-white shadow-lg
                    backdrop-blur-sm
                    sm:text-sm
                  `,
                  badgeColor
                )}
              >
                {badgeLabel}
              </div>
            )}
            <h3
              className={`
                ${robotoSlab.variable}
                font-roboto-slab text-3xl leading-tight font-bold text-white
                drop-shadow-lg
                sm:text-4xl
              `}
            >
              {title}
            </h3>
          </div>

          {/* Center Section - Activity List with "Breaking" Icons */}
          <div className='my-4 grow'>
            <div
              className={`
                max-w-sm rounded-xl border border-white/30 bg-white/80 p-4
                shadow-lg backdrop-blur-md
              `}
            >
              <ul className='space-y-3 text-gray-800'>
                {highlights.map((highlight, index) => (
                  <li key={index} className='flex items-center gap-3'>
                    <div
                      className={`
                        relative -top-8 -left-2 transform transition-transform
                        duration-300
                        group-hover:-translate-y-1 group-hover:scale-110
                      `}
                    >
                      <div
                        className={`
                          flex h-10 w-10 items-center justify-center
                          rounded-full bg-[#19563F] p-2.5 shadow-md
                        `}
                      >
                        <highlight.icon className='h-5 w-5 text-white' />
                      </div>
                    </div>
                    <span
                      className={`
                        -ml-4 text-sm font-medium
                        sm:text-base
                      `}
                    >
                      {highlight.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section - Price and Button */}
          <div className='mt-auto'>
            <div
              className={`
                rounded-xl border-t border-white/20 bg-black/50 p-5
                backdrop-blur-md
              `}
            >
              <div className='flex flex-col items-center text-center'>
                <div
                  className={`
                    mb-1 text-4xl font-bold text-white
                    sm:text-5xl
                  `}
                >
                  <NumberTicker value={price} className='text-white' />
                  <span
                    className={`
                      text-3xl
                      sm:text-4xl
                    `}
                  >
                    {priceSuffix}
                  </span>
                </div>
                {priceDetails && (
                  <p
                    className={`
                      mb-4 text-xs text-white/80
                      sm:text-sm
                    `}
                  >
                    {priceDetails}
                  </p>
                )}
                <PulsatingButton
                  className={`
                    w-full rounded-lg bg-[#6b8362] py-3 text-lg font-semibold
                    text-white shadow-lg transition-all duration-300
                    hover:bg-[#3E5A35] hover:shadow-xl
                  `}
                  pulseColor='rgba(255, 255, 255, 0.5)'
                  id={bookingId}
                  data-src={bokunDataSrc}
                  onClick={onBookNowClick}
                >
                  {t.booking.bookNow || 'Book Now'}
                </PulsatingButton>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Border Beam */}
        {isPopular ? (
          <BorderBeam duration={8} size={150} colorFrom='#FFD700' colorTo='#FFA500' /> // Gold/Orange for popular
        ) : (
          <BorderBeam duration={10} size={100} colorFrom='#4ade80' colorTo='#3b82f6' /> // Green/Blue for standard
        )}
      </div>
    </div>
  )
}

// Default export for lazy loading if needed, or named export for direct use.
export default SummerProgramCard
