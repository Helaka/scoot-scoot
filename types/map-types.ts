import type React from "react"
export interface HeatmapData {
  x: number // percentage position on map (0-100)
  y: number // percentage position on map (0-100)
  weight: number // intensity (0-1)
  // In a real implementation with a mapping library like Google Maps or Mapbox:
  // lat: number
  // lng: number
  // weight: number
}

export interface MapToggleOption {
  id: string
  label: string
  icon: React.ReactNode
  description: string
}
