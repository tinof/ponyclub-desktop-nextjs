import Link from "next/link"
import { Roboto_Slab } from "next/font/google"
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Waves, MountainSnow, Sailboat } from 'lucide-react'
import DynamicGoogleMap from "@/components/DynamicGoogleMap"
import DynamicContactDetails from "@/components/DynamicContactDetails"
import PriceListButton from "@/components/client/PriceListButton"
import BookingButton from "@/components/client/BookingButton"
import ReviewsSection from "@/components/client/ReviewsSection"
import BokunStyles from "@/components/client/BokunStyles"
import EnhancedPackageCard from "@/components/EnhancedPackageCard"

// Server-side function to get translations
async function getTranslations(locale: string) {
  // This is a simplified version - you might want to implement proper i18n
  // For now, returning a basic structure that matches the expected translations
  const translations = {
    en: {
      hero: {
        title: "Adventure Activities",
        subtitle: "ACHERON RIVER"
      },
      introduction: {
        mainTitle: "Welcome to Pony Club",
        mainText: "Experience unforgettable adventures in the beautiful Acheron River. Join us for rafting, horse riding, kayaking and trekking in the heart of Greece.",
        seoDescription: "Professional outdoor activities with experienced guides in a stunning natural environment."
      },
      activities: {
        exploreNature: "SUMMER 2025 OFFERS"
      },
      booking: {
        ourPriceList: "Our Price List",
        bookNow: "Book Now"
      },
      programs: {
        program1: {
          title: "PACKAGE 1",
          badge: "Most Popular",
          rafting: "Rafting: 30 minutes",
          riding: "Riding: 10-15 minutes",
          hiking: "Hiking canyon crossing",
          priceAdults: "20 € adults",
          priceChildren: "10 € children under 12 years old"
        },
        program2: {
          title: "PACKAGE 2",
          badge: "New Experience",
          kayak: "Kayak: 30 minutes",
          riding: "Riding: 10-15 minutes",
          hiking: "Hiking canyon crossing",
          price: "25 € per person",
          separator: "----"
        }
      },
      location: {
        findUs: "Find Us"
      }
    },
    el: {
      hero: {
        title: "Δραστηριότητες Περιπέτειας",
        subtitle: "ΠΟΤΑΜΟΣ ΑΧΕΡΟΝΤΑΣ"
      },
      introduction: {
        mainTitle: "Καλώς ήρθατε στο Pony Club",
        mainText: "Ζήστε αξέχαστες περιπέτειες στον πανέμορφο ποταμό Αχέροντα. Ελάτε μαζί μας για ράφτινγκ, ιππασία, καγιάκ και πεζοπορία στην καρδιά της Ελλάδας.",
        seoDescription: "Επαγγελματικές υπαίθριες δραστηριότητες με έμπειρους οδηγούς σε ένα εκπληκτικό φυσικό περιβάλλον."
      },
      activities: {
        exploreNature: "ΠΡΟΣΦΟΡΕΣ ΚΑΛΟΚΑΙΡΙ 2025"
      },
      booking: {
        ourPriceList: "Ο Τιμοκατάλογός μας",
        bookNow: "Κράτηση Τώρα"
      },
      programs: {
        program1: {
          title: "ΠΑΚΕΤΟ 1",
          badge: "Πιο Δημοφιλές",
          rafting: "Ράφτινγκ: 30 λεπτά",
          riding: "Ιππασία: 10-15 λεπτά",
          hiking: "Πεζοπορία διάσχισης φαραγγιού",
          priceAdults: "20 € ενήλικες",
          priceChildren: "10 € παιδιά κάτω των 12 ετών"
        },
        program2: {
          title: "ΠΑΚΕΤΟ 2",
          badge: "Νέα Εμπειρία",
          kayak: "Καγιάκ: 30 λεπτά",
          riding: "Ιππασία: 10-15 λεπτά",
          hiking: "Πεζοπορία διάσχισης φαραγγιού",
          price: "25 € ανά άτομο",
          separator: "----"
        }
      },
      location: {
        findUs: "Βρείτε μας"
      }
    }
  };

  return translations[locale as keyof typeof translations] || translations.en;
}

