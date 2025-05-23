"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import { Plus, Edit, Check, X, FileText, DollarSign, Clock, AlertTriangle, Info, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShopRiderInsurance() {
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false)
  const [isEditTermsOpen, setIsEditTermsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("plans")

  // Demo data
  const insurancePlans = [
    {
      id: "INS-001",
      name: "Basic Protection",
      description: "Basic coverage for minor damages",
      dailyRate: 5.99,
      coverageLimit: 500,
      deductible: 100,
      isActive: true,
      termsUrl: "#",
    },
    {
      id: "INS-002",
      name: "Standard Protection",
      description: "Standard coverage for most damages",
      dailyRate: 9.99,
      coverageLimit: 1000,
      deductible: 50,
      isActive: true,
      termsUrl: "#",
    },
    {
      id: "INS-003",
      name: "Premium Protection",
      description: "Comprehensive coverage with minimal deductible",
      dailyRate: 14.99,
      coverageLimit: 2000,
      deductible: 0,
      isActive: true,
      termsUrl: "#",
    },
    {
      id: "INS-004",
      name: "Weekend Special",
      description: "Special weekend coverage package",
      dailyRate: 7.99,
      coverageLimit: 800,
      deductible: 75,
      isActive: false,
      termsUrl: "#",
    },
  ]

  const insuranceStats = {
    totalPlans: insurancePlans.length,
    activePlans: insurancePlans.filter((plan) => plan.isActive).length,
    totalSales: 128,
    revenue: 1256.87,
    claimRate: "8.2%",
    avgPurchaseRate: "64%",
  }

  const recentClaims = [
    {
      id: "CLM-1001",
      planId: "INS-002",
      riderName: "John Smith",
      scooterId: "SC-003",
      date: "2023-06-10",
      amount: 320,
      status: "approved",
    },
    {
      id: "CLM-1002",
      planId: "INS-003",
      riderName: "Sarah Johnson",
      scooterId: "SC-007",
      date: "2023-06-05",
      amount: 450,
      status: "pending",
    },
    {
      id: "CLM-1003",
      planId: "INS-001",
      riderName: "Mike Williams",
      scooterId: "SC-012",
      date: "2023-06-01",
      amount: 180,
      status: "rejected",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500">
            <Check className="mr-1 h-3 w-3" /> Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="border-red-200 text-red-500">
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Rider Insurance</h1>
          <p className="text-muted-foreground">Manage insurance plans offered to riders at the point of rental</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insuranceStats.totalPlans}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insuranceStats.activePlans}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insuranceStats.totalSales}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${insuranceStats.revenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Claim Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insuranceStats.claimRate}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Purchase Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insuranceStats.avgPurchaseRate}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="plans" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="plans">Insurance Plans</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Available Insurance Plans</h2>
              <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Insurance Plan</DialogTitle>
                    <DialogDescription>Create a new insurance plan to offer to your riders</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="plan-name" className="text-right">
                        Plan Name
                      </Label>
                      <Input id="plan-name" placeholder="e.g. Basic Protection" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="plan-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="plan-description"
                        placeholder="Brief description of coverage"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="daily-rate" className="text-right">
                        Daily Rate ($)
                      </Label>
                      <Input id="daily-rate" type="number" step="0.01" placeholder="9.99" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="coverage-limit" className="text-right">
                        Coverage Limit ($)
                      </Label>
                      <Input id="coverage-limit" type="number" placeholder="1000" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="deductible" className="text-right">
                        Deductible ($)
                      </Label>
                      <Input id="deductible" type="number" placeholder="50" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="plan-active" className="text-right">
                        Active
                      </Label>
                      <div className="col-span-3 flex items-center space-x-2">
                        <Switch id="plan-active" defaultChecked />
                        <Label htmlFor="plan-active">Make this plan available to riders</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddPlanOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddPlanOpen(false)}>Create Plan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {insurancePlans.map((plan) => (
                <Card key={plan.id} className={`${!plan.isActive ? "opacity-60" : ""}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant={plan.isActive ? "default" : "outline"}
                        className={plan.isActive ? "bg-green-500" : ""}
                      >
                        {plan.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Plan
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Edit Terms
                          </DropdownMenuItem>
                          <DropdownMenuItem className={plan.isActive ? "text-red-600" : "text-green-600"}>
                            {plan.isActive ? (
                              <>
                                <X className="mr-2 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Daily Rate:</span>
                        <span className="font-medium">${plan.dailyRate.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Coverage Limit:</span>
                        <span className="font-medium">${plan.coverageLimit.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Deductible:</span>
                        <span className="font-medium">${plan.deductible.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Terms & Conditions
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Dialog open={isEditTermsOpen} onOpenChange={setIsEditTermsOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Insurance Terms & Conditions</DialogTitle>
                  <DialogDescription>Update the terms and conditions for your insurance plan</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Textarea className="min-h-[400px]" placeholder="Enter your terms and conditions here..." />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditTermsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsEditTermsOpen(false)}>Save Terms</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="claims" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Claims</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Claims</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-2">Claim ID</div>
                <div className="col-span-2">Plan</div>
                <div className="col-span-2">Rider</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Status</div>
              </div>
              <div className="divide-y">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="grid grid-cols-12 items-center p-4">
                    <div className="col-span-2 font-medium">{claim.id}</div>
                    <div className="col-span-2">{claim.planId}</div>
                    <div className="col-span-2">{claim.riderName}</div>
                    <div className="col-span-2">{new Date(claim.date).toLocaleDateString()}</div>
                    <div className="col-span-2">${claim.amount.toFixed(2)}</div>
                    <div className="col-span-2">{getStatusBadge(claim.status)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Claim Process</CardTitle>
                  <CardDescription>How riders can file claims for damages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <AlertTriangle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Damage Reporting</h3>
                        <p className="text-sm text-muted-foreground">
                          Riders must report damages within 24 hours of the incident through the app or by contacting
                          your shop directly.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Documentation</h3>
                        <p className="text-sm text-muted-foreground">
                          Riders need to provide photos of the damage, a description of the incident, and any relevant
                          information.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Processing</h3>
                        <p className="text-sm text-muted-foreground">
                          Claims are typically processed within 3-5 business days. Approved claims will be applied to
                          the final bill.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Edit Claim Process</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Settings</CardTitle>
                <CardDescription>Configure how insurance is offered to riders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-offer">Auto-offer Insurance</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically offer insurance options during the checkout process
                      </p>
                    </div>
                    <Switch id="auto-offer" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="default-selected">Pre-select Default Option</Label>
                      <p className="text-sm text-muted-foreground">
                        Pre-select a default insurance option in the checkout flow
                      </p>
                    </div>
                    <Switch id="default-selected" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Default Insurance Plan</Label>
                  <Select defaultValue="INS-002">
                    <SelectTrigger>
                      <SelectValue placeholder="Select default plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {insurancePlans
                        .filter((plan) => plan.isActive)
                        .map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name} (${plan.dailyRate.toFixed(2)}/day)
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    This plan will be pre-selected during checkout if enabled
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Insurance Presentation</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="presentation-standard" name="presentation" defaultChecked />
                      <Label htmlFor="presentation-standard">Standard (Show all options)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="presentation-recommended" name="presentation" />
                      <Label htmlFor="presentation-recommended">Highlight Recommended</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="presentation-simplified" name="presentation" />
                      <Label htmlFor="presentation-simplified">Simplified (Yes/No)</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmation-text">Confirmation Text</Label>
                  <Textarea
                    id="confirmation-text"
                    placeholder="Text shown to riders when they select insurance"
                    defaultValue="I understand and agree to the terms and conditions of the selected insurance plan."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Card */}
        <Card className="bg-muted/50 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2 h-5 w-5 text-primary" />
              Insurance Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Offering insurance to your riders can increase your revenue while reducing disputes over damages. Here
                are some tips:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Keep your insurance options simple and easy to understand</li>
                <li>Clearly communicate what is and isn't covered</li>
                <li>Set reasonable daily rates based on the value of your scooters</li>
                <li>Consider offering a premium option with zero deductible</li>
                <li>Regularly review your claim process to ensure it's fair and efficient</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShopLayout>
  )
}
