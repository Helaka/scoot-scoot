"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useState } from "react"

interface WelcomeMessageProps {
  businessName?: string
  planType?: string
}

export default function WelcomeMessage({ businessName = "Your Business", planType = "Basic" }: WelcomeMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-yellow-50 dark:from-purple-900/30 dark:to-yellow-900/30 border-purple-100 dark:border-purple-800 mb-6">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl text-purple-800 dark:text-purple-300">Welcome to ScootScoot!</CardTitle>
          <CardDescription className="text-purple-700 dark:text-purple-400">
            Your {planType} plan is now active
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-200"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-purple-700 dark:text-purple-400 mb-4">
          Let's get {businessName} set up on ScootScoot! Complete the steps below to start managing your scooter
          rentals.
        </p>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() =>
            window.scrollTo({ top: document.getElementById("onboarding-checklist")?.offsetTop, behavior: "smooth" })
          }
        >
          View Setup Checklist
        </Button>
      </CardContent>
    </Card>
  )
}
