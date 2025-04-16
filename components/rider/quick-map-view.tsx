"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Locate } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuickMapViewProps {
  onFindScooters: () => void
}

export function QuickMapView({ onFindScooters }: QuickMapViewProps) {
  const [isLocating, setIsLocating] = useState(false)
  const { toast } = useToast()

  const handleGetLocation = () => {
    setIsLocating(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location found",
            description: "Showing scooters near your current location",
          })
          setIsLocating(false)
        },
        (error) => {
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

  return (
    <div className="relative h-[300px] w-full bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-md">
      {/* This would be a real map in production */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/placeholder.svg?height=300&width=600&text=Map+View"
          alt="Map"
          className="w-full h-full object-cover"
        />

        {/* Sample scooter markers */}
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="h-6 w-6 text-yellow-500" />
        </div>
        <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="h-6 w-6 text-yellow-500" />
        </div>
        <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="h-6 w-6 text-yellow-500" />
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button onClick={onFindScooters} className="bg-yellow-500 hover:bg-yellow-600 text-black">
          View Full Map
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/90 dark:bg-gray-800/90 shadow-md h-10 w-10"
          onClick={handleGetLocation}
          disabled={isLocating}
        >
          <Locate className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
