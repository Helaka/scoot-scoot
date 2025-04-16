import { Suspense } from "react"
import { ProgressTracker } from "@/components/onboarding/progress-tracker"
import { SessionTimer } from "@/components/onboarding/session-timer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function DirectOnboardingPage() {
  // Mock expiration date 30 minutes from now
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000)

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rider Verification</h1>
        <SessionTimer expiresAt={expiresAt} />
      </div>

      <ProgressTracker currentStep="basic-info" />

      <Suspense fallback={<LoadingSpinner />}>
        <div className="rounded-lg border p-6">
          <p className="text-center text-lg">
            This is a placeholder for the direct onboarding flow. In a real implementation, this would include the
            BasicInfoForm, DocumentUpload, and other onboarding components.
          </p>
        </div>
      </Suspense>
    </div>
  )
}
