"use client"

import { useEffect, useState } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(true)
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShowReconnected(true)
      // Hide the reconnected message after 5 seconds
      setTimeout(() => setShowReconnected(false), 5000)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline && !showReconnected) return null

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 px-4 md:bottom-4">
      {!isOnline && (
        <Alert variant="destructive" className="flex items-center justify-between">
          <div className="flex items-center">
            <WifiOff className="h-4 w-4 mr-2" />
            <div>
              <AlertTitle>You're offline</AlertTitle>
              <AlertDescription>Some features may be limited until you reconnect.</AlertDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-2 bg-white text-red-600 border-red-200"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Alert>
      )}

      {isOnline && showReconnected && (
        <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50">
          <Wifi className="h-4 w-4 mr-2" />
          <AlertTitle>Back online</AlertTitle>
          <AlertDescription>You're connected again. All features are now available.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
