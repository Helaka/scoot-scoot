import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  from?: string
  to?: string
  hoverFrom?: string
  hoverTo?: string
}

export function GradientButton({
  children,
  className,
  from = "from-yellow-500",
  to = "to-yellow-400",
  hoverFrom = "hover:from-yellow-600",
  hoverTo = "hover:to-yellow-500",
  ...props
}: GradientButtonProps) {
  return (
    <Button className={cn(`bg-gradient-to-r ${from} ${to} ${hoverFrom} ${hoverTo} text-black`, className)} {...props}>
      {children}
    </Button>
  )
}
