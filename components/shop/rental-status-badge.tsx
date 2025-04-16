import { Badge } from "@/components/ui/badge"
import { Check, Clock, AlertTriangle } from "lucide-react"

type RentalStatus = "available" | "rented" | "maintenance" | "late" | "reserved"

interface RentalStatusBadgeProps {
  status: RentalStatus
  className?: string
}

export function RentalStatusBadge({ status, className }: RentalStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "available":
        return {
          label: "Available",
          variant: "success" as const,
          icon: Check,
        }
      case "rented":
        return {
          label: "Rented",
          variant: "default" as const,
          icon: Clock,
        }
      case "maintenance":
        return {
          label: "Maintenance",
          variant: "warning" as const,
          icon: AlertTriangle,
        }
      case "late":
        return {
          label: "Late Return",
          variant: "destructive" as const,
          icon: AlertTriangle,
        }
      case "reserved":
        return {
          label: "Reserved",
          variant: "outline" as const,
          icon: Clock,
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Badge
      variant={config.variant === "success" ? "default" : config.variant}
      className={`
        ${config.variant === "success" ? "bg-green-500 hover:bg-green-600" : ""}
        ${config.variant === "warning" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
        ${className || ""}
      `}
    >
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}
