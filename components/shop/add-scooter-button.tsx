"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AddScooterDialog } from "@/components/shop/add-scooter-dialog"
import { motion } from "framer-motion"
import type { Scooter } from "@/types/scooter-types"

interface AddScooterButtonProps {
  onScooterAdded?: (scooter: Partial<Scooter>) => void
  variant?: "default" | "outline" | "secondary" | "ghost"
}

export function AddScooterButton({ onScooterAdded, variant = "default" }: AddScooterButtonProps) {
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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant={variant} className="group">
            <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
            Add Scooter
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <AddScooterDialog onComplete={handleComplete} onCancel={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
