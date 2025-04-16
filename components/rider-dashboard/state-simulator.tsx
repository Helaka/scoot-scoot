"use client"

import { useState } from "react"
import { useRiderContext } from "@/contexts/rider-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Bike } from "lucide-react"

export function StateSimulator() {
  const { state, setLookingState, setActiveState, setPostRentalState } = useRiderContext()
  const [rentalTime, setRentalTime] = useState(60) // Default 60 minutes

  const handleStartRental = () => {
    // Convert minutes to milliseconds
    const timeInMs = rentalTime * 60 * 1000

    setActiveState(
      "rental-" + Math.floor(Math.random() * 1000),
      "scooter",
      timeInMs,
      "Beach Scooter Rentals, 123 Ocean Drive",
    )
  }

  const handleCompleteRental = () => {
    if (state.rentalId && state.vehicleType) {
      setPostRentalState(state.rentalId, state.vehicleType)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>State Simulator</CardTitle>
        <CardDescription>Test different rider states to see how the UI adapts</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current State</TabsTrigger>
            <TabsTrigger value="simulate">Simulate</TabsTrigger>
            <TabsTrigger value="debug">Debug</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getStateColor(state.state)}`}>{getStateIcon(state.state)}</div>
                <div>
                  <h3 className="text-lg font-medium">{getStateLabel(state.state)}</h3>
                  <p className="text-sm text-muted-foreground">{getStateDescription(state.state, state)}</p>
                </div>
              </div>

              {state.state === "active" && (
                <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Rental ID:</span>
                      <span className="text-sm">{state.rentalId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Vehicle:</span>
                      <span className="text-sm">{state.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Time Remaining:</span>
                      <span className="text-sm">{formatTime(state.timeRemaining || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Return Location:</span>
                      <span className="text-sm">{state.returnLocation}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="simulate">
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={setLookingState}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>Looking for Scooter</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleCompleteRental}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    disabled={state.state !== "active"}
                  >
                    <Clock className="h-5 w-5" />
                    <span>Complete Rental</span>
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rental-time">Rental Duration (minutes)</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="rental-time"
                      type="number"
                      value={rentalTime}
                      onChange={(e) => setRentalTime(Number.parseInt(e.target.value) || 60)}
                      min={1}
                      max={1440}
                    />
                    <Button onClick={handleStartRental}>Start Rental</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="debug">
            <div className="space-y-4 py-4">
              <pre className="rounded-md bg-slate-100 p-4 overflow-auto text-xs dark:bg-slate-800">
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <p className="text-xs text-muted-foreground">
          This simulator is for testing purposes only and will not be visible to users.
        </p>
      </CardFooter>
    </Card>
  )
}

function getStateColor(state: string): string {
  switch (state) {
    case "looking":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
    case "active":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
    case "post_rental":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
  }
}

function getStateIcon(state: string) {
  switch (state) {
    case "looking":
      return <MapPin className="h-5 w-5" />
    case "active":
      return <Bike className="h-5 w-5" />
    case "post_rental":
      return <Clock className="h-5 w-5" />
    default:
      return <MapPin className="h-5 w-5" />
  }
}

function getStateLabel(state: string): string {
  switch (state) {
    case "looking":
      return "Looking for Scooter"
    case "active":
      return "Active Rental"
    case "post_rental":
      return "Rental Completed"
    default:
      return "Idle"
  }
}

function getStateDescription(state: string, contextState: any): string {
  switch (state) {
    case "looking":
      return "Browsing available scooters nearby"
    case "active":
      return `Renting a ${contextState.vehicleType} with ${formatTime(contextState.timeRemaining || 0)} remaining`
    case "post_rental":
      return "Recently completed a rental"
    default:
      return "No active context"
  }
}

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`
  }
  return `${remainingMinutes}m`
}
