"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  PenToolIcon as Tool,
  CheckCircle,
  Clock,
  AlertTriangle,
  Wrench,
  ShoppingBag,
  ClipboardList,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ShopUser } from "@/types/user-types"

interface MechanicDashboardProps {
  user: ShopUser
}

export function MechanicDashboard({ user }: MechanicDashboardProps) {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"

  // Demo data
  const maintenanceQueue = [
    {
      id: "SCT-1234",
      model: "Xiaomi Pro 2",
      issue: "Brake adjustment",
      priority: "high",
      status: "pending",
      assignedAt: "2023-06-10T09:00:00Z",
    },
    {
      id: "SCT-1235",
      model: "Segway Ninebot Max",
      issue: "Battery replacement",
      priority: "medium",
      status: "in_progress",
      assignedAt: "2023-06-10T10:30:00Z",
    },
    {
      id: "SCT-1236",
      model: "Lime S3",
      issue: "Tire puncture",
      priority: "high",
      status: "pending",
      assignedAt: "2023-06-10T11:15:00Z",
    },
    {
      id: "SCT-1237",
      model: "Xiaomi Mi 365",
      issue: "Throttle not responding",
      priority: "medium",
      status: "pending",
      assignedAt: "2023-06-10T13:45:00Z",
    },
  ]

  const partsInventory = [
    { name: "Brake pads", stock: 24, reorderPoint: 10, status: "ok" },
    { name: "Inner tubes", stock: 8, reorderPoint: 15, status: "low" },
    { name: "Batteries", stock: 5, reorderPoint: 5, status: "low" },
    { name: "Tires", stock: 12, reorderPoint: 8, status: "ok" },
  ]

  const maintenanceStats = [
    {
      title: "Pending Repairs",
      value: "7",
      change: "2 high priority",
      icon: Clock,
      href: "/shop-maintenance-queue",
    },
    {
      title: "Completed Today",
      value: "5",
      change: "3 more than yesterday",
      icon: CheckCircle,
      href: "/shop-maintenance-history",
    },
    {
      title: "Parts Needed",
      value: "2",
      change: "Inner tubes, Batteries",
      icon: ShoppingBag,
      href: "/shop-parts-inventory",
    },
    {
      title: "Average Repair Time",
      value: "42m",
      change: "5m faster than last week",
      icon: Tool,
      href: "/shop-maintenance-metrics",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Mechanic Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}. You have {maintenanceQueue.filter((item) => item.status === "pending").length}{" "}
          scooters waiting for maintenance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {maintenanceStats.map((stat) => (
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

      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="queue">Maintenance Queue</TabsTrigger>
          <TabsTrigger value="inventory">Parts Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>Maintenance Queue</CardTitle>
              <CardDescription>Scooters waiting for your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceQueue.map((item) => (
                  <div key={item.id} className="flex items-start justify-between border-b pb-4">
                    <div className="flex gap-4">
                      <div
                        className={`rounded-full p-2 ${
                          item.priority === "high"
                            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {item.status === "in_progress" ? (
                          <Wrench className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{item.model}</p>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                            {item.id}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.issue}</p>
                        <p className="text-xs text-muted-foreground">
                          Assigned:{" "}
                          {new Date(item.assignedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant={item.status === "in_progress" ? "outline" : "default"}
                        size="sm"
                        className={
                          item.status === "in_progress"
                            ? "gap-1"
                            : "gap-1 bg-gradient-to-r from-purple-600 to-yellow-500"
                        }
                      >
                        {item.status === "in_progress" ? "Complete Repair" : "Start Repair"}
                        {item.status === "in_progress" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Wrench className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/shop-maintenance-queue${isDemo ? "?demo=true" : ""}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  View full queue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>Parts Inventory</CardTitle>
              <CardDescription>Current stock levels and reorder status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partsInventory.map((part) => (
                  <div key={part.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{part.name}</span>
                        {part.status === "low" && (
                          <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full">
                            Low Stock
                          </span>
                        )}
                      </div>
                      <span className="text-sm">
                        {part.stock} / {part.reorderPoint} units
                      </span>
                    </div>
                    <Progress
                      value={(part.stock / part.reorderPoint) * 100}
                      className={
                        part.status === "low" ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/shop-parts-inventory${isDemo ? "?demo=true" : ""}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  View all parts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/shop-order-parts${isDemo ? "?demo=true" : ""}`}>
                <Button size="sm" className="gap-1 bg-gradient-to-r from-purple-600 to-yellow-500">
                  Order parts
                  <ShoppingBag className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="bg-white/60 backdrop-blur-lg border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-3">
            <Link href={`/shop-log-repair${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <ClipboardList className="h-4 w-4" />
                Log Repair
              </Button>
            </Link>
            <Link href={`/shop-order-parts${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <ShoppingBag className="h-4 w-4" />
                Order Parts
              </Button>
            </Link>
            <Link href={`/shop-maintenance-history${isDemo ? "?demo=true" : ""}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Clock className="h-4 w-4" />
                View History
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
