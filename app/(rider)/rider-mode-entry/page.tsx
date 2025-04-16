"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation, Map, Shield, Compass, Route, Zap, AlertTriangle, Info, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RiderMode } from "@/components/rider/rider-mode"

export default function RiderModePage() {
  const [showRiderMode, setShowRiderMode] = useState(false)
  const router = useRouter()

  // Mock data for active rental - in a real app, this would come from your backend
  const activeRental = {
    id: "R-1001",
    scooterName: "Honda PCX 150cc",
    scooterImage: "/placeholder.svg?height=200&width=300",
    shopName: "Jungle Scooters Pai",
    startDate: "March 25, 2025",
    endDate: "March 27, 2025",
    remainingHours: 48,
    totalHours: 72,
    price: 45,
    location: "123 Main Street, Pai, Thailand",
    insurancePlan: "Standard Coverage",
  }

  // Mock data for past rides
  const pastRides = [
    {
      id: "ride-1",
      date: "March 22, 2025",
      distance: 12.5,
      duration: "1h 45m",
      startLocation: "Pai Walking Street",
      endLocation: "Pai Canyon",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "ride-2",
      date: "March 20, 2025",
      distance: 8.3,
      duration: "1h 10m",
      startLocation: "Pai Night Market",
      endLocation: "Pai Hot Springs",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "ride-3",
      date: "March 18, 2025",
      distance: 15.7,
      duration: "2h 05m",
      startLocation: "Pai Center",
      endLocation: "Pai Waterfall",
      image: "/placeholder.svg?height=150&width=250",
    },
  ]

  // Mock data for popular routes
  const popularRoutes = [
    {
      id: "route-1",
      name: "Pai Canyon Loop",
      distance: 14.2,
      duration: "1h 30m",
      difficulty: "Moderate",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "route-2",
      name: "Hot Springs Tour",
      distance: 18.5,
      duration: "2h 15m",
      difficulty: "Easy",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "route-3",
      name: "Pai Viewpoint Circuit",
      distance: 22.3,
      duration: "3h 00m",
      difficulty: "Challenging",
      image: "/placeholder.svg?height=150&width=250",
    },
  ]

  // Check if there's an active rental - in a real app, this would be a proper check
  const hasActiveRental = true

  if (showRiderMode) {
    return <RiderMode rental={activeRental} onExit={() => setShowRiderMode(false)} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rider Mode</h1>
        <p className="text-muted-foreground">Enhance your riding experience with navigation and tracking.</p>
      </div>

      {/* Main Rider Mode Card */}
      <Card className="border-2 border-purple-200 dark:border-purple-900 overflow-hidden">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <img
            src="/placeholder.svg?height=400&width=800&text=Rider+Mode"
            alt="Rider Mode"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">Rider Mode</h2>
            <p className="text-white/80 max-w-md mb-4">
              Navigate, track your rides, and stay safe with our interactive riding companion.
            </p>
            {hasActiveRental ? (
              <Button
                size="lg"
                className="w-fit gap-2 bg-gradient-to-r from-purple-500 to-yellow-500 text-white hover:from-purple-600 hover:to-yellow-600"
                onClick={() => setShowRiderMode(true)}
              >
                <Navigation className="h-5 w-5" />
                Enter Rider Mode
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="w-fit gap-2 bg-black/30 text-white border-white/30 hover:bg-black/50 hover:text-white"
                onClick={() => router.push("/rider-explore")}
              >
                <Map className="h-5 w-5" />
                Rent a Scooter to Start
              </Button>
            )}
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 rounded-lg border">
              <Map className="h-10 w-10 text-purple-500 mb-2" />
              <h3 className="font-semibold">Interactive Map</h3>
              <p className="text-sm text-muted-foreground">
                Navigate with real-time directions and points of interest.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border">
              <Shield className="h-10 w-10 text-blue-500 mb-2" />
              <h3 className="font-semibold">Safety Features</h3>
              <p className="text-sm text-muted-foreground">Police checkpoints, emergency SOS, and safety alerts.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border">
              <Route className="h-10 w-10 text-green-500 mb-2" />
              <h3 className="font-semibold">Ride Tracking</h3>
              <p className="text-sm text-muted-foreground">Record your routes, stats, and share your adventures.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="past-rides">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="past-rides">Your Rides</TabsTrigger>
          <TabsTrigger value="popular-routes">Popular Routes</TabsTrigger>
          <TabsTrigger value="tips">Riding Tips</TabsTrigger>
        </TabsList>

        {/* Past Rides Tab */}
        <TabsContent value="past-rides" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Recent Rides</h3>
            <Button asChild variant="outline" size="sm">
              <Link href="/rider-rides">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pastRides.map((ride) => (
              <Card key={ride.id} className="overflow-hidden">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={ride.image || "/placeholder.svg"}
                    alt={`Route from ${ride.startLocation} to ${ride.endLocation}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{ride.date}</h4>
                    <Badge variant="outline">{ride.distance} km</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {ride.startLocation} → {ride.endLocation}
                  </p>
                  <p className="text-sm text-muted-foreground">Duration: {ride.duration}</p>
                </CardContent>
                <CardFooter className="p-0">
                  <Button asChild variant="ghost" className="w-full rounded-t-none border-t">
                    <Link href={`/rider-rides/${ride.id}`}>
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Popular Routes Tab */}
        <TabsContent value="popular-routes" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Popular Routes Near You</h3>
            <Button variant="outline" size="sm">
              Explore All Routes
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {popularRoutes.map((route) => (
              <Card key={route.id} className="overflow-hidden">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={route.image || "/placeholder.svg"}
                    alt={route.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{route.name}</h4>
                    <Badge
                      variant="outline"
                      className={
                        route.difficulty === "Easy"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : route.difficulty === "Moderate"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                            : "bg-red-100 text-red-800 border-red-300"
                      }
                    >
                      {route.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{route.distance} km</span>
                    <span>{route.duration}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-0">
                  <Button variant="ghost" className="w-full rounded-t-none border-t">
                    View Route
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Riding Tips Tab */}
        <TabsContent value="tips" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Riding Safety Tips</CardTitle>
              <CardDescription>Stay safe while enjoying your scooter adventure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="rounded-full bg-red-100 p-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Always Wear a Helmet</h4>
                  <p className="text-sm text-muted-foreground">Protect your head at all times, even for short trips.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="rounded-full bg-yellow-100 p-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Stay Visible</h4>
                  <p className="text-sm text-muted-foreground">
                    Use lights and wear bright clothing, especially at night.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="rounded-full bg-blue-100 p-2">
                  <Compass className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Plan Your Route</h4>
                  <p className="text-sm text-muted-foreground">Know where you're going and avoid dangerous areas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="rounded-full bg-green-100 p-2">
                  <Info className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Know Local Laws</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand traffic rules and regulations for scooters.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Complete Safety Guide
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
