"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  Bike,
  Search,
  MoreHorizontal,
  Plus,
  Download,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  MapPin,
  Battery,
  Wrench,
  Clock,
  BarChart3,
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
import { Progress } from "@/components/ui/progress"
import { AdminLayout } from "./admin-layout"

// Mock data for scooters
const mockScooters = [
  {
    id: "SC-1001",
    model: "ScootX Pro",
    status: "active",
    battery: 85,
    location: "Downtown",
    lastMaintenance: "2023-09-15",
    totalRides: 142,
    shopId: "SH-001",
    shopName: "City Scooters",
  },
  {
    id: "SC-1002",
    model: "ScootX Lite",
    status: "active",
    battery: 72,
    location: "Westside",
    lastMaintenance: "2023-08-22",
    totalRides: 98,
    shopId: "SH-001",
    shopName: "City Scooters",
  },
  {
    id: "SC-1003",
    model: "ScootX Pro",
    status: "maintenance",
    battery: 100,
    location: "Service Center",
    lastMaintenance: "2023-10-25",
    totalRides: 215,
    shopId: "SH-002",
    shopName: "Coastal Rides",
  },
  {
    id: "SC-1004",
    model: "ScootX Max",
    status: "active",
    battery: 45,
    location: "Northside",
    lastMaintenance: "2023-07-10",
    totalRides: 187,
    shopId: "SH-002",
    shopName: "Coastal Rides",
  },
  {
    id: "SC-1005",
    model: "ScootX Lite",
    status: "inactive",
    battery: 0,
    location: "Storage",
    lastMaintenance: "2023-05-18",
    totalRides: 76,
    shopId: "SH-003",
    shopName: "Mountain Scooters",
  },
  {
    id: "SC-1006",
    model: "ScootX Pro",
    status: "active",
    battery: 92,
    location: "Eastside",
    lastMaintenance: "2023-10-05",
    totalRides: 112,
    shopId: "SH-003",
    shopName: "Mountain Scooters",
  },
  {
    id: "SC-1007",
    model: "ScootX Max",
    status: "rented",
    battery: 68,
    location: "Downtown",
    lastMaintenance: "2023-09-28",
    totalRides: 134,
    shopId: "SH-001",
    shopName: "City Scooters",
  },
  {
    id: "SC-1008",
    model: "ScootX Pro",
    status: "maintenance",
    battery: 15,
    location: "Service Center",
    lastMaintenance: "2023-10-27",
    totalRides: 201,
    shopId: "SH-002",
    shopName: "Coastal Rides",
  },
]

// Mock data for maintenance records
const mockMaintenanceRecords = [
  {
    id: 1,
    scooterId: "SC-1003",
    date: "2023-10-25",
    type: "Routine",
    description: "Battery replacement and firmware update",
    technician: "John Doe",
    status: "completed",
  },
  {
    id: 2,
    scooterId: "SC-1008",
    date: "2023-10-27",
    type: "Repair",
    description: "Brake system repair and wheel alignment",
    technician: "Sarah Smith",
    status: "in-progress",
  },
  {
    id: 3,
    scooterId: "SC-1005",
    date: "2023-05-18",
    type: "Inspection",
    description: "Full inspection before storage",
    technician: "Mike Johnson",
    status: "completed",
  },
  {
    id: 4,
    scooterId: "SC-1001",
    date: "2023-09-15",
    type: "Routine",
    description: "Tire replacement and general maintenance",
    technician: "John Doe",
    status: "completed",
  },
  {
    id: 5,
    scooterId: "SC-1004",
    date: "2023-07-10",
    type: "Repair",
    description: "Electric motor repair and battery check",
    technician: "Sarah Smith",
    status: "completed",
  },
]

