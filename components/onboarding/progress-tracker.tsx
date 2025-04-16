"use client"

import { CheckCircle2, Circle } from "lucide-react"
import type { OnboardingStep } from "@/types/onboarding-types"

interface ProgressTrackerProps {
  currentStep?: OnboardingStep
  completedSteps: Record<OnboardingStep, boolean>
}

interface StepConfig {
  key: OnboardingStep
  label: string
}

export function ProgressTracker({ currentStep, completedSteps }: ProgressTrackerProps) {
  const steps: StepConfig[] = [
    { key: "basic-info", label: "Basic Info" },
    { key: "document-upload", label: "ID Upload" },
    { key: "signature", label: "Signature" },
    { key: "consent", label: "Consent" },
    { key: "face-verification", label: "Verification" },
  ]

  return (
    <div className="w-full">
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
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                ) : currentStep === step.key ? (
                  <div className="h-8 w-8 rounded-full border-2 border-primary bg-white flex items-center justify-center text-primary font-medium">
                    {index + 1}
                  </div>
                ) : (
                  <Circle className="h-8 w-8 text-gray-300" />
                )}
              </div>
            </div>

            <span
              className={`mt-2 text-xs font-medium ${
                currentStep === step.key ? "text-primary" : completedSteps[step.key] ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
