import { getShops } from "@/actions/shop-actions"
import { ScooterForm } from "@/components/scooter-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function NewScooterPage() {
  // In a real app, you would get the current user's shop ID
  // For now, we'll just get the first shop from the database
  const shops = await getShops()
  const shopId = shops.length > 0 ? shops[0].id : undefined

  if (!shopId) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center p-8 border rounded-lg">
          <h3 className="mt-2 text-lg font-medium">No shop found</h3>
          <p className="mt-1 text-gray-500">You need to create a shop before adding scooters.</p>
          <div className="mt-6">
            <Link href="/shops/new">
              <Button>Create Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/scooters">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Scooters
          </Button>
        </Link>
      </div>

      <ScooterForm shopId={shopId} />
    </div>
  )
}
