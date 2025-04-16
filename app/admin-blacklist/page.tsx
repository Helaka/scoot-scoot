import { Suspense } from "react"
import AdminBlacklistManagement from "../../components/admin-blacklist-management"
import { LoadingSpinner } from "../../components/ui/loading-spinner"

export default function AdminBlacklistPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminBlacklistManagement />
    </Suspense>
  )
}
