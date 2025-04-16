"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { mockRentalService } from "@/services/mock-rental-service"
import { STORAGE_KEYS, saveToStorage, getFromStorage } from "@/lib/storage"

// Define types for strong typing
export type RiderContextState = "idle" | "looking" | "active" | "post_rental"

interface RiderState {
  state: RiderContextState
  rentalId?: string
  vehicleType?: string
  timeRemaining?: number
  returnLocation?: string
  lastUpdated: number
}

// Use reducer pattern for predictable state transitions
type RiderAction =
  | { type: "SET_LOOKING" }
  | {
      type: "SET_ACTIVE"
      payload: { rentalId: string; vehicleType: string; timeRemaining: number; returnLocation: string }
    }
  | { type: "SET_POST_RENTAL"; payload: { rentalId: string; vehicleType: string } }
  | { type: "UPDATE_TIME"; payload: { timeRemaining: number } }
  | { type: "RESET" }

const initialState: RiderState = {
  state: "idle",
  lastUpdated: Date.now(),
}

function riderReducer(state: RiderState, action: RiderAction): RiderState {
  let newState: RiderState

  switch (action.type) {
    case "SET_LOOKING":
      newState = {
        ...state,
        state: "looking",
        rentalId: undefined,
        vehicleType: undefined,
        timeRemaining: undefined,
        returnLocation: undefined,
        lastUpdated: Date.now(),
      }
      break
    case "SET_ACTIVE":
      newState = {
        ...state,
        state: "active",
        ...action.payload,
        lastUpdated: Date.now(),
      }
      break
    case "SET_POST_RENTAL":
      newState = {
        ...state,
        state: "post_rental",
        ...action.payload,
        timeRemaining: undefined,
        returnLocation: undefined,
        lastUpdated: Date.now(),
      }
      break
    case "UPDATE_TIME":
      newState = {
        ...state,
        ...action.payload,
        lastUpdated: Date.now(),
      }
      break
    case "RESET":
      newState = initialState
      break
    default:
      return state
  }

  // Persist state to localStorage
  saveToStorage(STORAGE_KEYS.RIDER_CONTEXT, newState)
  return newState
}

// Create the context with proper typing
interface RiderContextValue {
  state: RiderState
  dispatch: React.Dispatch<RiderAction>
  refreshContext: () => Promise<void>
  setLookingState: () => void
  setActiveState: (rentalId: string, vehicleType: string, timeRemaining: number, returnLocation: string) => void
  setPostRentalState: (rentalId: string, vehicleType: string) => void
  navigateToRides: () => void
  dismissPostRental: () => void
}

const RiderContext = createContext<RiderContextValue | undefined>(undefined)

export const RiderContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with persisted state if available
  const persistedState =
    typeof window !== "undefined" ? getFromStorage<RiderState>(STORAGE_KEYS.RIDER_CONTEXT, initialState) : initialState

  const [state, dispatch] = useReducer(riderReducer, persistedState)

  // Helper functions for state transitions
  const setLookingState = () => {
    dispatch({ type: "SET_LOOKING" })
    mockRentalService.setMockState("looking")
  }

  const setActiveState = (rentalId: string, vehicleType: string, timeRemaining: number, returnLocation: string) => {
    dispatch({
      type: "SET_ACTIVE",
      payload: { rentalId, vehicleType, timeRemaining, returnLocation },
    })
    mockRentalService.setMockState("active")
  }

  const setPostRentalState = (rentalId: string, vehicleType: string) => {
    dispatch({
      type: "SET_POST_RENTAL",
      payload: { rentalId, vehicleType },
    })
    mockRentalService.setMockState("completed")
  }

  // Add navigation helper functions to keep navigation consistent
  const navigateToRides = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/rider-rides"
    }
  }

  // Add function to dismiss post rental screen
  const dismissPostRental = () => {
    dispatch({ type: "SET_LOOKING" })
  }

  const refreshContext = async () => {
    try {
      // Check for active rental
      const activeRental = await mockRentalService.getActiveRental()

      if (activeRental) {
        dispatch({
          type: "SET_ACTIVE",
          payload: {
            rentalId: activeRental.id,
            vehicleType: activeRental.vehicleType,
            timeRemaining: activeRental.timeRemainingInMs,
            returnLocation: activeRental.returnLocation,
          },
        })
        return
      }

      // Check for recently completed rental
      const completedRental = await mockRentalService.getRecentlyCompletedRental()

      if (completedRental) {
        dispatch({
          type: "SET_POST_RENTAL",
          payload: {
            rentalId: completedRental.id,
            vehicleType: completedRental.vehicleType,
          },
        })
        return
      }

      // Default to looking state
      dispatch({ type: "SET_LOOKING" })
    } catch (error) {
      console.error("Failed to refresh context", error)
      dispatch({ type: "SET_LOOKING" })
    }
  }

  // Initialize context on mount
  useEffect(() => {
    // Only refresh if we don't have a valid state already
    if (state.state === "idle") {
      refreshContext()
    }

    // Set up refresh interval for active rentals
    const intervalId = setInterval(() => {
      if (state.state === "active" && state.timeRemaining && state.timeRemaining > 0) {
        // Update time remaining
        dispatch({
          type: "UPDATE_TIME",
          payload: {
            timeRemaining: Math.max(0, state.timeRemaining - 60000), // Decrease by 1 minute
          },
        })

        // If time reaches zero, transition to post_rental state
        if (state.timeRemaining <= 60000 && state.rentalId) {
          setPostRentalState(state.rentalId, state.vehicleType || "unknown")
        }
      }
    }, 60000)

    return () => clearInterval(intervalId)
  }, [state.state, state.timeRemaining, state.rentalId, state.vehicleType])

  return (
    <RiderContext.Provider
      value={{
        state,
        dispatch,
        refreshContext,
        setLookingState,
        setActiveState,
        setPostRentalState,
        navigateToRides,
        dismissPostRental,
      }}
    >
      {children}
    </RiderContext.Provider>
  )
}

export const useRiderContext = () => {
  const context = useContext(RiderContext)
  if (context === undefined) {
    throw new Error("useRiderContext must be used within a RiderContextProvider")
  }
  return context
}
