"use client"

import { useState } from "react"
import { ScooterFilters, type ScooterFilters as ScooterFiltersType } from "./scooter-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface ScooterSearchProps {
  onSearch: (query: string, filters: ScooterFiltersType) => void
  className?: string
}

export function ScooterSearch({ onSearch, className = "" }: ScooterSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<ScooterFiltersType>({
    priceRange: [5, 25],
    maxDistance: 5,
    engineType: "any",
    features: {
      phoneHolder: false,
      storageCompartment: false,
      usbPlug: false,
    },
    helmetIncluded: false,
  })

  const handleSearch = () => {
    onSearch(searchQuery, filters)
  }

  const handleFiltersChange = (newFilters: ScooterFiltersType) => {
    setFilters(newFilters)
    onSearch(searchQuery, newFilters)
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <ScooterFilters onFiltersChange={handleFiltersChange} />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  )
}
