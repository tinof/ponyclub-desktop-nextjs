import { Metadata } from 'next'
import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/OptimizedImage' // Import OptimizedImage
import ResponsiveNavigation from '@/components/responsive-navigation'
import { Roboto_Slab } from 'next/font/google'

// Define Roboto Slab font instance
const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  variable: '--font-roboto-slab',
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Για τα σχολεία | Pony Club',
  description: 'Προγράμματα εκδρομών για σχολεία στις πηγές του Αχέροντα',
}

export default function ForSchoolsPage() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F2] border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div> {/* Removed absolute positioning and elaborate styling from this div */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16"> {/* Simplified styling */}
              <OptimizedImage
                src="/images/ponyclub_logo.png"
                alt="Pony Club Logo"
                fill
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-contain p-1"
                imageType="logo"
              />
              {/* Removed decorative inset div */}
            </div>
          </Link>
        </div>

        {/* Responsive Navigation */}
        <div> {/* Removed absolute positioning from this div */}
          <ResponsiveNavigation />
        </div>
      </header>

      <main className="relative min-h-screen bg-[#f5f0e8] overflow-hidden pt-20"> {/* Added pt-20 for fixed header */}
        {/* Hero Section */}
        {/* mt-16 was removed from here as main now has pt-20 */}
        <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden shadow-xl border border-amber-200/30">
          <OptimizedImage 
            src="/images/Campus_Kids_New_Jersey_Archery_03.JPG" 
            alt="Παιδιά σε σχολική εκδρομή" 
            fill 
            className="object-cover object-[center_20%]"
            priority
            imageType="hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
        </div>
        
        {/* Hero Title Box */}
        <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16">
          <div className="relative bg-amber-800/40 px-8 py-6 rounded-2xl max-w-3xl shadow-xl border-2 border-amber-200/50 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-300">
            <h1 className={`${robotoSlab.variable} font-roboto-slab text-amber-50 text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-bold px-4`}>
              <span className="block mb-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">ΓΙΑ ΤΑ ΣΧΟΛΕΙΑ</span>
              <span className="block font-extrabold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">ΕΚΔΡΟΜΕΣ ΣΤΟΝ ΑΧΕΡΟΝΤΑ</span>
            </h1>
            <div className="absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-b from-amber-200/20 to-transparent blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Text Banner */}
      <div className="relative mx-4 -mt-8 z-20">
        <div className="bg-white/90 backdrop-blur-sm py-4 px-6 rounded-lg shadow-lg border border-amber-100 max-w-3xl mx-auto">
          <p className={`${robotoSlab.variable} font-roboto-slab text-lg md:text-xl text-center text-amber-800`}>
            Εκδρομή στις πηγές του Αχέροντα – με ράφτινγκ, τοξοβολία, πεζοπορία από 7 ευρώ
          </p>
          <div className="absolute -inset-[0.5px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/30 via-[#6b8362]/20 to-amber-200/30 blur-sm"></div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex flex-col gap-8">
        {/* Main Content */}
        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="relative mb-8">
                <h3 className="text-2xl font-bold text-[#6b8362] mb-4 inline-block">
                  ΠΕΡΙΠΕΤΕΙΑΤΙΚΟ ΠΡΟΓΡΑΜΜΑ
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#6b8362]/10 text-[#6b8362] font-bold flex-shrink-0">
                    <span>9-10</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Άφιξη στον μυστηριώδη χώρο της περιπέτειας.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#6b8362]/10 text-[#6b8362] font-bold flex-shrink-0">
                    <span>10-10:30</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Ενώνουμε τις δυνάμεις μας και αποκτούμε γνώσεις για το ταξίδι μας στις πηγές του ποταμού.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#6b8362]/10 text-[#6b8362] font-bold flex-shrink-0">
                    <span>10:30-13</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Εξερευνούμε τα μυστικά μονοπάτια και πραγματοποιούμε διάφορες αποστολές σε ομάδες.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#6b8362]/10 text-[#6b8362] font-bold flex-shrink-0">
                    <span>13-14</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Απολαμβάνουμε ένα θαυμάσιο γεύμα και επιστρέφουμε με νέες ιστορίες να μοιραστούμε.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-amber-100/50">
                  <OptimizedImage 
                    src="/images/children_rafting_activity_bright_outdoors.jpg"
                    alt="Σχολική εκδρομή στον Αχέροντα" 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-amber-100/50 mb-10">
                <OptimizedImage 
                  src="/images/Rafting_Group_YellowHelmets_OutdoorRiver.jpg" 
                  alt="Παιδιά σε δραστηριότητες" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="relative mb-8">
                <h3 className="text-2xl font-bold text-[#6b8362] mb-4 inline-block">
                  ΟΙ ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ ΠΟΥ ΘΑ ΚΑΝΟΥΜΕ
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
                </h3>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#6b8362]">ΕΞΕΡΕΥΝΗΣΤΕ ΤΟ ΑΠΙΣΤΕΥΤΟ</h2>
                
                <div className="border-l-4 border-[#6b8362] pl-4 my-4 hover:bg-[#6b8362]/5 transition-colors rounded-r-lg">
                  <h3 className="text-xl font-semibold text-[#6b8362] mb-2">1. ΡΑΦΤΙΝΓΚ ΜΕ ΤΗΝ ΟΙΚΟΓΕΝΕΙΑ</h3>
                  <p className="text-gray-700">Κατευθυνθείτε σε μια συναρπαστική περιπέτεια μέσα από ειδικές διαδρομές για μικρούς και μεγάλους!</p>
                </div>
                
                <div className="border-l-4 border-[#6b8362] pl-4 my-4 hover:bg-[#6b8362]/5 transition-colors rounded-r-lg">
                  <h3 className="text-xl font-semibold text-[#6b8362] mb-2">2. ΑΝΑΚΑΛΥΨΤΕ ΤΙΣ ΠΗΓΕΣ</h3>
                  <p className="text-gray-700">Περπατήστε στα μονοπάτια της φύσης και ανακαλύψτε τις μυστικές πηγές και τους κρυστάλλινους ποταμούς.</p>
                </div>
                
                <div className="border-l-4 border-[#6b8362] pl-4 my-4 hover:bg-[#6b8362]/5 transition-colors rounded-r-lg">
                  <h3 className="text-xl font-semibold text-[#6b8362] mb-2">3. ΤΟΞΟΒΟΛΙΑ ΣΤΗ ΦΥΣΗ</h3>
                  <p className="text-gray-700">Αφήστε την απόλυτη ελευθερία να σας κατακτήσει σε μια συναρπαστική εμπειρία τοξοβολίας στη φύση.</p>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50/50 rounded-lg">
                  <p className="text-gray-700">Τιμή: <strong className="text-[#6b8362]">7 ευρώ</strong> ανά άτομο.</p>
                  <p className="text-gray-700">Προαιρετική επιλογή για βόλτα με άλογα: <strong className="text-[#6b8362]">5 ευρώ</strong> ανά άτομο.</p>
                  <p className="text-gray-700">Οι τιμές περιλαμβάνουν όλον τον απαραίτητο εξοπλισμό και τις τοπικές μετακινήσεις.</p>
                </div>
                
                <div className="mt-4 p-4 bg-[#6b8362]/10 rounded-lg">
                  <p className="text-gray-700">Στον χώρο της εκδρομής, θα βρείτε εστιατόρια με αυθεντική κουζίνα και άριστη υποδομή, όπου μπορείτε να απολαύσετε γεύματα με θέα στη φύση, με τιμές από <strong className="text-[#6b8362]">7 έως 10 ευρώ</strong> ανά άτομο.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300 mb-8">
          <h2 className="text-3xl font-bold text-[#6b8362] mb-8 text-center">
            <span className="relative inline-block">
              ΦΩΤΟΓΡΑΦΙΕΣ ΣΧΟΛΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ
              <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-amber-100/50 hover:shadow-xl transition-all duration-300">
              <OptimizedImage 
                src="/images/Children_In_Lifejackets_Colorful_OutdoorScene_Riverside.jpg" 
                alt="Παιδιά σε δραστηριότητες ράφτινγκ" 
                fill 
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-amber-100/50 hover:shadow-xl transition-all duration-300">
              <OptimizedImage 
                src="/images/ChildrenRafting_GreenOutdoor_Adventurous_RiverScene.jpg" 
                alt="Παιδιά σε περιπέτεια ράφτινγκ" 
                fill 
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-amber-100/50 hover:shadow-xl transition-all duration-300">
              <OptimizedImage 
                src="/images/Hiking_Group_Green_Nature_Stream.jpg" 
                alt="Ομάδα σε πεζοπορία στη φύση" 
                fill 
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mb-12">
        <div className="relative bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-md border border-amber-100/50 text-center">
          <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#6b8362]">Κλείστε τώρα την εκδρομή του σχολείου σας!</h2>
          <p className="text-lg mb-8 text-gray-700">
            Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες και για να οργανώσουμε μαζί την τέλεια εκδρομή για τους μαθητές σας.
          </p>
          <div>
            <Link 
              href="mailto:info@ponyclub.gr" 
              className="relative inline-flex items-center justify-center px-8 py-3 bg-[#6b8362] text-white font-medium rounded-full shadow-md hover:bg-[#6b8362]/90 hover:shadow-lg transition-all"
            >
              <span>Επικοινωνήστε μαζί μας</span>
              <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
            </Link>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
