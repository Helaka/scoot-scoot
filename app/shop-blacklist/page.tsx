import { Suspense } from "react"
import ShopBlacklistUnified from "@/components/shop-blacklist-unified"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopBlacklistPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopBlacklistUnified />
    </Suspense>
  )
}
