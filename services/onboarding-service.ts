import type { OnboardingSession } from "@/types/onboarding-types"

// Mock data store
let sessions: OnboardingSession[] = []

export const OnboardingService = {
  // Create a new onboarding session
  createSession(shopId: string): OnboardingSession {
    // Generate a random 6-digit code
    const activationCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Create a new session
    const session: OnboardingSession = {
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      shopId,
      activationCode,
      qrCodeUrl: `/api/qrcode?code=${activationCode}`,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      status: "pending",
      completedSteps: {
        basicInfo: false,
        documentUploaded: false,
        signatureSubmitted: false,
        consentAccepted: false,
        faceScanCompleted: false,
      },
    }

    // Add to mock store
    sessions.push(session)

    return session
  },

  // Get a session by ID
  getSession(sessionId: string): OnboardingSession | null {
    // In a real implementation, this would fetch from an API
    // For now, return mock data
    return {
      id: sessionId,
      status: "active",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      completedSteps: {
        "basic-info": true,
        "document-upload": true,
        signature: true,
        "face-verification": true,
        consent: true,
      },
    }
  },

  // Get a session by activation code
  getSessionByCode(activationCode: string): OnboardingSession | null {
    return sessions.find((s) => s.activationCode === activationCode) || null
  },

  // Get all sessions for a shop
  getShopSessions(shopId: string): OnboardingSession[] {
    return sessions.filter((s) => s.shopId === shopId)
  },

  // Activate a session (when a rider enters the code)
  activateSession(activationCode: string, riderId: string): OnboardingSession | null {
    const sessionIndex = sessions.findIndex((s) => s.activationCode === activationCode)

    if (sessionIndex === -1) return null

    // Check if session is expired
    if (new Date() > sessions[sessionIndex].expiresAt) {
      sessions[sessionIndex].status = "expired"
      return null
    }

    // Update the session
    sessions[sessionIndex] = {
      ...sessions[sessionIndex],
      riderId,
      status: "activated",
    }

    return sessions[sessionIndex]
  },

  // Update session step
  updateSessionStep(
    sessionId: string,
    step: keyof OnboardingSession["completedSteps"],
    value: boolean,
  ): OnboardingSession | null {
    const sessionIndex = sessions.findIndex((s) => s.sessionId === sessionId)

    if (sessionIndex === -1) return null

    // Update the step
    sessions[sessionIndex] = {
      ...sessions[sessionIndex],
      completedSteps: {
        ...sessions[sessionIndex].completedSteps,
        [step]: value,
      },
    }

    // Check if all steps are completed
    const allStepsCompleted = Object.values(sessions[sessionIndex].completedSteps).every(Boolean)

    if (allStepsCompleted) {
      sessions[sessionIndex].status = "completed"
    }

    return sessions[sessionIndex]
  },

  // Initialize with some mock data for testing
  initMockData(): void {
    const shopId = "shop-1"
    const now = new Date()

    sessions = [
      {
        sessionId: "session-1",
        shopId,
        activationCode: "123456",
        qrCodeUrl: "/api/qrcode?code=123456",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        expiresAt: new Date(now.getTime() + 22 * 60 * 60 * 1000), // 22 hours from now
        status: "pending",
        completedSteps: {
          basicInfo: false,
          documentUploaded: false,
          signatureSubmitted: false,
          consentAccepted: false,
          faceScanCompleted: false,
        },
      },
      {
        sessionId: "session-2",
        shopId,
        riderId: "rider-1",
        activationCode: "234567",
        qrCodeUrl: "/api/qrcode?code=234567",
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        expiresAt: new Date(now.getTime() + 23 * 60 * 60 * 1000), // 23 hours from now
        status: "activated",
        completedSteps: {
          basicInfo: true,
          documentUploaded: true,
          signatureSubmitted: false,
          consentAccepted: false,
          faceScanCompleted: false,
        },
      },
      {
        sessionId: "session-3",
        shopId,
        riderId: "rider-2",
        activationCode: "345678",
        qrCodeUrl: "/api/qrcode?code=345678",
        createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
        expiresAt: new Date(now.getTime() + 12 * 60 * 60 * 1000), // 12 hours from now
        status: "completed",
        completedSteps: {
          basicInfo: true,
          documentUploaded: true,
          signatureSubmitted: true,
          consentAccepted: true,
          faceScanCompleted: true,
        },
      },
      {
        sessionId: "session-4",
        shopId,
        activationCode: "456789",
        qrCodeUrl: "/api/qrcode?code=456789",
        createdAt: new Date(now.getTime() - 25 * 60 * 60 * 1000), // 25 hours ago
        expiresAt: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        status: "expired",
        completedSteps: {
          basicInfo: false,
          documentUploaded: false,
          signatureSubmitted: false,
          consentAccepted: false,
          faceScanCompleted: false,
        },
      },
    ]
  },
}

// Initialize mock data
OnboardingService.initMockData()
