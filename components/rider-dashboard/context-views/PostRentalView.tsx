"use client"
import { Bike, Clock, Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRiderContext } from "@/contexts/rider-context"
import { useRouter } from "next/navigation"

interface PostRentalViewProps {
  rentalId: string
  vehicleType: string
}

export function PostRentalView({ rentalId, vehicleType }: PostRentalViewProps) {
  const { dispatch } = useRiderContext()
  const router = useRouter()

  // Handle rating submission
  const handleRateRide = (rating: number) => {
    // In a real app, this would call an API
    console.log(`Rated ride ${rentalId} with ${rating} stars`)
  }

  // Handle find new scooter
  const handleFindNewScooter = () => {
    dispatch({ type: "SET_LOOKING" })
  }

  // Add a new function to handle viewing rides:
  const handleViewRides = () => {
    router.push("/rider-rides")
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Completed Rental Card */}
      <Card className="border-green-500">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="flex items-center text-lg">
            <Clock className="mr-2 h-5 w-5 text-green-500" />
            Rental Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">
                  {vehicleType === "scooter" ? "Scooter" : "Vehicle"} #{rentalId.slice(-4)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Thank you for riding with us!</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-xl font-bold">01:24:36</p>
              </div>
            </div>

            {/* Rating Section */}
            <div>
              <p className="font-medium mb-2">How was your ride?</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={() => handleRateRide(rating)}
                  >
                    <Star className="h-8 w-8 text-yellow-500" fill="currentColor" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Feedback */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Great Ride
              </Button>
              <Button variant="outline" className="flex-1">
                <ThumbsDown className="h-4 w-4 mr-2" />
                Had Issues
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipt Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Receipt Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Fare</span>
              <span>$3.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time (1h 24m)</span>
              <span>$8.40</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span>$1.50</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>$12.90</span>
            </div>
          </div>

          <Button className="w-full mt-4">View Detailed Receipt</Button>
        </CardContent>
      </Card>

      {/* Rent Again */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Bike className="mr-2 h-5 w-5 text-blue-500" />
            What would you like to do next?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full" onClick={handleFindNewScooter}>
              Find Another Scooter
            </Button>

            <Button variant="outline" className="w-full" onClick={handleViewRides}>
              View My Rides
            </Button>

            <Button variant="ghost" className="w-full" onClick={() => dispatch({ type: "SET_LOOKING" })}>
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
