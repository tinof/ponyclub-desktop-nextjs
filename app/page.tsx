"use client"

import Image from "next/image"
import Link from "next/link"
import { Roboto_Slab } from "next/font/google"
import BookingButton from "@/components/booking-button"
import ContactDetailsEnhanced from "@/components/contact-details-enhanced"
import ResponsiveNavigation from "@/components/responsive-navigation"
import { useLanguage } from "@/contexts/language-context"
import GoogleMap from "@/components/google-map"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-[#f5f0e8] overflow-hidden">
      {/* Logo - Fixed Position with responsive size */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/" className="flex items-center">
          <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md border border-amber-100 hover:bg-white transition-colors">
            <Image
              src="/images/ponyclub_logo.png"
              alt="Acheron River Excursion"
              fill
              className="object-contain p-1"
            />
            <div className="absolute -inset-[0.5px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/20 via-[#6b8362]/30 to-transparent blur-sm"></div>
          </div>
        </Link>
      </div>

      {/* Responsive Navigation - Fixed Position */}
      <div className="absolute top-4 right-4 z-50">
        <ResponsiveNavigation />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] mt-16">
        <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden shadow-xl border border-amber-200/30">
          <video 
            src="/images/hero-video.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16">
          <div className="relative bg-amber-800/40 px-8 py-6 rounded-2xl max-w-3xl shadow-xl border-2 border-amber-200/50 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-300">
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

      {/* Introduction Text Section - adjusted margin top */}
      <div className="relative px-4 md:px-8 py-6 md:py-8 bg-white/80 backdrop-blur-sm rounded-lg max-w-4xl mx-auto text-center mt-32 md:mt-24 shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl md:text-3xl text-amber-800 mb-4 relative inline-block`}>
          {t.introduction.mainTitle}
          <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        </h2>
        <p className="text-gray-700 md:text-lg">{t.introduction.mainText}</p>
        <p className="text-gray-600 md:text-base mt-2">{t.introduction.seoDescription}</p>
        <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
      </div>

      {/* Explore Nature Banner */}
      <div className="relative mt-16 md:mt-20 text-center">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl text-[#6b8362] inline-block relative`}>
          {t.activities.exploreNature}
          <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
        </h2>
      </div>

      {/* Program Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 px-4 md:px-8 mt-12 md:mt-16">
        <div className="md:w-1/2">
          <div className="program-card frosted-card bg-[#c27a5f] relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
            <div className="absolute inset-0 bg-pattern opacity-20 mix-blend-overlay"></div>
            <div className="relative m-4 p-6 backdrop-blur-md bg-white/30 border border-white/25 rounded-xl shadow-xl flex flex-col items-center text-stone-800">
              <div className="absolute -inset-[1px] -z-10 rounded-xl bg-gradient-to-tr from-[#c27a5f]/30 via-white/40 to-[#c27a5f]/30 blur-[2px]"></div>
              <h2 className="gradient-text text-3xl mb-4 font-bold animate-text-shine">{t.programs.program1.title}</h2>
              <p className="mb-2 drop-shadow-sm">{t.programs.program1.rafting}</p>
              <p className="mb-2 drop-shadow-sm">{t.programs.program1.riding}</p>
              <p className="mb-4 drop-shadow-sm">{t.programs.program1.hiking}</p>
              <div className="font-bold text-xl mb-1 text-shadow-sm">{t.programs.program1.priceAdults}</div>
              <div className="font-medium mb-4">{t.programs.program1.priceChildren}</div>
              <div className="mt-auto">
                <BookingButton />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="program-card frosted-card bg-[#6b8362] relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
            <div className="absolute inset-0 bg-pattern opacity-20 mix-blend-overlay"></div>
            <div className="relative m-4 p-6 backdrop-blur-md bg-white/30 border border-white/25 rounded-xl shadow-xl flex flex-col items-center text-white">
              <div className="absolute -inset-[1px] -z-10 rounded-xl bg-gradient-to-tr from-[#6b8362]/30 via-white/40 to-[#6b8362]/30 blur-[2px]"></div>
              <h2 className="gradient-text text-3xl mb-4 font-bold animate-text-shine">{t.programs.program2.title}</h2>
              <p className="mb-2 drop-shadow-sm">{t.programs.program2.kayak}</p>
              <p className="mb-2 drop-shadow-sm">{t.programs.program2.riding}</p>
              <p className="mb-4 drop-shadow-sm">{t.programs.program2.hiking}</p>
              <div className="font-bold text-xl mb-1 text-shadow-sm">{t.programs.program2.price}</div>
              <div className="font-medium mb-4">{t.programs.program2.separator}</div>
              <div className="mt-auto">
                <BookingButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mt-12 mb-16">
        <div className="relative">
          <BookingButton />
          <div className="absolute -inset-[2px] -z-10 rounded-full bg-gradient-to-r from-amber-200/50 via-[#6b8362]/40 to-amber-200/50 blur-sm"></div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="px-4 md:px-8 my-20">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-center text-3xl md:text-4xl mb-10 text-[#6b8362]`}>
          {t.reviews?.title || "What Our Customers Say"}
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="elfsight-app-5d3672ca-b26e-43cf-b887-e87f811a1622" data-elfsight-app-lazy></div>
        </div>
      </div>

      {/* Map and Contact Section */}
      <div className="px-4 md:px-8 mt-20 mb-20">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-center text-3xl md:text-4xl mb-10 text-[#6b8362]`}>
          {t.location.findUs}
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
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
