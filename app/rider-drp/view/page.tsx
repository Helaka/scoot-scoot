"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DRPPreview from "@/components/drp/drp-preview"

export default function DRPViewPage() {
  const searchParams = useSearchParams()
  const permitId = searchParams?.get("permitId") || "unknown"

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
    // In a real app, this would open a fullscreen view
    alert("Opening fullscreen view...")
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Digital Ride Permit</CardTitle>
          <CardDescription>View and manage your ScootScoot Digital Ride Permit</CardDescription>
        </CardHeader>
        <CardContent>
          <DRPPreview
            permitData={permitData}
            onDownload={handleDownload}
            onShare={handleShare}
            onFullscreen={handleFullscreen}
          />
        </CardContent>
      </Card>
    </div>
  )
}
