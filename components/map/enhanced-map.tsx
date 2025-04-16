"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MapControls } from "./map-controls"
import { HeatmapLayer } from "./heatmap-layer"
import { ReportCheckpoint } from "./report-checkpoint"
import { ContributeDataDialog } from "./contribute-data-dialog"
import type { HeatmapData } from "@/types/map-types"
import { Bike, MapPin, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScooterLocation {
  id: string
  top: number
  left: number
  available: boolean
  onClick?: () => void
  isSelected?: boolean
  scooter?: any
}

interface EnhancedMapProps {
  children?: React.ReactNode
  scooterLocations?: ScooterLocation[]
  userLocation?: { lat: number; lng: number } | null
}

export function EnhancedMap({ children, scooterLocations = [], userLocation = null }: EnhancedMapProps) {
  const [showPopularAreas, setShowPopularAreas] = useState(false)
  const [showPoliceCheckpoints, setShowPoliceCheckpoints] = useState(false)
  const [mapInteracted, setMapInteracted] = useState(false)

  // Mock data for popular areas
  const popularAreasData: HeatmapData[] = [
    { x: 25, y: 30, weight: 0.8 },
    { x: 40, y: 50, weight: 1.0 },
    { x: 70, y: 35, weight: 0.6 },
    { x: 60, y: 70, weight: 0.7 },
    { x: 30, y: 60, weight: 0.5 },
  ]

  // Mock data for police checkpoints
  const policeCheckpointsData: HeatmapData[] = [
    { x: 20, y: 40, weight: 0.9 },
    { x: 65, y: 25, weight: 0.7 },
    { x: 80, y: 60, weight: 0.8 },
  ]

  const handleToggleHeatmap = (type: string, enabled: boolean) => {
    if (type === "popularAreas") {
      setShowPopularAreas(enabled)
    } else if (type === "policeCheckpoints") {
      setShowPoliceCheckpoints(enabled)
    }
  }

  // Simulate map interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapInteracted(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full bg-gray-200 dark:bg-gray-700" onClick={() => setMapInteracted(true)}>
      {/* Map Controls */}
      <MapControls onToggleHeatmap={handleToggleHeatmap} />

      {/* Report Checkpoint Button */}
      <ReportCheckpoint />

      {/* Contribute Data Button */}
      <ContributeDataDialog />

      {/* Heatmap Layers */}
      <HeatmapLayer data={popularAreasData} visible={showPopularAreas} type="popular" />
      <HeatmapLayer data={policeCheckpointsData} visible={showPoliceCheckpoints} type="police" />

      {/* User Location */}
      {userLocation && (
        <div
          className="absolute z-20 flex items-center justify-center"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -inset-1 rounded-full bg-blue-500/30 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Scooter Locations */}
      {scooterLocations.map((scooter) => (
        <div
          key={scooter.id}
          className={cn(
            "absolute rounded-full p-1 cursor-pointer transition-all transform hover:scale-110",
            scooter.available ? "bg-green-500" : "bg-gray-400",
            scooter.isSelected ? "ring-2 ring-yellow-400 scale-110" : "",
          )}
          style={{ top: `${scooter.top}%`, left: `${scooter.left}%` }}
          onClick={scooter.onClick}
        >
          <Bike className="h-4 w-4 text-white" />
        </div>
      ))}

      {/* Any additional children */}
      {children}

      {/* Map placeholder text */}
      {!mapInteracted && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm">
          <div className="text-center p-4 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-lg">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <p className="font-medium">Tap to interact with map</p>
            <p className="text-sm text-muted-foreground">Explore scooters in your area</p>
          </div>
        </div>
      )}

      {/* Map background */}
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Map View</p>
      </div>
    </div>
  )
}
