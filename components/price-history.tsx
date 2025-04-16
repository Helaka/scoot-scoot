"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Clock, DollarSign, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PriceChange {
  id: string
  date: Date
  user: string
  previousPrice: number
  newPrice: number
  reason?: string
}

interface PriceHistoryProps {
  scooterId: string
}

export function PriceHistory({ scooterId }: PriceHistoryProps) {
  // In a real app, this would be fetched from an API
  const [priceHistory] = useState<PriceChange[]>([
    {
      id: "change-1",
      date: new Date(2023, 4, 15),
      user: "John Smith",
      previousPrice: 29.99,
      newPrice: 34.99,
      reason: "Seasonal adjustment for summer",
    },
    {
      id: "change-2",
      date: new Date(2023, 3, 10),
      user: "Sarah Johnson",
      previousPrice: 24.99,
      newPrice: 29.99,
      reason: "Price increase due to maintenance costs",
    },
    {
      id: "change-3",
      date: new Date(2023, 1, 5),
      user: "Mike Davis",
      previousPrice: 19.99,
      newPrice: 24.99,
      reason: "Standard price update",
    },
  ])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Clock className="mr-2 h-4 w-4" />
          Price History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Price History for {scooterId}</DialogTitle>
          <DialogDescription>View the history of price changes for this scooter</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-6">
            {priceHistory.map((change) => (
              <div key={change.id} className="relative pl-6 pb-6 border-l border-muted-foreground/20">
                <div className="absolute left-0 top-0 -translate-x-1/2 rounded-full border border-muted-foreground/20 bg-background p-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      ${change.previousPrice.toFixed(2)} → ${change.newPrice.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs ${change.newPrice > change.previousPrice ? "text-red-500" : "text-green-500"}`}
                    >
                      {change.newPrice > change.previousPrice
                        ? `+${(((change.newPrice - change.previousPrice) / change.previousPrice) * 100).toFixed(1)}%`
                        : `${(((change.newPrice - change.previousPrice) / change.previousPrice) * 100).toFixed(1)}%`}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(change.date, "PPP")} at {format(change.date, "p")}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="mr-1 h-3 w-3" />
                    {change.user}
                  </div>
                  {change.reason && <div className="mt-1 text-sm">{change.reason}</div>}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
