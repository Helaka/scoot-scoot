"use client"

import { CheckCircle2, Circle } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import type { OnboardingStep } from "@/types/onboarding-types"

interface StreamlinedProgressTrackerProps {
  currentStep: OnboardingStep
  completedSteps: Record<OnboardingStep, boolean>
}

interface StepConfig {
  key: OnboardingStep
  label: string
  shortLabel: string
}

export function StreamlinedProgressTracker({ currentStep, completedSteps }: StreamlinedProgressTrackerProps) {
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
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
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
                    completedSteps[steps[index - 1].key] ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              )}

              {/* Line after */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-full top-1/2 w-full h-1 -translate-y-1/2 ${
                    completedSteps[step.key] ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              )}

              {/* Step circle */}
              <div className="relative z-10">
                {completedSteps[step.key] ? (
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                ) : currentStep === step.key ? (
                  <div className="h-7 w-7 rounded-full border-2 border-primary bg-white flex items-center justify-center text-primary font-medium">
                    {index + 1}
                  </div>
                ) : (
                  <Circle className="h-7 w-7 text-gray-300" />
                )}
              </div>
            </div>

            <span
              className={`mt-2 text-xs font-medium ${
                currentStep === step.key ? "text-primary" : completedSteps[step.key] ? "text-gray-700" : "text-gray-400"
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
