"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Droplets, Battery, X, ChevronRight } from "lucide-react"

interface ScooterQuickViewProps {
  scooter: any
  onClose?: () => void
  compact?: boolean
}

export function ScooterQuickView({ scooter, onClose, compact = false }: ScooterQuickViewProps) {
  if (!scooter) return null

  if (compact) {
    return (
      <Card className="overflow-hidden h-full">
        <div className="relative h-24">
          <img
            src={scooter.image || "/placeholder.svg?height=100&width=200"}
            alt={scooter.model}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-sm font-bold text-white">{scooter.model}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-white text-xs">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{scooter.distance} km</span>
              </div>
              <div className="flex items-center text-white text-xs">
                <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{scooter.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <span className="font-bold">${scooter.pricePerHour}/hr</span>
            <Button size="sm" className="h-7 bg-yellow-500 hover:bg-yellow-600 text-black">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 bg-black/20 hover:bg-black/40 text-white h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <img
          src={scooter.image || "/placeholder.svg?height=150&width=300"}
          alt={scooter.model}
          className="h-40 w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-lg font-bold text-white">{scooter.model}</h3>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="text-sm">{scooter.distance} km away</span>
            </div>
            <Badge className="bg-green-500/80">{scooter.fuelType === "electric" ? "Electric" : "Petrol"}</Badge>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
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

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">{scooter.location}</span>
          </div>
          {scooter.engineSize && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Engine:</span>
              <span className="font-medium">{scooter.engineSize}cc</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">License:</span>
            <span className="font-medium">{scooter.licensePlate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hourly:</span>
            <span className="font-medium">${scooter.pricePerHour}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Daily:</span>
            <span className="font-medium">${scooter.pricePerDay}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">Rent Now</Button>
          <Button variant="outline" className="flex items-center gap-1">
            Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
