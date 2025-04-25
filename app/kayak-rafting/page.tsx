"use client"

import ActivityPageLayout from "@/components/ActivityPageLayout";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

export default function KayakRaftingPage() {
  const { t, language } = useLanguage();

  // Kayaking Section - English
  const kayakingSection_EN = (
    <div className="space-y-4">
      <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden shadow-md mb-4">
        <Image src="/images/kayaking.jpg" alt="Kayaking on Acheron River" fill className="object-cover" />
      </div>
      <h2 className="text-2xl font-bold text-[#6b8362]">Kayak</h2>
      <p className="text-base text-gray-700">
        If you are looking for more adrenaline, then this one is for you! We have inflatable single and double kayaks to choose from. This time you will definitely get wet so leave all your valuable items in your car or with us! The trip route is the same as with Rafting.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div>
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">What's Included</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Kayak and paddle</li>
            <li>Life vest</li>
            <li>Basic instruction</li>
            <li>Guided tour</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">What to Bring</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Swimwear</li>
            <li>Quick-dry clothing</li>
            <li>Water shoes</li>
            <li>Sunscreen and hat</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <div className="bg-[#6b8362]/10 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold text-[#6b8362] mb-2">PROGRAM 2</h3>
          <ul className="space-y-1 mb-4">
            <li>Kayak: 30 minutes</li>
            <li>Riding: 10-15 minutes</li>
            <li>Hiking canyon crossing</li>
          </ul>
          <p className="text-2xl font-bold">25 € per person</p>
        </div>
      </div>
    </div>
  );

  // Kayaking Section - Greek
  const kayakingSection_EL = (
    <div className="space-y-4">
      <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden shadow-md mb-4">
        <Image src="/images/kayaking.jpg" alt="Καγιάκ στον ποταμό Αχέροντα" fill className="object-cover" />
      </div>
      <h2 className="text-2xl font-bold text-[#6b8362]">ΚΑΓΙΑΚ</h2>
      <p className="text-base text-gray-700">
        Αν ψάχνετε για περισσότερη αδρεναλίνη, τότε αυτό είναι για εσάς!<br/><br/>
        Διαθέτουμε φουσκωτά μονόκλινα και δίκλινα καγιάκ για να διαλέξετε. Αυτή τη φορά σίγουρα θα βραχείτε, γι' αυτό αφήστε όλα τα πολύτιμα αντικείμενά σας στο αυτοκίνητό σας ή σε εμάς! Η διαδρομή είναι η ίδια όπως και με το Rafting.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div>
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">Τι Περιλαμβάνεται</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Καγιάκ και κουπί</li>
            <li>Σωσίβιο</li>
            <li>Βασική εκπαίδευση</li>
            <li>Καθοδηγούμενη περιήγηση</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">Τι να Φέρετε</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Μαγιό</li>
            <li>Ρούχα που στεγνώνουν γρήγορα</li>
            <li>Παπούτσια νερού</li>
            <li>Αντηλιακό και καπέλο</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <div className="bg-[#6b8362]/10 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold text-[#6b8362] mb-2">ΠΡΟΓΡΑΜΜΑ 2</h3>
          <ul className="space-y-1 mb-4">
            <li>Κανό: 30 λεπτά</li>
            <li>Ιππασία: 10-15 λεπτά</li>
            <li>Πεζοπορία διάσχιση φαραγγιού</li>
          </ul>
          <p className="text-2xl font-bold">25 € το άτομο</p>
        </div>
      </div>
    </div>
  );

  // Rafting Section - English
  const raftingSection_EN = (
    <div className="space-y-4 mt-10">
      <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden shadow-md mb-4">
        <Image src="/images/hero-image.jpeg" alt="Rafting on Acheron River" fill className="object-cover" />
      </div>
      <h2 className="text-2xl font-bold text-[#6b8362]">Rafting</h2>
      <p className="text-base text-gray-700">
        In Ancient Greece, Charon – Hades' ferry man – carried the souls to Hell across the Acheron River. Now it's your turn to follow the steps of the ancient heroes, such as Hercules, Orpheus and Dionysus. The trip takes about 30-40 minutes, depending on how fast you can row the boat. Also beware of the notorious pirates that are known of sailing this river. Hoist the flag and prepare to battle – water battle!<br/><br/>
        Rafting is a great way to experience the river with your friends and family. The river is very easy and excellent for children and beginners!<br/><br/>
        You will have a qualified rafting instructor with you during the whole trip. You can also take your camera with you.<br/>
        We will bring you back to the starting point with Pony Club's minibus.<br/>
        Pony Club will provide helmets and life jackets.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div>
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">What's Included</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional guides</li>
            <li>Safety equipment</li>
            <li>Transportation</li>
            <li>Refreshments</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">What to Bring</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Comfortable clothes</li>
            <li>Swimwear</li>
            <li>Towel</li>
            <li>Sunscreen</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <div className="bg-[#c27a5f]/10 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">PROGRAM 1</h3>
          <ul className="space-y-1 mb-4">
            <li>Rafting: 30 minutes</li>
            <li>Riding: 10-15 minutes</li>
            <li>Hiking canyon crossing</li>
          </ul>
          <p className="text-2xl font-bold">20 € adults</p>
          <p className="text-sm text-gray-600 mt-2">10 € children under 12 years old</p>
        </div>
      </div>
    </div>
  );

  // Rafting Section - Greek
  const raftingSection_EL = (
    <div className="space-y-4 mt-10">
      <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden shadow-md mb-4">
        <Image src="/images/hero-image.jpeg" alt="Ράφτινγκ στον ποταμό Αχέροντα" fill className="object-cover" />
      </div>
      <h2 className="text-2xl font-bold text-[#6b8362]">RAFTING</h2>
      <p className="text-base text-gray-700">
        Στην Αρχαία Ελλάδα, ο Χάροντας, ο άνθρωπος του Άδη, μετέφερε τις ψυχές στην Κόλαση μέσω του ποταμού Αχέροντα. Τώρα είναι η σειρά σας να ακολουθήσετε τα βήματα των αρχαίων ηρώων, όπως ο Ηρακλής, ο Ορφέας και ο Διόνυσος. Το ταξίδι διαρκεί περίπου 30-40 λεπτά, ανάλογα με το πόσο γρήγορα μπορείτε να κωπηλατήσετε τη βάρκα. Προσέξτε επίσης τους διαβόητους πειρατές που είναι γνωστό ότι πλέουν σε αυτό το ποτάμι. Σηκώστε τη σημαία και ετοιμαστείτε για μάχη – μάχη στο νερό!<br/><br/>
        Το ράφτινγκ είναι ένας πολύ καλός τρόπος για να ζήσετε την εμπειρία του ποταμού με τους φίλους και την οικογένειά σας. Το ποτάμι είναι πολύ εύκολο και εξαιρετικό για παιδιά και αρχάριους!<br/><br/>
        Θα έχετε μαζί σας έναν εξειδικευμένο εκπαιδευτή ράφτινγκ καθ' όλη τη διάρκεια του ταξιδιού. Μπορείτε επίσης να πάρετε μαζί σας τη φωτογραφική σας μηχανή.<br/>
        Εσείς και η ομάδα σας θα επιστρέψετε στο σημείο εκκίνησης με το μικρό λεωφορείο της Pony Club.<br/>
        Η Pony Club θα σας παρέχει κράνη και σωσίβια.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div>
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">Τι Περιλαμβάνεται</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Επαγγελματίες οδηγοί</li>
            <li>Εξοπλισμός ασφαλείας</li>
            <li>Μεταφορά</li>
            <li>Αναψυκτικά</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">Τι να Φέρετε</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Άνετα ρούχα</li>
            <li>Μαγιό</li>
            <li>Πετσέτα</li>
            <li>Αντηλιακό</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <div className="bg-[#c27a5f]/10 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold text-[#c27a5f] mb-2">ΠΡΟΓΡΑΜΜΑ 1</h3>
          <ul className="space-y-1 mb-4">
            <li>Ράφτινγκ: 30 λεπτά</li>
            <li>Ιππασία: 10-15 λεπτά</li>
            <li>Πεζοπορία διάσχιση φαραγγιού</li>
          </ul>
          <p className="text-2xl font-bold">20 € οι μεγάλοι</p>
          <p className="text-sm text-gray-600 mt-2">10 € τα παιδιά κάτω τον 12 ετω</p>
        </div>
      </div>
    </div>
  );

  // Select content based on current language
  const kayakingSection = language === 'el' ? kayakingSection_EL : kayakingSection_EN;
  const raftingSection = language === 'el' ? raftingSection_EL : raftingSection_EN;
  const pageTitle = language === 'el' ? "Καγιάκ & Ράφτινγκ" : "Kayak & Rafting";
  const pageSubtitle = language === 'el' ? "στον ποταμό Αχέροντα" : "in Acheron River";
  const sectionTitle = language === 'el' ? "Καγιάκ & Ράφτινγκ Περιπέτειες" : "Kayak & Rafting Adventures";

  return (
    <ActivityPageLayout
      title={pageTitle}
      subtitle={pageSubtitle}
      heroImageSrc="/images/hero-image.jpeg"
      heroImageAlt={language === 'el' ? "Καγιάκ και Ράφτινγκ στον ποταμό Αχέροντα" : "Kayaking and Rafting in Acheron River"}
      descriptionTitle={sectionTitle}
      descriptionContent={(
        <>
          {kayakingSection}
          {raftingSection}
        </>
      )}
      detailsTitle={null}
      detailsContent={null}
      pricingTitle={null}
      pricingContent={null}
      showBookingButton={false}
    />
  );
} 