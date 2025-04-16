"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardFooter,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
} from "@/components/ui/enhanced-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function EnhancedActivationCodeEntry() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""))
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1) // Only take the last character

    setCode(newCode)
    setError(null)

    // Auto-focus next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!code[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus()
      }
    }

    // Handle left arrow
    if (e.key === "ArrowLeft" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }

    // Handle right arrow
    if (e.key === "ArrowRight" && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("")
      setCode(newCode)

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus()
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const activationCode = code.join("")

    if (activationCode.length !== 6) {
      setError("Please enter a complete 6-digit code")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real implementation, we would validate the code with an API
      // For now, we'll simulate a successful validation with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to onboarding page with the session ID
      router.push(`/onboarding?session=${activationCode}`)
    } catch (err) {
      setError("Invalid activation code. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <EnhancedCard variant="elevated" hover="lift">
      <EnhancedCardHeader>
        <EnhancedCardTitle variant="gradient">Enter Activation Code</EnhancedCardTitle>
        <EnhancedCardDescription>Enter the 6-digit code provided by your rental shop</EnhancedCardDescription>
      </EnhancedCardHeader>

      <form onSubmit={handleSubmit}>
        <EnhancedCardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-xl font-semibold rounded-lg border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                  disabled={isSubmitting}
                />
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            The code was sent to your email or provided by your rental shop
          </p>
        </EnhancedCardContent>

        <EnhancedCardFooter>
          <EnhancedButton type="submit" className="w-full" isLoading={isSubmitting} loadingText="Verifying..." withIcon>
            Verify Code
            <ArrowRight className="h-4 w-4" />
          </EnhancedButton>
        </EnhancedCardFooter>
      </form>
    </EnhancedCard>
  )
}
