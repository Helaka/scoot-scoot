"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { BookingWizard } from "./booking-wizard"
import { motion } from "framer-motion"
import type { Scooter } from "@/types/scooter-types"

interface CreateBookingButtonProps {
  scooters: Scooter[]
  onBookingCreated?: () => void
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CreateBookingButton({
  scooters,
  onBookingCreated,
  variant = "default",
  size = "default",
  className,
}: CreateBookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleComplete = () => {
    setIsOpen(false)
    if (onBookingCreated) {
      onBookingCreated()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant={variant} size={size} className={className}>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <BookingWizard scooters={scooters} onComplete={handleComplete} onCancel={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
