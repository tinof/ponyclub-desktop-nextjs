import React from 'react';
import ActivityPageLayout from '@/components/ActivityPageLayout';
import DynamicBokunWidget from '@/components/DynamicBokunWidget';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const isGreek = locale === 'el';
  
  return {
    title: isGreek 
      ? "Ράφτινγκ στον Αχέροντα - Pony Club | Ράφτινγκ Γλυκή Θεσπρωτίας"
      : "Rafting in Acheron River - Pony Club | Glyki Thesprotia Adventure",
    description: isGreek
      ? "Ζήστε συναρπαστικό ράφτινγκ στον ποταμό Αχέροντα με ασφάλεια και διασκέδαση. Κατάλληλο για όλη την οικογένεια στη Γλυκή Θεσπρωτίας."
      : "Experience thrilling rafting in Acheron River with safety and fun. Perfect for the whole family in Glyki, Thesprotia.",
    keywords: isGreek
      ? "ράφτινγκ Αχέροντας, ράφτινγκ Γλυκή, ράφτινγκ Θεσπρωτία, ράφτινγκ Ήπειρος, ποταμός Αχέροντας"
      : "rafting Acheron, rafting Glyki, rafting Thesprotia, rafting Epirus, Acheron river rafting, Greece rafting",
  };
}

const RaftingPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === 'el';
  
  // Define the experience ID for rafting
  const bokunExperienceId = "1020611";

  const seoContent = isGreek ? (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#3E5A35] mb-6">Ράφτινγκ στον Ποταμό Αχέροντα</h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-4">
          Ζήστε την απόλυτη περιπέτεια με ράφτινγκ στον μυθικό ποταμό Αχέροντα! Το Pony Club σας προσφέρει 
          μια ασφαλή και συναρπαστική εμπειρία ράφτινγκ στα καθαρά νερά της Γλυκής, Θεσπρωτίας.
        </p>
        
        <p>
          Ο Αχέροντας είναι ένας από τους πιο φημισμένους ποταμούς της Ελλάδας για ράφτινγκ, με ήπια ρεύματα 
          που τον καθιστούν ιδανικό για αρχάριους και οικογένειες. Η διαδρομή διάρκειας 30 λεπτών προσφέρει 
          μοναδικές θέες σε ένα καταπράσινο φυσικό περιβάλλον.
        </p>

        <p>
          Οι έμπειροι οδηγοί μας εξασφαλίζουν την ασφάλειά σας και σας καθοδηγούν σε κάθε βήμα, ενώ σας παρέχουν 
          όλο τον απαραίτητο εξοπλισμό ασφαλείας. Κατάλληλο για άτομα άνω των 6 ετών και όλα τα επίπεδα εμπειρίας.
        </p>
      </div>
    </div>
  ) : (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#3E5A35] mb-6">Rafting in Acheron River</h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-4">
          Experience the ultimate adventure with rafting in the mythical Acheron River! Pony Club offers you 
          a safe and thrilling rafting experience in the clear waters of Glyki, Thesprotia.
        </p>
        
        <p>
          Acheron is one of Greece's most renowned rivers for rafting, with gentle currents that make it perfect 
          for beginners and families. The 30-minute journey offers unique views in a lush natural environment.
        </p>

        <p>
          Our experienced guides ensure your safety and guide you every step of the way, while providing all 
          necessary safety equipment. Suitable for people over 6 years old and all experience levels.
        </p>
      </div>
    </div>
  );

  return (
    <ActivityPageLayout
      title="Rafting" 
      subtitle="" 
      descriptionTitle=""
      descriptionContent={
        <>
          {seoContent}
          <DynamicBokunWidget experienceId={bokunExperienceId} />
        </>
      }
      detailsTitle=""
      detailsContent={<></>}
      pricingTitle=""
      pricingContent={<></>}
      showBookingButton={false}
      fullWidthContent={true}
    />
  );
};

export default RaftingPage;
