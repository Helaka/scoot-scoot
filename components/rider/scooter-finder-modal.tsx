"use client"

import { useState } from "react"
import { X, Search, MapPin, Star, MapIcon, List, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScooterFilters } from "./scooter-filters"
import Link from "next/link"

export function ScooterFinderModal({ onClose }: { onClose: () => void }) {
  // State for map toggles and search
  const [showHeatMap, setShowHeatMap] = useState(true)
  const [showPoliceCheckpoints, setShowPoliceCheckpoints] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("map")

  // Mock data for nearby scooters
  const nearbyScooters = [
    {
      id: "scooter-1",
      name: "Honda PCX 150cc",
      image: "/placeholder.svg?height=150&width=250",
      price: 15,
      distance: 0.5,
      shop: "Jungle Scooters Pai",
      shopRating: 4.8,
      engineType: "automatic",
      features: {
        phoneHolder: true,
        storageCompartment: true,
        usbPlug: false,
      },
      helmetIncluded: true,
    },
    {
      id: "scooter-2",
      name: "Yamaha NMAX 155cc",
      image: "/placeholder.svg?height=150&width=250",
      price: 18,
      distance: 0.7,
      shop: "City Scooters Bangkok",
      shopRating: 4.6,
      engineType: "automatic",
      features: {
        phoneHolder: true,
        storageCompartment: true,
        usbPlug: true,
      },
      helmetIncluded: true,
    },
    {
      id: "scooter-3",
      name: "Honda Wave 125cc",
      image: "/placeholder.svg?height=150&width=250",
      price: 10,
      distance: 1.0,
      shop: "Vintage Scooter Co.",
      shopRating: 4.9,
      engineType: "manual",
      features: {
        phoneHolder: false,
        storageCompartment: true,
        usbPlug: false,
      },
      helmetIncluded: false,
    },
  ]

  const [filteredScooters, setFilteredScooters] = useState(nearbyScooters)

  // Handle filter changes
  const handleFiltersChange = (filters: any) => {
    console.log("Filters applied:", filters)

    // Filter scooters based on the applied filters
    const filtered = nearbyScooters.filter((scooter) => {
      // Filter by price
      if (scooter.price < filters.priceRange[0] || scooter.price > filters.priceRange[1]) {
        return false
      }

      // Filter by distance
      if (scooter.distance > filters.maxDistance) {
        return false
      }

      // Filter by engine type
      if (filters.engineType !== "any" && scooter.engineType !== filters.engineType) {
        return false
      }

      // Filter by features
      if (filters.features.phoneHolder && !scooter.features.phoneHolder) {
        return false
      }
      if (filters.features.storageCompartment && !scooter.features.storageCompartment) {
        return false
      }
      if (filters.features.usbPlug && !scooter.features.usbPlug) {
        return false
      }

      // Filter by helmet
      if (filters.helmetIncluded && !scooter.helmetIncluded) {
        return false
      }

      return true
    })

    setFilteredScooters(filtered)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Find Another Scooter</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="relative">
            <Tabs defaultValue="map" className="w-full" onValueChange={setActiveView}>
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <TabsList className="grid grid-cols-2 w-[180px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                  <TabsTrigger value="map" className="flex items-center gap-1">
                    <MapIcon className="h-4 w-4" />
                    <span>Map</span>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-1">
                    <List className="h-4 w-4" />
                    <span>List</span>
                  </TabsTrigger>
                </TabsList>

                {activeView === "map" && (
                  <div className="rounded-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-2 shadow-sm">
                    <div className="space-y-2">
                      <button
                        className="flex w-full items-center justify-between rounded-sm px-2 py-1 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowHeatMap(!showHeatMap)}
                      >
                        <span>Heat Map</span>
                        <div
                          className={`h-4 w-8 rounded-full ${showHeatMap ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-200 dark:bg-gray-700"} p-0.5 transition-colors`}
                        >
                          <div
                            className={`h-3 w-3 rounded-full ${showHeatMap ? "bg-purple-500 translate-x-4" : "bg-gray-400"} transition-transform`}
                          />
                        </div>
                      </button>
                      <button
                        className="flex w-full items-center justify-between rounded-sm px-2 py-1 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowPoliceCheckpoints(!showPoliceCheckpoints)}
                      >
                        <span>Police Checkpoints</span>
                        <div
                          className={`h-4 w-8 rounded-full ${showPoliceCheckpoints ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-200 dark:bg-gray-700"} p-0.5 transition-colors`}
                        >
                          <div
                            className={`h-3 w-3 rounded-full ${showPoliceCheckpoints ? "bg-purple-500 translate-x-4" : "bg-gray-400"} transition-transform`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                <ScooterFilters
                  onFiltersChange={handleFiltersChange}
                  className="rounded-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm"
                />
              </div>

              <TabsContent value="map" className="m-0">
                {/* Map Placeholder - This would be replaced with an actual map integration */}
                <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
                  <img
                    src="/placeholder.svg?height=400&width=800&text=Interactive+Map"
                    alt="Map View"
                    className="h-full w-full object-cover"
                  />

                  {/* Map Overlay UI */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

                  {/* Search Bar */}
                  <div className="absolute top-4 left-4 z-10 w-full max-w-md">
                    <form className="relative">
                      <Input
                        type="text"
                        placeholder="Search for scooters, locations, or shops..."
                        className="pl-10 pr-10 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-300 dark:border-gray-700 rounded-full shadow-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                        >
                          <X className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Map Pins - Simulated */}
                  <div className="absolute top-1/4 left-1/4">
                    <div className="relative">
                      <MapPin className="h-8 w-8 text-purple-500 -translate-x-1/2 -translate-y-full" />
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 rounded-full bg-purple-500 -translate-x-1/2 animate-ping" />
                    </div>
                  </div>
                  <div className="absolute top-1/3 right-1/3">
                    <div className="relative">
                      <MapPin className="h-8 w-8 text-purple-500 -translate-x-1/2 -translate-y-full" />
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 rounded-full bg-purple-500 -translate-x-1/2 animate-ping" />
                    </div>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4">
                    <div className="relative">
                      <MapPin className="h-8 w-8 text-purple-500 -translate-x-1/2 -translate-y-full" />
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 rounded-full bg-purple-500 -translate-x-1/2 animate-ping" />
                    </div>
                  </div>

                  {/* Heat Map Overlay - Simulated */}
                  {showHeatMap && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-red-500/20 blur-xl" />
                      <div className="absolute top-1/3 right-1/3 h-40 w-40 rounded-full bg-red-500/30 blur-xl" />
                      <div className="absolute bottom-1/4 right-1/4 h-36 w-36 rounded-full bg-red-500/25 blur-xl" />
                    </div>
                  )}

                  {/* Police Checkpoints - Simulated */}
                  {showPoliceCheckpoints && (
                    <>
                      <div className="absolute top-1/2 left-1/3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                          <Shield className="h-4 w-4 text-blue-500" />
                        </div>
                      </div>
                      <div className="absolute bottom-1/3 right-1/5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                          <Shield className="h-4 w-4 text-blue-500" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* User Location */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
                      <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="list" className="m-0 p-4">
                <div className="relative">
                  {/* Search Bar for List View */}
                  <div className="mb-4 max-w-md">
                    <form className="relative">
                      <Input
                        type="text"
                        placeholder="Search for scooters, locations, or shops..."
                        className="pl-10 pr-10 py-2 border-gray-300 dark:border-gray-700 rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                        >
                          <X className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Scooter List */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredScooters.map((scooter) => (
                      <Card key={scooter.id} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={scooter.image || "/placeholder.svg"}
                            alt={scooter.name}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">{scooter.name}</h3>
                            <span className="font-medium">${scooter.price}/day</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{scooter.distance} miles away</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                              <span>{scooter.shopRating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{scooter.shop}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {scooter.engineType === "automatic" ? "Automatic" : "Manual"}
                            </Badge>
                            {scooter.features.phoneHolder && (
                              <Badge variant="outline" className="text-xs">
                                Phone Holder
                              </Badge>
                            )}
                            {scooter.features.storageCompartment && (
                              <Badge variant="outline" className="text-xs">
                                Storage
                              </Badge>
                            )}
                            {scooter.features.usbPlug && (
                              <Badge variant="outline" className="text-xs">
                                USB Plug
                              </Badge>
                            )}
                            {scooter.helmetIncluded && (
                              <Badge variant="outline" className="text-xs">
                                Helmet Included
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full">Book Now</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  {filteredScooters.length === 0 && (
                    <div className="text-center py-12">
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
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button asChild>
            <Link href="/rider-discover">View All Scooters</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
