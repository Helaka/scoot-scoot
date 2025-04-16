"use server"

import { revalidatePath } from "next/cache"
import { supabaseServer } from "@/lib/supabase"

export async function createOnboardingSession(shopId: string) {
  try {
    // Generate a random 6-digit activation code
    const activationCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Calculate expiration time (24 hours from now)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    const { data, error } = await supabaseServer
      .from("onboarding_sessions")
      .insert({
        shop_id: shopId,
        activation_code: activationCode,
        qr_code_url: `/api/qrcode?code=${activationCode}`,
        expires_at: expiresAt.toISOString(),
        status: "pending",
        completed_steps: {},
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Revalidate relevant paths
    revalidatePath("/shop-onboarding-sessions")

    return { success: true, session: data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}

export async function activateOnboardingSession(activationCode: string, riderId: string) {
  try {
    // First, get the session
    const { data: session, error: sessionError } = await supabaseServer
      .from("onboarding_sessions")
      .select()
      .eq("activation_code", activationCode)
      .single()

    if (sessionError || !session) {
      return { success: false, error: sessionError?.message || "Session not found" }
    }

    // Check if session is expired
    if (new Date() > new Date(session.expires_at)) {
      await supabaseServer.from("onboarding_sessions").update({ status: "expired" }).eq("id", session.id)

      return { success: false, error: "Session has expired" }
    }

    // Update the session
    const { data, error } = await supabaseServer
      .from("onboarding_sessions")
      .update({
        rider_id: riderId,
        status: "activated",
        activated_at: new Date().toISOString(),
      })
      .eq("id", session.id)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Revalidate relevant paths
    revalidatePath("/shop-onboarding-sessions")
    revalidatePath("/onboarding")

    return { success: true, session: data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}

export async function updateOnboardingStep(sessionId: string, step: string, completed: boolean) {
  try {
    // First, get the current session
    const { data: session, error: sessionError } = await supabaseServer
      .from("onboarding_sessions")
      .select()
      .eq("id", sessionId)
      .single()

    if (sessionError || !session) {
      return { success: false, error: sessionError?.message || "Session not found" }
    }

    // Update the completed steps
    const completedSteps = { ...(session.completed_steps || {}), [step]: completed }

    // Determine the next step if this one was completed
    let currentStep = session.current_step
    if (completed && currentStep === step) {
      // Logic to determine next step
      const steps = ["basic-info", "document-upload", "signature", "consent", "face-verification"]
      const currentIndex = steps.indexOf(step)
      currentStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : currentStep
    }

    // Check if all steps are completed
    const allStepsCompleted = Object.values(completedSteps).every(Boolean)
    const status = allStepsCompleted ? "completed" : session.status === "pending" ? session.status : "in_progress"

    // Update the session
    const { data, error } = await supabaseServer
      .from("onboarding_sessions")
      .update({
        completed_steps: completedSteps,
        current_step: currentStep,
        status,
        completed_at: allStepsCompleted ? new Date().toISOString() : null,
      })
      .eq("id", sessionId)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Revalidate relevant paths
    revalidatePath("/shop-onboarding-sessions")
    revalidatePath("/onboarding")

    return { success: true, session: data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}

export async function uploadOnboardingDocument(
  sessionId: string,
  riderId: string,
  type: string,
  url: string,
  metadata?: any,
) {
  try {
    const { data, error } = await supabaseServer
      .from("onboarding_documents")
      .insert({
        session_id: sessionId,
        rider_id: riderId,
        type,
        url,
        metadata,
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, document: data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}
