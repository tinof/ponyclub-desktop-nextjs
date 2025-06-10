import type { Metadata } from 'next'
import React from 'react'

import ActivityPageLayout from '@/components/ActivityPageLayout'
import DynamicBokunWidget from '@/components/DynamicBokunWidget'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const isGreek = locale === 'el'

  return {
    title: isGreek
      ? 'Καγιάκ στον Αχέροντα - Pony Club | Εμπειρία Καγιάκ Γλυκή Θεσπρωτίας'
      : 'Kayaking in Acheron River - Pony Club | Glyki Thesprotia Experience',
    description: isGreek
      ? 'Ζήστε μια αξέχαστη εμπειρία καγιάκ στον κρυστάλλινο ποταμό Αχέροντα. Ασφαλής καγιάκ για όλες τις ηλικίες με έμπειρους οδηγούς στη Γλυκή Θεσπρωτίας.'
      : 'Experience unforgettable kayaking in the crystal-clear Acheron River. Safe kayaking adventures for all ages with experienced guides in Glyki, Thesprotia.',
    keywords: isGreek
      ? 'καγιάκ Αχέροντας, καγιάκ Γλυκή, καγιάκ Θεσπρωτία, καγιάκ Ήπειρος, εκδρομή καγιάκ, ποταμός Αχέροντας'
      : 'kayaking Acheron, kayaking Glyki, kayaking Thesprotia, kayaking Epirus, Acheron river kayaking, Greece kayaking',
  }
}

const KayakingPage = async ({ params }: PageProps) => {
  const { locale } = await params
  const isGreek = locale === 'el'

  // Define the experience ID
  const bokunExperienceId = '1020669'

  const seoContent = isGreek ? (
    <div className='mb-8'>
      <h1 className='text-3xl md:text-4xl font-bold text-[#3E5A35] mb-6'>Καγιάκ στον Ποταμό Αχέροντα</h1>
      <div className='prose prose-lg max-w-none text-gray-700'>
        <p className='lead mb-4'>
          Ανακαλύψτε τη μαγεία του ποταμού Αχέροντα με μια συναρπαστική εμπειρία καγιάκ στα κρυστάλλινα νερά της Γλυκής,
          Θεσπρωτίας. Το Pony Club προσφέρει ασφαλείς και οργανωμένες εκδρομές καγιάκ για όλες τις ηλικίες και επίπεδα
          εμπειρίας.
        </p>

        <p>
          Ο ποταμός Αχέροντας, γνωστός από την αρχαία ελληνική μυθολογία, είναι ένας από τους πιο εντυπωσιακούς
          προορισμούς για καγιάκ στην Ελλάδα. Τα διαυγή νερά, η πλούσια βλάστηση και η μοναδική φυσική ομορφιά
          δημιουργούν το ιδανικό περιβάλλον για μια αξέχαστη περιπέτεια στη φύση.
        </p>

        <p>
          Με τον έμπειρο εξοπλισμό και τους καταρτισμένους οδηγούς μας, θα απολαύσετε μια ασφαλή και διασκεδαστική
          εμπειρία καγιάκ διάρκειας 30 λεπτών. Κατάλληλο για αρχάριους και παιδιά, με πλήρη εξοπλισμό ασφαλείας και
          λεπτομερείς οδηγίες.
        </p>
      </div>
    </div>
  ) : (
    <div className='mb-8'>
      <h1 className='text-3xl md:text-4xl font-bold text-[#3E5A35] mb-6'>Kayaking in Acheron River</h1>
      <div className='prose prose-lg max-w-none text-gray-700'>
        <p className='lead mb-4'>
          Discover the magic of Acheron River with an exciting kayaking experience in the crystal-clear waters of Glyki,
          Thesprotia. Pony Club offers safe and organized kayaking excursions for all ages and experience levels.
        </p>

        <p>
          The Acheron River, known from ancient Greek mythology, is one of the most impressive kayaking destinations in
          Greece. The crystal-clear waters, rich vegetation, and unique natural beauty create the perfect environment
          for an unforgettable adventure in nature.
        </p>

        <p>
          With our professional equipment and trained guides, you'll enjoy a safe and fun 30-minute kayaking experience.
          Suitable for beginners and children, with complete safety equipment and detailed instructions provided.
        </p>
      </div>
    </div>
  )

  return (
    <ActivityPageLayout
      title='Kayaking'
      subtitle=''
      descriptionTitle=''
      descriptionContent={
        <>
          {seoContent}
          <DynamicBokunWidget experienceId={bokunExperienceId} />
        </>
      }
      detailsTitle=''
      detailsContent={<></>}
      pricingTitle=''
      pricingContent={<></>}
      showBookingButton={false}
      fullWidthContent={true}
    />
  )
}

export default KayakingPage
