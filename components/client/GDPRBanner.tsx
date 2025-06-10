'use client'

import { X, Shield, BarChart3, Target, Settings } from 'lucide-react'
import React, { useState } from 'react'

import { useGDPR, type CookieConsent } from '@/contexts/gdpr-context'
import { useLanguage } from '@/contexts/language-context'

export default function GDPRBanner() {
  const { consent, showBanner, showCustomize, acceptAll, rejectAll, saveCustom, openCustomize, closeBanner } = useGDPR()
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
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
        <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-200'>
            <h2 className='text-2xl font-bold text-[#3E5A35] flex items-center gap-2'>
              <Settings className='w-6 h-6' />
              {t.gdpr.customize}
            </h2>
            <button onClick={closeBanner} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
              <X className='w-5 h-5 text-gray-500' />
            </button>
          </div>

          {/* Content */}
          <div className='p-6 space-y-6'>
            <p className='text-gray-600 leading-relaxed'>{t.gdpr.description}</p>

            {/* Cookie Categories */}
            <div className='space-y-4'>
              {/* Necessary Cookies */}
              <div className='border border-gray-200 rounded-lg p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <Shield className='w-5 h-5 text-green-600' />
                    <h3 className='font-semibold text-gray-900'>{t.gdpr.necessary}</h3>
                  </div>
                  <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
                    Always Active
                  </div>
                </div>
                <p className='text-sm text-gray-600'>{t.gdpr.necessaryDescription}</p>
              </div>

              {/* Analytics Cookies */}
              <div className='border border-gray-200 rounded-lg p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <BarChart3 className='w-5 h-5 text-blue-600' />
                    <h3 className='font-semibold text-gray-900'>{t.gdpr.analytics}</h3>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={customConsent.analytics}
                      onChange={e => handleCustomConsentChange('analytics', e.target.checked)}
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6b8362]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6b8362]"></div>
                  </label>
                </div>
                <p className='text-sm text-gray-600'>{t.gdpr.analyticsDescription}</p>
              </div>

              {/* Marketing Cookies */}
              <div className='border border-gray-200 rounded-lg p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <Target className='w-5 h-5 text-purple-600' />
                    <h3 className='font-semibold text-gray-900'>{t.gdpr.marketing}</h3>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={customConsent.marketing}
                      onChange={e => handleCustomConsentChange('marketing', e.target.checked)}
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6b8362]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6b8362]"></div>
                  </label>
                </div>
                <p className='text-sm text-gray-600'>{t.gdpr.marketingDescription}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 pt-4'>
              <button
                onClick={() => saveCustom(customConsent)}
                className='flex-1 bg-[#6b8362] hover:bg-[#3E5A35] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg'
              >
                {t.gdpr.save}
              </button>
              <button
                onClick={acceptAll}
                className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-300'
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
    <div className='fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50 animate-in slide-in-from-bottom duration-500'>
      <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-4'>
          {/* Icon and Content */}
          <div className='flex items-start gap-3 flex-1'>
            <div className='flex-shrink-0 w-10 h-10 bg-[#6b8362]/10 rounded-full flex items-center justify-center'>
              <Shield className='w-5 h-5 text-[#6b8362]' />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold text-gray-900 mb-1'>{t.gdpr.title}</h3>
              <p className='text-sm text-gray-600 leading-relaxed'>{t.gdpr.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0'>
            <button
              onClick={openCustomize}
              className='px-4 py-2 text-sm font-medium text-[#6b8362] hover:text-[#3E5A35] hover:bg-[#6b8362]/5 rounded-lg transition-colors duration-300 border border-[#6b8362]/20 hover:border-[#6b8362]/40'
            >
              {t.gdpr.customize}
            </button>
            <button
              onClick={rejectAll}
              className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-300'
            >
              {t.gdpr.rejectAll}
            </button>
            <button
              onClick={acceptAll}
              className='px-6 py-2 text-sm font-semibold bg-[#6b8362] hover:bg-[#3E5A35] text-white rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg'
            >
              {t.gdpr.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
