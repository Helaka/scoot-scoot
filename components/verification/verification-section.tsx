"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertCircle, ChevronRight, CheckCircle, Clock, XCircle } from "lucide-react"
import { useVerification, type VerificationStatus } from "./verification-context"

interface VerificationSectionProps {
  compact?: boolean
}

export function VerificationSection({ compact = false }: VerificationSectionProps) {
  const router = useRouter()
  const { verificationData, isLoading, startVerification } = useVerification()

  const { status, permitId, expiryDate, permitType } = verificationData

  const handleViewPermit = () => {
    router.push(`/rider-drp/view?permitId=${permitId}`)
  }

  const handleApplyForPermit = () => {
    router.push("/rider-drp/application")
  }

  const handleStartVerification = async () => {
    await startVerification()
    router.push("/direct-onboarding")
  }

  const formatDate = (date?: Date) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "expired":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-black">Pending</Badge>
      case "expired":
        return <Badge className="bg-orange-500">Expired</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      default:
        return <Badge className="bg-yellow-500 text-black">Unverified</Badge>
    }
  }

  return (
    <Card className={compact ? "border-yellow-200 dark:border-yellow-800/30" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-yellow-500" />
            <CardTitle>{compact ? "Verification Status" : "Digital Ride Permit"}</CardTitle>
          </div>
          {getStatusBadge(status)}
        </div>
        <CardDescription>
          {compact ? "Your account verification status" : "A digital certificate that verifies your riding credentials"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "verified" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm text-muted-foreground">Permit ID</span>
              <span className="text-sm font-medium">{permitId?.substring(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="text-sm font-medium capitalize">{permitType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Valid Until</span>
              <span className="text-sm font-medium">{formatDate(expiryDate)}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-4 space-y-3">
            {getStatusIcon(status)}
            <div>
              <h3 className="font-medium">
                {status === "pending" ? "Verification in Progress" : "No Digital Ride Permit"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {status === "pending"
                  ? "Your verification is being processed. This usually takes 1-2 business days."
                  : "Get a Digital Ride Permit to enhance your riding experience and avoid issues with rental shops."}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {status === "verified" ? (
          <Button onClick={handleViewPermit} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            View Permit
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : status === "pending" ? (
          <Button disabled className="w-full">
            Verification in Progress
            <Clock className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={status === "rejected" || status === "expired" ? handleApplyForPermit : handleStartVerification}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {status === "rejected" || status === "expired" ? "Apply for Digital Ride Permit" : "Start Verification"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
