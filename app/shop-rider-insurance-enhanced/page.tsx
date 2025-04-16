import { Suspense } from "react"
import ShopRiderInsuranceEnhanced from "@/components/shop-rider-insurance-enhanced"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopRiderInsuranceEnhancedPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopRiderInsuranceEnhanced />
    </Suspense>
  )
}
