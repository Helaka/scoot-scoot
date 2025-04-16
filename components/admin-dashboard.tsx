"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  CreditCard,
  FileText,
  MoreHorizontal,
  Settings,
  Users,
  ShieldAlert,
  Globe,
  AlertTriangle,
  Terminal,
  Database,
  Code,
  Activity,
  Cpu,
  BarChart,
  Zap,
  LayoutDashboard,
  Bike,
  LogOut,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  const searchParamsHook = useSearchParams()
  const isDemo = searchParamsHook?.get("demo") === "true"
  const isDev = searchParamsHook?.get("dev") === "true"
  const [adminName, setAdminName] = useState("System Admin")
  const [showDevTools, setShowDevTools] = useState(true)

  useEffect(() => {
    if (isDemo) {
      setAdminName("Demo Admin")
    } else if (isDev) {
      setAdminName("Developer Admin")
      setShowDevTools(true)
    }
  }, [isDemo, isDev])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Navigation */}
      <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Bike className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-bold text-yellow-500">ScootScoot</span>
          </div>
          <div className="text-sm text-gray-400">Admin Portal</div>
          {isDemo && (
            <div className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-500">Demo</div>
          )}
          {isDev && (
            <div className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-500">
              Developer Admin
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 bg-gray-900 min-h-[calc(100vh-4rem)]">
          <div className="flex h-16 items-center border-b border-gray-800 px-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Admin Portal</span>
            </div>
            {isDev && <div className="ml-2 rounded bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">Dev</div>}
          </div>
          <nav className="p-4">
            <div className="space-y-1">
              <Link
                href="/admin-dashboard"
                className="flex items-center gap-3 rounded-lg bg-gray-800 px-3 py-2 text-yellow-500"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin-user-management"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </Link>
              <Link
                href="/admin-fleet-management"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Bike className="h-5 w-5" />
                <span>Fleet Management</span>
              </Link>
              <Link
                href="/admin-shop-management"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Globe className="h-5 w-5" />
                <span>Shop Management</span>
              </Link>
              <Link
                href="/admin-analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <BarChart className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
              <Link
                href="/admin-reports"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <FileText className="h-5 w-5" />
                <span>Reports</span>
              </Link>
              <Link
                href="/admin-payments"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <CreditCard className="h-5 w-5" />
                <span>Payments</span>
              </Link>
              <Link
                href="/admin-blacklist"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <ShieldAlert className="h-5 w-5" />
                <span>Blacklist</span>
              </Link>
            </div>

            {isDev && (
              <div className="mt-6 space-y-1">
                <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-500">Developer Tools</div>
                <Link
                  href="/admin-database"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Database className="h-5 w-5" />
                  <span>Database</span>
                </Link>
                <Link
                  href="/admin-api-testing"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Terminal className="h-5 w-5" />
                  <span>API Testing</span>
                </Link>
                <Link
                  href="/admin-settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </div>
            )}

            <div className="mt-6">
              <Link
                href="/admin-login"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {isDev && (
            <div className="mb-6 rounded-lg bg-blue-900/30 p-4 text-blue-200 border border-blue-800">
              <h2 className="text-lg font-semibold">Developer Mode Active</h2>
              <p>You have access to additional developer tools and unrestricted system access.</p>
              <div className="mt-2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-700 bg-blue-900/40 text-blue-300 hover:bg-blue-800"
                  onClick={() => setShowDevTools(!showDevTools)}
                >
                  {showDevTools ? "Hide Developer Tools" : "Show Developer Tools"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-700 bg-blue-900/40 text-blue-300 hover:bg-blue-800"
                >
                  Clear Cache
                </Button>
              </div>
            </div>
          )}

          {isDemo && (
            <div className="mb-6 rounded-lg bg-yellow-900/30 p-4 text-yellow-200 border border-yellow-800">
              <h2 className="text-lg font-semibold">Demo Mode Active</h2>
              <p>You're currently viewing the admin demo with sample data. Explore the administrative features!</p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-gray-400">+18% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Shops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-gray-400">+3 new this month</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$28,459</div>
                <p className="text-xs text-gray-400">+22.5% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="text-sm font-medium">All Systems Operational</div>
                </div>
                <p className="mt-2 text-xs text-gray-400">Last checked: 5 minutes ago</p>
              </CardContent>
            </Card>
          </div>

          {isDev && showDevTools && (
            <div className="mt-6">
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardHeader className="bg-blue-900/20 border-b border-blue-800/50">
                  <CardTitle className="text-blue-300">Developer Tools</CardTitle>
                  <CardDescription className="text-blue-200/70">
                    Advanced system monitoring and debugging tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-blue-400" />
                          <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,247</div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <p className="text-xs text-gray-400">98.7% Success Rate</p>
                        </div>
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs bg-gray-800 border-gray-700 hover:bg-gray-700"
                          >
                            View Logs
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-400" />
                          <CardTitle className="text-sm font-medium">Database</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">41%</div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <p className="text-xs text-gray-400">Connection Pool: 12/30</p>
                        </div>
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs bg-gray-800 border-gray-700 hover:bg-gray-700"
                          >
                            Query Explorer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-blue-400" />
                          <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">0.3%</div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <p className="text-xs text-gray-400">3 errors in last 24h</p>
                        </div>
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs bg-gray-800 border-gray-700 hover:bg-gray-700"
                          >
                            Error Logs
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-400" />
                            <CardTitle className="text-sm font-medium">Performance Metrics</CardTitle>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-sm font-medium">API Response Time</span>
                              <span className="text-sm text-gray-400">87ms avg</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: "29%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-sm font-medium">Page Load Time</span>
                              <span className="text-sm text-gray-400">342ms avg</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: "34%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-sm font-medium">Database Query Time</span>
                              <span className="text-sm text-gray-400">53ms avg</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: "18%" }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <CardTitle className="text-sm font-medium">System Warnings</CardTitle>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="rounded-md border border-amber-800 bg-amber-900/20 p-3">
                            <div className="flex items-center gap-2">
                              <Cpu className="h-4 w-4 text-amber-500" />
                              <p className="text-sm font-medium text-amber-300">
                                High CPU usage detected on API server
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-amber-400/70">Started 35 minutes ago</p>
                          </div>
                          <div className="rounded-md border border-amber-800 bg-amber-900/20 p-3">
                            <div className="flex items-center gap-2">
                              <Database className="h-4 w-4 text-amber-500" />
                              <p className="text-sm font-medium text-amber-300">
                                Database index optimization recommended
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-amber-400/70">Detected 2 hours ago</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <Button className="h-auto flex-col items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 text-white">
                      <Terminal className="h-6 w-6" />
                      <span>API Console</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex-col items-center justify-center gap-2 p-4 border-blue-700 bg-blue-900/20 text-blue-300 hover:bg-blue-800/50"
                    >
                      <BarChart className="h-6 w-6" />
                      <span>Performance Dashboard</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex-col items-center justify-center gap-2 p-4 border-blue-700 bg-blue-900/20 text-blue-300 hover:bg-blue-800/50"
                    >
                      <Zap className="h-6 w-6" />
                      <span>System Diagnostics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">System-wide activity and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "user", action: "New user registered", time: "10 minutes ago" },
                    { type: "shop", action: "New shop onboarded", time: "2 hours ago" },
                    { type: "payment", action: "Payment processed", time: "3 hours ago" },
                    { type: "system", action: "System update completed", time: "Yesterday" },
                    { type: "alert", action: "Security alert resolved", time: "2 days ago" },
                  ].map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-lg border border-gray-800 p-3 bg-gray-800/50"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full 
                        ${
                          activity.type === "user"
                            ? "bg-blue-900/50 text-blue-400"
                            : activity.type === "shop"
                              ? "bg-green-900/50 text-green-400"
                              : activity.type === "payment"
                                ? "bg-purple-900/50 text-purple-400"
                                : activity.type === "system"
                                  ? "bg-yellow-900/50 text-yellow-400"
                                  : "bg-red-900/50 text-red-400"
                        } 
                        dark:bg-opacity-20`}
                      >
                        {activity.type === "user" ? (
                          <Users className="h-5 w-5" />
                        ) : activity.type === "shop" ? (
                          <Globe className="h-5 w-5" />
                        ) : activity.type === "payment" ? (
                          <CreditCard className="h-5 w-5" />
                        ) : activity.type === "system" ? (
                          <Settings className="h-5 w-5" />
                        ) : (
                          <ShieldAlert className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-3 bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription className="text-gray-400">Current system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Server Load</span>
                      <span className="text-sm text-gray-400">24%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "24%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Database</span>
                      <span className="text-sm text-gray-400">41%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "41%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Storage</span>
                      <span className="text-sm text-gray-400">67%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "67%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">API Rate Limit</span>
                      <span className="text-sm text-gray-400">12%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                  View Detailed Metrics
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader className="flex flex-row items-center">
                <div className="flex-1">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription className="text-gray-400">Common administrative tasks</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button className="h-auto flex-col items-center justify-center gap-2 p-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Users className="h-6 w-6" />
                    <span>Add New Admin</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col items-center justify-center gap-2 p-4 border-gray-700 hover:bg-gray-800"
                  >
                    <Globe className="h-6 w-6" />
                    <span>Approve Shop</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col items-center justify-center gap-2 p-4 border-gray-700 hover:bg-gray-800"
                  >
                    <FileText className="h-6 w-6" />
                    <span>Generate Report</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col items-center justify-center gap-2 p-4 border-gray-700 hover:bg-gray-800"
                  >
                    <Settings className="h-6 w-6" />
                    <span>System Settings</span>
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
