import { Suspense } from "react"
import ShopScooters from "@/components/shop-scooters"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopScootersPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopScooters />
    </Suspense>
  )
}
