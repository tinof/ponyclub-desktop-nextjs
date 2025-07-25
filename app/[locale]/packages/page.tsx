import type { Metadata } from "next";

import PackagesPageContent from "@/components/PackagesPageContent";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbStructuredData } from "@/lib/structured-data";

// PERFORMANCE OPTIMIZATION: ISR configuration for packages hub page
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "el"
      ? "Πακέτα Περιπέτειας Αχέροντας | Rafting, Ιππασία & Πεζοπορία"
      : "Acheron Adventure Packages | Rafting, Riding & Hiking";
  const description =
    locale === "el"
      ? "Ανακαλύψτε τα πακέτα περιπέτειας μας στον Αχέροντα. Συνδυάζουμε rafting, ιππασία και πεζοπορία για μια ολοκληρωμένη εμπειρία. Κλείστε το πακέτο σας σήμερα!"
      : "Discover our Acheron adventure packages. We combine rafting, horse riding, and hiking for a complete experience. Book your package today!";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/packages`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "el" ? "el_GR" : "en_US",
    },
  };
}

const PackagesPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === "el";

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData(
    [
      { name: isGreek ? "Αρχική" : "Home", url: `/${locale}` },
      { name: isGreek ? "Πακέτα" : "Packages", url: `/${locale}/packages` },
    ],
    `https://www.ponyclub.gr/${locale}/packages`
  );

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <PackagesPageContent isGreek={isGreek} />
    </>
  );
};

export default PackagesPage;
