"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, AlertTriangle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function ReportCheckpoint() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [description, setDescription] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Checkpoint reported",
      description: "Thank you for contributing to the community!",
    })

    setIsSubmitting(false)
    setDescription("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white/90 dark:bg-gray-800/90 shadow-sm absolute bottom-20 right-4 z-10"
        >
          <Shield className="h-4 w-4 text-red-500" />
          Report Checkpoint
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report Police Checkpoint</DialogTitle>
          <DialogDescription>
            Help other riders by reporting license check locations. Your report will be anonymous.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-3">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <p className="text-xs text-muted-foreground">
              Only report actual checkpoints. False reports may result in account restrictions.
            </p>
          </div>
          <Textarea
            placeholder="Describe the location (e.g., 'Main St & 5th Ave intersection')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="text-sm text-muted-foreground">Your current location will be used for this report.</div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !description.trim()} className="gap-2">
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
