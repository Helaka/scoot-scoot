import { BookingConfirmation } from "@/components/rider/booking-confirmation"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<BookingConfirmationSkeleton />}>
      <BookingConfirmation />
    </Suspense>
  )
}

function BookingConfirmationSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Skeleton className="h-20 w-20 rounded-full" />
      </div>
      <div className="space-y-2 text-center">
        <Skeleton className="h-8 w-[200px] mx-auto" />
        <Skeleton className="h-4 w-[300px] mx-auto" />
      </div>
      <Skeleton className="h-[400px] rounded-xl" />
    </div>
  )
}
