"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Bike,
  Star,
  MessageSquare,
  DollarSign,
  LayoutGrid,
  LayoutList,
  LayoutDashboardIcon as LayoutCards,
  User,
  MapPin,
  Clock,
  Shield,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ViewType = "list" | "grid" | "cards"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "blacklisted"
  joinDate: string
  totalRentals: number
  totalSpent: number
  lastRental: string
  rating: number
  address?: string
  nationality?: string
  licenseNumber?: string
  licenseExpiry?: string
  passportNumber?: string
  passportExpiry?: string
  notes?: string[]
  profileImage?: string
  idImage?: string
  licenseImage?: string
  preferredScooter?: string
  blacklistReason?: string
  verificationStatus?: "verified" | "pending" | "rejected"
  insuranceStatus?: "insured" | "uninsured"
}

export function ShopCustomers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewType, setViewType] = useState<ViewType>("list")
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("recent")

  // Demo data with profile images
  const customers: Customer[] = [
    {
      id: "C-1001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      joinDate: "2023-01-15",
      totalRentals: 12,
      totalSpent: 349.99,
      lastRental: "2023-06-01",
      rating: 4.8,
      address: "123 Main St, Bangkok",
      nationality: "American",
      licenseNumber: "DL-12345",
      licenseExpiry: "2025-05-20",
      passportNumber: "P12345678",
      passportExpiry: "2027-03-15",
      notes: ["Prefers Honda scooters", "Regular customer"],
      profileImage: "/placeholder.svg?height=200&width=200",
      idImage: "/placeholder.svg?height=400&width=600",
      licenseImage: "/placeholder.svg?height=400&width=600",
      preferredScooter: "Honda Click 125i",
      verificationStatus: "verified",
      insuranceStatus: "insured",
    },
    {
      id: "C-1002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      joinDate: "2023-02-20",
      totalRentals: 8,
      totalSpent: 219.5,
      lastRental: "2023-05-28",
      rating: 4.5,
      address: "456 Park Ave, Chiang Mai",
      nationality: "British",
      licenseNumber: "UK-789456",
      licenseExpiry: "2024-11-10",
      passportNumber: "GB987654321",
      passportExpiry: "2026-07-22",
      notes: ["First time in Thailand", "Purchased insurance"],
      profileImage: "/placeholder.svg?height=200&width=200",
      idImage: "/placeholder.svg?height=400&width=600",
      licenseImage: "/placeholder.svg?height=400&width=600",
      preferredScooter: "Yamaha NMAX",
      verificationStatus: "verified",
      insuranceStatus: "insured",
    },
    {
      id: "C-1003",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (555) 456-7890",
      status: "inactive",
      joinDate: "2023-03-10",
      totalRentals: 3,
      totalSpent: 89.97,
      lastRental: "2023-04-15",
      rating: 3.9,
      address: "789 Beach Rd, Phuket",
      nationality: "Canadian",
      licenseNumber: "CA-456123",
      licenseExpiry: "2023-12-05",
      passportNumber: "CA7654321",
      passportExpiry: "2025-09-18",
      notes: ["License expiring soon", "Prefers automatic transmission"],
      profileImage: "/placeholder.svg?height=200&width=200",
      idImage: "/placeholder.svg?height=400&width=600",
      licenseImage: "/placeholder.svg?height=400&width=600",
      preferredScooter: "Honda PCX",
      verificationStatus: "verified",
      insuranceStatus: "uninsured",
    },
    {
      id: "C-1004",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+1 (555) 789-0123",
      status: "active",
      joinDate: "2023-03-25",
      totalRentals: 6,
      totalSpent: 179.94,
      lastRental: "2023-05-30",
      rating: 4.7,
      address: "101 River View, Krabi",
      nationality: "Australian",
      licenseNumber: "AU-987123",
      licenseExpiry: "2026-02-15",
      passportNumber: "AU8765432",
      passportExpiry: "2028-04-30",
      notes: ["Long-term rental customer", "Interested in monthly rates"],
      profileImage: "/placeholder.svg?height=200&width=200",
      idImage: "/placeholder.svg?height=400&width=600",
      licenseImage: "/placeholder.svg?height=400&width=600",
      preferredScooter: "Yamaha Aerox",
      verificationStatus: "verified",
      insuranceStatus: "insured",
    },
    {
      id: "C-1005",
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      joinDate: "2023-04-05",
      totalRentals: 5,
      totalSpent: 149.95,
      lastRental: "2023-06-02",
      rating: 4.2,
      address: "222 Mountain View, Pai",
      nationality: "German",
      licenseNumber: "DE-123789",
      licenseExpiry: "2025-08-20",
      passportNumber: "DE1234567",
      passportExpiry: "2027-10-15",
      notes: ["Experienced rider", "Prefers larger scooters"],
      profileImage: "/placeholder.svg?height=200&width=200",
      idImage: "/placeholder.svg?height=400&width=600",
      licenseImage: "/placeholder.svg?height=400&width=600",
      preferredScooter: "Honda ADV 150",
      verificationStatus: "verified",
      insuranceStatus: "insured",
    },
    {
      id: "C-1006",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 345-6789",
      status: "blacklisted",
      joinDate: "2023-04-20",
      totalRentals: 2,
      totalSpent: 59.98,
      lastRental: "2023-05-01",
      rating: 2.0,
      address: "333 Coastal Rd, Koh Samui",
      nationality: "French",
      licenseNumber: "FR-654321",
      licenseExpiry: "2024-06-30",
      passportNumber: "FR7654321",
      passportExpiry: "2026-12-25",
      notes: ["Damaged scooter on last rental", "Refused to pay for repairs"],
      profileImage: "/placeholder.svg?height=200&width=200",
      idImage: "/placeholder.svg?height=400&width=600",
      licenseImage: "/placeholder.svg?height=400&width=600",
      preferredScooter: "Vespa Primavera",
      blacklistReason: "Damaged vehicle and refused to pay for repairs",
      verificationStatus: "verified",
      insuranceStatus: "uninsured",
    },
    {
      id: "C-1007",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      phone: "+1 (555) 567-8901",
      status: "active",
      joinDate: "2023-05-05",
      totalRentals: 4,
      totalSpent: 119.96,
      lastRental: "2023-06-03",
      rating: 4.9,
      address: "444 Temple Lane, Chiang Rai",
      nationality: "Dutch",
      licenseNumber: "NL-987654",
      licenseExpiry: "2025-11-15",
      passportNumber: "NL9876543",
      passportExpiry: "2028-01-20",
      notes: ["Very careful rider", "Always returns scooters clean"],
      profileImage: "/placeholder.svg?height=200&width=200",
      idImage: "/placeholder.svg?height=400&width=600",
      licenseImage: "/placeholder.svg?height=400&width=600",
      preferredScooter: "Suzuki Burgman",
      verificationStatus: "verified",
      insuranceStatus: "insured",
    },
    {
      id: "C-1008",
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      phone: "+1 (555) 678-9012",
      status: "active",
      joinDate: "2023-05-15",
      totalRentals: 3,
      totalSpent: 89.97,
      lastRental: "2023-06-01",
      rating: 4.6,
      address: "555 Sunset Blvd, Hua Hin",
      nationality: "Swedish",
      licenseNumber: "SE-123456",
      licenseExpiry: "2026-04-10",
      passportNumber: "SE1234567",
      passportExpiry: "2027-08-05",
      notes: ["Interested in long-term rentals", "Prefers fuel-efficient models"],
      profileImage: "/placeholder.svg?height=200&width=200",
      idImage: "/placeholder.svg?height=400&width=600",
      licenseImage: "/placeholder.svg?height=400&width=600",
      preferredScooter: "Honda Click 125i",
      verificationStatus: "pending",
      insuranceStatus: "insured",
    },
  ]

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.status === "active") ||
      (statusFilter === "inactive" && customer.status === "inactive") ||
      (statusFilter === "blacklisted" && customer.status === "blacklisted")

    return matchesSearch && matchesFilter
  })

  // Sort customers based on selected sort option
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      case "rentals":
        return b.totalRentals - a.totalRentals
      case "spent":
        return b.totalSpent - a.totalSpent
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "blacklisted":
        return <Badge variant="destructive">Blacklisted</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getVerificationBadge = (status?: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const selectedCustomerData = selectedCustomer ? customers.find((c) => c.id === selectedCustomer) : null

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer database, view rental history, and contact customers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {customers.filter((c) => c.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  customers.filter((c) => {
                    const joinDate = new Date(c.joinDate)
                    const now = new Date()
                    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
                  }).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Customer Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-2xl font-bold">
                {(customers.reduce((sum, c) => sum + c.rating, 0) / customers.length).toFixed(1)}
                <Star className="ml-1 h-5 w-5 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blacklisted">Blacklisted</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="rentals">Most Rentals</SelectItem>
                <SelectItem value="spent">Highest Spend</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-md border p-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewType === "list" ? "default" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewType("list")}
                    >
                      <LayoutList className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>List view</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewType === "grid" ? "default" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewType("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Grid view</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewType === "cards" ? "default" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewType("cards")}
                    >
                      <LayoutCards className="h-4 w-4" />
                      <span className="sr-only">Card view</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Card view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>Enter the details of the new customer to add to your database.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer-name" className="text-right">
                      Name
                    </Label>
                    <Input id="customer-name" placeholder="Full name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer-email" className="text-right">
                      Email
                    </Label>
                    <Input id="customer-email" type="email" placeholder="Email address" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer-phone" className="text-right">
                      Phone
                    </Label>
                    <Input id="customer-phone" placeholder="Phone number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer-nationality" className="text-right">
                      Nationality
                    </Label>
                    <Input id="customer-nationality" placeholder="Nationality" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer-id" className="text-right">
                      ID/Passport
                    </Label>
                    <div className="col-span-3">
                      <Input id="customer-id" type="file" accept="image/*" className="col-span-3" />
                      <p className="mt-1 text-xs text-muted-foreground">Upload passport or ID card image</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddCustomerOpen(false)}>Add Customer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Customer List View */}
        {viewType === "list" && (
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
              <div className="col-span-4">Customer</div>
              <div className="col-span-3">Contact</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Join Date</div>
              <div className="col-span-1"></div>
            </div>
            <div className="divide-y">
              {sortedCustomers.length > 0 ? (
                sortedCustomers.map((customer) => (
                  <div key={customer.id} className="grid grid-cols-12 items-center p-4">
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        {customer.profileImage ? (
                          <AvatarImage src={customer.profileImage} alt={customer.name} />
                        ) : (
                          <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      {getStatusBadge(customer.status)}
                      {customer.verificationStatus && getVerificationBadge(customer.verificationStatus)}
                    </div>
                    <div className="col-span-2">{new Date(customer.joinDate).toLocaleDateString()}</div>
                    <div className="col-span-1 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedCustomer(customer.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          {customer.status === "active" ? (
                            <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                          ) : customer.status === "inactive" ? (
                            <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                          ) : null}
                          {customer.status !== "blacklisted" && (
                            <DropdownMenuItem className="text-red-600">Blacklist</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">No customers found matching your filters.</div>
              )}
            </div>
          </div>
        )}

        {/* Customer Grid View */}
        {viewType === "grid" && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedCustomers.length > 0 ? (
              sortedCustomers.map((customer) => (
                <Card key={customer.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="aspect-[4/3] bg-gradient-to-b from-muted/50 to-muted">
                      {customer.profileImage ? (
                        <img
                          src={customer.profileImage || "/placeholder.svg"}
                          alt={customer.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <User className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 flex gap-1">{getStatusBadge(customer.status)}</div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">{customer.name}</h3>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{customer.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span className="truncate">{customer.nationality}</span>
                      </div>
                      <div className="flex items-center">
                        <Bike className="mr-2 h-4 w-4" />
                        <span>{customer.totalRentals} rentals</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4 pt-3">
                    <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer.id)}>
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        {customer.status === "active" ? (
                          <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                        ) : customer.status === "inactive" ? (
                          <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                        ) : null}
                        {customer.status !== "blacklisted" && (
                          <DropdownMenuItem className="text-red-600">Blacklist</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full p-4 text-center text-muted-foreground">
                No customers found matching your filters.
              </div>
            )}
          </div>
        )}

        {/* Customer Cards View */}
        {viewType === "cards" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedCustomers.length > 0 ? (
              sortedCustomers.map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border">
                          {customer.profileImage ? (
                            <AvatarImage src={customer.profileImage} alt={customer.name} />
                          ) : (
                            <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-sm text-muted-foreground">{customer.id}</p>
                          <div className="mt-1 flex items-center gap-1">
                            {getStatusBadge(customer.status)}
                            {customer.verificationStatus && (
                              <span className="ml-2">{getVerificationBadge(customer.verificationStatus)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-5 w-5 text-yellow-500" />
                        <span className="font-medium">{customer.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{customer.nationality}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{new Date(customer.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Bike className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{customer.totalRentals} rentals</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>${customer.totalSpent.toFixed(2)}</span>
                      </div>
                    </div>

                    {customer.preferredScooter && (
                      <div className="mt-3 flex items-center text-sm">
                        <span className="text-muted-foreground">Preferred scooter:</span>
                        <span className="ml-2 font-medium">{customer.preferredScooter}</span>
                      </div>
                    )}

                    {customer.status === "blacklisted" && customer.blacklistReason && (
                      <div className="mt-3 flex items-start gap-2 rounded-md bg-red-50 p-2 text-sm dark:bg-red-950/50">
                        <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-red-600 dark:text-red-400">{customer.blacklistReason}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t px-6 py-3">
                    <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer.id)}>
                      View Details
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuItem>View ID Documents</DropdownMenuItem>
                          {customer.status === "active" ? (
                            <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                          ) : customer.status === "inactive" ? (
                            <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                          ) : null}
                          {customer.status !== "blacklisted" && (
                            <DropdownMenuItem className="text-red-600">Blacklist</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full p-4 text-center text-muted-foreground">
                No customers found matching your filters.
              </div>
            )}
          </div>
        )}

        {/* Customer Details Dialog */}
        {selectedCustomerData && (
          <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    {selectedCustomerData.profileImage ? (
                      <AvatarImage src={selectedCustomerData.profileImage} alt={selectedCustomerData.name} />
                    ) : (
                      <AvatarFallback>{selectedCustomerData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedCustomerData.name}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                      {selectedCustomerData.id}
                      {getStatusBadge(selectedCustomerData.status)}
                      {selectedCustomerData.verificationStatus &&
                        getVerificationBadge(selectedCustomerData.verificationStatus)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="rentals">Rental History</TabsTrigger>
                  <TabsTrigger value="documents">Documents & ID</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomerData.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomerData.phone}</span>
                        </div>
                        {selectedCustomerData.address && (
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{selectedCustomerData.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Account Information</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Joined: {new Date(selectedCustomerData.joinDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-2 h-4 w-4 text-yellow-500" />
                          <span>Rating: {selectedCustomerData.rating} / 5</span>
                        </div>
                        {selectedCustomerData.nationality && (
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Nationality: {selectedCustomerData.nationality}</span>
                          </div>
                        )}
                        {selectedCustomerData.preferredScooter && (
                          <div className="flex items-center">
                            <Bike className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Preferred: {selectedCustomerData.preferredScooter}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Customer Stats</h3>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <Bike className="mx-auto h-8 w-8 text-muted-foreground" />
                            <h4 className="mt-2 text-xl font-bold">{selectedCustomerData.totalRentals}</h4>
                            <p className="text-sm text-muted-foreground">Total Rentals</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <DollarSign className="mx-auto h-8 w-8 text-muted-foreground" />
                            <h4 className="mt-2 text-xl font-bold">${selectedCustomerData.totalSpent}</h4>
                            <p className="text-sm text-muted-foreground">Total Spent</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <Calendar className="mx-auto h-8 w-8 text-muted-foreground" />
                            <h4 className="mt-2 text-xl font-bold">
                              {new Date(selectedCustomerData.lastRental).toLocaleDateString()}
                            </h4>
                            <p className="text-sm text-muted-foreground">Last Rental</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  {selectedCustomerData.notes && selectedCustomerData.notes.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium">Notes</h3>
                      <div className="mt-2 space-y-2">
                        {selectedCustomerData.notes.map((note, index) => (
                          <div key={index} className="rounded-md border p-3">
                            <p>{note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="rentals" className="pt-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                      <div className="col-span-2">Booking ID</div>
                      <div className="col-span-3">Scooter</div>
                      <div className="col-span-3">Date</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-2">Status</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-12 items-center p-4">
                        <div className="col-span-2">B-1234</div>
                        <div className="col-span-3">Honda Click 125i</div>
                        <div className="col-span-3">June 1, 2023</div>
                        <div className="col-span-2">$29.99</div>
                        <div className="col-span-2">
                          <Badge className="bg-green-500">Completed</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 items-center p-4">
                        <div className="col-span-2">B-1156</div>
                        <div className="col-span-3">Yamaha NMAX</div>
                        <div className="col-span-3">May 28, 2023</div>
                        <div className="col-span-2">$24.99</div>
                        <div className="col-span-2">
                          <Badge className="bg-green-500">Completed</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 items-center p-4">
                        <div className="col-span-2">B-1098</div>
                        <div className="col-span-3">Honda PCX</div>
                        <div className="col-span-3">May 15, 2023</div>
                        <div className="col-span-2">$34.99</div>
                        <div className="col-span-2">
                          <Badge className="bg-green-500">Completed</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="documents" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium">ID/Passport Information</h3>
                      <div className="mt-2 space-y-2">
                        {selectedCustomerData.passportNumber && (
                          <div className="flex items-center">
                            <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Passport: {selectedCustomerData.passportNumber}</span>
                          </div>
                        )}
                        {selectedCustomerData.passportExpiry && (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Expires: {selectedCustomerData.passportExpiry}</span>
                          </div>
                        )}
                      </div>
                      {selectedCustomerData.idImage && (
                        <div className="mt-4">
                          <h4 className="mb-2 font-medium">ID/Passport Image</h4>
                          <div className="overflow-hidden rounded-md border">
                            <img
                              src={selectedCustomerData.idImage || "/placeholder.svg"}
                              alt="ID/Passport"
                              className="w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Driver's License Information</h3>
                      <div className="mt-2 space-y-2">
                        {selectedCustomerData.licenseNumber && (
                          <div className="flex items-center">
                            <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>License: {selectedCustomerData.licenseNumber}</span>
                          </div>
                        )}
                        {selectedCustomerData.licenseExpiry && (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Expires: {selectedCustomerData.licenseExpiry}</span>
                          </div>
                        )}
                      </div>
                      {selectedCustomerData.licenseImage && (
                        <div className="mt-4">
                          <h4 className="mb-2 font-medium">Driver's License Image</h4>
                          <div className="overflow-hidden rounded-md border">
                            <img
                              src={selectedCustomerData.licenseImage || "/placeholder.svg"}
                              alt="Driver's License"
                              className="w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Verification Status</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1">
                        {selectedCustomerData.verificationStatus === "verified" ? (
                          <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 dark:bg-green-950/50">
                            <Shield className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium text-green-700 dark:text-green-400">Verified Customer</p>
                              <p className="text-sm text-green-600 dark:text-green-500">
                                All documents have been verified and approved.
                              </p>
                            </div>
                          </div>
                        ) : selectedCustomerData.verificationStatus === "pending" ? (
                          <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-3 dark:bg-yellow-950/50">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            <div>
                              <p className="font-medium text-yellow-700 dark:text-yellow-400">Verification Pending</p>
                              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                                Documents are awaiting verification.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 dark:bg-red-950/50">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <div>
                              <p className="font-medium text-red-700 dark:text-red-400">Verification Rejected</p>
                              <p className="text-sm text-red-600 dark:text-red-500">
                                Documents could not be verified. Please request new documents.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {selectedCustomerData.verificationStatus !== "verified" && (
                        <Button className="shrink-0">Verify Now</Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                  Close
                </Button>
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Customer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ShopLayout>
  )
}

export default ShopCustomers
