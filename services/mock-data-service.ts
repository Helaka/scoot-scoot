// This service provides mock data for the application
// In a real app, this would be replaced with actual API calls

// Types
export interface Scooter {
  id: string
  name: string
  type: string
  color: string
  shop: string
  location: string
  distance: number
  price: number
  rating: number
  reviews: number
  available: boolean
  features: string[]
  image: string
}

export interface Rental {
  id: string
  scooterName: string
  scooterType: string
  scooterColor: string
  rentalShop: string
  startDate: string
  endDate: string
  timeLeft?: string
  daysUntil?: string
  price: string
  status: "active" | "upcoming" | "completed"
  rating?: number
  image: string
  insurance?: {
    plan: string
    coverage: string
    dailyRate: string
    total: string
  }
}

export interface InsurancePlan {
  id: string
  name: string
  price: number
  priceUnit: string
  coverage: number
  deductible: number
  features: string[]
  limitations: string[]
  recommended?: boolean
}

export interface ActiveInsurance {
  plan: string
  startDate: string
  endDate: string
  rentalId: string
  coverageLimit: number
  deductible: number
  cost: number
}

export interface InsuranceHistory {
  id: string
  plan: string
  dates: string
  rentalId: string
  cost: number
  status: string
  claims: number
}

export interface Transaction {
  id: string
  date: string
  description: string
  amount: string
  status: string
  paymentMethod: string
}

export interface PaymentMethod {
  id: string
  type: string
  brand: string
  last4: string
  expMonth: string
  expYear: string
  isDefault: boolean
}

// Mock data functions
export function getScooters(): Promise<Scooter[]> {
  return Promise.resolve([
    {
      id: "s-1001",
      name: "Yamaha NMAX 155cc",
      type: "Automatic",
      color: "Black",
      shop: "Beach Scooter Rentals",
      location: "123 Ocean Drive",
      distance: 0.8,
      price: 45,
      rating: 4.8,
      reviews: 124,
      available: true,
      features: ["Helmet Included", "USB Charger", "Storage Box"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "s-1002",
      name: "Honda PCX 150cc",
      type: "Automatic",
      color: "Red",
      shop: "City Scooters",
      location: "456 Main Street",
      distance: 1.2,
      price: 40,
      rating: 4.6,
      reviews: 98,
      available: true,
      features: ["Helmet Included", "Rain Cover"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "s-1003",
      name: "Vespa Primavera 125cc",
      type: "Automatic",
      color: "Blue",
      shop: "Vintage Scooter Co.",
      location: "789 Beach Road",
      distance: 1.5,
      price: 55,
      rating: 4.9,
      reviews: 156,
      available: true,
      features: ["Helmet Included", "USB Charger", "Premium Insurance"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "s-1004",
      name: "Suzuki Burgman 200cc",
      type: "Automatic",
      color: "Silver",
      shop: "Downtown Rentals",
      location: "321 Harbor Street",
      distance: 2.1,
      price: 50,
      rating: 4.7,
      reviews: 112,
      available: true,
      features: ["Helmet Included", "Storage Box", "Phone Holder"],
      image: "/placeholder.svg?height=200&width=300",
    },
  ])
}

export function getRentals(): Promise<Rental[]> {
  return Promise.resolve([
    {
      id: "R-1001",
      scooterName: "Yamaha NMAX 155cc",
      scooterType: "Automatic",
      scooterColor: "Black",
      rentalShop: "Beach Scooter Rentals",
      startDate: "Mar 20, 2025",
      endDate: "Mar 22, 2025",
      timeLeft: "1 day, 4 hours",
      price: "$90.00",
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
      insurance: {
        plan: "Standard",
        coverage: "$1,000",
        dailyRate: "$9.99",
        total: "$19.98",
      },
    },
    {
      id: "R-1002",
      scooterName: "Honda PCX 150cc",
      scooterType: "Automatic",
      scooterColor: "Red",
      rentalShop: "City Scooters",
      startDate: "Apr 5, 2025",
      endDate: "Apr 7, 2025",
      daysUntil: "16 days",
      price: "$80.00",
      status: "upcoming",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "R-1000",
      scooterName: "Vespa Primavera 125cc",
      scooterType: "Automatic",
      scooterColor: "Blue",
      rentalShop: "Vintage Scooter Co.",
      startDate: "Mar 10, 2025",
      endDate: "Mar 12, 2025",
      price: "$110.00",
      status: "completed",
      rating: 5,
      image: "/placeholder.svg?height=200&width=300",
    },
  ])
}

export function getInsurancePlans(): Promise<InsurancePlan[]> {
  return Promise.resolve([
    {
      id: "basic",
      name: "Basic Protection",
      price: 4.99,
      priceUnit: "day",
      coverage: 500,
      deductible: 100,
      features: ["Damage protection up to $500", "Theft protection", "24/7 customer support"],
      limitations: ["High deductible ($100)", "No personal liability coverage", "No roadside assistance"],
    },
    {
      id: "standard",
      name: "Standard Protection",
      price: 9.99,
      priceUnit: "day",
      coverage: 1000,
      deductible: 50,
      features: [
        "Damage protection up to $1,000",
        "Theft protection",
        "24/7 customer support",
        "Basic roadside assistance",
        "Personal liability coverage up to $10,000",
      ],
      limitations: ["Medium deductible ($50)", "Limited roadside assistance"],
      recommended: true,
    },
    {
      id: "premium",
      name: "Premium Protection",
      price: 14.99,
      priceUnit: "day",
      coverage: 2000,
      deductible: 0,
      features: [
        "Damage protection up to $2,000",
        "Theft protection",
        "24/7 customer support",
        "Full roadside assistance",
        "Personal liability coverage up to $25,000",
        "Zero deductible",
        "Medical expense coverage",
        "Trip interruption coverage",
      ],
      limitations: ["Higher daily cost"],
    },
  ])
}

export function getActiveInsurance(): Promise<ActiveInsurance | null> {
  return Promise.resolve({
    plan: "Standard Protection",
    startDate: "March 20, 2025",
    endDate: "March 22, 2025",
    rentalId: "R-1001",
    coverageLimit: 1000,
    deductible: 50,
    cost: 19.98,
  })
}

export function getPaymentMethods(): Promise<PaymentMethod[]> {
  return Promise.resolve([
    {
      id: "pm-1",
      type: "card",
      brand: "Visa",
      last4: "4242",
      expMonth: "12",
      expYear: "2026",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "card",
      brand: "Mastercard",
      last4: "5555",
      expMonth: "08",
      expYear: "2025",
      isDefault: false,
    },
  ])
}

export function getTransactions(): Promise<Transaction[]> {
  return Promise.resolve([
    {
      id: "tx-1001",
      date: "Mar 20, 2025",
      description: "Scooter Rental - Yamaha NMAX 155cc",
      amount: "$90.00",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: "tx-1000",
      date: "Mar 12, 2025",
      description: "Scooter Rental - Vespa Primavera 125cc",
      amount: "$110.00",
      status: "completed",
      paymentMethod: "Mastercard •••• 5555",
    },
    {
      id: "tx-999",
      date: "Feb 27, 2025",
      description: "Scooter Rental - Suzuki Burgman 200cc",
      amount: "$100.00",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: "tx-998",
      date: "Feb 16, 2025",
      description: "Scooter Rental - Piaggio Liberty 150cc",
      amount: "$42.00",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
    },
  ])
}
