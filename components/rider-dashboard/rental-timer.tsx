"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface RentalTimerProps {
  hours: number
  minutes: number
}

export function RentalTimer({ hours, minutes }: RentalTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours,
    minutes,
    seconds: 0,
  })

  const [progress, setProgress] = useState(100)

  // Calculate total seconds and initial total seconds
  const totalSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds
  const initialTotalSeconds = hours * 3600 + minutes * 60

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // If time is up
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer)
          return prev
        }

        // Calculate new time
        let newHours = prev.hours
        let newMinutes = prev.minutes
        let newSeconds = prev.seconds - 1

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Update progress bar
  useEffect(() => {
    const currentTotalSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds
    const newProgress = (currentTotalSeconds / initialTotalSeconds) * 100
    setProgress(newProgress)
  }, [timeLeft, initialTotalSeconds])

  // Format time with leading zeros
  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold text-center tabular-nums">
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-center text-muted-foreground">
        Return by {new Date().getHours() + timeLeft.hours}:{formatTime(new Date().getMinutes() + timeLeft.minutes)}
      </p>
    </div>
  )
}
