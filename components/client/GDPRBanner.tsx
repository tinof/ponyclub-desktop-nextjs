'use client'

import { BarChart3, Settings, Shield, Target, X } from 'lucide-react'
import { useState } from 'react'

import { useGDPR, type CookieConsent } from '@/contexts/gdpr-context'
import { useLanguage } from '@/contexts/language-context'

export default function GDPRBanner() {
  const {
    consent: _consent,
    showBanner,
    showCustomize,
    acceptAll,
    rejectAll,
    saveCustom,
    openCustomize,
    closeBanner,
  } = useGDPR()
  const { t } = useLanguage()
  const [customConsent, setCustomConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: true,
    marketing: true,
  })

  if (!showBanner) return null

  const handleCustomConsentChange = (type: keyof CookieConsent, value: boolean) => {
    setCustomConsent(prev => ({
      ...prev,
      [type]: type === 'necessary' ? true : value, // Necessary cookies always enabled
    }))
  }

  if (showCustomize) {
    return (
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4
          backdrop-blur-sm
        `}
      >
        <div
          className={`
            max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white
            shadow-2xl
          `}
        >
          {/* Header */}
          <div
            className={`
              flex items-center justify-between border-b border-gray-200 p-6
            `}
          >
            <h2
              className={`
                flex items-center gap-2 text-2xl font-bold text-[#3E5A35]
              `}
            >
              <Settings className='h-6 w-6' />
              {t.gdpr.customize}
            </h2>
            <button
              onClick={closeBanner}
              className={`
                rounded-full p-2 transition-colors
                hover:bg-gray-100
              `}
              aria-label='Close cookie settings'
            >
              <X className='h-5 w-5 text-gray-500' />
            </button>
          </div>

          {/* Content */}
          <div className='space-y-6 p-6'>
            <p className='leading-relaxed text-gray-600'>{t.gdpr.description}</p>

            {/* Cookie Categories */}
            <div className='space-y-4'>
              {/* Necessary Cookies */}
              <div className='rounded-lg border border-gray-200 p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Shield className='h-5 w-5 text-green-600' />
                    <h3 className='font-semibold text-gray-900'>{t.gdpr.necessary}</h3>
                  </div>
                  <div
                    className={`
                      rounded-full bg-green-100 px-3 py-1 text-sm font-medium
                      text-green-800
                    `}
                  >
                    Always Active
                  </div>
                </div>
                <p className='text-sm text-gray-600'>{t.gdpr.necessaryDescription}</p>
              </div>

              {/* Analytics Cookies */}
              <div className='rounded-lg border border-gray-200 p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <BarChart3 className='h-5 w-5 text-blue-600' />
                    <h3 className='font-semibold text-gray-900'>{t.gdpr.analytics}</h3>
                  </div>
                  <label
                    className={`
                      relative inline-flex cursor-pointer items-center
                    `}
                  >
                    <input
                      type='checkbox'
                      checked={customConsent.analytics}
                      onChange={e => handleCustomConsentChange('analytics', e.target.checked)}
                      className='peer sr-only'
                    />
                    <div
                      className={`
                        peer h-6 w-11 rounded-full bg-gray-200
                        peer-checked:bg-[#6b8362]
                        peer-checked:after:translate-x-full
                        peer-checked:after:border-white
                        peer-focus:ring-4 peer-focus:ring-[#6b8362]/20
                        peer-focus:outline-none
                        after:absolute after:top-[2px] after:left-[2px]
                        after:h-5 after:w-5 after:rounded-full after:bg-white
                        after:transition-all after:content-['']
                      `}
                    ></div>
                  </label>
                </div>
                <p className='text-sm text-gray-600'>{t.gdpr.analyticsDescription}</p>
              </div>

              {/* Marketing Cookies */}
              <div className='rounded-lg border border-gray-200 p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Target className='h-5 w-5 text-purple-600' />
                    <h3 className='font-semibold text-gray-900'>{t.gdpr.marketing}</h3>
                  </div>
                  <label
                    className={`
                      relative inline-flex cursor-pointer items-center
                    `}
                  >
                    <input
                      type='checkbox'
                      checked={customConsent.marketing}
                      onChange={e => handleCustomConsentChange('marketing', e.target.checked)}
                      className='peer sr-only'
                    />
                    <div
                      className={`
                        peer h-6 w-11 rounded-full bg-gray-200
                        peer-checked:bg-[#6b8362]
                        peer-checked:after:translate-x-full
                        peer-checked:after:border-white
                        peer-focus:ring-4 peer-focus:ring-[#6b8362]/20
                        peer-focus:outline-none
                        after:absolute after:top-[2px] after:left-[2px]
                        after:h-5 after:w-5 after:rounded-full after:bg-white
                        after:transition-all after:content-['']
                      `}
                    ></div>
                  </label>
                </div>
                <p className='text-sm text-gray-600'>{t.gdpr.marketingDescription}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`
                flex flex-col gap-3 pt-4
                sm:flex-row
              `}
            >
              <button
                onClick={() => saveCustom(customConsent)}
                className={`
                  flex-1 rounded-lg bg-[#6b8362] px-6 py-3 font-semibold
                  text-white shadow-md transition-colors duration-300
                  hover:bg-[#3E5A35] hover:shadow-lg
                `}
                aria-label='Save custom cookie preferences'
              >
                {t.gdpr.save}
              </button>
              <button
                onClick={acceptAll}
                className={`
                  flex-1 rounded-lg bg-gray-100 px-6 py-3 font-semibold
                  text-gray-800 transition-colors duration-300
                  hover:bg-gray-200
                `}
                aria-label='Accept all cookies'
              >
                {t.gdpr.acceptAll}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`
        animate-in slide-in-from-bottom fixed right-0 bottom-0 left-0 z-50
        border-t border-gray-200 bg-white/95 shadow-2xl backdrop-blur-md
        duration-500
      `}
    >
      <div
        className={`
          mx-auto max-w-7xl p-4
          sm:p-6
        `}
      >
        <div
          className={`
            flex flex-col items-start gap-4
            lg:flex-row lg:items-center
          `}
        >
          {/* Icon and Content */}
          <div className='flex flex-1 items-start gap-3'>
            <div
              className={`
                flex h-10 w-10 flex-shrink-0 items-center justify-center
                rounded-full bg-[#6b8362]/10
              `}
            >
              <Shield className='h-5 w-5 text-[#6b8362]' />
            </div>
            <div className='flex-1'>
              <h3 className='mb-1 font-semibold text-gray-900'>{t.gdpr.title}</h3>
              <p className='text-sm leading-relaxed text-gray-600'>{t.gdpr.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`
              flex w-full flex-col gap-3
              sm:flex-row
              lg:w-auto lg:flex-shrink-0
            `}
          >
            <button
              onClick={openCustomize}
              className={`
                rounded-lg border border-[#6b8362]/20 px-4 py-2 text-sm
                font-medium text-[#6b8362] transition-colors duration-300
                hover:border-[#6b8362]/40 hover:bg-[#6b8362]/5
                hover:text-[#3E5A35]
              `}
              aria-label='Customize cookie settings'
            >
              {t.gdpr.customize}
            </button>
            <button
              onClick={rejectAll}
              className={`
                rounded-lg px-4 py-2 text-sm font-medium text-gray-600
                transition-colors duration-300
                hover:bg-gray-100 hover:text-gray-800
              `}
              aria-label='Reject all cookies'
            >
              {t.gdpr.rejectAll}
            </button>
            <button
              onClick={acceptAll}
              className={`
                rounded-lg bg-[#6b8362] px-6 py-2 text-sm font-semibold
                text-white shadow-md transition-colors duration-300
                hover:bg-[#3E5A35] hover:shadow-lg
              `}
              aria-label='Accept all cookies'
            >
              {t.gdpr.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
