"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Bike, Zap } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export type ScooterFilters = {
  distance: number
  types: string[]
  priceRange: string
  minRating: number
}

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialFilters: ScooterFilters
  onApplyFilters: (filters: ScooterFilters) => void
}

export function FilterDialog({ open, onOpenChange, initialFilters, onApplyFilters }: FilterDialogProps) {
  const [localFilters, setLocalFilters] = useState<ScooterFilters>({
    distance: initialFilters.distance,
    types: [...initialFilters.types],
    priceRange: initialFilters.priceRange,
    minRating: initialFilters.minRating,
  })

  // Update local state when initialFilters change and dialog opens
  useEffect(() => {
    if (open) {
      setLocalFilters({
        distance: initialFilters.distance,
        types: [...initialFilters.types],
        priceRange: initialFilters.priceRange,
        minRating: initialFilters.minRating,
      })
    }
  }, [initialFilters, open])

  const handleTypeToggle = (type: string) => {
    setLocalFilters((prev) => {
      const newTypes = prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type]

      return {
        ...prev,
        types: newTypes,
      }
    })
  }

  const handleApply = () => {
    onApplyFilters(localFilters)
    onOpenChange(false)
  }

  const handleReset = () => {
    setLocalFilters({
      distance: 5,
      types: [],
      priceRange: "all",
      minRating: 0,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Scooters</DialogTitle>
          <DialogDescription>Customize your search to find the perfect scooter for your needs.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Distance (miles)</Label>
            <div className="pt-2">
              <Slider
                max={20}
                step={1}
                value={[localFilters.distance]}
                onValueChange={(value) => {
                  setLocalFilters((prev) => ({
                    ...prev,
                    distance: value[0],
                  }))
                }}
              />
              <div className="mt-1 text-center text-sm">Within {localFilters.distance} miles</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Scooter Type</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="automatic"
                  checked={localFilters.types.includes("Automatic")}
                  onCheckedChange={() => handleTypeToggle("Automatic")}
                />
                <Label htmlFor="automatic" className="flex items-center">
                  <Bike className="mr-2 h-4 w-4" />
                  Automatic
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manual"
                  checked={localFilters.types.includes("Manual")}
                  onCheckedChange={() => handleTypeToggle("Manual")}
                />
                <Label htmlFor="manual" className="flex items-center">
                  <Bike className="mr-2 h-4 w-4" />
                  Manual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="electric"
                  checked={localFilters.types.includes("Electric")}
                  onCheckedChange={() => handleTypeToggle("Electric")}
                />
                <Label htmlFor="electric" className="flex items-center">
                  <Zap className="mr-2 h-4 w-4" />
                  Electric
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="moped"
                  checked={localFilters.types.includes("Moped")}
                  onCheckedChange={() => handleTypeToggle("Moped")}
                />
                <Label htmlFor="moped" className="flex items-center">
                  <Bike className="mr-2 h-4 w-4" />
                  Moped
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Price Range</Label>
            <RadioGroup
              value={localFilters.priceRange}
              onValueChange={(value) => setLocalFilters((prev) => ({ ...prev, priceRange: value }))}
              className="grid grid-cols-2 gap-2 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Prices</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="under40" id="under40" />
                <Label htmlFor="under40">Under $40</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="40-60" id="40-60" />
                <Label htmlFor="40-60">$40-$60</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="60-80" id="60-80" />
                <Label htmlFor="60-80">$60-$80</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="80plus" id="80plus" />
                <Label htmlFor="80plus">$80+</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Minimum Rating</Label>
            <RadioGroup
              value={localFilters.minRating.toString()}
              onValueChange={(value) => setLocalFilters((prev) => ({ ...prev, minRating: Number.parseInt(value) }))}
              className="flex items-center gap-2 mt-2"
            >
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex items-center space-x-1">
                  <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`}>{rating > 0 ? `${rating}+` : "Any"}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset} className="sm:w-auto w-full">
            Reset
          </Button>
          <Button onClick={handleApply} className="bg-yellow-500 hover:bg-yellow-600 text-black sm:w-auto w-full">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
