"use client"
import type { HeatmapData } from "@/types/map-types"

interface HeatmapLayerProps {
  data: HeatmapData[]
  visible: boolean
  colorGradient?: string[]
  intensity?: number
  radius?: number
  type: "popular" | "police"
}

export function HeatmapLayer({
  data,
  visible,
  colorGradient = ["rgba(255, 222, 0, 0)", "rgba(255, 222, 0, 0.5)", "rgba(255, 222, 0, 0.8)", "rgba(255, 0, 0, 1)"],
  intensity = 0.6,
  radius = 20,
  type,
}: HeatmapLayerProps) {
  // In a real implementation, this would use a mapping library's heatmap layer
  // For this demo, we'll create a visual representation with divs

  if (!visible) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      {data.map((point, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${type === "popular" ? "bg-yellow-500/40" : "bg-red-500/40"} blur-md`}
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: `${point.weight * radius * 2}px`,
            height: `${point.weight * radius * 2}px`,
            opacity: point.weight * intensity,
          }}
        />
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 p-2 rounded-md shadow-md">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${type === "popular" ? "bg-yellow-500" : "bg-red-500"}`} />
          <span className="text-xs font-medium">{type === "popular" ? "Popular Areas" : "Police Checkpoints"}</span>
        </div>
      </div>
    </div>
  )
}
