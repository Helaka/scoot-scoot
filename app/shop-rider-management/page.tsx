import { Suspense } from "react"
import ShopRiderManagement from "@/components/shop-rider-management"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopRiderManagementPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopRiderManagement />
    </Suspense>
  )
}
