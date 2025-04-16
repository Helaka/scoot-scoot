"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

// Define types for scooter data
export interface Scooter {
  id: string
  model: string
  image?: string
  location: string
  distance: number
  rating: number
  reviews: number
  pricePerHour: number
  pricePerDay: number
  fuelType: "gasoline" | "electric"
  fuelLevel?: number
  batteryLevel?: number
  engineSize?: number
  licensePlate: string
  isAvailable: boolean
  features?: string[]
  shopId: string
  shopName: string
  shopRating: number
}

export interface ScooterFilters {
  distance: number
  types: string[]
  priceRange: string
  minRating: number
  availability?: boolean
  features?: string[]
}

interface ScooterContextType {
  scooters: Scooter[]
  filteredScooters: Scooter[]
  selectedScooters: string[]
  filters: ScooterFilters
  loading: boolean
  error: string | null
  fetchScooters: (location?: { lat: number; lng: number }) => Promise<void>
  applyFilters: (filters: ScooterFilters) => void
  resetFilters: () => void
  toggleScooterSelection: (scooterId: string) => void
  clearSelectedScooters: () => void
}

const defaultFilters: ScooterFilters = {
  distance: 5,
  types: [],
  priceRange: "all",
  minRating: 0,
  availability: true,
}

// Create context
const ScooterContext = createContext<ScooterContextType | undefined>(undefined)

// Mock data for demo purposes
const mockScooters: Scooter[] = [
  {
    id: "s1",
    model: "Honda PCX 150cc",
    image: "/placeholder.svg?height=150&width=300&text=Honda%20PCX",
    location: "Beach Road",
    distance: 0.3,
    rating: 4.8,
    reviews: 24,
    pricePerHour: 8,
    pricePerDay: 35,
    fuelType: "gasoline",
    fuelLevel: 85,
    engineSize: 150,
    licensePlate: "AB123",
    isAvailable: true,
    features: ["Helmet", "Storage Box", "USB Charger"],
    shopId: "shop1",
    shopName: "Beach Scooter Rentals",
    shopRating: 4.7,
  },
  {
    id: "s2",
    model: "Yamaha NMAX 155cc",
    image: "/placeholder.svg?height=150&width=300&text=Yamaha%20NMAX",
    location: "Main Street",
    distance: 0.7,
    rating: 4.9,
    reviews: 32,
    pricePerHour: 10,
    pricePerDay: 45,
    fuelType: "gasoline",
    fuelLevel: 92,
    engineSize: 155,
    licensePlate: "CD456",
    isAvailable: true,
    features: ["Helmet", "Rain Cover", "Phone Holder"],
    shopId: "shop2",
    shopName: "City Scooter Hub",
    shopRating: 4.8,
  },
  {
    id: "s3",
    model: "Vespa Primavera 125cc",
    image: "/placeholder.svg?height=150&width=300&text=Vespa",
    location: "Old Town",
    distance: 1.2,
    rating: 4.7,
    reviews: 18,
    pricePerHour: 12,
    pricePerDay: 55,
    fuelType: "gasoline",
    fuelLevel: 78,
    engineSize: 125,
    licensePlate: "EF789",
    isAvailable: true,
    features: ["Helmet", "Gloves", "Touring Map"],
    shopId: "shop3",
    shopName: "Vintage Scooter Rentals",
    shopRating: 4.6,
  },
  {
    id: "s4",
    model: "NIU NQi GT Electric",
    image: "/placeholder.svg?height=150&width=300&text=NIU%20Electric",
    location: "Green Avenue",
    distance: 1.5,
    rating: 4.6,
    reviews: 15,
    pricePerHour: 9,
    pricePerDay: 40,
    fuelType: "electric",
    batteryLevel: 92,
    licensePlate: "GH012",
    isAvailable: true,
    features: ["Helmet", "Fast Charging", "GPS"],
    shopId: "shop4",
    shopName: "Eco Scooter Rentals",
    shopRating: 4.5,
  },
  {
    id: "s5",
    model: "Suzuki Burgman 200cc",
    image: "/placeholder.svg?height=150&width=300&text=Suzuki%20Burgman",
    location: "Harbor Road",
    distance: 1.8,
    rating: 4.5,
    reviews: 12,
    pricePerHour: 11,
    pricePerDay: 50,
    fuelType: "gasoline",
    fuelLevel: 65,
    engineSize: 200,
    licensePlate: "IJ345",
    isAvailable: false,
    features: ["Helmet", "Luggage Box", "Windshield"],
    shopId: "shop5",
    shopName: "Harbor Scooter Rentals",
    shopRating: 4.4,
  },
  {
    id: "s6",
    model: "Honda ADV 150cc",
    image: "/placeholder.svg?height=150&width=300&text=Honda%20ADV",
    location: "Adventure Street",
    distance: 2.1,
    rating: 4.9,
    reviews: 28,
    pricePerHour: 10,
    pricePerDay: 48,
    fuelType: "gasoline",
    fuelLevel: 88,
    engineSize: 150,
    licensePlate: "KL678",
    isAvailable: true,
    features: ["Helmet", "Adventure Kit", "GoPro Mount"],
    shopId: "shop6",
    shopName: "Adventure Scooter Rentals",
    shopRating: 4.9,
  },
]

