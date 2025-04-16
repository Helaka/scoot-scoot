"use client"

import { useState, useEffect, useRef } from "react"
import { useRiderContext } from "@/contexts/rider-context"
import { MapPin, Navigation, Bike, Clock, CheckCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data for the map
const MOCK_LOCATIONS = {
  current: { lat: 40.7128, lng: -74.006 },
  scooters: [
    { id: "scooter-1", lat: 40.7135, lng: -74.0046, type: "scooter", battery: 87 },
    { id: "scooter-2", lat: 40.714, lng: -74.0065, type: "scooter", battery: 92 },
    { id: "scooter-3", lat: 40.7118, lng: -74.0072, type: "scooter", battery: 45 },
  ],
  bikes: [
    { id: "bike-1", lat: 40.7132, lng: -74.0055, type: "bike", battery: 78 },
    { id: "bike-2", lat: 40.7125, lng: -74.008, type: "bike", battery: 65 },
  ],
  dropZones: [
    { id: "zone-1", lat: 40.715, lng: -74.006, name: "Central Park South" },
    { id: "zone-2", lat: 40.711, lng: -74.005, name: "Downtown Transit Hub" },
    { id: "zone-3", lat: 40.7135, lng: -74.009, name: "West Village" },
  ],
}

export function ContextAwareMap() {
  const { state, setActiveState, setPostRentalState } = useRiderContext()
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [mapZoom, setMapZoom] = useState(15)
  const [mapCenter, setMapCenter] = useState(MOCK_LOCATIONS.current)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Update map based on context state
  useEffect(() => {
    if (state.state === "active" && state.returnLocation) {
      // Find the drop zone
      const dropZone = MOCK_LOCATIONS.dropZones.find((zone) => zone.name === state.returnLocation)
      if (dropZone) {
        setMapCenter({ lat: dropZone.lat, lng: dropZone.lng })
        setMapZoom(16)
      }
    } else if (state.state === "looking") {
      setMapCenter(MOCK_LOCATIONS.current)
      setMapZoom(15)
    } else if (state.state === "post_rental") {
      setMapZoom(14)
    }
  }, [state.state, state.returnLocation])

  // Simulate starting a rental
  const startRental = () => {
    if (!selectedVehicle) return

    const vehicle = [...MOCK_LOCATIONS.scooters, ...MOCK_LOCATIONS.bikes].find((v) => v.id === selectedVehicle)

    if (!vehicle) return

    const dropZone = MOCK_LOCATIONS.dropZones[Math.floor(Math.random() * MOCK_LOCATIONS.dropZones.length)]

    setActiveState(
      selectedVehicle,
      vehicle.type,
      30 * 60 * 1000, // 30 minutes in milliseconds
      dropZone.name,
    )

    setSelectedVehicle(null)
  }

  // Simulate ending a rental
  const endRental = () => {
    if (state.rentalId && state.vehicleType) {
      setPostRentalState(state.rentalId, state.vehicleType)
    }
  }

  // Render map content based on context state
  const renderMapContent = () => {
    if (!isMapLoaded) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )
    }

    switch (state.state) {
      case "looking":
        return (
          <>
            {/* Map background */}
            <div className="absolute inset-0 bg-gray-200 opacity-50"></div>

            {/* Current location marker */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
                <div className="relative bg-primary text-white p-2 rounded-full">
                  <Navigation size={20} />
                </div>
              </div>
            </div>

            {/* Vehicle markers */}
            {MOCK_LOCATIONS.scooters.map((scooter) => (
              <div
                key={scooter.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
                  selectedVehicle === scooter.id ? "scale-125 z-10" : "hover:scale-110",
                  selectedVehicle && selectedVehicle !== scooter.id ? "opacity-50" : "opacity-100",
                )}
                style={{
                  left: `${((scooter.lng - mapCenter.lng) * 0.02 * mapZoom) * 100 + 50}%`,
                  top: `${((scooter.lat - mapCenter.lat) * -0.02 * mapZoom) * 100 + 50}%`,
                }}
                onClick={() => setSelectedVehicle(scooter.id)}
              >
                <div
                  className={cn(
                    "bg-green-500 text-white p-2 rounded-full cursor-pointer",
                    selectedVehicle === scooter.id ? "ring-4 ring-green-300" : "",
                  )}
                >
                  <Bike size={20} />
                </div>
                {selectedVehicle === scooter.id && (
                  <Card className="absolute top-full mt-2 p-2 w-36 z-20">
                    <div className="text-xs font-semibold">Scooter #{scooter.id.split("-")[1]}</div>
                    <div className="text-xs">Battery: {scooter.battery}%</div>
                    <div className="text-xs">~2 min away</div>
                    <Button size="sm" className="w-full mt-2" onClick={startRental}>
                      Rent Now
                    </Button>
                  </Card>
                )}
              </div>
            ))}

            {MOCK_LOCATIONS.bikes.map((bike) => (
              <div
                key={bike.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
                  selectedVehicle === bike.id ? "scale-125 z-10" : "hover:scale-110",
                  selectedVehicle && selectedVehicle !== bike.id ? "opacity-50" : "opacity-100",
                )}
                style={{
                  left: `${((bike.lng - mapCenter.lng) * 0.02 * mapZoom) * 100 + 50}%`,
                  top: `${((bike.lat - mapCenter.lat) * -0.02 * mapZoom) * 100 + 50}%`,
                }}
                onClick={() => setSelectedVehicle(bike.id)}
              >
                <div
                  className={cn(
                    "bg-blue-500 text-white p-2 rounded-full cursor-pointer",
                    selectedVehicle === bike.id ? "ring-4 ring-blue-300" : "",
                  )}
                >
                  <Bike size={20} />
                </div>
                {selectedVehicle === bike.id && (
                  <Card className="absolute top-full mt-2 p-2 w-36 z-20">
                    <div className="text-xs font-semibold">Bike #{bike.id.split("-")[1]}</div>
                    <div className="text-xs">Battery: {bike.battery}%</div>
                    <div className="text-xs">~3 min away</div>
                    <Button size="sm" className="w-full mt-2" onClick={startRental}>
                      Rent Now
                    </Button>
                  </Card>
                )}
              </div>
            ))}

            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button size="icon" variant="secondary" onClick={() => setMapZoom((prev) => Math.min(prev + 1, 18))}>
                +
              </Button>
              <Button size="icon" variant="secondary" onClick={() => setMapZoom((prev) => Math.max(prev - 1, 13))}>
                -
              </Button>
            </div>

            {/* Search bar */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-5/6 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  placeholder="Search for a location..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </>
        )

      case "active":
        return (
          <>
            {/* Map background */}
            <div className="absolute inset-0 bg-gray-200 opacity-50"></div>

            {/* Current location marker */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
                <div className="relative bg-primary text-white p-2 rounded-full">
                  <Navigation size={20} />
                </div>
              </div>
            </div>

            {/* Return zone marker */}
            {state.returnLocation && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${((MOCK_LOCATIONS.dropZones[0].lng - mapCenter.lng) * 0.02 * mapZoom) * 100 + 50}%`,
                  top: `${((MOCK_LOCATIONS.dropZones[0].lat - mapCenter.lat) * -0.02 * mapZoom) * 100 + 50}%`,
                }}
              >
                <div className="relative">
                  <div className="absolute -inset-8 bg-green-500/20 rounded-full"></div>
                  <div className="absolute -inset-16 bg-green-500/10 rounded-full"></div>
                  <div className="relative bg-green-500 text-white p-3 rounded-full">
                    <MapPin size={24} />
                  </div>
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium">
                  {state.returnLocation}
                </div>
              </div>
            )}

            {/* Active rental info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-5/6 max-w-md">
              <Card className="p-4 shadow-lg border-2 border-primary">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {state.vehicleType === "scooter" ? (
                      <div className="bg-green-500 text-white p-1.5 rounded-full">
                        <Bike size={16} />
                      </div>
                    ) : (
                      <div className="bg-blue-500 text-white p-1.5 rounded-full">
                        <Bike size={16} />
                      </div>
                    )}
                    <div className="font-semibold">
                      {state.vehicleType === "scooter" ? "Scooter" : "Bike"} #{state.rentalId?.split("-")[1]}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Clock size={16} />
                    <span className="font-mono">
                      {Math.floor((state.timeRemaining || 0) / 60000)}:
                      {String(Math.floor(((state.timeRemaining || 0) % 60000) / 1000)).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="text-sm mb-3">
                  Return to: <span className="font-medium">{state.returnLocation}</span>
                </div>
                <Button className="w-full" variant="destructive" onClick={endRental}>
                  End Rental
                </Button>
              </Card>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="icon" variant="secondary" onClick={() => setMapZoom((prev) => Math.min(prev + 1, 18))}>
                +
              </Button>
              <Button size="icon" variant="secondary" onClick={() => setMapZoom((prev) => Math.max(prev - 1, 13))}>
                -
              </Button>
            </div>
          </>
        )

      case "post_rental":
        return (
          <>
            {/* Map background */}
            <div className="absolute inset-0 bg-gray-200 opacity-50"></div>

            {/* Rental summary */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-md">
              <Card className="p-6 shadow-lg border-2 border-green-500">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    <CheckCircle size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Rental Complete!</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vehicle</span>
                    <span className="font-medium">
                      {state.vehicleType === "scooter" ? "Scooter" : "Bike"} #{state.rentalId?.split("-")[1]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">30 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cost</span>
                    <span className="font-medium">$4.50</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full">
                    View Receipt
                  </Button>
                  <Button className="w-full">Find Another Vehicle</Button>
                </div>
              </Card>
            </div>
          </>
        )

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">
              <Search size={48} className="mx-auto mb-2 opacity-50" />
              <p>Select a vehicle on the map to begin</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] bg-gray-100 rounded-lg overflow-hidden shadow-inner">
      <div ref={mapRef} className="absolute inset-0">
        {renderMapContent()}
      </div>
    </div>
  )
}
