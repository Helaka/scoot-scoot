"use server"

import { revalidatePath } from "next/cache"
import { supabaseServer } from "@/lib/supabase"
import type { Blacklist } from "@/types/database"

export async function getBlacklist(shopId?: string, global = false) {
  try {
    let query = supabaseServer
      .from("blacklist")
      .select(`
        *,
        users!rider_id(id, first_name, last_name, email, phone, profile_image_url),
        shops(id, name),
        added_by_user:users!added_by(id, first_name, last_name)
      `)
      .eq("status", "active")

    if (shopId) {
      query = query.eq("shop_id", shopId)
    }

    if (global) {
      query = query.eq("is_global", true)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching blacklist:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error in getBlacklist:", error)
    return []
  }
}

export async function addToBlacklist(blacklistData: Partial<Blacklist>) {
  try {
    const { data, error } = await supabaseServer
      .from("blacklist")
      .insert({
        ...blacklistData,
        status: "active",
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Revalidate relevant paths
    revalidatePath("/shop-blacklist")
    revalidatePath("/admin-blacklist")

    return { success: true, data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}

export async function updateBlacklistStatus(id: string, status: "active" | "inactive" | "expired") {
  try {
    const { data, error } = await supabaseServer.from("blacklist").update({ status }).eq("id", id).select().single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Revalidate relevant paths
    revalidatePath("/shop-blacklist")
    revalidatePath("/admin-blacklist")

    return { success: true, data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}

export async function isRiderBlacklisted(riderId: string, shopId?: string) {
  try {
    const { data, error } = await supabaseServer.rpc("is_rider_blacklisted", {
      p_rider_id: riderId,
      p_shop_id: shopId,
    })

    if (error) {
      console.error("Error checking if rider is blacklisted:", error)
      return false
    }

    return data
  } catch (error) {
    console.error("Error in isRiderBlacklisted:", error)
    return false
  }
}
