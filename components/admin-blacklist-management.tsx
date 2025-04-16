"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "./admin-layout"
import {
  Search,
  Filter,
  AlertTriangle,
  Shield,
  UserX,
  Clock,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Flag,
  Mail,
  Phone,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

// Mock data for blacklisted riders
const mockBlacklistedRiders = [
  {
    id: "BL001",
    rider: {
      id: "R1234",
      name: "James Wilson",
      email: "james.wilson@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "blacklisted",
    reportedBy: "Downtown Scooters",
    reportDate: "2023-10-15",
    reviewDate: "2023-10-17",
    reason: "Damaged equipment and refused to pay",
    evidenceCount: 3,
    severity: "high",
    notes: "Multiple incidents reported by different shops",
  },
  {
    id: "BL002",
    rider: {
      id: "R2345",
      name: "Emma Thompson",
      email: "emma.thompson@example.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "under_review",
    reportedBy: "Beach Riders Co.",
    reportDate: "2023-10-20",
    reviewDate: null,
    reason: "Provided false identification",
    evidenceCount: 1,
    severity: "medium",
    notes: "Awaiting additional verification",
  },
  {
    id: "BL003",
    rider: {
      id: "R3456",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "blacklisted",
    reportedBy: "City Scooters Inc.",
    reportDate: "2023-09-28",
    reviewDate: "2023-10-02",
    reason: "Theft of equipment",
    evidenceCount: 5,
    severity: "critical",
    notes: "Police report filed",
  },
  {
    id: "BL004",
    rider: {
      id: "R4567",
      name: "Sophia Garcia",
      email: "sophia.garcia@example.com",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "cleared",
    reportedBy: "Urban Mobility",
    reportDate: "2023-10-05",
    reviewDate: "2023-10-12",
    reason: "Disputed payment",
    evidenceCount: 2,
    severity: "low",
    notes: "Issue resolved, payment received",
  },
  {
    id: "BL005",
    rider: {
      id: "R5678",
      name: "Daniel Martinez",
      email: "daniel.martinez@example.com",
      phone: "+1 (555) 567-8901",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "blacklisted",
    reportedBy: "Scoot & Go",
    reportDate: "2023-10-10",
    reviewDate: "2023-10-14",
    reason: "Aggressive behavior towards staff",
    evidenceCount: 4,
    severity: "high",
    notes: "Multiple witnesses",
  },
  {
    id: "BL006",
    rider: {
      id: "R6789",
      name: "Olivia Johnson",
      email: "olivia.johnson@example.com",
      phone: "+1 (555) 678-9012",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "under_review",
    reportedBy: "Coastal Scooters",
    reportDate: "2023-10-22",
    reviewDate: null,
    reason: "Repeated late returns",
    evidenceCount: 3,
    severity: "medium",
    notes: "Reviewing rental history",
  },
]

// Mock data for recent reports
const mockRecentReports = [
  {
    id: "RPT001",
    rider: "Emma Thompson",
    shop: "Beach Riders Co.",
    date: "2023-10-20",
    type: "Identification Fraud",
    status: "under_review",
  },
  {
    id: "RPT002",
    rider: "Olivia Johnson",
    shop: "Coastal Scooters",
    date: "2023-10-22",
    type: "Policy Violation",
    status: "under_review",
  },
  {
    id: "RPT003",
    rider: "William Davis",
    shop: "Mountain Scooters",
    date: "2023-10-23",
    type: "Payment Dispute",
    status: "new",
  },
]

export default function AdminBlacklistManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [filteredRiders, setFilteredRiders] = useState(mockBlacklistedRiders)
  const [selectedRider, setSelectedRider] = useState<string | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewDecision, setReviewDecision] = useState<string | null>(null)

  // Apply filters
  const applyFilters = () => {
    let result = [...mockBlacklistedRiders]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.rider.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter)
    }

    // Apply severity filter
    if (severityFilter !== "all") {
      result = result.filter((item) => item.severity === severityFilter)
    }

    setFilteredRiders(result)
  }

  // Handle search and filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setTimeout(applyFilters, 300)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setTimeout(applyFilters, 300)
  }

  const handleSeverityFilterChange = (value: string) => {
    setSeverityFilter(value)
    setTimeout(applyFilters, 300)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "blacklisted":
        return (
          <Badge className="bg-red-500">
            <UserX className="mr-1 h-3 w-3" /> Blacklisted
          </Badge>
        )
      case "under_review":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="mr-1 h-3 w-3" /> Under Review
          </Badge>
        )
      case "cleared":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="mr-1 h-3 w-3" /> Cleared
          </Badge>
        )
      case "new":
        return (
          <Badge className="bg-blue-500">
            <AlertCircle className="mr-1 h-3 w-3" /> New Report
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-600">Critical</Badge>
      case "high":
        return <Badge className="bg-red-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get selected rider data
  const selectedRiderData = selectedRider ? mockBlacklistedRiders.find((rider) => rider.id === selectedRider) : null

  // Handle review submission
  const handleReviewSubmit = () => {
    // In a real app, this would update the backend
    console.log("Review submitted:", { riderId: selectedRider, decision: reviewDecision, notes: reviewNotes })
    setIsReviewDialogOpen(false)
    setReviewNotes("")
    setReviewDecision(null)
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Rider Blacklist Management</h1>
          <p className="text-muted-foreground">
            Manage reported riders, review cases, and maintain the platform-wide blacklist
          </p>
        </div>

        <Tabs defaultValue="blacklist">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="blacklist" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Blacklist</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <FileText className="mr-2 h-4 w-4" />
                Export List
              </Button>
            </div>
          </div>

          <TabsContent value="blacklist" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search riders..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                      <SelectTrigger className="h-9 w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="blacklisted">Blacklisted</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="cleared">Cleared</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={severityFilter} onValueChange={handleSeverityFilterChange}>
                      <SelectTrigger className="h-9 w-[150px]">
                        <SelectValue placeholder="Filter by severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
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
                        <TableHead>Rider</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRiders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No riders found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRiders.map((rider) => (
                          <TableRow key={rider.id}>
                            <TableCell>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={rider.rider.avatar} alt={rider.rider.name} />
                                <AvatarFallback>{rider.rider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{rider.rider.name}</div>
                              <div className="text-sm text-muted-foreground">{rider.rider.email}</div>
                            </TableCell>
                            <TableCell>{getStatusBadge(rider.status)}</TableCell>
                            <TableCell>{rider.reportedBy}</TableCell>
                            <TableCell>
                              <div className="max-w-[200px] truncate" title={rider.reason}>
                                {rider.reason}
                              </div>
                            </TableCell>
                            <TableCell>{getSeverityBadge(rider.severity)}</TableCell>
                            <TableCell>{new Date(rider.reportDate).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => setSelectedRider(rider.id)}>
                                    View Details
                                  </DropdownMenuItem>
                                  {rider.status === "under_review" && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedRider(rider.id)
                                        setIsReviewDialogOpen(true)
                                      }}
                                    >
                                      Review Case
                                    </DropdownMenuItem>
                                  )}
                                  {rider.status === "blacklisted" && (
                                    <DropdownMenuItem className="text-yellow-600">Temporary Unblock</DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Contact Rider</DropdownMenuItem>
                                  <DropdownMenuItem>Contact Shop</DropdownMenuItem>
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
                  Showing <strong>{filteredRiders.length}</strong> of <strong>{mockBlacklistedRiders.length}</strong>{" "}
                  riders
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

          <TabsContent value="reports" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>New and recently submitted rider reports from shops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentReports.map((report) => (
                    <div key={report.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-medium">
                            Report #{report.id}: {report.rider}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">{report.date}</p>
                            {getStatusBadge(report.status)}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{report.type}</p>
                        <p className="text-sm text-muted-foreground">Reported by: {report.shop}</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                          <Button size="sm" variant="outline">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Reports
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Rider Details Dialog */}
        {selectedRiderData && (
          <Dialog
            open={!!selectedRider && !isReviewDialogOpen}
            onOpenChange={(open) => !open && setSelectedRider(null)}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Rider Details</DialogTitle>
                <DialogDescription>Detailed information about reported rider</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedRiderData.rider.avatar} alt={selectedRiderData.rider.name} />
                    <AvatarFallback>{selectedRiderData.rider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selectedRiderData.rider.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {getStatusBadge(selectedRiderData.status)}
                      {getSeverityBadge(selectedRiderData.severity)}
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>ID: {selectedRiderData.rider.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedRiderData.rider.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedRiderData.rider.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Report Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Reported By:</span>
                        <span className="text-sm font-medium">{selectedRiderData.reportedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Report Date:</span>
                        <span className="text-sm font-medium">
                          {new Date(selectedRiderData.reportDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Review Date:</span>
                        <span className="text-sm font-medium">
                          {selectedRiderData.reviewDate
                            ? new Date(selectedRiderData.reviewDate).toLocaleDateString()
                            : "Pending"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Evidence Provided:</span>
                        <span className="text-sm font-medium">{selectedRiderData.evidenceCount} items</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Reason for Report</h4>
                    <div className="rounded-md border p-3 text-sm">{selectedRiderData.reason}</div>
                    <h4 className="text-sm font-medium text-muted-foreground mt-4 mb-2">Notes</h4>
                    <div className="rounded-md border p-3 text-sm">{selectedRiderData.notes}</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Evidence</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {Array.from({ length: selectedRiderData.evidenceCount }).map((_, index) => (
                      <div key={index} className="rounded-md border p-2">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-xs font-medium">Evidence #{index + 1}</p>
                        <p className="text-xs text-muted-foreground">Uploaded by {selectedRiderData.reportedBy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                <Button variant="outline" onClick={() => setSelectedRider(null)}>
                  Close
                </Button>
                {selectedRiderData.status === "under_review" && (
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setIsReviewDialogOpen(true)
                        setReviewDecision("blacklist")
                      }}
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Blacklist Rider
                    </Button>
                    <Button
                      variant="default"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => {
                        setIsReviewDialogOpen(true)
                        setReviewDecision("clear")
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Clear Rider
                    </Button>
                  </div>
                )}
                {selectedRiderData.status === "blacklisted" && (
                  <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-50">
                    Temporary Unblock
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Review Dialog */}
        {selectedRiderData && (
          <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {reviewDecision === "blacklist"
                    ? "Confirm Blacklisting"
                    : reviewDecision === "clear"
                      ? "Confirm Clearing"
                      : "Review Case"}
                </DialogTitle>
                <DialogDescription>
                  {reviewDecision === "blacklist"
                    ? "You are about to blacklist this rider from all shops on the platform."
                    : reviewDecision === "clear"
                      ? "You are about to clear this rider from the blacklist."
                      : "Review this case and make a decision."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedRiderData.rider.avatar} alt={selectedRiderData.rider.name} />
                    <AvatarFallback>{selectedRiderData.rider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedRiderData.rider.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedRiderData.rider.id}</p>
                  </div>
                </div>

                {!reviewDecision && (
                  <div className="space-y-2">
                    <Label>Decision</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className={`justify-start ${
                          reviewDecision === "blacklist"
                            ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800"
                            : ""
                        }`}
                        onClick={() => setReviewDecision("blacklist")}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Blacklist Rider
                      </Button>
                      <Button
                        variant="outline"
                        className={`justify-start ${
                          reviewDecision === "clear"
                            ? "bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800"
                            : ""
                        }`}
                        onClick={() => setReviewDecision("clear")}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Clear Rider
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="review-notes">Review Notes</Label>
                  <Textarea
                    id="review-notes"
                    placeholder="Enter your review notes and justification for the decision..."
                    rows={5}
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                  />
                </div>

                {reviewDecision === "blacklist" && (
                  <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Important Notice</span>
                    </div>
                    <p className="mt-1">
                      Blacklisting a rider will prevent them from making bookings with any shop on the platform. This
                      action should only be taken when there is clear evidence of policy violations, fraud, or abusive
                      behavior.
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsReviewDialogOpen(false)
                    setReviewDecision(null)
                    setReviewNotes("")
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={reviewDecision === "blacklist" ? "destructive" : "default"}
                  className={reviewDecision === "clear" ? "bg-green-500 hover:bg-green-600" : ""}
                  onClick={handleReviewSubmit}
                  disabled={!reviewDecision || !reviewNotes.trim()}
                >
                  {reviewDecision === "blacklist"
                    ? "Confirm Blacklist"
                    : reviewDecision === "clear"
                      ? "Confirm Clearance"
                      : "Submit Review"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  )
}
