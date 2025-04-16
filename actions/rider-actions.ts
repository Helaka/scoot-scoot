"use server"

import { supabaseServer } from "@/lib/supabase"

// Get available scooters for booking
export async function getAvailableScooters(city?: string, startDate?: string, endDate?: string) {
  let query = supabaseServer
    .from("scooters")
    .select(`
      *,
      shops(id, name, address, city, country, latitude, longitude)
    `)
    .eq("status", "available")

  if (city) {
    query = query.eq("shops.city", city)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching available scooters:", error)
    return []
  }

  return data
}

// Create a new booking
export async function createBooking(bookingData: any) {
  // Start a transaction
  const { data, error } = await supabaseServer.rpc("create_booking", {
    booking_data: bookingData,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// Get rider's bookings
export async function getRiderBookings(riderId: string) {
  const { data, error } = await supabaseServer
    .from("bookings")
    .select(`
      *,
      scooters(*),
      shops(id, name, address, city, country)
    `)
    .eq("rider_id", riderId)
    .order("start_time", { ascending: false })

  if (error) {
    console.error("Error fetching rider bookings:", error)
    return []
  }

  return data
}

// Update rider profile
export async function updateRiderProfile(userId: string, profileData: any) {
  const { data, error } = await supabaseServer
    .from("rider_profiles")
    .update(profileData)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
