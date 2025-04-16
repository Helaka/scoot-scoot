"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getRiderProfile(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("rider_profiles").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    throw new Error(error.message)
  }

  return data
}

export async function createRiderProfile(userId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const licenseNumber = formData.get("licenseNumber") as string
  const licenseCountry = formData.get("licenseCountry") as string
  const licenseExpiry = formData.get("licenseExpiry") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string
  const postalCode = formData.get("postalCode") as string
  const emergencyContactName = formData.get("emergencyContactName") as string
  const emergencyContactPhone = formData.get("emergencyContactPhone") as string

  const { data, error } = await supabase
    .from("rider_profiles")
    .insert({
      user_id: userId,
      license_number: licenseNumber,
      license_country: licenseCountry,
      license_expiry: licenseExpiry,
      date_of_birth: dateOfBirth,
      address,
      city,
      country,
      postal_code: postalCode,
      emergency_contact_name: emergencyContactName,
      emergency_contact_phone: emergencyContactPhone,
      verification_status: "pending",
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/rider/profile`)
  return { success: true, profile: data }
}

export async function updateRiderProfile(profileId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const licenseNumber = formData.get("licenseNumber") as string
  const licenseCountry = formData.get("licenseCountry") as string
  const licenseExpiry = formData.get("licenseExpiry") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string
  const postalCode = formData.get("postalCode") as string
  const emergencyContactName = formData.get("emergencyContactName") as string
  const emergencyContactPhone = formData.get("emergencyContactPhone") as string

  const { data, error } = await supabase
    .from("rider_profiles")
    .update({
      license_number: licenseNumber,
      license_country: licenseCountry,
      license_expiry: licenseExpiry,
      date_of_birth: dateOfBirth,
      address,
      city,
      country,
      postal_code: postalCode,
      emergency_contact_name: emergencyContactName,
      emergency_contact_phone: emergencyContactPhone,
    })
    .eq("id", profileId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/rider/profile`)
  return { success: true, profile: data }
}

export async function uploadRiderDocuments(profileId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const licenseImage = formData.get("licenseImage") as File
  const idImage = formData.get("idImage") as File
  const selfieImage = formData.get("selfieImage") as File

  // In a real app, you would upload these files to storage
  // For this example, we'll just use placeholder URLs

  const { data, error } = await supabase
    .from("rider_profiles")
    .update({
      license_image_url: "/placeholder.svg?height=300&width=450",
      id_image_url: "/placeholder.svg?height=300&width=450",
      selfie_url: "/placeholder.svg?height=300&width=450",
      verification_status: "pending",
    })
    .eq("id", profileId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/rider/profile`)
  return { success: true, profile: data }
}

export async function verifyRiderProfile(profileId: string, status: string, adminId: string) {
  const supabase = createServerSupabaseClient()

  const { data: profile, error: profileError } = await supabase
    .from("rider_profiles")
    .select("user_id")
    .eq("id", profileId)
    .single()

  if (profileError) {
    return { error: profileError.message }
  }

  // Update profile verification status
  const { data, error } = await supabase
    .from("rider_profiles")
    .update({
      verification_status: status,
    })
    .eq("id", profileId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Create a verification record
  const { error: verificationError } = await supabase.from("rider_verifications").insert({
    rider_id: profile.user_id,
    status,
    method: "admin",
    verified_by: adminId,
    verified_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  })

  if (verificationError) {
    return { error: verificationError.message }
  }

  // Create notification for rider
  await supabase.from("notifications").insert({
    user_id: profile.user_id,
    title: `Verification ${status === "verified" ? "Approved" : "Rejected"}`,
    message:
      status === "verified"
        ? "Your profile has been verified successfully!"
        : "Your profile verification was rejected. Please update your information and try again.",
    type: "verification",
    read: false,
    action_url: `/rider/profile`,
  })

  revalidatePath(`/admin/riders`)
  revalidatePath(`/admin/riders/${profileId}`)
  return { success: true, profile: data }
}
