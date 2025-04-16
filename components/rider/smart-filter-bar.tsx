"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Filter, MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type FilterOption = {
  id: string
  label: string
  value: any
}

export type FilterCategory = {
  id: string
  label: string
  type: "toggle" | "range" | "rating" | "select"
  options?: FilterOption[]
  min?: number
  max?: number
  step?: number
  icon?: React.ReactNode
}

interface SmartFilterBarProps {
  filters: Record<string, any>
  categories: FilterCategory[]
  onFilterChange: (id: string, value: any) => void
  onClearFilters: () => void
  activeFilterCount: number
}

export function SmartFilterBar({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}: SmartFilterBarProps) {
  const [open, setOpen] = useState(false)

  // Get active filter badges to display
  const getActiveFilterBadges = () => {
    const badges = []

    categories.forEach((category) => {
      const value = filters[category.id]

      if (value !== undefined && value !== null) {
        // For toggle filters
        if (category.type === "toggle" && value === true) {
          badges.push({
            id: category.id,
            label: category.label,
          })
        }

        // For range filters (only show if not at default)
        else if (category.type === "range" && category.max && value !== category.max) {
          badges.push({
            id: category.id,
            label: `${category.label}: ${value}${category.id === "distance" ? " km" : ""}`,
          })
        }

        // For rating filters (only show if not zero)
        else if (category.type === "rating" && value > 0) {
          badges.push({
            id: category.id,
            label: `${category.label}: ${value}+`,
          })
        }

        // For select filters with options
        else if (category.type === "select" && category.options && value !== "all") {
          const option = category.options.find((opt) => opt.value === value)
          if (option) {
            badges.push({
              id: category.id,
              label: `${category.label}: ${option.label}`,
            })
          }
        }
      }
    })

    return badges
  }

  const activeBadges = getActiveFilterBadges()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1 relative">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs text-black">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Quick Filters</h4>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" className="h-8 px-2 text-sm" onClick={onClearFilters}>
                  Clear all
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <Label className="flex items-center gap-1">
                    {category.icon}
                    {category.label}
                  </Label>

                  {category.type === "range" && category.min !== undefined && category.max !== undefined && (
                    <div className="pt-2 px-1">
                      <Slider
                        min={category.min}
                        max={category.max}
                        step={category.step || 1}
                        value={[filters[category.id] || category.max]}
                        onValueChange={(value) => onFilterChange(category.id, value[0])}
                      />
                      <div className="mt-1 text-center text-xs text-muted-foreground">
                        {category.id === "distance"
                          ? `Within ${filters[category.id] || category.max} km`
                          : `Max ${filters[category.id] || category.max}`}
                      </div>
                    </div>
                  )}

                  {category.type === "rating" && (
                    <div className="flex items-center gap-1 pt-1">
                      {[0, 1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          variant={filters[category.id] === rating ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "h-8 w-8 p-0",
                            filters[category.id] === rating ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                          )}
                          onClick={() => onFilterChange(category.id, filters[category.id] === rating ? 0 : rating)}
                        >
                          {rating === 0 ? "Any" : `${rating}+`}
                        </Button>
                      ))}
                    </div>
                  )}

                  {category.type === "select" && category.options && (
                    <div className="grid grid-cols-2 gap-1 pt-1">
                      {category.options.map((option) => (
                        <Button
                          key={option.value}
                          variant={filters[category.id] === option.value ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "justify-start text-xs h-8",
                            filters[category.id] === option.value ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "",
                          )}
                          onClick={() =>
                            onFilterChange(category.id, filters[category.id] === option.value ? "all" : option.value)
                          }
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {category.type === "toggle" && (
                    <Button
                      variant={filters[category.id] ? "default" : "outline"}
                      size="sm"
                      className={cn("mt-1", filters[category.id] ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "")}
                      onClick={() => onFilterChange(category.id, !filters[category.id])}
                    >
                      {category.label}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" onClick={() => setOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Button size="sm" className="gap-1 bg-yellow-500 hover:bg-yellow-600 text-black">
        <MapPin className="h-4 w-4" />
        Near Me
      </Button>

      {/* Active filter badges */}
      {activeBadges.map((badge) => (
        <Badge
          key={badge.id}
          variant="outline"
          className="flex items-center gap-1 bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30"
        >
          {badge.label}
          <X
            className="h-3 w-3 cursor-pointer hover:text-yellow-900 dark:hover:text-yellow-300"
            onClick={() => {
              const category = categories.find((c) => c.id === badge.id)
              if (category) {
                if (category.type === "toggle") {
                  onFilterChange(badge.id, false)
                } else if (category.type === "range" && category.max) {
                  onFilterChange(badge.id, category.max)
                } else if (category.type === "rating") {
                  onFilterChange(badge.id, 0)
                } else if (category.type === "select") {
                  onFilterChange(badge.id, "all")
                }
              }
            }}
          />
        </Badge>
      ))}

      {activeFilterCount > 1 && (
        <Button variant="link" className="h-7 px-2 text-sm text-yellow-600" onClick={onClearFilters}>
          Clear All
        </Button>
      )}
    </div>
  )
}
