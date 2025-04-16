"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Bike, Coffee, Camera, Sunset, Mountain, Filter } from "lucide-react"
import { RiderProfileModal } from "./rider-profile-modal"
import { EnhancedSearch } from "./enhanced-search"
import type { FilterSettings } from "./social-map-view"

export function NearbyRidersList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRider, setSelectedRider] = useState<any>(null)

  // Replace the existing filter states with consolidated settings
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    radius: 3,
    showRiders: true,
    showGroups: true,
    showPassengers: true,
    availableOnly: true,
    interests: {
      longRides: false,
      scenicRoutes: false,
      photography: false,
      sunsetRides: false,
      cafeHopping: false,
      mountainRides: false,
      nightRides: false,
      cityTours: false,
      beachRides: false,
    },
    riderExperience: {
      beginner: false,
      intermediate: false,
      expert: false,
    },
    rideLength: {
      short: false,
      medium: false,
      long: false,
    },
    timeOfDay: {
      morning: false,
      afternoon: false,
      evening: false,
      night: false,
    },
    countries: {
      US: false,
      UK: false,
      CA: false,
      AU: false,
      NZ: false,
      KR: false,
      CN: false,
    },
  })

  // Mock data for nearby riders
  const nearbyRiders = [
    {
      id: "rider-1",
      name: "Alex Chen",
      handle: "@alexrider",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "available", // available, riding, busy
      distance: 0.8,
      bio: "Adventure seeker, coffee lover. Always looking for new routes!",
      interests: ["scenicRoutes", "cafeHopping", "photography"],
      country: "US", // Added country code
    },
    {
      id: "rider-2",
      name: "Sarah Kim",
      handle: "@sarahk",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "riding",
      distance: 1.2,
      bio: "Photography enthusiast. Love finding hidden spots around the city.",
      interests: ["photography", "scenicRoutes", "sunsetRides"],
      country: "KR", // Added country code
    },
    {
      id: "rider-3",
      name: "Mike Johnson",
      handle: "@mikej",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "available",
      distance: 0.5,
      bio: "Mountain trails and long rides are my thing. Always up for an adventure!",
      interests: ["longRides", "mountainRides"],
      country: "CA", // Added country code
    },
    {
      id: "rider-4",
      name: "Emma Wilson",
      handle: "@emmaw",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "busy",
      distance: 1.5,
      bio: "Sunset chaser. Let's find the best views together!",
      interests: ["sunsetRides", "scenicRoutes"],
      country: "UK", // Added country code
    },
    {
      id: "rider-5",
      name: "David Lee",
      handle: "@davidl",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "available",
      distance: 0.9,
      bio: "Café hopping enthusiast. Always on the lookout for the best coffee spots!",
      interests: ["cafeHopping", "photography"],
      country: "AU", // Added country code
    },
    {
      id: "rider-6",
      name: "Lisa Wang",
      handle: "@lisaw",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "riding",
      distance: 1.1,
      bio: "Love exploring mountain trails and taking in the views!",
      interests: ["mountainRides", "scenicRoutes"],
      country: "CN", // Added country code
    },
    {
      id: "rider-7",
      name: "James Taylor",
      handle: "@jamest",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "available",
      distance: 1.3,
      bio: "Sunset rides are my favorite. Always chasing that golden hour!",
      interests: ["sunsetRides", "photography"],
      country: "NZ", // Added country code
    },
  ]

  // Get country flag emoji from country code
  const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "riding":
        return "bg-blue-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "riding":
        return "Currently Riding"
      case "busy":
        return "Busy"
      default:
        return "Unknown"
    }
  }

  // Get interest icon
  const getInterestIcon = (interest: string) => {
    switch (interest) {
      case "longRides":
        return <Bike className="h-3 w-3" />
      case "scenicRoutes":
        return <Mountain className="h-3 w-3" />
      case "photography":
        return <Camera className="h-3 w-3" />
      case "sunsetRides":
        return <Sunset className="h-3 w-3" />
      case "cafeHopping":
        return <Coffee className="h-3 w-3" />
      case "mountainRides":
        return <Mountain className="h-3 w-3" />
      default:
        return null
    }
  }

  // Get interest text
  const getInterestText = (interest: string) => {
    switch (interest) {
      case "longRides":
        return "Long Rides"
      case "scenicRoutes":
        return "Scenic Routes"
      case "photography":
        return "Photography"
      case "sunsetRides":
        return "Sunset Rides"
      case "cafeHopping":
        return "Café Hopping"
      case "mountainRides":
        return "Mountain Rides"
      default:
        return interest
    }
  }

  // Count active filters
  const countActiveFilters = (): number => {
    let count = 0

    // Count interest filters
    Object.values(filterSettings.interests).forEach((value) => {
      if (value) count++
    })

    // Count rider experience filters
    Object.values(filterSettings.riderExperience).forEach((value) => {
      if (value) count++
    })

    // Count ride length filters
    Object.values(filterSettings.rideLength).forEach((value) => {
      if (value) count++
    })

    // Count time of day filters
    Object.values(filterSettings.timeOfDay).forEach((value) => {
      if (value) count++
    })

    // Count availability filter
    if (filterSettings.availableOnly) count++

    // Count country filters
    Object.values(filterSettings.countries).forEach((value) => {
      if (value) count++
    })

    return count
  }

  // Filter riders based on search and filters
  const filteredRiders = nearbyRiders.filter((rider) => {
    // Filter by search query
    if (
      searchQuery &&
      !rider.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !rider.handle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !rider.bio.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (filterSettings.availableOnly && rider.status !== "available") {
      return false
    }

    // Filter by distance
    if (rider.distance > filterSettings.radius) {
      return false
    }

    // Filter by interests
    const activeInterests = Object.entries(filterSettings.interests)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    if (activeInterests.length > 0) {
      const hasMatchingInterest = rider.interests.some((interest) => activeInterests.includes(interest))
      if (!hasMatchingInterest) return false
    }

    // Filter by country
    const activeCountries = Object.entries(filterSettings.countries)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    if (activeCountries.length > 0 && rider.country) {
      if (!activeCountries.includes(rider.country)) return false
    }

    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <EnhancedSearch
          onSearch={(query) => setSearchQuery(query)}
          placeholder="Search for riders..."
          className="flex-1"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-300 dark:border-gray-700 shadow-md relative"
          onClick={() => {
            // Open filter sheet
          }}
        >
          <Filter className="h-4 w-4" />
          {countActiveFilters() > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {countActiveFilters()}
            </Badge>
          )}
        </Button>
      </div>

      {filteredRiders.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-2">No riders match your filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterSettings({
                  radius: 3,
                  showRiders: true,
                  showGroups: true,
                  showPassengers: true,
                  availableOnly: true,
                  interests: {
                    longRides: false,
                    scenicRoutes: false,
                    photography: false,
                    sunsetRides: false,
                    cafeHopping: false,
                    mountainRides: false,
                    nightRides: false,
                    cityTours: false,
                    beachRides: false,
                  },
                  riderExperience: {
                    beginner: false,
                    intermediate: false,
                    expert: false,
                  },
                  rideLength: {
                    short: false,
                    medium: false,
                    long: false,
                  },
                  timeOfDay: {
                    morning: false,
                    afternoon: false,
                    evening: false,
                    night: false,
                  },
                  countries: {
                    US: false,
                    UK: false,
                    CA: false,
                    AU: false,
                    NZ: false,
                    KR: false,
                    CN: false,
                  },
                })
                setSearchQuery("")
              }}
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredRiders.map((rider) => (
            <Card
              key={rider.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRider(rider)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={rider.avatar} alt={rider.name} />
                      <AvatarFallback>{rider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(rider.status)}`}
                    />
                    {rider.country && (
                      <div className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {getCountryFlag(rider.country)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium">{rider.name}</h3>
                        {rider.country && (
                          <span className="text-sm ml-1" title={rider.country}>
                            {getCountryFlag(rider.country)}
                          </span>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${rider.status === "available" ? "border-green-500 text-green-600 dark:text-green-400" : rider.status === "riding" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-red-500 text-red-600 dark:text-red-400"}`}
                      >
                        {getStatusText(rider.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rider.handle}</p>
                    <p className="text-sm mt-1 line-clamp-2">{rider.bio}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {rider.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs flex items-center gap-1">
                          {getInterestIcon(interest)}
                          <span>{getInterestText(interest)}</span>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">{rider.distance} miles away</span>
                      <Button size="sm" variant="outline" className="h-8 gap-1">
                        <MessageCircle className="h-3 w-3" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Rider Profile Modal */}
      {selectedRider && <RiderProfileModal rider={selectedRider} onClose={() => setSelectedRider(null)} />}
    </div>
  )
}
