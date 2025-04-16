import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel: string
  actionHref: string
  demo?: boolean
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, demo = false }: EmptyStateProps) {
  const demoParam = demo ? "?demo=true" : ""
  const fullHref = `${actionHref}${demoParam}`

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[200px]">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>
        <Link href={fullHref}>
          <Button>{actionLabel}</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
