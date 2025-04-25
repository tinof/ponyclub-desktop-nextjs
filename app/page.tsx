"use client"

import Image from "next/image"
import { Roboto_Slab } from "next/font/google"
import BookingButton from "@/components/booking-button"
import ContactDetailsEnhanced from "@/components/contact-details-enhanced"
import LanguageSelector from "@/components/language-selector"
import ActivitiesMenu from "@/components/activities-menu"
import { useLanguage } from "@/contexts/language-context"
import GoogleMap from "@/components/google-map"

const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

export default function Home() {
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
        <video 
          src="/images/hero-video.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16">
          <div className="relative bg-amber-800/40 px-8 py-6 rounded-2xl max-w-3xl shadow-lg border-2 border-amber-200/50">
            <h1
              className={`${robotoSlab.variable} font-roboto-slab text-amber-50 text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-bold px-4`}
            >
              <span className="block mb-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{t.hero.title}</span>
              <span className="block font-extrabold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{t.hero.subtitle}</span>
            </h1>
            <div className="absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-b from-amber-200/20 to-transparent blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Circular Images Section - positioned to overlap with hero */}
      <div className="flex flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4 -mt-16 md:-mt-24 lg:-mt-32 relative z-10 mx-auto max-w-6xl">
        {/* Swimming */}
        <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg transform rotate-2">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-full">
            <Image src="/images/round1.jpg" alt="Swimming in Acheron River" fill className="object-cover" />
          </div>
        </div>

        {/* Horse Riding */}
        <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg transform -rotate-2">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-full">
            <Image src="/images/round2.jpg" alt="Horse riding near Acheron River" fill className="object-cover object-[center_20%]" />
          </div>
        </div>

        {/* Kayaking */}
        <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg transform rotate-3">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-full">
            <Image src="/images/round3.jpg" alt="Kayaking in Acheron River" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Introduction Text Section */}
      <div className="px-4 md:px-8 py-6 md:py-8 bg-white/60 backdrop-blur-sm rounded-lg max-w-4xl mx-auto text-center mt-12 shadow-md">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl md:text-3xl text-amber-800 mb-3`}>
          {t.introduction.mainText}
        </h2>
        <p className="text-gray-700 md:text-lg">{t.introduction.seoDescription}</p>
      </div>

      {/* Explore Nature Banner */}
      <div className="mt-8 md:mt-12 text-center">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl text-[#6b8362]`}>
          {t.activities.exploreNature}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 px-4 md:px-8 mt-8 md:mt-12">
        {/* Program 1 */}
        {/* Changed text color from text-white to text-stone-800 for better contrast, kept title white */}
        <div className="program-card bg-[#c27a5f] text-stone-800 p-8 md:p-10 rounded-2xl md:w-1/2 relative shadow-lg flex flex-col items-center hover:scale-[1.025] transition-transform duration-200">
          <h2 className="text-center text-3xl mb-6 font-bold tracking-wide drop-shadow-lg text-white">{t.programs.program1.title}</h2> {/* Title remains white */}
          <div className="space-y-2 text-center text-lg font-medium">
            <p>{t.programs.program1.rafting}</p>
            <p>{t.programs.program1.riding}</p>
            <p>{t.programs.program1.hiking}</p>
          </div>
          <div className="mt-8 mb-2 text-center font-bold text-xl">
            <p>{t.programs.program1.priceAdults}</p> {/* Price uses text-stone-800 */}
            <p>{t.programs.program1.priceChildren}</p> {/* Price uses text-stone-800 */}
          </div>
        </div>

        {/* Program 2 */}
        <div className="program-card bg-[#6b8362] text-white p-8 md:p-10 rounded-2xl md:w-1/2 relative shadow-lg flex flex-col items-center hover:scale-[1.025] transition-transform duration-200">
          <h2 className="text-center text-3xl mb-6 font-bold tracking-wide drop-shadow-lg">{t.programs.program2.title}</h2>
          <div className="space-y-2 text-center text-lg font-medium">
            <p>{t.programs.program2.kayak}</p>
            <p>{t.programs.program2.riding}</p>
            <p>{t.programs.program2.hiking}</p>
          </div>
          <div className="mt-8 mb-2 text-center font-bold text-xl">
            <p className="text-white">{t.programs.program2.price}</p>
            <p className="text-white">{t.programs.program2.separator}</p>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mt-8 mb-12">
        <BookingButton />
      </div>

      {/* Customer Reviews Section */}
      <div className="px-4 md:px-8 my-16">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-center text-3xl md:text-4xl mb-8 text-[#6b8362]`}>
          {t.reviews?.title || "What Our Customers Say"}
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="elfsight-app-5d3672ca-b26e-43cf-b887-e87f811a1622" data-elfsight-app-lazy></div>
        </div>
      </div>

      {/* Map and Contact Section */}
      <div className="px-4 md:px-8 mt-16 mb-16">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-center text-3xl md:text-4xl mb-8 text-[#6b8362]`}>
          {t.location.findUs}
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/5">
            <GoogleMap />
          </div>
          <div className="lg:w-2/5">
            <ContactDetailsEnhanced />
          </div>
        </div>
      </div>
    </main>
  )
}
