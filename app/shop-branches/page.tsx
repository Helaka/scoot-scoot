import { Suspense } from "react"
import { ShopBranches } from "@/components/shop-branches"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopBranchesPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopBranches />
    </Suspense>
  )
}
