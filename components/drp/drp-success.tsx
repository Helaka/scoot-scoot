"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import DRPPreview from "./drp-preview"

interface DRPSuccessProps {
  permitId: string
}

export default function DRPSuccess({ permitId }: DRPSuccessProps) {
  const router = useRouter()
  const [showFullPreview, setShowFullPreview] = useState(false)

  // In a real app, we would fetch the permit data from the API
  // For now, we'll use mock data
  const permitData = {
    id: permitId,
    fullName: "John Doe",
    dateOfBirth: "1990-01-01",
    nationality: "United States",
    licenseNumber: "DL12345678",
    issuedCountry: "United States",
    expiryDate: "2030-01-01",
    issueDate: new Date().toISOString(),
    photoUrl: "/placeholder.svg?height=128&width=128",
    permitType: "monthly" as const,
    qrCode: `https://scootscoot.app/verify/${permitId}`,
  }

  const handleDownload = () => {
    // In a real app, this would trigger a PDF download
    alert("Downloading PDF...")
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert("Sharing permit...")
  }

  const handleFullscreen = () => {
    setShowFullPreview(true)
  }

  const handleGoToDashboard = () => {
    router.push("/rider-dashboard")
  }

  if (showFullPreview) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Digital Ride Permit</h2>
          <Button variant="ghost" onClick={() => setShowFullPreview(false)}>
            Close
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
          <DRPPreview permitData={permitData} onDownload={handleDownload} onShare={handleShare} />
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <CardTitle className="text-2xl">Your Digital Ride Permit is Ready!</CardTitle>
        <CardDescription>
          Congratulations! Your ScootScoot Digital Ride Permit has been successfully created.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">What's Next?</h3>
          <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-400">
            <li>Your permit is now active and ready to use</li>
            <li>Download the PDF to keep a copy on your device</li>
            <li>Show this permit to rental shops or authorities when requested</li>
            <li>Your rider profile now has a verified badge</li>
          </ul>
        </div>

        <DRPPreview
          permitData={permitData}
          onDownload={handleDownload}
          onShare={handleShare}
          onFullscreen={handleFullscreen}
        />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleGoToDashboard} className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
