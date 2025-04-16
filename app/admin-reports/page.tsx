import { Suspense } from "react"
import AdminReports from "../../components/admin-reports"
import { LoadingSpinner } from "../../components/ui/loading-spinner"

export default function AdminReportsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminReports />
    </Suspense>
  )
}
