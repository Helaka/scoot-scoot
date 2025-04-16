import { Suspense } from "react"
import AdminPayments from "../../components/admin-payments"
import { LoadingSpinner } from "../../components/ui/loading-spinner"

export default function AdminPaymentsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminPayments />
    </Suspense>
  )
}
