"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingService } from "@/services/onboarding-service"
import type { OnboardingSession } from "@/types/onboarding-types"
import { AlertCircle, Copy, QrCode, Send, CheckCircle, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QRCode from "qrcode.react"
import { useMobile } from "@/hooks/use-mobile"

interface InitiateRiderOnboardingProps {
  shopId: string
}

export function InitiateRiderOnboarding({ shopId }: InitiateRiderOnboardingProps) {
  const [riderName, setRiderName] = useState("")
  const [riderEmail, setRiderEmail] = useState("")
  const [riderPhone, setRiderPhone] = useState("")
  const [session, setSession] = useState<OnboardingSession | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("code")
  const [sentInvitation, setSentInvitation] = useState(false)
  const { isMobile } = useMobile()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate inputs
    if (!riderEmail && !riderPhone) {
      setError("Please provide either an email or phone number")
      return
    }

    try {
      // Create a new onboarding session
      const newSession = OnboardingService.createSession(shopId)
      setSession(newSession)
    } catch (err) {
      setError("Failed to create onboarding session. Please try again.")
      console.error(err)
    }
  }

  const copyActivationCode = () => {
    if (session) {
      navigator.clipboard.writeText(session.activationCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sendInvitation = () => {
    // In a real implementation, this would send an email or SMS
    setSentInvitation(true)
    setTimeout(() => setSentInvitation(false), 3000)
  }

  const resetForm = () => {
    setSession(null)
    setRiderName("")
    setRiderEmail("")
    setRiderPhone("")
    setSentInvitation(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Rider Onboarding</CardTitle>
        <CardDescription>Create an onboarding session for a new rider</CardDescription>
      </CardHeader>

      {!session ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rider-name">Rider Name</Label>
              <Input
                id="rider-name"
                value={riderName}
                onChange={(e) => setRiderName(e.target.value)}
                placeholder="Enter rider's name"
                className={isMobile ? "h-12" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rider-email">Email Address</Label>
              <Input
                id="rider-email"
                type="email"
                value={riderEmail}
                onChange={(e) => setRiderEmail(e.target.value)}
                placeholder="Enter rider's email"
                className={isMobile ? "h-12" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rider-phone">Phone Number</Label>
              <Input
                id="rider-phone"
                value={riderPhone}
                onChange={(e) => setRiderPhone(e.target.value)}
                placeholder="Enter rider's phone"
                className={isMobile ? "h-12" : ""}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full gap-2">
              <ArrowRight className="h-4 w-4" />
              Create Onboarding Session
            </Button>
          </CardFooter>
        </form>
      ) : (
        <>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="code">Activation Code</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="space-y-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-mono tracking-widest font-bold mb-1">{session.activationCode}</div>
                  <p className="text-xs text-muted-foreground">Expires in 24 hours</p>
                </div>

                <Button variant="outline" className="w-full gap-2" onClick={copyActivationCode}>
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Code
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-white p-3 rounded-lg">
                    <QRCode
                      value={`https://scootscoot.app/activate?code=${session.activationCode}`}
                      size={180}
                      renderAs="svg"
                    />
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Scan this QR code to start the onboarding process
                </p>
              </TabsContent>
            </Tabs>

            {(riderEmail || riderPhone) && (
              <div className="pt-2">
                <Button variant="outline" className="w-full gap-2" onClick={sendInvitation}>
                  {sentInvitation ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Invitation Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Invitation to {riderEmail || riderPhone}
                    </>
                  )}
                </Button>
              </div>
            )}

            <Alert>
              <QrCode className="h-4 w-4" />
              <AlertTitle>Instructions</AlertTitle>
              <AlertDescription>
                Ask the rider to scan this QR code with their phone or enter the activation code at
                scootscoot.app/activate
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter>
            <Button variant="ghost" onClick={resetForm} className="w-full">
              Start New Onboarding
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
