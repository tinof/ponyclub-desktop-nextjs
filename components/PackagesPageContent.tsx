"use client";

import { robotoSlab } from "@/app/fonts";
import BokunStyles from "@/components/client/BokunStyles";
import ModernPackageCard from "@/components/ModernPackageCard";
import PremiumTestimonials from "@/components/PremiumTestimonials";
import { useBokunInit } from "@/hooks/use-bokun-init";

interface PackagesPageContentProps {
  isGreek: boolean;
}

export default function PackagesPageContent({
  isGreek,
}: PackagesPageContentProps) {
  // Initialize Bokun widgets
  useBokunInit();

  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        {/* Hero Section - Mobile First & Family Focused */}
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
            <div className="mb-4 text-4xl">👨‍👩‍👧‍👦</div>
            <h1
              className={`
                ${robotoSlab.variable}
                mb-4 font-roboto-slab text-3xl font-bold text-gray-900
                md:text-4xl lg:text-5xl
              `}
            >
              {isGreek
                ? "Οικογενειακά Πακέτα Περιπέτειας"
                : "Family Adventure Packages"}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg mb-6">
              {isGreek
                ? "Ασφαλείς και διασκεδαστικές δραστηριότητες για όλη την οικογένεια στον Αχέροντα. Κατάλληλο για παιδιά από 6 ετών!"
                : "Safe and fun activities for the whole family at Acheron River. Perfect for children 6 years and up!"}
            </p>

            {/* Family Benefits Highlights */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <span>✅</span>
                <span>{isGreek ? "Ασφαλές για παιδιά" : "Child-Safe"}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <span>🛡️</span>
                <span>{isGreek ? "Πλήρης εξοπλισμός" : "Full Equipment"}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <span>👨‍🏫</span>
                <span>
                  {isGreek ? "Επαγγελματικός οδηγός" : "Professional Guide"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Section */}
        <div className="py-16 relative">
          {/* Watercolor Background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "url(/watercolor-leaves-bg.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="mx-auto max-w-6xl px-4 md:px-8 relative">
            <div className="mb-12 text-center">
              <h2
                className={`
                  ${robotoSlab.variable}
                  mb-4 font-roboto-slab text-3xl font-bold text-[#3E5A35]
                  md:text-4xl
                `}
              >
                {isGreek ? "Διαθέσιμα Πακέτα" : "Available Packages"}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-700">
                {isGreek
                  ? "Κάθε πακέτο περιλαμβάνει επαγγελματικό οδηγό, πλήρη εξοπλισμό ασφαλείας και μοναδικές εμπειρίες στη φύση."
                  : "Each package includes a professional guide, complete safety equipment, and unique experiences in nature."}
              </p>
            </div>

            {/* Package Cards Grid - Mobile First Design */}
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Package 1 Card */}
              <ModernPackageCard
                title={isGreek ? "Οικογενειακή Περιπέτεια" : "Family Adventure"}
                badge={isGreek ? "Πιο Δημοφιλές" : "Most Popular"}
                activities={{
                  primary: isGreek
                    ? "Ράφτινγκ: 30 λεπτά"
                    : "Rafting: 30 minutes",
                  riding: isGreek
                    ? "Ιππασία: 10-15 λεπτά"
                    : "Horse Riding: 10-15 minutes",
                  hiking: isGreek
                    ? "Πεζοπορία διάσχισης φαραγγιού"
                    : "Canyon Hiking Adventure",
                }}
                pricing={{
                  adults: "20 €",
                  children: "10 €",
                }}
                heroImage="/images/FamilyRafting_Green_Nature_River.jpg"
                bookingId="bokun_5b20d531_ca57_4550_94c0_0511c35077a0"
                dataSrc="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020598?partialView=1"
                bookNowText={isGreek ? "Κλείστε Τώρα" : "Book Family Fun"}
                packageName="Package 1 - Rafting + Riding + Hiking"
                packagePrice="20"
                trackingLabel="Packages Page Package 1"
                variant="popular"
                packageType="package1"
                sourcePage="package-page"
                showLearnMoreLink={true}
                isAboveFold={true}
              />

              {/* Package 2 Card */}
              <ModernPackageCard
                title={isGreek ? "Καγιάκ Περιπέτεια" : "Kayak Adventure"}
                badge={isGreek ? "Περιπετειώδες" : "Adventurous"}
                activities={{
                  primary: isGreek
                    ? "Καγιάκ: 30 λεπτά"
                    : "Kayaking: 30 minutes",
                  riding: isGreek
                    ? "Ιππασία: 10-15 λεπτά"
                    : "Horse Riding: 10-15 minutes",
                  hiking: isGreek
                    ? "Πεζοπορία διάσχισης φαραγγιού"
                    : "Canyon Hiking Adventure",
                }}
                pricing={{
                  perPerson: "25 €",
                }}
                heroImage="/images/Kayaker_Red_Blue_Tranquil_Bridge.jpg"
                bookingId="bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53"
                dataSrc="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020569?partialView=1"
                bookNowText={isGreek ? "Κλείστε Τώρα" : "Book Adventure"}
                packageName="Package 2 - Kayak + Riding + Hiking"
                packagePrice="25"
                trackingLabel="Packages Page Package 2"
                variant="adventurous"
                packageType="package2"
                sourcePage="package-page"
                showLearnMoreLink={true}
                isAboveFold={true}
              />
            </div>

            {/* Premium Benefits Section */}
            <div className="mt-16 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-blue-50 p-8 md:p-12 shadow-xl border border-emerald-100">
              <div className="text-center">
                <h3
                  className={`
                    ${robotoSlab.variable}
                    mb-8 font-roboto-slab text-2xl font-bold text-gray-900
                    md:text-3xl
                  `}
                >
                  {isGreek
                    ? "Γιατί να Επιλέξετε τα Πακέτα μας;"
                    : "Why Choose Our Packages?"}
                </h3>
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                  <div className="text-center group">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      🏆
                    </div>
                    <h4 className="mb-3 font-bold text-gray-900 text-lg">
                      {isGreek ? "Καλύτερη Αξία" : "Best Value"}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {isGreek
                        ? "Συνδυάστε πολλές δραστηριότητες σε ένα πακέτο και εξοικονομήστε έως 40% σε σχέση με ξεχωριστές κρατήσεις"
                        : "Combine multiple activities in one package and save up to 40% compared to separate bookings"}
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      👨‍👩‍👧‍👦
                    </div>
                    <h4 className="mb-3 font-bold text-gray-900 text-lg">
                      {isGreek
                        ? "Ιδανικό για Οικογένειες"
                        : "Perfect for Families"}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {isGreek
                        ? "Ασφαλείς δραστηριότητες για παιδιά από 6 ετών, με πιστοποιημένους οδηγούς και πλήρη εξοπλισμό ασφαλείας"
                        : "Safe activities for children 6+, with certified guides and complete safety equipment"}
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      🌟
                    </div>
                    <h4 className="mb-3 font-bold text-gray-900 text-lg">
                      {isGreek
                        ? "Ολοκληρωμένη Εμπειρία"
                        : "Complete Experience"}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {isGreek
                        ? "Ζήστε όλες τις περιπέτειες του Αχέροντα σε μία ημέρα με φωτογραφίες δωρεάν και μεταφορά από το ξενοδοχείο"
                        : "Experience all Acheron adventures in one day with free photos and hotel pickup"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Testimonials Section */}
        <PremiumTestimonials isGreek={isGreek} />
      </main>

      {/* Global Bokun Button Styles */}
      <BokunStyles />
    </>
  );
}
