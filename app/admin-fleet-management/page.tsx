import { Suspense } from "react"
import AdminFleetManagement from "../../components/admin-fleet-management"
import { LoadingSpinner } from "../../components/ui/loading-spinner"

export default function AdminFleetManagementPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminFleetManagement />
    </Suspense>
  )
}
