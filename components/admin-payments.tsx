"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  CreditCard,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  ChevronDown,
  ChevronUp,
  Eye,
  RefreshCw,
  DollarSign,
  User,
  Store,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "./admin-layout"

// Mock data for transactions
const mockTransactions = [
  {
    id: "TRX-001",
    date: "2023-10-30",
    amount: 25.5,
    type: "rental",
    status: "completed",
    customer: "Alex Johnson",
    shop: "City Scooters",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-002",
    date: "2023-10-29",
    amount: 18.75,
    type: "rental",
    status: "completed",
    customer: "Maria Garcia",
    shop: "Coastal Rides",
    paymentMethod: "PayPal",
  },
  {
    id: "TRX-003",
    date: "2023-10-28",
    amount: 45.0,
    type: "subscription",
    status: "completed",
    customer: "James Smith",
    shop: "Mountain Scooters",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-004",
    date: "2023-10-27",
    amount: 22.5,
    type: "rental",
    status: "refunded",
    customer: "Sarah Williams",
    shop: "City Scooters",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-005",
    date: "2023-10-26",
    amount: 15.0,
    type: "rental",
    status: "completed",
    customer: "David Brown",
    shop: "Speedy Rentals",
    paymentMethod: "Apple Pay",
  },
  {
    id: "TRX-006",
    date: "2023-10-25",
    amount: 35.25,
    type: "rental",
    status: "completed",
    customer: "Emma Wilson",
    shop: "Coastal Rides",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-007",
    date: "2023-10-24",
    amount: 12.5,
    type: "rental",
    status: "failed",
    customer: "Michael Taylor",
    shop: "Mountain Scooters",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-008",
    date: "2023-10-23",
    amount: 28.75,
    type: "rental",
    status: "completed",
    customer: "Olivia Martinez",
    shop: "City Scooters",
    paymentMethod: "Google Pay",
  },
]

// Mock data for payouts
const mockPayouts = [
  {
    id: "PYT-001",
    date: "2023-10-31",
    amount: 1250.75,
    status: "completed",
    shop: "City Scooters",
    method: "Bank Transfer",
    transactions: 48,
  },
  {
    id: "PYT-002",
    date: "2023-10-31",
    amount: 875.5,
    status: "completed",
    shop: "Coastal Rides",
    method: "Bank Transfer",
    transactions: 32,
  },
  {
    id: "PYT-003",
    date: "2023-10-31",
    amount: 520.25,
    status: "pending",
    shop: "Mountain Scooters",
    method: "Bank Transfer",
    transactions: 21,
  },
  {
    id: "PYT-004",
    date: "2023-10-31",
    amount: 980.0,
    status: "completed",
    shop: "Speedy Rentals",
    method: "Bank Transfer",
    transactions: 37,
  },
  {
    id: "PYT-005",
    date: "2023-09-30",
    amount: 1120.5,
    status: "completed",
    shop: "City Scooters",
    method: "Bank Transfer",
    transactions: 42,
  },
]

export default function AdminPayments() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const isDev = searchParams?.get("dev") === "true"

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions)
  const [sortColumn, setSortColumn] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Apply filters and sorting
  useEffect(() => {
    let result = [...mockTransactions]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (transaction) =>
          transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.shop.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((transaction) => transaction.type === typeFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((transaction) => transaction.status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      // Fallback for non-string values (like numbers)
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      // Fallback for dates
      if (sortColumn === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      }

      // Fallback for mixed types
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

    setFilteredTransactions(result)
  }, [searchTerm, typeFilter, statusFilter, sortColumn, sortDirection])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      case "refunded":
        return <Badge className="bg-blue-500">Refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "rental":
        return (
          <Badge
            variant="outline"
            className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
          >
            Rental
          </Badge>
        )
      case "subscription":
        return (
          <Badge
            variant="outline"
            className="border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-400"
          >
            Subscription
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {isDemo && (
          <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            <h2 className="text-lg font-semibold">Demo Mode Active</h2>
            <p>
              You're viewing sample payment data. In a real environment, you would see actual transaction information.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage transactions, payouts, and payment settings</p>
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
                <span>+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,842</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$26.45</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>+3.7% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Refund Rate</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4%</div>
              <div className="flex items-center text-xs text-red-500">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                <span>-0.5% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Transactions</span>
              </TabsTrigger>
              <TabsTrigger value="payouts" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Payouts</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <TabsContent value="transactions" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="rental">Rental</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="mr-2 h-4 w-4" />
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                          <div className="flex items-center gap-1">Transaction ID {getSortIcon("id")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                          <div className="flex items-center gap-1">Date {getSortIcon("date")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                          <div className="flex items-center gap-1">Amount {getSortIcon("amount")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                          <div className="flex items-center gap-1">Type {getSortIcon("type")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                          <div className="flex items-center gap-1">Status {getSortIcon("status")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                          <div className="flex items-center gap-1">Customer {getSortIcon("customer")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("shop")}>
                          <div className="flex items-center gap-1">Shop {getSortIcon("shop")}</div>
                        </TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No transactions found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                {transaction.customer}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Store className="h-4 w-4 text-muted-foreground" />
                                {transaction.shop}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  {transaction.status === "completed" && (
                                    <DropdownMenuItem>
                                      <RefreshCw className="mr-2 h-4 w-4" />
                                      Issue Refund
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Receipt
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredTransactions.length}</strong> of <strong>{mockTransactions.length}</strong>{" "}
                  transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Shop Payouts</CardTitle>
                <CardDescription>Manage payouts to rental shops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payout ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Shop</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPayouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">{payout.id}</TableCell>
                          <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
                          <TableCell>${payout.amount.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(payout.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Store className="h-4 w-4 text-muted-foreground" />
                              {payout.shop}
                            </div>
                          </TableCell>
                          <TableCell>{payout.method}</TableCell>
                          <TableCell>{payout.transactions}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Process New Payout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and processing</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Settings className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Payment settings would be configured here</p>
                  <p className="text-sm">Including payment gateways, currencies, and processing options</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
