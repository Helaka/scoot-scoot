"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface VerificationWidgetProps {
  status?: "unverified" | "pending" | "verified" | "expired" | "rejected"
}

export function VerificationWidget({ status = "unverified" }: VerificationWidgetProps) {
  const router = useRouter()

  const handleAction = () => {
    if (status === "verified") {
      router.push("/rider-profile")
    } else {
      router.push("/direct-onboarding")
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {status === "verified" ? (
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          ) : (
            <div className="rounded-full bg-yellow-100 p-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Account Verification</h3>
              {status === "verified" ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Action Needed
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              {status === "verified"
                ? "Your account is verified and you can rent scooters."
                : "You need to verify your account before you can rent scooters."}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant={status === "verified" ? "outline" : "default"} className="w-full gap-2" onClick={handleAction}>
          {status === "verified" ? "View Details" : "Verify Now"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
