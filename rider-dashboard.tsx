"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bike,
  Bell,
  Calendar,
  Clock,
  CreditCard,
  Home,
  LogOut,
  Map,
  MessageSquare,
  Settings,
  Star,
  User,
} from "lucide-react"

export default function RiderDashboard() {
  const searchParams = useSearchParams()
  const isDemo = searchParams.get("demo") === "true"
  const [userName, setUserName] = useState("John Doe")

  useEffect(() => {
    if (isDemo) {
      // Set demo data
      setUserName("Demo User")
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
        <div className="mt-8 flex flex-col items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-semibold">{userName}</h2>
          <p className="text-sm text-muted-foreground">Rider</p>
          {isDemo && <Badge className="mt-2 bg-yellow-500 text-black">Demo Mode</Badge>}
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-2">
          <Button variant="ghost" className="justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            <Map className="mr-2 h-4 w-4" />
            Find Scooters
          </Button>
          <Button variant="ghost" className="justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            My Rentals
          </Button>
          <Button variant="ghost" className="justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </Button>
          <Button variant="ghost" className="justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Support
          </Button>
          <Button variant="ghost" className="justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
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
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">Welcome, {userName}</h1>
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
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

          {/* Active Rental */}
          <Card className="mb-6 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
            <CardHeader>
              <CardTitle>Active Rental</CardTitle>
              <CardDescription>Your current scooter rental</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Scooter"
                    className="h-48 w-full rounded-lg object-cover md:h-full"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Yamaha NMAX 155cc</h3>
                    <p className="text-sm text-muted-foreground">Automatic Scooter • Black</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">
                      Rental ends in: <strong>4h 32m</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">
                      Return to: <strong>Beach Scooter Rentals</strong>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Extend Rental</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Find Scooters */}
          <Card className="mb-6 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
            <CardHeader>
              <CardTitle>Find Scooters</CardTitle>
              <CardDescription>Discover available scooters near you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Map View</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Browse All Scooters</Button>
            </CardFooter>
          </Card>

          {/* Recent Rentals */}
          <Card className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
            <CardHeader>
              <CardTitle>Recent Rentals</CardTitle>
              <CardDescription>Your rental history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((rental) => (
                  <div key={rental} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt={`Scooter ${rental}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">Honda PCX 150cc</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>March {10 + rental}, 2025</span>
                        <span className="mx-1">•</span>
                        <span>24 hours</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-yellow-500 text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium">$45.00</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Rentals
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
