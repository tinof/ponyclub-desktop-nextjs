"use client"

import Link from "next/link"
import { Roboto_Slab } from "next/font/google"
import BookingButton from "@/components/booking-button"
import ResponsiveNavigation from "@/components/responsive-navigation"
import { useLanguage } from "@/contexts/language-context"
// Carousel imports removed as they are not used in this file
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { BookingScripts, ReviewsScript } from '@/components/ui/script-loader'
import { Waves, MountainSnow, Sailboat } from 'lucide-react'; // Added icons
import DynamicGoogleMap from "@/components/DynamicGoogleMap"
import DynamicContactDetails from "@/components/DynamicContactDetails"

const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F2] border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div> {/* Removed absolute positioning and elaborate styling from this div */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16"> {/* Simplified styling */}
              <OptimizedImage
                src="/images/ponyclub_logo.png"
                alt="Acheron River Excursion"
                fill
                imageType="logo"
                className="object-contain p-1"
              />
              {/* Removed decorative inset div */}
            </div>
          </Link>
        </div>

        {/* Responsive Navigation */}
        <div> {/* Removed absolute positioning from this div */}
          <ResponsiveNavigation />
        </div>
      </header>

      <main className="relative min-h-screen bg-[#f5f0e8] overflow-hidden pt-20"> {/* Added pt-20 for fixed header */}
        {/* Hero Section */}
        {/* mt-16 was removed from here as main now has pt-20 */}
        <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]"> 
        <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden shadow-xl border border-amber-200/30">
          {/* OptimizedImage for the poster */}
          <OptimizedImage
            src="/images/hero-image.jpeg"
            alt="Hero background"
            fill
            priority
            imageType="hero" // or 'default' if hero has specific styles not applicable here
            className="absolute inset-0 w-full h-full object-cover"
            // Add a style to hide if video is playing, or ensure video plays on top.
            // For simplicity, this OptimizedImage will be the background.
            // The video will play over it. If video has transparency, this works.
            // If video is opaque, this image might be hidden once video loads.
          />
          <video 
            src="/images/hero-video.mp4" 
            // poster attribute can be kept as a fallback or removed if OptimizedImage handles it fully
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10" // Ensure video is on top of the image
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-20"></div> {/* Gradient on top of video */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative bg-amber-800/40 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl max-w-[90%] sm:max-w-3xl shadow-xl border-2 border-amber-200/50 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-300">
            <h1
              className={`${robotoSlab.variable} font-roboto-slab text-amber-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-bold`}
            >
              <span className="block mb-1 sm:mb-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{t.hero.title}</span>
              <span className="block font-extrabold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{t.hero.subtitle}</span>
            </h1>
            <div className="absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-b from-amber-200/20 to-transparent blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Circular Images Section - positioned to overlap with hero */}
      <div className="flex flex-row justify-center items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4 -mt-12 sm:-mt-16 md:-mt-24 lg:-mt-32 relative z-10 mx-auto max-w-6xl">
        {/* Swimming */}
        <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg transform rotate-2">
          <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-full">
            <OptimizedImage 
              src="/images/round1.jpg" 
              alt="Swimming in Acheron River" 
              fill 
              imageType="thumbnail"
              sizes="(max-width: 639px) 80px, (max-width: 767px) 96px, (max-width: 1023px) 128px, (max-width: 1279px) 160px, 192px"
              className="object-cover" 
            />
          </div>
        </div>

        {/* Horse Riding */}
        <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg transform -rotate-2">
          <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-full">
            <OptimizedImage 
              src="/images/round2.jpg" 
              alt="Horse riding near Acheron River" 
              fill 
              imageType="thumbnail"
              sizes="(max-width: 639px) 80px, (max-width: 767px) 96px, (max-width: 1023px) 128px, (max-width: 1279px) 160px, 192px"
              className="object-cover object-[center_20%]" 
            />
          </div>
        </div>

        {/* Kayaking */}
        <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg transform rotate-3">
          <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-full">
            <OptimizedImage 
              src="/images/round3.jpg" 
              alt="Kayaking in Acheron River" 
              fill 
              imageType="thumbnail"
              sizes="(max-width: 639px) 80px, (max-width: 767px) 96px, (max-width: 1023px) 128px, (max-width: 1279px) 160px, 192px"
              className="object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Introduction Text Section - adjusted margin top */}
      <div className="relative px-6 md:px-10 py-8 md:py-10 rounded-2xl max-w-4xl mx-auto text-center mt-20 sm:mt-24 md:mt-20 overflow-hidden group transform hover:scale-[1.01] transition-all duration-500">
        {/* Background layers */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f5f0e8]/95 via-white/90 to-[#f5f0e8]/95 backdrop-blur-md rounded-2xl"></div>
        <div className="absolute inset-0 -z-20 bg-[#6b8362]/5 rounded-2xl"></div>
        
        {/* Decorative effects */}
        <div className="absolute -inset-[3px] -z-10 rounded-2xl pointer-events-none opacity-70">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-200/30 via-transparent to-[#6b8362]/20"></div>
        </div>
        <div className="absolute inset-0 rounded-2xl border border-amber-200/30 pointer-events-none"></div>
        
        {/* Main content */}
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl font-bold text-[#3E5A35] mb-6 relative inline-block`}>
          {t.introduction.mainTitle}
          <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
        </h2>
        
        <div className="relative">
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-4">{t.introduction.mainText}</p>
          <p className="text-gray-600 md:text-lg mt-2">{t.introduction.seoDescription}</p>
          
          {/* Subtle decorative corners */}
          <div className="absolute -top-1 -left-1 w-10 h-10 border-t-2 border-l-2 border-[#6b8362]/30 rounded-tl-lg"></div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-2 border-r-2 border-[#6b8362]/30 rounded-br-lg"></div>
        </div>
        
        {/* Shadow effect */}
        <div className="absolute -inset-[1px] -z-30 rounded-2xl shadow-xl"></div>
      </div>

      {/* SUMMER 2025 OFFERS Title */}
      <div className="text-center mt-16 md:mt-20">
        <h2 className={`${robotoSlab.variable} font-roboto-slab text-4xl md:text-5xl font-bold text-[#3E5A35] mb-12 md:mb-16 relative inline-block`}>
          SUMMER 2025 OFFERS {/* TODO: Translate this */}
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6b8362] to-transparent"></div>
        </h2>
      </div>

      {/* Program Cards */}
      <BookingScripts />
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4 md:px-8 mt-12 md:mt-16">
        {/* Program 1 Card */}
        <div className="w-full md:w-1/2 group relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-500 h-[550px]">
            {/* Background Image */}
            <OptimizedImage
              src="/images/Rafting_Group_Blue_Adventure_River.jpg"
              alt={t.programs.program1.title || "Rafting Adventure"}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
              imageType="default"
            />
            
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-[#6b8362]/10 backdrop-blur-[2px]"></div>
            
            {/* Card Content Layer */}
            <div className="absolute inset-0 flex flex-col h-full">
              {/* Top Section - Semi-transparent Overlay with Title and Badge */}
              <div className="bg-gradient-to-b from-[#3E5A35]/80 via-[#3E5A35]/60 to-transparent pt-8 px-6 pb-4">
                <div className="inline-block rounded-full bg-[#6b8362]/90 backdrop-blur-sm px-4 py-1.5 text-white text-sm font-semibold mb-4 shadow-lg border border-white/20">
                  Most Popular
                </div>
                <h3 className={`${robotoSlab.variable} font-roboto-slab text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg`}>
                  {t.programs.program1.title || "ΠΡΟΓΡΑΜΜΑ 1"}
                </h3>
              </div>
              
              {/* Center Section - Activity List */}
              <div className="flex-grow px-6 py-4">
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30 max-w-sm">
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex items-center gap-3">
                      <div className="flex items-center justify-center bg-[#6b8362] rounded-full p-1.5 shadow-md">
                        <Waves className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{t.programs.program1.rafting || "Rafting: 30 minutes"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex items-center justify-center bg-[#6b8362] rounded-full p-1.5 shadow-md">
                        <MountainSnow className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{t.programs.program1.riding || "Riding: 10-15 minutes"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex items-center justify-center bg-[#6b8362] rounded-full p-1.5 shadow-md">
                        <MountainSnow className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{t.programs.program1.hiking || "Hiking canyon crossing"}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Bottom Section - Price and Button */}
              <div className="mt-auto">
                <div className="bg-[#3E5A35]/70 backdrop-blur-md p-6 rounded-t-2xl border-t border-white/20">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      {t.programs.program1.priceAdults || "20 € Adults"}
                    </div>
                    <p className="text-sm text-white/90 mb-4">
                      {t.programs.program1.priceChildren || "10 € children under 12 years old"}
                    </p>
                    <div className="relative w-full overflow-hidden">
                      <button
                        className="bokunButton w-full text-lg font-semibold py-3 rounded-lg bg-[#6b8362] hover:bg-[#3E5A35] text-white transition-all duration-300 relative z-10 overflow-hidden shadow-lg"
                        disabled
                        id="bokun_5b20d531_ca57_4550_94c0_0511c35077a0"
                        data-src="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020598?partialView=1"
                        data-testid="widget-book-button"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Layered Border Effects */}
            <div className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none"></div>
            <div className="absolute -inset-[3px] rounded-2xl pointer-events-none z-30">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#f5f0e8]/40 via-transparent to-[#6b8362]/30"></div>
            </div>
          </div>
        </div>

        {/* Program 2 Card */}
        <div className="w-full md:w-1/2 group relative mt-6 md:mt-0">
          <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-500 h-[550px]">
            {/* Background Image */}
            <OptimizedImage
              src="/images/Kayaker_Red_Adventurous_River.jpg"
              alt={t.programs.program2.title || "Kayaking Adventure"}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
              imageType="default"
            />
            
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-amber-800/10 backdrop-blur-[2px]"></div>
            
            {/* Card Content Layer */}
            <div className="absolute inset-0 flex flex-col h-full">
              {/* Top Section - Semi-transparent Overlay with Title and Badge */}
              <div className="bg-gradient-to-b from-amber-800/80 via-amber-800/60 to-transparent pt-8 px-6 pb-4">
                <div className="inline-block rounded-full bg-amber-700/90 backdrop-blur-sm px-4 py-1.5 text-white text-sm font-semibold mb-4 shadow-lg border border-white/20">
                  New Experience
                </div>
                <h3 className={`${robotoSlab.variable} font-roboto-slab text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg`}>
                  {t.programs.program2.title || "ΠΡΟΓΡΑΜΜΑ 2"}
                </h3>
              </div>
              
              {/* Center Section - Activity List */}
              <div className="flex-grow px-6 py-4">
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30 max-w-sm">
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex items-center gap-3">
                      <div className="flex items-center justify-center bg-amber-700 rounded-full p-1.5 shadow-md">
                        <Sailboat className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{t.programs.program2.kayak || "Kayak: 30 minutes"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex items-center justify-center bg-amber-700 rounded-full p-1.5 shadow-md">
                        <MountainSnow className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{t.programs.program2.riding || "Riding: 10-15 minutes"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex items-center justify-center bg-amber-700 rounded-full p-1.5 shadow-md">
                        <MountainSnow className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{t.programs.program2.hiking || "Hiking canyon crossing"}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Bottom Section - Price and Button */}
              <div className="mt-auto">
                <div className="bg-amber-800/70 backdrop-blur-md p-6 rounded-t-2xl border-t border-white/20">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      {t.programs.program2.price || "25 € per person"}
                    </div>
                    <p className="text-sm text-white/90 mb-4">
                      {t.programs.program2.separator || "----"}
                    </p>
                    <div className="relative w-full overflow-hidden">
                      <button
                        className="bokunButton w-full text-lg font-semibold py-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white transition-all duration-300 relative z-10 overflow-hidden shadow-lg"
                        disabled
                        id="bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53"
                        data-src="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020569?partialView=1"
                        data-testid="widget-book-button"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Layered Border Effects */}
            <div className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none"></div>
            <div className="absolute -inset-[3px] rounded-2xl pointer-events-none z-30">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#f5f0e8]/40 via-transparent to-amber-500/30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button (This is a general one, distinct from program cards) */}
      <div className="flex justify-center mt-12 mb-16">
        <div className="relative">
          <BookingButton />
          <div className="absolute -inset-[2px] -z-10 rounded-full bg-gradient-to-r from-amber-200/50 via-[#6b8362]/40 to-amber-200/50 blur-sm"></div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ReviewsScript />
      <div className="px-4 md:px-8 my-20">
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
            <DynamicGoogleMap />
          </div>
          <div className="lg:w-2/5">
            <DynamicContactDetails />
          </div>
        </div>
      </div>

      <style jsx global>{`
        #bokun_5b20d531_ca57_4550_94c0_0511c35077a0 {
          background-color: #6b8362 !important; /* theme green */
          color: white !important;
          padding: 0.75rem 0 !important; /* py-3 */
          font-size: 1.125rem !important; /* text-lg */
          font-weight: 600 !important; /* font-semibold */
          border-radius: 0.5rem !important; /* rounded-lg */
          width: 100% !important;
          border: none !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          position: relative !important;
          overflow: hidden !important;
          transition: all 0.3s ease !important;
        }
        #bokun_5b20d531_ca57_4550_94c0_0511c35077a0:hover {
          background-color: #3E5A35 !important; /* darker green */
          transform: translateY(-2px) !important;
        }
        #bokun_5b20d531_ca57_4550_94c0_0511c35077a0:disabled {
          opacity: 0.95 !important;
          cursor: pointer !important;
        }
        #bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53 {
          background-color: #b45309 !important; /* amber-700 */
          color: white !important;
          padding: 0.75rem 0 !important; /* py-3 */
          font-size: 1.125rem !important; /* text-lg */
          font-weight: 600 !important; /* font-semibold */
          border-radius: 0.5rem !important; /* rounded-lg */
          width: 100% !important;
          border: none !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          position: relative !important;
          overflow: hidden !important;
          transition: all 0.3s ease !important;
        }
        #bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53:hover {
          background-color: #92400e !important; /* amber-800 */
          transform: translateY(-2px) !important;
        }
        #bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53:disabled {
          opacity: 0.95 !important;
          cursor: pointer !important;
        }
      `}</style>
    </main>
    </>
  )
}
