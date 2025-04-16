// Mock service to simulate rental operations
type MockRentalState = "idle" | "looking" | "active" | "completed"

interface MockRental {
  id: string
  vehicleType: string
  timeRemainingInMs: number
  returnLocation: string
  startTime: Date
  endTime?: Date
}

class MockRentalService {
  private state: MockRentalState = "idle"
  private activeRental: MockRental | null = null
  private completedRentals: MockRental[] = []

  constructor() {
    // Initialize with some completed rentals for history
    this.completedRentals = [
      {
        id: "rental-history-1",
        vehicleType: "scooter",
        timeRemainingInMs: 0,
        returnLocation: "Downtown Transit Hub",
        startTime: new Date(Date.now() - 86400000), // 1 day ago
        endTime: new Date(Date.now() - 86400000 + 1800000), // 30 minutes after start
      },
      {
        id: "rental-history-2",
        vehicleType: "bike",
        timeRemainingInMs: 0,
        returnLocation: "Central Park South",
        startTime: new Date(Date.now() - 172800000), // 2 days ago
        endTime: new Date(Date.now() - 172800000 + 3600000), // 1 hour after start
      },
    ]
  }

  setMockState(state: MockRentalState) {
    this.state = state

    if (state === "active" && !this.activeRental) {
      // Create a default active rental if none exists
      this.activeRental = {
        id: `rental-${Date.now()}`,
        vehicleType: Math.random() > 0.5 ? "scooter" : "bike",
        timeRemainingInMs: 30 * 60 * 1000, // 30 minutes
        returnLocation: "Downtown Transit Hub",
        startTime: new Date(),
      }
    } else if (state === "completed" && this.activeRental) {
      // Move active rental to completed
      const rental = {
        ...this.activeRental,
        timeRemainingInMs: 0,
        endTime: new Date(),
      }
      this.completedRentals.unshift(rental)
      this.activeRental = null
    } else if (state === "looking" || state === "idle") {
      this.activeRental = null
    }
  }

  async getActiveRental(): Promise<MockRental | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.activeRental
  }

  async getRecentlyCompletedRental(): Promise<MockRental | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Return the most recent completed rental if it's less than 10 minutes old
    const mostRecent = this.completedRentals[0]
    if (mostRecent && mostRecent.endTime) {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
      if (mostRecent.endTime > tenMinutesAgo) {
        return mostRecent
      }
    }
    return null
  }

  async getRentalHistory(): Promise<MockRental[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...this.completedRentals]
  }
}

// Export as singleton
export const mockRentalService = new MockRentalService()
