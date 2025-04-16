import type { OnboardingStep } from "./onboarding-flow"
import { Check } from "lucide-react"

interface OnboardingProgressProps {
  currentStep: OnboardingStep
}

export default function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  const steps = [
    { id: "signup", label: "Sign Up" },
    { id: "plan", label: "Select Plan" },
    { id: "legal", label: "Legal" },
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  currentStep === step.id
                    ? "bg-purple-500 text-white"
                    : currentStep === "complete" ||
                        steps.findIndex((s) => s.id === currentStep) > steps.findIndex((s) => s.id === step.id)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                }`}
              >
                {currentStep === "complete" ||
                steps.findIndex((s) => s.id === currentStep) > steps.findIndex((s) => s.id === step.id) ? (
                  <Check className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 w-full h-0.5 left-full ${
                    steps.findIndex((s) => s.id === currentStep) > index
                      ? "bg-green-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                  style={{ width: "calc(100% - 2.5rem)" }}
                ></div>
              )}
            </div>
            <span className="mt-2 text-xs font-medium">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
