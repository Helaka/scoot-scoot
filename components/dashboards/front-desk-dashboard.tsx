"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Calendar,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  UserPlus,
  Search,
  Bike,
  AlertCircle,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { ShopUser } from "@/types/user-types"

interface FrontDeskDashboardProps {
  user: ShopUser
}

export function FrontDeskDashboard({ user }: FrontDeskDashboardProps) {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"

  // Demo data
  const stats = [
    {
      title: "Today's Bookings",
      value: "24",
      change: "8 check-ins, 6 returns pending",
      icon: Calendar,
      href: "/shop-bookings",
    },
    {
      title: "Available Scooters",
      value: "15",
      change: "5 need maintenance",
      icon: Bike,
      href: "/shop-scooters",
    },
    {
      title: "Customer Wait Time",
      value: "3m",
      change: "2m below target",
      icon: Clock,
      href: "/shop-customer-metrics",
    },
    {
      title: "Active Customers",
      value: "12",
      change: "Currently in the shop",
      icon: Users,
      href: "/shop-customers",
    },
  ]

  const upcomingBookings = [
    {
      id: "B-1234",
      customer: "John Doe",
      phone: "+1 (555) 123-4567",
      scooter: "Lime S3",
      time: "10:30 AM",
      status: "Confirmed",
      type: "Check-in",
    },
    {
      id: "B-1235",
      customer: "Jane Smith",
      phone: "+1 (555) 987-6543",
      scooter: "Xiaomi Pro 2",
      time: "11:00 AM",
      status: "Confirmed",
      type: "Check-in",
    },
    {
      id: "B-1236",
      customer: "Mike Johnson",
      phone: "+1 (555) 456-7890",
      scooter: "Segway Ninebot",
      time: "11:30 AM",
      status: "Pending",
      type: "Return",
    },
    {
      id: "B-1237",
      customer: "Sarah Williams",
      phone: "+1 (555) 234-5678",
      scooter: "Lime S3",
      time: "12:00 PM",
      status: "Confirmed",
      type: "Check-in",
    },
  ]

  const customerIssues = [
    {
      id: "ISS-001",
      customer: "Robert Chen",
      issue: "Scooter battery died during rental",
      priority: "high",
      status: "open",
      time: "9:45 AM",
    },
    {
      id: "ISS-002",
      customer: "Emma Davis",
      issue: "Billing dispute on last rental",
      priority: "medium",
      status: "open",
      time: "Yesterday",
    },
    {
      id: "ISS-003",
      customer: "Thomas Wilson",
      issue: "Lost personal item during rental",
      priority: "medium",
      status: "open",
      time: "Yesterday",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Front Desk Dashboard</h1>
        <p className="text-muted-foreground">
          Hello, {user.name}. You have{" "}
          {upcomingBookings.filter((b) => b.status === "Confirmed" && b.type === "Check-in").length} check-ins and{" "}
          {upcomingBookings.filter((b) => b.type === "Return").length} returns scheduled today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
            <CardFooter>
              <Link href={`${stat.href}${isDemo ? "?demo=true" : ""}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-yellow-500/10"
                >
                  View details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Customer Search */}
      <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle>Customer Lookup</CardTitle>
          <CardDescription>Find customer information quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name, phone, or booking ID..." className="pl-8" />
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-yellow-500">Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Upcoming Bookings */}
        <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Today's check-ins and returns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-start justify-between border-b pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{booking.customer}</p>
                      <Badge variant={booking.type === "Check-in" ? "default" : "outline"}>{booking.type}</Badge>
                    </div>
                    <p className="text-sm">
                      {booking.scooter} • {booking.time}
                    </p>
                    <p className="text-xs text-muted-foreground">{booking.phone}</p>
                  </div>
                  <div>
                    <Button
                      variant={booking.status === "Pending" ? "outline" : "default"}
                      size="sm"
                      className={
                        booking.status === "Pending" ? "gap-1" : "gap-1 bg-gradient-to-r from-purple-600 to-yellow-500"
                      }
                    >
                      {booking.type === "Check-in" ? "Check In" : "Process Return"}
                      {booking.type === "Check-in" ? (
                        <UserPlus className="h-3 w-3" />
                      ) : (
                        <CheckCircle className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/shop-bookings${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" size="sm" className="gap-1">
                View all bookings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Customer Issues */}
        <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all col-span-1">
          <CardHeader>
            <CardTitle>Customer Issues</CardTitle>
            <CardDescription>Open issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerIssues.map((issue) => (
                <div key={issue.id} className="flex gap-4 border-b pb-4">
                  <div
                    className={`rounded-full p-2 ${
                      issue.priority === "high"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{issue.customer}</p>
                      <span className="text-xs text-muted-foreground">{issue.time}</span>
                    </div>
                    <p className="text-sm">{issue.issue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/shop-customer-support${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" size="sm" className="gap-1">
                View all issues
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-4">
            <Link href={`/shop-new-booking${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                New Booking
              </Button>
            </Link>
            <Link href={`/shop-new-customer${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <UserPlus className="h-4 w-4" />
                New Customer
              </Button>
            </Link>
            <Link href={`/shop-onboarding-sessions${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <CheckCircle className="h-4 w-4" />
                Rider Onboarding
              </Button>
            </Link>
            <Link href={`/shop-customer-support${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <MessageSquare className="h-4 w-4" />
                Customer Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
