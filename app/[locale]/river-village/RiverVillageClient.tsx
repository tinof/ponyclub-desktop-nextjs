"use client";

import { Roboto_Slab } from "next/font/google";

import ActivityPageLayout from "@/components/ActivityPageLayout";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useLanguage } from "@/contexts/language-context";

// Define Roboto Slab font instance
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  variable: "--font-roboto-slab",
  weight: ["400", "700", "900"],
});

export default function RiverVillageClient() {
  const { t, language } = useLanguage();

  // Enhanced description content with glassmorphism effect
  const descriptionContent = (
    <div
      className={`
        group relative transform overflow-hidden rounded-2xl p-6 shadow-xl
        transition-all duration-500
        hover:scale-[1.01]
      `}
    >
      {/* Background layers */}
      <div
        className={`
          absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-[#f5f0e8]/95
          via-white/90 to-[#f5f0e8]/95 backdrop-blur-md
        `}
      />
      <div className="absolute inset-0 -z-20 rounded-2xl bg-[#6b8362]/5" />

      {/* Decorative effects */}
      <div
        className={`
          pointer-events-none absolute -inset-[3px] -z-10 rounded-2xl opacity-70
        `}
      >
        <div
          className={`
            absolute inset-0 rounded-2xl bg-linear-to-tr from-amber-200/30
            via-transparent to-[#6b8362]/20
          `}
        />
      </div>
      <div
        className={`
          pointer-events-none absolute inset-0 rounded-2xl border
          border-amber-200/30
        `}
      />

      {/* Title with underline effect */}
      <h2
        className={`
          ${robotoSlab.variable}
          relative mb-6 inline-block font-roboto-slab text-3xl font-bold
          text-[#3E5A35]
          md:text-4xl
        `}
      >
        {t.riverVillage.descriptionTitle}
        <div
          className={`
            absolute -bottom-2 left-0 h-[2px] w-full bg-linear-to-r
            from-transparent via-[#6b8362]/70 to-transparent
          `}
        />
      </h2>

      {/* Content */}
      <div className="prose max-w-none text-gray-700">
        <div className="space-y-4">
          {language === "en" ? (
            <>
              <p>
                Acheron (gre. Ἀχέρων/ lat. Styx) is a 58 km long river starting
                near Ioannina, Epirus region. It flows into the Ionian Sea in
                Ammoudia, near Parga.
              </p>

              <p>
                In Greek mythology Acheron was known as the river of Underworld.
                The souls of the newly dead were carried to the Underworld by
                Hades' ferryman Charon. Of course you had to pay Charos two
                coins to get there and if you couldn't afford it, your soul was
                left to the banks of the river.
              </p>

              <p>
                Acheron also flows through the Necromantion, where the very
                famous and popular oracle of Necromantion could talk to the
                dead. The ruins of Necromantion still exists.
              </p>

              <p>
                A village called Glyki lies at the bottom of the valley, where
                part of the river comes down from the mountains through a
                canyon. This is the place where the most Springs of Acheron are.
                Above the canyon is Souli's Castle where a war between Greeks
                and Turks were taken place.
              </p>
            </>
          ) : (
            <>
              <p>
                Ο Αχέροντας (Ἀχέρων/ λατ. Styx) είναι ένας ποταμός μήκους 58 χλμ
                που ξεκινά κοντά στα Ιωάννινα, στην περιοχή της Ηπείρου.
                Εκβάλλει στο Ιόνιο Πέλαγος στην Αμμουδιά, κοντά στην Πάργα.
              </p>

              <p>
                Στην ελληνική μυθολογία ο Αχέροντας ήταν γνωστός ως ο ποταμός
                του Κάτω Κόσμου. Οι ψυχές των νεκρών μεταφέρονταν στον Κάτω
                Κόσμο από τον βαρκάρη του Άδη, τον Χάροντα. Φυσικά έπρεπε να
                πληρώσεις στον Χάρο δύο νομίσματα για να φτάσεις εκεί και αν δεν
                μπορούσες να το αντέξεις οικονομικά, η ψυχή σου έμενε στις όχθες
                του ποταμού.
              </p>

              <p>
                Ο Αχέροντας επίσης ρέει μέσα από το Νεκρομαντείο, όπου το πολύ
                διάσημο και δημοφιλές μαντείο του Νεκρομαντείου μπορούσε να
                μιλήσει με τους νεκρούς. Τα ερείπια του Νεκρομαντείου υπάρχουν
                ακόμα.
              </p>

              <p>
                Ένα χωριό που ονομάζεται Γλυκή βρίσκεται στον πάτο της κοιλάδας,
                όπου μέρος του ποταμού κατεβαίνει από τα βουνά μέσα από ένα
                φαράγγι. Αυτό είναι το μέρος όπου βρίσκονται οι περισσότερες
                Πηγές του Αχέροντα. Πάνω από το φαράγγι είναι το Κάστρο του
                Σουλίου όπου έγινε πόλεμος μεταξύ Ελλήνων και Τούρκων.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Enhanced details content with Natura 2000 logo
  const detailsContent = (
    <div
      className={`
        group relative transform overflow-hidden rounded-2xl p-6 shadow-xl
        transition-all duration-500
        hover:scale-[1.01]
      `}
    >
      {/* Background layers */}
      <div
        className={`
          absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-[#f5f0e8]/95
          via-white/90 to-[#f5f0e8]/95 backdrop-blur-md
        `}
      />
      <div className="absolute inset-0 -z-20 rounded-2xl bg-[#6b8362]/5" />

      {/* Decorative effects */}
      <div
        className={`
          pointer-events-none absolute -inset-[3px] -z-10 rounded-2xl opacity-70
        `}
      >
        <div
          className={`
            absolute inset-0 rounded-2xl bg-linear-to-tr from-amber-200/30
            via-transparent to-[#6b8362]/20
          `}
        />
      </div>
      <div
        className={`
          pointer-events-none absolute inset-0 rounded-2xl border
          border-amber-200/30
        `}
      />

      {/* Title with underline effect */}
      <h2
        className={`
          ${robotoSlab.variable}
          relative mb-6 inline-block font-roboto-slab text-3xl font-bold
          text-[#3E5A35]
          md:text-4xl
        `}
      >
        {t.riverVillage.detailsTitle}
        <div
          className={`
            absolute -bottom-2 left-0 h-[2px] w-full bg-linear-to-r
            from-transparent via-[#6b8362]/70 to-transparent
          `}
        />
      </h2>

      {/* Content */}
      <div className="prose max-w-none text-gray-700">
        <div className="space-y-4">
          {language === "en" ? (
            <>
              <p>
                Acheron river has been acknowledged by its strange energy that
                attracts spiritual people of all kind. There are many stories of
                a strange healing power that lies beyond the surface of the
                clear water. It was believed that Acheron had miraculous powers
                and could make someone invulnerable. According to one tradition,
                Achilles was dipped in it in his childhood, acquiring
                invulnerability, with exception of his heel, by which his mother
                held him. This is the source of the expression Achilles' heel, a
                metaphor for a vulnerable spot.
              </p>

              <p>
                The nature around the river is very rich with flora and fauna
                and it is protected by EU's Natura 2000 program.
              </p>
            </>
          ) : (
            <>
              <p>
                Ο ποταμός Αχέροντας έχει αναγνωριστεί για την παράξενη ενέργειά
                του που προσελκύει πνευματικούς ανθρώπους κάθε είδους. Υπάρχουν
                πολλές ιστορίες για μια παράξενη θεραπευτική δύναμη που
                βρίσκεται πέρα από την επιφάνεια του καθαρού νερού. Πιστευόταν
                ότι ο Αχέροντας είχε θαυματουργές δυνάμεις και μπορούσε να κάνει
                κάποιον άτρωτο. Σύμφωνα με μια παράδοση, ο Αχιλλέας βυθίστηκε σε
                αυτόν στην παιδική του ηλικία, αποκτώντας ατρωσία, με εξαίρεση
                τη φτέρνα του, από την οποία τον κρατούσε η μητέρα του. Αυτή
                είναι η πηγή της έκφρασης "φτέρνα του Αχίλλειου", μεταφορά για
                ένα ευάλωτο σημείο.
              </p>

              <p>
                Η φύση γύρω από τον ποταμό είναι πολύ πλούσια σε χλωρίδα και
                πανίδα και προστατεύεται από το πρόγραμμα Natura 2000 της ΕΕ.
              </p>
            </>
          )}
        </div>

        {/* Natura 2000 logo with enhanced styling */}
        <div className="mt-8 flex flex-col items-center">
          <p className="mb-3 text-center text-sm text-gray-600 italic">
            {language === "en"
              ? "Protected by EU's Natura 2000 program"
              : "Προστατεύεται από το πρόγραμμα Natura 2000 της ΕΕ"}
          </p>
          <div
            className={`
              relative h-32 w-48 rounded-xl border border-amber-100/70
              bg-white/80 p-3 shadow-lg transition-shadow duration-300
              hover:shadow-xl
            `}
          >
            <OptimizedImage
              src="/images/natura_2000.png"
              alt="Natura 2000 Logo"
              fill
              sizes="192px"
              className="object-contain"
              imageType="logo"
            />
            <div
              className={`
                absolute -inset-[1px] -z-10 rounded-xl bg-linear-to-tr
                from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-xs
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ActivityPageLayout
      title={t.riverVillage.pageTitle}
      subtitle={t.riverVillage.pageSubtitle}
      descriptionTitle=""
      descriptionContent={descriptionContent}
      detailsTitle={t.riverVillage.detailsTitle}
      detailsContent={detailsContent}
      pricingTitle=""
      pricingContent={null}
      useSingleColumn={true}
    />
  );
}
