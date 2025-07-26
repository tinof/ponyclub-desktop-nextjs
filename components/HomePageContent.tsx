"use client";

import dynamic from "next/dynamic";
import { robotoSlab } from "@/app/fonts";
import BokunStyles from "@/components/client/BokunStyles";
import PriceListButton from "@/components/client/PriceListButton";
import DynamicContactDetails from "@/components/DynamicContactDetails";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import VintagePackageCard from "@/components/VintagePackageCard";
import { useLanguage } from "@/contexts/language-context";
import { useBokunInit } from "@/hooks/use-bokun-init";
import { useIsMobile } from "@/hooks/use-media-query";

// Dynamic imports for heavy components to improve initial bundle size
const DynamicGoogleReviews = dynamic(
  () =>
    import(
      /* webpackChunkName: "google-reviews" */ "@/components/client/GoogleReviews"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 mb-20 px-4 md:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white/90 p-4 shadow-md">
          <div className="h-80 w-full animate-pulse rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Loading reviews...</span>
          </div>
        </div>
      </div>
    ),
  },
);

const DynamicGoogleMap = dynamic(
  () =>
    import(
      /* webpackChunkName: "google-map" */ "@/components/DynamicGoogleMap"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] w-full animate-pulse rounded-lg bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    ),
  },
);

// Font is now imported from centralized fonts.ts file

