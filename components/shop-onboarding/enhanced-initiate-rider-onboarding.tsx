"use client"

import type React from "react"

import { useState } from "react"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardFooter,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
} from "@/components/ui/enhanced-card"
import { EnhancedInput } from "@/components/ui/enhanced-input"
import { Label } from "@/components/ui/label"
import { OnboardingService } from "@/services/onboarding-service"
import type { OnboardingSession } from "@/types/onboarding-types"
import { AlertCircle, Copy, QrCode, Send, CheckCircle, ArrowRight, User, Mail, Phone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QRCode from "qrcode.react"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"

interface EnhancedInitiateRiderOnboardingProps {
  shopId: string
}

export function EnhancedInitiateRiderOnboarding({ shopId }: EnhancedInitiateRiderOnboardingProps) {
  const [riderName, setRiderName] = useState("")
  const [riderEmail, setRiderEmail] = useState("")
  const [riderPhone, setRiderPhone] = useState("")
  const [session, setSession] = useState<OnboardingSession | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("code")
  const [sentInvitation, setSentInvitation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isMobile } = useMobile()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    // Validate inputs
    if (!riderEmail && !riderPhone) {
      setError("Please provide either an email or phone number")
      setIsSubmitting(false)
      return
    }

    try {
      // Create a new onboarding session
      // Simulate API call with timeout
      setTimeout(() => {
        const newSession = OnboardingService.createSession(shopId)
        setSession(newSession)
        setIsSubmitting(false)
      }, 1000)
    } catch (err) {
      setError("Failed to create onboarding session. Please try again.")
      console.error(err)
      setIsSubmitting(false)
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
    <EnhancedCard variant="elevated" hover="lift" className="w-full max-w-md mx-auto">
      <EnhancedCardHeader>
        <EnhancedCardTitle variant="gradient">Rider Onboarding</EnhancedCardTitle>
        <EnhancedCardDescription>Create an onboarding session for a new rider</EnhancedCardDescription>
      </EnhancedCardHeader>

      <AnimatePresence mode="wait">
        {!session ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit}>
              <EnhancedCardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rider-name">Rider Name</Label>
                  <EnhancedInput
                    id="rider-name"
                    value={riderName}
                    onChange={(e) => setRiderName(e.target.value)}
                    placeholder="Enter rider's name"
                    size={isMobile ? "lg" : "default"}
                    icon={<User size={18} />}
                    withIcon
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rider-email">Email Address</Label>
                  <EnhancedInput
                    id="rider-email"
                    type="email"
                    value={riderEmail}
                    onChange={(e) => setRiderEmail(e.target.value)}
                    placeholder="Enter rider's email"
                    size={isMobile ? "lg" : "default"}
                    icon={<Mail size={18} />}
                    withIcon
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rider-phone">Phone Number</Label>
                  <EnhancedInput
                    id="rider-phone"
                    value={riderPhone}
                    onChange={(e) => setRiderPhone(e.target.value)}
                    placeholder="Enter rider's phone"
                    size={isMobile ? "lg" : "default"}
                    icon={<Phone size={18} />}
                    withIcon
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </EnhancedCardContent>

              <EnhancedCardFooter>
                <EnhancedButton
                  type="submit"
                  className="w-full"
                  withIcon
                  isLoading={isSubmitting}
                  loadingText="Creating..."
                >
                  Create Onboarding Session
                  <ArrowRight className="h-4 w-4" />
                </EnhancedButton>
              </EnhancedCardFooter>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="session"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EnhancedCardContent className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-4">
                  <TabsTrigger value="code">Activation Code</TabsTrigger>
                  <TabsTrigger value="qr">QR Code</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg">
                    <div className="text-3xl font-mono tracking-widest font-bold mb-1 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      {session.activationCode}
                    </div>
                    <p className="text-xs text-muted-foreground">Expires in 24 hours</p>
                  </div>

                  <EnhancedButton variant="outline" className="w-full" withIcon onClick={copyActivationCode}>
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
                  </EnhancedButton>
                </TabsContent>

                <TabsContent value="qr" className="space-y-4">
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <QRCode
                        value={`https://scootscoot.app/activate?code=${session.activationCode}`}
                        size={180}
                        renderAs="svg"
                        level="H"
                        imageSettings={{
                          src: "/images/shop-icon.png",
                          x: undefined,
                          y: undefined,
                          height: 40,
                          width: 40,
                          excavate: true,
                        }}
                      />
                    </motion.div>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    Scan this QR code to start the onboarding process
                  </p>
                </TabsContent>
              </Tabs>

              {(riderEmail || riderPhone) && (
                <div className="pt-2">
                  <EnhancedButton variant="outline" className="w-full" withIcon onClick={sendInvitation}>
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
                  </EnhancedButton>
                </div>
              )}

              <Alert className="bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800">
                <QrCode className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <AlertTitle className="text-primary-800 dark:text-primary-300">Instructions</AlertTitle>
                <AlertDescription className="text-primary-700 dark:text-primary-400">
                  Ask the rider to scan this QR code with their phone or enter the activation code at
                  scootscoot.app/activate
                </AlertDescription>
              </Alert>
            </EnhancedCardContent>

            <EnhancedCardFooter>
              <EnhancedButton variant="ghost" onClick={resetForm} className="w-full">
                Start New Onboarding
              </EnhancedButton>
            </EnhancedCardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </EnhancedCard>
  )
}
