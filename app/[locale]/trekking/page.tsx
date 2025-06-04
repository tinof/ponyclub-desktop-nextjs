import ActivityPageLayout from "@/components/ActivityPageLayout";
import { trekkingGalleryImages } from "@/lib/gallery-data";
import DynamicGallery from "@/components/DynamicGallery";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const isGreek = locale === 'el';
  
  return {
    title: isGreek 
      ? "Πεζοπορία Αχέροντας - Pony Club | Μονοπάτια & Διαδρομές Γλυκή Θεσπρωτίας"
      : "Acheron Trekking - Pony Club | Hiking Trails & Routes Glyki Thesprotia",
    description: isGreek
      ? "Ανακαλύψτε τα μυθικά μονοπάτια του Αχέροντα με οδηγημένες πεζοπορίες. Εξερευνήστε τις πηγές, τα φαράγγια και τη φύση της Θεσπρωτίας με ασφάλεια."
      : "Discover the mythical trails of Acheron River with guided trekking tours. Explore springs, gorges and nature of Thesprotia safely with experienced guides.",
    keywords: isGreek
      ? "πεζοπορία Αχέροντας, trekking Γλυκή, μονοπάτια Θεσπρωτία, πεζοπορία Ήπειρος, φύση Αχέροντας, οδηγημένες πεζοπορίες"
      : "Acheron trekking, hiking Glyki, trails Thesprotia, trekking Epirus, Acheron nature, guided hiking tours Greece",
  };
}

const TrekkingPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const language = locale; // Use locale directly

  // Define content sections using JSX with the updated content
  const descriptionContent =
    language === "el" ? (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Πεζοπορία στον Θρυλικό Αχέροντα</h2>
        <p>
          Οι μυθικές πηγές του ποταμού Αχέροντα, κοντά στο χωριό Γλυκή, προσκαλούν για εξερεύνηση όλο τον χρόνο. Βαθιά ριζωμένος στην αρχαιότητα ως ένας από τους ποταμούς που οδηγούσαν στον κάτω κόσμο, ο Αχέροντας σήμερα προσφέρει απαράμιλλη φυσική ομορφιά αντί για πέρασμα στον Άδη! Η πρόσβαση είναι εύκολη: μπορείτε να σταθμεύσετε το όχημά σας ακριβώς δίπλα στην είσοδο της περιοχής των πηγών στη Γλυκή. Το καλύτερο; Η στάθμευση και η είσοδος είναι εντελώς δωρεάν, προσκαλώντας σας να ανακαλύψετε τα θαύματά του.
        </p>
        <p>
          Έτοιμοι για εξερεύνηση; Δείτε μερικές από τις καλύτερες διαδρομές πεζοπορίας για να ζήσετε τη μαγεία του Αχέροντα:
        </p>
        <ol className="list-decimal list-inside space-y-4 pl-4">
          <li>
            <strong>Βόλτα στις Πηγές της Γλυκής</strong>
            <ul className="list-none pl-0">
              <li><strong>Διάρκεια:</strong> 15 λεπτά – 1 ώρα</li>
              <li><strong>Δυσκολία:</strong> Εύκολη</li>
              <li><strong>Εποχή:</strong> Κατάλληλη όλο τον χρόνο</li>
              <li>
                <strong>Περιγραφή:</strong> Ιδανική για οικογένειες ή όσους επιθυμούν μια ήπια γνωριμία με την ομορφιά του Αχέροντα. Το μονοπάτι ακολουθεί το ποτάμι κάτω από τη δροσερή σκιά των πλατανιών. Θαυμάστε τις εντυπωσιακές πηγές όπου το κρυστάλλινο, αλλά δροσερό νερό αναβλύζει απευθείας από τη γη. Ιδανικό σημείο για χαλάρωση και – γιατί όχι; – να βουτήξετε τα πόδια σας στα θρυλικά νερά!
              </li>
            </ul>
          </li>
          <li>
            <strong>Διαδρομή προς το Φαράγγι του Αχέροντα</strong>
            <ul className="list-none pl-0">
              <li><strong>Διάρκεια:</strong> 2-3 ώρες</li>
              <li><strong>Δυσκολία:</strong> Μέτρια</li>
              <li><strong>Εποχή:</strong> Άνοιξη έως Φθινόπωρο</li>
              <li>
                <strong>Περιγραφή:</strong> Μια πιο περιπετειώδης διαδρομή που σας οδηγεί βαθύτερα στο φαράγγι του Αχέροντα. Περπατήστε κατά μήκος του ποταμού, διασχίστε μικρές γέφυρες και ανακαλύψτε κρυμμένες λίμνες με κρυστάλλινα νερά. Η διαδρομή προσφέρει εκπληκτικές θέες του φαραγγιού και ευκαιρίες για φωτογραφίες που θα σας μείνουν αξέχαστες.
              </li>
            </ul>
          </li>
          <li>
            <strong>Εξερεύνηση των Αρχαίων Μονοπατιών</strong>
            <ul className="list-none pl-0">
              <li><strong>Διάρκεια:</strong> 4-5 ώρες</li>
              <li><strong>Δυσκολία:</strong> Δύσκολη</li>
              <li><strong>Εποχή:</strong> Άνοιξη και Φθινόπωρο</li>
              <li>
                <strong>Περιγραφή:</strong> Για τους πιο έμπειρους πεζοπόρους, αυτή η διαδρομή ακολουθεί τα αρχαία μονοπάτια που χρησιμοποιούσαν οι αρχαίοι Έλληνες. Θα περάσετε από ερείπια αρχαίων ναών, θα διασχίσετε πυκνά δάση και θα φτάσετε σε απομονωμένες κορυφές με πανοραμική θέα της περιοχής. Μια πραγματικά μυστική εμπειρία που συνδυάζει ιστορία, φύση και περιπέτεια.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    ) : (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Trekking the Legendary Acheron</h2>
        <p>
          The mythical springs of the Acheron River, near the village of Glyki, invite exploration year-round. Deeply rooted in antiquity as one of the rivers leading to the underworld, Acheron today offers unparalleled natural beauty instead of passage to Hades! Access is easy: you can park your vehicle right next to the entrance of the springs area in Glyki. The best part? Parking and entry are completely free, inviting you to discover its wonders.
        </p>
        <p>
          Ready for exploration? Check out some of the best trekking routes to experience the magic of Acheron:
        </p>
        <ol className="list-decimal list-inside space-y-4 pl-4">
          <li>
            <strong>Glyki Springs Walk</strong>
            <ul className="list-none pl-0">
              <li><strong>Duration:</strong> 15 minutes – 1 hour</li>
              <li><strong>Difficulty:</strong> Easy</li>
              <li><strong>Season:</strong> Suitable year-round</li>
              <li>
                <strong>Description:</strong> Perfect for families or those wanting a gentle introduction to Acheron's beauty. The path follows the river under the cool shade of plane trees. Marvel at the impressive springs where crystal-clear, yet cool water bubbles directly from the earth. An ideal spot for relaxation and – why not? – dipping your feet in the legendary waters!
              </li>
            </ul>
          </li>
          <li>
            <strong>Acheron Gorge Trail</strong>
            <ul className="list-none pl-0">
              <li><strong>Duration:</strong> 2-3 hours</li>
              <li><strong>Difficulty:</strong> Moderate</li>
              <li><strong>Season:</strong> Spring to Autumn</li>
              <li>
                <strong>Description:</strong> A more adventurous route that takes you deeper into the Acheron gorge. Walk along the river, cross small bridges, and discover hidden pools with crystal-clear waters. The trail offers stunning gorge views and photo opportunities that will remain unforgettable.
              </li>
            </ul>
          </li>
          <li>
            <strong>Ancient Paths Exploration</strong>
            <ul className="list-none pl-0">
              <li><strong>Duration:</strong> 4-5 hours</li>
              <li><strong>Difficulty:</strong> Challenging</li>
              <li><strong>Season:</strong> Spring and Autumn</li>
              <li>
                <strong>Description:</strong> For more experienced hikers, this trail follows the ancient paths used by ancient Greeks. You'll pass ruins of ancient temples, traverse dense forests, and reach isolated peaks with panoramic views of the region. A truly mystical experience combining history, nature, and adventure.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    );

  const detailsContent =
    language === "el" ? (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-3">Τι να Περιμένετε</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span><strong>Οδηγημένες Πεζοπορίες:</strong> Έμπειροι τοπικοί οδηγοί που γνωρίζουν κάθε μονοπάτι και ιστορία</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span><strong>Εξοπλισμός Ασφαλείας:</strong> Παρέχεται όλος ο απαραίτητος εξοπλισμός ασφαλείας</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span><strong>Μικρές Ομάδες:</strong> Μέγιστο 8 άτομα ανά ομάδα για προσωπική εμπειρία</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span><strong>Φωτογραφίες:</strong> Επαγγελματικές φωτογραφίες της εμπειρίας σας</span>
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">Τι να Φέρετε</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Άνετα παπούτσια πεζοπορίας</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Καπέλο και αντηλιακό</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Νερό και ελαφρύ σνακ</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Φωτογραφική μηχανή</span>
          </li>
        </ul>
      </div>
    ) : (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-3">What to Expect</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span><strong>Guided Treks:</strong> Experienced local guides who know every trail and story</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span><strong>Safety Equipment:</strong> All necessary safety equipment provided</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span><strong>Small Groups:</strong> Maximum 8 people per group for personal experience</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span><strong>Photography:</strong> Professional photos of your experience</span>
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">What to Bring</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Comfortable hiking shoes</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Hat and sunscreen</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Water and light snacks</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Camera</span>
          </li>
        </ul>
      </div>
    );

  const mapContent = (
    <div className="mt-4 space-y-8">
      <div>
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-xl border border-amber-100/70">
          <OptimizedImage 
            src="/images/ponyClub_map.jpg" 
            alt="Trekking Routes Map" 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/5 to-transparent"></div>
        </div>
      </div>
      
      {/* Trekking Gallery */}
      <DynamicGallery 
        images={trekkingGalleryImages} 
        title="Trekking Photo Gallery" 
        ariaLabel="Trekking and hiking photo gallery - Acheron River canyon" 
      />
 
    </div>
  );

  return (
    <ActivityPageLayout
      title="Trekking" // TODO: Replace with t.trekking.title or similar once added
      subtitle="through Nature" // TODO: Replace with t.trekking.subtitle or similar once added
      // Using hardcoded titles for now as keys are missing in translations
      descriptionTitle="Trekking Adventure"
      descriptionContent={descriptionContent}
      detailsTitle="Details & Requirements"
      detailsContent={detailsContent}
      pricingTitle="Trekking Routes Map & Gallery"
      pricingContent={mapContent}
    />  );
};

export default TrekkingPage;
