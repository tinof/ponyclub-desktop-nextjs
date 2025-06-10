'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'

import { useLanguage } from '@/contexts/language-context'

export default function Footer() {
  const { t } = useLanguage()
  const mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Pony+Club+Ecotourism'
  const currentYear = new Date().getFullYear()

  return (
    <footer className='relative bg-secondary border-t border-border'>
      {' '}
      {/* Removed mt-16 pt-12 pb-12 to eliminate spacing */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12'>
        {' '}
        {/* Added padding to the container instead */}
        <h2 className='text-center text-3xl mb-8 font-bold text-primary'>{t.footer.contactUs}</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <div className='flex items-start gap-3'>
              <MapPin className='h-5 w-5 mt-1 text-primary' />
              <div>
                <p className='font-semibold text-foreground'>{t.footer.address.line1}</p>
                <p className='text-foreground/90'>{t.footer.address.line2}</p>
                <p className='text-foreground/90'>{t.footer.address.line3}</p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Phone className='h-5 w-5 mt-1 text-primary' />
              <div>
                <p className='text-foreground/90'>{t.footer.phone}</p>
                <p className='text-sm text-muted-foreground mt-1'>{t.footer.phoneLang}</p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Mail className='h-5 w-5 mt-1 text-primary' />
              <div>
                <p className='text-foreground/90'>{t.footer.email}</p>
                <p className='text-sm text-muted-foreground mt-1'>{t.footer.emailNote}</p>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='flex items-start gap-3'>
              <Clock className='h-5 w-5 mt-1 text-primary' />
              <div>
                <p className='font-semibold text-foreground'>{t.footer.openHours.title}</p>
                <p className='text-foreground/90'>{t.footer.openHours.schedule}</p>
                <p className='text-sm text-muted-foreground'>{t.footer.openHours.season}</p>
              </div>
            </div>

            <div className='pt-4'>
              <a
                href={mapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center px-6 py-3 font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors gap-2'
              >
                <MapPin className='h-5 w-5' />
                <span>{t.footer.findUs}</span>
              </a>
            </div>
          </div>
        </div>
        <div className='mt-12 text-center text-xs text-muted-foreground tracking-wide'>
          <p>{t.footer.copyright.replace('{year}', currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  )
}
