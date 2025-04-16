"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Map,
  Calendar,
  MapPin,
  Phone,
  AlertCircle,
  ChevronRight,
  Star,
  Bike,
  QrCode,
  MessageSquare,
  Heart,
  RotateCcw,
  ThumbsUp,
  Download,
  Shield,
  Navigation,
  Route,
  Search,
  X,
  List,
  MapIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RiderMode } from "@/components/rider/rider-mode"
import { ActiveRentalInsurance } from "./active-rental-insurance"
import { Input } from "@/components/ui/input"
// First, import the ScooterFilters component at the top of the file with the other imports
import { ScooterFilters } from "./scooter-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScooterFinderModal } from "./scooter-finder-modal"

// Rental states
type RentalState = "none" | "active" | "post-rental"

export function RiderDashboard() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"

  // For demo purposes, we'll allow switching between states
  const initialRentalState = isDemo ? "none" : "none" // Default to "none" if not in demo mode
  const [rentalState, setRentalState] = useState<RentalState>("none")
  const [showRiderMode, setShowRiderMode] = useState(false)

  // Mock data for active rental
  const activeRental = {
    id: "R-1001",
    scooterName: "Honda PCX 150cc",
    scooterImage: "/placeholder.svg?height=200&width=300",
    shopName: "Jungle Scooters Pai",
    startDate: "March 25, 2025",
    endDate: "March 27, 2025",
    remainingHours: 48,
    totalHours: 72,
    price: 45,
    location: "123 Main Street, Pai, Thailand",
    insurancePlan: "Standard Coverage",
  }

  // Mock data for completed rental
  const completedRental = {
    id: "R-1000",
    scooterName: "Yamaha NMAX 155cc",
    scooterImage: "/placeholder.svg?height=200&width=300",
    shopName: "City Scooters Bangkok",
    startDate: "March 20, 2025",
    endDate: "March 22, 2025",
    totalDays: 2,
    price: 90,
    rated: false,
  }

  // For demo purposes, we'll show a banner
  const DemoBanner = () => (
    <div className="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-yellow-200 p-1 dark:bg-yellow-800">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Demo Mode</p>
            <p className="text-sm">View different rental states</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-300 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/50 dark:hover:bg-yellow-900 dark:text-yellow-100"
            onClick={() => setRentalState("none")}
          >
            No Rental
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-300 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/50 dark:hover:bg-yellow-900 dark:text-yellow-100"
            onClick={() => setRentalState("active")}
          >
            Active Rental
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-300 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/50 dark:hover:bg-yellow-900 dark:text-yellow-100"
            onClick={() => setRentalState("post-rental")}
          >
            Post Rental
          </Button>
        </div>
      </div>
    </div>
  )

  // Render different dashboard based on rental state
  const renderDashboardContent = () => {
    switch (rentalState) {
      case "active":
        return <ActiveRentalDashboard rental={activeRental} onEnterRiderMode={() => setShowRiderMode(true)} />
      case "post-rental":
        return <PostRentalDashboard rental={completedRental} />
      default:
        return <NoRentalDashboard />
    }
  }

  return (
    <div className="space-y-6">
      {isDemo && <DemoBanner />}
      {showRiderMode ? (
        <RiderMode rental={activeRental} onExit={() => setShowRiderMode(false)} />
      ) : (
        renderDashboardContent()
      )}
    </div>
  )
}

