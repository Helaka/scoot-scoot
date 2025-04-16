"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import BasicSignUp from "./basic-signup"
import PlanSelection from "./plan-selection"
import LegalAgreements from "./legal-agreements"
import OnboardingProgress from "./onboarding-progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, X } from "lucide-react"

export type OnboardingStep = "signup" | "plan" | "legal" | "complete"

export default function OnboardingFlow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stepParam = searchParams?.get("step") as OnboardingStep | null
  const testMode = searchParams?.get("mode") === "test"

  const [currentStep, setCurrentStep] = useState<OnboardingStep>(stepParam || "signup")
  const [businessData, setBusinessData] = useState({
    businessName: testMode ? "Test Business" : "",
    email: testMode ? "test@example.com" : "",
    password: testMode ? "password123" : "",
  })
  const [planData, setPlanData] = useState({
    planType: "basic",
    paymentMethod: "",
    cardDetails: {},
  })
  const [legalAccepted, setLegalAccepted] = useState({
    terms: false,
    privacy: false,
    rentalAgreement: false,
  })
  const [showTestBanner, setShowTestBanner] = useState(testMode)

  useEffect(() => {
    if (stepParam && ["signup", "plan", "legal", "complete"].includes(stepParam)) {
      setCurrentStep(stepParam as OnboardingStep)
    }
  }, [stepParam])

  const handleStepComplete = (step: OnboardingStep, data?: any) => {
    switch (step) {
      case "signup":
        setBusinessData(data)
        setCurrentStep("plan")
        router.push(`/shop-onboarding?step=plan${testMode ? "&mode=test" : ""}`)
        break
      case "plan":
        setPlanData(data)
        setCurrentStep("legal")
        router.push(`/shop-onboarding?step=legal${testMode ? "&mode=test" : ""}`)
        break
      case "legal":
        setLegalAccepted(data)
        setCurrentStep("complete")
        // In a real app, we would save all the data to the backend here
        if (testMode) {
          router.push("/shop-dashboard?onboarding=true&demo=true")
        } else {
          router.push("/shop-dashboard?onboarding=true")
        }
        break
      default:
        break
    }
  }

  const exitTestMode = () => {
    router.push("/shop-login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {showTestBanner && (
        <div className="sticky top-0 z-50">
          <Alert className="bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800">
            <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <div className="flex-1">
              <AlertTitle className="text-purple-800 dark:text-purple-300">Test Mode Active</AlertTitle>
              <AlertDescription className="text-purple-700 dark:text-purple-400">
                You're previewing the onboarding process. No account will be created.
              </AlertDescription>
            </div>
            <button
              onClick={() => setShowTestBanner(false)}
              className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-200"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </Alert>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <OnboardingProgress currentStep={currentStep} />

          {currentStep === "signup" && (
            <BasicSignUp
              initialData={businessData}
              onComplete={(data) => handleStepComplete("signup", data)}
              testMode={testMode}
            />
          )}

          {currentStep === "plan" && (
            <PlanSelection
              initialData={planData}
              onComplete={(data) => handleStepComplete("plan", data)}
              testMode={testMode}
            />
          )}

          {currentStep === "legal" && (
            <LegalAgreements
              initialData={legalAccepted}
              onComplete={(data) => handleStepComplete("legal", data)}
              testMode={testMode}
            />
          )}

          {testMode && (
            <div className="mt-4 text-center">
              <button
                onClick={exitTestMode}
                className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Exit Test Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
