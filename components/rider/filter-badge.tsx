"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FilterBadgeProps {
  label: string
  onRemove: () => void
}

export function FilterBadge({ label, onRemove }: FilterBadgeProps) {
  return (
    <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-800 border-yellow-200">
      {label}
      <X
        className="h-3 w-3 cursor-pointer hover:text-yellow-900"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
      />
    </Badge>
  )
}
