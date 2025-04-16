import { Suspense } from "react"
import AdminAnalytics from "../../components/admin-analytics"

export default function AdminAnalyticsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <AdminAnalytics />
    </Suspense>
  )
}
