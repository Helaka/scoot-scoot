"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Filter, Star, Zap, Bike } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileFilterSheetProps {
  filters: Record<string, any>
  onFilterChange: (id: string, value: any) => void
  onClearFilters: () => void
  activeFilterCount: number
}

export function MobileFilterSheet({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 relative">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs text-black">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Filter Scooters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(85vh-140px)] pb-4">
          {/* Distance Filter */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">Distance</Label>
            <div className="pt-2 px-1">
              <Slider
                min={0.5}
                max={10}
                step={0.5}
                value={[filters.distance || 5]}
                onValueChange={(value) => onFilterChange("distance", value[0])}
              />
              <div className="mt-1 text-center text-sm">Within {filters.distance || 5} km</div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Rating
            </Label>
            <div className="flex items-center justify-between gap-2 pt-1">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={filters.minRating === rating ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "flex-1 h-10",
                    filters.minRating === rating ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                  )}
                  onClick={() => onFilterChange("minRating", filters.minRating === rating ? 0 : rating)}
                >
                  {rating === 0 ? "Any" : `${rating}+`}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: "under5", label: "Under $5/hr" },
                { id: "5to7", label: "$5-$7/hr" },
                { id: "over7", label: "Over $7/hr" },
                { id: "all", label: "All Prices" },
              ].map((option) => (
                <Button
                  key={option.id}
                  variant={filters.priceRange === option.id ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "justify-center h-10",
                    filters.priceRange === option.id ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                  )}
                  onClick={() => onFilterChange("priceRange", filters.priceRange === option.id ? "all" : option.id)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Scooter Type Filters */}
          <div className="space-y-2">
            <Label>Scooter Type</Label>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant={filters.electric ? "default" : "outline"}
                size="sm"
                className={cn(
                  "justify-start gap-2 h-10",
                  filters.electric ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                )}
                onClick={() => onFilterChange("electric", !filters.electric)}
              >
                <Zap className="h-4 w-4" />
                Electric Only
              </Button>
              <Button
                variant={filters.automatic ? "default" : "outline"}
                size="sm"
                className={cn(
                  "justify-start gap-2 h-10",
                  filters.automatic ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                )}
                onClick={() => onFilterChange("automatic", !filters.automatic)}
              >
                <Bike className="h-4 w-4" />
                Automatic Only
              </Button>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="space-y-2">
            <Label>Additional Filters</Label>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant={filters.available ? "default" : "outline"}
                size="sm"
                className={cn(
                  "justify-center h-10",
                  filters.available ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                )}
                onClick={() => onFilterChange("available", !filters.available)}
              >
                Available Now
              </Button>
              <Button
                variant={filters.highestRated ? "default" : "outline"}
                size="sm"
                className={cn(
                  "justify-center h-10",
                  filters.highestRated ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                )}
                onClick={() => onFilterChange("highestRated", !filters.highestRated)}
              >
                Highest Rated
              </Button>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-col gap-2 mt-4">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" onClick={() => setOpen(false)}>
            Apply Filters
          </Button>

          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                onClearFilters()
                setOpen(false)
              }}
            >
              Clear All Filters
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
