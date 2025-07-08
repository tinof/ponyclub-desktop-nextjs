import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import PrivacySettingsClient from "./PrivacySettingsClient";

interface PrivacySettingsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  { params: paramsPromise }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await paramsPromise;
  
  const title = locale === 'el' 
    ? 'Ρυθμίσεις Απορρήτου - Pony Club'
    : 'Privacy Settings - Pony Club';
    
  const description = locale === 'el'
    ? 'Διαχειριστείτε τις προτιμήσεις cookies και απορρήτου για τον ιστότοπο Pony Club.'
    : 'Manage your cookie and privacy preferences for the Pony Club website.';

  return {
    title,
    description,
  };
}

export default async function PrivacySettingsPage({
  params: paramsPromise,
}: PrivacySettingsPageProps) {
  const { locale } = await paramsPromise;

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {locale === 'el' ? 'Ρυθμίσεις Απορρήτου' : 'Privacy Settings'}
          </h1>
          
          <div className="prose prose-gray max-w-none mb-8">
            <p className="text-gray-600">
              {locale === 'el' 
                ? 'Διαχειριστείτε τις προτιμήσεις cookies και απορρήτου σας. Μπορείτε να αλλάξετε αυτές τις ρυθμίσεις ανά πάσα στιγμή.'
                : 'Manage your cookie and privacy preferences. You can change these settings at any time.'
              }
            </p>
          </div>

          <PrivacySettingsClient locale={locale} />
        </div>
      </div>
    </Container>
  );
}
