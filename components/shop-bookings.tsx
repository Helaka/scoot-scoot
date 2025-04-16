"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Clock,
  MapPin,
  User,
  Bike,
  DollarSign,
  CheckCircle2,
  Clock3,
  XCircle,
  Mail,
  Phone,
  Shield,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Import the BlacklistCheck component
import { BlacklistCheck } from "./blacklist-check"
import { toast } from "@/components/ui/use-toast"
// Add these imports at the top of the file
import { QuickPriceAdjustment } from "./quick-price-adjustment"
import type { Scooter } from "@/types/scooter-types"

export function ShopBookings() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  // Add state variables for blacklist checking
  const [isBlacklistChecking, setIsBlacklistChecking] = useState(false)
  const [selectedBookingCustomer, setSelectedBookingCustomer] = useState<string | null>(null)
  // Add this state variable inside the ShopBookings component
  const [selectedScooterForBooking, setSelectedScooterForBooking] = useState<Scooter | null>(null)
  const [bookingPrice, setBookingPrice] = useState<number>(0)

  // Demo data
  const bookings = [
    {
      id: "B-1234",
      customer: {
        id: "C-1001",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
      },
      scooter: {
        id: "SC-001",
        model: "Lime S3",
      },
      startTime: "2023-06-10T09:00:00",
      endTime: "2023-06-10T11:00:00",
      status: "completed",
      location: "Main Store",
      amount: 29.99,
      paymentStatus: "paid",
      insurance: {
        plan: "Standard",
        coverage: 1000,
        dailyRate: 9.99,
        total: 19.98,
        deductible: 50,
      },
    },
    {
      id: "B-1235",
      customer: {
        id: "C-1002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
      },
      scooter: {
        id: "SC-002",
        model: "Xiaomi Pro 2",
      },
      startTime: "2023-06-10T10:30:00",
      endTime: "2023-06-10T12:30:00",
      status: "active",
      location: "Downtown",
      amount: 24.99,
      paymentStatus: "paid",
      insurance: {
        plan: "Premium",
        coverage: 2000,
        dailyRate: 14.99,
        total: 29.98,
        deductible: 0,
      },
    },
    {
      id: "B-1236",
      customer: {
        id: "C-1003",
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        phone: "+1 (555) 456-7890",
      },
      scooter: {
        id: "SC-003",
        model: "Segway Ninebot",
      },
      startTime: "2023-06-10T13:00:00",
      endTime: "2023-06-10T15:00:00",
      status: "upcoming",
      location: "Beach Front",
      amount: 34.99,
      paymentStatus: "pending",
      insurance: null,
    },
    {
      id: "B-1237",
      customer: {
        id: "C-1004",
        name: "Sarah Williams",
        email: "sarah.williams@example.com",
        phone: "+1 (555) 789-0123",
      },
      scooter: {
        id: "SC-004",
        model: "Lime S3",
      },
      startTime: "2023-06-10T14:30:00",
      endTime: "2023-06-10T16:30:00",
      status: "upcoming",
      location: "City Center",
      amount: 29.99,
      paymentStatus: "pending",
      insurance: {
        plan: "Standard",
        coverage: 1000,
        dailyRate: 9.99,
        total: 19.98,
        deductible: 50,
      },
    },
    {
      id: "B-1238",
      customer: {
        id: "C-1005",
        name: "David Brown",
        email: "david.brown@example.com",
        phone: "+1 (555) 234-5678",
      },
      scooter: {
        id: "SC-005",
        model: "Xiaomi Pro 2",
      },
      startTime: "2023-06-09T10:00:00",
      endTime: "2023-06-09T12:00:00",
      status: "completed",
      location: "Main Store",
      amount: 24.99,
      paymentStatus: "paid",
      insurance: {
        plan: "Premium",
        coverage: 2000,
        dailyRate: 14.99,
        total: 29.98,
        deductible: 0,
      },
    },
    {
      id: "B-1239",
      customer: {
        id: "C-1006",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "+1 (555) 345-6789",
      },
      scooter: {
        id: "SC-006",
        model: "Segway Ninebot",
      },
      startTime: "2023-06-09T13:30:00",
      endTime: "2023-06-09T15:30:00",
      status: "cancelled",
      location: "Downtown",
      amount: 34.99,
      paymentStatus: "refunded",
      insurance: null,
    },
  ]

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.scooter.model.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "today" && isToday(new Date(booking.startTime))) ||
      (activeTab === "upcoming" && isUpcoming(booking.status)) ||
      (activeTab === "completed" && booking.status === "completed")

    return matchesSearch && matchesStatus && matchesTab
  })

  function isToday(date: Date) {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  function isUpcoming(status: string) {
    return status === "upcoming" || status === "active"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "active":
        return (
          <Badge className="bg-blue-500">
            <Bike className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "upcoming":
        return (
          <Badge className="bg-purple-500">
            <Clock3 className="mr-1 h-3 w-3" /> Upcoming
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="border-red-200 text-red-500">
            <XCircle className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="border-green-200 text-green-500">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-200 text-yellow-500">
            Pending
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-500">
            Refunded
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const selectedBookingData = selectedBooking ? bookings.find((b) => b.id === selectedBooking) : null

  // Add this function inside the ShopBookings component
  const handleScooterSelect = (scooterId: string) => {
    // In a real app, this would fetch the scooter details from the database
    const scooter = {
      id: scooterId,
      model: "Honda Click 125i",
      status: "available",
      fuelType: "petrol",
      location: "Main Store",
      lastMaintenance: "2023-05-15",
      totalRentals: 42,
      pricing: {
        hourlyRate: 8.99,
        dailyRate: 29.99,
        customPricing: true,
      },
    } as Scooter

    setSelectedScooterForBooking(scooter)
    setBookingPrice(scooter.pricing?.dailyRate || 29.99)
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground">
            Manage your scooter bookings, track active rentals, and view booking history.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {bookings.filter((b) => b.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.filter((b) => isToday(new Date(b.startTime))).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">
                {bookings.filter((b) => b.status === "upcoming").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <Dialog open={isAddBookingOpen} onOpenChange={setIsAddBookingOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddBookingOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Booking
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Booking</DialogTitle>
                  <DialogDescription>Enter the details for the new scooter booking.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer" className="text-right">
                      Customer
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="c1001">John Doe</SelectItem>
                        <SelectItem value="c1002">Jane Smith</SelectItem>
                        <SelectItem value="c1003">Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Find the DialogContent for the "Add New Booking" dialog and replace the scooter selection part with: */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="scooter" className="text-right">
                      Scooter
                    </Label>
                    <Select onValueChange={handleScooterSelect}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select scooter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sc001">SC-001 (Lime S3) - $29.99/day</SelectItem>
                        <SelectItem value="sc002">SC-002 (Xiaomi Pro 2) - $34.99/day</SelectItem>
                        <SelectItem value="sc004">SC-004 (Lime S3) - $29.99/day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedScooterForBooking && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Price</Label>
                      <div className="col-span-2 flex items-center">
                        <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{bookingPrice.toFixed(2)}/day</span>
                      </div>
                      <QuickPriceAdjustment
                        originalPrice={selectedScooterForBooking.pricing?.dailyRate || 29.99}
                        onPriceChange={setBookingPrice}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="start-date" className="text-right">
                      Start Date
                    </Label>
                    <Input id="start-date" type="datetime-local" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="end-date" className="text-right">
                      End Date
                    </Label>
                    <Input id="end-date" type="datetime-local" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Pickup Location
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Store</SelectItem>
                        <SelectItem value="downtown">Downtown</SelectItem>
                        <SelectItem value="beach">Beach Front</SelectItem>
                        <SelectItem value="city">City Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBookingOpen(false)}>
                    Cancel
                  </Button>
                  {/* Update the Create Booking button click handler */}
                  <Button
                    onClick={() => {
                      // Get the selected customer ID (in a real app, this would come from the form)
                      const customerId = "C-1003" // This is just for demo purposes
                      setSelectedBookingCustomer(customerId)
                      setIsBlacklistChecking(true)
                      setIsAddBookingOpen(false)
                    }}
                  >
                    Create Booking
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="all" className="mt-6">
            {/* Actions and Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Booking List */}
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-2">Booking ID</div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-2">Scooter</div>
                <div className="col-span-2">Time</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Insurance</div>
                <div className="col-span-1"></div>
              </div>
              <div className="divide-y">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <div key={booking.id} className="grid grid-cols-12 items-center p-4">
                      <div className="col-span-2 font-medium">{booking.id}</div>
                      <div className="col-span-2">
                        <div>{booking.customer.name}</div>
                        <div className="text-sm text-muted-foreground">{booking.customer.email}</div>
                      </div>
                      <div className="col-span-2">
                        <div>{booking.scooter.model}</div>
                        <div className="text-sm text-muted-foreground">{booking.scooter.id}</div>
                      </div>
                      <div className="col-span-2">
                        <div>
                          {new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(booking.startTime).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="col-span-2">{getStatusBadge(booking.status)}</div>
                      <div className="col-span-1">
                        {booking.insurance ? (
                          <Badge className="bg-green-500">
                            <Shield className="mr-1 h-3 w-3" />
                            Insured
                          </Badge>
                        ) : (
                          <Badge variant="outline">None</Badge>
                        )}
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedBooking(booking.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                            {booking.status === "upcoming" && (
                              <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No bookings found matching your filters.</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="today" className="mt-6">
            {/* Today's bookings content - similar structure to "all" tab */}
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-2">Booking ID</div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-2">Scooter</div>
                <div className="col-span-2">Time</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Insurance</div>
                <div className="col-span-1"></div>
              </div>
              <div className="divide-y">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <div key={booking.id} className="grid grid-cols-12 items-center p-4">
                      <div className="col-span-2 font-medium">{booking.id}</div>
                      <div className="col-span-2">
                        <div>{booking.customer.name}</div>
                        <div className="text-sm text-muted-foreground">{booking.customer.email}</div>
                      </div>
                      <div className="col-span-2">
                        <div>{booking.scooter.model}</div>
                        <div className="text-sm text-muted-foreground">{booking.scooter.id}</div>
                      </div>
                      <div className="col-span-2">
                        <div>
                          {new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(booking.startTime).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="col-span-2">{getStatusBadge(booking.status)}</div>
                      <div className="col-span-1">
                        {booking.insurance ? (
                          <Badge className="bg-green-500">
                            <Shield className="mr-1 h-3 w-3" />
                            Insured
                          </Badge>
                        ) : (
                          <Badge variant="outline">None</Badge>
                        )}
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedBooking(booking.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                            {booking.status === "upcoming" && (
                              <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No bookings scheduled for today.</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            {/* Upcoming bookings content - similar structure */}
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-2">Booking ID</div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-2">Scooter</div>
                <div className="col-span-2">Time</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Insurance</div>
                <div className="col-span-1"></div>
              </div>
              <div className="divide-y">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <div key={booking.id} className="grid grid-cols-12 items-center p-4">
                      <div className="col-span-2 font-medium">{booking.id}</div>
                      <div className="col-span-2">
                        <div>{booking.customer.name}</div>
                        <div className="text-sm text-muted-foreground">{booking.customer.email}</div>
                      </div>
                      <div className="col-span-2">
                        <div>{booking.scooter.model}</div>
                        <div className="text-sm text-muted-foreground">{booking.scooter.id}</div>
                      </div>
                      <div className="col-span-2">
                        <div>
                          {new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(booking.startTime).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="col-span-2">{getStatusBadge(booking.status)}</div>
                      <div className="col-span-1">
                        {booking.insurance ? (
                          <Badge className="bg-green-500">
                            <Shield className="mr-1 h-3 w-3" />
                            Insured
                          </Badge>
                        ) : (
                          <Badge variant="outline">None</Badge>
                        )}
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedBooking(booking.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                            {booking.status === "upcoming" && (
                              <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No upcoming bookings found.</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {/* Completed bookings content - similar structure */}
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-2">Booking ID</div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-2">Scooter</div>
                <div className="col-span-2">Time</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Insurance</div>
                <div className="col-span-1"></div>
              </div>
              <div className="divide-y">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <div key={booking.id} className="grid grid-cols-12 items-center p-4">
                      <div className="col-span-2 font-medium">{booking.id}</div>
                      <div className="col-span-2">
                        <div>{booking.customer.name}</div>
                        <div className="text-sm text-muted-foreground">{booking.customer.email}</div>
                      </div>
                      <div className="col-span-2">
                        <div>{booking.scooter.model}</div>
                        <div className="text-sm text-muted-foreground">{booking.scooter.id}</div>
                      </div>
                      <div className="col-span-2">
                        <div>
                          {new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(booking.startTime).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="col-span-2">{getStatusBadge(booking.status)}</div>
                      <div className="col-span-1">
                        {booking.insurance ? (
                          <Badge className="bg-green-500">
                            <Shield className="mr-1 h-3 w-3" />
                            Insured
                          </Badge>
                        ) : (
                          <Badge variant="outline">None</Badge>
                        )}
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedBooking(booking.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                            {booking.status === "upcoming" && (
                              <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No completed bookings found.</div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Booking Details Dialog */}
        {selectedBookingData && (
          <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogDescription>Detailed information about booking {selectedBookingData.id}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{selectedBookingData.customer.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{selectedBookingData.customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{selectedBookingData.customer.phone}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Scooter Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center">
                        <Bike className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{selectedBookingData.scooter.model}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4" />
                        <span>ID: {selectedBookingData.scooter.id}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Pickup: {selectedBookingData.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Booking Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Start Time</h4>
                        <div className="flex items-center mt-1">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{new Date(selectedBookingData.startTime).toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">End Time</h4>
                        <div className="flex items-center mt-1">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{new Date(selectedBookingData.endTime).toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                        <div className="mt-1">{getStatusBadge(selectedBookingData.status)}</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Payment</h4>
                        <div className="flex items-center mt-1">
                          <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>${selectedBookingData.amount}</span>
                          <span className="ml-2">{getPaymentStatusBadge(selectedBookingData.paymentStatus)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Add Insurance Information Section */}
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Insurance</h4>
                      <div className="rounded-md bg-muted p-3">
                        {selectedBookingData.insurance ? (
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Shield className="mr-2 h-4 w-4 text-green-500" />
                              <span className="font-medium">{selectedBookingData.insurance.plan} Protection</span>
                              <Badge className="ml-2 bg-green-500">Insured</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Coverage:</span> $
                                {selectedBookingData.insurance.coverage}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Daily Rate:</span> $
                                {selectedBookingData.insurance.dailyRate}/day
                              </div>
                              <div>
                                <span className="text-muted-foreground">Total Insurance:</span> $
                                {selectedBookingData.insurance.total}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Deductible:</span> $
                                {selectedBookingData.insurance.deductible}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                            <span>No insurance selected for this rental</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* In the booking details dialog, add pricing information after the scooter information section: */}
                <div className="flex items-center mt-1">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Base Price: ${selectedBookingData.amount}</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
                {selectedBookingData.status === "upcoming" && <Button variant="destructive">Cancel Booking</Button>}
                {selectedBookingData.status === "active" && <Button>Complete Rental</Button>}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {/* Add the BlacklistCheck component at the end of the component */}
        {isBlacklistChecking && selectedBookingCustomer && (
          <BlacklistCheck
            customerId={selectedBookingCustomer}
            customerName="Mike Johnson" // In a real app, this would be dynamic
            customerEmail="mike.johnson@example.com" // In a real app, this would be dynamic
            onContinue={() => {
              // Continue with booking creation
              setIsBlacklistChecking(false)
              setSelectedBookingCustomer(null)
              // Show success message
              toast({
                title: "Booking created",
                description: "The booking has been created successfully.",
              })
            }}
            onCancel={() => {
              setIsBlacklistChecking(false)
              setSelectedBookingCustomer(null)
            }}
          />
        )}
      </div>
    </ShopLayout>
  )
}

export default ShopBookings
