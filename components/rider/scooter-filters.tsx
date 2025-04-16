"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { ListFilter } from "lucide-react"

interface ScooterFiltersProps {
  onFiltersChange: (filters: ScooterFilters) => void
  className?: string
}

export interface ScooterFilters {
  priceRange: [number, number]
  maxDistance: number
  engineType: "any" | "manual" | "automatic"
  features: {
    phoneHolder: boolean
    storageCompartment: boolean
    usbPlug: boolean
  }
  helmetIncluded: boolean
}

const defaultFilters: ScooterFilters = {
  priceRange: [5, 25],
  maxDistance: 5,
  engineType: "any",
  features: {
    phoneHolder: false,
    storageCompartment: false,
    usbPlug: false,
  },
  helmetIncluded: false,
}

export function ScooterFilters({ onFiltersChange, className = "" }: ScooterFiltersProps) {
  const [filters, setFilters] = useState<ScooterFilters>(defaultFilters)
  const [open, setOpen] = useState(false)

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    }
    setFilters(newFilters)
  }

  const handleDistanceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      maxDistance: value[0],
    }
    setFilters(newFilters)
  }

  const handleEngineTypeChange = (value: string) => {
    const newFilters = {
      ...filters,
      engineType: value as "any" | "manual" | "automatic",
    }
    setFilters(newFilters)
  }

  const handleFeatureChange = (feature: keyof ScooterFilters["features"], checked: boolean) => {
    const newFilters = {
      ...filters,
      features: {
        ...filters.features,
        [feature]: checked,
      },
    }
    setFilters(newFilters)
  }

  const handleHelmetChange = (checked: boolean) => {
    const newFilters = {
      ...filters,
      helmetIncluded: checked,
    }
    setFilters(newFilters)
  }

  const applyFilters = () => {
    onFiltersChange(filters)
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className={`rounded-full shadow-sm flex items-center gap-2 ${className}`}
          onClick={() => setOpen(true)}
        >
          <ListFilter className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filter Scooters</SheetTitle>
          <SheetDescription>Customize your search to find the perfect scooter</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Price Range ($/hour)</h3>
            <div className="px-2">
              <Slider
                defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                min={1}
                max={50}
                step={1}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Maximum Distance (miles)</h3>
            <div className="px-2">
              <Slider
                defaultValue={[filters.maxDistance]}
                min={1}
                max={20}
                step={1}
                onValueChange={handleDistanceChange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>1 mile</span>
                <span>
                  {filters.maxDistance} {filters.maxDistance === 1 ? "mile" : "miles"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Engine Type</h3>
            <RadioGroup
              defaultValue={filters.engineType}
              onValueChange={handleEngineTypeChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic">Automatic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Manual</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Features</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="phoneHolder"
                  checked={filters.features.phoneHolder}
                  onCheckedChange={(checked) => handleFeatureChange("phoneHolder", checked as boolean)}
                />
                <Label htmlFor="phoneHolder">Phone Holder</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="storageCompartment"
                  checked={filters.features.storageCompartment}
                  onCheckedChange={(checked) => handleFeatureChange("storageCompartment", checked as boolean)}
                />
                <Label htmlFor="storageCompartment">Storage Compartment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usbPlug"
                  checked={filters.features.usbPlug}
                  onCheckedChange={(checked) => handleFeatureChange("usbPlug", checked as boolean)}
                />
                <Label htmlFor="usbPlug">USB Plug</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="helmetIncluded" checked={filters.helmetIncluded} onCheckedChange={handleHelmetChange} />
            <Label htmlFor="helmetIncluded">Helmet Included</Label>
          </div>
        </div>
        <SheetFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={resetFilters} className="w-full">
            Reset
          </Button>
          <Button
            onClick={() => {
              applyFilters()
              setOpen(false)
            }}
            className="w-full"
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
