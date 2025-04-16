"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Flame, Shield, Layers, Info } from "lucide-react"
import type { MapToggleOption } from "@/types/map-types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MapControlsProps {
  onToggleHeatmap: (type: string, enabled: boolean) => void
}

export function MapControls({ onToggleHeatmap }: MapControlsProps) {
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({
    popularAreas: false,
    policeCheckpoints: false,
  })

  const toggleOptions: MapToggleOption[] = [
    {
      id: "popularAreas",
      label: "Popular Areas",
      icon: <Flame className="h-4 w-4 text-yellow-500" />,
      description: "See where other riders frequently visit",
    },
    {
      id: "policeCheckpoints",
      label: "Police Checkpoints",
      icon: <Shield className="h-4 w-4 text-red-500" />,
      description: "Community-reported license check locations",
    },
  ]

  const handleToggle = (id: string, value: boolean) => {
    setActiveToggles((prev) => ({ ...prev, [id]: value }))
    onToggleHeatmap(id, value)
  }

  return (
    <div className="absolute top-4 right-4 z-10">
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="bg-white/90 dark:bg-gray-800/90 shadow-md">
                  <Layers className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Map Layers</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <h4 className="font-medium">Map Layers</h4>
            <div className="space-y-2">
              {toggleOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      {option.icon}
                    </div>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </div>
                  <Switch
                    checked={activeToggles[option.id]}
                    onCheckedChange={(checked) => handleToggle(option.id, checked)}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-3">
              <Info className="h-4 w-4 text-yellow-500" />
              <p className="text-xs text-muted-foreground">
                Community-driven data is updated in real-time based on rider reports
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
