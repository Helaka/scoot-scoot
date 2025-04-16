import { Suspense } from "react"
import RiderFindScooters from "../../components/rider-find-scooters"
import { LoadingSpinner } from "../../components/ui/loading-spinner"

export default function RiderFindScootersPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RiderFindScooters />
    </Suspense>
  )
}
