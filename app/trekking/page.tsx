"use client"

import ActivityPageLayout from "@/components/ActivityPageLayout"; // Import the layout
import { useLanguage } from "@/contexts/language-context"; // Keep useLanguage
import { useState } from "react"; // Import useState for modal state
import { trekkingGalleryImages } from "@/lib/gallery-data"; // Import trekking gallery images
import DynamicGallery from "@/components/DynamicGallery";
import { OptimizedImage } from "@/components/ui/OptimizedImage"; // Import OptimizedImage

export default function TrekkingPage() {
  const { t, language } = useLanguage(); // Get translations object and current language
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

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
            <strong>Κυκλική Διαδρομή Σκάλα Τζαβελαίνας (μέσω της Σκάλας Τζαβελαίνας)</strong>
            <ul className="list-none pl-0">
              <li><strong>Διάρκεια:</strong> Περίπου 2 ώρες</li>
              <li><strong>Δυσκολία:</strong> Εύκολη έως Μέτρια</li>
              <li><strong>Εποχή:</strong> Καλύτερα από Μάιο έως αρχές Οκτωβρίου</li>
              <li>
                <strong>Περιγραφή:</strong> Δημοφιλής διαδρομή που ακολουθεί το ιστορικό μονοπάτι της «Σκάλας Τζαβελαίνας», μια πέτρινη σκάλα λαξευμένη στο βράχο, με εντυπωσιακή θέα στο φαράγγι. Η πραγματική περιπέτεια συχνά βρίσκεται στην επιστροφή: αντί να ακολουθήσετε το ίδιο μονοπάτι, πολλοί επιλέγουν να επιστρέψουν μέσα από το ποτάμι, περπατώντας στα δροσερά νερά κάτω από τους επιβλητικούς βράχους. Μια αξέχαστη καλοκαιρινή εμπειρία! (Το τμήμα μέσα στο ποτάμι εξαρτάται από τη στάθμη των νερών).
              </li>
            </ul>
          </li>
          <li>
            <strong>Κατάβαση από το Σούλι</strong>
            <ul className="list-none pl-0">
              <li><strong>Διάρκεια:</strong> 3-4 ώρες</li>
              <li><strong>Δυσκολία:</strong> Μέτρια</li>
              <li><strong>Εποχή:</strong> Δυνατή όλο τον χρόνο, αλλά οι συνθήκες διαφέρουν (ρωτήστε τοπικά)</li>
              <li>
                <strong>Περιγραφή:</strong> Ξεκινώντας από την ιστορική περιοχή του Σουλίου, η διαδρομή προσφέρει πανοραμική θέα στα βουνά πριν κατηφορίσει προς τη γέφυρα Ντάλα και καταλήξει στο ποτάμι στη Γλυκή. Συχνά προτιμάται από ορειβατικούς συλλόγους και λάτρεις της φύσης, προσφέροντας βαθύτερη επαφή με την άγρια ομορφιά και το τοπίο της περιοχής.
              </li>
            </ul>
          </li>
          <li>
            <strong>Περιπέτεια στα Μύλους του Σουλίου</strong>
            <ul className="list-none pl-0">
              <li><strong>Διάρκεια:</strong> 3-4 ώρες</li>
              <li><strong>Δυσκολία:</strong> Μέτρια έως Δύσκολη</li>
              <li><strong>Εποχή:</strong> Συνιστάται μόνο από Μάιο έως αρχές Οκτωβρίου</li>
              <li>
                <strong>Περιγραφή:</strong> Συχνά χαρακτηρίζεται από ειδικούς ως μία από τις ομορφότερες και πιο συναρπαστικές διαδρομές στην Ελλάδα. Η διαδρομή διασχίζει το εσωτερικό του φαραγγιού του Αχέροντα, με μεγάλα τμήματα μέσα στο ποτάμι, ανάμεσα σε εντυπωσιακούς κάθετους βράχους. Μια μοναδική εμπειρία, εφικτή μόνο από τα τέλη της άνοιξης έως τις αρχές του φθινοπώρου, όταν η στάθμη και η θερμοκρασία του νερού το επιτρέπουν.
              </li>
            </ul>
          </li>
        </ol>
        <p>
          Όποια διαδρομή κι αν επιλέξετε, ο μυθικός Αχέροντας υπόσχεται μια μοναδική και αξέχαστη εμπειρία πεζοπορίας σε τοπία βγαλμένα από θρύλους.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Trekking the Legendary Acheron River</h2>
        <p>
          The mythical springs of the Acheron River, near the village of Glyki, invite exploration all year round. Steeped in ancient legend as one of the rivers leading to the underworld, the Acheron today offers breathtaking natural beauty rather than a passage to Hades! Access is straightforward: you can park your vehicle conveniently right by the entrance to the springs area in Glyki. Best of all, both parking and entry are completely free of charge, welcoming you to discover its wonders.
        </p>
        <p>
          Ready to explore? Here are some of the best trekking routes to immerse yourself in the magic of Acheron:
        </p>
        <ol className="list-decimal list-inside space-y-4 pl-4">
          <li>
            <strong>Glyki Springs Stroll</strong>
            <ul className="list-none pl-0">
              <li><strong>Duration:</strong> 15 min – 1 hour</li>
              <li><strong>Difficulty:</strong> Easy</li>
              <li><strong>Season:</strong> Suitable all year round</li>
              <li>
                <strong>Description:</strong> Perfect for families or those seeking a gentle introduction to the Acheron's beauty. This easy path meanders alongside the river beneath the cool shade of lush plane trees. Witness the incredible springs where the crystal-clear, yet refreshingly cold, water bubbles up directly from the earth. It's an ideal spot to relax and even dare to dip your toes into the legendary stream!
              </li>
            </ul>
          </li>
          <li>
            <strong>Skala Tzavelainas Circuit (Via the Tzavelena Staircase)</strong>
            <ul className="list-none pl-0">
              <li><strong>Duration:</strong> Approx. 2 hours</li>
              <li><strong>Difficulty:</strong> Easy to Moderate</li>
              <li><strong>Season:</strong> Best from May to early October</li>
              <li>
                <strong>Description:</strong> This popular route takes you along a path featuring the historic "Skala Tzavelainas," a stone staircase etched into the cliffside, offering dramatic views down into the gorge. The real adventure often lies in the return: instead of just retracing your steps on the path, many choose to navigate back through the river itself, wading in the cool, invigorating waters beneath the towering gorge walls. An unforgettable summer experience! (River section dependent on water levels).
              </li>
            </ul>
          </li>
          <li>
            <strong>Souli Descent Trek</strong>
            <ul className="list-none pl-0">
              <li><strong>Duration:</strong> 3-4 hours</li>
              <li><strong>Difficulty:</strong> Moderate</li>
              <li><strong>Season:</strong> Possible year-round, but conditions vary (check locally)</li>
              <li>
                <strong>Description:</strong> Starting higher up in the historically significant Souli region, this trek rewards hikers with expansive mountain vistas before descending via trails towards the Dala bridge and finally reaching the river level at Glyki. Often preferred by mountaineering clubs and dedicated nature lovers, this route offers a deeper immersion into the area's wild beauty and rugged landscape.
              </li>
            </ul>
          </li>
          <li>
            <strong>Mills of Souli River Adventure</strong>
            <ul className="list-none pl-0">
              <li><strong>Duration:</strong> 3-4 hours</li>
              <li><strong>Difficulty:</strong> Moderate to Difficult</li>
              <li><strong>Season:</strong> Recommended from May to early October only</li>
              <li>
                <strong>Description:</strong> Frequently hailed by hiking experts as one of the most beautiful and exhilarating routes in Greece. This immersive trek takes you deep into the heart of the Acheron gorge itself. Be prepared to walk directly in the river for significant portions of the journey, navigating the cool, flowing waters between stunning, sheer cliffs. It's an intimate encounter with the wild spirit of the Acheron, only feasible from late spring to early autumn when water levels and temperatures are suitable for river trekking.
              </li>
            </ul>
          </li>
        </ol>
        <p>
          Whichever path you choose, the mythical Acheron River promises a unique and memorable hiking adventure amidst legendary landscapes.
        </p>
      </div>
    );

  const detailsContent = (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-[#c27a5f] mb-3 relative inline-block">
          What's Included
          <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c27a5f]/50 to-transparent"></div>
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Professional guide</li>
          <li>Trail maps</li>
          <li>Walking sticks (if needed)</li>
          <li>Light refreshments</li>
        </ul>
        <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#c27a5f]/20 blur-sm"></div>
      </div>
      <div className="relative bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-[#c27a5f] mb-3 relative inline-block">
          What to Bring
          <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c27a5f]/50 to-transparent"></div>
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Comfortable hiking shoes</li>
          <li>Weather-appropriate clothing</li>
          <li>Water bottle</li>
          <li>Camera</li>
        </ul>
        <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#c27a5f]/20 blur-sm"></div>
      </div>
    </div>
  );

  // Replace pricing content with map image
  const mapContent = (
    <div className="mt-4 space-y-8">
      <div>
        <div 
          className="relative w-full h-[400px] cursor-pointer rounded-xl overflow-hidden shadow-xl border border-amber-100/70 hover:shadow-2xl transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <OptimizedImage 
            src="/images/ponyClub_map.jpg" 
            alt="Trekking Routes Map" 
            fill 
            className="object-contain"
            // Consider adding sizes if appropriate, though object-contain with fill might be fine
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
        </div>
        <p className="text-center text-sm mt-3 text-gray-600 italic">Click on map to enlarge</p>
      </div>
      
      {/* Trekking Gallery */}
      <DynamicGallery 
        images={trekkingGalleryImages} 
        title="Trekking Photo Gallery" 
        ariaLabel="Trekking and hiking photo gallery - Acheron River canyon" 
      />
      
      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-full max-w-7xl h-[90vh] rounded-xl overflow-hidden shadow-2xl">
            <OptimizedImage 
              src="/images/ponyClub_map.jpg" 
              alt="Trekking Routes Map" 
              fill 
              className="object-contain"
              priority // Keep priority for LCP candidate in modal
            />
            <button 
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-black shadow-lg border border-white/30 hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              aria-label="Close map"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ActivityPageLayout
      title="Trekking" // TODO: Replace with t.trekking.title or similar once added
      subtitle="through Nature" // TODO: Replace with t.trekking.subtitle or similar once added
      heroImageSrc="/images/round1.jpg" // Specific image for trekking
      heroImageAlt="Trekking near Acheron River" // TODO: Replace with t.trekking.heroAlt or similar once added
      // Using hardcoded titles for now as keys are missing in translations
      descriptionTitle="Trekking Adventure"
      descriptionContent={descriptionContent}
      detailsTitle="Details & Requirements"
      detailsContent={detailsContent}
      pricingTitle="Trekking Routes Map & Gallery"
      pricingContent={mapContent}
    />
  );
}
