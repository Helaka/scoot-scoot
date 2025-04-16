import { Suspense } from "react"
import ShopSettings from "@/components/shop-settings"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopSettingsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopSettings />
    </Suspense>
  )
}
