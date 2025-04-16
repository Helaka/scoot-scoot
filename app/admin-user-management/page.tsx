import { Suspense } from "react"
import AdminUserManagement from "../../components/admin-user-management"
import { LoadingSpinner } from "../../components/ui/loading-spinner"

export default function AdminUserManagementPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminUserManagement />
    </Suspense>
  )
}
