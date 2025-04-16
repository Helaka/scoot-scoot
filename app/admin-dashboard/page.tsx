import { ClientProvider } from "@/components/client-provider"
import AdminDashboard from "@/components/admin-dashboard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export const dynamic = "force-static"

export default function AdminDashboardPage() {
  return (
    <ClientProvider fallback={<LoadingSpinner />}>
      <AdminDashboard />
    </ClientProvider>
  )
}
