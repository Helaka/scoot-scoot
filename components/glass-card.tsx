import type React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white/60 p-8 shadow-lg backdrop-blur-md transition-all hover:shadow-xl hover:bg-white/80 border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 dark:hover:bg-gray-800/60",
        className,
      )}
    >
      {children}
    </div>
  )
}