export default function HomePageContent() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  useBokunInit();

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div
        className={`
            relative h-[60vh] w-full
            md:h-[70vh]
            lg:h-[80vh]
          `}
      >
        <div
          className={`
              absolute inset-0 m-4 overflow-hidden rounded-2xl border
              border-amber-200/30 shadow-xl
            `}
        >
          {/* OptimizedImage for the poster */}
          <OptimizedImage
            src="/images/hero-image.webp"
            alt="Hero background"
            fill={true}
            priority={true}
            fetchPriority="high"
            imageType="hero"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            autoPlay={!isMobile} // Disable autoplay on mobile to save bandwidth
            muted={true}
            loop={true}
            playsInline={true}
            preload="metadata"
            className="absolute inset-0 z-10 h-full w-full object-cover"
          >
            <source src="/images/hero-video.webm" type="video/webm" />
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
          <div
            className={`
                absolute inset-0 z-20 bg-linear-to-b from-black/10
                to-transparent
              `}
          />
        </div>
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div
            className={`
                relative max-w-sm transform rounded-2xl border-2
                border-amber-200/50 bg-amber-800/40 px-4 py-3 shadow-xl
                backdrop-blur-xs transition-transform duration-300
                hover:scale-[1.02]
                sm:max-w-md sm:px-6 sm:py-4
                md:max-w-lg
              `}
          >
            <h1
              className={`
                  ${robotoSlab.variable}
                  text-center font-roboto-slab text-2xl leading-tight font-bold
                  text-amber-50
                  sm:text-3xl
                  md:text-4xl
                `}
            >
              <span
                className={`
                    mb-1 block drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]
                    sm:mb-2
                  `}
              >
                {t.hero.title}
              </span>
              <span
                className={`
                    block font-extrabold tracking-wide text-white
                    drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]
                  `}
              >
                {t.hero.subtitle}
              </span>
            </h1>
            <div
              className={`
              absolute -inset-[1px] -z-10 rounded-2xl bg-linear-to-b
              from-amber-200/20 to-transparent blur-xs
            `}
            />
          </div>
        </div>
      </div>

      {/* Circular Images Section - positioned to overlap with hero */}
      <div
        className={`
            relative z-10 mx-auto -mt-12 flex max-w-6xl flex-row items-center
            justify-center gap-2 px-2
            xs:gap-3
            sm:-mt-16 sm:gap-4 sm:px-4
            md:-mt-24 md:gap-6
            lg:-mt-32 lg:gap-8
          `}
      >
        {/* Swimming */}
        <div
          className={`
              rotate-2 transform rounded-full bg-white p-1 shadow-lg
              sm:p-2
            `}
        >
          <div
            className={`
                relative h-20 w-20 overflow-hidden rounded-full
                xs:h-24 xs:w-24
                sm:h-32 sm:w-32
                md:h-40 md:w-40
                lg:h-48 lg:w-48
              `}
          >
            <OptimizedImage
              src="/images/round1.jpg"
              alt={t.activities.swimming}
              fill={true}
              imageType="thumbnail"
              sizes="(max-width: 479px) 80px, (max-width: 639px) 96px, (max-width: 767px) 128px, (max-width: 1023px) 160px, 192px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Horse Riding */}
        <div
          className={`
              -rotate-2 transform rounded-full bg-white p-1 shadow-lg
              sm:p-2
            `}
        >
          <div
            className={`
                relative h-20 w-20 overflow-hidden rounded-full
                xs:h-24 xs:w-24
                sm:h-32 sm:w-32
                md:h-40 md:w-40
                lg:h-48 lg:w-48
              `}
          >
            <OptimizedImage
              src="/images/round2.jpg"
              alt={t.activities.horseRiding}
              quality={55}
              fill={true}
              imageType="thumbnail"
              sizes="(max-width: 479px) 80px, (max-width: 639px) 96px, (max-width: 767px) 128px, (max-width: 1023px) 160px, 192px"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>

        {/* Kayaking */}
        <div
          className={`
              rotate-3 transform rounded-full bg-white p-1 shadow-lg
              sm:p-2
            `}
        >
          <div
            className={`
                relative h-20 w-20 overflow-hidden rounded-full
                xs:h-24 xs:w-24
                sm:h-32 sm:w-32
                md:h-40 md:w-40
                lg:h-48 lg:w-48
              `}
          >
            <OptimizedImage
              src="/images/round3.jpg"
              alt={t.activities.kayaking}
              fill={true}
              imageType="thumbnail"
              sizes="(max-width: 479px) 80px, (max-width: 639px) 96px, (max-width: 767px) 128px, (max-width: 1023px) 160px, 192px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Introduction Text Section - adjusted margin top */}
      <div
        className={`
            group relative mx-auto mt-20 max-w-4xl transform overflow-hidden
            rounded-2xl px-6 py-8 text-center transition-all duration-500
            hover:scale-[1.01]
            sm:mt-24
            md:mt-20 md:px-10 md:py-10
          `}
      >
        {/* Background layers */}
        <div
          className={`
              absolute inset-0 -z-10 rounded-2xl bg-linear-to-br
              from-[#f5f0e8]/95 via-white/90 to-[#f5f0e8]/95 backdrop-blur-md
            `}
        />
        <div className="absolute inset-0 -z-20 rounded-2xl bg-[#6b8362]/5" />

        {/* Decorative effects */}
        <div
          className={`
              pointer-events-none absolute -inset-[3px] -z-10 rounded-2xl
              opacity-70
            `}
        >
          <div
            className={`
                absolute inset-0 rounded-2xl bg-linear-to-tr from-amber-200/30
                via-transparent to-[#6b8362]/20
              `}
          />
        </div>
        <div
          className={`
              pointer-events-none absolute inset-0 rounded-2xl border
              border-amber-200/30
            `}
        />

        {/* Main content */}
        <h2
          className={`
              ${robotoSlab.variable}
              relative mb-6 inline-block font-roboto-slab text-3xl font-bold
              text-[#3E5A35]
              md:text-4xl
            `}
        >
          {t.introduction.mainTitle}
          <div
            className={`
                absolute -bottom-2 left-0 h-[2px] w-full bg-linear-to-r
                from-transparent via-[#6b8362]/70 to-transparent
              `}
          />
        </h2>

        <div className="relative">
          <p
            className={`
                mb-4 text-lg leading-relaxed text-gray-700
                md:text-xl
              `}
          >
            {t.introduction.mainText}
          </p>
          <p
            className={`
                mt-2 text-gray-600
                md:text-lg
              `}
          >
            {t.introduction.seoDescription}
          </p>

          {/* Subtle decorative corners */}
          <div
            className={`
                absolute -top-1 -left-1 h-10 w-10 rounded-tl-lg border-t-2
                border-l-2 border-[#6b8362]/30
              `}
          />
          <div
            className={`
                absolute -right-1 -bottom-1 h-10 w-10 rounded-br-lg border-r-2
                border-b-2 border-[#6b8362]/30
              `}
          />
        </div>

        {/* Shadow effect */}
        <div className="absolute -inset-[1px] -z-30 rounded-2xl shadow-xl" />
      </div>

      {/* Our Adventure Packages Section */}
      <div
        className={`
            mt-16 flex flex-col items-center text-center
            md:mt-20
          `}
      >
        <h2
          className={`
              ${robotoSlab.variable}
              relative mb-6 inline-block font-roboto-slab text-4xl font-bold
              text-[#3E5A35]
              md:text-5xl
            `}
        >
          {language === "el"
            ? "Τα Πακέτα Περιπέτειάς μας"
            : "Our Adventure Packages"}
          <div
            className={`
                absolute -bottom-2 left-0 h-1 w-full bg-linear-to-r
                from-transparent via-[#6b8362] to-transparent
              `}
          />
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-gray-700 md:text-xl">
          {language === "el"
            ? "Ανακαλύψτε τα δημοφιλή πακέτα μας που συνδυάζουν rafting, ιππασία και πεζοπορία για μια ολοκληρωμένη εμπειρία στον Αχέροντα."
            : "Discover our popular packages combining rafting, horse riding, and hiking for a complete Acheron River experience."}
        </p>

        {/* Client-side Price List Button */}
        <PriceListButton text={t.booking.ourPriceList} />
      </div>

      {/* Program Cards */}
      <div
        className={`
            mx-auto mt-12 flex max-w-6xl flex-col items-stretch justify-center
            gap-6 px-4
            md:mt-16 md:px-8
            lg:flex-row lg:gap-8
          `}
      >
        {/* Package 1 Card */}
        <div
          className={`
              flex w-full justify-center
              lg:w-1/2
            `}
        >
          <VintagePackageCard
            title={t.programs.program1.title || "PACKAGE 1"}
            badge={t.programs.program1.badge || "Most Popular"}
            activities={{
              primary: t.programs.program1.rafting || "Rafting: 30 minutes",
              riding: t.programs.program1.riding || "Riding: 10-15 minutes",
              hiking: t.programs.program1.hiking || "Hiking canyon crossing",
            }}
            pricing={{
              adults: "20 €",
              children: "10 €",
            }}
            images={{
              main: "/images/Rafting_Group_Blue_Adventure_River.jpg",
              top: "/images/round2.jpg",
              bottom: "/images/round1.jpg",
            }}
            bookingId="bokun_5b20d531_ca57_4550_94c0_0511c35077a0"
            dataSrc="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020598?partialView=1"
            bookNowText={t.booking.bookNow}
            packageName="Package 1 - Rafting + Riding + Hiking"
            packagePrice="20"
            trackingLabel="Homepage Package 1"
            variant="green"
            packageType="package1"
            sourcePage="homepage"
            showLearnMoreLink={true}
          />
        </div>

        {/* Package 2 Card */}
        <div
          className={`
              flex w-full justify-center
              lg:w-1/2
            `}
        >
          <VintagePackageCard
            title={t.programs.program2.title || "PACKAGE 2"}
            badge={t.programs.program2.badge || "New Experience"}
            activities={{
              primary: t.programs.program2.kayak || "Kayak: 30 minutes",
              riding: t.programs.program2.riding || "Riding: 10-15 minutes",
              hiking: t.programs.program2.hiking || "Hiking canyon crossing",
            }}
            pricing={{
              perPerson: "25 €",
            }}
            images={{
              main: "/images/Kayaker_Red_Adventurous_River.jpg",
              top: "/images/round3.jpg",
              bottom: "/images/round2.jpg",
            }}
            bookingId="bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53"
            dataSrc="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020569?partialView=1"
            bookNowText={t.booking.bookNow}
            packageName="Package 2 - Kayak + Riding + Hiking"
            packagePrice="25"
            trackingLabel="Homepage Package 2"
            variant="orange"
            packageType="package2"
            sourcePage="homepage"
            showLearnMoreLink={true}
          />
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div
        className={`
            mt-16 text-center
            md:mt-20
          `}
      >
        <h2
          className={`
              ${robotoSlab.variable}
              relative mb-12 inline-block font-roboto-slab text-4xl font-bold
              text-[#3E5A35]
              md:mb-16 md:text-5xl
            `}
        >
          {t.reviews.title}
          <div
            className={`
                absolute -bottom-2 left-0 h-1 w-full bg-linear-to-r
                from-transparent via-[#6b8362] to-transparent
              `}
          />
        </h2>
      </div>

      {/* Reviews Widget - Fixed height container to prevent CLS */}
      <div className="min-h-[320px] w-full">
        <DynamicGoogleReviews />
      </div>

      {/* Map and Contact Section */}
      <div
        className={`
            mt-20 mb-20 px-4
            md:px-8
          `}
      >
        <h2
          className={`
              ${robotoSlab.variable}
              mb-10 text-center font-roboto-slab text-3xl text-[#6b8362]
              md:text-4xl
            `}
        >
          {t.location.findUs}
        </h2>

        <div
          className={`
              flex flex-col gap-10
              lg:flex-row
            `}
        >
          <div className="lg:w-3/5">
            {/* Fixed height container for Google Map to prevent CLS */}
            <div className="min-h-[400px] w-full">
              <DynamicGoogleMap />
            </div>
          </div>
          <div className="lg:w-2/5">
            <DynamicContactDetails />
          </div>
        </div>
      </div>

      {/* Global Bokun Button Styles */}
      <BokunStyles />
    </main>
  );
}
