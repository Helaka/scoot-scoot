"use server"

import { revalidatePath } from "next/cache"
import { supabaseServer } from "@/lib/supabase"
import type { Scooter } from "@/types/database"

export async function getScooters(shopId?: string): Promise<Scooter[]> {
  try {
    let query = supabaseServer.from("scooters").select("*").order("created_at", { ascending: false })

    if (shopId) {
      query = query.eq("shop_id", shopId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching scooters:", error)
      return []
    }

    return data as Scooter[]
  } catch (error) {
    console.error("Error in getScooters:", error)
    return []
  }
}

export async function getScooterById(id: string): Promise<Scooter | null> {
  try {
    const { data, error } = await supabaseServer.from("scooters").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching scooter:", error)
      return null
    }

    return data as Scooter
  } catch (error) {
    console.error("Error in getScooterById:", error)
    return null
  }
}

export async function createScooter(
  scooterData: Partial<Scooter>,
): Promise<{ success: boolean; data?: Scooter; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("scooters").insert(scooterData).select().single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Revalidate the scooters page
    revalidatePath("/scooters")
    revalidatePath("/shop-scooters")

    return { success: true, data: data as Scooter }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}

export async function updateScooter(
  id: string,
  scooterData: Partial<Scooter>,
): Promise<{ success: boolean; data?: Scooter; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("scooters").update(scooterData).eq("id", id).select().single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Revalidate the scooters page
    revalidatePath("/scooters")
    revalidatePath(`/scooters/${id}`)
    revalidatePath("/shop-scooters")

    return { success: true, data: data as Scooter }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}

export async function deleteScooter(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseServer.from("scooters").delete().eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    // Revalidate the scooters page
    revalidatePath("/scooters")
    revalidatePath("/shop-scooters")

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, error: errorMessage }
  }
}
