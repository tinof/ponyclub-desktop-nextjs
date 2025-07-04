/**
 * Centralized Activities Data Store
 *
 * This file contains all activity-related content, pricing, and metadata
 * to enable single-source-of-truth maintenance and easy updates.
 * Used by SEOActivityContent component and generateMetadata functions.
 */

export interface ActivityData {
  title: string;
  subtitle: string;
  price: string;
  childPrice: string;
  duration: string;
  minAge: string;
  maxParticipants: string;
  difficulty: string;
  season: string;
  includes: string[];
  whatToBring: string[];
  highlights: string[];
  description: string;
  shortDescription: string;
  keywords: string;
  bokunId: string;
}

export interface ActivityMetadata {
  title: string;
  description: string;
  keywords: string;
  openGraphTitle: string;
  openGraphDescription: string;
  imageUrl: string;
  imageAlt: string;
}

export const activitiesData: Record<
  string,
  { en: ActivityData; el: ActivityData }
> = {
  rafting: {
    en: {
      title: 'Acheron River Rafting',
      subtitle: 'An unforgettable experience for the whole family',
      price: '€20',
      childPrice: '€15',
      duration: '30 minutes',
      minAge: '6 years',
      maxParticipants: '12 people per group',
      difficulty: 'Easy to moderate',
      season: 'All year round',
      includes: [
        'Professional guide',
        'Safety equipment (life jackets, helmets)',
        '30-minute river descent',
        'Safety briefing',
        'Return transport to starting point',
      ],
      whatToBring: [
        'Comfortable clothes that can get wet',
        'Swimwear',
        'Towel',
        'Sunscreen',
        'Spare clothes',
        'Water bottle',
      ],
      highlights: [
        'Safe for beginners and families',
        'Crystal-clear waters of mythical Acheron',
        'Professional guides with safety training',
        'Beautiful natural scenery',
        'Perfect for photos and memories',
      ],
      description:
        'Experience the ultimate adventure with rafting in the mythical Acheron River! Pony Club offers a safe and thrilling rafting experience in the clear waters of Glyki, Thesprotia.',
      shortDescription:
        'Safe rafting experience in the mythical Acheron River. Perfect for beginners and families.',
      keywords:
        'Acheron River rafting, Glyki rafting, family rafting Greece, safe rafting tours, Thesprotia activities',
      bokunId: '1020611',
    },
    el: {
      title: 'Rafting Αχέροντας',
      subtitle: 'Μια αξέχαστη εμπειρία για όλη την οικογένεια',
      price: '€20',
      childPrice: '€15',
      duration: '30 λεπτά',
      minAge: '6 ετών',
      maxParticipants: '12 άτομα ανά ομάδα',
      difficulty: 'Εύκολο έως μέτριο',
      season: 'Όλο το χρόνο',
      includes: [
        'Επαγγελματίας οδηγός',
        'Εξοπλισμός ασφαλείας (σωσίβια, κράνη)',
        '30λεπτη κατάβαση ποταμού',
        'Ενημέρωση ασφαλείας',
        'Επιστροφή στο σημείο εκκίνησης',
      ],
      whatToBring: [
        'Άνετα ρούχα που μπορούν να βραχούν',
        'Μαγιό',
        'Πετσέτα',
        'Αντηλιακό',
        'Εναλλακτικά ρούχα',
        'Μπουκάλι νερό',
      ],
      highlights: [
        'Ασφαλές για αρχάριους και οικογένειες',
        'Κρυστάλλινα νερά του μυθικού Αχέροντα',
        'Επαγγελματίες οδηγοί με εκπαίδευση ασφαλείας',
        'Όμορφο φυσικό τοπίο',
        'Ιδανικό για φωτογραφίες και αναμνήσεις',
      ],
      description:
        'Ζήστε την απόλυτη περιπέτεια με ράφτινγκ στον μυθικό ποταμό Αχέροντα! Το Pony Club προσφέρει μια ασφαλή και συναρπαστική εμπειρία ράφτινγκ στα καθαρά νερά της Γλυκής, Θεσπρωτίας.',
      shortDescription:
        'Ασφαλής εμπειρία ράφτινγκ στον μυθικό ποταμό Αχέροντα. Ιδανικό για αρχάριους και οικογένειες.',
      keywords:
        'rafting Αχέροντας, ράφτινγκ Γλυκή, οικογενειακό rafting, ασφαλές ράφτινγκ, Θεσπρωτία',
      bokunId: '1020611',
    },
  },
  riding: {
    en: {
      title: 'Acheron Horse Riding',
      subtitle: 'An unforgettable experience for the whole family',
      price: '€20',
      childPrice: '€15',
      duration: '45 minutes',
      minAge: '8 years',
      maxParticipants: '8 people per group',
      difficulty: 'Easy',
      season: 'All year round',
      includes: [
        'Professional guide',
        'Safety equipment (helmets)',
        '45-minute horseback ride',
        'Safety briefing',
        'Horse care information',
      ],
      whatToBring: [
        'Comfortable clothes',
        'Closed-toe shoes',
        'Hat and sunscreen',
        'Water bottle',
        'Camera',
      ],
      highlights: [
        'Calm and trained horses for beginners',
        'Beautiful trails with Acheron River views',
        'Professional guides with horse expertise',
        'Weight limit: 100kg for safety',
        'Perfect for nature lovers',
      ],
      description:
        'Experience a magical horse riding adventure at the Acheron springs! Pony Club offers safe and exciting horseback rides in the lush landscape of Glyki, Thesprotia.',
      shortDescription:
        'Safe horse riding experience with calm, trained horses. Perfect for beginners and families.',
      keywords:
        'acheron horse riding, horse riding greece, glyki horse tours, horseback riding, family horse riding',
      bokunId: '1020659',
    },
    el: {
      title: 'Ιππασία Αχέροντας',
      subtitle: 'Μια αξέχαστη εμπειρία για όλη την οικογένεια',
      price: '€20',
      childPrice: '€15',
      duration: '45 λεπτά',
      minAge: '8 ετών',
      maxParticipants: '8 άτομα ανά ομάδα',
      difficulty: 'Εύκολο',
      season: 'Όλο το χρόνο',
      includes: [
        'Επαγγελματίας οδηγός',
        'Εξοπλισμός ασφαλείας (κράνη)',
        '45λεπτη βόλτα με άλογα',
        'Ενημέρωση ασφαλείας',
        'Πληροφορίες φροντίδας αλόγων',
      ],
      whatToBring: [
        'Άνετα ρούχα',
        'Κλειστά παπούτσια',
        'Καπέλο και αντηλιακό',
        'Μπουκάλι νερό',
        'Φωτογραφική μηχανή',
      ],
      highlights: [
        'Ήρεμα και εκπαιδευμένα άλογα για αρχάριους',
        'Όμορφα μονοπάτια με θέα τον Αχέροντα',
        'Επαγγελματίες οδηγοί με εμπειρία σε άλογα',
        'Όριο βάρους: 100kg για ασφάλεια',
        'Ιδανικό για φιλόζωους',
      ],
      description:
        'Ζήστε μια μαγική εμπειρία ιππασίας στις πηγές του Αχέροντα! Το Pony Club προσφέρει ασφαλείς και συναρπαστικές βόλτες με άλογα στο καταπράσινο τοπίο της Γλυκής, Θεσπρωτίας.',
      shortDescription:
        'Ασφαλής εμπειρία ιππασίας με ήρεμα, εκπαιδευμένα άλογα. Ιδανικό για αρχάριους και οικογένειες.',
      keywords:
        'ιππασία αχέροντας, άλογα αχέροντας, ιππασία γλυκή, βόλτα με άλογα, οικογενειακή ιππασία',
      bokunId: '1020659',
    },
  },
  kayaking: {
    en: {
      title: 'Acheron River Kayaking',
      subtitle: 'An unforgettable experience for the whole family',
      price: '€25',
      childPrice: '€20',
      duration: '1 hour',
      minAge: '12 years',
      maxParticipants: '10 people per group',
      difficulty: 'Easy to moderate',
      season: 'April to October',
      includes: [
        'Professional guide',
        'Safety equipment (life jackets, helmets)',
        'Kayak and paddle',
        '1-hour kayaking tour',
        'Technique training',
      ],
      whatToBring: [
        'Comfortable clothes that can get wet',
        'Swimwear',
        'Towel',
        'Sunscreen',
        'Spare clothes',
        'Water bottle',
      ],
      highlights: [
        'Stable kayaks perfect for beginners',
        'Explore Acheron springs at your own pace',
        'Professional technique instruction',
        'Crystal-clear waters',
        'Must know how to swim',
      ],
      description:
        'Explore the mythical Acheron River by kayak! Pony Club offers a safe and exciting kayaking experience in the crystal-clear waters of Glyki, Thesprotia.',
      shortDescription:
        'Safe kayaking experience in crystal-clear waters. Perfect for beginners who can swim.',
      keywords:
        'acheron river kayak, glyki kayaking, family kayaking greece, safe kayak tours, Thesprotia activities',
      bokunId: '1020669',
    },
    el: {
      title: 'Kayak Αχέροντας',
      subtitle: 'Μια αξέχαστη εμπειρία για όλη την οικογένεια',
      price: '€25',
      childPrice: '€20',
      duration: '1 ώρα',
      minAge: '12 ετών',
      maxParticipants: '10 άτομα ανά ομάδα',
      difficulty: 'Εύκολο έως μέτριο',
      season: 'Απρίλιος έως Οκτώβριος',
      includes: [
        'Επαγγελματίας οδηγός',
        'Εξοπλισμός ασφαλείας (σωσίβια, κράνη)',
        'Kayak και κουπί',
        '1ωρη εκδρομή με kayak',
        'Εκπαίδευση τεχνικής',
      ],
      whatToBring: [
        'Άνετα ρούχα που μπορούν να βραχούν',
        'Μαγιό',
        'Πετσέτα',
        'Αντηλιακό',
        'Εναλλακτικά ρούχα',
        'Μπουκάλι νερό',
      ],
      highlights: [
        'Σταθερά kayak ιδανικά για αρχάριους',
        'Εξερευνήστε τις πηγές του Αχέροντα',
        'Επαγγελματική εκπαίδευση τεχνικής',
        'Κρυστάλλινα νερά',
        'Απαραίτητη η γνώση κολύμπι',
      ],
      description:
        'Εξερευνήστε τον μυθικό ποταμό Αχέροντα με kayak! Το Pony Club προσφέρει μια ασφαλή και συναρπαστική εμπειρία kayak στα κρυστάλλινα νερά της Γλυκής, Θεσπρωτίας.',
      shortDescription:
        'Ασφαλής εμπειρία kayak σε κρυστάλλινα νερά. Ιδανικό για αρχάριους που ξέρουν κολύμπι.',
      keywords:
        'kayak αχέροντας, καγιάκ γλυκή, οικογενειακό kayak, ασφαλές καγιάκ, Θεσπρωτία',
      bokunId: '1020669',
    },
  },
  trekking: {
    en: {
      title: 'Acheron Trekking',
      subtitle: 'Explore the mythical nature',
      price: '€10',
      childPrice: '€8',
      duration: '45 minutes',
      minAge: '6 years',
      maxParticipants: '15 people per group',
      difficulty: 'Easy to moderate',
      season: 'All year round',
      includes: [
        'Professional guide',
        'Route map',
        'Nature interpretation',
        'Safety briefing',
      ],
      whatToBring: [
        'Comfortable hiking shoes',
        'Water bottle',
        'Hat and sunscreen',
        'Light backpack',
        'Camera',
      ],
      highlights: [
        'Stunning natural landscape',
        'Learn about local flora and fauna',
        'Family-friendly trails',
        'Historical and mythological information',
      ],
      description:
        'Explore the Acheron on foot! Guided hiking tours for families and beginners in the mythical gorge.',
      shortDescription:
        'Guided hiking tours in the mythical Acheron gorge. Perfect for families and nature lovers.',
      keywords:
        'acheron trekking, glyki hiking, guided trekking greece, family hiking tours, acheron gorge',
      bokunId: '', // No specific Bokun ID for trekking
    },
    el: {
      title: 'Πεζοπορία Αχέροντας',
      subtitle: 'Εξερευνήστε τη μυθική φύση',
      price: '€10',
      childPrice: '€8',
      duration: '45 λεπτά',
      minAge: '6 ετών',
      maxParticipants: '15 άτομα ανά ομάδα',
      difficulty: 'Εύκολο έως μέτριο',
      season: 'Όλο το χρόνο',
      includes: [
        'Επαγγελματίας οδηγός',
        'Χάρτης διαδρομής',
        'Ερμηνεία φύσης',
        'Ενημέρωση ασφαλείας',
      ],
      whatToBring: [
        'Άνετα παπούτσια πεζοπορίας',
        'Μπουκάλι νερό',
        'Καπέλο και αντηλιακό',
        'Ελαφρύ σακίδιο',
        'Φωτογραφική μηχανή',
      ],
      highlights: [
        'Εκπληκτικό φυσικό τοπίο',
        'Μάθετε για την τοπική χλωρίδα και πανίδα',
        'Φιλικά προς την οικογένεια μονοπάτια',
        'Ιστορικές και μυθολογικές πληροφορίες',
      ],
      description:
        'Εξερευνήστε τον Αχέροντα με πεζοπορία! Οδηγημένες διαδρομές για οικογένειες και αρχάριους στο μυθικό φαράγγι.',
      shortDescription:
        'Οδηγημένες διαδρομές πεζοπορίας στο μυθικό φαράγγι του Αχέροντα. Ιδανικό για οικογένειες και φιλόφυσους.',
      keywords:
        'πεζοπορία αχέροντας, trekking γλυκή, οδηγημένη πεζοπορία, οικογενειακή πεζοπορία, φαράγγι αχέροντας',
      bokunId: '', // No specific Bokun ID for trekking
    },
  },
};

