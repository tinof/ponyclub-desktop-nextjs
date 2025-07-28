"use client";

import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  familySize: string;
  verified: boolean;
}

interface PremiumTestimonialsProps {
  isGreek: boolean;
}

export default function PremiumTestimonials({
  isGreek,
}: PremiumTestimonialsProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: isGreek ? "Μαρία Παπαδοπούλου" : "Maria Smith",
      location: isGreek ? "Αθήνα, Ελλάδα" : "Athens, Greece",
      text: isGreek
        ? "Καταπληκτική εμπειρία για όλη την οικογένεια! Τα παιδιά μας (7 και 10 ετών) το απόλαυσαν πολύ. Η ασφάλεια ήταν η πρώτη προτεραιότητα και οι οδηγοί εξαιρετικοί!"
        : "Amazing experience for the whole family! Our kids (7 and 10 years old) loved every minute. Safety was clearly the top priority and the guides were exceptional!",
      rating: 5,
      avatar: "/images/children_rafting_activity_bright_outdoors.jpg",
      familySize: isGreek ? "4 άτομα" : "Family of 4",
      verified: true,
    },
    {
      id: 2,
      name: isGreek ? "Γιάννης Κωνσταντίνου" : "John Thompson",
      location: isGreek ? "Θεσσαλονίκη, Ελλάδα" : "London, UK",
      text: isGreek
        ? "Το καλύτερο πακέτο περιπέτειας που έχουμε κάνει ποτέ! Η αξία για τα χρήματα είναι εξαιρετική και οι δραστηριότητες τέλεια οργανωμένες."
        : "The best adventure package we've ever done! Excellent value for money and the activities were perfectly organized.",
      rating: 5,
      avatar: "/images/FamilyRafting_Green_Nature_River.jpg",
      familySize: isGreek ? "5 άτομα" : "Family of 5",
      verified: true,
    },
    {
      id: 3,
      name: isGreek ? "Σοφία Νικολάου" : "Sophie Wilson",
      location: isGreek ? "Πάτρα, Ελλάδα" : "Berlin, Germany",
      text: isGreek
        ? "Εξαιρετική οργάνωση και φιλικό προσωπικό. Τα παιδιά μας αισθάνονταν ασφαλή καθ' όλη τη διάρκεια. Θα το επαναλάβαμε αμέσως!"
        : "Excellent organization and friendly staff. Our children felt safe throughout. We would do it again immediately!",
      rating: 5,
      avatar: "/images/ChildrenRafting_GreenOutdoor_Adventurous_RiverScene.jpg",
      familySize: isGreek ? "3 άτομα" : "Family of 3",
      verified: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={`star-${i}`}
          className={`text-lg ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-emerald-50 py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-400 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-blue-400 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-amber-400 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg mb-6">
            <span className="text-2xl">⭐</span>
            <span className="font-bold text-gray-800">
              {isGreek
                ? "4.9/5 από 500+ οικογένειες"
                : "4.9/5 from 500+ families"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isGreek ? "Τι Λένε οι Οικογένειες" : "What Families Say"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isGreek
              ? "Χιλιάδες οικογένειες έχουν ζήσει αξέχαστες στιγμές μαζί μας. Διαβάστε τις εμπειρίες τους!"
              : "Thousands of families have created unforgettable memories with us. Read their experiences!"}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="currentColor"
                  className="text-emerald-400 animate-pulse"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  className="text-blue-400 animate-spin"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-800 font-medium mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-emerald-200">
                      <OptimizedImage
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        fill={true}
                        className="object-cover"
                        imageType="default"
                      />
                    </div>
                    {testimonials[currentTestimonial].verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="text-left">
                    <div className="font-bold text-gray-900 flex items-center space-x-2">
                      <span>{testimonials[currentTestimonial].name}</span>
                      {testimonials[currentTestimonial].verified && (
                        <span className="text-green-500 text-sm">
                          {isGreek ? "Επαληθευμένη" : "Verified"}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonials[currentTestimonial].location}
                    </div>
                    <div className="text-emerald-600 text-sm font-medium">
                      {testimonials[currentTestimonial].familySize}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    type="button"
                    key={testimonial.id}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-emerald-500 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
          <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
            <span className="text-green-500 text-xl">🛡️</span>
            <span className="font-semibold text-gray-700">
              {isGreek ? "Ασφάλεια 100%" : "100% Safe"}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
            <span className="text-blue-500 text-xl">🏆</span>
            <span className="font-semibold text-gray-700">
              {isGreek ? "Κορυφαία Αξιολόγηση" : "Top Rated"}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
            <span className="text-amber-500 text-xl">👨‍👩‍👧‍👦</span>
            <span className="font-semibold text-gray-700">
              {isGreek ? "Φιλικό προς Οικογένειες" : "Family Friendly"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
