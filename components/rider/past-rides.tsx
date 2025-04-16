"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Route, Share2, Download, ChevronRight, Heart, BarChart } from "lucide-react"

interface PastRide {
  id: string
  date: string
  distance: number
  duration: string
  startLocation: string
  endLocation: string
  mapImage: string
  maxSpeed: number
  avgSpeed: number
  elevationGain: number
  scooterName: string
  shopName: string
}

export function PastRides() {
  const [selectedTab, setSelectedTab] = useState("all")

  // Mock past rides data
  const pastRides: PastRide[] = [
    {
      id: "ride-1",
      date: "March 24, 2025",
      distance: 12.4,
      duration: "1h 15m",
      startLocation: "Pai Walking Street",
      endLocation: "Pai Canyon",
      mapImage: "/placeholder.svg?height=200&width=400&text=Ride+Map+1",
      maxSpeed: 45,
      avgSpeed: 32,
      elevationGain: 120,
      scooterName: "Honda PCX 150cc",
      shopName: "Jungle Scooters Pai",
    },
    {
      id: "ride-2",
      date: "March 23, 2025",
      distance: 8.7,
      duration: "0h 45m",
      startLocation: "Pai Walking Street",
      endLocation: "Pai Hot Springs",
      mapImage: "/placeholder.svg?height=200&width=400&text=Ride+Map+2",
      maxSpeed: 40,
      avgSpeed: 28,
      elevationGain: 85,
      scooterName: "Honda PCX 150cc",
      shopName: "Jungle Scooters Pai",
    },
    {
      id: "ride-3",
      date: "March 22, 2025",
      distance: 18.2,
      duration: "2h 05m",
      startLocation: "Pai Walking Street",
      endLocation: "Pai Waterfall",
      mapImage: "/placeholder.svg?height=200&width=400&text=Ride+Map+3",
      maxSpeed: 50,
      avgSpeed: 35,
      elevationGain: 210,
      scooterName: "Honda PCX 150cc",
      shopName: "Jungle Scooters Pai",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Rides</h1>
        <p className="text-muted-foreground">View and share your past rides</p>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Rides</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {pastRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </TabsContent>

        <TabsContent value="favorites" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium">No Favorite Rides Yet</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Mark your favorite rides to easily find them later and share with friends.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Riding Statistics</CardTitle>
              <CardDescription>Your riding activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{pastRides.length}</div>
                    <div className="text-sm text-muted-foreground">Total Rides</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">
                      {pastRides.reduce((sum, ride) => sum + ride.distance, 0).toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Distance (km)</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">4:05</div>
                    <div className="text-sm text-muted-foreground">Total Time</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{Math.max(...pastRides.map((ride) => ride.maxSpeed))}</div>
                    <div className="text-sm text-muted-foreground">Max Speed (km/h)</div>
                  </div>
                </div>

                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-muted-foreground">Detailed statistics coming soon</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Most Active Day</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-purple-100 p-3">
                          <Calendar className="h-6 w-6 text-purple-500" />
                        </div>
                        <div>
                          <div className="font-medium">March 22, 2025</div>
                          <div className="text-sm text-muted-foreground">18.2 km ridden</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Longest Ride</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-yellow-100 p-3">
                          <Route className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                          <div className="font-medium">Pai Waterfall Trip</div>
                          <div className="text-sm text-muted-foreground">18.2 km • 2h 05m</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RideCard({ ride }: { ride: PastRide }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card>
      <div className="md:flex">
        <div className="md:w-1/3 relative">
          <div className="aspect-[4/3] md:h-full w-full overflow-hidden">
            <img
              src={ride.mapImage || "/placeholder.svg"}
              alt={`Map of ride from ${ride.startLocation} to ${ride.endLocation}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="text-sm font-medium">{ride.date}</div>
            <div className="text-xs opacity-90">
              {ride.startLocation} to {ride.endLocation}
            </div>
          </div>
        </div>

        <div className="p-4 md:w-2/3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold">
                {ride.startLocation} to {ride.endLocation}
              </h3>
              <p className="text-sm text-muted-foreground">
                {ride.date} • {ride.scooterName}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={isFavorite ? "text-red-500" : ""}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Distance</div>
              <div className="font-semibold">{ride.distance} km</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-semibold">{ride.duration}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Avg Speed</div>
              <div className="font-semibold">{ride.avgSpeed} km/h</div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="default" size="sm" className="gap-1">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
