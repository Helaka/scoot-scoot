"use client"

import { useState, useEffect } from "react"
import { EnhancedMap } from "../map/enhanced-map"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Locate, List } from "lucide-react"
import { ScooterQuickView } from "./scooter-quick-view"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface ScooterLocation {
  id: string
  top: number
  left: number
  available: boolean
  scooter: any
}

interface ScooterMapViewProps {
  scooters: any[]
  onViewChange: (view: "map" | "list") => void
  onScooterSelect: (scooter: any) => void
  selectedScooterId?: string
}

export function ScooterMapView({ scooters, onViewChange, onScooterSelect, selectedScooterId }: ScooterMapViewProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedMapScooter, setSelectedMapScooter] = useState<any | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Transform scooter data for map display
  const scooterLocations: ScooterLocation[] = scooters.map((scooter, index) => {
    // Calculate positions - in a real app, these would be actual GPS coordinates
    const top = 20 + ((index * 10) % 60)
    const left = 15 + ((index * 15) % 70)

    return {
      id: scooter.id,
      top,
      left,
      available: true,
      scooter,
    }
  })

  // Handle scooter selection on map
  const handleScooterClick = (scooterId: string) => {
    const scooter = scooters.find((s) => s.id === scooterId)
    if (scooter) {
      setSelectedMapScooter(scooter)
      onScooterSelect(scooter)
    }
  }

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLocating(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          toast({
            title: "Location updated",
            description: "Showing scooters near your current location",
          })
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location error",
            description: "Unable to get your location. Please check your settings.",
            variant: "destructive",
          })
          setIsLocating(false)
        },
      )
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      })
      setIsLocating(false)
    }
  }

  // Update selected scooter when selectedScooterId changes
  useEffect(() => {
    if (selectedScooterId) {
      const scooter = scooters.find((s) => s.id === selectedScooterId)
      if (scooter) {
        setSelectedMapScooter(scooter)
      }
    } else {
      setSelectedMapScooter(null)
    }
  }, [selectedScooterId, scooters])

  return (
    <div className="relative flex flex-col h-full">
      <Card className="flex-1">
        <CardContent className="p-0 h-[calc(100vh-220px)] md:h-[600px] relative">
          {/* Map Component */}
          <EnhancedMap
            scooterLocations={scooterLocations.map((loc) => ({
              ...loc,
              onClick: () => handleScooterClick(loc.id),
              isSelected: selectedScooterId === loc.id,
            }))}
            userLocation={userLocation}
          />

          {/* Map Controls */}
          <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 dark:bg-gray-800/90 shadow-md h-10 w-10"
              onClick={getCurrentLocation}
              disabled={isLocating}
            >
              <Locate className="h-5 w-5" />
            </Button>
          </div>

          {/* View Toggle (Mobile Only) */}
          {isMobile && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 shadow-md"
              onClick={() => onViewChange("list")}
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Selected Scooter Quick View */}
      {selectedMapScooter && (
        <div className="mt-4">
          <ScooterQuickView
            scooter={selectedMapScooter}
            onClose={() => {
              setSelectedMapScooter(null)
              onScooterSelect(null)
            }}
          />
        </div>
      )}

      {/* Nearby Scooters Preview */}
      {!selectedMapScooter && scooters.length > 0 && (
        <div className="mt-4 flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
          {scooters.slice(0, 5).map((scooter) => (
            <div
              key={scooter.id}
              className="flex-shrink-0 w-[280px] cursor-pointer"
              onClick={() => {
                setSelectedMapScooter(scooter)
                onScooterSelect(scooter)
              }}
            >
              <ScooterQuickView scooter={scooter} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
