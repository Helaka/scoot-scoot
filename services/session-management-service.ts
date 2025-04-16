import { v4 as uuidv4 } from "uuid"
import type {
  OnboardingSession,
  OnboardingSessionStatus,
  OnboardingStep,
  NotificationRecord,
} from "@/types/onboarding-types"

// In a real implementation, this would use a database
// For now, we'll use an in-memory store
class SessionManagementService {
  private sessions: Map<string, OnboardingSession> = new Map()
  private sessionsByActivationCode: Map<string, string> = new Map() // code -> id
  private sessionsByShop: Map<string, Set<string>> = new Map() // shopId -> Set of session ids
  private sessionsByRider: Map<string, Set<string>> = new Map() // riderId -> Set of session ids

  // Default session expiration time (24 hours)
  private readonly DEFAULT_EXPIRATION_HOURS = 24

  /**
   * Create a new onboarding session initiated by a shop
   */
  public createSession(shopId: string, expirationHours?: number): OnboardingSession {
    // Generate a unique ID
    const id = uuidv4()

    // Generate a random 6-digit activation code
    const activationCode = this.generateActivationCode()

    // Calculate expiration time
    const now = new Date()
    const expiresAt = new Date(now)
    expiresAt.setHours(expiresAt.getHours() + (expirationHours || this.DEFAULT_EXPIRATION_HOURS))

    // Create the session object
    const session: OnboardingSession = {
      id,
      shopId,
      activationCode,
      qrCodeUrl: `/api/qrcode?code=${activationCode}`,
      createdAt: now,
      expiresAt,
      status: "pending",
      completedSteps: {
        "basic-info": false,
        "document-upload": false,
        signature: false,
        consent: false,
        "face-verification": false,
      },
      currentStep: "basic-info",
      notificationsSent: [],
    }

    // Store the session
    this.sessions.set(id, session)
    this.sessionsByActivationCode.set(activationCode, id)

    // Add to shop index
    if (!this.sessionsByShop.has(shopId)) {
      this.sessionsByShop.set(shopId, new Set())
    }
    this.sessionsByShop.get(shopId)?.add(id)

    return session
  }

  /**
   * Get a session by its ID
   */
  public getSession(id: string): OnboardingSession | undefined {
    return this.sessions.get(id)
  }

  /**
   * Get a session by its activation code
   */
  public getSessionByActivationCode(code: string): OnboardingSession | undefined {
    const id = this.sessionsByActivationCode.get(code)
    if (!id) return undefined
    return this.sessions.get(id)
  }

  /**
   * Get all sessions for a shop
   */
  public getSessionsByShop(shopId: string): OnboardingSession[] {
    const sessionIds = this.sessionsByShop.get(shopId) || new Set()
    return Array.from(sessionIds)
      .map((id) => this.sessions.get(id))
      .filter((session): session is OnboardingSession => session !== undefined)
  }

  /**
   * Get all sessions for a rider
   */
  public getSessionsByRider(riderId: string): OnboardingSession[] {
    const sessionIds = this.sessionsByRider.get(riderId) || new Set()
    return Array.from(sessionIds)
      .map((id) => this.sessions.get(id))
      .filter((session): session is OnboardingSession => session !== undefined)
  }

  /**
   * Activate a session when a rider enters the activation code
   */
  public activateSession(activationCode: string, riderId: string): OnboardingSession | undefined {
    const id = this.sessionsByActivationCode.get(activationCode)
    if (!id) return undefined

    const session = this.sessions.get(id)
    if (!session) return undefined

    // Check if session is expired
    if (new Date() > session.expiresAt) {
      this.updateSessionStatus(id, "expired")
      return undefined
    }

    // Check if session is already activated
    if (session.status !== "pending") {
      return undefined
    }

    // Update the session
    const updatedSession: OnboardingSession = {
      ...session,
      riderId,
      status: "activated",
      activatedAt: new Date(),
      currentStep: "basic-info",
    }

    this.sessions.set(id, updatedSession)

    // Add to rider index
    if (!this.sessionsByRider.has(riderId)) {
      this.sessionsByRider.set(riderId, new Set())
    }
    this.sessionsByRider.get(riderId)?.add(id)

    return updatedSession
  }

  /**
   * Update the status of a session
   */
  public updateSessionStatus(id: string, status: OnboardingSessionStatus): OnboardingSession | undefined {
    const session = this.sessions.get(id)
    if (!session) return undefined

    const updatedSession: OnboardingSession = {
      ...session,
      status,
    }

    // If completing, set the completion time
    if (status === "completed" && !updatedSession.completedAt) {
      updatedSession.completedAt = new Date()
    }

    this.sessions.set(id, updatedSession)
    return updatedSession
  }

  /**
   * Update a step in the onboarding process
   */
  public updateSessionStep(id: string, step: OnboardingStep, completed: boolean): OnboardingSession | undefined {
    const session = this.sessions.get(id)
    if (!session) return undefined

    // Create a new completedSteps object with the updated step
    const completedSteps = {
      ...session.completedSteps,
      [step]: completed,
    }

    // Determine the next step if this one was completed
    let currentStep = session.currentStep
    if (completed && currentStep === step) {
      currentStep = this.getNextStep(step)
    }

    // Update the session
    const updatedSession: OnboardingSession = {
      ...session,
      completedSteps,
      currentStep,
      status: session.status === "pending" ? session.status : "in_progress",
    }

    // Check if all steps are completed
    const allStepsCompleted = Object.values(completedSteps).every(Boolean)
    if (allStepsCompleted) {
      updatedSession.status = "completed"
      updatedSession.completedAt = new Date()
    }

    this.sessions.set(id, updatedSession)
    return updatedSession
  }

