"use client"

import { useState } from "react"
import { ScooterFilters, type ScooterFilters as ScooterFiltersType } from "./scooter-filters"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

interface Scooter {
  id: string
  name: string
  price: number
  distance: number
  engineType: "manual" | "automatic"
  features: {
    phoneHolder: boolean
    storageCompartment: boolean
    usbPlug: boolean
  }
  helmetIncluded: boolean
  image: string
}

// Mock data for scooters
const mockScooters: Scooter[] = [
  {
    id: "s1",
    name: "Honda PCX 150cc",
    price: 15,
    distance: 0.8,
    engineType: "automatic",
    features: {
      phoneHolder: true,
      storageCompartment: true,
      usbPlug: false,
    },
    helmetIncluded: true,
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "s2",
    name: "Yamaha NMAX 155cc",
    price: 18,
    distance: 1.2,
    engineType: "automatic",
    features: {
      phoneHolder: true,
      storageCompartment: true,
      usbPlug: true,
    },
    helmetIncluded: true,
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "s3",
    name: "Honda Wave 125cc",
    price: 10,
    distance: 1.5,
    engineType: "manual",
    features: {
      phoneHolder: false,
      storageCompartment: true,
      usbPlug: false,
    },
    helmetIncluded: false,
    image: "/placeholder.svg?height=150&width=250",
  },
  // Add more mock scooters as needed
]

export function FindScooters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<ScooterFiltersType>({
    priceRange: [5, 25],
    maxDistance: 5,
    engineType: "any",
    features: {
      phoneHolder: false,
      storageCompartment: false,
      usbPlug: false,
    },
    helmetIncluded: false,
  })
  const [filteredScooters, setFilteredScooters] = useState<Scooter[]>(mockScooters)

  const handleFiltersChange = (newFilters: ScooterFiltersType) => {
    setFilters(newFilters)

    // Apply filters to the scooters
    const filtered = mockScooters.filter((scooter) => {
      // Filter by price
      if (scooter.price < newFilters.priceRange[0] || scooter.price > newFilters.priceRange[1]) {
        return false
      }

      // Filter by distance
      if (scooter.distance > newFilters.maxDistance) {
        return false
      }

      // Filter by engine type
      if (newFilters.engineType !== "any" && scooter.engineType !== newFilters.engineType) {
        return false
      }

      // Filter by features
      if (newFilters.features.phoneHolder && !scooter.features.phoneHolder) {
        return false
      }
      if (newFilters.features.storageCompartment && !scooter.features.storageCompartment) {
        return false
      }
      if (newFilters.features.usbPlug && !scooter.features.usbPlug) {
        return false
      }

      // Filter by helmet
      if (newFilters.helmetIncluded && !scooter.helmetIncluded) {
        return false
      }

      return true
    })

    setFilteredScooters(filtered)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Find Scooters</h1>
        <p className="text-muted-foreground">Discover and book scooters near you.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search location or scooter type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <ScooterFilters onFiltersChange={handleFiltersChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScooters.map((scooter) => (
          <Card key={scooter.id}>
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={scooter.image || "/placeholder.svg"}
                alt={scooter.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{scooter.name}</h3>
                <span className="font-medium">${scooter.price}/hour</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{scooter.distance} miles away</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {scooter.engineType === "automatic" ? "Automatic" : "Manual"}
                </div>
                {scooter.features.phoneHolder && (
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Phone Holder</div>
                )}
                {scooter.features.storageCompartment && (
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Storage</div>
                )}
                {scooter.features.usbPlug && (
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">USB</div>
                )}
                {scooter.helmetIncluded && (
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Helmet</div>
                )}
              </div>
            </CardContent>
            <div className="px-4 pb-4">
              <Button className="w-full">Book Now</Button>
            </div>
          </Card>
        ))}

        {filteredScooters.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-lg font-medium">No scooters match your filters</p>
            <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() =>
                handleFiltersChange({
                  priceRange: [5, 25],
                  maxDistance: 5,
                  engineType: "any",
                  features: {
                    phoneHolder: false,
                    storageCompartment: false,
                    usbPlug: false,
                  },
                  helmetIncluded: false,
                })
              }
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
