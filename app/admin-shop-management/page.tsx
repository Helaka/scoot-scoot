import { Suspense } from "react"
import AdminShopManagement from "../../components/admin-shop-management"
import { LoadingSpinner } from "../../components/ui/loading-spinner"

export default function AdminShopManagementPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminShopManagement />
    </Suspense>
  )
}
