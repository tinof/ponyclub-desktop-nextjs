import { Roboto_Slab } from 'next/font/google'

import HomePageContent from '@/components/HomePageContent'

// This page now uses the global translation system via HomePageContent component

const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  weight: ['400', '700'],
  variable: '--font-roboto-slab',
})

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params

  return <HomePageContent />
}
