"use client"
import { useRiderContext } from "@/contexts/rider-context"
import { ContextAwareMap } from "./context-aware-map"
import { ContextNotification } from "./context-notification"
import { StateSimulator } from "./state-simulator"
import { Bike, MapPin, Clock, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function ContextAwareDashboard() {
  const { state } = useRiderContext()
  const router = useRouter()

  // Render different dashboard content based on context state
  const renderDashboardContent = () => {
    switch (state.state) {
      case "looking":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Available Vehicles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Within 5 minutes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ride Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$5.00</div>
                  <p className="text-xs text-muted-foreground">Valid until 12/31/2023</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Downtown Transit Hub</div>
                  <p className="text-xs text-muted-foreground">Tap to navigate</p>
                </CardContent>
              </Card>
            </div>

            <ContextAwareMap />

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">How to rent a vehicle</h3>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Find an available vehicle on the map</li>
                <li>Tap on it to view details</li>
                <li>Click "Rent Now" to begin your journey</li>
              </ol>
            </div>

            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={() => router.push("/rider-rides")}
              >
                <Clock className="mr-2 h-4 w-4" />
                View My Rides
              </Button>
            </div>
          </div>
        )

      case "active":
        return (
          <div className="space-y-6">
            <Card className="border-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={
                        state.vehicleType === "scooter"
                          ? "bg-green-500 text-white p-2 rounded-full"
                          : "bg-blue-500 text-white p-2 rounded-full"
                      }
                    >
                      <Bike size={20} />
                    </div>
                    <div>
                      <div className="font-medium">
                        {state.vehicleType === "scooter" ? "Scooter" : "Bike"} #{state.rentalId?.split("-")[1]}
                      </div>
                      <div className="text-xs text-muted-foreground">Rental in progress</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-amber-600 font-mono text-lg">
                      <Clock size={16} className="mr-1" />
                      {Math.floor((state.timeRemaining || 0) / 60000)}:
                      {String(Math.floor(((state.timeRemaining || 0) % 60000) / 1000)).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-muted-foreground">Time remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-primary" />
              <span>
                Return to: <span className="font-medium">{state.returnLocation}</span>
              </span>
            </div>

            <ContextAwareMap />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Current Fare</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.50</div>
                  <p className="text-xs text-muted-foreground">$0.15/minute + $1.00 unlock fee</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Insurance</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-green-500" />
                      <span className="text-sm font-medium">Basic Coverage</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Upgrade
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "post_rental":
        return (
          <div className="space-y-6">
            <Card className="border-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={
                        state.vehicleType === "scooter"
                          ? "bg-green-500 text-white p-2 rounded-full"
                          : "bg-blue-500 text-white p-2 rounded-full"
                      }
                    >
                      <Bike size={20} />
                    </div>
                    <div>
                      <div className="font-medium">
                        {state.vehicleType === "scooter" ? "Scooter" : "Bike"} #{state.rentalId?.split("-")[1]}
                      </div>
                      <div className="text-xs text-green-600 font-medium">Rental completed</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>

            <ContextAwareMap />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Trip Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4.50</div>
                  <p className="text-xs text-muted-foreground">30 minutes @ $0.15/min</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Distance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3 mi</div>
                  <p className="text-xs text-muted-foreground">Calories burned: ~120</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Carbon Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">1.2 kg</div>
                  <p className="text-xs text-muted-foreground">Compared to car travel</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button className="w-full max-w-md">Find Another Vehicle</Button>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <ContextNotification />
      {process.env.NODE_ENV === "development" && <StateSimulator />}
      {renderDashboardContent()}
    </div>
  )
}
