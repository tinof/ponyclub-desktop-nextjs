interface SEOActivityContentProps {
  activityType: 'rafting' | 'riding' | 'kayaking' | 'trekking';
  locale: string;
}

/**
 * Server-side rendered content that provides comprehensive activity information
 * for search engine crawlers. This ensures that all critical information is
 * accessible without JavaScript execution.
 */
export default function SEOActivityContent({ activityType, locale }: SEOActivityContentProps) {
  const isGreek = locale === 'el';

  const activityData = {
    rafting: {
      en: {
        title: 'Acheron River Rafting',
        price: '€20',
        childPrice: '€15',
        duration: '30 minutes',
        minAge: '6 years',
        maxParticipants: '8 people per raft',
        difficulty: 'Beginner-friendly',
        season: 'April to October',
        includes: [
          'Professional guide',
          'Complete safety equipment (helmet, life jacket)',
          'Safety briefing',
          'Return transportation to starting point'
        ],
        whatToBring: [
          'Comfortable clothes',
          'Swimwear',
          'Towel',
          'Sunscreen',
          'Water bottle'
        ],
        highlights: [
          'Safe for families and beginners',
          'Crystal clear waters of Acheron River',
          'Mythical river from Greek mythology',
          'Professional guides with years of experience',
          'All safety equipment provided'
        ]
      },
      el: {
        title: 'Ράφτινγκ στον Ποταμό Αχέροντα',
        price: '€20',
        childPrice: '€15',
        duration: '30 λεπτά',
        minAge: '6 ετών',
        maxParticipants: '8 άτομα ανά σχεδία',
        difficulty: 'Φιλικό για αρχάριους',
        season: 'Απρίλιος έως Οκτώβριος',
        includes: [
          'Επαγγελματίας οδηγός',
          'Πλήρης εξοπλισμός ασφαλείας (κράνος, σωσίβιο)',
          'Ενημέρωση ασφαλείας',
          'Επιστροφή στο σημείο εκκίνησης'
        ],
        whatToBring: [
          'Άνετα ρούχα',
          'Μαγιό',
          'Πετσέτα',
          'Αντηλιακό',
          'Μπουκάλι νερό'
        ],
        highlights: [
          'Ασφαλές για οικογένειες και αρχάριους',
          'Κρυστάλλινα νερά του ποταμού Αχέροντα',
          'Μυθικός ποταμός από την ελληνική μυθολογία',
          'Επαγγελματίες οδηγοί με χρόνια εμπειρία',
          'Παρέχεται όλος ο εξοπλισμός ασφαλείας'
        ]
      }
    },
    riding: {
      en: {
        title: 'Acheron Horse Riding',
        price: '€15',
        childPrice: '€12',
        duration: '15 minutes',
        minAge: '4 years',
        maxParticipants: '6 riders at a time',
        difficulty: 'Suitable for all levels',
        season: 'Year-round',
        includes: [
          'Trained horses',
          'Professional instructor',
          'Safety helmet',
          'Basic riding instruction'
        ],
        whatToBring: [
          'Comfortable clothes',
          'Closed-toe shoes',
          'Long pants recommended'
        ],
        highlights: [
          'Gentle horses suitable for all ages',
          'Beautiful riverside trails',
          'Professional instruction provided',
          'Perfect for first-time riders'
        ]
      },
      el: {
        title: 'Ιππασία στον Αχέροντα',
        price: '€15',
        childPrice: '€12',
        duration: '15 λεπτά',
        minAge: '4 ετών',
        maxParticipants: '6 αναβάτες κάθε φορά',
        difficulty: 'Κατάλληλο για όλα τα επίπεδα',
        season: 'Όλο το χρόνο',
        includes: [
          'Εκπαιδευμένα άλογα',
          'Επαγγελματίας εκπαιδευτής',
          'Κράνος ασφαλείας',
          'Βασική εκπαίδευση ιππασίας'
        ],
        whatToBring: [
          'Άνετα ρούχα',
          'Κλειστά παπούτσια',
          'Μακρύ παντελόνι (συνιστάται)'
        ],
        highlights: [
          'Ήρεμα άλογα κατάλληλα για όλες τις ηλικίες',
          'Όμορφα μονοπάτια δίπλα στο ποτάμι',
          'Παρέχεται επαγγελματική εκπαίδευση',
          'Ιδανικό για πρώτη φορά αναβάτες'
        ]
      }
    },
    kayaking: {
      en: {
        title: 'Acheron River Kayaking',
        price: '€25',
        childPrice: '€20',
        duration: '30 minutes',
        minAge: '8 years',
        maxParticipants: '10 kayaks at a time',
        difficulty: 'Beginner to intermediate',
        season: 'April to October',
        includes: [
          'Single or double kayaks',
          'Paddles and safety equipment',
          'Life jackets',
          'Basic paddling instruction'
        ],
        whatToBring: [
          'Swimwear',
          'Quick-dry clothes',
          'Towel',
          'Sunscreen',
          'Waterproof bag for valuables'
        ],
        highlights: [
          'Explore hidden parts of Acheron River',
          'Crystal clear spring waters',
          'Suitable for beginners',
          'Professional guidance provided'
        ]
      },
      el: {
        title: 'Καγιάκ στον Ποταμό Αχέροντα',
        price: '€25',
        childPrice: '€20',
        duration: '30 λεπτά',
        minAge: '8 ετών',
        maxParticipants: '10 καγιάκ κάθε φορά',
        difficulty: 'Αρχάριο έως μεσαίο',
        season: 'Απρίλιος έως Οκτώβριος',
        includes: [
          'Μονά ή διπλά καγιάκ',
          'Κουπιά και εξοπλισμός ασφαλείας',
          'Σωσίβια',
          'Βασική εκπαίδευση κωπηλασίας'
        ],
        whatToBring: [
          'Μαγιό',
          'Ρούχα που στεγνώνουν γρήγορα',
          'Πετσέτα',
          'Αντηλιακό',
          'Αδιάβροχη τσάντα για τιμαλφή'
        ],
        highlights: [
          'Εξερευνήστε κρυφά μέρη του ποταμού Αχέροντα',
          'Κρυστάλλινα νερά πηγής',
          'Κατάλληλο για αρχάριους',
          'Παρέχεται επαγγελματική καθοδήγηση'
        ]
      }
    },
    trekking: {
      en: {
        title: 'Acheron Canyon Trekking',
        price: '€10',
        childPrice: '€8',
        duration: '45 minutes',
        minAge: '6 years',
        maxParticipants: '15 people per group',
        difficulty: 'Easy to moderate',
        season: 'Year-round',
        includes: [
          'Professional guide',
          'Route map',
          'Nature interpretation',
          'Safety briefing'
        ],
        whatToBring: [
          'Comfortable hiking shoes',
          'Water bottle',
          'Hat and sunscreen',
          'Light backpack',
          'Camera'
        ],
        highlights: [
          'Stunning natural scenery',
          'Learn about local flora and fauna',
          'Family-friendly trails',
          'Historical and mythological insights'
        ]
      },
      el: {
        title: 'Πεζοπορία στο Φαράγγι του Αχέροντα',
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
          'Ενημέρωση ασφαλείας'
        ],
        whatToBring: [
          'Άνετα παπούτσια πεζοπορίας',
          'Μπουκάλι νερό',
          'Καπέλο και αντηλιακό',
          'Ελαφρύ σακίδιο',
          'Φωτογραφική μηχανή'
        ],
        highlights: [
          'Εκπληκτικό φυσικό τοπίο',
          'Μάθετε για την τοπική χλωρίδα και πανίδα',
          'Φιλικά προς την οικογένεια μονοπάτια',
          'Ιστορικές και μυθολογικές πληροφορίες'
        ]
      }
    }
  };

  const activity = activityData[activityType][isGreek ? 'el' : 'en'];

  return (
    <div className="seo-activity-content space-y-6">
      {/* Pricing Information */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-amber-800 mb-4">
          {isGreek ? 'Τιμές & Πληροφορίες' : 'Prices & Information'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">{isGreek ? 'Τιμές:' : 'Prices:'}</h4>
            <ul className="space-y-1">
              <li><strong>{isGreek ? 'Ενήλικες:' : 'Adults:'}</strong> {activity.price}</li>
              <li><strong>{isGreek ? 'Παιδιά:' : 'Children:'}</strong> {activity.childPrice}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{isGreek ? 'Λεπτομέρειες:' : 'Details:'}</h4>
            <ul className="space-y-1 text-sm">
              <li><strong>{isGreek ? 'Διάρκεια:' : 'Duration:'}</strong> {activity.duration}</li>
              <li><strong>{isGreek ? 'Ελάχιστη ηλικία:' : 'Min age:'}</strong> {activity.minAge}</li>
              <li><strong>{isGreek ? 'Μέγιστοι συμμετέχοντες:' : 'Max participants:'}</strong> {activity.maxParticipants}</li>
              <li><strong>{isGreek ? 'Δυσκολία:' : 'Difficulty:'}</strong> {activity.difficulty}</li>
              <li><strong>{isGreek ? 'Εποχή:' : 'Season:'}</strong> {activity.season}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          {isGreek ? 'Τι Περιλαμβάνεται' : 'What\'s Included'}
        </h3>
        <ul className="grid md:grid-cols-2 gap-2">
          {activity.includes.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* What to Bring */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">
          {isGreek ? 'Τι να Φέρετε' : 'What to Bring'}
        </h3>
        <ul className="grid md:grid-cols-2 gap-2">
          {activity.whatToBring.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="text-blue-600 mr-2">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Highlights */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4">
          {isGreek ? 'Κυριότερα Σημεία' : 'Highlights'}
        </h3>
        <ul className="space-y-2">
          {activity.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start">
              <span className="text-purple-600 mr-2 mt-1">★</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {isGreek ? 'Επικοινωνία & Κρατήσεις' : 'Contact & Bookings'}
        </h3>
        <div className="space-y-2">
          <p><strong>{isGreek ? 'Τηλέφωνο:' : 'Phone:'}</strong> +30 26650 71204</p>
          <p><strong>Email:</strong> info@ponyclub.gr</p>
          <p><strong>{isGreek ? 'Διεύθυνση:' : 'Address:'}</strong> {isGreek ? 'Ποταμός Αχέροντας, Γλυκή, Θεσπρωτία' : 'Acheron River, Glyki, Thesprotia'}</p>
          <p className="text-sm text-gray-600">
            {isGreek 
              ? 'Συνιστάται κράτηση εκ των προτέρων, ειδικά κατά τη διάρκεια της καλοκαιρινής περιόδου.'
              : 'Advance booking recommended, especially during summer season.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
