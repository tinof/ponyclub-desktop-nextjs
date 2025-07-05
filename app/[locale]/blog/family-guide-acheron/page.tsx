import type { Metadata } from 'next';

import ActivityPageLayout from '@/components/ActivityPageLayout';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

// PERFORMANCE OPTIMIZATION: ISR configuration for blog pages
// Blog content may be updated periodically with new information, tips, or seasonal updates
export const revalidate = 7200; // Revalidate every 2 hours (blog content changes less frequently)

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'el'
      ? 'Οικογενειακός Οδηγός για τον Αχέροντα | Δραστηριότητες για Παιδιά Γλυκή'
      : 'A Complete Family Guide to the Acheron River | Kids Activities Glyki';
  const description =
    locale === 'el'
      ? 'Ο πλήρης οδηγός για οικογένειες που επισκέπτονται τον Αχέροντα. Ασφαλείς δραστηριότητες για παιδιά, συμβουλές και τι να περιμένετε στη Γλυκή.'
      : 'The complete guide for families visiting Acheron River. Safe activities for children, tips and what to expect in Glyki, Thesprotia.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/family-guide-acheron`,
    },
  };
}

const FamilyGuideAcheronPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === 'el';

  const blogContent = isGreek ? (
    <div className="mb-8">
      <h1
        className={`
          mb-6 text-3xl font-bold text-[#3E5A35]
          md:text-4xl
        `}
      >
        Οικογενειακός Οδηγός για τον Αχέροντα
      </h1>

      <div className="mb-8">
        <OptimizedImage
          src="/images/Rafting_Group_Blue_Adventure_River.jpg"
          alt="Οικογένεια κάνει rafting στον Αχέροντα"
          width={800}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-6">
          Ο ποταμός Αχέροντας στη Γλυκή Θεσπρωτίας είναι ένας από τους
          καλύτερους προορισμούς για οικογενειακές περιπέτειες στην Ελλάδα.
          Αυτός ο οδηγός θα σας βοηθήσει να σχεδιάσετε την τέλεια οικογενειακή
          εκδρομή.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Γιατί ο Αχέροντας είναι Ιδανικός για Οικογένειες;
        </h2>

        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3 text-green-600 font-bold">✓</span>
              <span>
                <strong>Ασφαλείς δραστηριότητες:</strong> Όλες οι δραστηριότητες
                είναι σχεδιασμένες για παιδιά
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600 font-bold">✓</span>
              <span>
                <strong>Ήπια ρεύματα:</strong> Το rafting είναι κατάλληλο για
                αρχάριους
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600 font-bold">✓</span>
              <span>
                <strong>Εκπαιδευμένα άλογα:</strong> Ήρεμα και φιλικά προς τα
                παιδιά
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600 font-bold">✓</span>
              <span>
                <strong>Έμπειροι οδηγοί:</strong> Ειδικευμένοι στις
                οικογενειακές εκδρομές
              </span>
            </li>
          </ul>
        </div>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Καλύτερες Δραστηριότητες για Παιδιά
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-semibold">
          1. Rafting για Οικογένειες
        </h3>
        <p>
          Το rafting στον Αχέροντα είναι ιδανικό για παιδιά από 6 ετών και άνω.
          Τα ήπια ρεύματα και η διάρκεια των 30 λεπτών το καθιστούν τέλειο για
          μικρούς περιπετειώδεις. Όλα τα παιδιά φορούν σωσίβια και κράνη
          ασφαλείας.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold">
          2. Ιππασία για Αρχάριους
        </h3>
        <p>
          Τα εκπαιδευμένα άλογά μας είναι ιδανικά για παιδιά που δοκιμάζουν
          ιππασία για πρώτη φορά. Οι βόλτες διαρκούν 10-15 λεπτά και γίνονται
          πάντα με συνοδεία έμπειρου οδηγού.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold">
          3. Εξερεύνηση της Φύσης
        </h3>
        <p>
          Η πεζοπορία στις πηγές του Αχέροντα είναι εύκολη και κατάλληλη για όλη
          την οικογένεια. Τα παιδιά θα ενθουσιαστούν με τα κρυστάλλινα νερά και
          τη μοναδική φύση της περιοχής.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Συμβουλές για Γονείς
        </h2>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h4 className="font-semibold mb-3">Τι να φέρετε:</h4>
          <ul className="space-y-2">
            <li>• Αντηλιακό και καπέλα</li>
            <li>• Εφεδρικά ρούχα</li>
            <li>• Παπούτσια που μπορούν να βραχούν</li>
            <li>• Σνακ και νερό</li>
            <li>• Φωτογραφική μηχανή</li>
          </ul>
        </div>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Ποια Πακέτα να Επιλέξετε
        </h2>

        <p>
          Για οικογένειες με παιδιά 6-12 ετών, συνιστούμε το{' '}
          <strong>Πακέτο 1</strong>
          που συνδυάζει rafting, ιππασία και πεζοπορία. Είναι το πιο δημοφιλές
          επιλογή για οικογένειες και προσφέρει την καλύτερη αξία.
        </p>

        <p>
          Για οικογένειες με μεγαλύτερα παιδιά (8+ ετών) που θέλουν περισσότερη
          περιπέτεια, το <strong>Πακέτο 2</strong> με kayak είναι ιδανικό.
        </p>

        <div className="mt-8 p-6 bg-amber-50 rounded-lg">
          <h3 className="font-bold text-lg mb-3">
            Κλείστε την Οικογενειακή σας Περιπέτεια
          </h3>
          <p className="mb-4">
            Το Pony Club προσφέρει τις καλύτερες οικογενειακές δραστηριότητες
            στον Αχέροντα από το 1999. Εμπιστευτείτε την εμπειρία μας για μια
            ασφαλή και αξέχαστη ημέρα.
          </p>
          <p className="font-semibold">
            Δείτε τα πακέτα μας και κλείστε τώρα για την καλύτερη οικογενειακή
            εμπειρία!
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="mb-8">
      <h1
        className={`
          mb-6 text-3xl font-bold text-[#3E5A35]
          md:text-4xl
        `}
      >
        A Complete Family Guide to the Acheron River
      </h1>

      <div className="mb-8">
        <OptimizedImage
          src="/images/Rafting_Group_Blue_Adventure_River.jpg"
          alt="Family rafting on Acheron River"
          width={800}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-6">
          The Acheron River in Glyki, Thesprotia is one of Greece's best
          destinations for family adventures. This guide will help you plan the
          perfect family trip to this mythical river.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Why Acheron is Perfect for Families
        </h2>

        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3 text-green-600 font-bold">✓</span>
              <span>
                <strong>Safe activities:</strong> All activities are designed
                with children in mind
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600 font-bold">✓</span>
              <span>
                <strong>Gentle currents:</strong> Rafting is suitable for
                beginners
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600 font-bold">✓</span>
              <span>
                <strong>Trained horses:</strong> Calm and child-friendly
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600 font-bold">✓</span>
              <span>
                <strong>Expert guides:</strong> Specialized in family excursions
              </span>
            </li>
          </ul>
        </div>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Best Activities for Kids
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-semibold">1. Family Rafting</h3>
        <p>
          Rafting on Acheron is perfect for children 6 years and older. The
          gentle currents and 30-minute duration make it ideal for young
          adventurers. All children wear life jackets and safety helmets.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold">
          2. Beginner Horse Riding
        </h3>
        <p>
          Our trained horses are perfect for children trying horse riding for
          the first time. Rides last 10-15 minutes and are always accompanied by
          an experienced guide.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold">
          3. Nature Exploration
        </h3>
        <p>
          Hiking to the Acheron springs is easy and suitable for the whole
          family. Children will be excited by the crystal-clear waters and
          unique nature of the area.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Tips for Parents
        </h2>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h4 className="font-semibold mb-3">What to bring:</h4>
          <ul className="space-y-2">
            <li>• Sunscreen and hats</li>
            <li>• Spare clothes</li>
            <li>• Water-friendly shoes</li>
            <li>• Snacks and water</li>
            <li>• Camera</li>
          </ul>
        </div>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Which Packages to Choose
        </h2>

        <p>
          For families with children aged 6-12, we recommend{' '}
          <strong>Package 1</strong>
          which combines rafting, horse riding, and hiking. It's the most
          popular choice for families and offers the best value.
        </p>

        <p>
          For families with older children (8+ years) who want more adventure,
          <strong>Package 2</strong> with kayaking is ideal.
        </p>

        <div className="mt-8 p-6 bg-amber-50 rounded-lg">
          <h3 className="font-bold text-lg mb-3">Book Your Family Adventure</h3>
          <p className="mb-4">
            Pony Club has been offering the best family activities on Acheron
            River since 1999. Trust our experience for a safe and unforgettable
            day.
          </p>
          <p className="font-semibold">
            Check out our packages and book now for the ultimate family
            experience!
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ActivityPageLayout
      title="Family Guide"
      subtitle=""
      descriptionTitle=""
      descriptionContent={blogContent}
      detailsTitle=""
      detailsContent={<></>}
      pricingTitle=""
      pricingContent={<></>}
      showBookingButton={false}
      fullWidthContent={true}
    />
  );
};

export default FamilyGuideAcheronPage;
