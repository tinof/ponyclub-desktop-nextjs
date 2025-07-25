import type { Metadata } from "next";

import ActivityPageLayout from "@/components/ActivityPageLayout";
import DynamicBokunWidget from "@/components/DynamicBokunWidget";
import StructuredData from "@/components/StructuredData";

// PERFORMANCE OPTIMIZATION: ISR configuration for package pages
// Package content may change periodically (pricing, availability, descriptions)
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
			? "Πακέτο 1: Rafting & Ιππασία Αχέροντας | Συνδυασμένη Περιπέτεια"
			: "Package 1: Rafting & Horse Riding Adventure | Acheron Experience";
	const description =
		locale === "el"
			? "Το δημοφιλέστερο πακέτο μας! Συνδυάζει rafting, ιππασία και πεζοπορία στον Αχέροντα. Ιδανικό για οικογένειες και αρχάριους. Κλείστε τώρα!"
			: "Our most popular package! Combines rafting, horse riding and hiking at Acheron River. Perfect for families and beginners. Book now!";

	return {
		title,
		description,
		alternates: {
			canonical: `/${locale}/package-1`,
		},
	};
}

const Package1Page = async ({ params }: PageProps) => {
	const { locale } = await params;
	const isGreek = locale === "el";
	const bokunExperienceId = "1020598"; // Package 1 experience ID

	const seoContent = isGreek ? (
		<div className="mb-8">
			<h1
				className={`
          mb-6 text-3xl font-bold text-[#3E5A35]
          md:text-4xl
        `}
			>
				Πακέτο 1: Rafting & Ιππασία Περιπέτεια
			</h1>
			<div className="prose prose-lg max-w-none text-gray-700">
				<p className="lead mb-4">
					Ζήστε την απόλυτη περιπέτεια στον Αχέροντα με το δημοφιλέστερο πακέτο
					μας! Συνδυάζει rafting, ιππασία και πεζοπορία σε μια ολοκληρωμένη
					εμπειρία που είναι ιδανική για οικογένειες και αρχάριους.
				</p>

				<h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
					Τι Περιλαμβάνει το Πακέτο 1
				</h2>
				<div className="bg-green-50 p-6 rounded-lg mb-6">
					<ul className="space-y-3">
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Rafting:</strong> 30 λεπτά συναρπαστικής κατάβασης στον
								Αχέροντα
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Ιππασία:</strong> 10-15 λεπτά βόλτα με εκπαιδευμένα
								άλογα
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Πεζοπορία:</strong> Διάσχιση φαραγγιού με οδηγό
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Εξοπλισμός ασφαλείας:</strong> Σωσίβια, κράνη, οδηγίες
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Έμπειρος οδηγός:</strong> Καθ' όλη τη διάρκεια της
								εμπειρίας
							</span>
						</li>
					</ul>
				</div>

				<h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
					Τιμές Πακέτου 1
				</h2>
				<div className="bg-amber-50 p-6 rounded-lg mb-6">
					<div className="text-center">
						<p className="text-3xl font-bold text-gray-800 mb-2">€20</p>
						<p className="text-lg text-gray-600 mb-4">ανά ενήλικα</p>
						<p className="text-2xl font-bold text-gray-800 mb-2">€10</p>
						<p className="text-lg text-gray-600">ανά παιδί (6-12 ετών)</p>
					</div>
				</div>

				<h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
					Γιατί να Επιλέξετε το Πακέτο 1;
				</h2>
				<div className="space-y-4">
					<div>
						<h3 className="font-semibold text-gray-800 mb-2">
							Ιδανικό για Οικογένειες
						</h3>
						<p className="text-gray-700">
							Όλες οι δραστηριότητες είναι σχεδιασμένες για να είναι ασφαλείς
							και διασκεδαστικές για παιδιά από 6 ετών και άνω.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-800 mb-2">
							Κατάλληλο για Αρχάριους
						</h3>
						<p className="text-gray-700">
							Δεν χρειάζεται προηγούμενη εμπειρία. Οι οδηγοί μας παρέχουν πλήρη
							εκπαίδευση και καθοδήγηση.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-800 mb-2">
							Ολοκληρωμένη Εμπειρία
						</h3>
						<p className="text-gray-700">
							Συνδυάζει τρεις διαφορετικές δραστηριότητες σε ένα πακέτο για μια
							πλήρη ημέρα περιπέτειας.
						</p>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="mb-8">
			<h1
				className={`
          mb-6 text-3xl font-bold text-[#3E5A35]
          md:text-4xl
        `}
			>
				Package 1: Rafting & Horse Riding Adventure
			</h1>
			<div className="prose prose-lg max-w-none text-gray-700">
				<p className="lead mb-4">
					Experience the ultimate Acheron adventure with our most popular
					package! Combines rafting, horse riding, and hiking in a complete
					experience that's perfect for families and beginners.
				</p>

				<h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
					What's Included in Package 1
				</h2>
				<div className="bg-green-50 p-6 rounded-lg mb-6">
					<ul className="space-y-3">
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Rafting:</strong> 30 minutes of thrilling Acheron River
								descent
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Horse Riding:</strong> 10-15 minute ride with trained
								horses
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Hiking:</strong> Guided canyon crossing adventure
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Safety Equipment:</strong> Life jackets, helmets,
								instructions
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-3 text-green-600 font-bold">✓</span>
							<span>
								<strong>Expert Guide:</strong> Throughout the entire experience
							</span>
						</li>
					</ul>
				</div>

				<h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
					Package 1 Prices
				</h2>
				<div className="bg-amber-50 p-6 rounded-lg mb-6">
					<div className="text-center">
						<p className="text-3xl font-bold text-gray-800 mb-2">€20</p>
						<p className="text-lg text-gray-600 mb-4">per adult</p>
						<p className="text-2xl font-bold text-gray-800 mb-2">€10</p>
						<p className="text-lg text-gray-600">per child (6-12 years)</p>
					</div>
				</div>

				<h2 className="mt-8 mb-4 text-2xl font-bold text-[#3E5A35]">
					Why Choose Package 1?
				</h2>
				<div className="space-y-4">
					<div>
						<h3 className="font-semibold text-gray-800 mb-2">
							Perfect for Families
						</h3>
						<p className="text-gray-700">
							All activities are designed to be safe and fun for children 6
							years and older.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-800 mb-2">
							Beginner-Friendly
						</h3>
						<p className="text-gray-700">
							No previous experience required. Our guides provide complete
							training and guidance.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-800 mb-2">
							Complete Experience
						</h3>
						<p className="text-gray-700">
							Combines three different activities in one package for a full day
							of adventure.
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	// Product structured data for SEO
	const productStructuredData = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: isGreek
			? "Πακέτο 1: Rafting & Ιππασία Περιπέτεια"
			: "Package 1: Rafting & Horse Riding Adventure",
		description: isGreek
			? "Το δημοφιλέστερο πακέτο μας! Συνδυάζει rafting, ιππασία και πεζοπορία στον Αχέροντα. Ιδανικό για οικογένειες και αρχάριους."
			: "Our most popular package! Combines rafting, horse riding and hiking at Acheron River. Perfect for families and beginners.",
		image: [
			"https://ponyclub.gr/images/Rafting_Group_Blue_Adventure_River.jpg",
			"https://ponyclub.gr/images/round2.jpg",
			"https://ponyclub.gr/images/round1.jpg",
		],
		brand: {
			"@type": "Organization",
			name: "Pony Club Acheron",
		},
		offers: {
			"@type": "Offer",
			price: "20",
			priceCurrency: "EUR",
			availability: "https://schema.org/InStock",
			validFrom: new Date().toISOString(),
			priceSpecification: [
				{
					"@type": "PriceSpecification",
					price: "20",
					priceCurrency: "EUR",
					eligibleQuantity: {
						"@type": "QuantitativeValue",
						minValue: 1,
						unitText: "Adult",
					},
				},
				{
					"@type": "PriceSpecification",
					price: "10",
					priceCurrency: "EUR",
					eligibleQuantity: {
						"@type": "QuantitativeValue",
						minValue: 1,
						unitText: "Child (6-12 years)",
					},
				},
			],
		},
		category: "Adventure Tourism",
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.8",
			reviewCount: "127",
		},
		provider: {
			"@type": "Organization",
			name: "Pony Club Acheron",
			url: "https://ponyclub.gr",
		},
	};

	return (
		<>
			<StructuredData data={productStructuredData} />
			<ActivityPageLayout
				title="Package 1"
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
		</>
	);
};

export default Package1Page;
