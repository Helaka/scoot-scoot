"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X, Filter, MessageCircle, MapPin, Clock, Plus } from "lucide-react"
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

export function PassengerRequests() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("browse")
  const [showCreateRequest, setShowCreateRequest] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    sunsetCruise: false,
    cafeHopping: false,
    nightMarket: false,
    beachRide: false,
    randomAdventure: false,
  })

  // Mock data for passenger requests
  const passengerRequests = [
    {
      id: "request-1",
      name: "Lily Park",
      avatar: "/placeholder.svg?height=40&width=40",
      requestType: "Sunset Cruise",
      message: "Looking for a ride to watch the sunset at the beach! I know a great spot with an amazing view.",
      location: "Patong Beach",
      time: "Today, 5:30 PM",
      distance: 0.8,
      urgent: true,
    },
    {
      id: "request-2",
      name: "Tom Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      requestType: "Café Hopping",
      message: "Want to explore some new cafés in town. Will buy coffee for my driver!",
      location: "Old Town",
      time: "Tomorrow, 10:00 AM",
      distance: 1.2,
      urgent: false,
    },
    {
      id: "request-3",
      name: "Maya Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      requestType: "Night Market Trip",
      message: "Looking for a ride to the night market. Happy to share food and show around!",
      location: "Weekend Market",
      time: "Friday, 7:00 PM",
      distance: 2.1,
      urgent: false,
    },
    {
      id: "request-4",
      name: "Ryan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      requestType: "Random Adventure",
      message: "No plans, just want to explore! Up for anything interesting around the area.",
      location: "Flexible",
      time: "Saturday, 2:00 PM",
      distance: 0.5,
      urgent: true,
    },
    {
      id: "request-5",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      requestType: "Beach Ride",
      message: "Would love to visit a few beaches along the coast. Can split gas money!",
      location: "Kata Beach",
      time: "Sunday, 11:00 AM",
      distance: 1.7,
      urgent: false,
    },
  ]

  // My requests
  const myRequests = [
    {
      id: "my-request-1",
      requestType: "Café Hopping",
      message: "Looking to try some local coffee shops. Anyone want to show me around?",
      location: "City Center",
      time: "Tomorrow, 9:00 AM",
      status: "active", // active, accepted, expired
      responses: 2,
    },
    {
      id: "my-request-2",
      requestType: "Sunset Cruise",
      message: "Want to catch the sunset at a good viewpoint!",
      location: "Promthep Cape",
      time: "Friday, 5:30 PM",
      status: "accepted", // active, accepted, expired
      acceptedBy: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
  ]

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
  }

  // Filter passenger requests based on search and filters
  const filteredRequests = passengerRequests.filter((request) => {
    // Filter by search query
    if (
      searchQuery &&
      !request.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by request type
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key]) => key)

    if (activeFilters.length > 0) {
      const requestTypeKey = request.requestType.toLowerCase().replace(/\s+/g, "")
      return activeFilters.includes(requestTypeKey)
    }

    return true
  })

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="browse">Browse Requests</TabsTrigger>
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          </TabsList>

          <Dialog open={showCreateRequest} onOpenChange={setShowCreateRequest}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Passenger Request</DialogTitle>
                <DialogDescription>Let riders know what kind of experience you're looking for.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="request-type">Request Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sunset-cruise" />
                      <label
                        htmlFor="sunset-cruise"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sunset Cruise
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
                      <Checkbox id="night-market" />
                      <label
                        htmlFor="night-market"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Night Market
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="beach-ride" />
                      <label
                        htmlFor="beach-ride"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Beach Ride
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="random-adventure" />
                      <label
                        htmlFor="random-adventure"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Random Adventure
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Where would you like to go?" />
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

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell riders a bit about what you're looking for..."
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="urgent" />
                  <label
                    htmlFor="urgent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark as urgent (looking for a ride soon)
                  </label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateRequest(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateRequest(false)}>Post Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="browse" className="m-0">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search passenger requests..."
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
                    <SheetTitle>Filter Requests</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Request Types</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.sunsetCruise}
                            onCheckedChange={(checked) => setFilters({ ...filters, sunsetCruise: checked })}
                          />
                          <span className="text-sm">Sunset Cruise</span>
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
                            checked={filters.nightMarket}
                            onCheckedChange={(checked) => setFilters({ ...filters, nightMarket: checked })}
                          />
                          <span className="text-sm">Night Market</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.beachRide}
                            onCheckedChange={(checked) => setFilters({ ...filters, beachRide: checked })}
                          />
                          <span className="text-sm">Beach Ride</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={filters.randomAdventure}
                            onCheckedChange={(checked) => setFilters({ ...filters, randomAdventure: checked })}
                          />
                          <span className="text-sm">Random Adventure</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setFilters({
                            sunsetCruise: false,
                            cafeHopping: false,
                            nightMarket: false,
                            beachRide: false,
                            randomAdventure: false,
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

            {filteredRequests.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-2">No passenger requests match your filters</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        sunsetCruise: false,
                        cafeHopping: false,
                        nightMarket: false,
                        beachRide: false,
                        randomAdventure: false,
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
                {filteredRequests.map((request) => (
                  <Card
                    key={request.id}
                    className={`overflow-hidden hover:shadow-md transition-shadow ${request.urgent ? "border-yellow-500 dark:border-yellow-600" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.avatar} alt={request.name} />
                          <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{request.name}</h3>
                            {request.urgent && <Badge className="bg-yellow-500 text-black">Urgent</Badge>}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {request.requestType}
                            </Badge>
                            <span>•</span>
                            <span>{request.distance} miles away</span>
                          </div>
                          <p className="text-sm mt-2">{request.message}</p>
                          <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{request.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{request.time}</span>
                            </div>
                          </div>
                          <div className="flex justify-end mt-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8 gap-1">
                                <MessageCircle className="h-3 w-3" />
                                Message
                              </Button>
                              <Button size="sm" className="h-8">
                                Offer Ride
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="my-requests" className="m-0">
          <div className="space-y-4">
            {myRequests.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-2">You haven't created any passenger requests yet</p>
                  <Button onClick={() => setShowCreateRequest(true)} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Create Request
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myRequests.map((request) => (
                  <Card
                    key={request.id}
                    className={`overflow-hidden ${request.status === "accepted" ? "border-green-500 dark:border-green-600" : request.status === "expired" ? "border-gray-300 dark:border-gray-700 opacity-70" : ""}`}
                  >
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{request.requestType}</CardTitle>
                        {request.status === "active" && <Badge className="bg-blue-500">Active</Badge>}
                        {request.status === "accepted" && <Badge className="bg-green-500">Accepted</Badge>}
                        {request.status === "expired" && <Badge variant="outline">Expired</Badge>}
                      </div>
                      <CardDescription>
                        {request.location} • {request.time}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm">{request.message}</p>

                      {request.status === "accepted" && request.acceptedBy && (
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={request.acceptedBy.avatar} alt={request.acceptedBy.name} />
                              <AvatarFallback>{request.acceptedBy.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{request.acceptedBy.name} accepted your request</p>
                              <p className="text-xs text-muted-foreground">Tap to view details and chat</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {request.status === "active" && (
                        <div className="mt-3 text-sm text-muted-foreground">
                          {request.responses > 0 ? (
                            <p>
                              {request.responses} {request.responses === 1 ? "rider has" : "riders have"} responded to
                              your request
                            </p>
                          ) : (
                            <p>No responses yet. Your request is visible to nearby riders.</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-0 border-t">
                      {request.status === "active" && (
                        <div className="grid grid-cols-2 w-full">
                          <Button variant="ghost" className="rounded-none h-12 border-r">
                            Edit Request
                          </Button>
                          <Button
                            variant="ghost"
                            className="rounded-none h-12 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            Cancel Request
                          </Button>
                        </div>
                      )}
                      {request.status === "accepted" && (
                        <Button variant="ghost" className="w-full rounded-none h-12">
                          View Details
                        </Button>
                      )}
                      {request.status === "expired" && (
                        <Button variant="ghost" className="w-full rounded-none h-12">
                          Create Similar Request
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