// Dashboard when rider has no active rentals
function NoRentalDashboard() {
  // Mock data for nearby shops
  const nearbyShops = [
    {
      id: "shop-1",
      name: "Jungle Scooters Pai",
      image: "/placeholder.svg?height=150&width=250",
      rating: 4.8,
      reviews: 124,
      distance: 0.8,
      scootersAvailable: 12,
    },
    {
      id: "shop-2",
      name: "City Scooters Bangkok",
      image: "/placeholder.svg?height=150&width=250",
      rating: 4.6,
      reviews: 98,
      distance: 1.2,
      scootersAvailable: 8,
    },
    {
      id: "shop-3",
      name: "Vintage Scooter Co.",
      image: "/placeholder.svg?height=150&width=250",
      rating: 4.9,
      reviews: 156,
      distance: 1.5,
      scootersAvailable: 15,
    },
  ]

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
    {
      id: "scooter-4",
      name: "Vespa Primavera 150cc",
      image: "/placeholder.svg?height=150&width=250",
      price: 22,
      distance: 1.2,
      shop: "Vintage Scooter Co.",
      shopRating: 4.9,
      engineType: "automatic",
      features: {
        phoneHolder: true,
        storageCompartment: true,
        usbPlug: true,
      },
      helmetIncluded: true,
    },
    {
      id: "scooter-5",
      name: "Scomadi TL 125cc",
      image: "/placeholder.svg?height=150&width=250",
      price: 20,
      distance: 1.3,
      shop: "City Scooters Bangkok",
      shopRating: 4.6,
      engineType: "automatic",
      features: {
        phoneHolder: true,
        storageCompartment: true,
        usbPlug: false,
      },
      helmetIncluded: true,
    },
    {
      id: "scooter-6",
      name: "Honda Click 125cc",
      image: "/placeholder.svg?height=150&width=250",
      price: 12,
      distance: 1.5,
      shop: "Jungle Scooters Pai",
      shopRating: 4.8,
      engineType: "automatic",
      features: {
        phoneHolder: false,
        storageCompartment: true,
        usbPlug: false,
      },
      helmetIncluded: true,
    },
  ]

  // Mock data for recent activity
  const recentActivity = [
    {
      id: "act-1",
      type: "booking",
      title: "Booking Completed",
      description: "You returned your Honda PCX 150cc to Jungle Scooters Pai",
      date: "March 22, 2025",
      icon: <Bike className="h-5 w-5 text-green-500" />,
    },
    {
      id: "act-2",
      type: "favorite",
      title: "Shop Favorited",
      description: "You added City Scooters Bangkok to your favorites",
      date: "March 20, 2025",
      icon: <Heart className="h-5 w-5 text-red-500" />,
    },
    {
      id: "act-3",
      type: "review",
      title: "Review Posted",
      description: "You gave Vintage Scooter Co. a 5-star rating",
      date: "March 18, 2025",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
    },
  ]

  // State for map toggles and search
  const [showHeatMap, setShowHeatMap] = useState(true)
  const [showPoliceCheckpoints, setShowPoliceCheckpoints] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeView, setActiveView] = useState("map")
  const [filteredScooters, setFilteredScooters] = useState(nearbyScooters)

  // Mock search function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      // Mock search results based on query
      const results = nearbyShops
        .filter(
          (shop) =>
            shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `${shop.distance} miles`.includes(searchQuery.toLowerCase()),
        )
        .map((shop) => ({
          ...shop,
          scooters: Array(shop.scootersAvailable)
            .fill(0)
            .map((_, i) => ({
              id: `${shop.id}-scooter-${i}`,
              name: `${i % 2 === 0 ? "Honda PCX" : "Yamaha NMAX"} ${Math.floor(Math.random() * 50) + 100}cc`,
              price: Math.floor(Math.random() * 20) + 10,
              image: "/placeholder.svg?height=100&width=150",
              available: true,
            })),
        }))

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hi, John 👋</h1>
        <p className="text-muted-foreground">Discover and book scooters near you.</p>
      </div>

      {/* Map View - Primary Feature */}
      <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900">
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
                  <form onSubmit={handleSearch} className="relative">
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

                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-[300px] overflow-y-auto z-20">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium">Search Results</h3>
                        <p className="text-xs text-muted-foreground">
                          Found {searchResults.reduce((acc, shop) => acc + shop.scooters.length, 0)} scooters at{" "}
                          {searchResults.length} shops
                        </p>
                      </div>
                      <div className="p-2">
                        {searchResults.map((shop) => (
                          <div key={shop.id} className="mb-3">
                            <div className="flex items-center justify-between px-2 py-1">
                              <h4 className="font-medium text-sm">{shop.name}</h4>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                <span className="ml-1 text-xs">{shop.rating}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 mt-1">
                              {shop.scooters.slice(0, 3).map((scooter: any) => (
                                <Link
                                  href={`/rider-shop/${shop.id}?scooter=${scooter.id}`}
                                  key={scooter.id}
                                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                >
                                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
                                    <img
                                      src={scooter.image || "/placeholder.svg"}
                                      alt={scooter.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{scooter.name}</p>
                                    <p className="text-xs text-muted-foreground">${scooter.price}/day</p>
                                  </div>
                                  <Button size="sm" variant="outline" className="flex-shrink-0">
                                    Book
                                  </Button>
                                </Link>
                              ))}
                              {shop.scooters.length > 3 && (
                                <Link
                                  href={`/rider-shop/${shop.id}`}
                                  className="text-center text-xs text-purple-500 dark:text-purple-400 hover:underline py-1"
                                >
                                  View {shop.scooters.length - 3} more scooters at this shop
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/rider-discover">
                            View All Results
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Loading State */}
                  {isSearching && (
                    <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                      <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-purple-500 border-r-transparent"></div>
                      <p className="mt-2 text-sm">Searching for scooters...</p>
                    </div>
                  )}
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
                  <form onSubmit={handleSearch} className="relative">
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
      </Card>

      {/* Feature Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Find Scooters Tile */}
        <Link href="/rider-discover" className="group">
          <div className="h-full rounded-xl bg-gradient-to-br from-purple-400 to-amber-400 p-6 text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Map className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find Scooters</h3>
              <p className="text-sm opacity-90 mb-auto">Discover scooters near you</p>
              <div className="mt-4 flex items-center text-sm font-medium">
                <span>Explore Map</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>

        {/* Rider Mode Tile */}
        <Link href="/rider-mode-entry" className="group">
          <div className="h-full rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 p-6 text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Navigation className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rider Mode</h3>
              <p className="text-sm opacity-90 mb-auto">Navigation & ride tracking</p>
              <div className="mt-4 flex items-center text-sm font-medium">
                <span>Open Rider Mode</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>

        {/* Accident Insurance Tile */}
        <Link href="/rider-insurance" className="group">
          <div className="h-full rounded-xl bg-gray-900 dark:bg-gray-800 p-6 text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accident Insurance</h3>
              <p className="text-sm opacity-90 mb-auto">Protect against damages</p>
              <div className="mt-4 flex items-center text-sm font-medium">
                <span>View Options</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>

        {/* My Rides Tile */}
        <Link href="/rider-rides" className="group">
          <div className="h-full rounded-xl bg-gray-900 dark:bg-gray-800 p-6 text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Route className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">My Rides</h3>
              <p className="text-sm opacity-90 mb-auto">View your ride history</p>
              <div className="mt-4 flex items-center text-sm font-medium">
                <span>View Rides</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-muted p-2">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{activity.title}</h4>
                    <span className="text-sm text-muted-foreground">{activity.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Shops - Moved lower in the page */}
      <Card>
        <CardHeader>
          <CardTitle>Nearby Shops</CardTitle>
          <CardDescription>Scooter rental shops close to your location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nearbyShops.map((shop) => (
              <Card key={shop.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={shop.image || "/placeholder.svg"}
                    alt={shop.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">{shop.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{shop.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{shop.distance} miles away</span>
                    <span>{shop.scootersAvailable} scooters available</span>
                  </div>
                </CardContent>
                <CardFooter className="p-0">
                  <Button asChild variant="ghost" className="w-full rounded-t-none border-t">
                    <Link href={`/rider-shop/${shop.id}`}>
                      View Shop
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t">
          <Button asChild variant="outline">
            <Link href="/rider-discover">
              View All Shops
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Dashboard when rider has an active rental
function ActiveRentalDashboard({ rental, onEnterRiderMode }: { rental: any; onEnterRiderMode: () => void }) {
  // Calculate progress percentage
  const progressPercentage = Math.round(((rental.totalHours - rental.remainingHours) / rental.totalHours) * 100)

  // Add state for showing the scooter finder modal
  const [showScooterFinder, setShowScooterFinder] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Active Rental</h1>
        <p className="text-muted-foreground">Manage your current scooter rental.</p>
      </div>

      {/* Active Rental Card */}
      <Card className="border-2 border-yellow-500 dark:border-yellow-600">
        <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20">
          <div className="flex items-center justify-between">
            <CardTitle>Your Scooter</CardTitle>
            <Badge className="bg-yellow-500 text-black">Active</Badge>
          </div>
          <CardDescription>Rental ID: {rental.id}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={rental.scooterImage || "/placeholder.svg"}
                  alt={rental.scooterName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{rental.scooterName}</h3>
                <p className="text-muted-foreground">{rental.shopName}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time Remaining:</span>
                  <span className="font-medium">{rental.remainingHours} hours</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Started: {rental.startDate}</span>
                  <span>Ends: {rental.endDate}</span>
                </div>
              </div>

              {/* Rider Mode Button */}
              <Button
                className="w-full gap-2 bg-gradient-to-r from-purple-500 to-yellow-500 text-white hover:from-purple-600 hover:to-yellow-600"
                onClick={onEnterRiderMode}
              >
                <Navigation className="h-5 w-5" />
                Enter Rider Mode
              </Button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Quick Actions</h4>
                <div className="grid gap-2">
                  <Button className="w-full gap-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                    <QrCode className="h-4 w-4" />
                    Show Return QR Code
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <MapPin className="h-4 w-4" />
                    Get Directions
                  </Button>
                  {/* Add a new button to find additional scooters */}
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-800 dark:hover:bg-purple-900/20 dark:hover:text-purple-300"
                    onClick={() => setShowScooterFinder(true)}
                  >
                    <Map className="h-4 w-4" />
                    Find Another Scooter
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="font-semibold">Rental Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Pickup Date:</div>
                  <div>{rental.startDate}</div>
                  <div className="text-muted-foreground">Return Date:</div>
                  <div>{rental.endDate}</div>
                  <div className="text-muted-foreground">Daily Rate:</div>
                  <div>${rental.price}/day</div>
                  <div className="text-muted-foreground">Insurance:</div>
                  <div>{rental.insurancePlan}</div>
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="font-semibold">Need Help?</h4>
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Shop
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Report an Issue
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Support Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scooter Finder Modal */}
      {showScooterFinder && <ScooterFinderModal onClose={() => setShowScooterFinder(false)} />}

      {/* Insurance Information */}
      <ActiveRentalInsurance insuranceType={rental.insurancePlan || "basic"} endDate={rental.endDate} />

      {/* Feature Tiles - Modified to include Find Another Scooter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Find Another Scooter Tile */}
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-purple-400 to-amber-400">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <Map className="h-10 w-10 mb-2" />
                  <h3 className="text-xl font-bold">Find Another Scooter</h3>
                  <p className="text-sm opacity-90 text-center">
                    Need an additional scooter? Browse available options.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Button
              onClick={() => setShowScooterFinder(true)}
              variant="ghost"
              className="w-full rounded-t-none border-t h-12"
            >
              Open Map
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* My Bookings Tile */}
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <Calendar className="h-10 w-10 mb-2" />
                  <h3 className="text-xl font-bold">My Bookings</h3>
                  <p className="text-sm opacity-90 text-center">View and manage all your current and past bookings.</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Button asChild variant="ghost" className="w-full rounded-t-none border-t h-12">
              <Link href="/rider-bookings">
                View Bookings
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Insurance Tile */}
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-[3/2] w-full overflow-hidden bg-gray-900 dark:bg-gray-800">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <Shield className="h-10 w-10 mb-2 text-purple-400" />
                  <h3 className="text-xl font-bold">Manage Insurance</h3>
                  <p className="text-sm opacity-90 text-center">
                    Update your coverage or add protection for additional scooters.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Button asChild variant="ghost" className="w-full rounded-t-none border-t h-12">
              <Link href="/rider-insurance">
                View Options
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Nearby Attractions */}
      <Card>
        <CardHeader>
          <CardTitle>Explore Nearby</CardTitle>
          <CardDescription>Popular destinations near your rental location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=150&width=250&text=Attraction ${i}`}
                    alt={`Attraction ${i}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">Popular Destination {i}</h4>
                  <p className="text-sm text-muted-foreground">A short description of this amazing place to visit.</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm">{i * 2} miles away</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Directions
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dashboard when rider has just completed a rental
function PostRentalDashboard({ rental }: { rental: any }) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rental Complete</h1>
        <p className="text-muted-foreground">Your recent rental has been completed.</p>
      </div>

      {/* Completed Rental Card */}
      <Card>
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <CardTitle>Rental Complete</CardTitle>
            <Badge className="bg-green-500 text-white">Completed</Badge>
          </div>
          <CardDescription>Thank you for using ScootScoot!</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={rental.scooterImage || "/placeholder.svg"}
                  alt={rental.scooterName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{rental.scooterName}</h3>
                <p className="text-muted-foreground">{rental.shopName}</p>
              </div>
              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="font-semibold">Rental Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Rental ID:</div>
                  <div>{rental.id}</div>
                  <div className="text-muted-foreground">Start Date:</div>
                  <div>{rental.startDate}</div>
                  <div className="text-muted-foreground">End Date:</div>
                  <div>{rental.endDate}</div>
                  <div className="text-muted-foreground">Duration:</div>
                  <div>{rental.totalDays} days</div>
                  <div className="text-muted-foreground">Total Cost:</div>
                  <div className="font-semibold">${rental.price}</div>
                </div>
                <div className="pt-3 border-t flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Book Again
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rate Your Experience</CardTitle>
                  <CardDescription>Share your feedback about {rental.shopName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="rounded-md p-1 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              rating >= star ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    className="w-full rounded-md border p-3 text-sm"
                    rows={4}
                    placeholder="Share your experience with this shop and scooter..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Skip</Button>
                  <Button className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                    <ThumbsUp className="h-4 w-4" />
                    Submit Review
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended For You</CardTitle>
                  <CardDescription>Based on your rental history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src="/placeholder.svg?height=150&width=250"
                        alt="Recommended scooter"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Honda ADV 150cc</h4>
                        <Badge>New Model</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Available at {rental.shopName}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium">$50/day</span>
                        <Button size="sm" className="gap-1">
                          Book Now
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Next Section */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>Continue your ScootScoot journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <Map className="h-10 w-10 mb-2 text-purple-500" />
                  <h3 className="font-bold">Find Another Scooter</h3>
                  <p className="text-sm text-muted-foreground">Continue exploring with a new rental</p>
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button asChild variant="ghost" className="w-full rounded-t-none border-t">
                  <Link href="/rider-discover">
                    Explore Map
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <Heart className="h-10 w-10 mb-2 text-red-500" />
                  <h3 className="font-bold">Save as Favorite</h3>
                  <p className="text-sm text-muted-foreground">Add this shop to your favorites</p>
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button variant="ghost" className="w-full rounded-t-none border-t">
                  Add to Favorites
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <Calendar className="h-10 w-10 mb-2 text-purple-500" />
                  <h3 className="font-bold">View Booking History</h3>
                  <p className="text-sm text-muted-foreground">See all your past rentals</p>
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button asChild variant="ghost" className="w-full rounded-t-none border-t">
                  <Link href="/rider-bookings">
                    View History
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
