import Link from "next/link"
import { Roboto_Slab } from "next/font/google"
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Waves, MountainSnow, Sailboat } from 'lucide-react'
import DynamicGoogleMap from "@/components/DynamicGoogleMap"
import DynamicContactDetails from "@/components/DynamicContactDetails"
import PriceListButton from "@/components/client/PriceListButton"
import BookingButton from "@/components/client/BookingButton"
import ReviewsSection from "@/components/client/ReviewsSection"
import BokunStyles from "@/components/client/BokunStyles"
import EnhancedPackageCard from "@/components/EnhancedPackageCard"
import HomePageContent from "@/components/HomePageContent"

// This page now uses the global translation system via HomePageContent component

const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return <HomePageContent />;
}
