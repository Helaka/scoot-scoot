"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface SessionTimerProps {
  expiresAt: Date
}

export function SessionTimer({ expiresAt }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpiring, setIsExpiring] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const expiryTime = new Date(expiresAt)
      const difference = expiryTime.getTime() - now.getTime()

      if (difference <= 0) {
        // Session has expired
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      // Calculate hours, minutes, seconds
      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })

      // Set warning if less than 10 minutes left
      setIsExpiring(difference < 10 * 60 * 1000)
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [expiresAt])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  return (
    <Card className={isExpiring ? "border-red-300" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Session Time Remaining
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${isExpiring ? "text-red-500" : ""}`}>
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </div>
        {isExpiring && (
          <p className="text-xs text-red-500 mt-1">
            Your session is about to expire. Please complete the onboarding process soon.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
