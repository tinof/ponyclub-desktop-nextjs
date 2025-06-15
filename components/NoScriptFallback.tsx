interface NoScriptFallbackProps {
  activityType: 'rafting' | 'riding' | 'kayaking' | 'trekking';
  locale: string;
}

/**
 * Comprehensive noscript fallback for activity booking
 * Ensures all critical information is accessible without JavaScript
 */
export default function NoScriptFallback({ activityType, locale }: NoScriptFallbackProps) {
  const isGreek = locale === 'el';

  const activityData = {
    rafting: {
      en: {
        name: 'Acheron River Rafting',
        price: '€20 per adult, €15 per child (6-12 years)',
        phone: '+30 26650 71204',
        email: 'info@ponyclub.gr',
        schedule: 'Daily 9:00 AM - 6:00 PM (April - October)',
        booking: 'Advance booking recommended, especially during summer season',
        requirements: 'Minimum age: 6 years, Swimming ability not required',
        included: 'Professional guide, safety equipment, 30-minute river descent, return transport'
      },
      el: {
        name: 'Ράφτινγκ στον Ποταμό Αχέροντα',
        price: '€20 ανά ενήλικα, €15 ανά παιδί (6-12 ετών)',
        phone: '+30 26650 71204',
        email: 'info@ponyclub.gr',
        schedule: 'Καθημερινά 9:00 - 18:00 (Απρίλιος - Οκτώβριος)',
        booking: 'Συνιστάται κράτηση εκ των προτέρων, ειδικά το καλοκαίρι',
        requirements: 'Ελάχιστη ηλικία: 6 ετών, Δεν απαιτείται γνώση κολύμβησης',
        included: 'Επαγγελματίας οδηγός, εξοπλισμός ασφαλείας, 30λεπτη κατάβαση, επιστροφή'
      }
    },
    riding: {
      en: {
        name: 'Acheron Horse Riding',
        price: '€15 per adult, €12 per child (4+ years)',
        phone: '+30 26650 71204',
        email: 'info@ponyclub.gr',
        schedule: 'Daily 9:00 AM - 6:00 PM (Year-round)',
        booking: 'Walk-ins welcome, booking recommended for groups',
        requirements: 'Minimum age: 4 years, No experience necessary',
        included: 'Trained horses, professional instructor, safety helmet, basic instruction'
      },
      el: {
        name: 'Ιππασία στον Αχέροντα',
        price: '€15 ανά ενήλικα, €12 ανά παιδί (4+ ετών)',
        phone: '+30 26650 71204',
        email: 'info@ponyclub.gr',
        schedule: 'Καθημερινά 9:00 - 18:00 (Όλο το χρόνο)',
        booking: 'Δεκτοί χωρίς κράτηση, συνιστάται κράτηση για ομάδες',
        requirements: 'Ελάχιστη ηλικία: 4 ετών, Δεν απαιτείται εμπειρία',
        included: 'Εκπαιδευμένα άλογα, επαγγελματίας εκπαιδευτής, κράνος, εκπαίδευση'
      }
    },
    kayaking: {
      en: {
        name: 'Acheron River Kayaking',
        price: '€25 per adult, €20 per child (8+ years)',
        phone: '+30 26650 71204',
        email: 'info@ponyclub.gr',
        schedule: 'Daily 9:00 AM - 6:00 PM (April - October)',
        booking: 'Advance booking required',
        requirements: 'Minimum age: 8 years, Basic swimming ability recommended',
        included: 'Kayak, paddle, life jacket, safety briefing, basic instruction'
      },
      el: {
        name: 'Καγιάκ στον Ποταμό Αχέροντα',
        price: '€25 ανά ενήλικα, €20 ανά παιδί (8+ ετών)',
        phone: '+30 26650 71204',
        email: 'info@ponyclub.gr',
        schedule: 'Καθημερινά 9:00 - 18:00 (Απρίλιος - Οκτώβριος)',
        booking: 'Απαιτείται κράτηση εκ των προτέρων',
        requirements: 'Ελάχιστη ηλικία: 8 ετών, Συνιστάται βασική γνώση κολύμβησης',
        included: 'Καγιάκ, κουπί, σωσίβιο, ενημέρωση ασφαλείας, εκπαίδευση'
      }
    },
    trekking: {
      en: {
        name: 'Acheron Canyon Trekking',
        price: '€10 per adult, €8 per child (6+ years)',
        phone: '+30 26650 71204',
        email: 'info@ponyclub.gr',
        schedule: 'Daily 9:00 AM - 5:00 PM (Year-round)',
        booking: 'Walk-ins welcome, groups should book ahead',
        requirements: 'Minimum age: 6 years, Comfortable walking shoes required',
        included: 'Professional guide, route map, nature interpretation, safety briefing'
      },
      el: {
        name: 'Πεζοπορία στο Φαράγγι του Αχέροντα',
        price: '€10 ανά ενήλικα, €8 ανά παιδί (6+ ετών)',
        phone: '+30 26650 71204',
        email: 'info@ponyclub.gr',
        schedule: 'Καθημερινά 9:00 - 17:00 (Όλο το χρόνο)',
        booking: 'Δεκτοί χωρίς κράτηση, ομάδες να κλείνουν εκ των προτέρων',
        requirements: 'Ελάχιστη ηλικία: 6 ετών, Απαιτούνται άνετα παπούτσια',
        included: 'Επαγγελματίας οδηγός, χάρτης, ερμηνεία φύσης, ενημέρωση ασφαλείας'
      }
    }
  };

  const activity = activityData[activityType][isGreek ? 'el' : 'en'];

  return (
    <noscript>
      <div className="noscript-fallback bg-blue-50 border-2 border-blue-200 rounded-lg p-6 my-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            {isGreek ? 'Κλείστε την Εμπειρία σας' : 'Book Your Experience'}
          </h3>
          <p className="text-blue-700">
            {isGreek 
              ? 'Για την καλύτερη εμπειρία κράτησης, ενεργοποιήστε το JavaScript ή επικοινωνήστε μαζί μας απευθείας.'
              : 'For the best booking experience, please enable JavaScript or contact us directly.'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Activity Details */}
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-bold text-lg text-blue-800 mb-3">
              {activity.name}
            </h4>
            <div className="space-y-2 text-sm">
              <p><strong>{isGreek ? 'Τιμές:' : 'Prices:'}</strong> {activity.price}</p>
              <p><strong>{isGreek ? 'Ωράριο:' : 'Schedule:'}</strong> {activity.schedule}</p>
              <p><strong>{isGreek ? 'Απαιτήσεις:' : 'Requirements:'}</strong> {activity.requirements}</p>
              <p><strong>{isGreek ? 'Περιλαμβάνει:' : 'Includes:'}</strong> {activity.included}</p>
              <p><strong>{isGreek ? 'Κράτηση:' : 'Booking:'}</strong> {activity.booking}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-bold text-lg text-blue-800 mb-3">
              {isGreek ? 'Επικοινωνία' : 'Contact Us'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${activity.phone}`} className="text-blue-700 hover:underline">
                  {activity.phone}
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${activity.email}`} className="text-blue-700 hover:underline">
                  {activity.email}
                </a>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700 text-sm">
                  {isGreek 
                    ? 'Ποταμός Αχέροντας, Γλυκή, Θεσπρωτία 46200'
                    : 'Acheron River, Glyki, Thesprotia 46200, Greece'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6 p-4 bg-amber-100 rounded-lg">
          <p className="text-amber-800 font-medium mb-2">
            {isGreek 
              ? 'Καλέστε τώρα για άμεση κράτηση!'
              : 'Call now for instant booking!'
            }
          </p>
          <a 
            href={`tel:${activity.phone}`}
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors duration-200"
          >
            📞 {activity.phone}
          </a>
        </div>

        {/* SEO Text for Crawlers */}
        <div className="mt-6 text-xs text-gray-600 leading-relaxed">
          <p>
            {isGreek 
              ? `Κλείστε ${activity.name} στο Pony Club. Τιμές από ${activity.price.split(',')[0]}. ${activity.booking} Επικοινωνήστε στο ${activity.phone} ή ${activity.email}.`
              : `Book ${activity.name} at Pony Club. Prices from ${activity.price.split(',')[0]}. ${activity.booking} Contact us at ${activity.phone} or ${activity.email}.`
            }
          </p>
        </div>
      </div>
    </noscript>
  );
}
