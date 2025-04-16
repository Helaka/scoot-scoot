"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Users,
  Calendar,
  User,
  Map,
  Layers,
  Bike,
  Mountain,
  Camera,
  Sunset,
  Coffee,
  Star,
  Clock,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RiderProfileModal } from "./rider-profile-modal"
import { EnhancedSearch } from "./enhanced-search"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter } from "lucide-react"
import { CountryFlag } from "./country-flag"

// Define the FilterSettings type here instead of importing it
export type FilterSettings = {
  radius: number
  showRiders: boolean
  showGroups: boolean
  showPassengers: boolean
  availableOnly: boolean
  interests: {
    longRides: boolean
    scenicRoutes: boolean
    photography: boolean
    sunsetRides: boolean
    cafeHopping: boolean
    mountainRides: boolean
    nightRides: boolean
    cityTours: boolean
    beachRides: boolean
  }
  riderExperience: {
    beginner: boolean
    intermediate: boolean
    expert: boolean
  }
  rideLength: {
    short: boolean
    medium: boolean
    long: boolean
  }
  timeOfDay: {
    morning: boolean
    afternoon: boolean
    evening: boolean
    night: boolean
  }
  countries: {
    US: boolean
    UK: boolean
    CA: boolean
    AU: boolean
    NZ: boolean
    KR: boolean
    CN: boolean
    // Add more as needed
  }
}