export const activitiesMetadata: Record<
  string,
  { en: ActivityMetadata; el: ActivityMetadata }
> = {
  rafting: {
    en: {
      title: 'Acheron River Rafting Prices | Safe Family Rafting Tours',
      description:
        'See our Acheron River rafting prices. We offer safe river descents perfect for families and beginners. Book your adventure today!',
      keywords:
        'Acheron River rafting, Glyki rafting, family rafting Greece, safe rafting tours, Thesprotia activities, Pony Club, adventure tourism, river rafting, outdoor activities',
      openGraphTitle: 'Acheron River Rafting | Pony Club',
      openGraphDescription:
        'Experience an unforgettable rafting adventure on the Acheron River. Perfect for families and beginners. Book your tour today!',
      imageUrl: 'https://ponyclub.gr/images/activities/rafting-acheron-1.jpg',
      imageAlt: 'Rafting on Acheron River',
    },
    el: {
      title: 'Rafting Αχέροντας Τιμές | Ασφαλής Κατάβαση για Οικογένειες',
      description:
        'Δείτε τις τιμές για rafting στον Αχέροντα. Προσφέρουμε ασφαλείς καταβάσεις για οικογένειες και αρχάριους. Κλείστε την περιπέτειά σας σήμερα!',
      keywords:
        'rafting Αχέροντας, ράφτινγκ Γλυκή, οικογενειακό rafting, ασφαλές ράφτινγκ, Θεσπρωτία, Pony Club, περιπέτεια, ποταμός Αχέροντας, εκδρομή',
      openGraphTitle: 'Rafting στον Αχέροντα | Pony Club',
      openGraphDescription:
        'Ζήστε μια αξέχαστη περιπέτεια ράφτινγκ στον ποταμό Αχέροντα. Ιδανικό για οικογένειες και αρχάριους. Κλείστε τη θέση σας σήμερα!',
      imageUrl: 'https://ponyclub.gr/images/activities/rafting-acheron-1.jpg',
      imageAlt: 'Ράφτινγκ στον ποταμό Αχέροντα',
    },
  },
  // Additional metadata for other activities can be added here
};

/**
 * Helper function to get activity data by type and locale
 */
export function getActivityData(
  activityType: keyof typeof activitiesData,
  locale: string,
): ActivityData {
  const isGreek = locale === 'el';
  return activitiesData[activityType][isGreek ? 'el' : 'en'];
}

/**
 * Helper function to get activity metadata by type and locale
 */
export function getActivityMetadata(
  activityType: keyof typeof activitiesMetadata,
  locale: string,
): ActivityMetadata {
  const isGreek = locale === 'el';
  return activitiesMetadata[activityType][isGreek ? 'el' : 'en'];
}
