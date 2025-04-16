import { Suspense } from "react"
import ShopBookings from "@/components/shop-bookings"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopBookingsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopBookings />
    </Suspense>
  )
}
