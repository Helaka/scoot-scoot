"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getShopsByOwnerId(ownerId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("shops").select("*").eq("owner_id", ownerId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getShopById(shopId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("shops")
    .select(`
      *,
      users!shops_owner_id_fkey(id, email, full_name)
    `)
    .eq("id", shopId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createShop(ownerId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const name = formData.get("name") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string
  const postalCode = formData.get("postalCode") as string
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string
  const website = formData.get("website") as string

  const { data, error } = await supabase
    .from("shops")
    .insert({
      name,
      owner_id: ownerId,
      address,
      city,
      country,
      postal_code: postalCode,
      phone,
      email,
      website,
      status: "active",
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/dashboard`)
  return { success: true, shop: data }
}

export async function updateShop(shopId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const name = formData.get("name") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string
  const postalCode = formData.get("postalCode") as string
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string
  const website = formData.get("website") as string
  const status = formData.get("status") as string

  const { data, error } = await supabase
    .from("shops")
    .update({
      name,
      address,
      city,
      country,
      postal_code: postalCode,
      phone,
      email,
      website,
      status,
    })
    .eq("id", shopId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/settings`)
  return { success: true, shop: data }
}

export async function getBranchesByShopId(shopId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("branches")
    .select(`
      *,
      users(id, email, full_name)
    `)
    .eq("shop_id", shopId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createBranch(shopId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const name = formData.get("name") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string
  const postalCode = formData.get("postalCode") as string
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string
  const latitude = Number.parseFloat(formData.get("latitude") as string)
  const longitude = Number.parseFloat(formData.get("longitude") as string)

  const { data, error } = await supabase
    .from("branches")
    .insert({
      shop_id: shopId,
      name,
      address,
      city,
      country,
      postal_code: postalCode,
      phone,
      email,
      latitude,
      longitude,
      status: "active",
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/branches`)
  return { success: true, branch: data }
}
