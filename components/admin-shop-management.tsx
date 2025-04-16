"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  Store,
  Search,
  MoreHorizontal,
  Plus,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  MapPin,
  Bike,
  Users,
  CreditCard,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminLayout } from "./admin-layout"

// Mock data for shops
const mockShops = [
  {
    id: "SH-001",
    name: "City Scooters",
    owner: "John Smith",
    location: "Downtown",
    address: "123 Main St, Downtown",
    status: "active",
    scooters: 24,
    customers: 156,
    revenue: 12450,
    rating: 4.7,
    joined: "2023-01-15",
    email: "info@cityscooters.com",
    phone: "+1 (555) 123-4567",
    website: "cityscooters.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SH-002",
    name: "Coastal Rides",
    owner: "Maria Rodriguez",
    location: "Beachfront",
    address: "456 Ocean Ave, Beachfront",
    status: "active",
    scooters: 18,
    customers: 98,
    revenue: 8750,
    rating: 4.5,
    joined: "2023-02-22",
    email: "contact@coastalrides.com",
    phone: "+1 (555) 234-5678",
    website: "coastalrides.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SH-003",
    name: "Mountain Scooters",
    owner: "David Chen",
    location: "Uptown",
    address: "789 Hill St, Uptown",
    status: "active",
    scooters: 12,
    customers: 67,
    revenue: 5200,
    rating: 4.2,
    joined: "2023-03-10",
    email: "info@mountainscooters.com",
    phone: "+1 (555) 345-6789",
    website: "mountainscooters.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SH-004",
    name: "Urban Mobility",
    owner: "Sarah Johnson",
    location: "Midtown",
    address: "321 Center St, Midtown",
    status: "pending",
    scooters: 8,
    customers: 0,
    revenue: 0,
    rating: 0,
    joined: "2023-10-05",
    email: "hello@urbanmobility.com",
    phone: "+1 (555) 456-7890",
    website: "urbanmobility.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SH-005",
    name: "Eco Scooters",
    owner: "Michael Brown",
    location: "Westside",
    address: "654 Green St, Westside",
    status: "suspended",
    scooters: 15,
    customers: 42,
    revenue: 3100,
    rating: 3.8,
    joined: "2023-04-18",
    email: "support@ecoscooters.com",
    phone: "+1 (555) 567-8901",
    website: "ecoscooters.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SH-006",
    name: "Speedy Rentals",
    owner: "Jennifer Lee",
    location: "Financial District",
    address: "987 Business Ave, Financial District",
    status: "active",
    scooters: 20,
    customers: 112,
    revenue: 9800,
    rating: 4.4,
    joined: "2023-02-05",
    email: "info@speedyrentals.com",
    phone: "+1 (555) 678-9012",
    website: "speedyrentals.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for shop applications
const mockApplications = [
  {
    id: "APP-001",
    shopName: "Urban Mobility",
    ownerName: "Sarah Johnson",
    location: "Midtown",
    date: "2023-10-05",
    status: "pending",
    scooters: 8,
    documents: ["Business License", "Insurance", "ID Verification"],
    notes: "Promising location with high foot traffic",
  },
  {
    id: "APP-002",
    shopName: "Riverside Scooters",
    ownerName: "Robert Wilson",
    location: "Riverside",
    date: "2023-10-12",
    status: "pending",
    scooters: 10,
    documents: ["Business License", "Insurance"],
    notes: "Missing proper insurance documentation",
  },
  {
    id: "APP-003",
    shopName: "College Rides",
    ownerName: "Emily Davis",
    location: "University District",
    date: "2023-10-18",
    status: "pending",
    scooters: 15,
    documents: ["Business License", "ID Verification"],
    notes: "Targeting student population, seasonal business model",
  },
]

export default function AdminShopManagement() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const isDev = searchParams?.get("dev") === "true"

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [filteredShops, setFilteredShops] = useState(mockShops)
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  // Apply filters and sorting
  useEffect(() => {
    let result = [...mockShops]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (shop) =>
          shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((shop) => shop.status === statusFilter)
    }

    // Apply location filter
    if (locationFilter !== "all") {
      result = result.filter((shop) => shop.location === locationFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      // Fallback for non-string values (like numbers)
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      // Fallback for mixed types
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

    setFilteredShops(result)
  }, [searchTerm, statusFilter, locationFilter, sortColumn, sortDirection])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {isDemo && (
          <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            <h2 className="text-lg font-semibold">Demo Mode Active</h2>
            <p>
              You're viewing sample shop management data. In a real environment, you would see actual shop information.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Shop Management</h1>
          <p className="text-muted-foreground">Manage rental shops, applications, and shop operations</p>
        </div>

        <Tabs defaultValue="all-shops">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all-shops" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                <span>All Shops</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Applications</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="h-8 bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Add Shop
              </Button>
            </div>
          </div>

          <TabsContent value="all-shops" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search shops..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {Array.from(new Set(mockShops.map((shop) => shop.location))).map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                          <div className="flex items-center gap-1">Shop Name {getSortIcon("name")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("owner")}>
                          <div className="flex items-center gap-1">Owner {getSortIcon("owner")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                          <div className="flex items-center gap-1">Location {getSortIcon("location")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                          <div className="flex items-center gap-1">Status {getSortIcon("status")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("scooters")}>
                          <div className="flex items-center gap-1">Scooters {getSortIcon("scooters")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("revenue")}>
                          <div className="flex items-center gap-1">Revenue {getSortIcon("revenue")}</div>
                        </TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShops.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No shops found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredShops.map((shop) => (
                          <TableRow key={shop.id}>
                            <TableCell>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={shop.avatar} alt={shop.name} />
                                <AvatarFallback>{shop.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{shop.name}</div>
                              <div className="text-xs text-muted-foreground">{shop.id}</div>
                            </TableCell>
                            <TableCell>{shop.owner}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                {shop.location}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(shop.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Bike className="h-4 w-4 text-muted-foreground" />
                                {shop.scooters}
                              </div>
                            </TableCell>
                            <TableCell>${shop.revenue.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Shop
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Bike className="mr-2 h-4 w-4" />
                                    View Scooters
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Users className="mr-2 h-4 w-4" />
                                    View Customers
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    View Transactions
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {shop.status === "active" ? (
                                    <DropdownMenuItem className="text-amber-600">
                                      <AlertCircle className="mr-2 h-4 w-4" />
                                      Suspend Shop
                                    </DropdownMenuItem>
                                  ) : shop.status === "suspended" ? (
                                    <DropdownMenuItem className="text-green-600">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Reactivate Shop
                                    </DropdownMenuItem>
                                  ) : shop.status === "pending" ? (
                                    <DropdownMenuItem className="text-green-600">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Approve Shop
                                    </DropdownMenuItem>
                                  ) : null}
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Shop
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredShops.length}</strong> of <strong>{mockShops.length}</strong> shops
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Shop Applications</CardTitle>
                <CardDescription>Review and approve new shop applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Application ID</TableHead>
                        <TableHead>Shop Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Scooters</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockApplications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.id}</TableCell>
                          <TableCell>{app.shopName}</TableCell>
                          <TableCell>{app.ownerName}</TableCell>
                          <TableCell>{app.location}</TableCell>
                          <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                          <TableCell>{app.scooters}</TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-500">Pending</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                  Reject
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" />
                                  Request More Info
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Applications
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
