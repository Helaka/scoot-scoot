"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Shield, Battery, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRiderContext } from "@/contexts/rider-context"
import { useRouter } from "next/navigation"

interface ActiveRentalViewProps {
  rentalId: string
  vehicleType: string
  timeRemaining: number
  returnLocation: string
}

export function ActiveRentalView({
  rentalId,
  vehicleType,
  timeRemaining: initialTimeRemaining,
  returnLocation,
}: ActiveRentalViewProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining)
  const [activeTab, setActiveTab] = useState("info")
  const { dispatch } = useRiderContext()
  const router = useRouter()

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0
        return prev - 1000 // Decrease by 1 second
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Format time remaining
  const hours = Math.floor(timeRemaining / 3600000)
  const minutes = Math.floor((timeRemaining % 3600000) / 60000)
  const seconds = Math.floor((timeRemaining % 60000) / 1000)
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  // Calculate percentage of time remaining (assuming 2-hour rental)
  const timePercentage = Math.min(100, Math.max(0, (timeRemaining / (2 * 3600000)) * 100))

  // Handle extend rental
  const handleExtendRental = () => {
    // In a real app, this would call an API
    setTimeRemaining((prev) => prev + 3600000) // Add 1 hour
  }

  // Handle end rental
  const handleEndRental = () => {
    // In a real app, this would call an API
    dispatch({ type: "SET_POST_RENTAL", payload: { rentalId, vehicleType } })
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Active Rental Card */}
      <Card className="border-yellow-500">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="flex items-center text-lg">
            <Clock className="mr-2 h-5 w-5 text-yellow-500" />
            Active Rental
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">
                  {vehicleType === "scooter" ? "Scooter" : "Vehicle"} #{rentalId.slice(-4)}
                </h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Battery className="h-4 w-4 mr-1" />
                  <span>87% Battery</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Time Remaining</p>
                <p className="text-xl font-bold">{formattedTime}</p>
              </div>
            </div>

            <Progress value={timePercentage} className="h-2" />

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span className="text-muted-foreground">{returnLocation}</span>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleExtendRental}>
                <Clock className="h-4 w-4 mr-2" />
                Extend Time
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleEndRental}>
                <MapPin className="h-4 w-4 mr-2" />
                Return Now
              </Button>
            </div>
            <Button variant="ghost" className="w-full mt-2 text-primary" onClick={() => router.push("/rider-rides")}>
              <Clock className="h-4 w-4 mr-2" />
              My Rides
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Map and Safety */}
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Map & Directions</TabsTrigger>
          <TabsTrigger value="safety">Safety Checkpoints</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-2">
          {/* Navigation Map */}
          <Card>
            <CardContent className="p-0">
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                {/* This would be a real map in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-gray-400" />
                </div>

                {/* Map Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <Navigation className="h-5 w-5 mr-2" />
                    <div>
                      <h3 className="font-medium">Return Location</h3>
                      <p className="text-sm opacity-80">2.3 miles away</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directions */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-medium">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Continue on Main Street</p>
                    <p className="text-sm text-muted-foreground">0.8 miles</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-medium">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Turn right onto Oak Avenue</p>
                    <p className="text-sm text-muted-foreground">1.2 miles</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-medium">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Arrive at return location</p>
                    <p className="text-sm text-muted-foreground">ScootScoot Hub #42</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="mt-2">
          {/* Safety Checkpoints */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Shield className="mr-2 h-5 w-5 text-blue-500" />
                Safety Checkpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, type: "Police", location: "1.2 miles ahead on Main St", time: "5 min" },
                  { id: 2, type: "Traffic", location: "Oak Ave & 5th St intersection", time: "12 min" },
                ].map((checkpoint) => (
                  <div key={checkpoint.id} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{checkpoint.type} Checkpoint</h4>
                      <p className="text-sm text-muted-foreground">{checkpoint.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{checkpoint.time}</span>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Safety Tips</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Always wear a helmet when riding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Follow all traffic laws and signals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Stay in designated lanes when available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
