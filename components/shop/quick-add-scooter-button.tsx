"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AddScooterWizard } from "@/components/shop/add-scooter-wizard"
import type { Scooter } from "@/types/scooter-types"

interface QuickAddScooterButtonProps {
  onScooterAdded?: (scooter: Partial<Scooter>) => void
  variant?: "default" | "outline" | "secondary" | "ghost"
}

export function QuickAddScooterButton({ onScooterAdded, variant = "default" }: QuickAddScooterButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleComplete = (scooter: Partial<Scooter>) => {
    if (onScooterAdded) {
      onScooterAdded(scooter)
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>
          <Plus className="mr-2 h-4 w-4" />
          Add Scooter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0">
        <AddScooterWizard onComplete={handleComplete} onCancel={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
