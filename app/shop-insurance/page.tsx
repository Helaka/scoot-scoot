import { Suspense } from "react"
import ShopInsurance from "@/components/shop-insurance"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopInsurancePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopInsurance />
    </Suspense>
  )
}
