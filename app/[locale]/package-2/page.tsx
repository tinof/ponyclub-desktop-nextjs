import type { Metadata } from 'next';

import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'el'
      ? 'Πακέτο 2: Kayak & Ιππασία Αχέροντας | Νέα Εμπειρία Περιπέτειας'
      : 'Package 2: Kayak & Horse Riding Adventure | New Adventure Experience';
  const description =
    locale === 'el'
      ? 'Νέα εμπειρία περιπέτειας! Συνδυάζει kayak, ιππασία και πεζοπορία στον Αχέροντα. Ιδανικό για όσους θέλουν κάτι διαφορετικό. Κλείστε τώρα!'
      : 'New adventure experience! Combines kayaking, horse riding and hiking at Acheron River. Perfect for those wanting something different. Book now!';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/package-2`,
    },
  };
}

const Package2Page = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === 'el';
  const bokunExperienceId = '1020569'; // Package 2 experience ID

  const seoContent = isGreek ? (
    <div className="mb-8">
      <h1
        className={`
          mb-6 text-3xl font-bold text-[#3E5A35]
          md:text-4xl
        `}
      >
        Πακέτο 2: Kayak & Ιππασία Περιπέτεια
      </h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-4">
          Ανακαλύψτε μια νέα εμπειρία περιπέτειας στον Αχέροντα! Το Πακέτο 2
          συνδυάζει kayak, ιππασία και πεζοπορία για όσους θέλουν κάτι
          διαφορετικό και πιο περιπετειώδες.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Τι Περιλαμβάνει το Πακέτο 2
        </h2>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Kayak:</strong> 30 λεπτά εξερεύνησης με kayak στον
                Αχέροντα
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Ιππασία:</strong> 10-15 λεπτά βόλτα με εκπαιδευμένα
                άλογα
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Πεζοπορία:</strong> Διάσχιση φαραγγιού με οδηγό
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Εξοπλισμός ασφαλείας:</strong> Σωσίβια, κουπιά, οδηγίες
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Έμπειρος οδηγός:</strong> Καθ' όλη τη διάρκεια της
                εμπειρίας
              </span>
            </li>
          </ul>
        </div>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Τιμές Πακέτου 2
        </h2>
        <div className="bg-amber-50 p-6 rounded-lg mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800 mb-2">€25</p>
            <p className="text-lg text-gray-600">ανά άτομο</p>
            <p className="text-sm text-gray-500 mt-2">
              Κατάλληλο για άτομα 8 ετών και άνω
            </p>
          </div>
        </div>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Γιατί να Επιλέξετε το Πακέτο 2;
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Νέα Εμπειρία</h3>
            <p className="text-gray-700">
              Το kayak προσφέρει μια διαφορετική προοπτική του Αχέροντα, πιο
              ήρεμη και περιπετειώδη.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Περισσότερη Περιπέτεια
            </h3>
            <p className="text-gray-700">
              Το kayak απαιτεί περισσότερη συμμετοχή και προσφέρει μεγαλύτερη
              αίσθηση περιπέτειας.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Μοναδική Εμπειρία
            </h3>
            <p className="text-gray-700">
              Συνδυάζει τρεις δραστηριότητες με έμφαση στην εξερεύνηση και την
              αυτονομία.
            </p>
          </div>
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
        Package 2: Kayak & Horse Riding Adventure
      </h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-4">
          Discover a new adventure experience at Acheron River! Package 2
          combines kayaking, horse riding, and hiking for those who want
          something different and more adventurous.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          What's Included in Package 2
        </h2>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Kayaking:</strong> 30 minutes of Acheron River
                exploration
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Horse Riding:</strong> 10-15 minute ride with trained
                horses
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Hiking:</strong> Guided canyon crossing adventure
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Safety Equipment:</strong> Life jackets, paddles,
                instructions
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 font-bold">✓</span>
              <span>
                <strong>Expert Guide:</strong> Throughout the entire experience
              </span>
            </li>
          </ul>
        </div>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Package 2 Prices
        </h2>
        <div className="bg-amber-50 p-6 rounded-lg mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800 mb-2">€25</p>
            <p className="text-lg text-gray-600">per person</p>
            <p className="text-sm text-gray-500 mt-2">
              Suitable for ages 8 and up
            </p>
          </div>
        </div>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
          Why Choose Package 2?
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">New Experience</h3>
            <p className="text-gray-700">
              Kayaking offers a different perspective of Acheron, more peaceful
              yet adventurous.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">More Adventure</h3>
            <p className="text-gray-700">
              Kayaking requires more participation and offers a greater sense of
              adventure.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Unique Experience
            </h3>
            <p className="text-gray-700">
              Combines three activities with emphasis on exploration and
              autonomy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ActivityPageLayout
      title="Package 2"
      subtitle=""
      descriptionTitle=""
      descriptionContent={
        <>
          {seoContent}
          <DynamicBokunWidget experienceId={bokunExperienceId} />
        </>
      }
      detailsTitle=""
      detailsContent={<></>}
      pricingTitle=""
      pricingContent={<></>}
      showBookingButton={false}
      fullWidthContent={true}
    />
  );
};

export default Package2Page;
