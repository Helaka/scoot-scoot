"use client"

import type React from "react"

import { CheckCircle2, Circle } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import type { OnboardingStep } from "@/types/onboarding-types"

interface EnhancedProgressTrackerProps {
  currentStep: OnboardingStep
  completedSteps: Record<OnboardingStep, boolean>
}

interface StepConfig {
  key: OnboardingStep
  label: string
  shortLabel: string
  icon?: React.ReactNode
}

export function EnhancedProgressTracker({ currentStep, completedSteps }: EnhancedProgressTrackerProps) {
  const { isMobile } = useMobile()

  const steps: StepConfig[] = [
    { key: "basic-info", label: "Basic Info", shortLabel: "Info" },
    { key: "document-upload", label: "ID Upload", shortLabel: "ID" },
    { key: "signature", label: "Signature", shortLabel: "Sign" },
    { key: "consent", label: "Consent", shortLabel: "Terms" },
    { key: "face-verification", label: "Verification", shortLabel: "Verify" },
  ]

  // Calculate progress percentage
  const completedCount = Object.values(completedSteps).filter(Boolean).length
  const totalSteps = steps.length
  const progressPercentage = Math.round((completedCount / totalSteps) * 100)

  return (
    <div className="w-full">
      {/* Progress percentage */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium">Your Progress</h4>
        <span className="text-sm font-semibold text-primary">{progressPercentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center">
            <div className="relative">
              {/* Line before */}
              {index > 0 && (
                <div
                  className={`absolute right-full top-1/2 w-full h-1 -translate-y-1/2 ${
                    completedSteps[steps[index - 1].key] ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                  }`}
                />
              )}

              {/* Line after */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-full top-1/2 w-full h-1 -translate-y-1/2 ${
                    completedSteps[step.key] ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                  }`}
                />
              )}

              {/* Step circle */}
              <div className="relative z-10">
                {completedSteps[step.key] ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </motion.div>
                ) : currentStep === step.key ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    className="h-8 w-8 rounded-full border-2 border-primary bg-white flex items-center justify-center text-primary font-medium dark:bg-gray-800"
                  >
                    {index + 1}
                  </motion.div>
                ) : (
                  <Circle className="h-8 w-8 text-muted-foreground/50" />
                )}
              </div>
            </div>

            <span
              className={`mt-2 text-xs font-medium ${
                currentStep === step.key
                  ? "text-primary"
                  : completedSteps[step.key]
                    ? "text-foreground"
                    : "text-muted-foreground"
              }`}
            >
              {isMobile ? step.shortLabel : step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
