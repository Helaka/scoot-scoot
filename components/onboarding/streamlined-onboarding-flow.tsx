"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "@/contexts/session-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { BasicInfoForm } from "./basic-info-form"
import { DocumentUpload } from "./document-upload"
import { SignatureCapture } from "./signature-capture"
import { ConsentForm } from "./consent-form"
import { FaceVerification } from "./face-verification"
import { StreamlinedProgressTracker } from "./streamlined-progress-tracker"
import { useMobile } from "@/hooks/use-mobile"
import type { OnboardingStep } from "@/types/onboarding-types"

export function StreamlinedOnboardingFlow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session")
  const {
    getSession,
    currentSession,
    setCurrentSession,
    updateSessionStep: updateSessionStepContext,
    loading,
    error: sessionError,
  } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("basic-info")
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isMobile } = useMobile()

  // Fetch the session on mount
  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided. Please start the onboarding process from the beginning.")
      return
    }

    const fetchSession = async () => {
      try {
        const session = await getSession(sessionId)
        if (!session) {
          setError("Invalid or expired session. Please start the onboarding process from the beginning.")
          return
        }

        if (session.status === "expired") {
          setError("This session has expired. Please request a new onboarding session.")
          return
        }

        if (session.status === "completed") {
          // Redirect to success page
          router.push("/onboarding-success?sessionId=" + sessionId)
          return
        }

        setCurrentSession(session)
        if (session.currentStep) {
          setCurrentStep(session.currentStep)
        }
      } catch (err) {
        setError("Failed to load session. Please try again.")
        console.error(err)
      }
    }

    fetchSession()
  }, [sessionId, getSession, setCurrentSession, router])

  // Handle form data updates from child components
  const handleFormUpdate = (stepData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }

  // Handle step navigation
  const handleNext = async () => {
    if (!currentSession) return

    setIsSubmitting(true)

    try {
      // Mark current step as completed
      await updateSessionStep(currentStep, true)

      // Determine next step
      const nextStep = getNextStep(currentStep)
      if (nextStep) {
        setCurrentStep(nextStep)
      } else {
        // All steps completed, redirect to success page
        router.push("/onboarding-success?sessionId=" + sessionId)
      }
    } catch (err) {
      setError("Failed to save your progress. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    const prevStep = getPreviousStep(currentStep)
    if (prevStep) {
      setCurrentStep(prevStep)
    }
  }

  // Update session step in the backend
  const updateSessionStep = useCallback(
    async (step: OnboardingStep, completed: boolean) => {
      if (!currentSession) return

      try {
        await updateSessionStepContext(currentSession.id, step, completed)
      } catch (err) {
        console.error("Failed to update session step:", err)
        throw err
      }
    },
    [currentSession, updateSessionStepContext],
  )

  // Get the next step in the sequence
  const getNextStep = (step: OnboardingStep): OnboardingStep | null => {
    const steps: OnboardingStep[] = ["basic-info", "document-upload", "signature", "consent", "face-verification"]
    const currentIndex = steps.indexOf(step)

    if (currentIndex === -1 || currentIndex === steps.length - 1) {
      return null
    }

    return steps[currentIndex + 1]
  }

  // Get the previous step in the sequence
  const getPreviousStep = (step: OnboardingStep): OnboardingStep | null => {
    const steps: OnboardingStep[] = ["basic-info", "document-upload", "signature", "consent", "face-verification"]
    const currentIndex = steps.indexOf(step)

    if (currentIndex <= 0) {
      return null
    }

    return steps[currentIndex - 1]
  }

  // Render the current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "basic-info":
        return <BasicInfoForm onFormUpdate={handleFormUpdate} initialData={formData} />
      case "document-upload":
        return <DocumentUpload onFormUpdate={handleFormUpdate} initialData={formData} />
      case "signature":
        return <SignatureCapture onFormUpdate={handleFormUpdate} initialData={formData} />
      case "consent":
        return <ConsentForm onFormUpdate={handleFormUpdate} initialData={formData} />
      case "face-verification":
        return <FaceVerification onFormUpdate={handleFormUpdate} initialData={formData} />
      default:
        return <BasicInfoForm onFormUpdate={handleFormUpdate} initialData={formData} />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || sessionError) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || sessionError}</AlertDescription>
      </Alert>
    )
  }

  if (!currentSession) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Session Not Found</AlertTitle>
        <AlertDescription>Unable to load onboarding session. Please try again.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-4 px-4">
      <div className="mb-6">
        <StreamlinedProgressTracker currentStep={currentStep} completedSteps={currentSession.completedSteps} />
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="p-6">{renderCurrentStep()}</div>

          <div className="flex justify-between items-center p-4 bg-muted/30 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === "basic-info" || isSubmitting}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button onClick={handleNext} disabled={isSubmitting} className="gap-1">
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : (
                <>
                  {currentStep === "face-verification" ? "Complete" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {!isMobile && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Your progress is automatically saved. You can return to complete your verification later.</p>
        </div>
      )}
    </div>
  )
}
