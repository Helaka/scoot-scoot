"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X, Filter, MapPin, Clock, Calendar, Plus, Users, ChevronRight } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function GroupRides() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("discover")
  const [showCreateRide, setShowCreateRide] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    today: true,
    tomorrow: true,
    thisWeek: true,
    longRides: false,
    scenicRoutes: false,
    photography: false,
    sunsetRides: false,
    cafeHopping: false,
    mountainRides: false,
  })

  // Mock data for group rides
  const groupRides = [
    {
      id: "ride-1",
      name: "Sunset Beach Cruise",
      creator: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      location: "Patong Beach",
      meetingPoint: "Patong Beach Parking Lot",
      time: "Today, 5:30 PM",
      duration: "2 hours",
      participants: 4,
      maxParticipants: 8,
      description:
        "Join us for a relaxing ride along the beach to catch the sunset. We'll stop at a few viewpoints along the way.",
      type: ["sunsetRides", "scenicRoutes"],
      distance: 0.8,
      allowPassengers: true,
    },
    {
      id: "ride-2",
      name: "Mountain Trail Adventure",
      creator: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      location: "Doi Suthep",
      meetingPoint: "Doi Suthep Entrance",
      time: "Tomorrow, 9:00 AM",
      duration: "4 hours",
      participants: 6,
      maxParticipants: 10,
      description:
        "Exploring mountain trails with some challenging routes. Experienced riders preferred. We'll stop for lunch at a mountain café.",
      type: ["mountainRides", "longRides"],
      distance: 5.2,
      allowPassengers: false,
    },
    {
      id: "ride-3",
      name: "Café Hopping Tour",
      creator: {
        name: "Sarah Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      location: "Old Town",
      meetingPoint: "Three Kings Monument",
      time: "Saturday, 10:00 AM",
      duration: "3 hours",
      participants: 3,
      maxParticipants: 6,
      description:
        "Visiting the best cafés in Old Town. We'll try different coffees and take photos. Bring your camera!",
      type: ["cafeHopping", "photography"],
      distance: 1.5,
      allowPassengers: true,
    },
    {
      id: "ride-4",
      name: "Night Market Exploration",
      creator: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      location: "Night Bazaar",
      meetingPoint: "Night Bazaar Entrance",
      time: "Friday, 7:00 PM",
      duration: "2 hours",
      participants: 5,
      maxParticipants: 8,
      description: "Exploring the night market together. We'll try some street food and shop for souvenirs.",
      type: ["scenicRoutes"],
      distance: 2.3,
      allowPassengers: true,
    },
  ]

  // My rides
  const myRides = [
    {
      id: "my-ride-1",
      name: "Waterfall Discovery",
      location: "Mae Sa Waterfall",
      meetingPoint: "Mae Sa Waterfall Entrance",
      time: "Sunday, 11:00 AM",
      duration: "4 hours",
      participants: 2,
      maxParticipants: 5,
      description: "Exploring hidden waterfalls in the area. Bring swimwear if you want to take a dip!",
      type: ["scenicRoutes", "longRides"],
      status: "upcoming", // upcoming, active, past
      isCreator: true,
    },
    {
      id: "my-ride-2",
      name: "Sunset Beach Cruise",
      creator: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      location: "Patong Beach",
      meetingPoint: "Patong Beach Parking Lot",
      time: "Today, 5:30 PM",
      duration: "2 hours",
      participants: 4,
      maxParticipants: 8,
      description:
        "Join us for a relaxing ride along the beach to catch the sunset. We'll stop at a few viewpoints along the way.",
      type: ["sunsetRides", "scenicRoutes"],
      status: "upcoming", // upcoming, active, past
      isCreator: false,
    },
  ]

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
  }

  // Get ride type badge
  const getRideTypeBadge = (type: string) => {
    switch (type) {
      case "longRides":
        return "Long Ride"
      case "scenicRoutes":
        return "Scenic Route"
      case "photography":
        return "Photography"
      case "sunsetRides":
        return "Sunset Ride"
      case "cafeHopping":
        return "Café Hopping"
      case "mountainRides":
        return "Mountain Ride"
      default:
        return type
    }
  }

  // Filter group rides based on search and filters
  const filteredRides = groupRides.filter((ride) => {
    // Filter by search query
    if (
      searchQuery &&
      !ride.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ride.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ride.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by time
    const timeFilters = {
      today: filters.today,
      tomorrow: filters.tomorrow,
      thisWeek: filters.thisWeek,
    }

    const activeTimeFilters = Object.entries(timeFilters)
      .filter(([key, value]) => value)
      .map(([key]) => key)

    if (activeTimeFilters.length > 0) {
      if (activeTimeFilters.includes("today") && ride.time.includes("Today")) {
        // Pass the filter
      } else if (activeTimeFilters.includes("tomorrow") && ride.time.includes("Tomorrow")) {
        // Pass the filter
      } else if (
        activeTimeFilters.includes("thisWeek") &&
        (ride.time.includes("Saturday") ||
          ride.time.includes("Sunday") ||
          ride.time.includes("Monday") ||
          ride.time.includes("Tuesday") ||
          ride.time.includes("Wednesday") ||
          ride.time.includes("Thursday") ||
          ride.time.includes("Friday"))
      ) {
        // Pass the filter
      } else {
        return false
      }
    }

    // Filter by ride type
    const typeFilters = {
      longRides: filters.longRides,
      scenicRoutes: filters.scenicRoutes,
      photography: filters.photography,
      sunsetRides: filters.sunsetRides,
      cafeHopping: filters.cafeHopping,
      mountainRides: filters.mountainRides,
    }

    const activeTypeFilters = Object.entries(typeFilters)
      .filter(([key, value]) => value)
      .map(([key]) => key)

    if (activeTypeFilters.length > 0) {
      return ride.type.some((type) => activeTypeFilters.includes(type))
    }

    return true
  })

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="discover">Discover Rides</TabsTrigger>
            <TabsTrigger value="my-rides">My Rides</TabsTrigger>
          </TabsList>

          <Dialog open={showCreateRide} onOpenChange={setShowCreateRide}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Create Ride
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Group Ride</DialogTitle>
                <DialogDescription>Plan a group ride and invite other riders to join you.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="ride-name">Ride Name</Label>
                  <Input id="ride-name" placeholder="Give your ride a catchy name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ride-type">Ride Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="long-rides" />
                      <label
                        htmlFor="long-rides"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Long Ride
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="scenic-routes" />
                      <label
                        htmlFor="scenic-routes"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Scenic Route
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="photography" />
                      <label
                        htmlFor="photography"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Photography
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sunset-rides" />
                      <label
                        htmlFor="sunset-rides"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sunset Ride
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cafe-hopping" />
                      <label
                        htmlFor="cafe-hopping"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Café Hopping
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mountain-rides" />
                      <label
                        htmlFor="mountain-rides"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Mountain Ride
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="General area of the ride" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meeting-point">Meeting Point</Label>
                  <Input id="meeting-point" placeholder="Specific meeting location" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g., 2 hours" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-participants">Max Participants</Label>
                    <Input id="max-participants" type="number" min="2" max="20" defaultValue="8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the ride, what to expect, and any requirements..."
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ride Visibility</Label>
                  <RadioGroup defaultValue="public">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="text-sm font-medium">
                        Public (Anyone can join)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="text-sm font-medium">
                        Private (Invite only)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="allow-passengers" defaultChecked />
                  <label
                    htmlFor="allow-passengers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow passengers (riders with extra seats can bring passengers)
                  </label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateRide(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateRide(false)}>Create Ride</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="discover" className="m-0">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search group rides..."
                  className="pl-10 pr-10"
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
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filter Rides</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">When</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.today}
                            onCheckedChange={(checked) => setFilters({ ...filters, today: checked })}
                          />
                          <span className="text-sm">Today</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.tomorrow}
                            onCheckedChange={(checked) => setFilters({ ...filters, tomorrow: checked })}
                          />
                          <span className="text-sm">Tomorrow</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.thisWeek}
                            onCheckedChange={(checked) => setFilters({ ...filters, thisWeek: checked })}
                          />
                          <span className="text-sm">This Week</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Ride Types</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.longRides}
                            onCheckedChange={(checked) => setFilters({ ...filters, longRides: checked })}
                          />
                          <span className="text-sm">Long Rides</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.scenicRoutes}
                            onCheckedChange={(checked) => setFilters({ ...filters, scenicRoutes: checked })}
                          />
                          <span className="text-sm">Scenic Routes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.photography}
                            onCheckedChange={(checked) => setFilters({ ...filters, photography: checked })}
                          />
                          <span className="text-sm">Photography</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.sunsetRides}
                            onCheckedChange={(checked) => setFilters({ ...filters, sunsetRides: checked })}
                          />
                          <span className="text-sm">Sunset Rides</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.cafeHopping}
                            onCheckedChange={(checked) => setFilters({ ...filters, cafeHopping: checked })}
                          />
                          <span className="text-sm">Café Hopping</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.mountainRides}
                            onCheckedChange={(checked) => setFilters({ ...filters, mountainRides: checked })}
                          />
                          <span className="text-sm">Mountain Rides</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setFilters({
                            today: true,
                            tomorrow: true,
                            thisWeek: true,
                            longRides: false,
                            scenicRoutes: false,
                            photography: false,
                            sunsetRides: false,
                            cafeHopping: false,
                            mountainRides: false,
                          })
                        }}
                      >
                        Reset
                      </Button>
                      <Button className="flex-1">Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {filteredRides.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-2">No group rides match your filters</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        today: true,
                        tomorrow: true,
                        thisWeek: true,
                        longRides: false,
                        scenicRoutes: false,
                        photography: false,
                        sunsetRides: false,
                        cafeHopping: false,
                        mountainRides: false,
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
                {filteredRides.map((ride) => (
                  <Card key={ride.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{ride.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {ride.location}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {ride.participants}/{ride.maxParticipants}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ride.creator.avatar} alt={ride.creator.name} />
                          <AvatarFallback>{ride.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Organized by {ride.creator.name}</span>
                      </div>

                      <p className="text-sm mb-3">{ride.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {ride.type.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {getRideTypeBadge(type)}
                          </Badge>
                        ))}
                        {ride.allowPassengers && (
                          <Badge variant="outline" className="text-xs">
                            Passengers Welcome
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{ride.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{ride.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{ride.meetingPoint}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {ride.participants} joined, {ride.maxParticipants - ride.participants} spots left
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 border-t">
                      <Button variant="ghost" className="w-full rounded-none h-12">
                        Join Ride
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="my-rides" className="m-0">
          <div className="space-y-4">
            {myRides.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-2">You haven't joined any group rides yet</p>
                  <Button onClick={() => setActiveTab("discover")} className="gap-1">
                    Discover Rides
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myRides.map((ride) => (
                  <Card
                    key={ride.id}
                    className={`overflow-hidden ${ride.status === "active" ? "border-green-500 dark:border-green-600" : ride.status === "past" ? "border-gray-300 dark:border-gray-700 opacity-70" : ""}`}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{ride.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {ride.location}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {ride.participants}/{ride.maxParticipants}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      {!ride.isCreator && ride.creator && (
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={ride.creator.avatar} alt={ride.creator.name} />
                            <AvatarFallback>{ride.creator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">Organized by {ride.creator.name}</span>
                        </div>
                      )}

                      {ride.isCreator && (
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            You're the organizer
                          </Badge>
                        </div>
                      )}

                      <p className="text-sm mb-3">{ride.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {ride.type.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {getRideTypeBadge(type)}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{ride.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{ride.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{ride.meetingPoint}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {ride.participants} joined, {ride.maxParticipants - ride.participants} spots left
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 border-t">
                      {ride.isCreator ? (
                        <div className="grid grid-cols-2 w-full">
                          <Button variant="ghost" className="rounded-none h-12 border-r">
                            Manage Ride
                          </Button>
                          <Button
                            variant="ghost"
                            className="rounded-none h-12 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            Cancel Ride
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" className="w-full rounded-none h-12">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
