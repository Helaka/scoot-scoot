"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { BookingCheckout } from "@/components/rider/booking-checkout"

export default function BookingCheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // In a real app, we would fetch this data from an API based on the IDs
  // For now, we'll use mock data
  const scooterId = searchParams?.get("scooter") || "scooter-1"
  const shopId = searchParams?.get("shop") || "shop-1"
  const startDate = searchParams?.get("start") || "2025-03-25"
  const endDate = searchParams?.get("end") || "2025-03-27"

  // Mock data
  const scooter = {
    id: scooterId,
    name: "Honda PCX 150cc",
    image: "/placeholder.svg?height=200&width=300",
    price: 45,
  }

  const shop = {
    id: shopId,
    name: "Jungle Scooters Pai",
  }

  const dates = {
    start: startDate,
    end: endDate,
  }

  const handleBookingComplete = (bookingData: any) => {
    // In a real app, we would send this data to an API
    console.log("Booking completed:", bookingData)

    // For demo purposes, we'll just redirect to the dashboard with a demo parameter
    // that will show the active rental state
    router.push("/rider-dashboard?demo=true&state=active")
  }

  return <BookingCheckout scooter={scooter} shop={shop} dates={dates} onComplete={handleBookingComplete} />
}
