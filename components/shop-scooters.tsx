"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import {
  Bike,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Battery,
  MapPin,
  Droplets,
  Grid,
  List,
  Columns,
  Calendar,
  Clock,
  Tag,
  DollarSign,
  PencilIcon,
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
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { AnimatedCard } from "@/components/ui/animated-card"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import type { Scooter } from "@/types/scooter-types"
import { AddScooterButton } from "@/components/shop/add-scooter-button"
import { ScooterPhotoDocumentation } from "./shop/scooter-photo-documentation"
import { RentalStatusBadge } from "./shop/rental-status-badge"
import { AgreementViewerButton } from "./shop/agreement-viewer-button"
import { CreateBookingButton } from "./shop/create-booking-button" // Add this import

// Define view types
type ViewType = "list" | "grid" | "cards"

export function ShopScooters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [fuelTypeFilter, setFuelTypeFilter] = useState("all")
  const [viewType, setViewType] = useState<ViewType>("list")
  const [currentPage, setCurrentPage] = useState(1)
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false)
  const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null)
  const [scooters, setScooters] = useState<Scooter[]>([
    {
      id: "SC-001",
      model: "Honda Click 125i",
      status: "available",
      fuelType: "petrol",
      fuelLevel: 85, // percentage
      fuelCapacity: 5.5, // liters
      location: "Main Store",
      lastMaintenance: "2023-05-15",
      totalRentals: 42,
      licensePlate: "ABC-123",
      engineSize: 125, // cc
      image: "/placeholder.svg?height=150&width=200",
      color: "Red",
      pricing: {
        hourlyRate: 8.99,
        dailyRate: 29.99,
        customPricing: true,
        pricingNotes: "Popular model, standard pricing",
      },
    },
    {
      id: "SC-002",
      model: "Yamaha NMAX",
      status: "rented",
      fuelType: "petrol",
      fuelLevel: 60,
      fuelCapacity: 6.6,
      location: "Downtown",
      lastMaintenance: "2023-05-10",
      totalRentals: 38,
      licensePlate: "DEF-456",
      engineSize: 155,
      image: "/placeholder.svg?height=150&width=200",
      color: "Blue",
      pricing: {
        hourlyRate: 10.99,
        dailyRate: 34.99,
        customPricing: true,
        pricingNotes: "Premium model with higher rate",
      },
      rentalId: "RNT-002",
      customerName: "Alice Smith",
    },
    {
      id: "SC-003",
      model: "Honda PCX",
      status: "maintenance",
      fuelType: "petrol",
      fuelLevel: 20,
      fuelCapacity: 8.0,
      location: "Main Store",
      lastMaintenance: "2023-04-20",
      totalRentals: 56,
      licensePlate: "GHI-789",
      engineSize: 150,
      image: "/placeholder.svg?height=150&width=200",
      color: "Black",
      pricing: {
        hourlyRate: 9.99,
        dailyRate: 32.99,
        customPricing: false,
      },
    },
    // More scooters...
  ])

  const itemsPerPage = viewType === "grid" ? 12 : viewType === "cards" ? 8 : 10

  const filteredScooters = scooters.filter((scooter) => {
    const matchesSearch =
      scooter.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scooter.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scooter.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scooter.licensePlate && scooter.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatusFilter = statusFilter === "all" || scooter.status === statusFilter
    const matchesFuelFilter = fuelTypeFilter === "all" || scooter.fuelType === fuelTypeFilter

    return matchesSearch && matchesStatusFilter && matchesFuelFilter
  })

  // Pagination
  const totalPages = Math.ceil(filteredScooters.length / itemsPerPage)
  const paginatedScooters = filteredScooters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Available
          </Badge>
        )
      case "rented":
        return (
          <Badge className="bg-blue-500">
            <Bike className="mr-1 h-3 w-3" /> Rented
          </Badge>
        )
      case "maintenance":
        return (
          <Badge className="bg-amber-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Maintenance
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500">
            <XCircle className="mr-1 h-3 w-3" /> Unknown
          </Badge>
        )
    }
  }

  const getStatusBadgeSmall = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-500 text-xs">
            <CheckCircle2 className="mr-1 h-2 w-2" /> Available
          </Badge>
        )
      case "rented":
        return (
          <Badge className="bg-blue-500 text-xs">
            <Bike className="mr-1 h-2 w-2" /> Rented
          </Badge>
        )
      case "maintenance":
        return (
          <Badge className="bg-amber-500 text-xs">
            <AlertTriangle className="mr-1 h-2 w-2" /> Maintenance
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500 text-xs">
            <XCircle className="mr-1 h-2 w-2" /> Unknown
          </Badge>
        )
    }
  }

  const getFuelLevelColor = (level: number) => {
    if (level >= 70) return "text-green-500"
    if (level >= 30) return "text-amber-500"
    return "text-red-500"
  }

  const handleEditPricing = (scooter: Scooter) => {
    setSelectedScooter(scooter)
    setIsPricingDialogOpen(true)
  }

  const handleSavePricing = () => {
    // In a real app, this would save to the database
    setIsPricingDialogOpen(false)
    setSelectedScooter(null)

    toast({
      title: "Pricing Updated",
      description: "The scooter pricing has been updated successfully.",
    })
  }

  const handleScooterAdded = (newScooter: Partial<Scooter>) => {
    // In a real app, this would save to the database and return the complete object
    // For now, we'll just add it to our local state
    const completeScooter = {
      ...newScooter,
      id: newScooter.id || `SC-${Math.floor(1000 + Math.random() * 9000)}`,
      status: newScooter.status || "available",
      totalRentals: newScooter.totalRentals || 0,
    } as Scooter

    setScooters((prev) => [completeScooter, ...prev])

    // Ensure we're on the first page to see the new scooter
    setCurrentPage(1)
  }

  const handleBookingCreated = () => {
    toast({
      title: "Booking Created",
      description: "The booking has been created successfully.",
    })
    // In a real app, this would refresh the scooter list
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Scooters</h1>
          <p className="text-muted-foreground">Manage your scooter fleet, track status, and schedule maintenance.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Scooters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scooters.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {scooters.filter((s) => s.status === "available").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rented</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {scooters.filter((s) => s.status === "rented").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {scooters.filter((s) => s.status === "maintenance").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Fuel Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Petrol:</span>
                  <span className="font-medium">{scooters.filter((s) => s.fuelType === "petrol").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Electric:</span>
                  <span className="font-medium">{scooters.filter((s) => s.fuelType === "electric").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search scooters..."
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all" onValueChange={(value) => setFuelTypeFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <Droplets className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fuel Types</SelectItem>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <AddScooterButton onScooterAdded={handleScooterAdded} />

            {/* Add the new booking button */}
            <CreateBookingButton scooters={scooters} onBookingCreated={handleBookingCreated} variant="secondary" />
          </div>
        </div>

        {/* View Type Selector */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewType === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewType("list")}
                    className="h-8 w-8"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>List View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewType === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewType("grid")}
                    className="h-8 w-8"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grid View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewType === "cards" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewType("cards")}
                    className="h-8 w-8"
                  >
                    <Columns className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Card View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {paginatedScooters.length} of {filteredScooters.length} scooters
          </div>
        </div>

        {/* Empty state with quick add */}
        {filteredScooters.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          >
            <Bike className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No scooters found</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              {searchQuery || statusFilter !== "all" || fuelTypeFilter !== "all"
                ? "No scooters match your current filters. Try adjusting your search criteria."
                : "You haven't added any scooters to your inventory yet. Add your first scooter to get started."}
            </p>
            {searchQuery || statusFilter !== "all" || fuelTypeFilter !== "all" ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
                  setFuelTypeFilter("all")
                }}
              >
                Clear Filters
              </Button>
            ) : (
              <AddScooterButton />
            )}
          </motion.div>
        )}

        {/* Scooter List View */}
        {viewType === "list" && filteredScooters.length > 0 && (
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
              <div className="col-span-3">Scooter</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Fuel Level</div>
              <div className="col-span-1">Location</div>
              <div className="col-span-2">Pricing</div>
              <div className="col-span-2">Last Maintenance</div>
              <div className="col-span-1"></div>
            </div>
            <div className="divide-y">
              {paginatedScooters.map((scooter) => (
                <motion.div
                  key={scooter.id}
                  className="grid grid-cols-12 items-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <img
                      src={scooter.image || "/placeholder.svg"}
                      alt={`${scooter.model}`}
                      className="h-12 w-16 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-medium">{scooter.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {scooter.model}
                        {scooter.engineSize && <span> ({scooter.engineSize}cc)</span>}
                      </div>
                      {scooter.licensePlate && (
                        <div className="text-xs text-muted-foreground">License: {scooter.licensePlate}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">{getStatusBadge(scooter.status)}</div>
                  <div className="col-span-1 flex items-center">
                    {scooter.fuelType === "electric" ? (
                      <>
                        <Battery className={`mr-2 h-4 w-4 ${getFuelLevelColor(scooter.batteryLevel || 0)}`} />
                        <span className={getFuelLevelColor(scooter.batteryLevel || 0)}>{scooter.batteryLevel}%</span>
                      </>
                    ) : (
                      <>
                        <Droplets className={`mr-2 h-4 w-4 ${getFuelLevelColor(scooter.fuelLevel || 0)}`} />
                        <span className={getFuelLevelColor(scooter.fuelLevel || 0)}>{scooter.fuelLevel}%</span>
                      </>
                    )}
                  </div>
                  <div className="col-span-1 flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    {scooter.location}
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{scooter.pricing?.dailyRate || "--"}/day</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1"
                        onClick={() => handleEditPricing(scooter)}
                      >
                        <PencilIcon className="h-3 w-3" />
                      </Button>
                    </div>
                    {scooter.pricing?.customPricing && (
                      <div className="text-xs text-muted-foreground">Custom pricing</div>
                    )}
                  </div>
                  <div className="col-span-2">{new Date(scooter.lastMaintenance).toLocaleDateString()}</div>
                  <div className="col-span-1 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPricing(scooter)}>Edit Pricing</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                        <DropdownMenuItem>Update Location</DropdownMenuItem>
                        <DropdownMenuItem>Refuel/Recharge</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Scooter Grid View */}
        {viewType === "grid" && filteredScooters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedScooters.map((scooter) => (
              <Card key={scooter.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={scooter.image || "/placeholder.svg"}
                    alt={`${scooter.model}`}
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">{getStatusBadgeSmall(scooter.status)}</div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{scooter.id}</h3>
                      <p className="text-sm text-muted-foreground">{scooter.model}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPricing(scooter)}>Edit Pricing</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                        <DropdownMenuItem>Update Location</DropdownMenuItem>
                        <DropdownMenuItem>Refuel/Recharge</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                      <Tag className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{scooter.licensePlate}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{scooter.location}</span>
                    </div>
                    <div className="flex items-center">
                      {scooter.fuelType === "electric" ? (
                        <>
                          <Battery className={`mr-1 h-3 w-3 ${getFuelLevelColor(scooter.batteryLevel || 0)}`} />
                          <span>{scooter.batteryLevel}%</span>
                        </>
                      ) : (
                        <>
                          <Droplets className={`mr-1 h-3 w-3 ${getFuelLevelColor(scooter.fuelLevel || 0)}`} />
                          <span>{scooter.fuelLevel}%</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{new Date(scooter.lastMaintenance).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{scooter.pricing?.dailyRate || "--"}/day</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7" onClick={() => handleEditPricing(scooter)}>
                      <PencilIcon className="mr-1 h-3 w-3" />
                      Edit Price
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Scooter Cards View */}
        {viewType === "cards" && filteredScooters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedScooters.map((scooter, index) => (
              <AnimatedCard
                key={scooter.id}
                title={scooter.model}
                delay={index * 0.1}
                className="hover:border-yellow-400 dark:hover:border-yellow-600 flex overflow-hidden"
              >
                <div className="w-1/3">
                  <img
                    src={scooter.image || "/placeholder.svg"}
                    alt={`${scooter.model}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{scooter.id}</h3>
                        {getStatusBadgeSmall(scooter.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {scooter.model}
                        {scooter.engineSize && <span> ({scooter.engineSize}cc)</span>}
                        {scooter.color && <span> • {scooter.color}</span>}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPricing(scooter)}>Edit Pricing</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                        <DropdownMenuItem>Update Location</DropdownMenuItem>
                        <DropdownMenuItem>Refuel/Recharge</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm mt-3">
                    <div className="flex items-center">
                      <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{scooter.licensePlate}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{scooter.location}</span>
                    </div>
                    <div className="flex items-center">
                      {scooter.fuelType === "electric" ? (
                        <>
                          <Battery className={`mr-2 h-4 w-4 ${getFuelLevelColor(scooter.batteryLevel || 0)}`} />
                          <span className={getFuelLevelColor(scooter.batteryLevel || 0)}>{scooter.batteryLevel}%</span>
                        </>
                      ) : (
                        <>
                          <Droplets className={`mr-2 h-4 w-4 ${getFuelLevelColor(scooter.fuelLevel || 0)}`} />
                          <span className={getFuelLevelColor(scooter.fuelLevel || 0)}>
                            {scooter.fuelLevel}%
                            {scooter.fuelCapacity && (
                              <span className="text-xs text-muted-foreground ml-1">
                                (~{((scooter.fuelLevel / 100) * scooter.fuelCapacity).toFixed(1)}L)
                              </span>
                            )}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{new Date(scooter.lastMaintenance).toLocaleDateString()}</span>
                    </div>
                    <div className="col-span-2 mt-2 flex items-center justify-between border-t pt-2">
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{scooter.pricing?.dailyRate || "--"}/day</span>
                        {scooter.pricing?.hourlyRate && (
                          <span className="text-xs text-muted-foreground ml-2">(${scooter.pricing.hourlyRate}/hr)</span>
                        )}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleEditPricing(scooter)}>
                        <PencilIcon className="mr-1 h-3 w-3" />
                        Edit Price
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {/* Pricing Dialog */}
        <Dialog open={isPricingDialogOpen} onOpenChange={setIsPricingDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Scooter Pricing</DialogTitle>
              <DialogDescription>
                Update pricing for {selectedScooter?.model} ({selectedScooter?.id})
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hourly-rate" className="text-right">
                  Hourly Rate
                </Label>
                <div className="col-span-3 flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="hourly-rate"
                    type="number"
                    defaultValue={selectedScooter?.pricing?.hourlyRate}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="daily-rate" className="text-right">
                  Daily Rate
                </Label>
                <div className="col-span-3 flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="daily-rate"
                    type="number"
                    defaultValue={selectedScooter?.pricing?.dailyRate}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weekend-rate" className="text-right">
                  Weekend Rate
                </Label>
                <div className="col-span-3 flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="weekend-rate"
                    type="number"
                    defaultValue={selectedScooter?.pricing?.weekendRate}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weekly-rate" className="text-right">
                  Weekly Rate
                </Label>
                <div className="col-span-3 flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="weekly-rate"
                    type="number"
                    defaultValue={selectedScooter?.pricing?.weeklyRate}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pricing-notes" className="text-right">
                  Pricing Notes
                </Label>
                <Input
                  id="pricing-notes"
                  defaultValue={selectedScooter?.pricing?.pricingNotes}
                  className="col-span-3"
                  placeholder="E.g., Special discount, premium model, etc."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">
                  <Label htmlFor="custom-pricing">Custom Pricing</Label>
                </div>
                <div className="col-span-3">
                  <input
                    type="checkbox"
                    id="custom-pricing"
                    defaultChecked={selectedScooter?.pricing?.customPricing}
                    className="mr-2"
                  />
                  <Label htmlFor="custom-pricing" className="text-sm text-muted-foreground">
                    Override standard pricing plans for this scooter
                  </Label>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {/* Status indicator for any active rental */}
              {selectedScooter?.status && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Current Status:</span>
                  <RentalStatusBadge status={selectedScooter.status} />
                </div>
              )}

              {/* Agreement viewer button - only show if there's an active rental */}
              {selectedScooter?.rentalId && (
                <AgreementViewerButton
                  rentalId={selectedScooter.rentalId}
                  customerName={selectedScooter.customerName || "Customer"}
                  scooterId={selectedScooter.id}
                  className="w-full justify-center"
                />
              )}

              {/* Photo documentation component */}
              <ScooterPhotoDocumentation
                scooterId={selectedScooter?.id || ""}
                onPhotosUpdated={(photos) => console.log("Photos updated:", photos)}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPricingDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePricing}>Save Pricing</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </ShopLayout>
  )
}

export default ShopScooters
