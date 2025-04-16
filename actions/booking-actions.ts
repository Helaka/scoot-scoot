"use server"

import { revalidatePath } from "next/cache"
import { supabaseServer } from "@/lib/supabase"
import type { Booking } from "@/types/database"

export interface BookingData {
  rider_id: string
  scooter_id: string
  shop_id: string
  start_time: string
  end_time: string
  pickup_location?: string
  dropoff_location?: string
  total_amount: number
  insurance_id?: string
  insurance_price?: number
}

export async function createBooking(bookingData: BookingData) {
  try {
    // Call the stored procedure we created
    const { data, error } = await supabaseServer.rpc("create_booking", {
      booking_data: bookingData,
    })

    if (error) {
      console.error("Error creating booking:", error)
      return { success: false, error: error.message }
    }

    // Revalidate relevant paths to update UI
    revalidatePath("/bookings")
    revalidatePath("/dashboard")
    revalidatePath("/rider-dashboard")
    revalidatePath("/shop-dashboard")

    return { success: true, bookingId: data.booking_id }
  } catch (error) {
    console.error("Exception in createBooking:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function getBookingById(bookingId: string) {
  try {
    const { data, error } = await supabaseServer
      .from("bookings")
      .select(`
        *,
        scooters(*),
        shops(*),
        users!rider_id(id, first_name, last_name, email, phone, profile_image_url),
        booking_insurance(*)
      `)
      .eq("id", bookingId)
      .single()

    if (error) {
      console.error("Error fetching booking:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Exception in getBookingById:", error)
    return null
  }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    const { data, error } = await supabaseServer
      .from("bookings")
      .update({ status })
      .eq("id", bookingId)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    // If booking is completed or cancelled, update scooter status
    if (status === "completed" || status === "cancelled") {
      const scooterId = data.scooter_id

      // Update scooter status to available
      const { error: scooterError } = await supabaseServer
        .from("scooters")
        .update({ status: "available" })
        .eq("id", scooterId)

      if (scooterError) {
        console.error("Error updating scooter status:", scooterError)
      }
    }

    // If booking is active, update scooter status to rented
    if (status === "active") {
      const scooterId = data.scooter_id

      // Update scooter status to rented
      const { error: scooterError } = await supabaseServer
        .from("scooters")
        .update({ status: "rented" })
        .eq("id", scooterId)

      if (scooterError) {
        console.error("Error updating scooter status:", scooterError)
      }
    }

    // Revalidate relevant paths
    revalidatePath("/bookings")
    revalidatePath("/dashboard")
    revalidatePath(`/bookings/${bookingId}`)
    revalidatePath("/rider-dashboard")
    revalidatePath("/shop-dashboard")

    return { success: true, data }
  } catch (error) {
    console.error("Exception in updateBookingStatus:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function getRiderBookings(riderId: string) {
  try {
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

    return data as Booking[]
  } catch (error) {
    console.error("Error in getRiderBookings:", error)
    return []
  }
}

export async function getShopBookings(shopId: string) {
  try {
    const { data, error } = await supabaseServer
      .from("bookings")
      .select(`
        *,
        scooters(*),
        users!rider_id(id, first_name, last_name, email, phone)
      `)
      .eq("shop_id", shopId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching shop bookings:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error in getShopBookings:", error)
    return []
  }
}
