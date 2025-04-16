"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  Search,
  Filter,
  AlertTriangle,
  Shield,
  UserX,
  Clock,
  MoreHorizontal,
  AlertCircle,
  Info,
  Upload,
  FileText,
  User,
  Flag,
  X,
} from "lucide-react"

// Mock data for blacklisted riders
const blacklistedRiders = [
  {
    id: "BL-1001",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 123-4567",
    status: "blacklisted",
    reportedBy: "Downtown Scooters",
    reportDate: "2023-10-15",
    reason: "Damaged equipment and refused to pay",
    evidence: "Photos, rental agreement",
    reviewStatus: "approved",
    reviewDate: "2023-10-18",
  },
  {
    id: "BL-1002",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 987-6543",
    status: "blacklisted",
    reportedBy: "City Riders",
    reportDate: "2023-09-28",
    reason: "Provided fraudulent payment information",
    evidence: "Payment records, ID verification",
    reviewStatus: "approved",
    reviewDate: "2023-10-01",
  },
  {
    id: "BL-1003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 456-7890",
    status: "pending",
    reportedBy: "ScootScoot Downtown",
    reportDate: "2023-10-25",
    reason: "Verbally abusive to staff",
    evidence: "Incident report, witness statements",
    reviewStatus: "pending",
    reviewDate: null,
  },
  {
    id: "BL-1004",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 789-0123",
    status: "pending",
    reportedBy: "Urban Scooters",
    reportDate: "2023-10-22",
    reason: "Theft attempt",
    evidence: "Security camera footage",
    reviewStatus: "pending",
    reviewDate: null,
  },
  {
    id: "BL-1005",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    phone: "+1 (555) 234-5678",
    status: "rejected",
    reportedBy: "ScootScoot Downtown",
    reportDate: "2023-09-15",
    reason: "Late return and damaged scooter",
    evidence: "Photos of damage",
    reviewStatus: "rejected",
    reviewDate: "2023-09-18",
    rejectionReason: "Insufficient evidence, damage appears to be pre-existing",
  },
]

// Mock data for reported incidents
const reportedIncidents = [
  {
    id: "INC-2001",
    riderName: "James Wilson",
    date: "2023-10-15",
    location: "Downtown Branch",
    type: "Property Damage",
    description: "Customer damaged the scooter's display panel and refused to acknowledge or pay for repairs.",
    status: "Blacklisted",
    evidence: ["Damage photos", "Rental agreement", "Payment dispute record"],
  },
  {
    id: "INC-2002",
    riderName: "Emily Davis",
    date: "2023-09-28",
    location: "Westside Branch",
    type: "Fraud",
    description: "Customer provided fraudulent payment information that was later declined.",
    status: "Blacklisted",
    evidence: ["Payment records", "ID verification failure"],
  },
  {
    id: "INC-2003",
    riderName: "Michael Brown",
    date: "2023-10-25",
    location: "Downtown Branch",
    type: "Abusive Behavior",
    description: "Customer was verbally abusive to staff when asked to return the scooter on time.",
    status: "Under Review",
    evidence: ["Incident report", "Witness statements"],
  },
  {
    id: "INC-2004",
    riderName: "Sarah Johnson",
    date: "2023-10-22",
    location: "Eastside Branch",
    type: "Theft Attempt",
    description: "Customer attempted to leave with the scooter without completing the rental process.",
    status: "Under Review",
    evidence: ["Security footage"],
  },
]

