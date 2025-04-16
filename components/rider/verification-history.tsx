"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Clock, Eye, Download } from "lucide-react"

// Mock data for verification history
const mockVerificationHistory = [
  {
    id: "ver-1",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    status: "active",
    method: "shop",
    verifiedBy: "Beach Scooters",
    expiresAt: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000), // 335 days from now
    documentUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ver-2",
    date: new Date(Date.now() - 395 * 24 * 60 * 60 * 1000), // 395 days ago
    status: "expired",
    method: "self",
    verifiedBy: null,
    expiresAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    documentUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ver-3",
    date: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000), // 400 days ago
    status: "rejected",
    method: "self",
    verifiedBy: null,
    expiresAt: null,
    documentUrl: "/placeholder.svg?height=400&width=600",
  },
]

export function VerificationHistory() {
  const [selectedVerification, setSelectedVerification] = useState<(typeof mockVerificationHistory)[0] | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            Active
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
            <Clock className="h-3 w-3" />
            Expired
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 gap-1">
            <AlertCircle className="h-3 w-3" />
            Unknown
          </Badge>
        )
    }
  }

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "shop":
        return "Verified at Shop"
      case "self":
        return "Self-Verified"
      default:
        return "Unknown Method"
    }
  }

  const handleViewDetails = (verification: (typeof mockVerificationHistory)[0]) => {
    setSelectedVerification(verification)
  }

  const handleCloseDetails = () => {
    setSelectedVerification(null)
  }

  const handleDownloadCertificate = (id: string) => {
    // In a real implementation, this would download a verification certificate
    alert(`Downloading certificate for verification ${id}...`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification History</CardTitle>
        <CardDescription>Your account verification history and status</CardDescription>
      </CardHeader>

      <CardContent>
        {selectedVerification ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Verification Details</h3>
              <Button variant="ghost" size="sm" onClick={handleCloseDetails}>
                Back to List
              </Button>
            </div>

            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <img
                src={selectedVerification.documentUrl || "/placeholder.svg"}
                alt="Verification document"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(selectedVerification.status)}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Verification Date</span>
                <span className="text-sm font-medium">{selectedVerification.date.toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium">{getMethodLabel(selectedVerification.method)}</span>
              </div>

              {selectedVerification.verifiedBy && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Verified By</span>
                  <span className="text-sm font-medium">{selectedVerification.verifiedBy}</span>
                </div>
              )}

              {selectedVerification.expiresAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expires On</span>
                  <span className="text-sm font-medium">{selectedVerification.expiresAt.toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {selectedVerification.status === "active" && (
              <Button className="w-full" onClick={() => handleDownloadCertificate(selectedVerification.id)}>
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {mockVerificationHistory.map((verification) => (
              <div key={verification.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(verification.status)}
                    <span className="text-sm font-medium">{verification.date.toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getMethodLabel(verification.method)}
                    {verification.verifiedBy && ` by ${verification.verifiedBy}`}
                  </p>
                </div>

                <Button variant="ghost" size="icon" onClick={() => handleViewDetails(verification)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {mockVerificationHistory.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No verification history found</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
