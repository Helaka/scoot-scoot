export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected" | "expired" | "trusted"
export type VerificationMethod = "self" | "shop" | "admin" | "paper" | null
export type OnboardingSessionStatus = "pending" | "activated" | "in_progress" | "completed" | "expired" | "rejected"
export type OnboardingStep = "basic-info" | "document-upload" | "signature" | "consent" | "face-verification"

export interface OnboardingSession {
  id: string
  shopId: string
  riderId?: string // Will be populated once a rider activates the session
  activationCode: string // 6-digit code
  qrCodeUrl: string // URL for QR code
  createdAt: Date
  expiresAt: Date // 24 hours from creation by default
  activatedAt?: Date
  completedAt?: Date
  status: OnboardingSessionStatus
  completedSteps: Record<OnboardingStep, boolean>
  currentStep?: OnboardingStep
  metadata?: Record<string, any> // For any additional data
  notificationsSent?: NotificationRecord[]
}

export interface NotificationRecord {
  type: "email" | "sms"
  recipient: string
  sentAt: Date
  template: string
  successful: boolean
}

export interface RiderVerification {
  id: string
  riderId: string
  sessionId?: string
  status: VerificationStatus
  method: VerificationMethod
  verifiedBy?: string // Shop ID or admin ID if verified by shop/admin
  verifiedAt?: Date
  expiresAt?: Date
  identityDocumentUrl?: string
  signatureUrl?: string
  faceScanUrl?: string
  rejectionReason?: string
  metadata?: Record<string, any>
}

export interface OnboardingDocument {
  id: string
  sessionId: string
  riderId?: string
  type: "id" | "license" | "passport" | "signature" | "face" | "consent" | "other"
  url: string
  uploadedAt: Date
  verified: boolean
  verifiedAt?: Date
  verifiedBy?: string
  metadata?: Record<string, any>
}

export interface RentalAgreement {
  id: string
  sessionId: string
  riderId: string
  shopId: string
  signedAt: Date
  expiresAt?: Date
  documentUrl: string
  termsAccepted: boolean
  version: string
}

export interface OnboardingAnalytics {
  totalSessions: number
  completedSessions: number
  conversionRate: number
  averageCompletionTime: number // in minutes
  stepCompletionRates: Record<OnboardingStep, number>
  abandonmentRates: Record<OnboardingStep, number>
  sessionsByShop: Record<string, number>
  sessionsByStatus: Record<OnboardingSessionStatus, number>
}
