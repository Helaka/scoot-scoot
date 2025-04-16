"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Droplets, Battery, Heart, Map } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface ScooterListViewProps {
  scooters: any[]
  onViewChange: (view: "map" | "list") => void
  onScooterSelect: (scooter: any) => void
  onCompare: (scooters: any[]) => void
  selectedScooters: string[]
  onToggleSelect: (scooterId: string) => void
}

export function ScooterListView({
  scooters,
  onViewChange,
  onScooterSelect,
  onCompare,
  selectedScooters,
  onToggleSelect,
}: ScooterListViewProps) {
  const isMobile = useMobile()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing {scooters.length} scooters</div>

        <div className="flex items-center gap-2">
          {selectedScooters.length >= 2 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const scootersToCompare = scooters.filter((s) => selectedScooters.includes(s.id))
                onCompare(scootersToCompare)
              }}
            >
              Compare ({selectedScooters.length})
            </Button>
          )}

          {isMobile && (
            <Button variant="outline" size="sm" className="gap-1" onClick={() => onViewChange("map")}>
              <Map className="h-4 w-4" />
              Map View
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scooters.map((scooter) => (
          <Card
            key={scooter.id}
            className={cn(
              "overflow-hidden transition-all",
              selectedScooters.includes(scooter.id) ? "ring-2 ring-yellow-500 dark:ring-yellow-400" : "",
            )}
          >
            <div className="relative">
              <img
                src={scooter.image || "/placeholder.svg?height=150&width=300"}
                alt={scooter.model}
                className="h-48 w-full object-cover cursor-pointer"
                onClick={() => onScooterSelect(scooter)}
              />

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white",
                  selectedScooters.includes(scooter.id) ? "bg-yellow-500 hover:bg-yellow-600" : "",
                )}
                onClick={() => onToggleSelect(scooter.id)}
              >
                <Heart className={cn("h-4 w-4", selectedScooters.includes(scooter.id) ? "fill-current" : "")} />
              </Button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-lg font-bold text-white">{scooter.model}</h3>
                <div className="flex items-center text-white">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span className="text-sm">{scooter.distance} km away</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{scooter.rating}</span>
                  <span className="ml-1 text-sm text-muted-foreground">({scooter.reviews})</span>
                </div>
                <div className="flex items-center">
                  {scooter.fuelType === "electric" ? (
                    <>
                      <Battery className="mr-1 h-4 w-4" />
                      <span>{scooter.batteryLevel}%</span>
                    </>
                  ) : (
                    <>
                      <Droplets className="mr-1 h-4 w-4" />
                      <span>{scooter.fuelLevel}%</span>
                    </>
                  )}
                </div>
              </div>
              <div className="mb-2 text-sm">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{scooter.location}</span>
                </div>
                {scooter.engineSize && (
                  <div className="flex justify-between">
                    <span>Engine:</span>
                    <span className="font-medium">{scooter.engineSize}cc</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>License:</span>
                  <span className="font-medium">{scooter.licensePlate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hourly Rate:</span>
                  <span className="font-medium">${scooter.pricePerHour}</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Rate:</span>
                  <span className="font-medium">${scooter.pricePerDay}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => onScooterSelect(scooter)}
                >
                  Rent Now
                </Button>
                <Button variant="outline" size="icon" onClick={() => onToggleSelect(scooter.id)}>
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      selectedScooters.includes(scooter.id) ? "fill-current text-yellow-500" : "",
                    )}
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
