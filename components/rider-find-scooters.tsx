"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useScooters, type Scooter } from "@/contexts/scooter-context"
import { ScooterMapView } from "@/components/rider/scooter-map-view"
import { ScooterListView } from "@/components/rider/scooter-list-view"
import { SmartFilterBar } from "@/components/rider/smart-filter-bar"
import { ScooterComparison } from "@/components/rider/scooter-comparison"
import { useRiderContext } from "@/contexts/rider-context"
import { VerificationWidget } from "@/components/rider-dashboard/verification-widget"
import { useMobile } from "@/hooks/use-mobile"
import { TransitionLoader } from "@/components/ui/transition-loader"
import { BackButton } from "@/components/ui/back-button"
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav"
import { FilterDialog } from "@/components/rider/filter-dialog"
import { useVerification } from "@/components/verification/verification-context"

export default function RiderFindScooters() {
  const { state, setLookingState } = useRiderContext()
  const {
    fetchScooters,
    filteredScooters,
    selectedScooters,
    filters,
    applyFilters,
    resetFilters,
    toggleScooterSelection,
    clearSelectedScooters,
    loading,
  } = useScooters()
  const { verificationData } = useVerification()
  const isMobile = useMobile()
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const [userName, setUserName] = useState("John Doe")

  useEffect(() => {
    if (isDemo) {
      setUserName("Demo User")
    }
  }, [isDemo])

  useEffect(() => {
    fetchScooters()
  }, [])

  const activeFilterCount = Object.values(filters).filter((value) => value !== defaultFilters[value]).length

  const handleViewChange = (view: "map" | "list") => {
    setViewMode(view)
  }

  const handleScooterSelect = (scooter: Scooter | null) => {
    if (scooter) {
      setIsComparisonOpen(true)
    } else {
      setIsComparisonOpen(false)
    }
  }

  const handleCompare = (scootersToCompare: Scooter[]) => {
    setIsComparisonOpen(true)
  }

  const handleToggleSelect = (scooterId: string) => {
    toggleScooterSelection(scooterId)
  }

  const handleClearFilters = () => {
    resetFilters()
  }

  const handleFilterChange = (id: string, value: any) => {
    applyFilters({ ...filters, [id]: value })
  }

  const defaultFilters = {
    distance: 5,
    types: [],
    priceRange: "all",
    minRating: 0,
    availability: true,
  }

  const filterCategories = [
    {
      id: "distance",
      label: "Distance",
      type: "range",
      min: 0.5,
      max: 10,
      step: 0.5,
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "minRating",
      label: "Rating",
      type: "rating",
      min: 0,
      max: 5,
      icon: <Star className="h-4 w-4" />,
    },
    {
      id: "priceRange",
      label: "Price Range",
      type: "select",
      options: [
        { id: "under5", label: "Under $5/hr", value: "under5" },
        { id: "5to7", label: "$5-$7/hr", value: "5to7" },
        { id: "over7", label: "Over $7/hr", value: "over7" },
        { id: "all", label: "All Prices", value: "all" },
      ],
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      id: "types",
      label: "Scooter Type",
      type: "toggle",
      options: [
        { id: "electric", label: "Electric", value: "Electric" },
        { id: "automatic", label: "Automatic", value: "Automatic" },
      ],
      icon: <Bike className="h-4 w-4" />,
    },
    {
      id: "availability",
      label: "Availability",
      type: "toggle",
      icon: <Check className="h-4 w-4 text-green-500" />,
    },
  ]

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true)
  }

  const handleCloseFilterDialog = () => {
    setIsFilterDialogOpen(false)
  }

  const handleCloseComparison = () => {
    setIsComparisonOpen(false)
    clearSelectedScooters()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <BackButton href="/rider-dashboard" variant="button" />
        <h1 className="text-2xl font-bold tracking-tight">Find Scooters</h1>
        <p className="text-muted-foreground">Discover and book scooters near you</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <BreadcrumbNav items={[{ label: "Discover" }]} />
        <VerificationWidget status={verificationData.status} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SmartFilterBar
          filters={filters}
          categories={filterCategories}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeFilterCount={activeFilterCount}
        />
        <Button variant="outline" size="sm" onClick={handleOpenFilterDialog}>
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      <TransitionLoader isLoading={loading} />

      <div className="flex-1">
        {viewMode === "map" && (
          <ScooterMapView
            scooters={filteredScooters}
            onViewChange={handleViewChange}
            onScooterSelect={handleScooterSelect}
            selectedScooterId={selectedScooter}
          />
        )}
        {viewMode === "list" && (
          <ScooterListView
            scooters={filteredScooters}
            onViewChange={handleViewChange}
            onScooterSelect={handleScooterSelect}
            onCompare={handleCompare}
            selectedScooters={selectedScooters}
            onToggleSelect={handleToggleSelect}
          />
        )}
      </div>

      <FilterDialog
        open={isFilterDialogOpen}
        onOpenChange={handleCloseFilterDialog}
        initialFilters={filters}
        onApplyFilters={applyFilters}
      />

      <ScooterComparison
        open={isComparisonOpen}
        scooters={filteredScooters.filter((s) => selectedScooters.includes(s.id))}
        onClose={handleCloseComparison}
        onRent={(scooterId) => {
          // Handle rent action
          console.log("Rent scooter:", scooterId)
          handleCloseComparison()
        }}
      />
    </div>
  )
}