export default function AdminFleetManagement() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const isDev = searchParams?.get("dev") === "true"

  const [searchTerm, setSearchTerm] = useState("")
  const [modelFilter, setModelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [shopFilter, setShopFilter] = useState("all")
  const [filteredScooters, setFilteredScooters] = useState(mockScooters)
  const [sortColumn, setSortColumn] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")

  // Apply filters and sorting
  useEffect(() => {
    let result = [...mockScooters]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (scooter) =>
          scooter.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scooter.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scooter.shopName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply model filter
    if (modelFilter !== "all") {
      result = result.filter((scooter) => scooter.model === modelFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((scooter) => scooter.status === statusFilter)
    }

    // Apply shop filter
    if (shopFilter !== "all") {
      result = result.filter((scooter) => scooter.shopId === shopFilter)
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

    setFilteredScooters(result)
  }, [searchTerm, modelFilter, statusFilter, shopFilter, sortColumn, sortDirection])

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
      case "inactive":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Inactive
          </Badge>
        )
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>
      case "rented":
        return <Badge className="bg-blue-500">Rented</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getBatteryColor = (level: number) => {
    if (level >= 70) return "bg-green-500"
    if (level >= 30) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {isDemo && (
          <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            <h2 className="text-lg font-semibold">Demo Mode Active</h2>
            <p>
              You're viewing sample fleet management data. In a real environment, you would see actual scooter
              information.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Fleet Management</h1>
          <p className="text-muted-foreground">Manage scooters, maintenance, and fleet operations</p>
        </div>

        <Tabs defaultValue="all-scooters">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all-scooters" className="flex items-center gap-2">
                <Bike className="h-4 w-4" />
                <span>All Scooters</span>
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                <span>Maintenance</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="h-8 bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Add Scooter
              </Button>
            </div>
          </div>

          <TabsContent value="all-scooters" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search scooters..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={modelFilter} onValueChange={setModelFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Models</SelectItem>
                        <SelectItem value="ScootX Pro">ScootX Pro</SelectItem>
                        <SelectItem value="ScootX Lite">ScootX Lite</SelectItem>
                        <SelectItem value="ScootX Max">ScootX Max</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="rented">Rented</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={shopFilter} onValueChange={setShopFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by shop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Shops</SelectItem>
                        <SelectItem value="SH-001">City Scooters</SelectItem>
                        <SelectItem value="SH-002">Coastal Rides</SelectItem>
                        <SelectItem value="SH-003">Mountain Scooters</SelectItem>
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
                        <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                          <div className="flex items-center gap-1">ID {getSortIcon("id")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("model")}>
                          <div className="flex items-center gap-1">Model {getSortIcon("model")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                          <div className="flex items-center gap-1">Status {getSortIcon("status")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("battery")}>
                          <div className="flex items-center gap-1">Battery {getSortIcon("battery")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                          <div className="flex items-center gap-1">Location {getSortIcon("location")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("shopName")}>
                          <div className="flex items-center gap-1">Shop {getSortIcon("shopName")}</div>
                        </TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredScooters.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No scooters found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredScooters.map((scooter) => (
                          <TableRow key={scooter.id}>
                            <TableCell className="font-medium">{scooter.id}</TableCell>
                            <TableCell>{scooter.model}</TableCell>
                            <TableCell>{getStatusBadge(scooter.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Battery
                                  className={`h-4 w-4 ${scooter.battery > 20 ? "text-green-500" : "text-red-500"}`}
                                />
                                <div className="w-24">
                                  <Progress
                                    value={scooter.battery}
                                    className={`h-2 ${getBatteryColor(scooter.battery)}`}
                                  />
                                </div>
                                <span className="text-xs">{scooter.battery}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                {scooter.location}
                              </div>
                            </TableCell>
                            <TableCell>{scooter.shopName}</TableCell>
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
                                    Edit Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MapPin className="mr-2 h-4 w-4" />
                                    View Location
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Clock className="mr-2 h-4 w-4" />
                                    Rental History
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {scooter.status !== "maintenance" ? (
                                    <DropdownMenuItem>
                                      <Wrench className="mr-2 h-4 w-4" />
                                      Schedule Maintenance
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-green-600">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Complete Maintenance
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Remove Scooter
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
                  Showing <strong>{filteredScooters.length}</strong> of <strong>{mockScooters.length}</strong> scooters
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

          <TabsContent value="maintenance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Records</CardTitle>
                <CardDescription>Track scooter maintenance and repairs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Scooter ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Technician</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockMaintenanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.scooterId}</TableCell>
                          <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                          <TableCell>{record.type}</TableCell>
                          <TableCell className="max-w-xs truncate">{record.description}</TableCell>
                          <TableCell>{record.technician}</TableCell>
                          <TableCell>
                            {record.status === "completed" ? (
                              <Badge className="bg-green-500">Completed</Badge>
                            ) : (
                              <Badge className="bg-yellow-500">In Progress</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Schedule New Maintenance
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Status Overview</CardTitle>
                  <CardDescription>Current status of all scooters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Active</span>
                        <span className="text-sm text-muted-foreground">
                          {mockScooters.filter((s) => s.status === "active").length} scooters
                        </span>
                      </div>
                      <Progress
                        value={(mockScooters.filter((s) => s.status === "active").length / mockScooters.length) * 100}
                        className="h-2 bg-green-200"
                      />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Rented</span>
                        <span className="text-sm text-muted-foreground">
                          {mockScooters.filter((s) => s.status === "rented").length} scooters
                        </span>
                      </div>
                      <Progress
                        value={(mockScooters.filter((s) => s.status === "rented").length / mockScooters.length) * 100}
                        className="h-2 bg-blue-200"
                      />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Maintenance</span>
                        <span className="text-sm text-muted-foreground">
                          {mockScooters.filter((s) => s.status === "maintenance").length} scooters
                        </span>
                      </div>
                      <Progress
                        value={
                          (mockScooters.filter((s) => s.status === "maintenance").length / mockScooters.length) * 100
                        }
                        className="h-2 bg-yellow-200"
                      />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Inactive</span>
                        <span className="text-sm text-muted-foreground">
                          {mockScooters.filter((s) => s.status === "inactive").length} scooters
                        </span>
                      </div>
                      <Progress
                        value={(mockScooters.filter((s) => s.status === "inactive").length / mockScooters.length) * 100}
                        className="h-2 bg-gray-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Battery Status</CardTitle>
                  <CardDescription>Average battery levels by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from(new Set(mockScooters.map((s) => s.location))).map((location) => {
                      const scootersInLocation = mockScooters.filter((s) => s.location === location)
                      const avgBattery =
                        scootersInLocation.reduce((sum, s) => sum + s.battery, 0) / scootersInLocation.length

                      return (
                        <div key={location}>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium">{location}</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round(avgBattery)}% avg ({scootersInLocation.length} scooters)
                            </span>
                          </div>
                          <Progress value={avgBattery} className={`h-2 ${getBatteryColor(avgBattery)}`} />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