const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
          <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden shadow-xl border border-amber-200/30">
            {/* OptimizedImage for the poster */}
            <OptimizedImage
              src="/images/hero-image.webp"
              alt="Hero background"
              fill
              priority
              imageType="hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <video
              src="/images/hero-video.mp4"
              poster="/images/hero-image.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/10 to-transparent z-20"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="relative bg-amber-800/40 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl max-w-sm sm:max-w-md md:max-w-lg shadow-xl border-2 border-amber-200/50 backdrop-blur-xs transform hover:scale-[1.02] transition-transform duration-300">
              <h1
                className={`${robotoSlab.variable} font-roboto-slab text-amber-50 text-2xl sm:text-3xl md:text-4xl text-center leading-tight font-bold`}
              >
                <span className="block mb-1 sm:mb-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{t.hero.title}</span>
                <span className="block font-extrabold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{t.hero.subtitle}</span>
              </h1>
              <div className="absolute -inset-[1px] -z-10 rounded-2xl bg-linear-to-b from-amber-200/20 to-transparent blur-xs"></div>
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
                sizes="(max-width: 479px) 80px, (max-width: 639px) 96px, (max-width: 767px) 128px, (max-width: 1023px) 160px, 192px"
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
                sizes="(max-width: 479px) 80px, (max-width: 639px) 96px, (max-width: 767px) 128px, (max-width: 1023px) 160px, 192px"
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
                sizes="(max-width: 479px) 80px, (max-width: 639px) 96px, (max-width: 767px) 128px, (max-width: 1023px) 160px, 192px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Introduction Text Section - adjusted margin top */}
        <div className="relative px-6 md:px-10 py-8 md:py-10 rounded-2xl max-w-4xl mx-auto text-center mt-20 sm:mt-24 md:mt-20 overflow-hidden group transform hover:scale-[1.01] transition-all duration-500">
          {/* Background layers */}
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#f5f0e8]/95 via-white/90 to-[#f5f0e8]/95 backdrop-blur-md rounded-2xl"></div>
          <div className="absolute inset-0 -z-20 bg-[#6b8362]/5 rounded-2xl"></div>

          {/* Decorative effects */}
          <div className="absolute -inset-[3px] -z-10 rounded-2xl pointer-events-none opacity-70">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-amber-200/30 via-transparent to-[#6b8362]/20"></div>
          </div>
          <div className="absolute inset-0 rounded-2xl border border-amber-200/30 pointer-events-none"></div>

          {/* Main content */}
          <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl font-bold text-[#3E5A35] mb-6 relative inline-block`}>
            {t.introduction.mainTitle}
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
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
        <div className="text-center mt-16 md:mt-20 flex flex-col items-center">
          <h2 className={`${robotoSlab.variable} font-roboto-slab text-4xl md:text-5xl font-bold text-[#3E5A35] mb-6 relative inline-block`}>
            {t.activities.exploreNature}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#6b8362] to-transparent"></div>
          </h2>

          {/* Client-side Price List Button */}
          <PriceListButton text={t.booking.ourPriceList} />
        </div>

        {/* Program Cards */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-8 px-4 md:px-8 mt-12 md:mt-16 max-w-6xl mx-auto">
          {/* Package 1 Card */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <EnhancedPackageCard
              title={t.programs.program1.title || "PACKAGE 1"}
              badge={t.programs.program1.badge || "Most Popular"}
              activities={{
                primary: t.programs.program1.rafting || "Rafting: 30 minutes",
                riding: t.programs.program1.riding || "Riding: 10-15 minutes",
                hiking: t.programs.program1.hiking || "Hiking canyon crossing"
              }}
              pricing={{
                adults: "20 €",
                children: "10 €"
              }}
              images={{
                main: "/images/Rafting_Group_Blue_Adventure_River.jpg",
                top: "/images/round2.jpg",
                bottom: "/images/round1.jpg"
              }}
              bookingId="bokun_5b20d531_ca57_4550_94c0_0511c35077a0"
              dataSrc="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020598?partialView=1"
              bookNowText={t.booking.bookNow}
              packageName="Package 1 - Rafting + Riding + Hiking"
              packagePrice="20"
              trackingLabel="Homepage Package 1"
              variant="green"
            />
          </div>

          {/* Package 2 Card */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <EnhancedPackageCard
              title={t.programs.program2.title || "PACKAGE 2"}
              badge={t.programs.program2.badge || "New Experience"}
              activities={{
                primary: t.programs.program2.kayak || "Kayak: 30 minutes",
                riding: t.programs.program2.riding || "Riding: 10-15 minutes",
                hiking: t.programs.program2.hiking || "Hiking canyon crossing"
              }}
              pricing={{
                perPerson: "25 €"
              }}
              images={{
                main: "/images/Kayaker_Red_Adventurous_River.jpg",
                top: "/images/round3.jpg",
                bottom: "/images/round2.jpg"
              }}
              bookingId="bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53"
              dataSrc="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020569?partialView=1"
              bookNowText={t.booking.bookNow}
              packageName="Package 2 - Kayak + Riding + Hiking"
              packagePrice="25"
              trackingLabel="Homepage Package 2"
              variant="amber"
            />
          </div>
        </div>

                 {/* Customer Reviews Section */}
         <div className="text-center mt-16 md:mt-20">
           <h2 className={`${robotoSlab.variable} font-roboto-slab text-4xl md:text-5xl font-bold text-[#3E5A35] mb-12 md:mb-16 relative inline-block`}>
             OUR REVIEWS {/* TODO: Translate this */}
             <div className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#6b8362] to-transparent"></div>
           </h2>
         </div>

         {/* Reviews Widget */}
         <ReviewsSection />

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

         {/* Global Bokun Button Styles */}
         <BokunStyles />
       </main>
     </>
   )
}
