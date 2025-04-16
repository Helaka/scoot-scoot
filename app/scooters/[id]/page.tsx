import { getScooterById } from "@/actions/scooter-actions"
import { getShopById } from "@/actions/shop-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, MapPin, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ScooterDetailsPageProps {
  params: {
    id: string
  }
}

export default async function ScooterDetailsPage({ params }: ScooterDetailsPageProps) {
  const scooter = await getScooterById(params.id)

  if (!scooter) {
    notFound()
  }

  const shop = scooter.shop_id ? await getShopById(scooter.shop_id) : null

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{scooter.name || "Unnamed Scooter"}</CardTitle>
                  <CardDescription>{scooter.model || "No model specified"}</CardDescription>
                </div>
                <Badge
                  className={`
                    ${scooter.status === "available" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : ""}
                    ${scooter.status === "rented" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : ""}
                    ${scooter.status === "maintenance" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" : ""}
                    ${scooter.status === "reserved" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" : ""}
                    ${scooter.status === "inactive" ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" : ""}
                    capitalize
                  `}
                >
                  {scooter.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {scooter.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                  <p>{scooter.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Year: {scooter.year || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">License: {scooter.license_plate || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Hourly</span>
                    <span className="text-lg font-semibold flex items-center">
                      <DollarSign className="h-4 w-4" />
                      {scooter.hourly_rate?.toFixed(2) || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Daily</span>
                    <span className="text-lg font-semibold flex items-center">
                      <DollarSign className="h-4 w-4" />
                      {scooter.daily_rate?.toFixed(2) || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Weekly</span>
                    <span className="text-lg font-semibold flex items-center">
                      <DollarSign className="h-4 w-4" />
                      {scooter.weekly_rate?.toFixed(2) || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Book Now</Button>
              <div className="flex gap-2">
                <Link href={`/scooters/${params.id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shop Information</CardTitle>
            </CardHeader>
            <CardContent>
              {shop ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Shop Name</h3>
                    <p>{shop.name}</p>
                  </div>
                  {shop.address && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      <p>{shop.address}</p>
                      {shop.city && shop.country && (
                        <p>
                          {shop.city}, {shop.country}
                        </p>
                      )}
                    </div>
                  )}
                  {shop.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                      <p>{shop.phone}</p>
                    </div>
                  )}
                  {shop.email && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p>{shop.email}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Shop information not available</p>
              )}
            </CardContent>
            {shop && (
              <CardFooter>
                <Link href={`/shops/${shop.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Shop
                  </Button>
                </Link>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
