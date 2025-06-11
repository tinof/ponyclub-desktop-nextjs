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
        className={`
          mt-4 mb-8 rounded-lg bg-[#6b8362] px-8 py-3 text-lg font-semibold
          text-white shadow-md transition-colors duration-300
          hover:bg-[#3E5A35] hover:shadow-lg
          md:mb-12
        `}
        aria-label='Open price list'
      >
        {text}
      </button>

      <PriceListPopup isOpen={isPriceListOpen} onClose={() => setIsPriceListOpen(false)} />
    </>
  )
}
