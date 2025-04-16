import { getScooterById } from "@/actions/scooter-actions"
import { getInsurancePoliciesByShopId } from "@/actions/insurance-actions"
import { BookingForm } from "@/components/booking-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface BookScooterPageProps {
  params: {
    id: string
  }
}

export default async function BookScooterPage({ params }: BookScooterPageProps) {
  // Check if user is logged in and is a rider
  const userRole = cookies().get("user_role")?.value

  if (!userRole || userRole !== "rider") {
    redirect("/login?redirect=" + encodeURIComponent(`/scooters/${params.id}/book`))
  }

  // Get the user ID from the session (this is a placeholder - implement based on your auth setup)
  const userId = "66666666-6666-6666-6666-666666666666" // Replace with actual user ID from session

  const scooter = await getScooterById(params.id)

  if (!scooter) {
    notFound()
  }

  // Get insurance options for this shop
  const insuranceOptions = await getInsurancePoliciesByShopId(scooter.shop_id)

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href={`/scooters/${params.id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Scooter Details
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BookingForm scooter={scooter} userId={userId} insuranceOptions={insuranceOptions} />
        </div>

        <div>
          <div className="sticky top-20">
            <div className="rounded-lg overflow-hidden border">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {scooter.image_urls && scooter.image_urls.length > 0 ? (
                  <img
                    src={scooter.image_urls[0] || "/placeholder.svg"}
                    alt={scooter.name || "Scooter"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image available</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{scooter.name || "Unnamed Scooter"}</h3>
                <p className="text-gray-500">{scooter.model || "No model specified"}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Daily Rate:</span>
                    <span className="font-medium">${scooter.daily_rate?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Hourly Rate:</span>
                    <span className="font-medium">${scooter.hourly_rate?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Weekly Rate:</span>
                    <span className="font-medium">${scooter.weekly_rate?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
