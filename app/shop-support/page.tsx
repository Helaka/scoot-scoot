import { Suspense } from "react"
import ShopSupport from "@/components/shop-support"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopSupportPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopSupport />
    </Suspense>
  )
}
