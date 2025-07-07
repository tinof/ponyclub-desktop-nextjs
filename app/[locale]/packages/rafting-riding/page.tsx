import type { Metadata } from "next";

import ActivityPageLayout from "@/components/ActivityPageLayout";
import DynamicBokunWidget from "@/components/DynamicBokunWidget";
import StructuredData from "@/components/StructuredData";
import {
  generateActivityStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
} from "@/lib/structured-data";

// PERFORMANCE OPTIMIZATION: ISR configuration for package pages
// Package content may change periodically (pricing, availability, descriptions)
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
      ? "Πακέτο Rafting & Ιππασία στον Αχέροντα | Καλύτερη Τιμή"
      : "Acheron Rafting & Horse Riding Package | Best Value Deal";
  const description =
    locale === "el"
      ? "Συνδυάστε τις δύο κορυφαίες δραστηριότητες στον Αχέροντα σε ένα πακέτο. Ιδανικό για οικογένειες και παρέες. Κλείστε online στην καλύτερη τιμή."
      : "Combine the top two Acheron activities in one package. Ideal for families and groups. Book online for the best price.";

  const openGraphTitle =
    locale === "el"
      ? "Πακέτο Rafting & Ιππασία | Pony Club"
      : "Rafting & Horse Riding Package | Pony Club";
  const openGraphDescription =
    locale === "el"
      ? "Η καλύτερη προσφορά για περιπέτεια στον Αχέροντα! Rafting και ιππασία σε ένα πακέτο. Κλείστε τη θέση σας σήμερα!"
      : "The best deal for Acheron adventure! Rafting and horse riding in one package. Book your spot today!";

  const keywords =
    locale === "el"
      ? "πακέτο rafting ιππασία, αχέροντας πακέτο, συνδυασμένη περιπέτεια, καλύτερη τιμή, οικογενειακό πακέτο, Pony Club, Θεσπρωτία"
      : "rafting horse riding package, acheron package deal, combined adventure, best value, family package, Pony Club, Thesprotia";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://ponyclub.gr/${locale}/packages/rafting-riding`,
      languages: {
        en: "https://ponyclub.gr/en/packages/rafting-riding",
        el: "https://ponyclub.gr/el/packages/rafting-riding",
      },
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: `https://ponyclub.gr/${locale}/packages/rafting-riding`,
      siteName: "Pony Club",
      images: [
        {
          url: "https://ponyclub.gr/images/packages/rafting-riding-package.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "el"
              ? "Πακέτο Rafting & Ιππασία στον Αχέροντα"
              : "Rafting & Horse Riding Package at Acheron",
        },
      ],
      locale: locale === "el" ? "el_GR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [
        "https://ponyclub.gr/images/packages/rafting-riding-package.jpg",
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const RaftingRidingPackagePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === "el";

  // Define the experience ID for the rafting & riding package
  const bokunExperienceId = "1020598"; // Using existing package-1 ID as it matches the description

  // Generate structured data for this package
  const structuredData = generateActivityStructuredData("rafting", locale); // Using rafting as base, will enhance later

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData(
    [
      {
        name: isGreek ? "Αρχική" : "Home",
        url: `https://ponyclub.gr/${locale}`,
      },
      {
        name: isGreek ? "Πακέτα" : "Packages",
        url: `https://ponyclub.gr/${locale}#packages`,
      },
    ],
    isGreek ? "Rafting & Ιππασία" : "Rafting & Horse Riding"
  );

  // Generate FAQ structured data
  const faqData = generateFAQStructuredData(
    isGreek
      ? [
          {
            question: "Τι περιλαμβάνει το πακέτο Rafting & Ιππασία;",
            answer:
              "Το πακέτο περιλαμβάνει 30 λεπτά rafting στον Αχέροντα, 15 λεπτά ιππασία, όλο τον εξοπλισμό ασφαλείας και επαγγελματία οδηγό.",
          },
          {
            question: "Ποια είναι η καλύτερη τιμή για το πακέτο;",
            answer:
              "Το πακέτο κοστίζει €20 για ενήλικες και €10 για παιδιά 6-12 ετών. Είναι η καλύτερη αξία για δύο δραστηριότητες!",
          },
          {
            question: "Είναι κατάλληλο για οικογένειες;",
            answer:
              "Ναι! Το πακέτο είναι σχεδιασμένο για οικογένειες και αρχάριους. Δεχόμαστε παιδιά από 6 ετών.",
          },
        ]
      : [
          {
            question: "What's included in the Rafting & Horse Riding package?",
            answer:
              "The package includes 30 minutes of Acheron rafting, 15 minutes of horse riding, all safety equipment, and a professional guide.",
          },
          {
            question: "What's the best price for this package?",
            answer:
              "The package costs €20 for adults and €10 for children 6-12 years. It's the best value for two activities!",
          },
          {
            question: "Is it suitable for families?",
            answer:
              "Yes! The package is designed for families and beginners. We accept children from 6 years old.",
          },
        ],
    `https://ponyclub.gr/${locale}/packages/rafting-riding`
  );

  const packageDescription = isGreek ? (
    <div className="space-y-4 text-lg">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">
        Rafting & Horse Riding Adventure Package
      </h1>
      <p>
        Ζήστε την απόλυτη περιπέτεια στον Αχέροντα με το δημοφιλέστερο πακέτο
        μας! Συνδυάζουμε τις δύο κορυφαίες δραστηριότητες - rafting και ιππασία
        - σε ένα ολοκληρωμένο πακέτο που προσφέρει την καλύτερη αξία για
        χρήματα.
      </p>
      <p>
        Αυτό το πακέτο είναι ιδανικό για οικογένειες, παρέες φίλων και όσους
        θέλουν να ζήσουν μια πλήρη ημέρα περιπέτειας στη μυθική Γλυκή
        Θεσπρωτίας.
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6">
        <h3 className="text-xl font-bold text-amber-800 mb-4">
          Καλύτερη Τιμή - Διπλή Περιπέτεια!
        </h3>
        <p className="text-lg">
          <strong>€20 ενήλικες | €10 παιδιά (6-12 ετών)</strong>
        </p>
        <p className="text-sm text-amber-700 mt-2">
          Εξοικονομήστε χρήματα συνδυάζοντας δύο δραστηριότητες σε ένα πακέτο!
        </p>
      </div>
    </div>
  ) : (
    <div className="space-y-4 text-lg">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">
        Rafting & Horse Riding Adventure Package
      </h1>
      <p>
        Experience the ultimate Acheron adventure with our most popular package!
        We combine the two top activities - rafting and horse riding - in a
        complete package that offers the best value for money.
      </p>
      <p>
        This package is perfect for families, groups of friends, and anyone who
        wants to experience a full day of adventure in the mythical Glyki,
        Thesprotia.
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6">
        <h3 className="text-xl font-bold text-amber-800 mb-4">
          Best Value - Double Adventure!
        </h3>
        <p className="text-lg">
          <strong>€20 adults | €10 children (6-12 years)</strong>
        </p>
        <p className="text-sm text-amber-700 mt-2">
          Save money by combining two activities in one package!
        </p>
      </div>
    </div>
  );

  return (
    <>
      <StructuredData data={[structuredData, breadcrumbData, faqData]} />
      <ActivityPageLayout
        title={
          isGreek
            ? "Πακέτο Rafting & Ιππασία"
            : "Rafting & Horse Riding Package"
        }
        subtitle={
          isGreek
            ? "Η καλύτερη προσφορά για περιπέτεια!"
            : "Best value for adventure!"
        }
        descriptionTitle={isGreek ? "Περιγραφή Πακέτου" : "Package Description"}
        descriptionContent={packageDescription}
        pricingTitle={isGreek ? "Κράτηση Πακέτου" : "Package Booking"}
        pricingContent={
          <div className="space-y-8">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-center mb-4 text-amber-800">
                {isGreek ? "Κλείστε το Πακέτο Online" : "Book Package Online"}
              </h3>
              <div className="bokun-widget-container">
                <DynamicBokunWidget experienceId={bokunExperienceId} />
              </div>
            </div>
          </div>
        }
        detailsTitle={isGreek ? "Λεπτομέρειες Πακέτου" : "Package Details"}
        detailsContent={
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              {isGreek ? "Τι Περιλαμβάνει" : "What's Included"}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-amber-600">•</span>
                <span>
                  <strong>{isGreek ? "Rafting:" : "Rafting:"}</strong>{" "}
                  {isGreek
                    ? "30 λεπτά στον Αχέροντα"
                    : "30 minutes on Acheron River"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-amber-600">•</span>
                <span>
                  <strong>{isGreek ? "Ιππασία:" : "Horse Riding:"}</strong>{" "}
                  {isGreek
                    ? "15 λεπτά με εκπαιδευμένα άλογα"
                    : "15 minutes with trained horses"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-amber-600">•</span>
                <span>
                  <strong>{isGreek ? "Εξοπλισμός:" : "Equipment:"}</strong>{" "}
                  {isGreek
                    ? "Πλήρης εξοπλισμός ασφαλείας"
                    : "Complete safety equipment"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-amber-600">•</span>
                <span>
                  <strong>{isGreek ? "Οδηγός:" : "Guide:"}</strong>{" "}
                  {isGreek ? "Επαγγελματίας οδηγός" : "Professional guide"}
                </span>
              </li>
            </ul>
          </div>
        }
        showBookingButton={false}
        fullWidthContent={false}
      />
    </>
  );
};

export default RaftingRidingPackagePage;
