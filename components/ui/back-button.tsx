import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  href: string
  className?: string
  variant?: "text" | "button" | "floating"
  children?: React.ReactNode
}

export function BackButton({ href, className, variant = "text", children = "Back" }: BackButtonProps) {
  if (variant === "floating") {
    return (
      <Link
        href={href}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md backdrop-blur-sm transition-colors dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700",
          className,
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">{children}</span>
      </Link>
    )
  }

  if (variant === "button") {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground",
          className,
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", className)}
    >
      <ArrowLeft className="h-3 w-3" />
      <span>{children}</span>
    </Link>
  )
}
