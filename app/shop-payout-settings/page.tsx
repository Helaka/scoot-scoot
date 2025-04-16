import { Suspense } from "react"
import ShopPayoutSettings from "@/components/shop-payout-settings"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopPayoutSettingsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopPayoutSettings />
    </Suspense>
  )
}
