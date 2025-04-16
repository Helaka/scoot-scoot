import { Suspense } from "react"
import ShopPricing from "@/components/shop-pricing"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopPricingPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopPricing />
    </Suspense>
  )
}
