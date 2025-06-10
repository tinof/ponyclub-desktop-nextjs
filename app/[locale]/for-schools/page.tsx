import { Metadata } from 'next'
import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import ResponsiveNavigation from '@/components/responsive-navigation'
import { Roboto_Slab } from 'next/font/google'
import { PulsatingButton } from '@/components/ui/pulsating-button'
import { BorderBeam } from '@/components/ui/border-beam'
import { GridPattern } from '@/components/ui/grid-pattern'
import { NumberTicker } from '@/components/ui/number-ticker'
import {
  Clock,
  Users,
  Target,
  Waves,
  Mountain,
  TreePine,
  Camera,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Calendar,
  Euro
} from 'lucide-react'

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
        <div>
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16">
              <OptimizedImage
                src="/images/ponyclub_logo.png"
                alt="Pony Club Logo"
                fill
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-contain p-1"
                imageType="logo"
              />
            </div>
          </Link>
        </div>

        {/* Responsive Navigation */}
        <div>
          <ResponsiveNavigation />
        </div>
      </header>

      <main className="relative min-h-screen bg-gradient-to-br from-[#f5f0e8] via-[#faf7f2] to-[#f0ebe3] overflow-hidden pt-20">
        {/* Background Pattern */}
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="absolute inset-0 h-full w-full stroke-[#6b8362]/5 opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]"
        />

        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
          <div className="absolute inset-0 m-4 rounded-3xl overflow-hidden shadow-2xl border border-amber-200/30">
            <OptimizedImage
              src="/images/Children_In_Lifejackets_Colorful_OutdoorScene_Riverside.jpg"
              alt="Παιδιά σε σχολική εκδρομή στον Αχέροντα"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              priority
              imageType="hero"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>

          {/* Hero Title Box */}
          <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gradient-to-br from-amber-800/60 to-amber-900/70 px-8 py-6 rounded-3xl max-w-4xl shadow-2xl border border-amber-200/30 backdrop-blur-md transform hover:scale-[1.02] transition-all duration-500">
                <h1 className={`${robotoSlab.variable} font-roboto-slab text-amber-50 text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-bold px-4`}>
                  <span className="block mb-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] animate-pulse">ΓΙΑ ΤΑ ΣΧΟΛΕΙΑ</span>
                  <span className="block font-extrabold tracking-wide text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">ΕΚΔΡΟΜΕΣ ΣΤΟΝ ΑΧΕΡΟΝΤΑ</span>
                </h1>
                <div className="flex justify-center mt-4 space-x-2">
                  <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Hero Bottom Text Banner */}
      <div className="relative mx-4 -mt-8 z-20">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362] to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-white/95 backdrop-blur-md py-6 px-8 rounded-2xl shadow-xl border border-amber-100/50 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#6b8362]" />
                <span className={`${robotoSlab.variable} font-roboto-slab text-lg md:text-xl font-semibold text-[#6b8362]`}>
                  Πηγές του Αχέροντα
                </span>
              </div>
              <div className="hidden md:block w-px h-6 bg-amber-300"></div>
              <div className="flex items-center space-x-2">
                <Euro className="w-5 h-5 text-amber-600" />
                <span className={`${robotoSlab.variable} font-roboto-slab text-lg md:text-xl font-bold text-amber-800`}>
                  Από <NumberTicker value={7} /> ευρώ
                </span>
              </div>
            </div>
            <p className={`${robotoSlab.variable} font-roboto-slab text-base md:text-lg text-center text-gray-700 mt-2`}>
              Ράφτινγκ • Τοξοβολία • Πεζοπορία • Ιππασία
            </p>
            <BorderBeam size={250} duration={15} delay={5} />
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl flex flex-col gap-12">

        {/* Program Schedule Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362]/20 to-amber-600/20 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-amber-100/50">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Calendar className="w-8 h-8 text-[#6b8362]" />
                <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl font-bold text-[#6b8362]`}>
                  ΠΕΡΙΠΕΤΕΙΑΤΙΚΟ ΠΡΟΓΡΑΜΜΑ
                </h2>
                <Calendar className="w-8 h-8 text-[#6b8362]" />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6b8362] to-amber-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Timeline */}
              <div className="space-y-8">
                {[
                  {
                    time: "9:00-10:00",
                    icon: MapPin,
                    title: "Άφιξη & Υποδοχή",
                    description: "Άφιξη στον μυστηριώδη χώρο της περιπέτειας και γνωριμία με το περιβάλλον."
                  },
                  {
                    time: "10:00-10:30",
                    icon: Users,
                    title: "Ομαδοποίηση & Briefing",
                    description: "Ενώνουμε τις δυνάμεις μας και αποκτούμε γνώσεις για το ταξίδι μας στις πηγές του ποταμού."
                  },
                  {
                    time: "10:30-13:00",
                    icon: Target,
                    title: "Δραστηριότητες & Εξερεύνηση",
                    description: "Εξερευνούμε τα μυστικά μονοπάτια και πραγματοποιούμε διάφορες αποστολές σε ομάδες."
                  },
                  {
                    time: "13:00-14:00",
                    icon: Star,
                    title: "Γεύμα & Επιστροφή",
                    description: "Απολαμβάνουμε ένα θαυμάσιο γεύμα και επιστρέφουμε με νέες ιστορίες να μοιραστούμε."
                  }
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="flex items-start space-x-6">
                      <div className="relative">
                        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#6b8362] to-[#5a7354] text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#6b8362] to-amber-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                            {item.time}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#6b8362] mb-2">{item.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="absolute left-8 top-16 w-px h-8 bg-gradient-to-b from-[#6b8362]/50 to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Program Image */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-[#6b8362] rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-amber-100/50">
                  <OptimizedImage
                    src="/images/children_rafting_activity_bright_outdoors.jpg"
                    alt="Σχολική εκδρομή στον Αχέροντα"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <BorderBeam size={250} duration={20} delay={10} />
                </div>
              </div>
            </div>
            <BorderBeam size={300} duration={15} delay={0} />
          </div>
        </div>

        {/* Activities Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-[#6b8362]/20 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-amber-100/50">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8 text-[#6b8362]" />
                <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl font-bold text-[#6b8362]`}>
                  ΟΙ ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ ΠΟΥ ΘΑ ΚΑΝΟΥΜΕ
                </h2>
                <Target className="w-8 h-8 text-[#6b8362]" />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6b8362] to-amber-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Hero Image */}
              <div className="relative group order-2 lg:order-1">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362] to-amber-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-amber-100/50">
                  <OptimizedImage
                    src="/images/Rafting_Group_YellowHelmets_OutdoorRiver.jpg"
                    alt="Παιδιά σε δραστηριότητες"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <BorderBeam size={250} duration={18} delay={7} />
                </div>
              </div>

              {/* Activities List */}
              <div className="space-y-8 order-1 lg:order-2">
                <div className="text-center lg:text-left mb-8">
                  <h3 className={`${robotoSlab.variable} font-roboto-slab text-2xl md:text-3xl font-bold text-[#6b8362] mb-4`}>
                    ΕΞΕΡΕΥΝΗΣΤΕ ΤΟ ΑΠΙΣΤΕΥΤΟ
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#6b8362] to-amber-600 mx-auto lg:mx-0 rounded-full"></div>
                </div>

                {[
                  {
                    icon: Waves,
                    title: "ΡΑΦΤΙΝΓΚ ΜΕ ΤΗΝ ΟΙΚΟΓΕΝΕΙΑ",
                    description: "Κατευθυνθείτε σε μια συναρπαστική περιπέτεια μέσα από ειδικές διαδρομές για μικρούς και μεγάλους!",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: TreePine,
                    title: "ΑΝΑΚΑΛΥΨΤΕ ΤΙΣ ΠΗΓΕΣ",
                    description: "Περπατήστε στα μονοπάτια της φύσης και ανακαλύψτε τις μυστικές πηγές και τους κρυστάλλινους ποταμούς.",
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: Target,
                    title: "ΤΟΞΟΒΟΛΙΑ ΣΤΗ ΦΥΣΗ",
                    description: "Αφήστε την απόλυτη ελευθερία να σας κατακτήσει σε μια συναρπαστική εμπειρία τοξοβολίας στη φύση.",
                    color: "from-amber-500 to-orange-500"
                  }
                ].map((activity, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362]/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-amber-100/50 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${activity.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <activity.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-[#6b8362] mb-2 group-hover:text-[#5a7354] transition-colors">
                            {index + 1}. {activity.title}
                          </h4>
                          <p className="text-gray-700 leading-relaxed">{activity.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pricing Cards */}
                <div className="mt-8 space-y-4">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362] to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-2xl border border-amber-200/50 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Euro className="w-6 h-6 text-[#6b8362]" />
                          <span className="text-lg font-semibold text-gray-800">Βασικό Πρόγραμμα</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#6b8362]">
                            <NumberTicker value={7} /> ευρώ
                          </div>
                          <div className="text-sm text-gray-600">ανά άτομο</div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Ράφτινγκ", "Τοξοβολία", "Πεζοπορία", "Εξοπλισμός"].map((item, idx) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#6b8362]/10 text-[#6b8362]">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl border border-orange-200/50 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mountain className="w-6 h-6 text-amber-600" />
                          <span className="text-lg font-semibold text-gray-800">Με Ιππασία</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-amber-600">
                            +<NumberTicker value={5} /> ευρώ
                          </div>
                          <div className="text-sm text-gray-600">προαιρετικά</div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-700">Βόλτα με εκπαιδευμένα άλογα στη φύση</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362]/10 to-amber-600/10 rounded-2xl blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-[#6b8362]/5 to-amber-50/50 p-6 rounded-2xl border border-[#6b8362]/20">
                    <div className="flex items-start space-x-3">
                      <Star className="w-6 h-6 text-[#6b8362] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#6b8362] mb-2">Γεύματα & Εστίαση</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Στον χώρο της εκδρομής, θα βρείτε εστιατόρια με αυθεντική κουζίνα και άριστη υποδομή,
                          όπου μπορείτε να απολαύσετε γεύματα με θέα στη φύση, με τιμές από{' '}
                          <span className="font-bold text-[#6b8362]">
                            <NumberTicker value={7} /> έως <NumberTicker value={10} /> ευρώ
                          </span>{' '}
                          ανά άτομο.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BorderBeam size={300} duration={20} delay={5} />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362]/20 to-amber-600/20 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-amber-100/50">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Camera className="w-8 h-8 text-[#6b8362]" />
                <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl font-bold text-[#6b8362]`}>
                  ΦΩΤΟΓΡΑΦΙΕΣ ΣΧΟΛΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ
                </h2>
                <Camera className="w-8 h-8 text-[#6b8362]" />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6b8362] to-amber-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  src: "/images/Children_In_Lifejackets_Colorful_OutdoorScene_Riverside.jpg",
                  alt: "Παιδιά σε δραστηριότητες ράφτινγκ",
                  title: "Ράφτινγκ Περιπέτεια"
                },
                {
                  src: "/images/ChildrenRafting_GreenOutdoor_Adventurous_RiverScene.jpg",
                  alt: "Παιδιά σε περιπέτεια ράφτινγκ",
                  title: "Ομαδική Δραστηριότητα"
                },
                {
                  src: "/images/Hiking_Group_Green_Nature_Stream.jpg",
                  alt: "Ομάδα σε πεζοπορία στη φύση",
                  title: "Εξερεύνηση Φύσης"
                }
              ].map((image, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362] to-amber-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-700"></div>
                  <div className="relative">
                    <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-amber-100/50">
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <h3 className="text-white font-bold text-lg drop-shadow-lg">{image.title}</h3>
                      </div>
                    </div>
                    <BorderBeam size={200} duration={15 + index * 3} delay={index * 2} />
                  </div>
                </div>
              ))}
            </div>
            <BorderBeam size={350} duration={25} delay={8} />
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6b8362] to-amber-600 rounded-3xl blur opacity-20"></div>
          <div className="relative bg-gradient-to-br from-white/95 to-amber-50/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-amber-100/50 text-center overflow-hidden">
            {/* Background Pattern */}
            <GridPattern
              width={40}
              height={40}
              x={-1}
              y={-1}
              className="absolute inset-0 h-full w-full stroke-[#6b8362]/5 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center space-x-3 mb-6">
                <Star className="w-10 h-10 text-amber-500 animate-pulse" />
                <h2 className={`${robotoSlab.variable} font-roboto-slab text-3xl md:text-4xl lg:text-5xl font-bold text-[#6b8362]`}>
                  Κλείστε τώρα την εκδρομή του σχολείου σας!
                </h2>
                <Star className="w-10 h-10 text-amber-500 animate-pulse" />
              </div>

              <div className="w-32 h-1 bg-gradient-to-r from-[#6b8362] to-amber-600 mx-auto rounded-full mb-8"></div>

              <p className="text-xl md:text-2xl mb-12 text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες και για να οργανώσουμε μαζί την τέλεια εκδρομή για τους μαθητές σας.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <PulsatingButton
                  className="relative group bg-gradient-to-r from-[#6b8362] to-[#5a7354] hover:from-[#5a7354] hover:to-[#4a6244] text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                  pulseColor="#6b8362"
                >
                  <Link href="mailto:info@ponyclub.gr" className="flex items-center space-x-3">
                    <span className="text-lg">Επικοινωνήστε μαζί μας</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </PulsatingButton>

                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-[#6b8362]" />
                    <span>Άμεση απάντηση</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Δωρεάν προσφορά</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-100/50 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <div className="w-10 h-10 bg-[#6b8362] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#6b8362]">Email</div>
                      <div className="text-gray-700">info@ponyclub.gr</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📞</span>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-700">Τηλέφωνο</div>
                      <div className="text-gray-700">+30 698 661 7090</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <BorderBeam size={400} duration={20} delay={0} />
          </div>
        </div>
      </div>
      </main>
    </>
  )
}
