"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Calendar, MapPin, Clock, CreditCard, Download, Share2, ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function BookingConfirmation() {
  const router = useRouter()

  // Mock booking data
  const booking = {
    id: "B-1001",
    scooterName: "Honda PCX 150cc",
    scooterImage: "/placeholder.svg?height=200&width=300",
    shopName: "Jungle Scooters Pai",
    shopLogo: "/placeholder.svg?height=50&width=50",
    startDate: "March 26, 2025",
    endDate: "March 28, 2025",
    pickupTime: "10:00 AM",
    returnTime: "6:00 PM",
    location: "123 Main Street, Pai, Thailand",
    price: 90,
    insurance: {
      name: "Standard Protection",
      price: 19.98,
    },
    taxes: 10,
    total: 119.98,
    paymentMethod: "Pay at Pickup",
    depositType: "Passport",
    depositAmount: 100,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
        <p className="text-muted-foreground">Your scooter rental has been successfully booked.</p>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Booking Details</CardTitle>
          <CardDescription>Booking ID: {booking.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="aspect-video w-full overflow-hidden rounded-lg sm:w-1/3">
              <img
                src={booking.scooterImage || "/placeholder.svg"}
                alt={booking.scooterName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-bold">{booking.scooterName}</h2>
                <div className="flex items-center gap-2">
                  <img
                    src={booking.shopLogo || "/placeholder.svg"}
                    alt={booking.shopName}
                    className="h-5 w-5 rounded-full"
                  />
                  <span className="text-sm text-muted-foreground">{booking.shopName}</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-yellow-500" />
                  <div className="text-sm">
                    <div className="font-medium">Pickup Date</div>
                    <div className="text-muted-foreground">{booking.startDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-yellow-500" />
                  <div className="text-sm">
                    <div className="font-medium">Return Date</div>
                    <div className="text-muted-foreground">{booking.endDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <div className="text-sm">
                    <div className="font-medium">Pickup Time</div>
                    <div className="text-muted-foreground">{booking.pickupTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <div className="text-sm">
                    <div className="font-medium">Return Time</div>
                    <div className="text-muted-foreground">{booking.returnTime}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Pickup & Return Location</div>
                  <div className="text-muted-foreground">{booking.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scooter Rental (2 days)</span>
                <span>${booking.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Insurance ({booking.insurance.name})</span>
                <span>${booking.insurance.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span>${booking.taxes.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${booking.total.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Payment Method: {booking.paymentMethod}</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Receipt
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-yellow-100 dark:bg-yellow-800/30 p-2">
                <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium">Insurance Coverage</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  You've selected {booking.insurance.name} for your rental.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Damage up to $1,000</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Theft protection</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>$50 deductible</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Basic roadside assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-semibold mb-2">Important Information</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>
                  Please bring your {booking.depositType.toLowerCase()} for the ${booking.depositAmount} deposit.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>A helmet will be provided with your rental.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Please arrive 15 minutes before your pickup time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Cancellation is free up to 24 hours before pickup.</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 sm:flex-row">
          <Button variant="outline" className="w-full gap-2">
            <Share2 className="h-4 w-4" />
            Share Booking
          </Button>
          <Button className="w-full gap-2 bg-yellow-500 hover:bg-yellow-600 text-black" asChild>
            <Link href="/rider-dashboard">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Need help?{" "}
          <Link href="/rider-support" className="text-yellow-500 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
