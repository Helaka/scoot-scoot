"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import { Shield, AlertTriangle, CheckCircle2, XCircle, BarChart3, Percent, DollarSign, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ShopInsuranceDashboard() {
  const [timeRange, setTimeRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data - in a real app, this would come from your backend
  const insuranceStats = {
    totalScooters: 48,
    scootersWithInsurance: 32,
    coverageRate: 66.7,
    premiumCollected: 2450.75,
    claimsPaid: 850.25,
    profitMargin: 65.3,
    insuranceTakeUpRate: 72.4,
    averagePremium: 9.99,
  }

  const scooterTypes = [
    { type: "Economy", count: 18, insuredCount: 10, coverageRate: 55.6 },
    { type: "Standard", count: 22, insuredCount: 16, coverageRate: 72.7 },
    { type: "Premium", count: 8, insuredCount: 6, coverageRate: 75.0 },
  ]

  const insurancePlans = [
    { name: "Basic Protection", takeUpRate: 35.2, revenue: 850.5 },
    { name: "Standard Protection", takeUpRate: 42.8, revenue: 1250.25 },
    { name: "Premium Protection", takeUpRate: 22.0, revenue: 350.0 },
  ]

  const recentRentals = [
    {
      id: "RNT-1001",
      scooterId: "SC-005",
      scooterModel: "Xiaomi Pro 2",
      riderName: "John Smith",
      date: "2023-06-15",
      insurancePlan: "Standard Protection",
      insuranceCost: 19.98,
    },
    {
      id: "RNT-1002",
      scooterId: "SC-012",
      scooterModel: "Segway Ninebot Max",
      riderName: "Sarah Johnson",
      date: "2023-06-14",
      insurancePlan: "Premium Protection",
      insuranceCost: 29.98,
    },
    {
      id: "RNT-1003",
      scooterId: "SC-008",
      scooterModel: "Xiaomi Essential",
      riderName: "Mike Williams",
      date: "2023-06-14",
      insurancePlan: "Basic Protection",
      insuranceCost: 11.98,
    },
    {
      id: "RNT-1004",
      scooterId: "SC-015",
      scooterModel: "Segway Ninebot ES2",
      riderName: "Emily Davis",
      date: "2023-06-13",
      insurancePlan: null,
      insuranceCost: 0,
    },
  ]

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Insurance Dashboard</h1>
          <p className="text-muted-foreground">Monitor insurance coverage and performance across your fleet</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="alltime">All time</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-2 sm:mt-0">
            <Button variant="outline" className="mr-2">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Manage Insurance Plans
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="coverage">Coverage Analysis</TabsTrigger>
            <TabsTrigger value="rentals">Insured Rentals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Coverage Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <div className="text-2xl font-bold">{insuranceStats.coverageRate}%</div>
                    <div className="ml-2 text-xs text-muted-foreground">
                      {insuranceStats.scootersWithInsurance}/{insuranceStats.totalScooters} scooters
                    </div>
                  </div>
                  <Progress value={insuranceStats.coverageRate} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Take-Up Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insuranceStats.insuranceTakeUpRate}%</div>
                  <p className="text-xs text-muted-foreground">of rentals include insurance</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Premium Collected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${insuranceStats.premiumCollected.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">this period</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insuranceStats.profitMargin}%</div>
                  <p className="text-xs text-muted-foreground">
                    ${(insuranceStats.premiumCollected - insuranceStats.claimsPaid).toFixed(2)} net
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Insurance Plans Performance */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Insurance Plan Performance</CardTitle>
                <CardDescription>Take-up rates and revenue by plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insurancePlans.map((plan) => (
                    <div key={plan.name} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-primary" />
                          <span className="font-medium">{plan.name}</span>
                        </div>
                        <div className="text-sm font-medium">${plan.revenue.toFixed(2)}</div>
                      </div>
                      <div className="mt-2 flex items-center">
                        <Progress value={plan.takeUpRate} className="flex-1" />
                        <span className="ml-2 text-sm">{plan.takeUpRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coverage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Coverage by Scooter Type</CardTitle>
                <CardDescription>Insurance coverage across different scooter models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scooterTypes.map((type) => (
                    <div key={type.type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{type.type} Scooters</div>
                        <div className="text-sm">
                          {type.insuredCount}/{type.count} insured
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Progress value={type.coverageRate} className="flex-1" />
                        <span className="ml-2 text-sm">{type.coverageRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Scooters Without Insurance</CardTitle>
                  <CardDescription>Scooters that need insurance coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-3">ID</div>
                      <div className="col-span-5">Model</div>
                      <div className="col-span-4">Status</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-12 items-center p-3">
                        <div className="col-span-3 font-mono text-sm">SC-003</div>
                        <div className="col-span-5">Xiaomi Pro 2</div>
                        <div className="col-span-4">
                          <Badge variant="outline" className="border-red-200 text-red-500">
                            <AlertTriangle className="mr-1 h-3 w-3" /> Not Insured
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 items-center p-3">
                        <div className="col-span-3 font-mono text-sm">SC-007</div>
                        <div className="col-span-5">Segway Ninebot Max</div>
                        <div className="col-span-4">
                          <Badge variant="outline" className="border-red-200 text-red-500">
                            <AlertTriangle className="mr-1 h-3 w-3" /> Not Insured
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 items-center p-3">
                        <div className="col-span-3 font-mono text-sm">SC-015</div>
                        <div className="col-span-5">Xiaomi Essential</div>
                        <div className="col-span-4">
                          <Badge variant="outline" className="border-red-200 text-red-500">
                            <AlertTriangle className="mr-1 h-3 w-3" /> Not Insured
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Insurance Recommendations</CardTitle>
                  <CardDescription>Suggested actions to improve coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                      <div className="flex items-start">
                        <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <div>
                          <h3 className="font-medium text-yellow-800 dark:text-yellow-300">
                            Economy Scooters Underinsured
                          </h3>
                          <p className="text-sm text-yellow-700 dark:text-yellow-400">
                            Only 55.6% of your economy scooters have insurance coverage. Consider offering a special
                            economy insurance plan.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                      <div className="flex items-start">
                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                          <h3 className="font-medium text-green-800 dark:text-green-300">
                            Premium Scooters Well Covered
                          </h3>
                          <p className="text-sm text-green-700 dark:text-green-400">
                            75% of your premium scooters have insurance coverage, which is good. Maintain this level of
                            protection.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                      <div className="flex items-start">
                        <BarChart3 className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <h3 className="font-medium text-blue-800 dark:text-blue-300">
                            Standard Protection Most Popular
                          </h3>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            Your Standard Protection plan has the highest take-up rate at 42.8%. Consider promoting this
                            plan more prominently.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rentals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Rentals with Insurance</CardTitle>
                <CardDescription>Details of recent rentals and their insurance coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">Rental ID</div>
                    <div className="col-span-2">Scooter</div>
                    <div className="col-span-2">Rider</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Insurance Plan</div>
                    <div className="col-span-2">Cost</div>
                  </div>
                  <div className="divide-y">
                    {recentRentals.map((rental) => (
                      <div key={rental.id} className="grid grid-cols-12 items-center p-3">
                        <div className="col-span-2 font-mono text-sm">{rental.id}</div>
                        <div className="col-span-2">
                          <div className="font-medium">{rental.scooterId}</div>
                          <div className="text-xs text-muted-foreground">{rental.scooterModel}</div>
                        </div>
                        <div className="col-span-2">{rental.riderName}</div>
                        <div className="col-span-2">{new Date(rental.date).toLocaleDateString()}</div>
                        <div className="col-span-2">
                          {rental.insurancePlan ? (
                            <Badge className="bg-green-500">
                              <Shield className="mr-1 h-3 w-3" /> {rental.insurancePlan}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-red-200 text-red-500">
                              <XCircle className="mr-1 h-3 w-3" /> No Insurance
                            </Badge>
                          )}
                        </div>
                        <div className="col-span-2">
                          {rental.insuranceCost > 0 ? (
                            <span className="font-medium">${rental.insuranceCost.toFixed(2)}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Percent className="mr-2 h-5 w-5 text-primary" />
                    <CardTitle>Insurance Take-Up Rate</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{insuranceStats.insuranceTakeUpRate}%</div>
                  <p className="text-sm text-muted-foreground">of rentals include insurance coverage</p>
                  <div className="mt-4">
                    <Progress value={insuranceStats.insuranceTakeUpRate} className="h-2" />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>Target: 80%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-primary" />
                    <CardTitle>Average Insurance Revenue</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${insuranceStats.averagePremium.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">per rental with insurance</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Basic Protection</span>
                      <span className="font-medium">${(5.99).toFixed(2)}/day</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Standard Protection</span>
                      <span className="font-medium">${(9.99).toFixed(2)}/day</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Premium Protection</span>
                      <span className="font-medium">${(14.99).toFixed(2)}/day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ShopLayout>
  )
}
