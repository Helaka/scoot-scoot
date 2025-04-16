"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getBookings(shopId?: string, riderId?: string, status?: string) {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("bookings").select(`
      *,
      scooters(*),
      shops(id, name),
      users!bookings_rider_id_fkey(id, email, full_name)
    `)

  if (shopId) {
    query = query.eq("shop_id", shopId)
  }

  if (riderId) {
    query = query.eq("rider_id", riderId)
  }

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getBookingById(bookingId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      scooters(*),
      shops(id, name),
      users!bookings_rider_id_fkey(id, email, full_name),
      booking_insurance(*, insurance_policies(*))
    `)
    .eq("id", bookingId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createBooking(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const riderId = formData.get("riderId") as string
  const scooterId = formData.get("scooterId") as string
  const shopId = formData.get("shopId") as string
  const startTime = formData.get("startTime") as string
  const endTime = formData.get("endTime") as string
  const totalAmount = Number.parseFloat(formData.get("totalAmount") as string)
  const insuranceId = (formData.get("insuranceId") as string) || null

  // Start a transaction
  const { data: scooter, error: scooterError } = await supabase
    .from("scooters")
    .select("*")
    .eq("id", scooterId)
    .single()

  if (scooterError) {
    return { error: scooterError.message }
  }

  if (scooter.status !== "available") {
    return { error: "Scooter is not available for booking" }
  }

  // Create the booking
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      rider_id: riderId,
      scooter_id: scooterId,
      shop_id: shopId,
      start_time: startTime,
      end_time: endTime,
      total_amount: totalAmount,
      status: "confirmed",
      payment_status: "pending",
      pickup_code: Math.floor(100000 + Math.random() * 900000).toString(),
    })
    .select()
    .single()

  if (bookingError) {
    return { error: bookingError.message }
  }

  // Update scooter status
  const { error: updateError } = await supabase.from("scooters").update({ status: "booked" }).eq("id", scooterId)

  if (updateError) {
    return { error: updateError.message }
  }

  // Add insurance if selected
  if (insuranceId) {
    const { data: insurance, error: insuranceError } = await supabase
      .from("insurance_policies")
      .select("price")
      .eq("id", insuranceId)
      .single()

    if (insuranceError) {
      return { error: insuranceError.message }
    }

    const { error: bookingInsuranceError } = await supabase.from("booking_insurance").insert({
      booking_id: booking.id,
      insurance_id: insuranceId,
      price: insurance.price,
    })

    if (bookingInsuranceError) {
      return { error: bookingInsuranceError.message }
    }
  }

  // Create notification for rider
  await supabase.from("notifications").insert({
    user_id: riderId,
    title: "Booking Confirmed",
    message: `Your scooter booking has been confirmed. Pickup code: ${booking.pickup_code}`,
    type: "booking",
    read: false,
    action_url: `/rider/bookings/${booking.id}`,
    metadata: { booking_id: booking.id },
  })

  // Create notification for shop
  await supabase.from("notifications").insert({
    user_id: shopId,
    title: "New Booking",
    message: "A new booking has been made for your shop",
    type: "booking",
    read: false,
    action_url: `/shop/bookings/${booking.id}`,
    metadata: { booking_id: booking.id },
  })

  revalidatePath(`/rider/bookings`)
  revalidatePath(`/shop/bookings`)
  return { success: true, booking }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const supabase = createServerSupabaseClient()

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single()

  if (bookingError) {
    return { error: bookingError.message }
  }

  const { data, error } = await supabase.from("bookings").update({ status }).eq("id", bookingId).select().single()

  if (error) {
    return { error: error.message }
  }

  // If status is completed or cancelled, update scooter status back to available
  if (status === "completed" || status === "cancelled") {
    await supabase.from("scooters").update({ status: "available" }).eq("id", booking.scooter_id)
  }

  revalidatePath(`/rider/bookings`)
  revalidatePath(`/shop/bookings`)
  revalidatePath(`/rider/bookings/${bookingId}`)
  revalidatePath(`/shop/bookings/${bookingId}`)
  return { success: true, booking: data }
}

export async function updatePaymentStatus(bookingId: string, paymentStatus: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("bookings")
    .update({ payment_status: paymentStatus })
    .eq("id", bookingId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/rider/bookings`)
  revalidatePath(`/shop/bookings`)
  revalidatePath(`/rider/bookings/${bookingId}`)
  revalidatePath(`/shop/bookings/${bookingId}`)
  return { success: true, booking: data }
}
