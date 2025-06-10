'use client'

import { useState } from 'react'

import { PriceListPopup } from '@/components/ui/PriceListPopup'

interface PriceListButtonProps {
  text: string
}

export default function PriceListButton({ text }: PriceListButtonProps) {
  const [isPriceListOpen, setIsPriceListOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsPriceListOpen(true)}
        className='mt-4 mb-8 md:mb-12 bg-[#6b8362] hover:bg-[#3E5A35] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg text-lg'
      >
        {text}
      </button>

      <PriceListPopup isOpen={isPriceListOpen} onClose={() => setIsPriceListOpen(false)} />
    </>
  )
}
