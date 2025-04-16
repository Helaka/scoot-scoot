"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Battery, X, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ScooterComparisonProps {
  scooters: any[]
  onClose: () => void
  onRent: (scooterId: string) => void
}

export function ScooterComparison({ scooters, onClose, onRent }: ScooterComparisonProps) {
  const [selectedScooter, setSelectedScooter] = useState<string | null>(null)

  if (scooters.length === 0) return null

  // Define comparison categories
  const categories = [
    { name: "Price", key: "pricePerHour", format: (val) => `$${val}/hr`, compare: "lower" },
    { name: "Daily Rate", key: "pricePerDay", format: (val) => `$${val}`, compare: "lower" },
    { name: "Distance", key: "distance", format: (val) => `${val} km`, compare: "lower" },
    { name: "Rating", key: "rating", format: (val) => `${val}★`, compare: "higher" },
    { name: "Reviews", key: "reviews", format: (val) => val, compare: "higher" },
    { name: "Engine Size", key: "engineSize", format: (val) => (val ? `${val}cc` : "N/A"), compare: "neutral" },
  ]

  // Find best value for each category
  const getBestValue = (category) => {
    if (category.compare === "neutral") return null

    let bestScooterId = scooters[0].id
    let bestValue = scooters[0][category.key]

    scooters.forEach((scooter) => {
      if (category.compare === "lower" && scooter[category.key] < bestValue) {
        bestValue = scooter[category.key]
        bestScooterId = scooter.id
      } else if (category.compare === "higher" && scooter[category.key] > bestValue) {
        bestValue = scooter[category.key]
        bestScooterId = scooter.id
      }
    })

    return bestScooterId
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Compare Scooters</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[600px]">
          <div className="grid grid-cols-[150px_repeat(auto-fill,minmax(180px,1fr))] w-full">
            {/* Header row with images */}
            <div className="sticky top-0 z-10 bg-background border-b p-4">
              <span className="font-medium">Scooter Model</span>
            </div>
            {scooters.map((scooter) => (
              <div key={scooter.id} className="sticky top-0 z-10 bg-background border-b p-4 flex flex-col items-center">
                <div className="relative w-full h-24 mb-2">
                  <img
                    src={scooter.image || "/placeholder.svg?height=100&width=100"}
                    alt={scooter.model}
                    className="h-full w-full object-cover rounded-md"
                  />
                  {selectedScooter === scooter.id && (
                    <div className="absolute inset-0 bg-yellow-500/20 border-2 border-yellow-500 rounded-md"></div>
                  )}
                </div>
                <h3 className="font-medium text-center">{scooter.model}</h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "mt-1",
                    scooter.fuelType === "electric"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "",
                  )}
                >
                  {scooter.fuelType === "electric" ? "Electric" : "Petrol"}
                </Badge>
              </div>
            ))}

            {/* Fuel/Battery Level */}
            <div className="border-b p-4 bg-muted/30">
              <span className="font-medium">Fuel Level</span>
            </div>
            {scooters.map((scooter) => (
              <div key={`fuel-${scooter.id}`} className="border-b p-4 flex justify-center items-center bg-muted/30">
                <div className="flex items-center">
                  {scooter.fuelType === "electric" ? (
                    <>
                      <Battery className="mr-1 h-4 w-4" />
                      <span>{scooter.batteryLevel || 0}%</span>
                    </>
                  ) : (
                    <>
                      <Droplets className="mr-1 h-4 w-4" />
                      <span>{scooter.fuelLevel || 0}%</span>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Comparison categories */}
            {categories.map((category) => {
              const bestId = getBestValue(category)

              return (
                <>
                  <div key={category.name} className="border-b p-4">
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {scooters.map((scooter) => (
                    <div
                      key={`${category.key}-${scooter.id}`}
                      className={cn(
                        "border-b p-4 flex justify-center items-center",
                        bestId === scooter.id ? "bg-green-50 dark:bg-green-900/10" : "",
                      )}
                    >
                      <div className="flex items-center">
                        {bestId === scooter.id && category.compare !== "neutral" && (
                          <Check className="mr-1 h-4 w-4 text-green-500" />
                        )}
                        <span>{category.format(scooter[category.key])}</span>
                      </div>
                    </div>
                  ))}
                </>
              )
            })}

            {/* Action buttons */}
            <div className="border-b p-4 bg-muted/30">
              <span className="font-medium">Actions</span>
            </div>
            {scooters.map((scooter) => (
              <div key={`action-${scooter.id}`} className="border-b p-4 flex justify-center items-center bg-muted/30">
                <Button
                  className={cn(
                    "w-full",
                    selectedScooter === scooter.id ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                  )}
                  variant={selectedScooter === scooter.id ? "default" : "outline"}
                  onClick={() => {
                    if (selectedScooter === scooter.id) {
                      onRent(scooter.id)
                    } else {
                      setSelectedScooter(scooter.id)
                    }
                  }}
                >
                  {selectedScooter === scooter.id ? "Rent Now" : "Select"}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
