"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import type { Scooter } from "@/types/scooter-types"

interface QuickPriceReferenceProps {
  scooters: Scooter[]
}

export function QuickPriceReference({ scooters }: QuickPriceReferenceProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" className="h-8 px-2 lg:px-3" onClick={() => setOpen(true)}>
        <DollarSign className="h-4 w-4 mr-2" />
        <span className="hidden md:inline-flex">Quick Price Check</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for a scooter..." />
        <CommandList>
          <CommandEmpty>No scooters found.</CommandEmpty>
          <CommandGroup heading="Scooters">
            {scooters.map((scooter) => (
              <CommandItem key={scooter.id} value={`${scooter.id} ${scooter.model}`} className="flex justify-between">
                <div className="flex flex-col">
                  <span>
                    {scooter.id} - {scooter.model}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {scooter.engineSize && `${scooter.engineSize}cc`} • {scooter.status}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="font-medium">{scooter.pricing?.dailyRate?.toFixed(2) || "--"}/day</span>
                  </div>
                  {scooter.pricing?.hourlyRate && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <DollarSign className="h-2 w-2 mr-1" />
                      <span>{scooter.pricing.hourlyRate.toFixed(2)}/hour</span>
                    </div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Pricing Templates">
            <CommandItem value="Standard Scooter (100-125cc)">
              <span>Standard Scooter (100-125cc)</span>
              <span className="ml-auto flex items-center">
                <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                29.99/day
              </span>
            </CommandItem>
            <CommandItem value="Premium Scooter (150cc+)">
              <span>Premium Scooter (150cc+)</span>
              <span className="ml-auto flex items-center">
                <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                34.99/day
              </span>
            </CommandItem>
            <CommandItem value="Electric Scooter">
              <span>Electric Scooter</span>
              <span className="ml-auto flex items-center">
                <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                36.99/day
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
