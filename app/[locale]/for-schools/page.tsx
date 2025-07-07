import {
  ArrowRight,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  Euro,
  MapPin,
  Mountain,
  Star,
  Target,
  TreePine,
  Users,
  Waves,
} from "lucide-react";

// PERFORMANCE OPTIMIZATION: ISR configuration for content pages
// School program content may change periodically (pricing, programs, seasonal updates)
export const revalidate = 7200; // Revalidate every 2 hours

import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import Link from "next/link";

import ResponsiveNavigation from "@/components/responsive-navigation";
import { BorderBeam } from "@/components/ui/border-beam";
import { GridPattern } from "@/components/ui/grid-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { PulsatingButton } from "@/components/ui/pulsating-button";

// Define Roboto Slab font instance
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  variable: "--font-roboto-slab",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Για τα σχολεία | Pony Club",
  description: "Προγράμματα εκδρομών για σχολεία στις πηγές του Αχέροντα",
};

export default function ForSchoolsPage() {
  return (
    <>
      <header
        className={`
          fixed top-0 right-0 left-0 z-40 flex items-center justify-between
          border-b border-gray-200 bg-[#FAF7F2] px-4 py-3
          sm:px-6
          lg:px-8
        `}
      >
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center">
            <div
              className={`
                relative h-12 w-48
                md:h-14 md:w-56
                lg:h-16 lg:w-64
              `}
            >
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

      <main
        className={`
          relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f5f0e8]
          via-[#faf7f2] to-[#f0ebe3] pt-20
        `}
      >
        {/* Background Pattern */}
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className={`
            absolute inset-0 h-full w-full stroke-[#6b8362]/5 opacity-30
            [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]
          `}
        />

        {/* Hero Section */}
        <div
          className={`
            relative h-[60vh] w-full
            md:h-[70vh]
            lg:h-[80vh]
          `}
        >
          <div
            className={`
              absolute inset-0 m-4 overflow-hidden rounded-3xl border
              border-amber-200/30 shadow-2xl
            `}
          >
            <OptimizedImage
              src="/images/Children_In_Lifejackets_Colorful_OutdoorScene_Riverside.jpg"
              alt="Παιδιά σε σχολική εκδρομή στον Αχέροντα"
              fill
              className={`
                object-cover object-center transition-transform duration-700
                hover:scale-105
              `}
              priority
              imageType="hero"
            />
            <div
              className={`
                absolute inset-0 bg-gradient-to-b from-black/20 via-transparent
                to-black/40
              `}
            />
            <BorderBeam size={250} duration={12} delay={9} />
          </div>

          {/* Hero Title Box */}
          <div
            className={`
              absolute inset-0 flex items-start justify-center pt-10
              md:pt-16
            `}
          >
            <div className="group relative">
              <div
                className={`
                  absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-600
                  to-orange-600 opacity-25 blur transition duration-1000
                  group-hover:opacity-40 group-hover:duration-200
                `}
              />
              <div
                className={`
                  relative max-w-4xl transform rounded-3xl border
                  border-amber-200/30 bg-gradient-to-br from-amber-800/60
                  to-amber-900/70 px-8 py-6 shadow-2xl backdrop-blur-md
                  transition-all duration-500
                  hover:scale-[1.02]
                `}
              >
                <h1
                  className={`
                    ${robotoSlab.variable}
                    px-4 text-center font-roboto-slab text-4xl leading-tight
                    font-bold text-amber-50
                    md:text-5xl
                    lg:text-6xl
                  `}
                >
                  <span
                    className={`
                      mb-3 block animate-pulse
                      drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                    `}
                  >
                    ΓΙΑ ΤΑ ΣΧΟΛΕΙΑ
                  </span>
                  <span
                    className={`
                      block font-extrabold tracking-wide text-white
                      drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]
                    `}
                  >
                    ΕΚΔΡΟΜΕΣ ΣΤΟΝ ΑΧΕΡΟΝΤΑ
                  </span>
                </h1>
                <div className="mt-4 flex justify-center space-x-2">
                  <div
                    className={`
                      h-2 w-2 animate-bounce rounded-full bg-amber-300
                    `}
                  />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-amber-300"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-amber-300"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Text Banner */}
        <div className="relative z-20 mx-4 -mt-8">
          <div className="group relative">
            <div
              className={`
                absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#6b8362]
                to-amber-600 opacity-20 blur transition duration-1000
                group-hover:opacity-30
              `}
            />
            <div
              className={`
                relative mx-auto max-w-4xl rounded-2xl border
                border-amber-100/50 bg-white/95 px-8 py-6 shadow-xl
                backdrop-blur-md
              `}
            >
              <div
                className={`
                  flex flex-wrap items-center justify-center space-x-4
                `}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-[#6b8362]" />
                  <span
                    className={`
                      ${robotoSlab.variable}
                      font-roboto-slab text-lg font-semibold text-[#6b8362]
                      md:text-xl
                    `}
                  >
                    Πηγές του Αχέροντα
                  </span>
                </div>
                <div
                  className={`
                    hidden h-6 w-px bg-amber-300
                    md:block
                  `}
                />
                <div className="flex items-center space-x-2">
                  <Euro className="h-5 w-5 text-amber-600" />
                  <span
                    className={`
                      ${robotoSlab.variable}
                      font-roboto-slab text-lg font-bold text-amber-800
                      md:text-xl
                    `}
                  >
                    Από <NumberTicker value={7} /> ευρώ
                  </span>
                </div>
              </div>
              <p
                className={`
                  ${robotoSlab.variable}
                  mt-2 text-center font-roboto-slab text-base text-gray-700
                  md:text-lg
                `}
              >
                Ράφτινγκ • Τοξοβολία • Πεζοπορία • Ιππασία
              </p>
              <BorderBeam size={250} duration={15} delay={5} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div
          className={`
            container mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16
            sm:px-6
            lg:px-8
          `}
        >
          {/* Program Schedule Section */}
          <div className="relative">
            <div
              className={`
                absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#6b8362]/20
                to-amber-600/20 opacity-30 blur
              `}
            />
            <div
              className={`
                relative rounded-3xl border border-amber-100/50 bg-white/90 p-8
                shadow-xl backdrop-blur-md
              `}
            >
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-[#6b8362]" />
                  <h2
                    className={`
                      ${robotoSlab.variable}
                      font-roboto-slab text-3xl font-bold text-[#6b8362]
                      md:text-4xl
                    `}
                  >
                    ΠΕΡΙΠΕΤΕΙΑΤΙΚΟ ΠΡΟΓΡΑΜΜΑ
                  </h2>
                  <Calendar className="h-8 w-8 text-[#6b8362]" />
                </div>
                <div
                  className={`
                    mx-auto h-1 w-24 rounded-full bg-gradient-to-r
                    from-[#6b8362] to-amber-600
                  `}
                />
              </div>

              <div
                className={`
                  grid grid-cols-1 items-start gap-12
                  lg:grid-cols-2
                `}
              >
                {/* Timeline */}
                <div className="space-y-8">
                  {[
                    {
                      time: "9:00-10:00",
                      icon: MapPin,
                      title: "Άφιξη & Υποδοχή",
                      description:
                        "Άφιξη στον μυστηριώδη χώρο της περιπέτειας και γνωριμία με το περιβάλλον.",
                    },
                    {
                      time: "10:00-10:30",
                      icon: Users,
                      title: "Ομαδοποίηση & Briefing",
                      description:
                        "Ενώνουμε τις δυνάμεις μας και αποκτούμε γνώσεις για το ταξίδι μας στις πηγές του ποταμού.",
                    },
                    {
                      time: "10:30-13:00",
                      icon: Target,
                      title: "Δραστηριότητες & Εξερεύνηση",
                      description:
                        "Εξερευνούμε τα μυστικά μονοπάτια και πραγματοποιούμε διάφορες αποστολές σε ομάδες.",
                    },
                    {
                      time: "13:00-14:00",
                      icon: Star,
                      title: "Γεύμα & Επιστροφή",
                      description:
                        "Απολαμβάνουμε ένα θαυμάσιο γεύμα και επιστρέφουμε με νέες ιστορίες να μοιραστούμε.",
                    },
                  ].map((item, index) => (
                    <div
                      key={`schedule-${item.time}-${item.title}`}
                      className="group relative"
                    >
                      <div className="flex items-start space-x-6">
                        <div className="relative">
                          <div
                            className={`
                              flex h-16 w-16 items-center justify-center
                              rounded-2xl bg-gradient-to-br from-[#6b8362]
                              to-[#5a7354] font-bold text-white shadow-lg
                              transition-transform duration-300
                              group-hover:scale-110
                            `}
                          >
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div
                            className={`
                              absolute -inset-1 rounded-2xl bg-gradient-to-br
                              from-[#6b8362] to-amber-600 opacity-0 blur
                              transition duration-300
                              group-hover:opacity-30
                            `}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-amber-600" />
                            <span
                              className={`
                                rounded-full bg-amber-100 px-3 py-1 text-sm
                                font-bold text-amber-700
                              `}
                            >
                              {item.time}
                            </span>
                          </div>
                          <h3 className="mb-2 text-xl font-bold text-[#6b8362]">
                            {item.title}
                          </h3>
                          <p className="leading-relaxed text-gray-700">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {index < 3 && (
                        <div
                          className={`
                            absolute top-16 left-8 h-8 w-px bg-gradient-to-b
                            from-[#6b8362]/50 to-transparent
                          `}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Program Image */}
                <div className="group relative">
                  <div
                    className={`
                      absolute -inset-1 rounded-3xl bg-gradient-to-r
                      from-amber-600 to-[#6b8362] opacity-20 blur transition
                      duration-1000
                      group-hover:opacity-30
                    `}
                  />
                  <div
                    className={`
                      relative aspect-4/3 w-full overflow-hidden rounded-3xl
                      border border-amber-100/50 shadow-2xl
                    `}
                  >
                    <OptimizedImage
                      src="/images/children_rafting_activity_bright_outdoors.jpg"
                      alt="Σχολική εκδρομή στον Αχέροντα"
                      fill
                      imageType="content"
                      className={`
                        object-cover transition-transform duration-700
                        group-hover:scale-110
                      `}
                    />
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-t from-black/20
                        via-transparent to-transparent
                      `}
                    />
                    <BorderBeam size={250} duration={20} delay={10} />
                  </div>
                </div>
              </div>
              <BorderBeam size={300} duration={15} delay={0} />
            </div>
          </div>

          {/* Activities Section */}
          <div className="relative">
            <div
              className={`
                absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-600/20
                to-[#6b8362]/20 opacity-30 blur
              `}
            />
            <div
              className={`
                relative rounded-3xl border border-amber-100/50 bg-white/90 p-8
                shadow-xl backdrop-blur-md
              `}
            >
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center space-x-3">
                  <Target className="h-8 w-8 text-[#6b8362]" />
                  <h2
                    className={`
                      ${robotoSlab.variable}
                      font-roboto-slab text-3xl font-bold text-[#6b8362]
                      md:text-4xl
                    `}
                  >
                    ΟΙ ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ ΠΟΥ ΘΑ ΚΑΝΟΥΜΕ
                  </h2>
                  <Target className="h-8 w-8 text-[#6b8362]" />
                </div>
                <div
                  className={`
                    mx-auto h-1 w-24 rounded-full bg-gradient-to-r
                    from-[#6b8362] to-amber-600
                  `}
                />
              </div>

              <div
                className={`
                  grid grid-cols-1 items-start gap-12
                  lg:grid-cols-2
                `}
              >
                {/* Hero Image */}
                <div
                  className={`
                    group relative order-2
                    lg:order-1
                  `}
                >
                  <div
                    className={`
                      absolute -inset-1 rounded-3xl bg-gradient-to-r
                      from-[#6b8362] to-amber-600 opacity-20 blur transition
                      duration-1000
                      group-hover:opacity-30
                    `}
                  />
                  <div
                    className={`
                      relative aspect-4/3 w-full overflow-hidden rounded-3xl
                      border border-amber-100/50 shadow-2xl
                    `}
                  >
                    <OptimizedImage
                      src="/images/Rafting_Group_YellowHelmets_OutdoorRiver.jpg"
                      alt="Παιδιά σε δραστηριότητες"
                      fill
                      className={`
                        object-cover transition-transform duration-700
                        group-hover:scale-110
                      `}
                    />
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-t from-black/20
                        via-transparent to-transparent
                      `}
                    />
                    <BorderBeam size={250} duration={18} delay={7} />
                  </div>
                </div>

                {/* Activities List */}
                <div
                  className={`
                    order-1 space-y-8
                    lg:order-2
                  `}
                >
                  <div
                    className={`
                      mb-8 text-center
                      lg:text-left
                    `}
                  >
                    <h3
                      className={`
                        ${robotoSlab.variable}
                        mb-4 font-roboto-slab text-2xl font-bold text-[#6b8362]
                        md:text-3xl
                      `}
                    >
                      ΕΞΕΡΕΥΝΗΣΤΕ ΤΟ ΑΠΙΣΤΕΥΤΟ
                    </h3>
                    <div
                      className={`
                        mx-auto h-1 w-16 rounded-full bg-gradient-to-r
                        from-[#6b8362] to-amber-600
                        lg:mx-0
                      `}
                    />
                  </div>

                  {[
                    {
                      icon: Waves,
                      title: "ΡΑΦΤΙΝΓΚ ΜΕ ΤΗΝ ΟΙΚΟΓΕΝΕΙΑ",
                      description:
                        "Κατευθυνθείτε σε μια συναρπαστική περιπέτεια μέσα από ειδικές διαδρομές για μικρούς και μεγάλους!",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: TreePine,
                      title: "ΑΝΑΚΑΛΥΨΤΕ ΤΙΣ ΠΗΓΕΣ",
                      description:
                        "Περπατήστε στα μονοπάτια της φύσης και ανακαλύψτε τις μυστικές πηγές και τους κρυστάλλινους ποταμούς.",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      icon: Target,
                      title: "ΤΟΞΟΒΟΛΙΑ ΣΤΗ ΦΥΣΗ",
                      description:
                        "Αφήστε την απόλυτη ελευθερία να σας κατακτήσει σε μια συναρπαστική εμπειρία τοξοβολίας στη φύση.",
                      color: "from-amber-500 to-orange-500",
                    },
                  ].map((activity, index) => (
                    <div
                      key={`activity-${activity.title}`}
                      className="group relative"
                    >
                      <div
                        className={`
                          absolute -inset-1 rounded-2xl bg-gradient-to-r
                          from-[#6b8362]/20 to-amber-600/20 opacity-0 blur
                          transition duration-500
                          group-hover:opacity-100
                        `}
                      />
                      <div
                        className={`
                          relative rounded-2xl border border-amber-100/50
                          bg-white/80 p-6 shadow-lg backdrop-blur-sm
                          transition-all duration-300
                          group-hover:shadow-xl
                        `}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`
                              flex h-14 w-14 items-center justify-center
                              rounded-xl bg-gradient-to-br
                              ${activity.color}
                              text-white shadow-lg transition-transform
                              duration-300
                              group-hover:scale-110
                            `}
                          >
                            <activity.icon className="h-7 w-7" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4
                              className={`
                                mb-2 text-lg font-bold text-[#6b8362]
                                transition-colors
                                group-hover:text-[#5a7354]
                              `}
                            >
                              {index + 1}. {activity.title}
                            </h4>
                            <p className="leading-relaxed text-gray-700">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pricing Cards */}
                  <div className="mt-8 space-y-4">
                    <div className="group relative">
                      <div
                        className={`
                          absolute -inset-1 rounded-2xl bg-gradient-to-r
                          from-[#6b8362] to-amber-600 opacity-20 blur transition
                          duration-500
                          group-hover:opacity-30
                        `}
                      />
                      <div
                        className={`
                          relative rounded-2xl border border-amber-200/50
                          bg-gradient-to-br from-amber-50 to-amber-100/50 p-6
                          shadow-lg
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Euro className="h-6 w-6 text-[#6b8362]" />
                            <span
                              className={`
                              text-lg font-semibold text-gray-800
                            `}
                            >
                              Βασικό Πρόγραμμα
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#6b8362]">
                              <NumberTicker value={7} /> ευρώ
                            </div>
                            <div className="text-sm text-gray-600">
                              ανά άτομο
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {[
                            "Ράφτινγκ",
                            "Τοξοβολία",
                            "Πεζοπορία",
                            "Εξοπλισμός",
                          ].map((item) => (
                            <span
                              key={item}
                              className={`
                                inline-flex items-center rounded-full
                                bg-[#6b8362]/10 px-3 py-1 text-xs font-medium
                                text-[#6b8362]
                              `}
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="group relative">
                      <div
                        className={`
                          absolute -inset-1 rounded-2xl bg-gradient-to-r
                          from-amber-600 to-orange-600 opacity-20 blur
                          transition duration-500
                          group-hover:opacity-30
                        `}
                      />
                      <div
                        className={`
                          relative rounded-2xl border border-orange-200/50
                          bg-gradient-to-br from-orange-50 to-orange-100/50 p-6
                          shadow-lg
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mountain className="h-6 w-6 text-amber-600" />
                            <span
                              className={`
                              text-lg font-semibold text-gray-800
                            `}
                            >
                              Με Ιππασία
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-amber-600">
                              +<NumberTicker value={5} /> ευρώ
                            </div>
                            <div className="text-sm text-gray-600">
                              προαιρετικά
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-700">
                          Βόλτα με εκπαιδευμένα άλογα στη φύση
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="group relative mt-8">
                    <div
                      className={`
                        absolute -inset-1 rounded-2xl bg-gradient-to-r
                        from-[#6b8362]/10 to-amber-600/10 opacity-50 blur
                      `}
                    />
                    <div
                      className={`
                        relative rounded-2xl border border-[#6b8362]/20
                        bg-gradient-to-br from-[#6b8362]/5 to-amber-50/50 p-6
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <Star
                          className={`
                          mt-1 h-6 w-6 flex-shrink-0 text-[#6b8362]
                        `}
                        />
                        <div>
                          <h4 className="mb-2 font-bold text-[#6b8362]">
                            Γεύματα & Εστίαση
                          </h4>
                          <p className="leading-relaxed text-gray-700">
                            Στον χώρο της εκδρομής, θα βρείτε εστιατόρια με
                            αυθεντική κουζίνα και άριστη υποδομή, όπου μπορείτε
                            να απολαύσετε γεύματα με θέα στη φύση, με τιμές από{" "}
                            <span className="font-bold text-[#6b8362]">
                              <NumberTicker value={7} /> έως{" "}
                              <NumberTicker value={10} /> ευρώ
                            </span>{" "}
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
            <div
              className={`
                absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#6b8362]/20
                to-amber-600/20 opacity-30 blur
              `}
            />
            <div
              className={`
                relative rounded-3xl border border-amber-100/50 bg-white/90 p-8
                shadow-xl backdrop-blur-md
              `}
            >
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center space-x-3">
                  <Camera className="h-8 w-8 text-[#6b8362]" />
                  <h2
                    className={`
                      ${robotoSlab.variable}
                      font-roboto-slab text-3xl font-bold text-[#6b8362]
                      md:text-4xl
                    `}
                  >
                    ΦΩΤΟΓΡΑΦΙΕΣ ΣΧΟΛΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ
                  </h2>
                  <Camera className="h-8 w-8 text-[#6b8362]" />
                </div>
                <div
                  className={`
                    mx-auto h-1 w-24 rounded-full bg-gradient-to-r
                    from-[#6b8362] to-amber-600
                  `}
                />
              </div>

              <div
                className={`
                  grid grid-cols-1 gap-8
                  md:grid-cols-2
                  lg:grid-cols-3
                `}
              >
                {[
                  {
                    src: "/images/Children_In_Lifejackets_Colorful_OutdoorScene_Riverside.jpg",
                    alt: "Παιδιά σε δραστηριότητες ράφτινγκ",
                    title: "Ράφτινγκ Περιπέτεια",
                  },
                  {
                    src: "/images/ChildrenRafting_GreenOutdoor_Adventurous_RiverScene.jpg",
                    alt: "Παιδιά σε περιπέτεια ράφτινγκ",
                    title: "Ομαδική Δραστηριότητα",
                  },
                  {
                    src: "/images/Hiking_Group_Green_Nature_Stream.jpg",
                    alt: "Ομάδα σε πεζοπορία στη φύση",
                    title: "Εξερεύνηση Φύσης",
                  },
                ].map((image, index) => (
                  <div
                    key={`gallery-${image.title}`}
                    className="group relative"
                  >
                    <div
                      className={`
                        absolute -inset-1 rounded-3xl bg-gradient-to-r
                        from-[#6b8362] to-amber-600 opacity-0 blur transition
                        duration-700
                        group-hover:opacity-30
                      `}
                    />
                    <div className="relative">
                      <div
                        className={`
                          relative aspect-4/3 overflow-hidden rounded-3xl border
                          border-amber-100/50 shadow-2xl
                        `}
                      >
                        <OptimizedImage
                          src={image.src}
                          alt={image.alt}
                          fill
                          className={`
                            object-cover transition-transform duration-700
                            group-hover:scale-110
                          `}
                        />
                        <div
                          className={`
                            absolute inset-0 bg-gradient-to-t from-black/40
                            via-transparent to-transparent opacity-0
                            transition-opacity duration-500
                            group-hover:opacity-100
                          `}
                        />
                        <div
                          className={`
                            absolute right-4 bottom-4 left-4 translate-y-4
                            transform opacity-0 transition-all duration-500
                            group-hover:translate-y-0 group-hover:opacity-100
                          `}
                        >
                          <h3
                            className={`
                              text-lg font-bold text-white drop-shadow-lg
                            `}
                          >
                            {image.title}
                          </h3>
                        </div>
                      </div>
                      <BorderBeam
                        size={200}
                        duration={15 + index * 3}
                        delay={index * 2}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <BorderBeam size={350} duration={25} delay={8} />
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative">
            <div
              className={`
                absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#6b8362]
                to-amber-600 opacity-20 blur
              `}
            />
            <div
              className={`
                relative overflow-hidden rounded-3xl border border-amber-100/50
                bg-gradient-to-br from-white/95 to-amber-50/90 p-12 text-center
                shadow-2xl backdrop-blur-md
              `}
            >
              {/* Background Pattern */}
              <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                className={`
                  absolute inset-0 h-full w-full stroke-[#6b8362]/5 opacity-20
                  [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]
                `}
              />

              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center space-x-3">
                  <Star className="h-10 w-10 animate-pulse text-amber-500" />
                  <h2
                    className={`
                      ${robotoSlab.variable}
                      font-roboto-slab text-3xl font-bold text-[#6b8362]
                      md:text-4xl
                      lg:text-5xl
                    `}
                  >
                    Κλείστε τώρα την εκδρομή του σχολείου σας!
                  </h2>
                  <Star className="h-10 w-10 animate-pulse text-amber-500" />
                </div>

                <div
                  className={`
                    mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r
                    from-[#6b8362] to-amber-600
                  `}
                />

                <p
                  className={`
                    mx-auto mb-12 max-w-4xl text-xl leading-relaxed
                    text-gray-700
                    md:text-2xl
                  `}
                >
                  Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες και για να
                  οργανώσουμε μαζί την τέλεια εκδρομή για τους μαθητές σας.
                </p>

                <div
                  className={`
                    flex flex-col items-center justify-center gap-6
                    sm:flex-row
                  `}
                >
                  <PulsatingButton
                    className={`
                      group relative transform rounded-2xl bg-gradient-to-r
                      from-[#6b8362] to-[#5a7354] px-8 py-4 font-bold text-white
                      shadow-xl transition-all duration-300
                      hover:scale-105 hover:from-[#5a7354] hover:to-[#4a6244]
                    `}
                    pulseColor="#6b8362"
                  >
                    <Link
                      href="mailto:info@ponyclub.gr"
                      className={`
                      flex items-center space-x-3
                    `}
                    >
                      <span className="text-lg">Επικοινωνήστε μαζί μας</span>
                      <ArrowRight
                        className={`
                          h-5 w-5 transition-transform
                          group-hover:translate-x-1
                        `}
                      />
                    </Link>
                  </PulsatingButton>

                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-[#6b8362]" />
                      <span>Άμεση απάντηση</span>
                    </div>
                    <div
                      className={`
                        hidden h-6 w-px bg-gray-300
                        sm:block
                      `}
                    />
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Δωρεάν προσφορά</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div
                  className={`
                    mx-auto mt-12 max-w-2xl rounded-2xl border
                    border-amber-100/50 bg-white/60 p-6 backdrop-blur-sm
                  `}
                >
                  <div
                    className={`
                      grid grid-cols-1 gap-6 text-center
                      md:grid-cols-2 md:text-left
                    `}
                  >
                    <div
                      className={`
                        flex items-center justify-center space-x-3
                        md:justify-start
                      `}
                    >
                      <div
                        className={`
                          flex h-10 w-10 items-center justify-center
                          rounded-full bg-[#6b8362]
                        `}
                      >
                        <span className="font-bold text-white">📧</span>
                      </div>
                      <div>
                        <div className="font-semibold text-[#6b8362]">
                          Email
                        </div>
                        <div className="text-gray-700">info@ponyclub.gr</div>
                      </div>
                    </div>
                    <div
                      className={`
                        flex items-center justify-center space-x-3
                        md:justify-start
                      `}
                    >
                      <div
                        className={`
                          flex h-10 w-10 items-center justify-center
                          rounded-full bg-amber-600
                        `}
                      >
                        <span className="font-bold text-white">📞</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-700">
                          Τηλέφωνο
                        </div>
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
  );
}
