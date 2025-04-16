import { ShopDetails } from "@/components/rider/shop-details"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ShopDetailsPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ShopDetailsSkeleton />}>
      <ShopDetails shopId={params.id} />
    </Suspense>
  )
}

function ShopDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-[200px]" />
      <div className="aspect-[3/1] w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[250px]" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[200px] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
