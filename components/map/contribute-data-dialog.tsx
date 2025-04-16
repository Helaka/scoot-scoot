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
import { Flame, ThumbsUp } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function ContributeDataDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleSubmit = async () => {
    if (!rating) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Thanks for your contribution!",
      description: "Your rating helps other riders discover great locations.",
    })

    setIsSubmitting(false)
    setRating(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white/90 dark:bg-gray-800/90 shadow-sm absolute bottom-4 right-4 z-10"
        >
          <Flame className="h-4 w-4 text-yellow-500" />
          Rate This Area
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate This Location</DialogTitle>
          <DialogDescription>
            Help other riders discover great places by rating your current location.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <RadioGroup value={rating || ""} onValueChange={setRating}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amazing" id="amazing" />
              <Label htmlFor="amazing" className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                Amazing spot! Highly recommend
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="good" id="good" />
              <Label htmlFor="good" className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-blue-500" />
                Good area to visit
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="okay" id="okay" />
              <Label htmlFor="okay" className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-yellow-500" />
                Okay, worth checking out
              </Label>
            </div>
          </RadioGroup>

          <div className="text-sm text-muted-foreground">Your current location will be used for this rating.</div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !rating} className="gap-2">
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
