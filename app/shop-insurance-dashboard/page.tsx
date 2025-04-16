import { Suspense } from "react"
import ShopInsuranceDashboard from "@/components/shop-insurance-dashboard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopInsuranceDashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopInsuranceDashboard />
    </Suspense>
  )
}
