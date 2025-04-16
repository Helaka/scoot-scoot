"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Route, ChevronRight, Award, TrendingUp } from "lucide-react"

export function RiderDashboardRidesSummary() {
  // Mock ride statistics
  const rideStats = {
    totalRides: 8,
    totalDistance: 87.5,
    totalTime: "9h 45m",
    longestRide: 18.2,
    avgSpeed: 32,
    lastRideDate: "March 24, 2025",
  }

  // Mock recent achievements
  const achievements = [
    { id: 1, title: "Century Rider", description: "Completed 100km total distance", progress: 87.5, max: 100 },
    { id: 2, title: "Explorer", description: "Visited 5 different destinations", progress: 3, max: 5 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Ride Stats</CardTitle>
            <CardDescription>Track your riding activity</CardDescription>
          </div>
          <Route className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{rideStats.totalRides}</div>
            <div className="text-xs text-muted-foreground">Total Rides</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{rideStats.totalDistance}</div>
            <div className="text-xs text-muted-foreground">Total km</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{rideStats.avgSpeed}</div>
            <div className="text-xs text-muted-foreground">Avg km/h</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Award className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{achievements[0].title}</div>
              <div className="text-xs text-muted-foreground">{achievements[0].description}</div>
              <div className="w-full h-2 bg-muted rounded-full mt-1">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(achievements[0].progress / achievements[0].max) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{achievements[1].title}</div>
              <div className="text-xs text-muted-foreground">{achievements[1].description}</div>
              <div className="w-full h-2 bg-muted rounded-full mt-1">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(achievements[1].progress / achievements[1].max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href="/rider-rides">
            View All Rides
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
