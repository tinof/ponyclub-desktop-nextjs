import type { Metadata } from 'next'

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
      ? 'Ιππασία στον Αχέροντα - Pony Club | Βόλτες με Άλογα Γλυκή Θεσπρωτίας'
      : 'Horse Riding in Acheron - Pony Club | Horseback Adventures Glyki Thesprotia',
    description: isGreek
      ? 'Απολαύστε μαγικές βόλτες με άλογα στις όχθες του Αχέροντα. Ασφαλείς ιππικές εμπειρίες για όλες τις ηλικίες με εκπαιδευμένα άλογα στη Γλυκή Θεσπρωτίας.'
      : 'Enjoy magical horseback rides along the banks of Acheron River. Safe equestrian experiences for all ages with trained horses in Glyki, Thesprotia.',
    keywords: isGreek
      ? 'ιππασία Αχέροντας, ιππασία Γλυκή, άλογα Θεσπρωτία, ιππασία Ήπειρος, βόλτες με άλογα, ποταμός Αχέροντας'
      : 'horse riding Acheron, horseback riding Glyki, horses Thesprotia, riding Epirus, Acheron river horseback, Greece horse riding',
  }
}

const RidingPage = async ({ params }: PageProps) => {
  const { locale } = await params
  const bokunExperienceId = '1020659' // Riding experience ID

  return (
    <ActivityPageLayout
      title='Riding'
      subtitle=''
      descriptionTitle=''
      descriptionContent={<DynamicBokunWidget experienceId={bokunExperienceId} />} // Use DynamicBokunWidget
      detailsTitle=''
      detailsContent={<></>}
      pricingTitle=''
      pricingContent={<></>}
      showBookingButton={false}
      fullWidthContent={true}
    />
  )
}

export default RidingPage
