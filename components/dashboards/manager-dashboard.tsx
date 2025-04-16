"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  BarChart2,
  DollarSign,
  Users,
  Calendar,
  UserCheck,
  FileText,
  ArrowRight,
  Bike,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ShopUser } from "@/types/user-types"

interface ManagerDashboardProps {
  user: ShopUser
}

export function ManagerDashboard({ user }: ManagerDashboardProps) {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"

  // Demo data
  const stats = [
    {
      title: "Today's Revenue",
      value: "$1,240",
      change: "+15% from yesterday",
      icon: DollarSign,
      href: "/shop-numbers",
    },
    {
      title: "Staff Performance",
      value: "92%",
      change: "3 staff members online",
      icon: UserCheck,
      href: "/shop-staff",
    },
    {
      title: "Fleet Utilization",
      value: "78%",
      change: "12 scooters currently rented",
      icon: Bike,
      href: "/shop-scooters",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "24 new reviews today",
      icon: Users,
      href: "/shop-customers",
    },
  ]

  const staffActivity = [
    {
      name: "Sarah Johnson",
      role: "Front Desk",
      status: "online",
      activity: "Processed 8 rentals today",
      performance: 95,
    },
    {
      name: "Mike Chen",
      role: "Mechanic",
      status: "online",
      activity: "Completed 5 repairs today",
      performance: 90,
    },
    {
      name: "Jessica Williams",
      role: "Front Desk",
      status: "offline",
      activity: "Last active 2 hours ago",
      performance: 85,
    },
  ]

  const pendingApprovals = [
    {
      id: "REQ-001",
      type: "Time Off",
      staff: "Mike Chen",
      details: "Vacation request: Jun 15-20",
      submitted: "2023-06-05T14:30:00Z",
    },
    {
      id: "REQ-002",
      type: "Expense",
      staff: "Sarah Johnson",
      details: "Tool purchase: $89.99",
      submitted: "2023-06-08T09:15:00Z",
    },
    {
      id: "REQ-003",
      type: "Schedule Change",
      staff: "Jessica Williams",
      details: "Shift swap with Alex on Jun 12",
      submitted: "2023-06-09T16:45:00Z",
    },
  ]

  const notifications = [
    { id: 1, type: "staff", message: "Mike Chen completed all assigned repairs ahead of schedule", priority: "medium" },
    { id: 2, type: "business", message: "Monthly financial report is ready for review", priority: "high" },
    { id: 3, type: "system", message: "Staff schedule for next week needs approval", priority: "medium" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <p className="text-muted-foreground">
          Good morning, {user.name}. Your shop is performing 15% better than yesterday.
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

      <div className="grid gap-4 md:grid-cols-2">
        {/* Staff Activity */}
        <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all col-span-1">
          <CardHeader>
            <CardTitle>Staff Activity</CardTitle>
            <CardDescription>Performance and current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffActivity.map((staff) => (
                <div key={staff.name} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${staff.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {staff.role} • {staff.activity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{staff.performance}%</p>
                    <p className="text-xs text-muted-foreground">Performance</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/shop-staff${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" size="sm" className="gap-1">
                Manage staff
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Pending Approvals */}
        <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all col-span-1">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.type}</p>
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{item.id}</span>
                    </div>
                    <p className="text-sm">{item.staff}</p>
                    <p className="text-xs text-muted-foreground">{item.details}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Deny
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-yellow-500">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/shop-approvals${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" size="sm" className="gap-1">
                View all requests
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Important updates and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex gap-4 border-b pb-4">
                <div
                  className={`rounded-full p-2 ${
                    notification.priority === "high"
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : notification.priority === "medium"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} priority
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-4">
            <Link href={`/shop-staff-schedule${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                Staff Schedule
              </Button>
            </Link>
            <Link href={`/shop-reports${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Generate Reports
              </Button>
            </Link>
            <Link href={`/shop-numbers${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <BarChart2 className="h-4 w-4" />
                View Analytics
              </Button>
            </Link>
            <Link href={`/shop-approvals${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Clock className="h-4 w-4" />
                Pending Approvals
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
