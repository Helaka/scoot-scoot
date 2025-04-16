import { getScooters } from "@/actions/scooter-actions"
import { getShops } from "@/actions/shop-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bike, Building2, CalendarClock, Users } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const scooters = await getScooters()
  const shops = await getShops()

  // Count scooters by status
  const availableScooters = scooters.filter((s) => s.status === "available").length
  const rentedScooters = scooters.filter((s) => s.status === "rented").length
  const maintenanceScooters = scooters.filter((s) => s.status === "maintenance").length

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Overview of your ScootScoot business</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Scooters</CardTitle>
            <Bike className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scooters.length}</div>
            <p className="text-xs text-gray-500">Across all shops</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Scooters</CardTitle>
            <Bike className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableScooters}</div>
            <p className="text-xs text-gray-500">Ready for rental</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rented Scooters</CardTitle>
            <CalendarClock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rentedScooters}</div>
            <p className="text-xs text-gray-500">Currently with customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Shops</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shops.length}</div>
            <p className="text-xs text-gray-500">Active rental locations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Scooters</CardTitle>
            <CardDescription>Your most recently added scooters</CardDescription>
          </CardHeader>
          <CardContent>
            {scooters.length > 0 ? (
              <div className="space-y-4">
                {scooters.slice(0, 5).map((scooter) => (
                  <div key={scooter.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{scooter.name || "Unnamed Scooter"}</p>
                      <p className="text-sm text-gray-500">{scooter.model || "No model"}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${scooter.status === "available" ? "bg-green-100 text-green-800" : ""}
                        ${scooter.status === "rented" ? "bg-blue-100 text-blue-800" : ""}
                        ${scooter.status === "maintenance" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${scooter.status === "reserved" ? "bg-purple-100 text-purple-800" : ""}
                        ${scooter.status === "inactive" ? "bg-gray-100 text-gray-800" : ""}
                      `}
                      >
                        {scooter.status}
                      </div>
                      <Link href={`/scooters/${scooter.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No scooters found</p>
                <Link href="/scooters/new" className="mt-2 inline-block">
                  <Button variant="outline" size="sm">
                    Add Scooter
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/scooters/new" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                <Bike className="mr-2 h-4 w-4" />
                Add New Scooter
              </Button>
            </Link>
            <Link href="/shops/new" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="mr-2 h-4 w-4" />
                Add New Shop
              </Button>
            </Link>
            <Link href="/bookings/new" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                <CalendarClock className="mr-2 h-4 w-4" />
                Create Booking
              </Button>
            </Link>
            <Link href="/customers" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                View Customers
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