  /**
   * Record a notification sent for a session
   */
  public recordNotification(
    id: string,
    type: "email" | "sms",
    recipient: string,
    template: string,
    successful: boolean,
  ): OnboardingSession | undefined {
    const session = this.sessions.get(id)
    if (!session) return undefined

    const notification: NotificationRecord = {
      type,
      recipient,
      sentAt: new Date(),
      template,
      successful,
    }

    const notificationsSent = [...(session.notificationsSent || []), notification]

    const updatedSession: OnboardingSession = {
      ...session,
      notificationsSent,
    }

    this.sessions.set(id, updatedSession)
    return updatedSession
  }

  /**
   * Extend the expiration time of a session
   */
  public extendSessionExpiration(id: string, additionalHours: number): OnboardingSession | undefined {
    const session = this.sessions.get(id)
    if (!session) return undefined

    const expiresAt = new Date(session.expiresAt)
    expiresAt.setHours(expiresAt.getHours() + additionalHours)

    const updatedSession: OnboardingSession = {
      ...session,
      expiresAt,
    }

    this.sessions.set(id, updatedSession)
    return updatedSession
  }

  /**
   * Check for and update expired sessions
   * This would typically be run by a scheduled job
   */
  public processExpiredSessions(): number {
    const now = new Date()
    let expiredCount = 0

    for (const [id, session] of this.sessions.entries()) {
      if (session.status !== "expired" && session.status !== "completed" && now > session.expiresAt) {
        this.updateSessionStatus(id, "expired")
        expiredCount++
      }
    }

    return expiredCount
  }

  /**
   * Add metadata to a session
   */
  public addSessionMetadata(id: string, metadata: Record<string, any>): OnboardingSession | undefined {
    const session = this.sessions.get(id)
    if (!session) return undefined

    const updatedSession: OnboardingSession = {
      ...session,
      metadata: {
        ...(session.metadata || {}),
        ...metadata,
      },
    }

    this.sessions.set(id, updatedSession)
    return updatedSession
  }

  /**
   * Generate a unique 6-digit activation code
   */
  private generateActivationCode(): string {
    // Keep generating until we find a unique code
    while (true) {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      if (!this.sessionsByActivationCode.has(code)) {
        return code
      }
    }
  }

  /**
   * Get the next step in the onboarding process
   */
  private getNextStep(currentStep: OnboardingStep): OnboardingStep | undefined {
    const steps: OnboardingStep[] = ["basic-info", "document-upload", "signature", "consent", "face-verification"]

    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex === -1 || currentIndex === steps.length - 1) {
      return undefined
    }

    return steps[currentIndex + 1]
  }

  /**
   * Initialize with mock data for testing
   */
  public initMockData(): void {
    // Create a few shops
    const shopIds = ["shop-1", "shop-2", "shop-3"]

    // Create a few riders
    const riderIds = ["rider-1", "rider-2", "rider-3"]

    const now = new Date()

    // Create sessions in various states

    // Pending session (just created by shop)
    const pendingSession = this.createSession(shopIds[0])

    // Activated session (rider has entered code)
    const activatedSession = this.createSession(shopIds[1])
    this.activateSession(activatedSession.activationCode, riderIds[0])

    // In progress session (some steps completed)
    const inProgressSession = this.createSession(shopIds[0])
    const activated = this.activateSession(inProgressSession.activationCode, riderIds[1])
    if (activated) {
      this.updateSessionStep(activated.id, "basic-info", true)
      this.updateSessionStep(activated.id, "document-upload", true)
    }

    // Completed session
    const completedSession = this.createSession(shopIds[2])
    const activatedComplete = this.activateSession(completedSession.activationCode, riderIds[2])
    if (activatedComplete) {
      this.updateSessionStep(activatedComplete.id, "basic-info", true)
      this.updateSessionStep(activatedComplete.id, "document-upload", true)
      this.updateSessionStep(activatedComplete.id, "signature", true)
      this.updateSessionStep(activatedComplete.id, "consent", true)
      this.updateSessionStep(activatedComplete.id, "face-verification", true)
    }

    // Expired session
    const expiredSession = this.createSession(shopIds[0])
    const expiredId = expiredSession.id
    const expired = this.sessions.get(expiredId)
    if (expired) {
      // Set creation date to 25 hours ago
      const createdAt = new Date(now)
      createdAt.setHours(createdAt.getHours() - 25)

      // Set expiration to 1 hour ago
      const expiresAt = new Date(now)
      expiresAt.setHours(expiresAt.getHours() - 1)

      this.sessions.set(expiredId, {
        ...expired,
        createdAt,
        expiresAt,
        status: "expired",
      })
    }
  }
}

// Create and export a singleton instance
export const sessionManager = new SessionManagementService()

// Initialize with mock data for development
if (process.env.NODE_ENV === "development") {
  sessionManager.initMockData()
}
