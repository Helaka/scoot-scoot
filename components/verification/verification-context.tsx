"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type VerificationStatus = "unverified" | "pending" | "verified" | "expired" | "rejected"

export interface VerificationData {
  status: VerificationStatus
  permitId?: string
  expiryDate?: Date
  permitType?: "monthly" | "annual"
  verifiedItems: {
    email: boolean
    phone: boolean
    id: boolean
    license: boolean
  }
  history: Array<{
    id: string
    date: Date
    action: string
    status: VerificationStatus
    notes?: string
  }>
}

interface VerificationContextType {
  verificationData: VerificationData
  isLoading: boolean
  refreshVerificationData: () => Promise<void>
  startVerification: () => Promise<void>
}

const defaultVerificationData: VerificationData = {
  status: "unverified",
  verifiedItems: {
    email: false,
    phone: false,
    id: false,
    license: false,
  },
  history: [],
}

// Create context
const VerificationContext = createContext<VerificationContextType | undefined>(undefined)

// Provider component
export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [verificationData, setVerificationData] = useState<VerificationData>(defaultVerificationData)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Fetch verification data (mock implementation)
  const refreshVerificationData = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data with a delay to simulate network request
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mock data - in a real app, this would come from the API
      const mockData: VerificationData = {
        status: "verified",
        permitId: "DRP12345",
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days from now
        permitType: "monthly",
        verifiedItems: {
          email: true,
          phone: true,
          id: true,
          license: true,
        },
        history: [
          {
            id: "v1",
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            action: "Digital Ride Permit issued",
            status: "verified",
          },
          {
            id: "v2",
            date: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
            action: "License verification completed",
            status: "pending",
          },
          {
            id: "v3",
            date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000), // 32 days ago
            action: "Verification process started",
            status: "pending",
          },
        ],
      }

      setVerificationData(mockData)
    } catch (error) {
      console.error("Failed to fetch verification data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Start verification process
  const startVerification = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update status to pending
      setVerificationData((prev) => ({
        ...prev,
        status: "pending",
        history: [
          {
            id: `v${Date.now()}`,
            date: new Date(),
            action: "Verification process started",
            status: "pending",
          },
          ...prev.history,
        ],
      }))

      // Redirect would happen here in a real app
    } catch (error) {
      console.error("Failed to start verification:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load initial data
  useEffect(() => {
    refreshVerificationData()
  }, [])

  const value = {
    verificationData,
    isLoading,
    refreshVerificationData,
    startVerification,
  }

  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>
}

// Custom hook to use the verification context
export const useVerification = () => {
  const context = useContext(VerificationContext)
  if (context === undefined) {
    throw new Error("useVerification must be used within a VerificationProvider")
  }
  return context
}