// Define the ConsolidatedFilters component directly in this file
function ConsolidatedFilters({
  settings,
  onChange,
  onReset,
  onApply,
  activeFiltersCount,
}: {
  settings: FilterSettings
  onChange: (settings: FilterSettings) => void
  onReset: () => void
  onApply: () => void
  activeFiltersCount: number
}) {
  const [activeTab, setActiveTab] = useState("visibility")

  const updateSettings = (updates: Partial<FilterSettings>) => {
    onChange({ ...settings, ...updates })
  }

  const updateInterests = (interest: keyof FilterSettings["interests"], value: boolean) => {
    onChange({
      ...settings,
      interests: {
        ...settings.interests,
        [interest]: value,
      },
    })
  }

  const updateRiderExperience = (level: keyof FilterSettings["riderExperience"], value: boolean) => {
    onChange({
      ...settings,
      riderExperience: {
        ...settings.riderExperience,
        [level]: value,
      },
    })
  }

  const updateRideLength = (length: keyof FilterSettings["rideLength"], value: boolean) => {
    onChange({
      ...settings,
      rideLength: {
        ...settings.rideLength,
        [length]: value,
      },
    })
  }

  const updateTimeOfDay = (time: keyof FilterSettings["timeOfDay"], value: boolean) => {
    onChange({
      ...settings,
      timeOfDay: {
        ...settings.timeOfDay,
        [time]: value,
      },
    })
  }

  const updateCountry = (country: keyof FilterSettings["countries"], value: boolean) => {
    onChange({
      ...settings,
      countries: {
        ...settings.countries,
        [country]: value,
      },
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-300 dark:border-gray-700 shadow-md relative"
        >
          <Filter className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Riders & Rides</SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="visibility" className="text-xs">
              Visibility
            </TabsTrigger>
            <TabsTrigger value="interests" className="text-xs">
              Interests
            </TabsTrigger>
            <TabsTrigger value="experience" className="text-xs">
              Experience
            </TabsTrigger>
            <TabsTrigger value="time" className="text-xs">
              Time
            </TabsTrigger>
            <TabsTrigger value="countries" className="text-xs">
              Countries
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-240px)]">
            <TabsContent value="visibility" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Search Radius</h3>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[settings.radius]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => updateSettings({ radius: value[0] })}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">{settings.radius} mi</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Show on Map</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Riders</span>
                    </div>
                    <Switch
                      checked={settings.showRiders}
                      onCheckedChange={(checked) => updateSettings({ showRiders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Group Rides</span>
                    </div>
                    <Switch
                      checked={settings.showGroups}
                      onCheckedChange={(checked) => updateSettings({ showGroups: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Passengers</span>
                    </div>
                    <Switch
                      checked={settings.showPassengers}
                      onCheckedChange={(checked) => updateSettings({ showPassengers: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Available Riders Only</span>
                  </div>
                  <Switch
                    checked={settings.availableOnly}
                    onCheckedChange={(checked) => updateSettings({ availableOnly: checked })}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Only show riders who are currently available to join rides
                </p>
              </div>
            </TabsContent>

            <TabsContent value="interests" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Riding Interests</h3>
                <p className="text-xs text-muted-foreground">Find riders who share your interests</p>

                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.longRides}
                      onCheckedChange={(checked) => updateInterests("longRides", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Bike className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Long Rides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.scenicRoutes}
                      onCheckedChange={(checked) => updateInterests("scenicRoutes", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Scenic Routes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.photography}
                      onCheckedChange={(checked) => updateInterests("photography", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-indigo-500" />
                      <span className="text-sm">Photography</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.sunsetRides}
                      onCheckedChange={(checked) => updateInterests("sunsetRides", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Sunset className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Sunset Rides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.cafeHopping}
                      onCheckedChange={(checked) => updateInterests("cafeHopping", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-brown-500" />
                      <span className="text-sm">Café Hopping</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.mountainRides}
                      onCheckedChange={(checked) => updateInterests("mountainRides", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-green-700" />
                      <span className="text-sm">Mountain Rides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.nightRides}
                      onCheckedChange={(checked) => updateInterests("nightRides", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Night Rides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.cityTours}
                      onCheckedChange={(checked) => updateInterests("cityTours", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm">City Tours</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.interests.beachRides}
                      onCheckedChange={(checked) => updateInterests("beachRides", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">Beach Rides</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Rider Experience</h3>
                <p className="text-xs text-muted-foreground">Find riders with similar experience levels</p>

                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.riderExperience.beginner}
                      onCheckedChange={(checked) => updateRiderExperience("beginner", checked)}
                    />
                    <span className="text-sm">Beginner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.riderExperience.intermediate}
                      onCheckedChange={(checked) => updateRiderExperience("intermediate", checked)}
                    />
                    <span className="text-sm">Intermediate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.riderExperience.expert}
                      onCheckedChange={(checked) => updateRiderExperience("expert", checked)}
                    />
                    <span className="text-sm">Expert</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Ride Length</h3>
                <p className="text-xs text-muted-foreground">Filter by preferred ride duration</p>

                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.rideLength.short}
                      onCheckedChange={(checked) => updateRideLength("short", checked)}
                    />
                    <span className="text-sm">Short ({"<"} 30 min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.rideLength.medium}
                      onCheckedChange={(checked) => updateRideLength("medium", checked)}
                    />
                    <span className="text-sm">Medium (30-60 min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.rideLength.long}
                      onCheckedChange={(checked) => updateRideLength("long", checked)}
                    />
                    <span className="text-sm">Long ({">"} 60 min)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="time" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Time of Day</h3>
                <p className="text-xs text-muted-foreground">Find rides at your preferred time</p>

                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.timeOfDay.morning}
                      onCheckedChange={(checked) => updateTimeOfDay("morning", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Morning (6am-12pm)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.timeOfDay.afternoon}
                      onCheckedChange={(checked) => updateTimeOfDay("afternoon", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Afternoon (12pm-5pm)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.timeOfDay.evening}
                      onCheckedChange={(checked) => updateTimeOfDay("evening", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Evening (5pm-9pm)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.timeOfDay.night}
                      onCheckedChange={(checked) => updateTimeOfDay("night", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Night (9pm-6am)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="countries" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Filter by Country</h3>
                <p className="text-xs text-muted-foreground">Find riders from specific countries</p>

                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.countries.US}
                      onCheckedChange={(checked) => updateCountry("US", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <CountryFlag countryCode="US" size="sm" />
                      <span className="text-sm">United States</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.countries.UK}
                      onCheckedChange={(checked) => updateCountry("UK", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <CountryFlag countryCode="UK" size="sm" />
                      <span className="text-sm">United Kingdom</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.countries.CA}
                      onCheckedChange={(checked) => updateCountry("CA", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <CountryFlag countryCode="CA" size="sm" />
                      <span className="text-sm">Canada</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.countries.AU}
                      onCheckedChange={(checked) => updateCountry("AU", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <CountryFlag countryCode="AU" size="sm" />
                      <span className="text-sm">Australia</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.countries.NZ}
                      onCheckedChange={(checked) => updateCountry("NZ", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <CountryFlag countryCode="NZ" size="sm" />
                      <span className="text-sm">New Zealand</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.countries.KR}
                      onCheckedChange={(checked) => updateCountry("KR", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <CountryFlag countryCode="KR" size="sm" />
                      <span className="text-sm">South Korea</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.countries.CN}
                      onCheckedChange={(checked) => updateCountry("CN", checked)}
                    />
                    <div className="flex items-center gap-2">
                      <CountryFlag countryCode="CN" size="sm" />
                      <span className="text-sm">China</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <SheetFooter className="mt-4 sm:justify-between">
          <Button variant="outline" onClick={onReset}>
            Reset All
          </Button>
          <Button onClick={onApply}>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// Export the ConsolidatedFilters component
export { ConsolidatedFilters }

export function SocialMapView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [radius, setRadius] = useState([3]) // miles
  const [showRiders, setShowRiders] = useState(true)
  const [showGroups, setShowGroups] = useState(true)
  const [showPassengers, setShowPassengers] = useState(true)
  const [selectedRider, setSelectedRider] = useState<any>(null)

  // Filter states
  const [filters, setFilters] = useState({
    longRides: false,
    scenicRoutes: false,
    photography: false,
    sunsetRides: false,
    cafeHopping: false,
    mountainRides: false,
  })

  // Replace the existing filter states with consolidated settings
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    radius: 3,
    showRiders: true,
    showGroups: true,
    showPassengers: true,
    availableOnly: false,
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

  // Mock data for riders on the map
  const nearbyRiders = [
    {
      id: "rider-1",
      name: "Alex Chen",
      handle: "@alexrider",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "available", // available, riding, busy
      distance: 0.8,
      location: { top: "30%", left: "40%" },
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
      location: { top: "45%", left: "60%" },
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
      location: { top: "55%", left: "35%" },
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
      location: { top: "25%", left: "65%" },
      bio: "Sunset chaser. Let's find the best views together!",
      interests: ["sunsetRides", "scenicRoutes"],
      country: "UK", // Added country code
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

  // Mock data for group rides
  const groupRides = [
    {
      id: "group-1",
      name: "Sunset Beach Cruise",
      location: { top: "40%", left: "70%" },
      time: "Today, 5:30 PM",
      participants: 4,
      type: "sunsetRides",
    },
    {
      id: "group-2",
      name: "Mountain Trail Adventure",
      location: { top: "60%", left: "30%" },
      time: "Tomorrow, 9:00 AM",
      participants: 6,
      type: "mountainRides",
    },
  ]

  // Mock data for passenger requests
  const passengerRequests = [
    {
      id: "passenger-1",
      name: "Lily Park",
      avatar: "/placeholder.svg?height=40&width=40",
      location: { top: "35%", left: "55%" },
      requestType: "Sunset Cruise",
      message: "Looking for a ride to watch the sunset at the beach!",
    },
    {
      id: "passenger-2",
      name: "Tom Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      location: { top: "50%", left: "45%" },
      requestType: "Café Hopping",
      message: "Want to explore some new cafés in town. Will buy coffee!",
    },
  ]

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
        return <Star className="h-3 w-3" />
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
    <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900">
      <div className="relative">
        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-10 w-full max-w-md">
          <div className="flex gap-2">
            <EnhancedSearch
              onSearch={(query) => setSearchQuery(query)}
              placeholder="Search for riders or locations..."
              className="flex-1"
            />
            <ConsolidatedFilters
              settings={filterSettings}
              onChange={setFilterSettings}
              onReset={() => {
                setFilterSettings({
                  radius: 3,
                  showRiders: true,
                  showGroups: true,
                  showPassengers: true,
                  availableOnly: false,
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
              }}
              onApply={() => {
                // Apply filters logic here
                console.log("Filters applied:", filterSettings)
              }}
              activeFiltersCount={countActiveFilters()}
            />
          </div>
        </div>

        {/* Map Layer Controls */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-2">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                <Layers className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Map Placeholder  />
              </Button>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
          <img
            src="/placeholder.svg?height=400&width=800&text=Interactive+Map"
            alt="Map View"
            className="h-full w-full object-cover"
          />

          {/* User Location */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
              <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
            </div>
          </div>

          {/* Render Riders on Map */}
          {filterSettings.showRiders &&
            filteredRiders.map((rider) => (
              <div
                key={rider.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                style={{ top: rider.location.top, left: rider.location.left }}
                onClick={() => setSelectedRider(rider)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarImage src={rider.avatar} alt={rider.name} />
                    <AvatarFallback>{rider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(rider.status)}`}
                  />
                  {rider.country && (
                    <div className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <CountryFlag countryCode={rider.country} size="sm" showTooltip={false} />
                    </div>
                  )}
                </div>
              </div>
            ))}

          {/* Render Group Rides on Map */}
          {filterSettings.showGroups &&
            groupRides.map((group) => (
              <div
                key={group.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                style={{ top: group.location.top, left: group.location.left }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white border-2 border-white shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-purple-500 text-white text-xs py-1 px-2 rounded-full">
                  {group.participants} riders
                </div>
              </div>
            ))}

          {/* Render Passenger Requests on Map */}
          {filterSettings.showPassengers &&
            passengerRequests.map((passenger) => (
              <div
                key={passenger.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                style={{ top: passenger.location.top, left: passenger.location.left }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black border-2 border-white shadow-md">
                  <User className="h-5 w-5" />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-yellow-500 text-black text-xs py-1 px-2 rounded-full">
                  {passenger.requestType}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Legend */}
      <CardContent className="p-4 border-t">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Riding</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Busy</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              <span className="text-xs">Group Rides</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Passengers</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>Showing riders within {filterSettings.radius} miles</span>
          </div>
        </div>
      </CardContent>

      {/* Rider Profile Modal */}
      {selectedRider && <RiderProfileModal rider={selectedRider} onClose={() => setSelectedRider(null)} />}
    </Card>
  )
}
