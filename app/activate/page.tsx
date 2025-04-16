"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedActivationCodeEntry } from "@/components/onboarding/enhanced-activation-code-entry"
import { QRCodeScanner } from "@/components/onboarding/qr-code-scanner"
import { QuickStartOnboarding } from "@/components/onboarding/quick-start-onboarding"
import { useMobile } from "@/hooks/use-mobile"
import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
} from "@/components/ui/enhanced-card"
import { motion } from "framer-motion"

export default function ActivatePage() {
  const [activeTab, setActiveTab] = useState("code")
  const { isMobile } = useMobile()

  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            Start Riding with ScootScoot
          </h1>
          <p className="text-muted-foreground mt-2">Complete your verification to unlock scooter rentals</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <EnhancedCard variant="glass" hover="glow">
          <EnhancedCardHeader>
            <EnhancedCardTitle>Returning Rider?</EnhancedCardTitle>
            <EnhancedCardDescription>Get verified faster with your phone number</EnhancedCardDescription>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <QuickStartOnboarding />
          </EnhancedCardContent>
        </EnhancedCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center mb-4">
          <p className="text-sm font-medium">Or activate with a code from your rental shop</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="code">Enter Code</TabsTrigger>
            <TabsTrigger value="scan" disabled={!isMobile}>
              Scan QR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code">
            <EnhancedActivationCodeEntry />
          </TabsContent>

          <TabsContent value="scan">
            <QRCodeScanner />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
