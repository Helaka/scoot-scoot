"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Download, Heart, ArrowLeft, Thermometer, TrendingUp, Zap } from "lucide-react"

export default function RideDetailPage() {
  const params = useParams()
  const router = useRouter()
  const rideId = params.id
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock ride data - in a real app, this would be fetched based on the ID
  const ride = {
    id: rideId,
    date: "March 24, 2025",
    time: "10:30 AM - 11:45 AM",
    distance: 12.4,
    duration: "1h 15m",
    startLocation: "Pai Walking Street",
    endLocation: "Pai Canyon",
    mapImage: "/placeholder.svg?height=400&width=800&text=Detailed+Ride+Map",
    maxSpeed: 45,
    avgSpeed: 32,
    elevationGain: 120,
    elevationLoss: 85,
    calories: 320,
    scooterName: "Honda PCX 150cc",
    shopName: "Jungle Scooters Pai",
    weather: "Sunny, 28°C",
    waypoints: [
      { name: "Pai Walking Street", time: "10:30 AM", type: "start" },
      { name: "Coffee in Love", time: "10:45 AM", type: "poi" },
      { name: "Viewpoint", time: "11:15 AM", type: "poi" },
      { name: "Pai Canyon", time: "11:45 AM", type: "end" },
    ],
    speedData: [
      { time: "10:30", speed: 20 },
      { time: "10:40", speed: 35 },
      { time: "10:50", speed: 40 },
      { time: "11:00", speed: 30 },
      { time: "11:10", speed: 25 },
      { time: "11:20", speed: 35 },
      { time: "11:30", speed: 40 },
      { time: "11:40", speed: 30 },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ride Details</h1>
          <p className="text-muted-foreground">{ride.date}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={isFavorite ? "text-red-500" : ""}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle>Ride Map</CardTitle>
            <CardDescription>
              {ride.startLocation} to {ride.endLocation}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md">
              <img
                src={ride.mapImage || "/placeholder.svg"}
                alt={`Map of ride from ${ride.startLocation} to ${ride.endLocation}`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  Start
                </Badge>
                <div className="text-sm">
                  {ride.startLocation} • {ride.waypoints[0].time}
                </div>
              </div>

              {ride.waypoints.slice(1, -1).map((waypoint, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                    Stop
                  </Badge>
                  <div className="text-sm">
                    {waypoint.name} • {waypoint.time}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                  End
                </Badge>
                <div className="text-sm">
                  {ride.endLocation} • {ride.waypoints[ride.waypoints.length - 1].time}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Ride Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Distance</div>
                    <div className="text-xl font-semibold">{ride.distance} km</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="text-xl font-semibold">{ride.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Speed</div>
                    <div className="text-xl font-semibold">{ride.avgSpeed} km/h</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Max Speed</div>
                    <div className="text-xl font-semibold">{ride.maxSpeed} km/h</div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Thermometer className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm">{ride.weather}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm">Elevation Gain: {ride.elevationGain}m</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-100 p-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm">Calories: {ride.calories}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Scooter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt={ride.scooterName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{ride.scooterName}</div>
                  <div className="text-sm text-muted-foreground">{ride.shopName}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Speed Analysis</CardTitle>
          <CardDescription>Your speed throughout the ride</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground">Speed chart visualization coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
