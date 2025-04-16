"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { DocumentPreview } from "../onboarding/document-preview"
import { Camera, CheckCircle, XCircle, UserCheck } from "lucide-react"

interface ManualVerificationProps {
  shopId: string
}

export function ManualVerification({ shopId }: ManualVerificationProps) {
  const [activeTab, setActiveTab] = useState("scan")
  const [documentUrl, setDocumentUrl] = useState<string | null>(null)
  const [verificationChecks, setVerificationChecks] = useState({
    photoMatches: false,
    documentValid: false,
    detailsCorrect: false,
    ageVerified: false,
  })
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected">("pending")
  const [notes, setNotes] = useState("")

  const allChecksCompleted = Object.values(verificationChecks).every(Boolean)

  const handleDocumentCapture = () => {
    // In a real implementation, this would open the camera
    // For now, we'll simulate with a placeholder
    setDocumentUrl("/placeholder.svg?height=400&width=600")
  }

  const handleVerificationCheck = (check: keyof typeof verificationChecks, value: boolean) => {
    setVerificationChecks((prev) => ({
      ...prev,
      [check]: value,
    }))
  }

  const handleApprove = () => {
    // In a real implementation, this would call an API
    setVerificationStatus("verified")
  }

  const handleReject = () => {
    // In a real implementation, this would call an API
    setVerificationStatus("rejected")
  }

  const resetVerification = () => {
    setDocumentUrl(null)
    setVerificationChecks({
      photoMatches: false,
      documentValid: false,
      detailsCorrect: false,
      ageVerified: false,
    })
    setVerificationStatus("pending")
    setNotes("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Rider Verification</CardTitle>
        <CardDescription>Verify a rider's identity in person at your shop</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="scan">Scan Document</TabsTrigger>
            <TabsTrigger value="verify">Verify Details</TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-4">
            {!documentUrl ? (
              <div className="flex flex-col items-center justify-center gap-4 p-8">
                <div className="rounded-full bg-muted p-4">
                  <Camera className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">Scan ID Document</h3>
                  <p className="text-sm text-muted-foreground">Take a clear photo of the rider's ID document</p>
                </div>
                <Button onClick={handleDocumentCapture}>Capture Document</Button>
              </div>
            ) : (
              <DocumentPreview
                documentUrl={documentUrl}
                verificationStatus="pending"
                onRetry={() => setDocumentUrl(null)}
              />
            )}

            {documentUrl && (
              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("verify")}>Continue to Verification</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="verify" className="space-y-6">
            {documentUrl && <DocumentPreview documentUrl={documentUrl} verificationStatus={verificationStatus} />}

            <div className="space-y-4">
              <h3 className="font-medium">Verification Checklist</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="check-photo"
                    checked={verificationChecks.photoMatches}
                    onCheckedChange={(checked) => handleVerificationCheck("photoMatches", checked === true)}
                  />
                  <Label htmlFor="check-photo">Photo matches the person</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="check-document"
                    checked={verificationChecks.documentValid}
                    onCheckedChange={(checked) => handleVerificationCheck("documentValid", checked === true)}
                  />
                  <Label htmlFor="check-document">Document is valid and not expired</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="check-details"
                    checked={verificationChecks.detailsCorrect}
                    onCheckedChange={(checked) => handleVerificationCheck("detailsCorrect", checked === true)}
                  />
                  <Label htmlFor="check-details">Details match the application</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="check-age"
                    checked={verificationChecks.ageVerified}
                    onCheckedChange={(checked) => handleVerificationCheck("ageVerified", checked === true)}
                  />
                  <Label htmlFor="check-age">Person is at least 18 years old</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                placeholder="Add any notes about this verification"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {verificationStatus === "verified" && (
              <div className="rounded-md bg-green-50 p-4 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Verification Approved</h4>
                  <p className="text-sm text-green-700">
                    This rider has been successfully verified and can now rent scooters.
                  </p>
                </div>
              </div>
            )}

            {verificationStatus === "rejected" && (
              <div className="rounded-md bg-red-50 p-4 flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Verification Rejected</h4>
                  <p className="text-sm text-red-700">
                    This rider's verification has been rejected. They will need to try again.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        {verificationStatus === "pending" ? (
          <>
            <Button variant="outline" onClick={resetVerification} disabled={!documentUrl}>
              Reset
            </Button>

            <div className="space-x-2">
              <Button variant="destructive" onClick={handleReject} disabled={!documentUrl}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>

              <Button onClick={handleApprove} disabled={!documentUrl || !allChecksCompleted}>
                <UserCheck className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          </>
        ) : (
          <Button className="w-full" variant="outline" onClick={resetVerification}>
            Start New Verification
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
