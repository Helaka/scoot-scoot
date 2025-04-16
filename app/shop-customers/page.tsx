import { Suspense } from "react"
import ShopCustomers from "@/components/shop-customers"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopCustomersPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopCustomers />
    </Suspense>
  )
}
