'use client'

import { Roboto_Slab } from 'next/font/google'

import ActivityPageLayout from '@/components/ActivityPageLayout'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { useLanguage } from '@/contexts/language-context'

// Define Roboto Slab font instance
const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  variable: '--font-roboto-slab',
  weight: ['400', '700', '900'],
})

export default function RiverVillagePage() {
  const { t, language } = useLanguage()

  // Enhanced description content with glassmorphism effect
  const descriptionContent = (
    <div
      className={`
        group relative transform overflow-hidden rounded-2xl p-6 shadow-xl
        transition-all duration-500
        hover:scale-[1.01]
      `}
    >
      {/* Background layers */}
      <div
        className={`
          absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-[#f5f0e8]/95
          via-white/90 to-[#f5f0e8]/95 backdrop-blur-md
        `}
      ></div>
      <div className='absolute inset-0 -z-20 rounded-2xl bg-[#6b8362]/5'></div>

      {/* Decorative effects */}
      <div
        className={`
          pointer-events-none absolute -inset-[3px] -z-10 rounded-2xl opacity-70
        `}
      >
        <div
          className={`
            absolute inset-0 rounded-2xl bg-linear-to-tr from-amber-200/30
            via-transparent to-[#6b8362]/20
          `}
        ></div>
      </div>
      <div
        className={`
          pointer-events-none absolute inset-0 rounded-2xl border
          border-amber-200/30
        `}
      ></div>

      {/* Title with underline effect */}
      <h2
        className={`
          ${robotoSlab.variable}
          relative mb-6 inline-block font-roboto-slab text-3xl font-bold
          text-[#3E5A35]
          md:text-4xl
        `}
      >
        {t.riverVillage.descriptionTitle}
        <div
          className={`
            absolute -bottom-2 left-0 h-[2px] w-full bg-linear-to-r
            from-transparent via-[#6b8362]/70 to-transparent
          `}
        ></div>
      </h2>

      {/* Content */}
      <div
        className='prose max-w-none text-gray-700'
        dangerouslySetInnerHTML={{ __html: t.riverVillage.descriptionContent }}
      />
    </div>
  )

  // Enhanced details content with Natura 2000 logo
  const detailsContent = (
    <div
      className={`
        group relative transform overflow-hidden rounded-2xl p-6 shadow-xl
        transition-all duration-500
        hover:scale-[1.01]
      `}
    >
      {/* Background layers */}
      <div
        className={`
          absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-[#f5f0e8]/95
          via-white/90 to-[#f5f0e8]/95 backdrop-blur-md
        `}
      ></div>
      <div className='absolute inset-0 -z-20 rounded-2xl bg-[#6b8362]/5'></div>

      {/* Decorative effects */}
      <div
        className={`
          pointer-events-none absolute -inset-[3px] -z-10 rounded-2xl opacity-70
        `}
      >
        <div
          className={`
            absolute inset-0 rounded-2xl bg-linear-to-tr from-amber-200/30
            via-transparent to-[#6b8362]/20
          `}
        ></div>
      </div>
      <div
        className={`
          pointer-events-none absolute inset-0 rounded-2xl border
          border-amber-200/30
        `}
      ></div>

      {/* Title with underline effect */}
      <h2
        className={`
          ${robotoSlab.variable}
          relative mb-6 inline-block font-roboto-slab text-3xl font-bold
          text-[#3E5A35]
          md:text-4xl
        `}
      >
        {t.riverVillage.detailsTitle}
        <div
          className={`
            absolute -bottom-2 left-0 h-[2px] w-full bg-linear-to-r
            from-transparent via-[#6b8362]/70 to-transparent
          `}
        ></div>
      </h2>

      {/* Content */}
      <div className='prose max-w-none text-gray-700'>
        <div dangerouslySetInnerHTML={{ __html: t.riverVillage.detailsContent }} />

        {/* Natura 2000 logo with enhanced styling */}
        <div className='mt-8 flex flex-col items-center'>
          <p className='mb-3 text-center text-sm text-gray-600 italic'>
            {language === 'en'
              ? "Protected by EU's Natura 2000 program"
              : 'Προστατεύεται από το πρόγραμμα Natura 2000 της ΕΕ'}
          </p>
          <div
            className={`
              relative h-32 w-48 rounded-xl border border-amber-100/70
              bg-white/80 p-3 shadow-lg transition-shadow duration-300
              hover:shadow-xl
            `}
          >
            <OptimizedImage
              src='/images/natura_2000.png'
              alt='Natura 2000 Logo'
              fill
              sizes='192px'
              className='object-contain'
              imageType='logo'
            />
            <div
              className={`
                absolute -inset-[1px] -z-10 rounded-xl bg-linear-to-tr
                from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-xs
              `}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <ActivityPageLayout
      title={t.riverVillage.pageTitle}
      subtitle={t.riverVillage.pageSubtitle}
      descriptionTitle=''
      descriptionContent={descriptionContent}
      detailsTitle={t.riverVillage.detailsTitle}
      detailsContent={detailsContent}
      pricingTitle=''
      pricingContent={null}
      useSingleColumn={true}
    />
  )
}
