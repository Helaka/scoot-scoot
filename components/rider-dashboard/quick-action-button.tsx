import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface QuickActionButtonProps {
  icon: LucideIcon
  label: string
  description?: string
  href: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  demo?: boolean
}

export function QuickActionButton({
  icon: Icon,
  label,
  description,
  href,
  variant = "outline",
  demo = false,
}: QuickActionButtonProps) {
  const demoParam = demo ? "?demo=true" : ""
  const fullHref = `${href}${demoParam}`

  return (
    <Link href={fullHref} className="flex-1 min-w-[140px]">
      <Button
        variant={variant}
        className="w-full h-full py-6 flex flex-col items-center justify-center gap-2 transition-all"
      >
        <Icon className="h-6 w-6" />
        <div className="flex flex-col items-center">
          <span className="font-medium">{label}</span>
          {description && <span className="text-xs text-muted-foreground text-center">{description}</span>}
        </div>
      </Button>
    </Link>
  )
}
