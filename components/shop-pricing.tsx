"use client"

import { useState, useEffect } from "react"
import { ShopLayout } from "./shop-layout"
import { DollarSign, Calendar, Save, Edit2, Trash2, Plus, CheckCircle2, Bike, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Scooter } from "@/types/scooter-types"
import { PriceHistory } from "./price-history"
import { PriceComparison } from "./price-comparison"

export function ShopPricing() {
  const [activeTab, setActiveTab] = useState("standard")
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [modelFilter, setModelFilter] = useState("all")
  const [scooters, setScooters] = useState<Scooter[]>([])

  // Fetch scooters (mock data for demo)
  useEffect(() => {
    // In a real app, this would be an API call
    const mockScooters: Scooter[] = [
      {
        id: "SC-001",
        model: "Honda Click 125i",
        status: "available",
        fuelType: "petrol",
        fuelLevel: 85,
        location: "Main Store",
        lastMaintenance: "2023-05-15",
        totalRentals: 42,
        engineSize: 125,
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
        location: "Downtown",
        lastMaintenance: "2023-05-10",
        totalRentals: 38,
        engineSize: 155,
        pricing: {
          hourlyRate: 10.99,
          dailyRate: 34.99,
          customPricing: true,
          pricingNotes: "Premium model with higher rate",
        },
      },
      // More scooters would be here
    ]

    setScooters(mockScooters)
  }, [])

  // Demo data
  const standardPlans = [
    {
      id: "plan-1",
      name: "Basic Hourly",
      price: 8.99,
      unit: "hour",
      description: "Perfect for quick trips around town",
      isPopular: false,
      isActive: true,
    },
    {
      id: "plan-2",
      name: "Day Pass",
      price: 24.99,
      unit: "day",
      description: "Unlimited rides for a full day",
      isPopular: true,
      isActive: true,
    },
    {
      id: "plan-3",
      name: "Weekend Special",
      price: 39.99,
      unit: "weekend",
      description: "Unlimited rides all weekend long",
      isPopular: false,
      isActive: true,
    },
  ]

  const seasonalPlans = [
    {
      id: "season-1",
      name: "Summer Special",
      price: 19.99,
      unit: "day",
      description: "Special summer pricing for beach trips",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      isActive: true,
    },
    {
      id: "season-2",
      name: "Holiday Bundle",
      price: 29.99,
      unit: "day",
      description: "Holiday season special pricing",
      startDate: "2023-12-15",
      endDate: "2024-01-05",
      isActive: false,
    },
  ]

  const membershipPlans = [
    {
      id: "member-1",
      name: "Monthly Unlimited",
      price: 49.99,
      unit: "month",
      description: "Unlimited rides all month long",
      benefits: ["Unlimited rides", "Priority booking", "No unlock fees"],
      isActive: true,
    },
    {
      id: "member-2",
      name: "Annual Pass",
      price: 399.99,
      unit: "year",
      description: "Our best value for regular riders",
      benefits: ["Unlimited rides", "Priority booking", "No unlock fees", "Free maintenance", "Guest passes"],
      isActive: true,
    },
  ]

  // Default pricing templates by model/cc
  const pricingTemplates = [
    {
      id: "template-1",
      name: "Standard Scooter (100-125cc)",
      hourlyRate: 8.99,
      dailyRate: 29.99,
      weekendRate: 49.99,
      weeklyRate: 149.99,
      description: "Default pricing for standard scooters",
      isActive: true,
    },
    {
      id: "template-2",
      name: "Premium Scooter (150cc+)",
      hourlyRate: 10.99,
      dailyRate: 34.99,
      weekendRate: 59.99,
      weeklyRate: 179.99,
      description: "Default pricing for premium scooters",
      isActive: true,
    },
    {
      id: "template-3",
      name: "Electric Scooter",
      hourlyRate: 11.99,
      dailyRate: 36.99,
      weekendRate: 64.99,
      weeklyRate: 189.99,
      description: "Default pricing for electric scooters",
      isActive: true,
    },
  ]

  // Filter scooters based on search and model filter
  const filteredScooters = scooters.filter((scooter) => {
    const matchesSearch =
      scooter.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scooter.model.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesModel =
      modelFilter === "all" ||
      (modelFilter === "custom" && scooter.pricing?.customPricing) ||
      (modelFilter === "standard" && !scooter.pricing?.customPricing)

    return matchesSearch && matchesModel
  })

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Pricing</h1>
          <p className="text-muted-foreground">Manage your pricing plans, special offers, and membership options.</p>
        </div>

        <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="standard">Standard Plans</TabsTrigger>
              <TabsTrigger value="seasonal">Seasonal Offers</TabsTrigger>
              <TabsTrigger value="membership">Memberships</TabsTrigger>
              <TabsTrigger value="templates">Pricing Templates</TabsTrigger>
              <TabsTrigger value="individual">Individual Pricing</TabsTrigger>
            </TabsList>
            <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {activeTab === "individual" ? "Add Custom Price" : "Add New Plan"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {activeTab === "individual" ? "Add Custom Scooter Price" : "Add New Pricing Plan"}
                  </DialogTitle>
                  <DialogDescription>
                    {activeTab === "individual"
                      ? "Set custom pricing for a specific scooter"
                      : "Create a new pricing plan for your customers."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="plan-name" className="text-right">
                      Name
                    </Label>
                    <Input id="plan-name" placeholder="e.g. Basic Hourly" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="plan-price" className="text-right">
                      Price
                    </Label>
                    <div className="col-span-3 flex items-center">
                      <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                      <Input id="plan-price" type="number" placeholder="9.99" className="w-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="plan-unit" className="text-right">
                      Unit
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">Per Hour</SelectItem>
                        <SelectItem value="day">Per Day</SelectItem>
                        <SelectItem value="weekend">Per Weekend</SelectItem>
                        <SelectItem value="month">Per Month</SelectItem>
                        <SelectItem value="year">Per Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="plan-description" className="text-right">
                      Description
                    </Label>
                    <Input id="plan-description" placeholder="Brief description" className="col-span-3" />
                  </div>
                  {activeTab === "seasonal" && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start-date" className="text-right">
                          Start Date
                        </Label>
                        <Input id="start-date" type="date" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="end-date" className="text-right">
                          End Date
                        </Label>
                        <Input id="end-date" type="date" className="col-span-3" />
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddPlanOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddPlanOpen(false)}>Add Plan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="standard" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {standardPlans.map((plan) => (
                <Card key={plan.id} className="relative">
                  {plan.isPopular && (
                    <div className="absolute -top-2 -right-2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="ml-1 text-muted-foreground">/{plan.unit}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id={`active-${plan.id}`} checked={plan.isActive} />
                      <Label htmlFor={`active-${plan.id}`}>Active</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seasonal" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {seasonalPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="ml-1 text-muted-foreground">/{plan.unit}</span>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>
                        {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id={`active-${plan.id}`} checked={plan.isActive} />
                      <Label htmlFor={`active-${plan.id}`}>Active</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="membership" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {membershipPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="ml-1 text-muted-foreground">/{plan.unit}</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="mb-2 text-sm font-medium">Benefits:</h4>
                      <ul className="space-y-1">
                        {plan.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id={`active-${plan.id}`} checked={plan.isActive} />
                      <Label htmlFor={`active-${plan.id}`}>Active</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {pricingTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Hourly Rate:</span>
                        <span className="font-medium">${template.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Daily Rate:</span>
                        <span className="font-medium">${template.dailyRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Weekend Rate:</span>
                        <span className="font-medium">${template.weekendRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Weekly Rate:</span>
                        <span className="font-medium">${template.weeklyRate}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id={`active-${template.id}`} checked={template.isActive} />
                      <Label htmlFor={`active-${template.id}`}>Active</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="individual" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Individual Scooter Pricing</CardTitle>
                <CardDescription>Set custom prices for specific scooters in your fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
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
                    <Select value={modelFilter} onValueChange={setModelFilter}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by pricing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Scooters</SelectItem>
                        <SelectItem value="custom">Custom Pricing Only</SelectItem>
                        <SelectItem value="standard">Standard Pricing Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mb-4">
                  <PriceComparison scooters={scooters} />
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Bulk Update
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Scooter</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Hourly Rate</TableHead>
                        <TableHead>Daily Rate</TableHead>
                        <TableHead>Custom</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredScooters.length > 0 ? (
                        filteredScooters.map((scooter) => (
                          <TableRow key={scooter.id}>
                            <TableCell>
                              <div className="font-medium">{scooter.id}</div>
                              <div className="text-sm text-muted-foreground">
                                {scooter.model} {scooter.engineSize && `(${scooter.engineSize}cc)`}
                              </div>
                            </TableCell>
                            <TableCell>
                              {scooter.status === "available" ? (
                                <Badge className="bg-green-500">Available</Badge>
                              ) : scooter.status === "rented" ? (
                                <Badge className="bg-blue-500">
                                  <Bike className="mr-1 h-3 w-3" /> Rented
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-500">Maintenance</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                                {scooter.pricing?.hourlyRate || "--"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                                {scooter.pricing?.dailyRate || "--"}
                              </div>
                            </TableCell>
                            <TableCell>
                              {scooter.pricing?.customPricing ? (
                                <Badge variant="outline" className="border-green-500 text-green-500">
                                  <CheckCircle2 className="mr-1 h-3 w-3" /> Custom
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                  Standard
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit2 className="mr-1 h-3 w-3" />
                                  Edit Price
                                </Button>
                                <PriceHistory scooterId={scooter.id} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            No scooters found matching your search criteria
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {filteredScooters.length} scooters with{" "}
                  {filteredScooters.filter((s) => s.pricing?.customPricing).length} custom pricing
                </div>
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save All Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pricing Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Settings</CardTitle>
            <CardDescription>Configure global pricing settings and policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tax Rate</Label>
                <p className="text-sm text-muted-foreground">Applied to all bookings</p>
              </div>
              <div className="flex w-[180px] items-center">
                <Input type="number" defaultValue="8.5" className="mr-2" />
                <span>%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Deposit Amount</Label>
                <p className="text-sm text-muted-foreground">Required security deposit</p>
              </div>
              <div className="flex w-[180px] items-center">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <Input type="number" defaultValue="50" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Late Return Fee</Label>
                <p className="text-sm text-muted-foreground">Per hour after scheduled return</p>
              </div>
              <div className="flex w-[180px] items-center">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <Input type="number" defaultValue="15" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ShopLayout>
  )
}

export default ShopPricing
