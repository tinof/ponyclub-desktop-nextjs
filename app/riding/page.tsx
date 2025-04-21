"use client"

import Image from "next/image"
import { Roboto_Slab } from "next/font/google"
import BookingButton from "@/components/booking-button"
import LanguageSelector from "@/components/language-selector"
import ActivitiesMenu from "@/components/activities-menu"
import { useLanguage } from "@/contexts/language-context"

const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

export default function RidingPage() {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-[#f5f0e8] overflow-hidden">
      {/* Language and Activities Menu - Fixed Position */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <ActivitiesMenu />
        <LanguageSelector />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <Image 
          src="/images/round2.jpg" 
          alt="Horse Riding near Acheron River" 
          fill 
          className="object-cover rounded-lg object-[center_20%]" 
          priority 
        />
        <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16">
          <div className="relative bg-amber-800/40 px-8 py-6 rounded-2xl max-w-3xl shadow-lg border-2 border-amber-200/50">
            <h1
              className={`${robotoSlab.variable} font-roboto-slab text-amber-50 text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-bold px-4`}
            >
              <span className="block mb-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">Horse Riding</span>
              <span className="block font-extrabold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">Experience</span>
            </h1>
            <div className="absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-b from-amber-200/20 to-transparent blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl text-[#6b8362] mb-6`}>
            Riding Adventure
          </h2>
          <div className="space-y-4">
            <p>Placeholder text for riding description. This section will be updated with actual content later.</p>
            <p>Placeholder text describing the horse riding experience, suitable for all levels, and the beautiful scenery.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl text-[#6b8362] mb-6`}>
            Details & Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#c27a5f] mb-2">What's Included</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Expert riding instructors</li>
                <li>Well-trained horses</li>
                <li>Safety equipment</li>
                <li>Trail access</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#c27a5f] mb-2">What to Bring</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Long pants</li>
                <li>Closed-toe shoes</li>
                <li>Weather-appropriate clothing</li>
                <li>Camera</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl text-[#6b8362] mb-6`}>
            Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#c27a5f]/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#c27a5f] mb-2">Standard Ride</h3>
              <p className="text-2xl font-bold">€35 per person</p>
              <p className="text-sm text-gray-600 mt-2">1-hour experience</p>
            </div>
            <div className="bg-[#6b8362]/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#6b8362] mb-2">Extended Trail</h3>
              <p className="text-2xl font-bold">€50 per person</p>
              <p className="text-sm text-gray-600 mt-2">2-hour experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mt-8 mb-12">
        <BookingButton />
      </div>
    </main>
  )
} 