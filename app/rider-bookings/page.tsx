"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Star, RotateCcw, Download, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { ScooterFinderModal } from "@/components/rider/scooter-finder-modal"

export default function RiderBookingsPage() {
  const [showScooterFinder, setShowScooterFinder] = useState(false)

  // Mock data for bookings
  const activeBookings = [
    {
      id: "R-1001",
      scooterName: "Honda PCX 150cc",
      scooterImage: "/placeholder.svg?height=200&width=300",
      shopName: "Jungle Scooters Pai",
      startDate: "March 25, 2025",
      endDate: "March 27, 2025",
      remainingHours: 48,
      totalHours: 72,
      price: 45,
    },
  ]

  const pastBookings = [
    {
      id: "R-1000",
      scooterName: "Yamaha NMAX 155cc",
      scooterImage: "/placeholder.svg?height=200&width=300",
      shopName: "City Scooters Bangkok",
      startDate: "March 20, 2025",
      endDate: "March 22, 2025",
      totalDays: 2,
      price: 90,
      rated: false,
    },
    {
      id: "R-999",
      scooterName: "Honda Wave 125cc",
      scooterImage: "/placeholder.svg?height=200&width=300",
      shopName: "Vintage Scooter Co.",
      startDate: "March 10, 2025",
      endDate: "March 15, 2025",
      totalDays: 5,
      price: 50,
      rated: true,
    },
  ]

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">Manage your current and past scooter rentals.</p>
      </div>

      {/* Find New Scooter Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 dark:from-purple-950/30 dark:to-amber-950/30 border-purple-200 dark:border-purple-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Looking for another scooter?</h3>
              <p className="text-muted-foreground">Browse available scooters near you and book your next ride.</p>
            </div>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={() => setShowScooterFinder(true)}>
              Find Scooters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scooter Finder Modal */}
      {showScooterFinder && <ScooterFinderModal onClose={() => setShowScooterFinder(false)} />}

      {/* Bookings Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active">Active Bookings</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {activeBookings.length > 0 ? (
            <div className="grid gap-6">
              {activeBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <div className="aspect-video w-full h-full overflow-hidden">
                        <img
                          src={booking.scooterImage || "/placeholder.svg"}
                          alt={booking.scooterName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{booking.scooterName}</h3>
                          <p className="text-muted-foreground">{booking.shopName}</p>
                        </div>
                        <Badge className="bg-yellow-500 text-black">Active</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-medium">{booking.startDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">End Date</p>
                            <p className="font-medium">{booking.endDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Remaining</p>
                            <p className="font-medium">{booking.remainingHours} hours</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Total Price</p>
                            <p className="font-medium">${booking.price}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button asChild variant="outline">
                          <Link href={`/rider-dashboard?demo=true&state=active`}>View Details</Link>
                        </Button>
                        <Button>Extend Rental</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-lg font-medium">No active bookings</p>
              <p className="text-muted-foreground mb-4">You don't have any active scooter rentals at the moment.</p>
              <Button
                onClick={() => setShowScooterFinder(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Find Scooters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastBookings.length > 0 ? (
            <div className="grid gap-6">
              {pastBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <div className="aspect-video w-full h-full overflow-hidden">
                        <img
                          src={booking.scooterImage || "/placeholder.svg"}
                          alt={booking.scooterName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{booking.scooterName}</h3>
                          <p className="text-muted-foreground">{booking.shopName}</p>
                        </div>
                        <Badge className="bg-green-500 text-white">Completed</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-medium">{booking.startDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">End Date</p>
                            <p className="font-medium">{booking.endDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">{booking.totalDays} days</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Total Price</p>
                            <p className="font-medium">${booking.price}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {!booking.rated ? (
                          <Button className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                            <ThumbsUp className="h-4 w-4" />
                            Leave Review
                          </Button>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
                          >
                            Reviewed
                          </Badge>
                        )}
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download Receipt
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <RotateCcw className="h-4 w-4" />
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-lg font-medium">No past bookings</p>
              <p className="text-muted-foreground mb-4">You haven't completed any scooter rentals yet.</p>
              <Button
                onClick={() => setShowScooterFinder(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Find Your First Scooter
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
