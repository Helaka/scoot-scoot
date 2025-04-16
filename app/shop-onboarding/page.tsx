import { Suspense } from "react"
import OnboardingFlow from "@/components/shop-onboarding/onboarding-flow"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShopOnboardingPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <OnboardingFlow />
    </Suspense>
  )
}
