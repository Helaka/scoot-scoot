"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Clock, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface VerificationSectionProps {
  status?: "unverified" | "pending" | "verified" | "expired" | "rejected"
  expiryDate?: Date
}

export function VerificationSection({ status = "unverified", expiryDate }: VerificationSectionProps) {
  const router = useRouter()

  const getStatusBadge = () => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 gap-1">
            <AlertTriangle className="h-3 w-3" />
            Expired
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 gap-1">
            <AlertTriangle className="h-3 w-3" />
            Unverified
          </Badge>
        )
    }
  }

  const getStatusAlert = () => {
    switch (status) {
      case "verified":
        return (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Verified Account</AlertTitle>
            <AlertDescription className="text-green-700">
              Your account is verified and you can rent scooters.
              {expiryDate && ` Your verification expires on ${expiryDate.toLocaleDateString()}.`}
            </AlertDescription>
          </Alert>
        )
      case "pending":
        return (
          <Alert className="bg-yellow-50 border-yellow-200">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Verification in Progress</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Your verification is being processed. This usually takes 1-2 business days.
            </AlertDescription>
          </Alert>
        )
      case "rejected":
        return (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Verification Rejected</AlertTitle>
            <AlertDescription>Your verification was rejected. Please try again with valid documents.</AlertDescription>
          </Alert>
        )
      case "expired":
        return (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Verification Expired</AlertTitle>
            <AlertDescription>
              Your verification has expired. Please renew it to continue renting scooters.
            </AlertDescription>
          </Alert>
        )
      default:
        return (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Account Not Verified</AlertTitle>
            <AlertDescription>You need to verify your account before you can rent scooters.</AlertDescription>
          </Alert>
        )
    }
  }

  const handleStartVerification = () => {
    router.push("/direct-onboarding")
  }

  const handleRenewVerification = () => {
    router.push("/direct-onboarding")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>Your account verification status</CardDescription>
        </div>
        {getStatusBadge()}
      </CardHeader>

      <CardContent className="space-y-4">
        {getStatusAlert()}

        {status === "verified" && (
          <div className="rounded-md border p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Verification Method</span>
                <span className="text-sm font-medium">ID + Face</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Verified On</span>
                <span className="text-sm font-medium">
                  {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>

              {expiryDate && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expires On</span>
                  <span className="text-sm font-medium">{expiryDate.toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {(status === "unverified" || status === "rejected") && (
          <Button className="w-full gap-2" onClick={handleStartVerification}>
            Start Verification
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        {status === "expired" && (
          <Button className="w-full gap-2" onClick={handleRenewVerification}>
            Renew Verification
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
