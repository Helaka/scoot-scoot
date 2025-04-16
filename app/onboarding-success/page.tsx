"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Download, Share2 } from "lucide-react"
import { OnboardingService } from "@/services/onboarding-service"
import type { OnboardingSession } from "@/types/onboarding-types"

export default function OnboardingSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [session, setSession] = useState<OnboardingSession | null>(null)

  useEffect(() => {
    const id = searchParams?.get("sessionId")
    if (id) {
      setSessionId(id)
      // In a real implementation, we would fetch the session from the backend
      // For now, we'll simulate this with our service
      const sessionData = OnboardingService.getSession(id)
      setSession(sessionData)
    }
  }, [searchParams])

  const handleFindScooters = () => {
    router.push("/rider-find-scooters")
  }

  const handleDownloadVerification = () => {
    // In a real implementation, this would download a verification certificate
    alert("Downloading verification certificate...")
  }

  const handleShareVerification = () => {
    // In a real implementation, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: "ScootScoot Verification",
        text: "I just verified my account on ScootScoot!",
        url: window.location.href,
      })
    } else {
      alert("Sharing is not supported on this device")
    }
  }

  return (
    <div className="container max-w-md mx-auto py-10">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Verification Complete!</CardTitle>
          <CardDescription>Your account has been successfully verified</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-medium">Verification Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification ID:</span>
                <span className="font-medium">{sessionId?.substring(0, 8) || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verified On:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification Method:</span>
                <span className="font-medium">ID + Face</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">What's Next?</h3>
            <p className="text-sm text-muted-foreground">
              You can now rent scooters from any ScootScoot location or partner shop. Your verification is valid for 12
              months.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-1" onClick={handleDownloadVerification}>
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
            <Button variant="outline" className="flex-1 gap-1" onClick={handleShareVerification}>
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full gap-2" onClick={handleFindScooters}>
            Find Scooters Near Me
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
