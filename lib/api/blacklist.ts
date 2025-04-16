"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getBlacklistEntries(shopId?: string, isGlobal?: boolean) {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("blacklist").select(`
      *,
      users!blacklist_rider_id_fkey(id, email, full_name),
      users!blacklist_added_by_fkey(id, email, full_name),
      shops(id, name)
    `)

  if (shopId) {
    query = query.eq("shop_id", shopId)
  }

  if (isGlobal !== undefined) {
    query = query.eq("is_global", isGlobal)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function addToBlacklist(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const riderId = (formData.get("riderId") as string) || null
  const documentNumber = formData.get("documentNumber") as string
  const documentType = formData.get("documentType") as string
  const reason = formData.get("reason") as string
  const addedBy = formData.get("addedBy") as string
  const shopId = formData.get("shopId") as string
  const isGlobal = formData.get("isGlobal") === "true"
  const expiresAt = (formData.get("expiresAt") as string) || null
  const notes = formData.get("notes") as string

  const { data, error } = await supabase
    .from("blacklist")
    .insert({
      rider_id: riderId,
      document_number: documentNumber,
      document_type: documentType,
      reason,
      added_by: addedBy,
      shop_id: shopId,
      is_global: isGlobal,
      expires_at: expiresAt,
      status: "active",
      notes,
      evidence_urls: ["/placeholder.svg?height=300&width=450"],
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/blacklist`)
  return { success: true, blacklist: data }
}

export async function updateBlacklistEntry(entryId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const reason = formData.get("reason") as string
  const isGlobal = formData.get("isGlobal") === "true"
  const expiresAt = (formData.get("expiresAt") as string) || null
  const status = formData.get("status") as string
  const notes = formData.get("notes") as string

  const { data, error } = await supabase
    .from("blacklist")
    .update({
      reason,
      is_global: isGlobal,
      expires_at: expiresAt,
      status,
      notes,
    })
    .eq("id", entryId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/blacklist`)
  revalidatePath(`/shop/blacklist/${entryId}`)
  return { success: true, blacklist: data }
}

export async function checkBlacklist(documentNumber: string, documentType: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("blacklist")
    .select("*")
    .eq("document_number", documentNumber)
    .eq("document_type", documentType)
    .eq("status", "active")
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return { isBlacklisted: !!data, entry: data }
}
