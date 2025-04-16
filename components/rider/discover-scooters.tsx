"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  MapIcon,
  List,
  Star,
  MapPin,
  Zap,
  Calendar,
  Clock,
  Bike,
  Shield,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type ViewMode = "map" | "list"

export function DiscoverScooters() {
  const [viewMode, setViewMode] = useState<ViewMode>("map")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [distance, setDistance] = useState([5])
  const [showHeatMap, setShowHeatMap] = useState(false)
  const [showCheckpoints, setShowCheckpoints] = useState(false)
  const [selectedShop, setSelectedShop] = useState<string | null>(null)

  // Mock data for shops
  const shops = [
    {
      id: "shop-1",
      name: "Jungle Scooters Pai",
      logo: "/placeholder.svg?height=50&width=50",
      image: "/placeholder.svg?height=150&width=250",
      rating: 4.8,
      reviews: 124,
      location: "123 Main Street, Pai",
      distance: 0.8,
      scootersAvailable: 12,
      position: { top: "30%", left: "40%" },
      scooters: [
        {
          id: "s-1001",
          name: "Honda PCX 150cc",
          type: "Automatic",
          color: "Black",
          price: 45,
          image: "/placeholder.svg?height=100&width=150",
        },
        {
          id: "s-1002",
          name: "Yamaha NMAX 155cc",
          type: "Automatic",
          color: "Blue",
          price: 50,
          image: "/placeholder.svg?height=100&width=150",
        },
      ],
    },
    {
      id: "shop-2",
      name: "City Scooters Bangkok",
      logo: "/placeholder.svg?height=50&width=50",
      image: "/placeholder.svg?height=150&width=250",
      rating: 4.6,
      reviews: 98,
      location: "456 Main Street, Bangkok",
      distance: 1.2,
      scootersAvailable: 8,
      position: { top: "50%", left: "60%" },
      scooters: [
        {
          id: "s-2001",
          name: "Vespa Primavera 125cc",
          type: "Automatic",
          color: "Red",
          price: 55,
          image: "/placeholder.svg?height=100&width=150",
        },
      ],
    },
    {
      id: "shop-3",
      name: "Vintage Scooter Co.",
      logo: "/placeholder.svg?height=50&width=50",
      image: "/placeholder.svg?height=150&width=250",
      rating: 4.9,
      reviews: 156,
      location: "789 Beach Road, Phuket",
      distance: 1.5,
      scootersAvailable: 15,
      position: { top: "70%", left: "30%" },
      scooters: [
        {
          id: "s-3001",
          name: "Honda Click 125i",
          type: "Automatic",
          color: "White",
          price: 40,
          image: "/placeholder.svg?height=100&width=150",
        },
        {
          id: "s-3002",
          name: "Suzuki Burgman 200cc",
          type: "Automatic",
          color: "Silver",
          price: 60,
          image: "/placeholder.svg?height=100&width=150",
        },
      ],
    },
  ]

  // Mock data for police checkpoints
  const checkpoints = [
    { id: "cp-1", position: { top: "40%", left: "50%" } },
    { id: "cp-2", position: { top: "60%", left: "35%" } },
  ]

  const handleShopClick = (shopId: string) => {
    setSelectedShop(shopId === selectedShop ? null : shopId)
  }

  const selectedShopData = selectedShop ? shops.find((shop) => shop.id === selectedShop) : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Find Scooters</h1>
        <p className="text-muted-foreground">Discover and book scooters near you</p>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by location, shop, or scooter type..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filter Scooters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <Label>Price Range ($/day)</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">${priceRange[0]}</span>
                        <Slider
                          defaultValue={[0, 100]}
                          max={200}
                          step={5}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="flex-1"
                        />
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Distance (miles)</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">0</span>
                        <Slider
                          defaultValue={[5]}
                          max={10}
                          step={0.5}
                          value={distance}
                          onValueChange={setDistance}
                          className="flex-1"
                        />
                        <span className="text-sm">{distance[0]}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="available-now">Available Now</Label>
                        <Switch id="available-now" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="helmet-included">Helmet Included</Label>
                        <Switch id="helmet-included" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="automatic-only">Automatic Only</Label>
                        <Switch id="automatic-only" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="top-rated">Top Rated (4.5+)</Label>
                        <Switch id="top-rated" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Engine Size</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="w-full">
                          Under 125cc
                        </Button>
                        <Button variant="outline" className="w-full">
                          125-150cc
                        </Button>
                        <Button variant="outline" className="w-full">
                          Over 150cc
                        </Button>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-between">
                      <Button variant="outline">Reset</Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="border rounded-md flex">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode("map")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {viewMode === "map" && (
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 ${showHeatMap ? "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700" : ""}`}
                onClick={() => setShowHeatMap(!showHeatMap)}
              >
                {showHeatMap ? <ToggleRight className="h-4 w-4 text-yellow-500" /> : <ToggleLeft className="h-4 w-4" />}
                Heat Map
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 ${showCheckpoints ? "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700" : ""}`}
                onClick={() => setShowCheckpoints(!showCheckpoints)}
              >
                {showCheckpoints ? (
                  <ToggleRight className="h-4 w-4 text-red-500" />
                ) : (
                  <ToggleLeft className="h-4 w-4" />
                )}
                Police Checkpoints
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Modes */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="space-y-4">
        <TabsList className="hidden">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        {/* Map View */}
        <TabsContent value="map">
          <Card className="overflow-hidden">
            <div className="relative h-[600px] bg-muted">
              {/* Map Background */}
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800&text=Map')] bg-cover bg-center"></div>

              {/* Heat Map Overlay */}
              {showHeatMap && (
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-500 opacity-30 blur-xl"></div>
                  <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-red-500 opacity-30 blur-xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-orange-500 opacity-30 blur-xl"></div>
                </div>
              )}

              {/* Police Checkpoints */}
              {showCheckpoints &&
                checkpoints.map((checkpoint) => (
                  <div
                    key={checkpoint.id}
                    className="absolute z-20"
                    style={{ top: checkpoint.position.top, left: checkpoint.position.left }}
                  >
                    <div className="relative">
                      <div className="absolute -top-1 -left-1 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-50"></div>
                      <div className="relative z-10 bg-red-500 text-white rounded-full p-2 shadow-lg">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap bg-red-500 text-white text-xs py-1 px-2 rounded">
                        Police Checkpoint
                      </div>
                    </div>
                  </div>
                ))}

              {/* Shop Markers */}
              {shops.map((shop) => (
                <div
                  key={shop.id}
                  className={`absolute z-10 cursor-pointer transition-all ${selectedShop === shop.id ? "scale-110" : ""}`}
                  style={{ top: shop.position.top, left: shop.position.left }}
                  onClick={() => handleShopClick(shop.id)}
                >
                  <div className="relative">
                    <div className="bg-yellow-500 rounded-full p-2 shadow-lg">
                      <Bike className="h-5 w-5 text-black" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap bg-black/70 text-white text-xs py-1 px-2 rounded">
                      {shop.name} ({shop.scootersAvailable})
                    </div>
                  </div>
                </div>
              ))}

              {/* Selected Shop Info */}
              {selectedShopData && (
                <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-lg p-4 z-30">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedShopData.image || "/placeholder.svg"}
                      alt={selectedShopData.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">{selectedShopData.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{selectedShopData.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">
                            ({selectedShopData.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedShopData.location}</p>
                      <p className="text-sm">{selectedShopData.scootersAvailable} scooters available</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Available Scooters</h4>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {selectedShopData.scooters.map((scooter) => (
                        <div key={scooter.id} className="flex-shrink-0 w-48 border rounded-lg overflow-hidden">
                          <img
                            src={scooter.image || "/placeholder.svg"}
                            alt={scooter.name}
                            className="w-full h-24 object-cover"
                          />
                          <div className="p-2">
                            <h5 className="font-medium text-sm">{scooter.name}</h5>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm font-bold">${scooter.price}/day</span>
                              <Button size="sm" asChild>
                                <Link href={`/rider-shop/${selectedShopData.id}?scooter=${scooter.id}`}>Book</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm" className="gap-2">
                      <MapPin className="h-4 w-4" />
                      Directions
                    </Button>
                    <Button asChild>
                      <Link href={`/rider-shop/${selectedShopData.id}`}>View Shop</Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                  <Minus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                  <Locate className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{shops.length} Shops Found</h3>
                  <p className="text-sm text-muted-foreground">Within {distance[0]} miles of your location</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Show Insurance Options
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          {shops.map((shop) => (
            <Card key={shop.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 lg:w-1/4">
                  <img
                    src={shop.image || "/placeholder.svg"}
                    alt={shop.name}
                    className="h-48 w-full object-cover md:h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{shop.name}</h2>
                      <p className="text-sm text-muted-foreground">{shop.location}</p>
                    </div>
                    <Badge className="bg-green-500">Open Now</Badge>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>{shop.distance} miles away</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>{shop.scootersAvailable} scooters available</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>Available Today</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>Instant Booking</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span className="ml-1 font-medium">{shop.rating}</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{shop.reviews} reviews</span>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {shop.scooters.slice(0, 3).map((scooter) => (
                      <div key={scooter.id} className="flex items-center gap-2 rounded-lg border p-2">
                        <img
                          src={scooter.image || "/placeholder.svg"}
                          alt={scooter.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{scooter.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold">${scooter.price}/day</span>
                            <Badge variant="outline" className="text-xs">
                              {scooter.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/rider-shop/${shop.id}`}>View Details</Link>
                    </Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" asChild>
                      <Link href={`/rider-shop/${shop.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Import additional icons
import { Plus, Minus, Locate } from "lucide-react"
