"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Key,
  Eye,
  EyeOff,
  MapPin,
  Grid,
  List,
  CreditCard,
  Building,
  GraduationCap,
  Award,
  FileText,
  UserCog,
  Users,
  Star,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuickBranchCreation } from "./quick-branch-creation"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ViewType = "list" | "grid" | "card"
type SortOption = "name" | "role" | "branch" | "status" | "joinDate"

export function ShopStaff() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewType, setViewType] = useState<ViewType>("list")
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null)

  // Demo data for branches
  const branches = [
    { id: "branch-1", name: "Downtown Branch", address: "123 Main St, Downtown" },
    { id: "branch-2", name: "Beach Branch", address: "456 Ocean Ave, Beachside" },
    { id: "branch-3", name: "Airport Branch", address: "789 Airport Rd, Terminal 2" },
  ]

  // Demo data for staff members with enhanced information
  const staffMembers = [
    {
      id: "S-1001",
      name: "John Smith",
      email: "john.smith@scootscoot.com",
      phone: "+1 (555) 123-4567",
      role: "manager",
      status: "active",
      joinDate: "2022-03-15",
      avatar: "/placeholder.svg?height=200&width=200",
      permissions: {
        manageStaff: true,
        manageScooters: true,
        managePricing: true,
        manageCustomers: true,
        viewReports: true,
        processPayments: true,
      },
      branchId: "branch-1",
      position: "Branch Manager",
      education: "Bachelor's in Business Administration",
      certifications: ["Scooter Maintenance Level 2", "Customer Service Excellence"],
      emergencyContact: {
        name: "Mary Smith",
        relationship: "Spouse",
        phone: "+1 (555) 987-6543",
      },
      performance: {
        rating: 4.8,
        rentalsProcessed: 342,
        customerRating: 4.9,
      },
      schedule: "Mon-Fri: 9AM-5PM",
      notes: "Excellent manager, handles difficult situations well.",
    },
    {
      id: "S-1002",
      name: "Emily Johnson",
      email: "emily.johnson@scootscoot.com",
      phone: "+1 (555) 987-6543",
      role: "staff",
      status: "active",
      joinDate: "2022-05-20",
      avatar: "/placeholder.svg?height=200&width=200",
      permissions: {
        manageStaff: false,
        manageScooters: true,
        managePricing: false,
        manageCustomers: true,
        viewReports: false,
        processPayments: true,
      },
      branchId: "branch-2",
      position: "Rental Associate",
      education: "Associate's in Tourism Management",
      certifications: ["First Aid", "Scooter Basics"],
      emergencyContact: {
        name: "Robert Johnson",
        relationship: "Father",
        phone: "+1 (555) 234-5678",
      },
      performance: {
        rating: 4.5,
        rentalsProcessed: 215,
        customerRating: 4.7,
      },
      schedule: "Wed-Sun: 10AM-6PM",
      notes: "Great with customers, especially tourists.",
    },
    {
      id: "S-1003",
      name: "Michael Davis",
      email: "michael.davis@scootscoot.com",
      phone: "+1 (555) 456-7890",
      role: "staff",
      status: "active",
      joinDate: "2022-07-10",
      avatar: "/placeholder.svg?height=200&width=200",
      permissions: {
        manageStaff: false,
        manageScooters: true,
        managePricing: false,
        manageCustomers: true,
        viewReports: false,
        processPayments: true,
      },
      branchId: "branch-3",
      position: "Maintenance Specialist",
      education: "Technical Certificate in Motorcycle Repair",
      certifications: ["Advanced Scooter Maintenance", "Engine Repair"],
      emergencyContact: {
        name: "Jennifer Davis",
        relationship: "Sister",
        phone: "+1 (555) 345-6789",
      },
      performance: {
        rating: 4.6,
        rentalsProcessed: 178,
        customerRating: 4.4,
      },
      schedule: "Tue-Sat: 8AM-4PM",
      notes: "Excellent at diagnosing mechanical issues.",
    },
    {
      id: "S-1004",
      name: "Sarah Wilson",
      email: "sarah.wilson@scootscoot.com",
      phone: "+1 (555) 789-0123",
      role: "admin",
      status: "active",
      joinDate: "2022-01-05",
      avatar: "/placeholder.svg?height=200&width=200",
      permissions: {
        manageStaff: true,
        manageScooters: true,
        managePricing: true,
        manageCustomers: true,
        viewReports: true,
        processPayments: true,
      },
      branchId: null,
      position: "Regional Manager",
      education: "MBA in Hospitality Management",
      certifications: ["Leadership Excellence", "Financial Management"],
      emergencyContact: {
        name: "David Wilson",
        relationship: "Husband",
        phone: "+1 (555) 456-7890",
      },
      performance: {
        rating: 4.9,
        rentalsProcessed: 120,
        customerRating: 4.8,
      },
      schedule: "Mon-Fri: 8AM-4PM",
      notes: "Oversees all branches, excellent leadership skills.",
    },
    {
      id: "S-1005",
      name: "Robert Brown",
      email: "robert.brown@scootscoot.com",
      phone: "+1 (555) 234-5678",
      role: "staff",
      status: "inactive",
      joinDate: "2022-09-15",
      avatar: "/placeholder.svg?height=200&width=200",
      permissions: {
        manageStaff: false,
        manageScooters: true,
        managePricing: false,
        manageCustomers: true,
        viewReports: false,
        processPayments: false,
      },
      branchId: "branch-1",
      position: "Rental Associate",
      education: "High School Diploma",
      certifications: ["Customer Service Basics"],
      emergencyContact: {
        name: "Patricia Brown",
        relationship: "Mother",
        phone: "+1 (555) 876-5432",
      },
      performance: {
        rating: 3.7,
        rentalsProcessed: 87,
        customerRating: 3.9,
      },
      schedule: "Weekends Only",
      notes: "Part-time staff, currently on leave.",
    },
    {
      id: "S-1006",
      name: "Jessica Lee",
      email: "jessica.lee@scootscoot.com",
      phone: "+1 (555) 345-6789",
      role: "staff",
      status: "active",
      joinDate: "2023-01-10",
      avatar: "/placeholder.svg?height=200&width=200",
      permissions: {
        manageStaff: false,
        manageScooters: false,
        managePricing: false,
        manageCustomers: true,
        viewReports: false,
        processPayments: true,
      },
      branchId: "branch-2",
      position: "Customer Service Representative",
      education: "Bachelor's in Communications",
      certifications: ["Conflict Resolution", "Customer Experience"],
      emergencyContact: {
        name: "William Lee",
        relationship: "Father",
        phone: "+1 (555) 765-4321",
      },
      performance: {
        rating: 4.7,
        rentalsProcessed: 156,
        customerRating: 4.9,
      },
      schedule: "Mon-Fri: 11AM-7PM",
      notes: "Excellent at handling customer complaints.",
    },
    {
      id: "S-1007",
      name: "David Martinez",
      email: "david.martinez@scootscoot.com",
      phone: "+1 (555) 876-5432",
      role: "manager",
      status: "active",
      joinDate: "2022-06-15",
      avatar: "/placeholder.svg?height=200&width=200",
      permissions: {
        manageStaff: true,
        manageScooters: true,
        managePricing: true,
        manageCustomers: true,
        viewReports: true,
        processPayments: true,
      },
      branchId: "branch-2",
      position: "Branch Manager",
      education: "Bachelor's in Tourism Management",
      certifications: ["Leadership Training", "Inventory Management"],
      emergencyContact: {
        name: "Maria Martinez",
        relationship: "Wife",
        phone: "+1 (555) 234-5678",
      },
      performance: {
        rating: 4.6,
        rentalsProcessed: 267,
        customerRating: 4.5,
      },
      schedule: "Tue-Sat: 9AM-5PM",
      notes: "Great at team building and motivation.",
    },
    {
      id: "S-1008",
      name: "Thomas Anderson",
      email: "thomas.anderson@scootscoot.com",
      phone: "+1 (555) 765-4321",
      role: "staff",
      status: "active",
      joinDate: "2023-03-05",
      avatar: "/placeholder.svg?height=200&width=200",
      permissions: {
        manageStaff: false,
        manageScooters: true,
        managePricing: false,
        manageCustomers: true,
        viewReports: false,
        processPayments: true,
      },
      branchId: "branch-3",
      position: "Rental Associate",
      education: "Associate's in Business",
      certifications: ["Scooter Safety", "Basic Maintenance"],
      emergencyContact: {
        name: "Susan Anderson",
        relationship: "Mother",
        phone: "+1 (555) 432-1098",
      },
      performance: {
        rating: 4.2,
        rentalsProcessed: 98,
        customerRating: 4.4,
      },
      schedule: "Wed-Sun: 9AM-5PM",
      notes: "New hire, showing good potential.",
    },
  ]

  // Filter staff based on search query and filters
  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone.includes(searchQuery) ||
      staff.position.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || staff.role === roleFilter
    const matchesBranch = branchFilter === "all" || staff.branchId === branchFilter
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter

    return matchesSearch && matchesRole && matchesBranch && matchesStatus
  })

  // Sort staff based on sort option
  const sortedStaff = [...filteredStaff].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "role":
        comparison = a.role.localeCompare(b.role)
        break
      case "branch":
        const aBranch = a.branchId ? branches.find((b) => b.id === a.branchId)?.name || "" : ""
        const bBranch = b.branchId ? branches.find((b) => b.id === b.branchId)?.name || "" : ""
        comparison = aBranch.localeCompare(bBranch)
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
      case "joinDate":
        comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
        break
      default:
        comparison = a.name.localeCompare(b.name)
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "manager":
        return <Badge className="bg-blue-500">Manager</Badge>
      case "staff":
        return <Badge className="bg-green-500">Staff</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-green-200 text-green-500">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="border-red-200 text-red-500">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getBranchName = (branchId: string | null) => {
    if (!branchId) return "No branch assigned"
    const branch = branches.find((b) => b.id === branchId)
    return branch ? branch.name : "Unknown branch"
  }

  const selectedStaffData = selectedStaff ? staffMembers.find((s) => s.id === selectedStaff) : null

  const handleBranchCreated = (branchData: any) => {
    // In a real app, you would update the branches state
    // For now, we'll just set the selected branch
    setSelectedBranchId(branchData.id)
    toast({
      title: "Branch created",
      description: `${branchData.name} has been selected for this staff member.`,
    })
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      toggleSortOrder()
    } else {
      setSortBy(option)
      setSortOrder("asc")
    }
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Staff</h1>
          <p className="text-muted-foreground">Manage your staff members, roles, and permissions.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staffMembers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {staffMembers.filter((s) => s.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Branches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{branches.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Roles Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">{staffMembers.filter((s) => s.role === "admin").length}</span>
                  <Badge className="mt-1 bg-purple-500">Admin</Badge>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">{staffMembers.filter((s) => s.role === "manager").length}</span>
                  <Badge className="mt-1 bg-blue-500">Manager</Badge>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">{staffMembers.filter((s) => s.role === "staff").length}</span>
                  <Badge className="mt-1 bg-green-500">Staff</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button variant="ghost" size="icon" className="shrink-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1 rounded-md border p-1">
                    <Button
                      variant={viewType === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewType("list")}
                    >
                      <List className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                    <Button
                      variant={viewType === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewType("grid")}
                    >
                      <Grid className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                    <Button
                      variant={viewType === "card" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewType("card")}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span className="sr-only">Card view</span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>

            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
                <SelectItem value="null">Unassigned</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Staff
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                  <DialogDescription>Enter the details of the new staff member to add to your team.</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="basic">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="role">Role & Branch</TabsTrigger>
                    <TabsTrigger value="additional">Additional Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-name" className="text-right">
                        Name
                      </Label>
                      <Input id="staff-name" placeholder="Full name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-email" className="text-right">
                        Email
                      </Label>
                      <Input id="staff-email" type="email" placeholder="Email address" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-phone" className="text-right">
                        Phone
                      </Label>
                      <Input id="staff-phone" placeholder="Phone number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-position" className="text-right">
                        Position
                      </Label>
                      <Input id="staff-position" placeholder="Job position" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-photo" className="text-right">
                        Photo
                      </Label>
                      <div className="col-span-3">
                        <Input id="staff-photo" type="file" accept="image/*" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="role" className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-role" className="text-right">
                        Role
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-branch" className="text-right">
                        Branch
                      </Label>
                      <div className="col-span-3 space-y-4">
                        <Select value={selectedBranchId || "none"} onValueChange={setSelectedBranchId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select branch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No branch assigned</SelectItem>
                            {branches.map((branch) => (
                              <SelectItem key={branch.id} value={branch.id}>
                                {branch.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <QuickBranchCreation onBranchCreated={handleBranchCreated} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-password" className="text-right">
                        Password
                      </Label>
                      <div className="col-span-3 relative">
                        <Input
                          id="staff-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Temporary password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3 flex items-center space-x-2">
                        <Switch id="staff-active" defaultChecked />
                        <Label htmlFor="staff-active">Active</Label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="additional" className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-education" className="text-right">
                        Education
                      </Label>
                      <Input id="staff-education" placeholder="Highest education" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-certifications" className="text-right">
                        Certifications
                      </Label>
                      <Input id="staff-certifications" placeholder="Relevant certifications" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-schedule" className="text-right">
                        Schedule
                      </Label>
                      <Input id="staff-schedule" placeholder="Work schedule" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="staff-notes" className="text-right pt-2">
                        Notes
                      </Label>
                      <textarea
                        id="staff-notes"
                        placeholder="Additional notes about this staff member"
                        className="col-span-3 min-h-[100px] rounded-md border p-2"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Emergency Contact</Label>
                      <div className="col-span-3 space-y-2">
                        <Input placeholder="Contact name" />
                        <Input placeholder="Relationship" />
                        <Input placeholder="Phone number" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddStaffOpen(false)}>Add Staff</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Staff List - List View */}
        {viewType === "list" && (
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
              <div className="col-span-3 flex items-center gap-1 cursor-pointer" onClick={() => handleSort("name")}>
                Staff Member
                {sortBy === "name" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </div>
              <div className="col-span-3">Contact</div>
              <div className="col-span-2 flex items-center gap-1 cursor-pointer" onClick={() => handleSort("role")}>
                Role
                {sortBy === "role" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </div>
              <div className="col-span-2 flex items-center gap-1 cursor-pointer" onClick={() => handleSort("branch")}>
                Branch
                {sortBy === "branch" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </div>
              <div className="col-span-1 flex items-center gap-1 cursor-pointer" onClick={() => handleSort("status")}>
                Status
                {sortBy === "status" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </div>
              <div className="col-span-1"></div>
            </div>
            <div className="divide-y">
              {sortedStaff.length > 0 ? (
                sortedStaff.map((staff) => (
                  <div key={staff.id} className="grid grid-cols-12 items-center p-4">
                    <div className="col-span-3 flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback>
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-muted-foreground">{staff.position}</div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        {staff.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        {staff.phone}
                      </div>
                    </div>
                    <div className="col-span-2">{getRoleBadge(staff.role)}</div>
                    <div className="col-span-2">
                      {staff.branchId ? (
                        <Badge variant="outline" className="border-blue-200 text-blue-500">
                          {getBranchName(staff.branchId)}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">No branch assigned</span>
                      )}
                    </div>
                    <div className="col-span-1">{getStatusBadge(staff.status)}</div>
                    <div className="col-span-1 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedStaff(staff.id)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Staff</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          {staff.status === "active" ? (
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No staff members found matching your filters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Staff Grid View */}
        {viewType === "grid" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedStaff.length > 0 ? (
              sortedStaff.map((staff) => (
                <Card key={staff.id} className="overflow-hidden">
                  <div className="relative">
                    <div
                      className={`absolute right-2 top-2 z-10 ${staff.status === "active" ? "bg-green-500" : "bg-red-500"} h-3 w-3 rounded-full`}
                    ></div>
                    <div className="h-40 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center">
                      <Avatar className="h-24 w-24 border-4 border-white">
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback className="text-2xl">
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-bold text-lg">{staff.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{staff.position}</p>
                    <div className="flex justify-center mb-2">{getRoleBadge(staff.role)}</div>
                    <p className="text-sm flex items-center justify-center">
                      <Building className="h-4 w-4 mr-1" />
                      {staff.branchId ? getBranchName(staff.branchId) : "No branch assigned"}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 pt-0">
                    <Button variant="outline" size="sm" onClick={() => setSelectedStaff(staff.id)}>
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Staff</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        {staff.status === "active" ? (
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full p-4 text-center text-muted-foreground">
                No staff members found matching your filters.
              </div>
            )}
          </div>
        )}

        {/* Staff Card View */}
        {viewType === "card" && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {sortedStaff.length > 0 ? (
              sortedStaff.map((staff) => (
                <Card key={staff.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback className="text-xl">
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{staff.name}</h3>
                            <p className="text-sm text-muted-foreground">{staff.position}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getRoleBadge(staff.role)}
                            {getStatusBadge(staff.status)}
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium">Contact</h4>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm flex items-center">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                {staff.email}
                              </p>
                              <p className="text-sm flex items-center">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                {staff.phone}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Branch & Schedule</h4>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm flex items-center">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                {staff.branchId ? getBranchName(staff.branchId) : "No branch assigned"}
                              </p>
                              <p className="text-sm flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                {staff.schedule}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium">Qualifications</h4>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm flex items-center">
                                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                                {staff.education}
                              </p>
                              <p className="text-sm flex items-center">
                                <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                                {staff.certifications[0]}
                                {staff.certifications.length > 1 ? ` +${staff.certifications.length - 1} more` : ""}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Performance</h4>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm flex items-center">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                {staff.performance.rentalsProcessed} rentals processed
                              </p>
                              <p className="text-sm flex items-center">
                                <Star className="mr-2 h-4 w-4 text-yellow-500" />
                                {staff.performance.rating.toFixed(1)} rating
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between px-6 py-4 bg-muted/20">
                    <Button variant="outline" onClick={() => setSelectedStaff(staff.id)}>
                      View Full Profile
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Documents</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <UserCog className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuItem>Change Branch</DropdownMenuItem>
                          <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                          {staff.status === "active" ? (
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full p-4 text-center text-muted-foreground">
                No staff members found matching your filters.
              </div>
            )}
          </div>
        )}

        {/* Staff Details Dialog */}
        {selectedStaffData && (
          <Dialog open={!!selectedStaff} onOpenChange={(open) => !open && setSelectedStaff(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Staff Details</DialogTitle>
                <DialogDescription>Detailed information about {selectedStaffData.name}</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="permissions">Permissions</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                      <AvatarImage src={selectedStaffData.avatar} alt={selectedStaffData.name} />
                      <AvatarFallback className="text-2xl">
                        {selectedStaffData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedStaffData.name}</h3>
                      <p className="text-muted-foreground">{selectedStaffData.position}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getRoleBadge(selectedStaffData.role)}
                        {getStatusBadge(selectedStaffData.status)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{selectedStaffData.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{selectedStaffData.phone}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Account Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Joined: {new Date(selectedStaffData.joinDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Last login: June 10, 2023</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Branch Assignment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedStaffData.branchId ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>Assigned to: {getBranchName(selectedStaffData.branchId)}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>Not assigned to any branch</span>
                        </div>
                      )}
                      <Button variant="outline" size="sm" className="mt-4">
                        Change Branch Assignment
                      </Button>
                    </CardContent>
                  </Card>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Qualifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Education</h4>
                          <p className="text-sm">{selectedStaffData.education}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Certifications</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStaffData.certifications.map((cert, index) => (
                              <Badge key={index} variant="secondary">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Emergency Contact</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {selectedStaffData.emergencyContact.name} ({selectedStaffData.emergencyContact.relationship}
                            )
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{selectedStaffData.emergencyContact.phone}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{selectedStaffData.notes}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="permissions" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Role & Permissions</CardTitle>
                      <CardDescription>Manage what this staff member can access and modify</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Manage Staff</Label>
                            <p className="text-sm text-muted-foreground">Can add, edit, and remove staff members</p>
                          </div>
                          <Switch checked={selectedStaffData.permissions.manageStaff} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Manage Scooters</Label>
                            <p className="text-sm text-muted-foreground">Can add, edit, and manage scooter fleet</p>
                          </div>
                          <Switch checked={selectedStaffData.permissions.manageScooters} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Manage Pricing</Label>
                            <p className="text-sm text-muted-foreground">Can modify pricing plans and offers</p>
                          </div>
                          <Switch checked={selectedStaffData.permissions.managePricing} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Manage Customers</Label>
                            <p className="text-sm text-muted-foreground">Can view and edit customer information</p>
                          </div>
                          <Switch checked={selectedStaffData.permissions.manageCustomers} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>View Reports</Label>
                            <p className="text-sm text-muted-foreground">Can access financial and business reports</p>
                          </div>
                          <Switch checked={selectedStaffData.permissions.viewReports} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Process Payments</Label>
                            <p className="text-sm text-muted-foreground">Can process payments and refunds</p>
                          </div>
                          <Switch checked={selectedStaffData.permissions.processPayments} />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Save Permissions</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="performance" className="pt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <div className="text-3xl font-bold">{selectedStaffData.performance.rating.toFixed(1)}</div>
                          <div className="ml-2 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.round(selectedStaffData.performance.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Rentals Processed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{selectedStaffData.performance.rentalsProcessed}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <div className="text-3xl font-bold">
                            {selectedStaffData.performance.customerRating.toFixed(1)}
                          </div>
                          <div className="ml-2 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.round(selectedStaffData.performance.customerRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-base">Activity Log</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                          <div>
                            <p className="text-sm font-medium">Logged in to the system</p>
                            <p className="text-xs text-muted-foreground">June 10, 2023 at 9:30 AM</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                          <div>
                            <p className="text-sm font-medium">Created a new booking for customer John Doe</p>
                            <p className="text-xs text-muted-foreground">June 10, 2023 at 10:15 AM</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-purple-500"></div>
                          <div>
                            <p className="text-sm font-medium">Updated scooter SC-001 status to maintenance</p>
                            <p className="text-xs text-muted-foreground">June 9, 2023 at 4:45 PM</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-yellow-500"></div>
                          <div>
                            <p className="text-sm font-medium">Processed payment for rental #R-2345</p>
                            <p className="text-xs text-muted-foreground">June 9, 2023 at 2:30 PM</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                          <div>
                            <p className="text-sm font-medium">Reported issue with scooter SC-015</p>
                            <p className="text-xs text-muted-foreground">June 8, 2023 at 11:20 AM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="documents" className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Employment Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-blue-500" />
                              <span>Employment Contract</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-green-500" />
                              <span>Tax Documents</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-purple-500" />
                              <span>Training Certificates</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-yellow-500" />
                              <span>Performance Reviews</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Identification & Licenses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-blue-500" />
                              <span>ID Card</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-green-500" />
                              <span>Driver's License</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-purple-500" />
                              <span>Work Permit</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-base">Upload New Document</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="doc-type" className="text-right">
                            Document Type
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="contract">Employment Contract</SelectItem>
                              <SelectItem value="id">ID Card</SelectItem>
                              <SelectItem value="license">Driver's License</SelectItem>
                              <SelectItem value="certificate">Certificate</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="doc-file" className="text-right">
                            File
                          </Label>
                          <Input id="doc-file" type="file" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="doc-notes" className="text-right">
                            Notes
                          </Label>
                          <Input id="doc-notes" placeholder="Additional notes" className="col-span-3" />
                        </div>
                        <div className="flex justify-end">
                          <Button>Upload Document</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedStaff(null)}>
                  Close
                </Button>
                <Button>Edit Staff</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ShopLayout>
  )
}

export default ShopStaff
