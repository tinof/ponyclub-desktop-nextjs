import type { Metadata } from "next";
import Link from "next/link";

import { robotoSlab } from "@/app/fonts";
import StructuredData from "@/components/StructuredData";
import VintagePackageCard from "@/components/VintagePackageCard";
import { generateBreadcrumbStructuredData } from "@/lib/structured-data";

// PERFORMANCE OPTIMIZATION: ISR configuration for packages hub page
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "el"
      ? "Πακέτα Περιπέτειας Αχέροντας | Rafting, Ιππασία & Πεζοπορία"
      : "Acheron Adventure Packages | Rafting, Horse Riding & Hiking";
  const description =
    locale === "el"
      ? "Ανακαλύψτε τα πακέτα περιπέτειας μας στον Αχέροντα. Συνδυάζουμε rafting, ιππασία και πεζοπορία για μια ολοκληρωμένη εμπειρία. Κλείστε το πακέτο σας σήμερα!"
      : "Discover our Acheron adventure packages. We combine rafting, horse riding, and hiking for a complete experience. Book your package today!";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/packages`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "el" ? "el_GR" : "en_US",
    },
  };
}

const PackagesPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === "el";

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData(
    [
      { name: isGreek ? "Αρχική" : "Home", url: `/${locale}` },
      { name: isGreek ? "Πακέτα" : "Packages", url: `/${locale}/packages` },
    ],
    `https://ponyclub.gr/${locale}/packages`
  );

  return (
    <>
      <StructuredData data={breadcrumbData} />

      <main className="relative min-h-screen overflow-hidden">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-amber-50 py-16">
          <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
            <h1
              className={`
                ${robotoSlab.variable}
                mb-6 font-roboto-slab text-4xl font-bold text-[#3E5A35]
                md:text-5xl lg:text-6xl
              `}
            >
              {isGreek ? "Πακέτα Περιπέτειας" : "Adventure Packages"}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-700 md:text-xl">
              {isGreek
                ? "Επιλέξτε το ιδανικό πακέτο περιπέτειας για εσάς! Συνδυάζουμε διαφορετικές δραστηριότητες στον Αχέροντα για μια ολοκληρωμένη εμπειρία που θα θυμάστε για πάντα."
                : "Choose the perfect adventure package for you! We combine different activities at Acheron River for a complete experience you'll remember forever."}
            </p>
          </div>
        </div>

        {/* Packages Section */}
        <div className="py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
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

            {/* Package Cards Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Package 1 Card */}
              <div className="flex justify-center">
                <Link href={`/${locale}/package-1`} className="block w-full">
                  <VintagePackageCard
                    title={isGreek ? "ΠΑΚΕΤΟ 1" : "PACKAGE 1"}
                    badge={isGreek ? "Πιο Δημοφιλές" : "Most Popular"}
                    activities={{
                      primary: isGreek
                        ? "Ράφτινγκ: 30 λεπτά"
                        : "Rafting: 30 minutes",
                      riding: isGreek
                        ? "Ιππασία: 10-15 λεπτά"
                        : "Riding: 10-15 minutes",
                      hiking: isGreek
                        ? "Πεζοπορία διάσχισης φαραγγιού"
                        : "Hiking canyon crossing",
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
                    bookNowText={isGreek ? "Κλείστε Τώρα" : "Book Now"}
                    packageName="Package 1 - Rafting + Riding + Hiking"
                    packagePrice="20"
                    trackingLabel="Packages Page Package 1"
                    variant="green"
                    packageType="package1"
                    sourcePage="packages-page"
                  />
                </Link>
              </div>

              {/* Package 2 Card */}
              <div className="flex justify-center">
                <Link href={`/${locale}/package-2`} className="block w-full">
                  <VintagePackageCard
                    title={isGreek ? "ΠΑΚΕΤΟ 2" : "PACKAGE 2"}
                    badge={isGreek ? "Περιπετειώδες" : "Adventurous"}
                    activities={{
                      primary: isGreek
                        ? "Καγιάκ: 30 λεπτά"
                        : "Kayak: 30 minutes",
                      riding: isGreek
                        ? "Ιππασία: 10-15 λεπτά"
                        : "Riding: 10-15 minutes",
                      hiking: isGreek
                        ? "Πεζοπορία διάσχισης φαραγγιού"
                        : "Hiking canyon crossing",
                    }}
                    pricing={{
                      adults: "25 €",
                      children: "15 €",
                    }}
                    images={{
                      main: "/images/Kayak_Adventure_Acheron_River.jpg",
                      top: "/images/round3.jpg",
                      bottom: "/images/round4.jpg",
                    }}
                    bookingId="bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53"
                    dataSrc="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020569?partialView=1"
                    bookNowText={isGreek ? "Κλείστε Τώρα" : "Book Now"}
                    packageName="Package 2 - Kayak + Riding + Hiking"
                    packagePrice="25"
                    trackingLabel="Packages Page Package 2"
                    variant="orange"
                    packageType="package2"
                    sourcePage="packages-page"
                  />
                </Link>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 p-8">
              <div className="text-center">
                <h3
                  className={`
                    ${robotoSlab.variable}
                    mb-4 font-roboto-slab text-2xl font-bold text-[#3E5A35]
                    md:text-3xl
                  `}
                >
                  {isGreek
                    ? "Γιατί να Επιλέξετε τα Πακέτα μας;"
                    : "Why Choose Our Packages?"}
                </h3>
                <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mb-3 text-3xl">🏆</div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      {isGreek ? "Καλύτερη Αξία" : "Best Value"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isGreek
                        ? "Συνδυάστε πολλές δραστηριότητες σε ένα πακέτο και εξοικονομήστε χρήματα"
                        : "Combine multiple activities in one package and save money"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-3 text-3xl">👨‍👩‍👧‍👦</div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      {isGreek
                        ? "Ιδανικό για Οικογένειες"
                        : "Perfect for Families"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isGreek
                        ? "Ασφαλείς δραστηριότητες για παιδιά από 6 ετών και άνω"
                        : "Safe activities for children 6 years and older"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-3 text-3xl">🌟</div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      {isGreek
                        ? "Ολοκληρωμένη Εμπειρία"
                        : "Complete Experience"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isGreek
                        ? "Ζήστε όλες τις περιπέτειες του Αχέροντα σε μία ημέρα"
                        : "Experience all Acheron adventures in one day"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PackagesPage;
