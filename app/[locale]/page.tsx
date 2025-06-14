import HomePageContent from '@/components/HomePageContent';

// This page now uses the global translation system via HomePageContent component

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  // Extract locale but prefix with underscore to indicate it's intentionally unused
  const { locale: _locale } = await params;

  return <HomePageContent />;
}
