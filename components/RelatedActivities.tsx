import Link from 'next/link';
import Image from 'next/image';

interface Activity {
  name: string;
  href: string;
  description: string;
  price: string;
  image: string;
  duration: string;
}

interface RelatedActivitiesProps {
  currentActivity: string;
  locale: string;
  className?: string;
}

/**
 * Related activities component for internal linking and SEO
 * Helps with site structure and keeps users engaged
 */
export default function RelatedActivities({ 
  currentActivity, 
  locale, 
  className = '' 
}: RelatedActivitiesProps) {
  const isGreek = locale === 'el';

  const allActivities: Record<string, Activity> = {
    rafting: {
      name: isGreek ? 'Ράφτινγκ' : 'Rafting',
      href: `/${locale}/rafting`,
      description: isGreek 
        ? 'Ασφαλής κατάβαση στον ποταμό Αχέροντα'
        : 'Safe river descent on Acheron River',
      price: '€20',
      image: '/images/activities/rafting-acheron-1.jpg',
      duration: isGreek ? '30 λεπτά' : '30 minutes'
    },
    riding: {
      name: isGreek ? 'Ιππασία' : 'Horse Riding',
      href: `/${locale}/riding`,
      description: isGreek 
        ? 'Ήρεμη ιππασία δίπλα στο ποτάμι'
        : 'Peaceful horseback riding by the river',
      price: '€15',
      image: '/images/activities/riding-hero.webp',
      duration: isGreek ? '15 λεπτά' : '15 minutes'
    },
    kayaking: {
      name: isGreek ? 'Καγιάκ' : 'Kayaking',
      href: `/${locale}/kayaking`,
      description: isGreek 
        ? 'Εξερεύνηση με καγιάκ στα κρυστάλλινα νερά'
        : 'Explore crystal clear waters by kayak',
      price: '€25',
      image: '/images/activities/kayaking-hero.webp',
      duration: isGreek ? '30 λεπτά' : '30 minutes'
    },
    trekking: {
      name: isGreek ? 'Πεζοπορία' : 'Trekking',
      href: `/${locale}/trekking`,
      description: isGreek 
        ? 'Οδηγημένη πεζοπορία στο φαράγγι'
        : 'Guided hiking through the canyon',
      price: '€10',
      image: '/images/activities/trekking-hero.webp',
      duration: isGreek ? '45 λεπτά' : '45 minutes'
    }
  };

  // Filter out current activity
  const relatedActivities = Object.entries(allActivities)
    .filter(([key]) => key !== currentActivity)
    .map(([, activity]) => activity)
    .slice(0, 3); // Show max 3 related activities

  if (relatedActivities.length === 0) {
    return null;
  }

  return (
    <section className={`related-activities ${className}`}>
      <div className="bg-gradient-to-r from-amber-50 to-green-50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-amber-800 mb-6 text-center">
          {isGreek ? 'Άλλες Δραστηριότητες' : 'Other Activities'}
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {relatedActivities.map((activity, index) => (
            <Link
              key={activity.href}
              href={activity.href}
              className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
                <div className="absolute top-2 right-2 bg-amber-600 text-white px-2 py-1 rounded text-sm font-bold">
                  {activity.price}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-amber-600 transition-colors duration-200">
                  {activity.name}
                </h4>
                <p className="text-gray-600 text-sm mt-1 mb-2">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    ⏱️ {activity.duration}
                  </span>
                  <span className="text-amber-600 text-sm font-medium group-hover:underline">
                    {isGreek ? 'Μάθετε περισσότερα →' : 'Learn more →'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-6">
          <Link
            href={`/${locale}#activities`}
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200"
          >
            {isGreek ? 'Δείτε Όλες τις Δραστηριότητες' : 'View All Activities'}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Compact version for sidebar or footer use
 */
export function RelatedActivitiesCompact({ 
  currentActivity, 
  locale, 
  className = '' 
}: RelatedActivitiesProps) {
  const isGreek = locale === 'el';

  const allActivities: Record<string, Pick<Activity, 'name' | 'href' | 'price'>> = {
    rafting: {
      name: isGreek ? 'Ράφτινγκ' : 'Rafting',
      href: `/${locale}/rafting`,
      price: '€20'
    },
    riding: {
      name: isGreek ? 'Ιππασία' : 'Horse Riding',
      href: `/${locale}/riding`,
      price: '€15'
    },
    kayaking: {
      name: isGreek ? 'Καγιάκ' : 'Kayaking',
      href: `/${locale}/kayaking`,
      price: '€25'
    },
    trekking: {
      name: isGreek ? 'Πεζοπορία' : 'Trekking',
      href: `/${locale}/trekking`,
      price: '€10'
    }
  };

  const relatedActivities = Object.entries(allActivities)
    .filter(([key]) => key !== currentActivity)
    .map(([, activity]) => activity);

  return (
    <div className={`related-activities-compact ${className}`}>
      <h4 className="font-bold text-gray-800 mb-3">
        {isGreek ? 'Άλλες Δραστηριότητες' : 'Other Activities'}
      </h4>
      <ul className="space-y-2">
        {relatedActivities.map((activity) => (
          <li key={activity.href}>
            <Link
              href={activity.href}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-gray-700 hover:text-amber-600">
                {activity.name}
              </span>
              <span className="text-amber-600 font-medium text-sm">
                {activity.price}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
