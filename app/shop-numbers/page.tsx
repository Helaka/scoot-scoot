import { Suspense } from "react"
import ShopNumbers from "@/components/shop-numbers"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopNumbersPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopNumbers />
    </Suspense>
  )
}
