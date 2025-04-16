"use client"

import { useState } from "react"
import { AdminLayout } from "./admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import {
  Search,
  Filter,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  AlertCircle,
  Download,
  Eye,
  FileText,
} from "lucide-react"

// Mock data for blacklisted riders (same as shop-blacklist.tsx)
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
    reviewedBy: "Admin Team",
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
    reviewedBy: "System Admin",
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
    reviewedBy: null,
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
    reviewedBy: null,
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
    reviewedBy: "Admin Team",
    rejectionReason: "Insufficient evidence, damage appears to be pre-existing",
  },
]

// Mock data for blacklist statistics
const blacklistStats = {
  totalReports: 156,
  pendingReports: 12,
  approvedReports: 98,
  rejectedReports: 46,
  averageReviewTime: "1.2 days",
  reportsByShopType: [
    { name: "Urban Locations", value: 68 },
    { name: "Suburban Locations", value: 42 },
    { name: "Tourist Areas", value: 46 },
  ],
  reportsByReason: [
    { name: "Property Damage", value: 52 },
    { name: "Fraud", value: 38 },
    { name: "Theft/Theft Attempt", value: 24 },
    { name: "Abusive Behavior", value: 31 },
    { name: "Other", value: 11 },
  ],
}

export default function AdminBlacklist() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [reviewFilter, setReviewFilter] = useState("all")
  const [selectedRider, setSelectedRider] = useState<string | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewDecision, setReviewDecision] = useState<"approve" | "reject" | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  // Filter blacklisted riders based on search, status, and review status
  const filteredRiders = blacklistedRiders.filter((rider) => {
    const matchesSearch =
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.phone.includes(searchTerm) ||
      rider.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || rider.status === statusFilter
    const matchesReview = reviewFilter === "all" || rider.reviewStatus === reviewFilter

    return matchesSearch && matchesStatus && matchesReview
  })

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

  const handleReviewSubmit = () => {
    // In a real app, this would update the database
    setIsReviewDialogOpen(false)
    // Reset state
    setReviewDecision(null)
    setRejectionReason("")
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Blacklist Management</h1>
          <p className="text-muted-foreground">
            Review and manage rider blacklist reports from shops across the network.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blacklistStats.totalReports}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{blacklistStats.pendingReports}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{blacklistStats.approvedReports}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{blacklistStats.rejectedReports}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, email, ID..."
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
            <Select value={reviewFilter} onValueChange={setReviewFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by review" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="reports">
          <TabsList>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4 pt-4">
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
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                {rider.reviewStatus === "pending" && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedRider(rider.id)
                                      setIsReviewDialogOpen(true)
                                    }}
                                  >
                                    <Shield className="mr-2 h-4 w-4" />
                                    Review Report
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No reports found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Rider Details Dialog */}
            {selectedRiderData && (
              <Dialog
                open={!!selectedRider && !isReviewDialogOpen}
                onOpenChange={(open) => !open && setSelectedRider(null)}
              >
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Blacklist Report Details</DialogTitle>
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
                          {selectedRiderData.reviewedBy && (
                            <div>
                              <div className="text-sm font-medium">Reviewed By</div>
                              <div>{selectedRiderData.reviewedBy}</div>
                            </div>
                          )}
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

                    {selectedRiderData.reviewStatus === "pending" && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setSelectedRider(null)}>
                          Close
                        </Button>
                        <Button
                          className="bg-yellow-500 hover:bg-yellow-600"
                          onClick={() => setIsReviewDialogOpen(true)}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Review Report
                        </Button>
                      </div>
                    )}
                    {selectedRiderData.reviewStatus !== "pending" && (
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedRider(null)}>
                          Close
                        </Button>
                      </DialogFooter>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* Review Dialog */}
            {selectedRiderData && (
              <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Review Blacklist Report</DialogTitle>
                    <DialogDescription>
                      Review the report for {selectedRiderData.name} submitted by {selectedRiderData.reportedBy}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4 p-3 rounded-md bg-muted">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-red-100 text-red-800">
                          {selectedRiderData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedRiderData.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedRiderData.id}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Review Decision</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className={`flex items-center gap-2 ${
                            reviewDecision === "approve"
                              ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                              : ""
                          }`}
                          onClick={() => setReviewDecision("approve")}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className={`flex items-center gap-2 ${
                            reviewDecision === "reject"
                              ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                              : ""
                          }`}
                          onClick={() => setReviewDecision("reject")}
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>

                    {reviewDecision === "reject" && (
                      <div className="space-y-2">
                        <Label htmlFor="rejection-reason">Rejection Reason</Label>
                        <Textarea
                          id="rejection-reason"
                          placeholder="Explain why this report is being rejected..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          rows={4}
                        />
                      </div>
                    )}

                    {reviewDecision === "approve" && (
                      <div className="rounded-md bg-yellow-50 p-3 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Important Notice</p>
                            <p className="text-sm">
                              Approving this report will add this rider to the network-wide blacklist. They will be
                              unable to rent from any ScootScoot partner.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleReviewSubmit}
                      disabled={!reviewDecision || (reviewDecision === "reject" && !rejectionReason)}
                      className={
                        reviewDecision === "approve"
                          ? "bg-green-500 hover:bg-green-600"
                          : reviewDecision === "reject"
                            ? "bg-red-500 hover:bg-red-600"
                            : ""
                      }
                    >
                      Submit Review
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Blacklist Overview</CardTitle>
                  <CardDescription>Key metrics about the blacklist system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Total Reports</div>
                        <div className="text-2xl font-bold">{blacklistStats.totalReports}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Avg. Review Time</div>
                        <div className="text-2xl font-bold">{blacklistStats.averageReviewTime}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Report Status</div>
                      <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${(blacklistStats.approvedReports / blacklistStats.totalReports) * 100}%`,
                            float: "left",
                          }}
                        ></div>
                        <div
                          className="h-full bg-yellow-500"
                          style={{
                            width: `${(blacklistStats.pendingReports / blacklistStats.totalReports) * 100}%`,
                            float: "left",
                          }}
                        ></div>
                        <div
                          className="h-full bg-red-500"
                          style={{
                            width: `${(blacklistStats.rejectedReports / blacklistStats.totalReports) * 100}%`,
                            float: "left",
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Approved ({blacklistStats.approvedReports})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          <span>Pending ({blacklistStats.pendingReports})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>Rejected ({blacklistStats.rejectedReports})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reports by Reason</CardTitle>
                  <CardDescription>Breakdown of blacklist reports by reason</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blacklistStats.reportsByReason.map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.value}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{
                              width: `${(item.value / blacklistStats.totalReports) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reports by Shop Type</CardTitle>
                  <CardDescription>Distribution of reports across shop types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blacklistStats.reportsByShopType.map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.value}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${(item.value / blacklistStats.totalReports) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Effectiveness</CardTitle>
                  <CardDescription>Impact of the blacklist system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      <h3 className="font-medium">Positive Impact</h3>
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                        <li>42% reduction in reported incidents</li>
                        <li>68% of shops report improved customer experience</li>
                        <li>Estimated $156,000 in prevented damages</li>
                      </ul>
                    </div>
                    <div className="rounded-md bg-blue-50 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                      <h3 className="font-medium">System Usage</h3>
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                        <li>98% of shops actively use the system</li>
                        <li>Average response time to alerts: 45 seconds</li>
                        <li>12 prevented rental attempts this month</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