// Mock data for customers
const mockCustomers = [
  {
    id: "C-1001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15",
    totalRentals: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "C-1002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    joinDate: "2023-02-20",
    totalRentals: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "C-1003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-03-10",
    totalRentals: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for previous reports
const mockPreviousReports = [
  {
    id: "RPT001",
    customer: {
      id: "C-2001",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
    },
    date: "2023-09-15",
    reason: "Damaged scooter and refused to pay for repairs",
    status: "under_review",
    evidenceCount: 3,
  },
  {
    id: "RPT002",
    customer: {
      id: "C-2002",
      name: "David Brown",
      email: "david.brown@example.com",
    },
    date: "2023-08-22",
    reason: "Provided false identification",
    status: "blacklisted",
    evidenceCount: 2,
  },
]

export default function ShopRiderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [selectedRider, setSelectedRider] = useState<string | null>(null)
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState("")
  const [reportType, setReportType] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter blacklisted riders based on search and status
  const filteredRiders = blacklistedRiders.filter((rider) => {
    const matchesSearch =
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || rider.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Filter customers based on search query
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

  // Get selected customer data
  const selectedCustomerData = selectedCustomer
    ? mockCustomers.find((customer) => customer.id === selectedCustomer)
    : null

  // Handle file upload
  const handleFileUpload = () => {
    // In a real app, this would handle actual file uploads
    const newFile = `Evidence-${uploadedFiles.length + 1}.jpg`
    setUploadedFiles([...uploadedFiles, newFile])
    toast({
      title: "File uploaded",
      description: `${newFile} has been added to your report.`,
    })
  }

  // Handle report submission
  const handleSubmitReport = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsReportDialogOpen(false)
      setReportReason("")
      setReportType("")
      setUploadedFiles([])
      toast({
        title: "Report submitted",
        description: "Your report has been submitted for review by our team.",
      })
    }, 1500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "blacklisted":
        return <Badge className="bg-red-500">Blacklisted</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending Review</Badge>
      case "rejected":
        return <Badge variant="outline">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getReviewStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const selectedRiderData = selectedRider ? blacklistedRiders.find((r) => r.id === selectedRider) : null

  const selectedIncidentData = selectedIncident ? reportedIncidents.find((i) => i.id === selectedIncident) : null

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Rider Management</h1>
          <p className="text-muted-foreground">
            Report, track, and manage problematic riders across the ScootScoot network.
          </p>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <CardContent className="p-4 flex gap-4 items-start">
            <div className="bg-blue-100 dark:bg-blue-800/30 p-2 rounded-full">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-300">Community Protection</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                The ScootScoot rider management system helps protect all partners. Reports are reviewed by our team and
                approved reports add riders to a network-wide blacklist.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Blacklisted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {blacklistedRiders.filter((r) => r.status === "blacklisted").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {blacklistedRiders.filter((r) => r.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Your Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {blacklistedRiders.filter((r) => r.reportedBy === "ScootScoot Downtown").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Network Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">100%</div>
              <p className="text-xs text-muted-foreground">All branches protected</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="blacklist" className="flex items-center gap-2">
              <UserX className="h-4 w-4" />
              <span>Blacklist</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              <span>Report Rider</span>
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Incidents</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Reports */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-yellow-500" />
                    Recent Reports
                  </CardTitle>
                  <CardDescription>Your most recent rider reports</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {mockPreviousReports.length > 0 ? (
                      mockPreviousReports.map((report) => (
                        <div key={report.id} className="p-4 flex items-start justify-between">
                          <div>
                            <div className="font-medium">{report.customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(report.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm mt-1 line-clamp-1">{report.reason}</div>
                          </div>
                          <Badge className={report.status === "blacklisted" ? "bg-red-500" : "bg-yellow-500"}>
                            {report.status === "blacklisted" ? "Blacklisted" : "Under Review"}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">No recent reports</div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("report")}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report a Rider
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Blacklisted */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserX className="h-5 w-5 text-red-500" />
                    Recently Blacklisted
                  </CardTitle>
                  <CardDescription>Recently blacklisted riders across the network</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {blacklistedRiders
                      .filter((r) => r.status === "blacklisted")
                      .slice(0, 3)
                      .map((rider) => (
                        <div key={rider.id} className="p-4 flex items-start justify-between">
                          <div>
                            <div className="font-medium">{rider.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(rider.reportDate).toLocaleDateString()}
                            </div>
                            <div className="text-sm mt-1 line-clamp-1">{rider.reason}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{rider.reportedBy}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("blacklist")}>
                    <Shield className="mr-2 h-4 w-4" />
                    View Full Blacklist
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => {
                      setActiveTab("report")
                    }}
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    Report a Rider
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("blacklist")}>
                    <UserX className="mr-2 h-4 w-4" />
                    Check Blacklist
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("incidents")}>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    View Incidents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blacklist Tab */}
          <TabsContent value="blacklist" className="space-y-4">
            {/* Actions and Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search blacklist..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="blacklisted">Blacklisted</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-red-500 hover:bg-red-600" onClick={() => setActiveTab("report")}>
                  <Flag className="mr-2 h-4 w-4" />
                  Report Rider
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Report Date</TableHead>
                      <TableHead>Review Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRiders.length > 0 ? (
                      filteredRiders.map((rider) => (
                        <TableRow key={rider.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-red-100 text-red-800">
                                  {rider.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{rider.name}</div>
                                <div className="text-sm text-muted-foreground">{rider.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(rider.status)}</TableCell>
                          <TableCell>{rider.reportedBy}</TableCell>
                          <TableCell>{new Date(rider.reportDate).toLocaleDateString()}</TableCell>
                          <TableCell>{getReviewStatusBadge(rider.reviewStatus)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedRider(rider.id)}>
                                  View Details
                                </DropdownMenuItem>
                                {rider.reportedBy === "ScootScoot Downtown" && rider.status === "pending" && (
                                  <DropdownMenuItem>Edit Report</DropdownMenuItem>
                                )}
                                {rider.reportedBy === "ScootScoot Downtown" && rider.status === "pending" && (
                                  <DropdownMenuItem className="text-red-600">Withdraw Report</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No riders found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Rider Details Dialog */}
            {selectedRiderData && (
              <Dialog open={!!selectedRider} onOpenChange={(open) => !open && setSelectedRider(null)}>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Blacklist Details</DialogTitle>
                    <DialogDescription>Information about {selectedRiderData.name}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg bg-red-100 text-red-800">
                          {selectedRiderData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{selectedRiderData.name}</h3>
                        <div className="mt-1 flex items-center gap-2">
                          {getStatusBadge(selectedRiderData.status)}
                          <span className="text-sm text-muted-foreground">ID: {selectedRiderData.id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <div className="text-sm font-medium">Email</div>
                            <div>{selectedRiderData.email}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Phone</div>
                            <div>{selectedRiderData.phone}</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Report Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <div className="text-sm font-medium">Reported By</div>
                            <div>{selectedRiderData.reportedBy}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Report Date</div>
                            <div>{new Date(selectedRiderData.reportDate).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Review Status</div>
                            <div className="flex items-center gap-2">
                              {getReviewStatusBadge(selectedRiderData.reviewStatus)}
                              {selectedRiderData.reviewDate && (
                                <span className="text-sm text-muted-foreground">
                                  ({new Date(selectedRiderData.reviewDate).toLocaleDateString()})
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Incident Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-sm font-medium">Reason for Report</div>
                          <div className="mt-1 rounded-md bg-muted p-3">{selectedRiderData.reason}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Evidence Provided</div>
                          <div className="mt-1 rounded-md bg-muted p-3">{selectedRiderData.evidence}</div>
                        </div>
                        {selectedRiderData.rejectionReason && (
                          <div>
                            <div className="text-sm font-medium text-red-500">Rejection Reason</div>
                            <div className="mt-1 rounded-md bg-red-50 p-3 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                              {selectedRiderData.rejectionReason}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Blacklist Alert</p>
                        <p className="text-sm">
                          This rider will be flagged in the system if they attempt to rent from any ScootScoot partner.
                          {selectedRiderData.status === "blacklisted"
                            ? " Rental will be automatically denied."
                            : " The shop will be notified of the pending report."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedRider(null)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Report Rider Tab */}
          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report a Rider</CardTitle>
                <CardDescription>Search for a rider to report or view your previous reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="search">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="search">Search Riders</TabsTrigger>
                    <TabsTrigger value="previous">Previous Reports</TabsTrigger>
                  </TabsList>

                  <TabsContent value="search" className="space-y-4 pt-4">
                    <div className="flex w-full items-center space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Search customers by name, email, or phone..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                        <div className="col-span-5">Customer</div>
                        <div className="col-span-3">Contact</div>
                        <div className="col-span-2">Rentals</div>
                        <div className="col-span-2"></div>
                      </div>
                      <div className="divide-y">
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <div key={customer.id} className="grid grid-cols-12 items-center p-4">
                              <div className="col-span-5">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={customer.avatar} alt={customer.name} />
                                    <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{customer.name}</div>
                                    <div className="text-sm text-muted-foreground">{customer.id}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-3">
                                <div className="text-sm">{customer.email}</div>
                                <div className="text-sm text-muted-foreground">{customer.phone}</div>
                              </div>
                              <div className="col-span-2">{customer.totalRentals}</div>
                              <div className="col-span-2 text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedCustomer(customer.id)
                                    setIsReportDialogOpen(true)
                                  }}
                                >
                                  <Flag className="mr-2 h-4 w-4" />
                                  Report
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            No customers found matching your search.
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="previous" className="space-y-4 pt-4">
                    {mockPreviousReports.length > 0 ? (
                      <div className="space-y-4">
                        {mockPreviousReports.map((report) => (
                          <Card key={report.id}>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Report #{report.id}</CardTitle>
                                <Badge className={report.status === "blacklisted" ? "bg-red-500" : "bg-yellow-500"}>
                                  {report.status === "blacklisted" ? "Blacklisted" : "Under Review"}
                                </Badge>
                              </div>
                              <CardDescription>
                                Reported on {new Date(report.date).toLocaleDateString()}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="flex items-center gap-3 mb-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <span className="font-medium">{report.customer.name}</span>
                                  <span className="text-sm text-muted-foreground ml-2">({report.customer.id})</span>
                                </div>
                              </div>
                              <p className="text-sm">{report.reason}</p>
                              <div className="mt-2 text-sm text-muted-foreground">
                                {report.evidenceCount} evidence items provided
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" size="sm" className="w-full">
                                View Details
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-md border p-4 text-center text-muted-foreground">
                        You haven't submitted any reports yet.
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Report Dialog */}
            {selectedCustomerData && (
              <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Report Rider</DialogTitle>
                    <DialogDescription>
                      Submit a report about problematic behavior or policy violations
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedCustomerData.avatar} alt={selectedCustomerData.name} />
                        <AvatarFallback>{selectedCustomerData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{selectedCustomerData.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedCustomerData.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Customer ID</div>
                        <div className="font-mono text-xs">{selectedCustomerData.id}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger id="report-type">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="damage">Equipment Damage</SelectItem>
                          <SelectItem value="payment">Payment Dispute</SelectItem>
                          <SelectItem value="behavior">Abusive Behavior</SelectItem>
                          <SelectItem value="fraud">Fraudulent Activity</SelectItem>
                          <SelectItem value="theft">Theft</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-reason">Detailed Description</Label>
                      <Textarea
                        id="report-reason"
                        placeholder="Provide a detailed description of the incident..."
                        rows={5}
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Evidence</Label>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="relative rounded-md border p-2">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                              <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-xs truncate">{file}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-background shadow"
                              onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="aspect-video flex flex-col items-center justify-center gap-1 border-dashed"
                          onClick={handleFileUpload}
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-xs">Upload Evidence</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Upload photos, videos, or documents that support your report. This evidence will be reviewed by
                        our team.
                      </p>
                    </div>

                    <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-200">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">Important Notice</span>
                      </div>
                      <p className="mt-1">
                        Submitting a false report is a violation of our terms of service. Please ensure that all
                        information provided is accurate and truthful. Reports are reviewed by our team before any
                        action is taken.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitReport} disabled={!reportType || !reportReason.trim() || isSubmitting}>
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Flag className="mr-2 h-4 w-4" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-4">
            <div className="grid gap-4">
              {reportedIncidents.map((incident) => (
                <Card key={incident.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full p-1 ${
                            incident.status === "Blacklisted"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                          }`}
                        >
                          {incident.status === "Blacklisted" ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <CardTitle className="text-base">{incident.type}</CardTitle>
                      </div>
                      <Badge className={incident.status === "Blacklisted" ? "bg-red-500" : "bg-yellow-500"}>
                        {incident.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {incident.id} • {incident.location} • {new Date(incident.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-red-100 text-red-800">
                          {incident.riderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{incident.riderName}</div>
                    </div>
                    <p className="text-sm">{incident.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="text-sm text-muted-foreground">Evidence: {incident.evidence.join(", ")}</div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedIncident(incident.id)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Incident Details Dialog */}
            {selectedIncidentData && (
              <Dialog open={!!selectedIncident} onOpenChange={(open) => !open && setSelectedIncident(null)}>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Incident Details</DialogTitle>
                    <DialogDescription>
                      {selectedIncidentData.id} • {selectedIncidentData.type}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-base bg-red-100 text-red-800">
                            {selectedIncidentData.riderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-bold">{selectedIncidentData.riderName}</h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={selectedIncidentData.status === "Blacklisted" ? "bg-red-500" : "bg-yellow-500"}
                            >
                              {selectedIncidentData.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Reported on {new Date(selectedIncidentData.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Location</div>
                        <div>{selectedIncidentData.location}</div>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Incident Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{selectedIncidentData.description}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Evidence</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedIncidentData.evidence.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="flex items-center gap-2 rounded-md bg-blue-50 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                      <Info className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Next Steps</p>
                        <p className="text-sm">
                          {selectedIncidentData.status === "Blacklisted"
                            ? "This rider has been added to the network-wide blacklist. All ScootScoot partners will be alerted if this rider attempts to rent."
                            : "This incident is under review by our team. You'll be notified when a decision is made."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedIncident(null)}>
                      Close
                    </Button>
                    {selectedIncidentData.status === "Under Review" && (
                      <Button className="bg-red-500 hover:bg-red-600">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Update Report
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ShopLayout>
  )
}
