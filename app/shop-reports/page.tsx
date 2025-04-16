import { Suspense } from "react"
import ShopReports from "@/components/shop-reports"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopReportsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopReports />
    </Suspense>
  )
}
