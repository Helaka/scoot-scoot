"use server"

import { supabaseServer } from "@/lib/supabase"

// Get all shops
export async function getAllShops() {
  const { data, error } = await supabaseServer.from("shops").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching shops:", error)
    return []
  }

  return data
}

// Get all users
export async function getAllUsers() {
  const { data, error } = await supabaseServer.from("users").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
    return []
  }

  return data
}

// Update shop status
export async function updateShopStatus(shopId: string, status: string) {
  const { data, error } = await supabaseServer.from("shops").update({ status }).eq("id", shopId).select().single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// Verify rider documents
export async function verifyRiderDocument(documentId: string, verificationStatus: string, verifiedBy: string) {
  const { data, error } = await supabaseServer
    .from("rider_documents")
    .update({
      verification_status: verificationStatus,
      verified_by: verifiedBy,
      verified_at: new Date().toISOString(),
    })
    .eq("id", documentId)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
