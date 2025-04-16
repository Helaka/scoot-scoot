"use server"

import { supabaseServer } from "@/lib/supabase"
import type { Shop } from "@/types/database"

// Get all shops
export async function getShops() {
  const { data, error } = await supabaseServer.from("shops").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching shops:", error)
    return []
  }

  return data as Shop[]
}

// Get shop by ID
export async function getShopById(id: string): Promise<Shop | null> {
  const { data, error } = await supabaseServer.from("shops").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching shop:", error)
    return null
  }

  return data as Shop
}
