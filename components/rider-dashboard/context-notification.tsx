"use client"

import { useEffect, useState } from "react"
import { useRiderContext } from "@/contexts/rider-context"
import { CheckCircle, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bike } from "lucide-react"

export function ContextNotification() {
  const { state } = useRiderContext()
  const [showNotification, setShowNotification] = useState(false)
  const [lastState, setLastState] = useState(state.state)

  useEffect(() => {
    // Only show notification when state changes
    if (state.state !== lastState) {
      setShowNotification(true)
      setLastState(state.state)

      // Hide notification after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [state.state, lastState])

  if (!showNotification) return null

  return (
    <div className="fixed top-20 right-4 z-50 w-full max-w-sm">
      {state.state === "active" && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30">
          <Bike className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Rental Started</AlertTitle>
          <AlertDescription>Your rental has been started. Enjoy your ride!</AlertDescription>
        </Alert>
      )}

      {state.state === "post_rental" && (
        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
          <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle>Rental Complete</AlertTitle>
          <AlertDescription>Your rental has been completed. Thank you for riding with us!</AlertDescription>
        </Alert>
      )}

      {state.state === "looking" && lastState !== "idle" && (
        <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/30">
          <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertTitle>Ready to Ride</AlertTitle>
          <AlertDescription>Find and book your next scooter adventure.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
