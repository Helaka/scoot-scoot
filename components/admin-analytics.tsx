"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  BarChart3,
  TrendingUp,
  Users,
  Bike,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminLayout } from "./admin-layout"

export default function AdminAnalytics() {
  const searchParams = useSearchParams()
  // Use optional chaining to prevent errors
  const period = searchParams?.get("period") || "week"
  const isDemo = searchParams?.get("demo") === "true"
  const isDev = searchParams?.get("dev") === "true"

  const [timeRange, setTimeRange] = useState("30d")

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {isDemo && (
          <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            <h2 className="text-lg font-semibold">Demo Mode Active</h2>
            <p>You're viewing sample analytics data. In a real environment, you would see actual platform metrics.</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Platform performance and business metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$48,735</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>
                  +12.5% from last{" "}
                  {timeRange === "7d"
                    ? "week"
                    : timeRange === "30d"
                      ? "month"
                      : timeRange === "90d"
                        ? "quarter"
                        : "year"}
                </span>
              </div>
              <div className="mt-4">
                <Progress value={75} className="h-2" />
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <div>$0</div>
                <div>Target: $65,000</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>
                  +18.2% from last{" "}
                  {timeRange === "7d"
                    ? "week"
                    : timeRange === "30d"
                      ? "month"
                      : timeRange === "90d"
                        ? "quarter"
                        : "year"}
                </span>
              </div>
              <div className="mt-4">
                <Progress value={62} className="h-2" />
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <div>0</div>
                <div>Target: 2,000</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Scooters</CardTitle>
              <Bike className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>
                  +5.3% from last{" "}
                  {timeRange === "7d"
                    ? "week"
                    : timeRange === "30d"
                      ? "month"
                      : timeRange === "90d"
                        ? "quarter"
                        : "year"}
                </span>
              </div>
              <div className="mt-4">
                <Progress value={85} className="h-2" />
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <div>0</div>
                <div>Target: 400</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rental Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1h 24m</div>
              <div className="flex items-center text-xs text-red-500">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                <span>
                  -3.1% from last{" "}
                  {timeRange === "7d"
                    ? "week"
                    : timeRange === "30d"
                      ? "month"
                      : timeRange === "90d"
                        ? "quarter"
                        : "year"}
                </span>
              </div>
              <div className="mt-4">
                <Progress value={70} className="h-2" />
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <div>0h</div>
                <div>Target: 2h</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="rentals" className="flex items-center gap-2">
              <Bike className="h-4 w-4" />
              <span>Rentals</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Total revenue across all shops and rentals</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="mx-auto h-12 w-12 opacity-50" />
                    <p className="mt-2">Revenue chart would appear here</p>
                    <p className="text-sm">
                      Showing data for last{" "}
                      {timeRange === "7d"
                        ? "7 days"
                        : timeRange === "30d"
                          ? "30 days"
                          : timeRange === "90d"
                            ? "90 days"
                            : "12 months"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Top Performing Shops</CardTitle>
                  <CardDescription>Shops with highest revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "City Scooters", revenue: 12450, growth: 8.2 },
                      { name: "Coastal Rides", revenue: 8750, growth: 12.5 },
                      { name: "Speedy Rentals", revenue: 9800, growth: 5.7 },
                      { name: "Mountain Scooters", revenue: 5200, growth: -2.3 },
                      { name: "Eco Scooters", revenue: 3100, growth: -4.8 },
                    ].map((shop, i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30">
                          {i + 1}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{shop.name}</p>
                            <p className="text-sm font-medium">${shop.revenue}</p>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <p className="text-muted-foreground">Revenue</p>
                            <p className={shop.growth >= 0 ? "text-green-500" : "text-red-500"}>
                              {shop.growth >= 0 ? "+" : ""}
                              {shop.growth}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Locations</CardTitle>
                  <CardDescription>Areas with highest rental activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { location: "Downtown", rentals: 245, percentage: 28 },
                      { location: "Beachfront", rentals: 187, percentage: 21 },
                      { location: "University District", rentals: 156, percentage: 18 },
                      { location: "Financial District", rentals: 132, percentage: 15 },
                      { location: "Uptown", rentals: 98, percentage: 11 },
                      { location: "Other", rentals: 62, percentage: 7 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="mb-1 flex items-center justify-between">
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{item.location}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{item.rentals} rentals</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="mx-auto h-12 w-12 opacity-50" />
                    <p className="mt-2">User growth chart would appear here</p>
                    <p className="text-sm">
                      Showing data for last{" "}
                      {timeRange === "7d"
                        ? "7 days"
                        : timeRange === "30d"
                          ? "30 days"
                          : timeRange === "90d"
                            ? "90 days"
                            : "12 months"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Scheduled maintenance and promotions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "System Maintenance", date: "2023-11-05", type: "maintenance" },
                      { title: "Holiday Promotion Launch", date: "2023-11-15", type: "promotion" },
                      { title: "New Shop Onboarding", date: "2023-11-18", type: "onboarding" },
                      { title: "Fleet Expansion", date: "2023-11-22", type: "fleet" },
                      { title: "Quarterly Review", date: "2023-12-01", type: "meeting" },
                    ].map((event, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full 
                          ${
                            event.type === "maintenance"
                              ? "bg-yellow-100 text-yellow-600"
                              : event.type === "promotion"
                                ? "bg-green-100 text-green-600"
                                : event.type === "onboarding"
                                  ? "bg-blue-100 text-blue-600"
                                  : event.type === "fleet"
                                    ? "bg-purple-100 text-purple-600"
                                    : "bg-gray-100 text-gray-600"
                          } 
                          dark:bg-opacity-20`}
                        >
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed breakdown of platform revenue</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Detailed revenue charts would appear here</p>
                  <p className="text-sm">
                    Showing data for last{" "}
                    {timeRange === "7d"
                      ? "7 days"
                      : timeRange === "30d"
                        ? "30 days"
                        : timeRange === "90d"
                          ? "90 days"
                          : "12 months"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>User growth, retention, and behavior</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Users className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">User analytics charts would appear here</p>
                  <p className="text-sm">
                    Showing data for last{" "}
                    {timeRange === "7d"
                      ? "7 days"
                      : timeRange === "30d"
                        ? "30 days"
                        : timeRange === "90d"
                          ? "90 days"
                          : "12 months"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rentals" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Rental Analytics</CardTitle>
                <CardDescription>Rental patterns, duration, and frequency</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Bike className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Rental analytics charts would appear here</p>
                  <p className="text-sm">
                    Showing data for last{" "}
                    {timeRange === "7d"
                      ? "7 days"
                      : timeRange === "30d"
                        ? "30 days"
                        : timeRange === "90d"
                          ? "90 days"
                          : "12 months"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
