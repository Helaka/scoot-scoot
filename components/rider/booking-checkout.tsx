"use client"

import { useState } from "react"
import { Calendar, Clock, ChevronRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InsuranceSelection } from "./insurance-selection"

// This would be passed from the scooter selection page
interface BookingCheckoutProps {
  scooter: {
    id: string
    name: string
    image: string
    price: number
  }
  shop: {
    id: string
    name: string
  }
  dates: {
    start: string
    end: string
  }
  onComplete: (bookingData: any) => void
}

export function BookingCheckout({ scooter, shop, dates, onComplete }: BookingCheckoutProps) {
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>("basic") // Default to basic

  // Calculate rental duration in days
  const startDate = new Date(dates.start)
  const endDate = new Date(dates.end)
  const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  // Calculate costs
  const rentalCost = scooter.price * durationDays

  // Get insurance cost based on selection
  const getInsuranceCost = () => {
    switch (selectedInsurance) {
      case "basic":
        return 15
      case "premium":
        return 25
      default:
        return 0
    }
  }

  const insuranceCost = getInsuranceCost()
  const totalCost = rentalCost + insuranceCost

  // Handle booking completion
  const handleCompleteBooking = () => {
    // This would typically make an API call to create the booking
    const bookingData = {
      scooterId: scooter.id,
      shopId: shop.id,
      startDate: dates.start,
      endDate: dates.end,
      insurance: selectedInsurance,
      costs: {
        rental: rentalCost,
        insurance: insuranceCost,
        total: totalCost,
      },
    }

    onComplete(bookingData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Confirm Your Booking</h1>
        <p className="text-muted-foreground">Review and confirm your scooter rental.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Scooter Details */}
          <Card>
            <CardHeader>
              <CardTitle>Scooter Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={scooter.image || "/placeholder.svg?height=200&width=300"}
                  alt={scooter.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{scooter.name}</h3>
                <p className="text-muted-foreground">{shop.name}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Pickup: {dates.start}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Return: {dates.end}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Duration: {durationDays} days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Accident Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <InsuranceSelection onSelect={setSelectedInsurance} selectedInsurance={selectedInsurance} />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rental ({durationDays} days)</span>
                <span>${rentalCost}</span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Insurance</span>
                  {selectedInsurance && selectedInsurance !== "none" && <Shield className="h-4 w-4 text-yellow-500" />}
                </div>
                <span>${insuranceCost}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalCost}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full gap-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleCompleteBooking}
              >
                Complete Booking
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
