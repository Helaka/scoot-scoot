import { RiderIDP } from "@/components/rider/rider-idp"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function RiderIDPPage() {
  return (
    <Suspense fallback={<IDPSkeleton />}>
      <RiderIDP />
    </Suspense>
  )
}

function IDPSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
      <div className="rounded-xl border p-6 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[300px] rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-[150px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
