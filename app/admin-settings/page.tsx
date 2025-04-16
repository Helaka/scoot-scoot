import { Suspense } from "react"
import AdminSettings from "../../components/admin-settings"
import { LoadingSpinner } from "../../components/ui/loading-spinner"

export default function AdminSettingsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminSettings />
    </Suspense>
  )
}
