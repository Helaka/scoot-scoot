import { Suspense } from "react"
import ShopRiderInsurance from "@/components/shop-rider-insurance"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopRiderInsurancePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopRiderInsurance />
    </Suspense>
  )
}
