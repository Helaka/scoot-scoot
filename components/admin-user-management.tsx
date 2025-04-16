"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Download,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  UserCog,
  Shield,
  User,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminLayout } from "./admin-layout"

// Mock data for users
const mockUsers = [
  {
    id: "USR001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "rider",
    status: "active",
    joined: "2023-05-12",
    lastActive: "2023-10-28",
    rentals: 24,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR002",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "rider",
    status: "active",
    joined: "2023-06-18",
    lastActive: "2023-10-27",
    rentals: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR003",
    name: "James Smith",
    email: "james.smith@example.com",
    role: "shop_owner",
    status: "active",
    joined: "2023-02-05",
    lastActive: "2023-10-28",
    rentals: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "rider",
    status: "suspended",
    joined: "2023-04-22",
    lastActive: "2023-09-15",
    rentals: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR005",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "admin",
    status: "active",
    joined: "2022-11-30",
    lastActive: "2023-10-28",
    rentals: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR006",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "rider",
    status: "inactive",
    joined: "2023-07-08",
    lastActive: "2023-08-12",
    rentals: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR007",
    name: "Michael Taylor",
    email: "michael.taylor@example.com",
    role: "shop_owner",
    status: "pending",
    joined: "2023-10-01",
    lastActive: "2023-10-25",
    rentals: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR008",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    role: "rider",
    status: "active",
    joined: "2023-03-15",
    lastActive: "2023-10-26",
    rentals: 17,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for user activity
const mockUserActivity = [
  {
    id: 1,
    user: "Alex Johnson",
    action: "Completed rental",
    details: "Returned scooter #SC-2345 after 2 hours",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: "Maria Garcia",
    action: "Started rental",
    details: "Rented scooter #SC-1278 in Downtown",
    timestamp: "3 hours ago",
  },
  {
    id: 3,
    user: "James Smith",
    action: "Updated shop profile",
    details: "Changed business hours and contact information",
    timestamp: "5 hours ago",
  },
  {
    id: 4,
    user: "Sarah Williams",
    action: "Account suspended",
    details: "Multiple violations of rental policy",
    timestamp: "1 day ago",
  },
  {
    id: 5,
    user: "Emma Wilson",
    action: "Password reset",
    details: "Requested and completed password reset",
    timestamp: "2 days ago",
  },
]

export default function AdminUserManagement() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const isDev = searchParams?.get("dev") === "true"

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  // Apply filters and sorting
  useEffect(() => {
    let result = [...mockUsers]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      // Fallback for non-string values
      return sortDirection === "asc" ? (aValue < bValue ? -1 : 1) : bValue < aValue ? -1 : 1
    })

    setFilteredUsers(result)
  }, [searchTerm, roleFilter, statusFilter, sortColumn, sortDirection])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "shop_owner":
        return <Badge className="bg-blue-500">Shop Owner</Badge>
      case "rider":
        return <Badge className="bg-green-500">Rider</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Inactive
          </Badge>
        )
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-purple-500" />
      case "shop_owner":
        return <UserCog className="h-4 w-4 text-blue-500" />
      case "rider":
        return <User className="h-4 w-4 text-green-500" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {isDemo && (
          <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            <h2 className="text-lg font-semibold">Demo Mode Active</h2>
            <p>
              You're viewing sample user management data. In a real environment, you would see actual user information.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions across the platform</p>
        </div>

        <Tabs defaultValue="all-users">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all-users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>All Users</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Activity</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="h-8 bg-yellow-500 hover:bg-yellow-600 text-black">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>

          <TabsContent value="all-users" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="shop_owner">Shop Owner</SelectItem>
                        <SelectItem value="rider">Rider</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
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
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                          <div className="flex items-center gap-1">User {getSortIcon("name")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>
                          <div className="flex items-center gap-1">Role {getSortIcon("role")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                          <div className="flex items-center gap-1">Status {getSortIcon("status")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("joined")}>
                          <div className="flex items-center gap-1">Joined {getSortIcon("joined")}</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("lastActive")}>
                          <div className="flex items-center gap-1">Last Active {getSortIcon("lastActive")}</div>
                        </TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No users found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getRoleIcon(user.role)}
                                {getRoleBadge(user.role)}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
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
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Shield className="mr-2 h-4 w-4" />
                                    Change Role
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {user.status === "active" ? (
                                    <DropdownMenuItem className="text-amber-600">
                                      <AlertCircle className="mr-2 h-4 w-4" />
                                      Suspend User
                                    </DropdownMenuItem>
                                  ) : user.status === "suspended" ? (
                                    <DropdownMenuItem className="text-green-600">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Reactivate User
                                    </DropdownMenuItem>
                                  ) : null}
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete User
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
                  Showing <strong>{filteredUsers.length}</strong> of <strong>{mockUsers.length}</strong> users
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

          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
                <CardDescription>Track user actions and events across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                        </div>
                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
