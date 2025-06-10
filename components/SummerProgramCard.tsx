'use client'

import { Waves, MountainSnow, Sailboat } from 'lucide-react'
import { Roboto_Slab } from 'next/font/google'
import React from 'react'

import { BorderBeam } from '@/components/ui/border-beam'
import { GridPattern } from '@/components/ui/grid-pattern'
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
    <div className='group relative w-full md:w-1/2'>
      <div className='relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.03] hover:translate-y-[-8px] transition-all duration-500 h-[600px] md:h-[650px] border-l-4 border-[#19563F]'>
        {/* Background: Video or Image */}
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload='metadata' // Changed from none to metadata for faster first frame
            className='absolute inset-0 w-full h-full object-cover z-0'
            poster={imageSrc} // Use imageSrc as poster
          />
        ) : (
          <OptimizedImage
            src={imageSrc}
            alt={title}
            fill
            sizes='(max-width: 767px) 100vw, 50vw'
            className='object-cover z-0'
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
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10'></div>

        {/* Card Content Layer */}
        <div className='absolute inset-0 flex flex-col h-full z-20 p-6'>
          {/* Top Section - Badge and Title */}
          <div className='mb-4'>
            {badgeLabel && (
              <div
                className={cn(
                  'inline-block rounded-full px-4 py-1.5 text-white text-xs sm:text-sm font-semibold mb-3 shadow-lg border border-white/20 backdrop-blur-sm',
                  badgeColor
                )}
              >
                {badgeLabel}
              </div>
            )}
            <h3
              className={`${robotoSlab.variable} font-roboto-slab text-3xl sm:text-4xl font-bold text-white drop-shadow-lg leading-tight`}
            >
              {title}
            </h3>
          </div>

          {/* Center Section - Activity List with "Breaking" Icons */}
          <div className='grow my-4'>
            <div className='bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30 max-w-sm'>
              <ul className='space-y-3 text-gray-800'>
                {highlights.map((highlight, index) => (
                  <li key={index} className='flex items-center gap-3'>
                    <div className='relative -top-8 -left-2 transform group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300'>
                      <div className='flex items-center justify-center bg-[#19563F] rounded-full p-2.5 shadow-md w-10 h-10'>
                        <highlight.icon className='w-5 h-5 text-white' />
                      </div>
                    </div>
                    <span className='font-medium text-sm sm:text-base -ml-4'>{highlight.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section - Price and Button */}
          <div className='mt-auto'>
            <div className='bg-black/50 backdrop-blur-md p-5 rounded-xl border-t border-white/20'>
              <div className='flex flex-col items-center text-center'>
                <div className='text-4xl sm:text-5xl font-bold text-white mb-1'>
                  <NumberTicker value={price} className='text-white' />
                  <span className='text-3xl sm:text-4xl'>{priceSuffix}</span>
                </div>
                {priceDetails && <p className='text-xs sm:text-sm text-white/80 mb-4'>{priceDetails}</p>}
                <PulsatingButton
                  className='w-full text-lg font-semibold py-3 rounded-lg bg-[#6b8362] hover:bg-[#3E5A35] text-white transition-all duration-300 shadow-lg hover:shadow-xl'
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
