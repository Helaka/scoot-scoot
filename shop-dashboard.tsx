"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  Home,
  MoreHorizontal,
  Plus,
  Settings,
  ShieldCheck,
  Users,
  Bike,
  DollarSign,
  UserCircle,
  LogOut,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ShopDashboard() {
  const searchParams = useSearchParams()
  const isDemo = searchParams.get("demo") === "true"
  const [shopName, setShopName] = useState("Beach Scooter Rentals")

  useEffect(() => {
    if (isDemo) {
      // Set demo data
      setShopName("Demo Rental Shop")
      // You could load more demo data here
    }
  }, [isDemo])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-white/80 backdrop-blur-md dark:bg-gray-900/80 p-4 shadow-md md:flex">
        <div className="flex items-center gap-2 px-2 py-4">
          <Bike className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-bold">ScootScoot</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-2">
          <Button variant="default" className="justify-start bg-yellow-500 hover:bg-yellow-600">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            <Bike className="mr-2 h-4 w-4" />
            My Scooters
          </Button>
          <Button variant="ghost" className="justify-start">
            <DollarSign className="mr-2 h-4 w-4" />
            My Pricing
          </Button>
          <Button variant="ghost" className="justify-start">
            <Users className="mr-2 h-4 w-4" />
            My Customers
          </Button>
          <Button variant="ghost" className="justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            My Bookings
          </Button>
          <Button variant="ghost" className="justify-start">
            <BarChart3 className="mr-2 h-4 w-4" />
            My Numbers
          </Button>
          <Button variant="ghost" className="justify-start">
            <UserCircle className="mr-2 h-4 w-4" />
            My Staff
          </Button>
          <Button variant="ghost" className="justify-start">
            <FileText className="mr-2 h-4 w-4" />
            My Reports
          </Button>
          <Button variant="ghost" className="justify-start">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Insurance
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white/90 backdrop-blur-md px-4 dark:bg-gray-900/90">
          <Button variant="outline" size="icon" className="md:hidden">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">Welcome back, {shopName}</h1>
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {isDemo && (
            <div className="mb-6 rounded-lg bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
              <h2 className="text-lg font-semibold">Demo Mode Active</h2>
              <p>You're currently viewing the demo version with sample data. Explore the features!</p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Rentals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+22% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Fleet Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <div className="mt-2">
                  <Progress value={68} className="h-2" />
                </div>
                <div className="mt-2 flex text-xs text-muted-foreground">
                  <div className="flex-1">
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      Available: 17
                    </Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                      Rented: 8
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,285</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">2 returning today</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-5">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your latest scooter rentals and returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((booking) => (
                    <div key={booking} className="flex items-center gap-4 rounded-lg border p-3">
                      <Avatar>
                        <AvatarFallback>{`R${booking}`}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">John Doe</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Scooter #SC-{booking + 100}</span>
                          <span className="mx-1">•</span>
                          <span>150cc Automatic</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="mb-1" variant={booking % 2 === 0 ? "outline" : "default"}>
                          {booking % 2 === 0 ? "Returned" : "Active"}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {booking % 2 === 0 ? "Mar 19, 2025" : "Returns Mar 21, 2025"}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Bookings
                </Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated on your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2 rounded-lg border p-3">
                    <Activity className="h-5 w-5 text-yellow-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Maintenance Due</p>
                      <p className="text-xs text-muted-foreground">Scooter #SC-103 needs service</p>
                    </div>
                  </div>
                  <div className="flex gap-2 rounded-lg border p-3">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Payment Received</p>
                      <p className="text-xs text-muted-foreground">$120 from booking #1432</p>
                    </div>
                  </div>
                  <div className="flex gap-2 rounded-lg border p-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">New Booking</p>
                      <p className="text-xs text-muted-foreground">Reservation for tomorrow</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="flex-1">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for your rental business</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button className="h-auto flex-col items-center justify-center gap-2 p-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Plus className="h-6 w-6" />
                    <span>Add New Scooter</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <Users className="h-6 w-6" />
                    <span>Register Customer</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <Calendar className="h-6 w-6" />
                    <span>Create Booking</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <FileText className="h-6 w-6" />
                    <span>Generate Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