// Provider component
export const ScooterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scooters, setScooters] = useState<Scooter[]>([])
  const [filteredScooters, setFilteredScooters] = useState<Scooter[]>([])
  const [selectedScooters, setSelectedScooters] = useState<string[]>([])
  const [filters, setFilters] = useState<ScooterFilters>(defaultFilters)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch scooters (mock implementation)
  const fetchScooters = async (location?: { lat: number; lng: number }) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data with a delay to simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // If location is provided, we could sort by distance
      const fetchedScooters = [...mockScooters]

      setScooters(fetchedScooters)
      setFilteredScooters(fetchedScooters)

      toast({
        title: "Scooters loaded",
        description: `Found ${fetchedScooters.length} scooters near you`,
      })
    } catch (err) {
      setError("Failed to fetch scooters. Please try again.")
      toast({
        title: "Error",
        description: "Failed to load scooters. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Apply filters to scooters
  const applyFilters = (newFilters: ScooterFilters) => {
    setFilters(newFilters)

    const filtered = scooters.filter((scooter) => {
      // Filter by distance
      if (scooter.distance > newFilters.distance) {
        return false
      }

      // Filter by scooter type
      if (newFilters.types.length > 0) {
        // This is a simplified example - in a real app, you'd have proper type data
        const scooterType = scooter.engineSize
          ? scooter.engineSize > 150
            ? "Manual"
            : "Automatic"
          : scooter.fuelType === "electric"
            ? "Electric"
            : "Moped"

        if (!newFilters.types.includes(scooterType)) {
          return false
        }
      }

      // Filter by price range
      if (newFilters.priceRange !== "all") {
        const price = scooter.pricePerDay

        if (newFilters.priceRange === "under40" && price >= 40) return false
        if (newFilters.priceRange === "40-60" && (price < 40 || price > 60)) return false
        if (newFilters.priceRange === "60-80" && (price < 60 || price > 80)) return false
        if (newFilters.priceRange === "80plus" && price < 80) return false
      }

      // Filter by rating
      if (newFilters.minRating > 0 && scooter.rating < newFilters.minRating) {
        return false
      }

      // Filter by availability
      if (newFilters.availability && !scooter.isAvailable) {
        return false
      }

      return true
    })

    setFilteredScooters(filtered)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters(defaultFilters)
    setFilteredScooters(scooters)
  }

  // Toggle scooter selection (for comparison)
  const toggleScooterSelection = (scooterId: string) => {
    setSelectedScooters((prev) => {
      if (prev.includes(scooterId)) {
        return prev.filter((id) => id !== scooterId)
      } else {
        // Limit to 3 selections
        if (prev.length >= 3) {
          toast({
            title: "Selection limit reached",
            description: "You can compare up to 3 scooters at a time",
          })
          return prev
        }
        return [...prev, scooterId]
      }
    })
  }

  // Clear selected scooters
  const clearSelectedScooters = () => {
    setSelectedScooters([])
  }

  // Apply initial filters when scooters change
  useEffect(() => {
    applyFilters(filters)
  }, [scooters])

  const value = {
    scooters,
    filteredScooters,
    selectedScooters,
    filters,
    loading,
    error,
    fetchScooters,
    applyFilters,
    resetFilters,
    toggleScooterSelection,
    clearSelectedScooters,
  }

  return <ScooterContext.Provider value={value}>{children}</ScooterContext.Provider>
}

// Custom hook to use the scooter context
export const useScooters = () => {
  const context = useContext(ScooterContext)
  if (context === undefined) {
    throw new Error("useScooters must be used within a ScooterProvider")
  }
  return context
}
