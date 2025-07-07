import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

// This page now uses the global translation system via HomePageContent component

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "el"
      ? "Pony Club Αχέροντας | Rafting, Ιππασία & Kayak - Κάντε Κράτηση"
      : "Pony Club Acheron: Official Rafting, Riding & Kayak Tours - Book Now";
  const description =
    locale === "el"
      ? "Οι καλύτερες δραστηριότητες στον Αχέροντα από το 1999. Ασφαλές rafting, ιππασία για αρχάριους και οικογένειες. Δείτε τα πακέτα μας!"
      : "The original Acheron River adventures since 1999. Safe rafting, beginner-friendly horse riding, and family fun. View our packages and book your tour today!";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

export default async function Home({ params }: PageProps) {
  // Extract locale but prefix with underscore to indicate it's intentionally unused
  const { locale: _locale } = await params;

  return <HomePageContent />;
}
