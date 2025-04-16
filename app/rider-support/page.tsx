"use client"

import { useEffect, useState } from "react"
import { RiderSupport } from "@/components/rider/rider-support"

export default function RiderSupportPage() {
  // In a real app, this would come from your auth/state management
  const [hasActiveRental, setHasActiveRental] = useState(false)

  useEffect(() => {
    // Mock API call to check if user has active rental
    // This would be replaced with a real API call or state check
    const checkActiveRental = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // For demo purposes, randomly determine if there's an active rental
      // In production, this would be a real check
      setHasActiveRental(Math.random() > 0.5)
    }

    checkActiveRental()
  }, [])

  return <RiderSupport hasActiveRental={hasActiveRental} />
}
