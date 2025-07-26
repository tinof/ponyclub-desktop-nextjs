// Type definitions for structured data
type StructuredDataType = Record<string, unknown>;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.ponyclub.gr";

// Base organization data
export const organizationData = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "@id": `${baseUrl}/#organization`,
  name: "Pony Club",
  alternateName: "Pony Club Acheron",
  url: baseUrl,
  logo: `${baseUrl}/images/logo.png`,
  image: [
    `${baseUrl}/images/hero-image.webp`,
    `${baseUrl}/images/round1.jpg`,
    `${baseUrl}/images/round2.jpg`,
    `${baseUrl}/images/round3.jpg`,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Acheron River",
    addressLocality: "Glyki",
    addressRegion: "Thesprotia",
    postalCode: "46200",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.32581744774602,
    longitude: 20.606971798121965,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+30-26650-71150",
    contactType: "customer service",
    availableLanguage: ["Greek", "English"],
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "18:00",
  },
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.8,
    reviewCount: 156,
    bestRating: 5,
  },
  sameAs: [
    "https://www.facebook.com/ponyclub.acheron",
    "https://www.instagram.com/ponyclub_acheron",
  ],
} as const;

// Activity-specific structured data generators
export function generateActivityStructuredData(
  activityType: "rafting" | "riding" | "kayaking" | "trekking",
  locale: string,
): StructuredDataType {
  const activities = {
    rafting: {
      en: {
        name: "Acheron River Rafting",
        description:
          "Safe rafting experience in the mythical Acheron River. Perfect for beginners and families with gentle currents and professional guides.",
        price: "20",
        duration: "PT30M",
        minAge: 6,
      },
      el: {
        name: "Ράφτινγκ στον Ποταμό Αχέροντα",
        description:
          "Ασφαλής εμπειρία ράφτινγκ στον μυθικό ποταμό Αχέροντα. Ιδανικό για αρχάριους και οικογένειες με ήπια ρεύματα και επαγγελματίες οδηγούς.",
        price: "20",
        duration: "PT30M",
        minAge: 6,
      },
    },
    riding: {
      en: {
        name: "Acheron Horse Riding",
        description:
          "Peaceful horseback riding along the banks of Acheron River. Suitable for all ages with trained horses and experienced guides.",
        price: "15",
        duration: "PT15M",
        minAge: 4,
      },
      el: {
        name: "Ιππασία στον Αχέροντα",
        description:
          "Ήρεμη ιππασία στις όχθες του ποταμού Αχέροντα. Κατάλληλη για όλες τις ηλικίες με εκπαιδευμένα άλογα και έμπειρους οδηγούς.",
        price: "15",
        duration: "PT15M",
        minAge: 4,
      },
    },
    kayaking: {
      en: {
        name: "Acheron River Kayaking",
        description:
          "Discover the crystal-clear waters of Acheron River by kayak. Perfect for beginners with complete safety equipment and professional guidance.",
        price: "25",
        duration: "PT30M",
        minAge: 8,
      },
      el: {
        name: "Καγιάκ στον Ποταμό Αχέροντα",
        description:
          "Ανακαλύψτε τα κρυστάλλινα νερά του ποταμού Αχέροντα με καγιάκ. Ιδανικό για αρχάριους με πλήρη εξοπλισμό ασφαλείας και επαγγελματική καθοδήγηση.",
        price: "25",
        duration: "PT30M",
        minAge: 8,
      },
    },
    trekking: {
      en: {
        name: "Acheron Canyon Trekking",
        description:
          "Guided hiking tours through the beautiful Acheron canyon. Family-friendly trails with stunning natural scenery.",
        price: "10",
        duration: "PT45M",
        minAge: 6,
      },
      el: {
        name: "Πεζοπορία στο Φαράγγι του Αχέροντα",
        description:
          "Οδηγημένες πεζοπορίες μέσα από το όμορφο φαράγγι του Αχέροντα. Φιλικά προς την οικογένεια μονοπάτια με εκπληκτικό φυσικό τοπίο.",
        price: "10",
        duration: "PT45M",
        minAge: 6,
      },
    },
  };

  const activity = activities[activityType][locale as "en" | "el"];

  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${baseUrl}/${locale}/${activityType}/#activity`,
    name: activity.name,
    description: activity.description,
    url: `${baseUrl}/${locale}/${activityType}`,
    image: `${baseUrl}/images/${activityType}-hero.webp`,
    organizer: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Pony Club",
    },
    location: {
      "@type": "Place",
      name: "Acheron River, Glyki",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Glyki",
        addressRegion: "Thesprotia",
        addressCountry: "GR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 39.32581744774602,
        longitude: 20.606971798121965,
      },
    },
    offers: {
      "@type": "Offer",
      name: activity.name,
      description: activity.description,
      price: activity.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      url: `${baseUrl}/${locale}/${activityType}`,
    },
    duration: activity.duration,
    audience: {
      "@type": "Audience",
      suggestedMinAge: activity.minAge,
    },
    isAccessibleForFree: false,
    touristType: ["Families", "Adventure Seekers", "Nature Lovers"],
  };
}

// FAQ structured data generator
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>,
  pageUrl: string,
): StructuredDataType {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}/#faq`,
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb structured data generator
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>,
  currentPage: string,
): StructuredDataType {
  const allBreadcrumbs = [
    ...breadcrumbs,
    { name: currentPage, url: "" }, // Current page doesn't need URL
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allBreadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      ...(breadcrumb.url && { item: breadcrumb.url }),
    })),
  };
}

// Website structured data
export function generateWebsiteStructuredData(
  locale: string,
): StructuredDataType {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Pony Club",
    alternateName: "Pony Club Acheron",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: locale === "el" ? "el-GR" : "en-US",
  };
}
