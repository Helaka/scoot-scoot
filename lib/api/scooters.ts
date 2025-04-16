"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getScooters(shopId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("scooters")
    .select("*")
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getScooterById(scooterId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("scooters").select("*").eq("id", scooterId).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createScooter(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const shopId = formData.get("shopId") as string
  const name = formData.get("name") as string
  const model = formData.get("model") as string
  const description = formData.get("description") as string
  const year = Number.parseInt(formData.get("year") as string)
  const licensePlate = formData.get("licensePlate") as string
  const hourlyRate = Number.parseFloat(formData.get("hourlyRate") as string)
  const dailyRate = Number.parseFloat(formData.get("dailyRate") as string)
  const weeklyRate = Number.parseFloat(formData.get("weeklyRate") as string)
  const color = formData.get("color") as string
  const engineSize = Number.parseInt(formData.get("engineSize") as string)

  const { data, error } = await supabase
    .from("scooters")
    .insert({
      shop_id: shopId,
      name,
      model,
      description,
      year,
      license_plate: licensePlate,
      status: "available",
      hourly_rate: hourlyRate,
      daily_rate: dailyRate,
      weekly_rate: weeklyRate,
      color,
      engine_size: engineSize,
      image_urls: ["/placeholder.svg?height=150&width=200"],
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/scooters`)
  return { success: true, scooter: data }
}

export async function updateScooter(scooterId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const name = formData.get("name") as string
  const model = formData.get("model") as string
  const description = formData.get("description") as string
  const year = Number.parseInt(formData.get("year") as string)
  const licensePlate = formData.get("licensePlate") as string
  const status = formData.get("status") as string
  const hourlyRate = Number.parseFloat(formData.get("hourlyRate") as string)
  const dailyRate = Number.parseFloat(formData.get("dailyRate") as string)
  const weeklyRate = Number.parseFloat(formData.get("weeklyRate") as string)
  const color = formData.get("color") as string
  const engineSize = Number.parseInt(formData.get("engineSize") as string)

  const { data, error } = await supabase
    .from("scooters")
    .update({
      name,
      model,
      description,
      year,
      license_plate: licensePlate,
      status,
      hourly_rate: hourlyRate,
      daily_rate: dailyRate,
      weekly_rate: weeklyRate,
      color,
      engine_size: engineSize,
    })
    .eq("id", scooterId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/scooters`)
  revalidatePath(`/shop/scooters/${scooterId}`)
  return { success: true, scooter: data }
}

export async function deleteScooter(scooterId: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("scooters").delete().eq("id", scooterId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/scooters`)
  return { success: true }
}
