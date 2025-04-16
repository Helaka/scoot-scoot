import { DiscoverScooters } from "@/components/rider/discover-scooters"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function DiscoverScootersPage() {
  return (
    <Suspense fallback={<DiscoverSkeleton />}>
      <DiscoverScooters />
    </Suspense>
  )
}

function DiscoverSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-[500px] w-full rounded-lg" />
    </div>
  )
}
