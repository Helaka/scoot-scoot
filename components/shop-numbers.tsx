"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import {
  BarChart2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Wallet,
  ArrowRight,
  PieChart,
  LineChart,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BranchSelector } from "./branch-selector"

export function ShopNumbers() {
  const [timeRange, setTimeRange] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBranch, setSelectedBranch] = useState("all")

  // Demo data for all branches combined
  const allBranchesData = {
    revenue: {
      total: 12480,
      change: 8.5,
      trend: "up",
    },
    expenses: {
      total: 4350,
      change: 3.2,
      trend: "up",
    },
    profit: {
      total: 8130,
      change: 12.4,
      trend: "up",
    },
    bookings: {
      total: 342,
      change: 15.8,
      trend: "up",
    },
  }

  // Demo data for main branch
  const mainBranchData = {
    revenue: {
      total: 7250,
      change: 6.2,
      trend: "up",
    },
    expenses: {
      total: 2580,
      change: 2.1,
      trend: "up",
    },
    profit: {
      total: 4670,
      change: 9.8,
      trend: "up",
    },
    bookings: {
      total: 198,
      change: 12.5,
      trend: "up",
    },
  }

  // Demo data for beach branch
  const beachBranchData = {
    revenue: {
      total: 3980,
      change: 14.2,
      trend: "up",
    },
    expenses: {
      total: 1320,
      change: 5.8,
      trend: "up",
    },
    profit: {
      total: 2660,
      change: 18.7,
      trend: "up",
    },
    bookings: {
      total: 112,
      change: 22.4,
      trend: "up",
    },
  }

  // Demo data for airport kiosk
  const airportBranchData = {
    revenue: {
      total: 1250,
      change: 3.5,
      trend: "up",
    },
    expenses: {
      total: 450,
      change: 1.2,
      trend: "up",
    },
    profit: {
      total: 800,
      change: 5.4,
      trend: "up",
    },
    bookings: {
      total: 32,
      change: 8.2,
      trend: "up",
    },
  }

  // Get the appropriate data based on selected branch
  const getBranchData = () => {
    switch (selectedBranch) {
      case "branch-1":
        return mainBranchData
      case "branch-2":
        return beachBranchData
      case "branch-3":
        return airportBranchData
      default:
        return allBranchesData
    }
  }

  const financialOverview = getBranchData()

  const revenueBySource = [
    { source: "Hourly Rentals", amount: 5840, percentage: 46.8 },
    { source: "Day Passes", amount: 3120, percentage: 25.0 },
    { source: "Memberships", amount: 2480, percentage: 19.9 },
    { source: "Seasonal Offers", amount: 1040, percentage: 8.3 },
  ]

  const expensesByCategory = [
    { category: "Maintenance", amount: 1850, percentage: 42.5 },
    { category: "Staff Salaries", amount: 1200, percentage: 27.6 },
    { category: "Insurance", amount: 750, percentage: 17.2 },
    { category: "Utilities", amount: 350, percentage: 8.0 },
    { category: "Other", amount: 200, percentage: 4.7 },
  ]

  const recentTransactions = [
    {
      id: "T-1234",
      customer: "John Doe",
      type: "payment",
      amount: 29.99,
      date: "2023-06-10",
      status: "completed",
      branch: "branch-1",
    },
    {
      id: "T-1235",
      customer: "Jane Smith",
      type: "payment",
      amount: 24.99,
      date: "2023-06-10",
      status: "completed",
      branch: "branch-2",
    },
    {
      id: "T-1236",
      customer: "Mike Johnson",
      type: "refund",
      amount: -34.99,
      date: "2023-06-09",
      status: "completed",
      branch: "branch-1",
    },
    {
      id: "T-1237",
      customer: "Sarah Williams",
      type: "payment",
      amount: 29.99,
      date: "2023-06-09",
      status: "pending",
      branch: "branch-3",
    },
    {
      id: "T-1238",
      customer: "David Brown",
      type: "payment",
      amount: 49.99,
      date: "2023-06-08",
      status: "completed",
      branch: "branch-2",
    },
  ]

  // Filter transactions based on selected branch
  const filteredTransactions =
    selectedBranch === "all"
      ? recentTransactions
      : recentTransactions.filter((transaction) => transaction.branch === selectedBranch)

  const monthlyRevenue = [
    { month: "Jan", amount: 8240 },
    { month: "Feb", amount: 7890 },
    { month: "Mar", amount: 9120 },
    { month: "Apr", amount: 10450 },
    { month: "May", amount: 11520 },
    { month: "Jun", amount: 12480 },
  ]

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") {
      return <TrendingUp className={`h-4 w-4 ${change > 0 ? "text-green-500" : "text-red-500"}`} />
    } else {
      return <TrendingDown className={`h-4 w-4 ${change < 0 ? "text-green-500" : "text-red-500"}`} />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-200 text-yellow-500">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="border-red-200 text-red-500">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getBranchName = (branchId: string) => {
    switch (branchId) {
      case "branch-1":
        return "Main Branch"
      case "branch-2":
        return "Beach Location"
      case "branch-3":
        return "Airport Kiosk"
      default:
        return "Unknown"
    }
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Numbers</h1>
          <p className="text-muted-foreground">Track your financial performance, revenue, and expenses.</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="comparison">Branch Comparison</TabsTrigger>
            </TabsList>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 sm:max-w-[300px]">
                <BranchSelector onBranchChange={setSelectedBranch} initialBranch="all" />
              </div>
              <div className="flex items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download Report</span>
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="mt-0">
              {/* Financial Overview Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${financialOverview.revenue.total.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {getTrendIcon(financialOverview.revenue.trend, financialOverview.revenue.change)}
                      <span
                        className={`ml-1 ${financialOverview.revenue.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {financialOverview.revenue.change}%
                      </span>
                      <span className="ml-1">from last {timeRange}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${financialOverview.expenses.total.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {getTrendIcon(financialOverview.expenses.trend, -financialOverview.expenses.change)}
                      <span
                        className={`ml-1 ${financialOverview.expenses.trend === "up" ? "text-red-500" : "text-green-500"}`}
                      >
                        {financialOverview.expenses.change}%
                      </span>
                      <span className="ml-1">from last {timeRange}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${financialOverview.profit.total.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {getTrendIcon(financialOverview.profit.trend, financialOverview.profit.change)}
                      <span
                        className={`ml-1 ${financialOverview.profit.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {financialOverview.profit.change}%
                      </span>
                      <span className="ml-1">from last {timeRange}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{financialOverview.bookings.total}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {getTrendIcon(financialOverview.bookings.trend, financialOverview.bookings.change)}
                      <span
                        className={`ml-1 ${financialOverview.bookings.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {financialOverview.bookings.change}%
                      </span>
                      <span className="ml-1">from last {timeRange}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Chart */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>
                    {selectedBranch === "all"
                      ? "Monthly revenue across all branches"
                      : `Monthly revenue for ${getBranchName(selectedBranch)}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    {/* This would be a chart in a real implementation */}
                    <div className="flex h-full items-end gap-2">
                      {monthlyRevenue.map((month) => (
                        <div key={month.month} className="group relative flex w-full flex-col items-center">
                          <div className="absolute -top-8 rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            ${month.amount.toLocaleString()}
                          </div>
                          <div
                            className="w-full rounded-t bg-primary transition-all group-hover:bg-primary/80"
                            style={{
                              height: `${(month.amount / Math.max(...monthlyRevenue.map((m) => m.amount))) * 250}px`,
                            }}
                          ></div>
                          <span className="mt-2 text-xs text-muted-foreground">{month.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Sources and Expenses */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Source</CardTitle>
                    <CardDescription>
                      {selectedBranch === "all"
                        ? "Breakdown of revenue streams across all branches"
                        : `Breakdown of revenue streams for ${getBranchName(selectedBranch)}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {revenueBySource.map((item) => (
                        <div key={item.source}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.source}</span>
                            <span className="text-sm text-muted-foreground">
                              ${item.amount.toLocaleString()} ({item.percentage}%)
                            </span>
                          </div>
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Expenses by Category</CardTitle>
                    <CardDescription>
                      {selectedBranch === "all"
                        ? "Breakdown of expense categories across all branches"
                        : `Breakdown of expense categories for ${getBranchName(selectedBranch)}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {expensesByCategory.map((item) => (
                        <div key={item.category}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.category}</span>
                            <span className="text-sm text-muted-foreground">
                              ${item.amount.toLocaleString()} ({item.percentage}%)
                            </span>
                          </div>
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-red-500" style={{ width: `${item.percentage}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    {selectedBranch === "all"
                      ? "Your latest financial transactions across all branches"
                      : `Your latest financial transactions for ${getBranchName(selectedBranch)}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                      <div className="col-span-2">Transaction ID</div>
                      <div className="col-span-3">Customer</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-2">Status</div>
                      {selectedBranch === "all" && <div className="col-span-1">Branch</div>}
                    </div>
                    <div className="divide-y">
                      {filteredTransactions.map((transaction) => (
                        <div key={transaction.id} className="grid grid-cols-12 items-center p-4">
                          <div className="col-span-2 font-medium">{transaction.id}</div>
                          <div className="col-span-3">{transaction.customer}</div>
                          <div className="col-span-2">{new Date(transaction.date).toLocaleDateString()}</div>
                          <div className={`col-span-2 ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                            {transaction.amount < 0 ? "-" : ""}${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                          <div className="col-span-2">
                            {getStatusBadge(transaction.status)}
                            <span className="ml-2 text-xs text-muted-foreground">
                              {transaction.type === "payment" ? "Payment" : "Refund"}
                            </span>
                          </div>
                          {selectedBranch === "all" && (
                            <div className="col-span-1 text-xs">
                              <Badge variant="outline">{getBranchName(transaction.branch)}</Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    View All Transactions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                  <CardDescription>
                    {selectedBranch === "all"
                      ? "Detailed breakdown of your revenue streams across all branches"
                      : `Detailed breakdown of your revenue streams for ${getBranchName(selectedBranch)}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed p-8">
                    <div className="flex flex-col items-center text-center">
                      <LineChart className="h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Revenue Analysis Charts</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Detailed revenue charts and analysis would be displayed here, showing trends, comparisons, and
                        breakdowns by different dimensions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expenses" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Analysis</CardTitle>
                  <CardDescription>
                    {selectedBranch === "all"
                      ? "Detailed breakdown of your expenses across all branches"
                      : `Detailed breakdown of your expenses for ${getBranchName(selectedBranch)}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed p-8">
                    <div className="flex flex-col items-center text-center">
                      <PieChart className="h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Expense Analysis Charts</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Detailed expense charts and analysis would be displayed here, showing category breakdowns,
                        trends over time, and cost optimization opportunities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="mt-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      {selectedBranch === "all"
                        ? "Complete history of all financial transactions across all branches"
                        : `Complete history of all financial transactions for ${getBranchName(selectedBranch)}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transactions</SelectItem>
                        <SelectItem value="payments">Payments</SelectItem>
                        <SelectItem value="refunds">Refunds</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                      <div className="col-span-2">Transaction ID</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-3">Customer</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-1">Status</div>
                      {selectedBranch === "all" && <div className="col-span-1">Branch</div>}
                    </div>
                    <div className="divide-y">
                      {/* Extended list of transactions would go here */}
                      <div className="grid grid-cols-12 items-center p-4">
                        <div className="col-span-2 font-medium">T-1234</div>
                        <div className="col-span-2">Jun 10, 2023</div>
                        <div className="col-span-3">John Doe</div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="border-green-200 text-green-500">
                            Payment
                          </Badge>
                        </div>
                        <div className="col-span-2 text-green-500">$29.99</div>
                        <div className="col-span-1">
                          <Badge className="bg-green-500">Completed</Badge>
                        </div>
                        {selectedBranch === "all" && (
                          <div className="col-span-1">
                            <Badge variant="outline">Main Branch</Badge>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-12 items-center p-4">
                        <div className="col-span-2 font-medium">T-1235</div>
                        <div className="col-span-2">Jun 10, 2023</div>
                        <div className="col-span-3">Jane Smith</div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="border-green-200 text-green-500">
                            Payment
                          </Badge>
                        </div>
                        <div className="col-span-2 text-green-500">$24.99</div>
                        <div className="col-span-1">
                          <Badge className="bg-green-500">Completed</Badge>
                        </div>
                        {selectedBranch === "all" && (
                          <div className="col-span-1">
                            <Badge variant="outline">Beach Location</Badge>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-12 items-center p-4">
                        <div className="col-span-2 font-medium">T-1236</div>
                        <div className="col-span-2">Jun 9, 2023</div>
                        <div className="col-span-3">Mike Johnson</div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="border-red-200 text-red-500">
                            Refund
                          </Badge>
                        </div>
                        <div className="col-span-2 text-red-500">-$34.99</div>
                        <div className="col-span-1">
                          <Badge className="bg-green-500">Completed</Badge>
                        </div>
                        {selectedBranch === "all" && (
                          <div className="col-span-1">
                            <Badge variant="outline">Main Branch</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Showing 3 of 125 transactions</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Branch Performance Comparison</CardTitle>
                  <CardDescription>Compare key metrics across all your branches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Revenue Comparison */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Revenue Comparison</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Main Branch - Downtown</span>
                            <span className="text-sm text-muted-foreground">$7,250 (58%)</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-blue-500" style={{ width: "58%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Beach Location</span>
                            <span className="text-sm text-muted-foreground">$3,980 (32%)</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-green-500" style={{ width: "32%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Airport Kiosk</span>
                            <span className="text-sm text-muted-foreground">$1,250 (10%)</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-purple-500" style={{ width: "10%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bookings Comparison */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Bookings Comparison</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Main Branch - Downtown</span>
                            <span className="text-sm text-muted-foreground">198 bookings (58%)</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-blue-500" style={{ width: "58%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Beach Location</span>
                            <span className="text-sm text-muted-foreground">112 bookings (33%)</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-green-500" style={{ width: "33%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Airport Kiosk</span>
                            <span className="text-sm text-muted-foreground">32 bookings (9%)</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-purple-500" style={{ width: "9%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profit Margin Comparison */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profit Margin Comparison</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Main Branch - Downtown</span>
                            <span className="text-sm text-muted-foreground">64.4% margin</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-blue-500" style={{ width: "64.4%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Beach Location</span>
                            <span className="text-sm text-muted-foreground">66.8% margin</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-green-500" style={{ width: "66.8%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Airport Kiosk</span>
                            <span className="text-sm text-muted-foreground">64.0% margin</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-purple-500" style={{ width: "64.0%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    View Detailed Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ShopLayout>
  )
}

export default ShopNumbers
