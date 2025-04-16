"use client"

import { useState } from "react"
import { useSession } from "@/contexts/session-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AlertCircle, CheckCircle2, QrCode, Copy, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QRCode from "qrcode.react"

export function InitiateOnboarding() {
  const [activeTab, setActiveTab] = useState("code")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [session, setSession] = useState<any>(null)
  const { createSession, loading } = useSession()

  const handleCreateSession = async () => {
    setError(null)

    try {
      // In a real app, we would get the shop ID from authentication
      const shopId = "shop-1"
      const newSession = await createSession(shopId)

      setSession(newSession)
      setSuccess(true)
    } catch (err) {
      setError("Failed to create onboarding session. Please try again.")
      console.error(err)
    }
  }

  const handleCopyCode = () => {
    if (session?.activationCode) {
      navigator.clipboard
        .writeText(session.activationCode)
        .then(() => {
          // Show a temporary success message
          const codeElement = document.getElementById("activation-code")
          if (codeElement) {
            const originalText = codeElement.textContent
            codeElement.textContent = "Copied!"
            setTimeout(() => {
              codeElement.textContent = originalText
            }, 1500)
          }
        })
        .catch((err) => {
          console.error("Failed to copy code:", err)
        })
    }
  }

  const handleCreateNewSession = () => {
    setSession(null)
    setSuccess(false)
    setError(null)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Initiate Rider Onboarding</CardTitle>
        <CardDescription>Create a new onboarding session for a rider</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && session ? (
          <div className="space-y-4">
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Session Created!</AlertTitle>
              <AlertDescription>Share the code or QR with the rider to begin onboarding</AlertDescription>
            </Alert>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="code">Activation Code</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="mt-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-4xl font-bold tracking-widest bg-gray-100 py-3 px-6 rounded-lg w-full text-center relative">
                    <span id="activation-code">{session.activationCode}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={handleCopyCode}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center">This code will expire in 24 hours</p>
                </div>
              </TabsContent>

              <TabsContent value="qr" className="mt-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <QRCode
                      value={`https://scootscoot.com/activate?code=${session.activationCode}`}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center">Scan this QR code to start the onboarding process</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 py-4">
            <QrCode className="h-16 w-16 text-primary" />
            <p className="text-center text-gray-600">
              Create a new onboarding session to generate an activation code and QR code for the rider
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {success && session ? (
          <Button variant="outline" className="w-full" onClick={handleCreateNewSession}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Create New Session
          </Button>
        ) : (
          <Button className="w-full" onClick={handleCreateSession} disabled={loading}>
            {loading ? <LoadingSpinner className="mr-2" /> : null}
            {loading ? "Creating..." : "Create Onboarding Session"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
