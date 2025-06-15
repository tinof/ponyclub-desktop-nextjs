import type { Metadata } from 'next';

import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';
import NoScriptFallback from '@/components/NoScriptFallback';
import RelatedActivities from '@/components/RelatedActivities';
import SEOActivityContent from '@/components/SEOActivityContent';
import StructuredData from '@/components/StructuredData';
import { generateActivityStructuredData, generateBreadcrumbStructuredData, generateFAQStructuredData } from '@/lib/structured-data';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'el'
      ? 'Rafting Αχέροντας Τιμές | Ασφαλής Κατάβαση για Οικογένειες'
      : 'Acheron River Rafting Prices | Safe Family Rafting Tours';
  const description =
    locale === 'el'
      ? 'Δείτε τις τιμές για rafting στον Αχέροντα. Προσφέρουμε ασφαλείς καταβάσεις για οικογένειες και αρχάριους. Κλείστε την περιπέτειά σας σήμερα!'
      : 'See our Acheron River rafting prices. We offer safe river descents perfect for families and beginners. Book your adventure today!';

  const openGraphTitle =
    locale === 'el'
      ? 'Rafting στον Αχέροντα | Pony Club'
      : 'Acheron River Rafting | Pony Club';
  const openGraphDescription =
    locale === 'el'
      ? 'Ζήστε μια αξέχαστη περιπέτεια ράφτινγκ στον ποταμό Αχέροντα. Ιδανικό για οικογένειες και αρχάριους. Κλείστε τη θέση σας σήμερα!'
      : 'Experience an unforgettable rafting adventure on the Acheron River. Perfect for families and beginners. Book your tour today!';

  const keywords = locale === 'el'
    ? 'rafting Αχέροντας, ράφτινγκ Γλυκή, οικογενειακό rafting, ασφαλές ράφτινγκ, Θεσπρωτία, Pony Club, περιπέτεια, ποταμός Αχέροντας, εκδρομή'
    : 'Acheron River rafting, Glyki rafting, family rafting Greece, safe rafting tours, Thesprotia activities, Pony Club, adventure tourism, river rafting, outdoor activities';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://ponyclub.gr/${locale}/rafting`,
      languages: {
        en: 'https://ponyclub.gr/en/rafting',
        el: 'https://ponyclub.gr/el/rafting',
      },
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: `https://ponyclub.gr/${locale}/rafting`,
      siteName: 'Pony Club',
      images: [
        {
          url: 'https://ponyclub.gr/images/activities/rafting-acheron-1.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'el' ? 'Ράφτινγκ στον ποταμό Αχέροντα' : 'Rafting on Acheron River',
        },
      ],
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraphTitle,
      description: openGraphDescription,
      images: ['https://ponyclub.gr/images/activities/rafting-acheron-1.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const RaftingPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === 'el';

  // Define the experience ID for rafting
  const bokunExperienceId = '1020611';

  // Generate structured data for this activity
  const structuredData = generateActivityStructuredData('rafting', locale);

  // Generate breadcrumb items for navigation
  const breadcrumbItems = [
    { name: isGreek ? 'Αρχική' : 'Home', href: `/${locale}` },
    { name: isGreek ? 'Δραστηριότητες' : 'Activities', href: `/${locale}#activities` },
    { name: isGreek ? 'Ράφτινγκ' : 'Rafting' }
  ];

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData(
    [
      { name: isGreek ? 'Αρχική' : 'Home', url: `https://ponyclub.gr/${locale}` },
      { name: isGreek ? 'Δραστηριότητες' : 'Activities', url: `https://ponyclub.gr/${locale}#activities` }
    ],
    isGreek ? 'Ράφτινγκ' : 'Rafting'
  );

  // Generate FAQ structured data
  const faqData = generateFAQStructuredData(
    isGreek ? [
      {
        question: "Πόσο διαρκεί η διαδρομή του ράφτινγκ;",
        answer: "Η εμπειρία διαρκεί περίπου 30 λεπτά στο νερό, με επιπλέον χρόνο για ενημέρωση ασφαλείας, εξοπλισμό και μεταφορά στο σημείο εκκίνησης."
      },
      {
        question: "Είναι ασφαλές το ράφτινγκ στον Αχέροντα για παιδιά;",
        answer: "Ναι! Οι εκδρομές μας είναι σχεδιασμένες για να είναι φιλικές προς την οικογένεια και ασφαλείς για παιδιά ηλικίας 6 ετών και άνω. Παρέχουμε όλο τον εξοπλισμό ασφαλείας και έμπειρους οδηγούς."
      },
      {
        question: "Τι πρέπει να φέρω μαζί μου;",
        answer: "Άνετα ρούχα, μαγιό, πετσέτα και αντηλιακό."
      }
    ] : [
      {
        question: "How long is the rafting trip?",
        answer: "The rafting experience lasts approximately 30 minutes on the water, with additional time for safety briefing and equipment setup, and ride back to starting point."
      },
      {
        question: "Is rafting on the Acheron safe for kids?",
        answer: "Yes! Our rafting tours are designed to be family-friendly and safe for children 6 years and older. We provide all safety equipment and experienced guides."
      },
      {
        question: "What should I bring for rafting?",
        answer: "Comfortable clothes, swimwear, a towel, and sunscreen."
      }
    ],
    `https://ponyclub.gr/${locale}/rafting`
  );



  const raftingDescription = isGreek ? (
    <div className="space-y-4 text-lg">
      <p>
        Ζήστε την απόλυτη περιπέτεια με ράφτινγκ στον μυθικό ποταμό Αχέροντα! Το Pony Club προσφέρει μια ασφαλή και συναρπαστική εμπειρία ράφτινγκ στα καθαρά νερά της Γλυκής, στη Θεσπρωτία.
      </p>
      <p>
        Ο Αχέροντας είναι ένας από τους πιο γνωστούς ποταμούς της Ελλάδας για ράφτινγκ, με ήρεμα νερά που τον καθιστούν ιδανικό για αρχάριους και οικογένειες. Η διαδρομή των 30 λεπτών προσφέρει μοναδικές εικόνες σε ένα καταπράσινο φυσικό περιβάλλον.
      </p>
      <p>
        Οι έμπειροι οδηγοί μας διασφαλίζουν την ασφάλειά σας σε κάθε βήμα, παρέχοντας όλο τον απαραίτητο εξοπλισμό. Κατάλληλο για άτομα άνω των 6 ετών και για όλα τα επίπεδα εμπειρίας.
      </p>
      <p className="font-bold">
        Οι τιμές περιλαμβάνουν: Επαγγελματία οδηγό, εξοπλισμό ασφαλείας, 30λεπτη κατάβαση ποταμού και επιστροφή στο σημείο εκκίνησης.
      </p>
    </div>
  ) : (
    <div className="space-y-4 text-lg">
      <p>
        Experience the ultimate adventure with rafting in the mythical Acheron River! Pony Club offers a safe and thrilling rafting experience in the clear waters of Glyki, Thesprotia.
      </p>
      <p>
        Acheron is one of Greece's most renowned rivers for rafting, with gentle currents that make it perfect for beginners and families. The 30-minute journey offers unique views in a lush natural environment.
      </p>
      <p>
        Our experienced guides ensure your safety and guide you every step of the way, while providing all necessary safety equipment. Suitable for people over 6 years old and all experience levels.
      </p>
      <p className="font-bold">
        Prices include: Professional guide, safety equipment, 30-minute river descent and return ride to the starting point.
      </p>
    </div>
  );

  const details = isGreek ? (
    <div className="space-y-4">
        <h3 className="text-2xl font-bold">Συχνές Ερωτήσεις</h3>
        <h4 className="text-xl font-semibold">Πόσο διαρκεί η διαδρομή του ράφτινγκ;</h4>
        <p>Η εμπειρία διαρκεί περίπου 30 λεπτά στο νερό, με επιπλέον χρόνο για ενημέρωση ασφαλείας, εξοπλισμό και μεταφορά στο σημείο εκκίνησης.</p>
        <h4 className="text-xl font-semibold">Είναι ασφαλές το ράφτινγκ στον Αχέροντα για παιδιά;</h4>
        <p>Ναι! Οι εκδρομές μας είναι σχεδιασμένες για να είναι φιλικές προς την οικογένεια και ασφαλείς για παιδιά ηλικίας 6 ετών και άνω. Παρέχουμε όλο τον εξοπλισμό ασφαλείας και έμπειρους οδηγούς.</p>
        <h4 className="text-xl font-semibold">Τι πρέπει να φέρω μαζί μου;</h4>
        <p>Άνετα ρούχα, μαγιό, πετσέτα και αντηλιακό.</p>
    </div>
  ) : (
    <div className="space-y-4">
        <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
        <h4 className="text-xl font-semibold">How long is the rafting trip?</h4>
        <p>The rafting experience lasts approximately 30 minutes on the water, with additional time for safety briefing and equipment setup, and ride back to starting point.</p>
        <h4 className="text-xl font-semibold">Is rafting on the Acheron safe for kids?</h4>
        <p>Yes! Our rafting tours are designed to be family-friendly and safe for children 6 years and older. We provide all safety equipment and experienced guides.</p>
        <h4 className="text-xl font-semibold">What should I bring for rafting?</h4>
        <p>Comfortable clothes, swimwear, a towel, and sunscreen.</p>
    </div>
  )

  // Hybrid pricing content: Server-side SEO content + Bokun widget
  const hybridPricingContent = (
    <div className="space-y-8">
      {/* Server-side rendered content for SEO/crawlers */}
      <div className="seo-content-section">
        <SEOActivityContent activityType="rafting" locale={locale} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-bold text-center mb-4 text-amber-800">
          {isGreek ? 'Κλείστε Online' : 'Book Online'}
        </h3>

        {/* Interactive Bokun widget for users */}
        <div className="bokun-widget-container">
          <DynamicBokunWidget experienceId={bokunExperienceId} />
        </div>

        {/* Comprehensive noscript fallback */}
        <NoScriptFallback activityType="rafting" locale={locale} />
      </div>
    </div>
  );

  return (
    <>
      <StructuredData data={[structuredData, breadcrumbData, faqData]} />
      <ActivityPageLayout
        title={isGreek ? "Rafting στον Ποταμό Αχέροντα" : "Rafting on the Acheron River"}
        subtitle={isGreek ? "Μια αξέχαστη εμπειρία για όλη την οικογένεια" : "An unforgettable experience for the whole family"}
        descriptionTitle={isGreek ? "Περιγραφή Δραστηριότητας" : "Activity Description"}
        descriptionContent={raftingDescription}
        pricingTitle={isGreek ? "Τιμές & Κράτηση" : "Prices & Booking"}
        pricingContent={hybridPricingContent}
        detailsTitle={isGreek ? "Λεπτομέρειες & Συχνές Ερωτήσεις" : "Details & FAQ"}
        detailsContent={details}
        breadcrumbs={breadcrumbItems}
        showBookingButton={false}
        fullWidthContent={false}
      />

      {/* Related Activities for internal linking and SEO */}
      <div className="container mx-auto px-4 py-8">
        <RelatedActivities
          currentActivity="rafting"
          locale={locale}
          className="max-w-6xl mx-auto"
        />
      </div>
    </>
  );
};

export default RaftingPage;
