"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Navigation,
  Shield,
  Share2,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  Compass,
  Pause,
  Play,
  Save,
  X,
  Phone,
  MapPin,
  Layers,
  Zap,
  Coffee,
  Fuel,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface RiderModeProps {
  rental: any
  onExit: () => void
}

export function RiderMode({ rental, onExit }: RiderModeProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [showPoliceCheckpoints, setShowPoliceCheckpoints] = useState(true)
  const [showHeatMap, setShowHeatMap] = useState(true)
  const [showPOIs, setShowPOIs] = useState(true)
  const [showTraffic, setShowTraffic] = useState(true)
  const [mapStyle, setMapStyle] = useState("standard")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isInfoExpanded, setIsInfoExpanded] = useState(true)
  const [destination, setDestination] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isSOSOpen, setIsSOSOpen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // Mock popular destinations
  const popularDestinations = [
    { id: "dest1", name: "Pai Canyon", distance: 5.2 },
    { id: "dest2", name: "Pai Walking Street", distance: 1.3 },
    { id: "dest3", name: "Pai Hot Springs", distance: 7.8 },
    { id: "dest4", name: "Pai Waterfall", distance: 9.1 },
  ]

  // Mock POIs
  const pointsOfInterest = [
    { id: "poi1", name: "Coffee in Love", type: "cafe", position: { top: "30%", left: "25%" } },
    { id: "poi2", name: "Gas Station", type: "fuel", position: { top: "45%", left: "65%" } },
    { id: "poi3", name: "Viewpoint", type: "attraction", position: { top: "20%", left: "70%" } },
    { id: "poi4", name: "7-Eleven", type: "convenience", position: { top: "60%", left: "40%" } },
  ]

  // Mock police checkpoints
  const policeCheckpoints = [
    { id: "police1", position: { top: "35%", left: "55%" } },
    { id: "police2", position: { top: "70%", left: "30%" } },
  ]

  useEffect(() => {
    // Start mock data updates
    const speedInterval = setInterval(() => {
      if (isRecording) {
        setSpeed(Math.floor(Math.random() * 30) + 10) // Random speed between 10-40 km/h
        setDistance((prev) => prev + Math.random() * 0.05) // Increment distance
      }
    }, 3000)

    return () => {
      clearInterval(speedInterval)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording])

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      setIsRecording(false)

      // Show save option
      if (distance > 0.1) {
        toast({
          title: "Ride Paused",
          description: "Your ride data has been saved. Continue or end your ride.",
          action: (
            <Button size="sm" onClick={handleSaveRide}>
              Save Ride
            </Button>
          ),
        })
      }
    } else {
      // Start recording
      setIsRecording(true)
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
  }

  const handleSaveRide = () => {
    toast({
      title: "Ride Saved",
      description: "Your ride has been saved to your profile.",
    })
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleNavigateTo = (destName: string) => {
    setDestination(destName)
    setIsNavigating(true)
    toast({
      title: "Navigation Started",
      description: `Navigating to ${destName}`,
    })
  }

  const handleStopNavigation = () => {
    setDestination(null)
    setIsNavigating(false)
  }

  const handleSOS = () => {
    setIsSOSOpen(true)
  }

  const handleSOSCall = (type: string) => {
    toast({
      title: "Emergency Contact",
      description: `Contacting ${type}...`,
      variant: "destructive",
    })
    setIsSOSOpen(false)
  }

  return (
    <div className={`fixed inset-0 bg-background z-50 flex flex-col ${isFullscreen ? "pb-0" : "pb-16"}`}>
      {/* Map Area */}
      <div className="relative flex-1 bg-muted overflow-hidden">
        {/* Simulated Map */}
        <div className="absolute inset-0 bg-gray-200">
          <img
            src="/placeholder.svg?height=800&width=600&text=Interactive+Map"
            alt="Map"
            className="h-full w-full object-cover"
          />

          {/* Map Overlay UI */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

          {/* POIs */}
          {showPOIs &&
            pointsOfInterest.map((poi) => (
              <div
                key={poi.id}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: poi.position.top, left: poi.position.left }}
              >
                <div className="relative group">
                  <div className="bg-white rounded-full p-2 shadow-md">
                    {poi.type === "cafe" && <Coffee className="h-4 w-4 text-brown-500" />}
                    {poi.type === "fuel" && <Fuel className="h-4 w-4 text-green-500" />}
                    {poi.type === "attraction" && <MapPin className="h-4 w-4 text-red-500" />}
                    {poi.type === "convenience" && <Home className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity">
                    {poi.name}
                  </div>
                </div>
              </div>
            ))}

          {/* Police Checkpoints */}
          {showPoliceCheckpoints &&
            policeCheckpoints.map((checkpoint) => (
              <div
                key={checkpoint.id}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: checkpoint.position.top, left: checkpoint.position.left }}
              >
                <div className="relative group">
                  <div className="bg-blue-100 rounded-full p-2 shadow-md border-2 border-blue-300 animate-pulse">
                    <Shield className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity">
                    Police Checkpoint
                  </div>
                </div>
              </div>
            ))}

          {/* User Location */}
          <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
              <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
            </div>
          </div>

          {/* Navigation Arrow (when navigating) */}
          {isNavigating && (
            <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 -mt-16">
              <div className="relative">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-500/80 shadow-lg">
                  <Navigation className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {destination} - Continue 300m
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-center">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full shadow-md bg-white/90 hover:bg-white"
            onClick={onExit}
          >
            <X className="h-4 w-4 mr-1" />
            Exit
          </Button>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full shadow-md bg-white/90 hover:bg-white"
              onClick={() => setMapStyle(mapStyle === "standard" ? "satellite" : "standard")}
            >
              <Layers className="h-4 w-4" />
            </Button>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="secondary" size="sm" className="rounded-full shadow-md bg-white/90 hover:bg-white">
                  <Compass className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4 space-y-4">
                  <h3 className="text-lg font-semibold">Map Settings</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <Label htmlFor="police-checkpoints">Police Checkpoints</Label>
                      </div>
                      <Switch
                        id="police-checkpoints"
                        checked={showPoliceCheckpoints}
                        onCheckedChange={setShowPoliceCheckpoints}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-red-500" />
                        <Label htmlFor="heat-map">Heat Map</Label>
                      </div>
                      <Switch id="heat-map" checked={showHeatMap} onCheckedChange={setShowHeatMap} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <Label htmlFor="pois">Points of Interest</Label>
                      </div>
                      <Switch id="pois" checked={showPOIs} onCheckedChange={setShowPOIs} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-orange-500" />
                        <Label htmlFor="traffic">Traffic</Label>
                      </div>
                      <Switch id="traffic" checked={showTraffic} onCheckedChange={setShowTraffic} />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Map Type</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={mapStyle === "standard" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMapStyle("standard")}
                      >
                        Standard
                      </Button>
                      <Button
                        variant={mapStyle === "satellite" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMapStyle("satellite")}
                      >
                        Satellite
                      </Button>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* SOS Button */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-20 right-4 h-12 w-12 rounded-full shadow-lg"
          onClick={handleSOS}
        >
          <Phone className="h-6 w-6" />
        </Button>

        {/* SOS Dialog */}
        {isSOSOpen && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
            <Card className="w-[90%] max-w-md p-4 space-y-4">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold">Emergency Assistance</h2>
                <p className="text-sm text-muted-foreground">What type of help do you need?</p>
              </div>

              <div className="grid gap-2">
                <Button variant="destructive" className="w-full" onClick={() => handleSOSCall("Emergency Services")}>
                  Call Emergency Services (191)
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSOSCall("Tourist Police")}>
                  Call Tourist Police (1155)
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSOSCall("Rental Shop")}>
                  Call Rental Shop
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSOSCall("Insurance Assistance")}>
                  Insurance Assistance
                </Button>
                <Button variant="ghost" className="w-full mt-2" onClick={() => setIsSOSOpen(false)}>
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Info (when navigating) */}
        {isNavigating && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 rounded-lg shadow-lg px-4 py-2 flex items-center gap-3">
            <div className="flex-1">
              <div className="text-sm font-medium">{destination}</div>
              <div className="text-xs text-muted-foreground">Arrive in 15 min</div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleStopNavigation}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Info Panel */}
      {!isFullscreen && (
        <div className="absolute bottom-0 left-0 right-0 bg-background border-t shadow-lg">
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" className="h-6" onClick={() => setIsInfoExpanded(!isInfoExpanded)}>
              {isInfoExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>

          {isInfoExpanded && (
            <div className="p-4 space-y-4">
              {/* Ride Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Time</div>
                  <div className="text-lg font-semibold">{formatTime(elapsedTime)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Distance</div>
                  <div className="text-lg font-semibold">{distance.toFixed(1)} km</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Speed</div>
                  <div className="text-lg font-semibold">{speed} km/h</div>
                </div>
              </div>

              {/* Rental Info */}
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted">
                <div className="h-10 w-10 rounded-md overflow-hidden">
                  <img
                    src={rental.scooterImage || "/placeholder.svg?height=40&width=40"}
                    alt={rental.scooterName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{rental.scooterName}</div>
                  <div className="text-xs text-muted-foreground">
                    Return by {rental.endDate} ({rental.remainingHours}h remaining)
                  </div>
                </div>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  Active
                </Badge>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleRecording}
                  className="gap-1"
                >
                  {isRecording ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isRecording ? "Pause" : "Record Ride"}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveRide} disabled={distance < 0.1}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Popular Destinations */}
              <div>
                <h3 className="text-sm font-medium mb-2">Popular Destinations</h3>
                <div className="grid grid-cols-2 gap-2">
                  {popularDestinations.map((dest) => (
                    <Button
                      key={dest.id}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => handleNavigateTo(dest.name)}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{dest.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{dest.distance}km</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Import the necessary icons
import { Car } from "lucide-react"
