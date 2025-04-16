"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        <motion.div
          className={cn("rounded-full border-4 border-yellow-500/30", sizeClasses[size])}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className={cn("absolute inset-0 rounded-full border-4 border-t-4 border-yellow-500", sizeClasses[size])}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    </div>
  )
}
