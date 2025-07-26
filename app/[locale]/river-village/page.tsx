import type { Metadata } from "next";
import RiverVillageClient from "./RiverVillageClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "el"
      ? "Ποτάμι & Χωριό | Pony Club"
      : "River & Village | Pony Club";
  const description =
    locale === "el"
      ? "Ανακαλύψτε τον μυθικό ποταμό Αχέροντα και το γραφικό χωριό Γλυκή. Μάθετε για την ιστορία και τη μυθολογία αυτού του μαγικού τόπου."
      : "Discover the mythical Acheron River and the picturesque village of Glyki. Learn about the history and mythology of this magical place.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/river-village`,
    },
  };
}

export default async function RiverVillagePage({ params }: PageProps) {
  const { locale: _locale } = await params;
  return <RiverVillageClient />;
}
