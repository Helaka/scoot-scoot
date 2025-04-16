import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { RiderBookingsContent } from "@/components/rider/rider-bookings-content"

export default function RiderBookingsPage() {
  return (
    <Suspense fallback={<BookingsSkeleton />}>
      <RiderBookingsContent />
    </Suspense>
  )
}

function BookingsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-[200px] rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[150px]" />
        <div className="space-y-4">
          <Skeleton className="h-[100px] rounded-lg" />
          <Skeleton className="h-[100px] rounded-lg" />
          <Skeleton className="h-[100px] rounded-lg" />
        </div>
      </div>
    </div>
  )
}
