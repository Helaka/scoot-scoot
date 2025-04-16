export type ScooterFuelType = "petrol" | "electric" | "hybrid"
export type ScooterStatus = "available" | "rented" | "maintenance"

export interface ScooterPricing {
  hourlyRate?: number
  dailyRate?: number
  weeklyRate?: number
  weekendRate?: number
  customPricing?: boolean
  pricingNotes?: string
}

export interface Scooter {
  id: string
  model: string
  status: ScooterStatus
  fuelType: ScooterFuelType
  fuelLevel?: number
  batteryLevel?: number
  fuelCapacity?: number
  location: string
  lastMaintenance: string
  nextMaintenanceDue?: string
  totalRentals: number
  licensePlate?: string
  engineSize?: number
  yearManufactured?: number
  mileage?: number
  color?: string
  image?: string
  images?: string[]
  notes?: string
  pricing?: ScooterPricing
}
