"use client"

import { EnhancedInitiateRiderOnboarding } from "@/components/shop-onboarding/enhanced-initiate-rider-onboarding"

export default function ShopOnboardingSessionsPage() {
  // In a real implementation, we would get the shop ID from the authenticated user
  const shopId = "shop-123"

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
        Rider Onboarding
      </h1>

      <EnhancedInitiateRiderOnboarding shopId={shopId} />
    </div>
  )
}
