import { getShops } from "@/actions/shop-actions"
import { ScooterList } from "@/components/scooter-list"
import { Button } from "@/components/ui/button"
import { Bike, Plus } from "lucide-react"
import Link from "next/link"

export default async function ScootersPage() {
  // In a real app, you would get the current user's shop ID
  // For now, we'll just get the first shop from the database
  const shops = await getShops()
  const shopId = shops.length > 0 ? shops[0].id : undefined

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Scooter Fleet</h1>
          <p className="text-gray-500">Manage your scooter inventory</p>
        </div>
        <Link href="/scooters/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Scooter
          </Button>
        </Link>
      </div>

      {shopId ? (
        <ScooterList shopId={shopId} />
      ) : (
        <div className="text-center p-8 border rounded-lg">
          <Bike className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No shop found</h3>
          <p className="mt-1 text-gray-500">You need to create a shop before adding scooters.</p>
          <div className="mt-6">
            <Link href="/shops/new">
              <Button>Create Shop</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
