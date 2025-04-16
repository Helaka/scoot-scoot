import { Suspense } from "react"
import ShopStaff from "@/components/shop-staff"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopStaffPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopStaff />
    </Suspense>
  )
}
