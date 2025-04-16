"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { sessionManager } from "@/services/session-management-service"
import type { OnboardingSession, OnboardingStep } from "@/types/onboarding-types"

interface SessionContextType {
  // Shop methods
  createSession: (shopId: string, expirationHours?: number) => Promise<OnboardingSession>
  getShopSessions: (shopId: string) => Promise<OnboardingSession[]>

  // Rider methods
  activateSession: (code: string, riderId: string) => Promise<OnboardingSession | undefined>
  getRiderSessions: (riderId: string) => Promise<OnboardingSession[]>

  // General methods
  getSession: (id: string) => Promise<OnboardingSession | undefined>
  updateSessionStep: (id: string, step: OnboardingStep, completed: boolean) => Promise<OnboardingSession | undefined>

  // State
  currentSession: OnboardingSession | null
  setCurrentSession: (session: OnboardingSession | null) => void
  loading: boolean
  error: string | null
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<OnboardingSession | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Simulate async API calls to the session manager
  const createSession = async (shopId: string, expirationHours?: number): Promise<OnboardingSession> => {
    setLoading(true)
    setError(null)
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      const session = sessionManager.createSession(shopId, expirationHours)
      return session
    } catch (err) {
      setError("Failed to create session")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getSession = async (id: string): Promise<OnboardingSession | undefined> => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return sessionManager.getSession(id)
    } catch (err) {
      setError("Failed to get session")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getShopSessions = async (shopId: string): Promise<OnboardingSession[]> => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return sessionManager.getSessionsByShop(shopId)
    } catch (err) {
      setError("Failed to get shop sessions")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getRiderSessions = async (riderId: string): Promise<OnboardingSession[]> => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return sessionManager.getSessionsByRider(riderId)
    } catch (err) {
      setError("Failed to get rider sessions")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const activateSession = async (code: string, riderId: string): Promise<OnboardingSession | undefined> => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 700))
      const session = sessionManager.activateSession(code, riderId)
      if (session) {
        setCurrentSession(session)
      }
      return session
    } catch (err) {
      setError("Failed to activate session")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateSessionStep = async (
    id: string,
    step: OnboardingStep,
    completed: boolean,
  ): Promise<OnboardingSession | undefined> => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      const session = sessionManager.updateSessionStep(id, step, completed)
      if (session && currentSession?.id === id) {
        setCurrentSession(session)
      }
      return session
    } catch (err) {
      setError("Failed to update session step")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem("currentSessionId")
    if (savedSessionId) {
      const session = sessionManager.getSession(savedSessionId)
      if (session) {
        setCurrentSession(session)
      } else {
        localStorage.removeItem("currentSessionId")
      }
    }
  }, [])

  // Save current session ID to localStorage when it changes
  useEffect(() => {
    if (currentSession) {
      localStorage.setItem("currentSessionId", currentSession.id)
    } else {
      localStorage.removeItem("currentSessionId")
    }
  }, [currentSession])

  const value = {
    createSession,
    getSession,
    getShopSessions,
    getRiderSessions,
    activateSession,
    updateSessionStep,
    currentSession,
    setCurrentSession,
    loading,
    error,
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
