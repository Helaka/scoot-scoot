"use client"

import { useState } from "react"
import { ShopLayout } from "./shop-layout"
import {
  Shield,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Download,
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
import { Textarea } from "@/components/ui/textarea"

export function ShopInsurance() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddClaimOpen, setIsAddClaimOpen] = useState(false)
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("policies")

  // Demo data
  const insurancePolicies = [
    {
      id: "POL-1001",
      name: "Fleet Comprehensive Coverage",
      provider: "SafeScoot Insurance",
      coverageType: "comprehensive",
      premium: 1200,
      renewalDate: "2024-01-15",
      status: "active",
      scootersCovered: 12,
      deductible: 500,
    },
    {
      id: "POL-1002",
      name: "Third-Party Liability",
      provider: "Urban Mobility Insurance",
      coverageType: "liability",
      premium: 800,
      renewalDate: "2023-12-10",
      status: "active",
      scootersCovered: 15,
      deductible: 250,
    },
    {
      id: "POL-1003",
      name: "Theft Protection",
      provider: "SafeScoot Insurance",
      coverageType: "theft",
      premium: 600,
      renewalDate: "2023-09-22",
      status: "active",
      scootersCovered: 15,
      deductible: 300,
    },
  ]

  const insuranceClaims = [
    {
      id: "CLM-1001",
      policyId: "POL-1001",
      scooterId: "SC-003",
      claimDate: "2023-05-15",
      incidentDate: "2023-05-10",
      description: "Scooter damaged in collision with car",
      amount: 850,
      status: "approved",
      documents: ["incident-report.pdf", "damage-photos.zip"],
    },
    {
      id: "CLM-1002",
      policyId: "POL-1003",
      scooterId: "SC-007",
      claimDate: "2023-06-01",
      incidentDate: "2023-05-28",
      description: "Scooter stolen from downtown location",
      amount: 1200,
      status: "pending",
      documents: ["police-report.pdf", "theft-declaration.pdf"],
    },
    {
      id: "CLM-1003",
      policyId: "POL-1001",
      scooterId: "SC-005",
      claimDate: "2023-04-20",
      incidentDate: "2023-04-18",
      description: "Water damage to electrical components",
      amount: 450,
      status: "rejected",
      documents: ["damage-report.pdf", "repair-estimate.pdf"],
    },
    {
      id: "CLM-1004",
      policyId: "POL-1002",
      scooterId: "SC-009",
      claimDate: "2023-06-05",
      incidentDate: "2023-06-03",
      description: "Customer injured due to brake failure",
      amount: 2500,
      status: "pending",
      documents: ["medical-report.pdf", "incident-statement.pdf"],
    },
  ]

  const filteredClaims = insuranceClaims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.scooterId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || claim.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "expired":
        return (
          <Badge variant="outline" className="border-red-200 text-red-500">
            Expired
          </Badge>
        )
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "approved":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="border-red-200 text-red-500">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCoverageTypeBadge = (type: string) => {
    switch (type) {
      case "comprehensive":
        return <Badge className="bg-blue-500">Comprehensive</Badge>
      case "liability":
        return <Badge className="bg-purple-500">Liability</Badge>
      case "theft":
        return <Badge className="bg-indigo-500">Theft</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const selectedClaimData = selectedClaim ? insuranceClaims.find((c) => c.id === selectedClaim) : null

  const getRelatedPolicy = (policyId: string) => {
    return insurancePolicies.find((p) => p.id === policyId)
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Insurance</h1>
          <p className="text-muted-foreground">Manage your insurance policies and claims.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insurancePolicies.filter((p) => p.status === "active").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {insurancePolicies.filter((p) => p.status === "active").reduce((sum, p) => sum + p.scootersCovered, 0)}{" "}
                Scooters
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Premium</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {insurancePolicies
                  .filter((p) => p.status === "active")
                  .reduce((sum, p) => sum + p.premium, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {insuranceClaims.filter((c) => c.status === "pending").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="policies" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="policies">Insurance Policies</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="mt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search policies..."
                  className="w-full"
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Policy
              </Button>
            </div>

            {/* Policies List */}
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {insurancePolicies.map((policy) => (
                <Card key={policy.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono">
                        {policy.id}
                      </Badge>
                      {getStatusBadge(policy.status)}
                    </div>
                    <CardTitle className="mt-2">{policy.name}</CardTitle>
                    <CardDescription>{policy.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Coverage Type:</span>
                      <span>{getCoverageTypeBadge(policy.coverageType)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Scooters Covered:</span>
                      <span>{policy.scootersCovered}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Premium:</span>
                      <span className="font-medium">${policy.premium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Deductible:</span>
                      <span>${policy.deductible}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Renewal Date:</span>
                      <span>{new Date(policy.renewalDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Shield className="mr-2 h-4 w-4" />
                      File Claim
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="claims" className="mt-6">
            {/* Actions and Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search claims..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Claims</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isAddClaimOpen} onOpenChange={setIsAddClaimOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      File New Claim
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>File New Insurance Claim</DialogTitle>
                      <DialogDescription>Enter the details of the insurance claim.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="policy" className="text-right">
                          Policy
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select policy" />
                          </SelectTrigger>
                          <SelectContent>
                            {insurancePolicies.map((policy) => (
                              <SelectItem key={policy.id} value={policy.id}>
                                {policy.name} ({policy.id})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="scooter" className="text-right">
                          Scooter
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select scooter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sc001">SC-001 (Lime S3)</SelectItem>
                            <SelectItem value="sc002">SC-002 (Xiaomi Pro 2)</SelectItem>
                            <SelectItem value="sc003">SC-003 (Segway Ninebot)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="incident-date" className="text-right">
                          Incident Date
                        </Label>
                        <Input id="incident-date" type="date" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="claim-amount" className="text-right">
                          Claim Amount
                        </Label>
                        <Input id="claim-amount" type="number" placeholder="0.00" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right pt-2">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the incident in detail..."
                          className="col-span-3"
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="documents" className="text-right">
                          Documents
                        </Label>
                        <Input id="documents" type="file" multiple className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddClaimOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddClaimOpen(false)}>Submit Claim</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Claims List */}
            <div className="mt-6 rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-2">Claim ID</div>
                <div className="col-span-2">Scooter</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1"></div>
              </div>
              <div className="divide-y">
                {filteredClaims.length > 0 ? (
                  filteredClaims.map((claim) => (
                    <div key={claim.id} className="grid grid-cols-12 items-center p-4">
                      <div className="col-span-2 font-medium">{claim.id}</div>
                      <div className="col-span-2">{claim.scooterId}</div>
                      <div className="col-span-3 truncate" title={claim.description}>
                        {claim.description}
                      </div>
                      <div className="col-span-2">${claim.amount.toLocaleString()}</div>
                      <div className="col-span-2">{getStatusBadge(claim.status)}</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedClaim(claim.id)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Documents</DropdownMenuItem>
                            {claim.status === "pending" && (
                              <DropdownMenuItem className="text-red-600">Cancel Claim</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No claims found matching your filters.</div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Claim Details Dialog */}
        {selectedClaimData && (
          <Dialog open={!!selectedClaim} onOpenChange={(open) => !open && setSelectedClaim(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Claim Details</DialogTitle>
                <DialogDescription>Detailed information about claim {selectedClaimData.id}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="font-mono">
                    {selectedClaimData.id}
                  </Badge>
                  {getStatusBadge(selectedClaimData.status)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Claim Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Scooter ID:</span>
                        <span>{selectedClaimData.scooterId}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Claim Date:</span>
                        <span>{new Date(selectedClaimData.claimDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Incident Date:</span>
                        <span>{new Date(selectedClaimData.incidentDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Claim Amount:</span>
                        <span className="font-medium">${selectedClaimData.amount.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Policy Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {getRelatedPolicy(selectedClaimData.policyId) && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Policy ID:</span>
                            <span>{selectedClaimData.policyId}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Policy Name:</span>
                            <span>{getRelatedPolicy(selectedClaimData.policyId)?.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Provider:</span>
                            <span>{getRelatedPolicy(selectedClaimData.policyId)?.provider}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Coverage Type:</span>
                            <span>
                              {getCoverageTypeBadge(getRelatedPolicy(selectedClaimData.policyId)?.coverageType || "")}
                            </span>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Incident Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedClaimData.description}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedClaimData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md border p-2">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{doc}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {selectedClaimData.status === "pending" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Claim Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">Pending Review</p>
                          <p className="text-sm text-muted-foreground">
                            Your claim is being reviewed by the insurance provider
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <p className="text-sm text-muted-foreground">Expected response within 5-7 business days</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedClaim(null)}>
                  Close
                </Button>
                {selectedClaimData.status === "pending" && <Button variant="destructive">Cancel Claim</Button>}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Upcoming Renewals */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Upcoming Renewals</CardTitle>
            <CardDescription>Insurance policies due for renewal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insurancePolicies
                .filter((policy) => {
                  const renewalDate = new Date(policy.renewalDate)
                  const now = new Date()
                  const diffTime = renewalDate.getTime() - now.getTime()
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                  return diffDays <= 90 // Show policies renewing in the next 90 days
                })
                .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
                .map((policy) => {
                  const renewalDate = new Date(policy.renewalDate)
                  const now = new Date()
                  const diffTime = renewalDate.getTime() - now.getTime()
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                  return (
                    <div key={policy.id} className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <h3 className="font-medium">{policy.name}</h3>
                        <p className="text-sm text-muted-foreground">{policy.provider}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Renews in {diffDays} days</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(policy.renewalDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="ml-auto">
              View All Policies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ShopLayout>
  )
}

export default ShopInsurance
