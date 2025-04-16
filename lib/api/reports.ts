"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function getBookingStats(shopId: string, period: "day" | "week" | "month" | "year" = "month") {
  const supabase = createServerSupabaseClient()

  let interval
  let format

  switch (period) {
    case "day":
      interval = "1 hour"
      format = "HH24"
      break
    case "week":
      interval = "1 day"
      format = "YYYY-MM-DD"
      break
    case "month":
      interval = "1 day"
      format = "YYYY-MM-DD"
      break
    case "year":
      interval = "1 month"
      format = "YYYY-MM"
      break
    default:
      interval = "1 day"
      format = "YYYY-MM-DD"
  }

  const { data, error } = await supabase.rpc("get_booking_stats", {
    p_shop_id: shopId,
    p_interval: interval,
    p_format: format,
    p_period: period,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getRevenueStats(shopId: string, period: "day" | "week" | "month" | "year" = "month") {
  const supabase = createServerSupabaseClient()

  let interval
  let format

  switch (period) {
    case "day":
      interval = "1 hour"
      format = "HH24"
      break
    case "week":
      interval = "1 day"
      format = "YYYY-MM-DD"
      break
    case "month":
      interval = "1 day"
      format = "YYYY-MM-DD"
      break
    case "year":
      interval = "1 month"
      format = "YYYY-MM"
      break
    default:
      interval = "1 day"
      format = "YYYY-MM-DD"
  }

  const { data, error } = await supabase.rpc("get_revenue_stats", {
    p_shop_id: shopId,
    p_interval: interval,
    p_format: format,
    p_period: period,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getScooterUtilization(shopId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.rpc("get_scooter_utilization", {
    p_shop_id: shopId,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getTopScooters(shopId: string, limit = 5) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.rpc("get_top_scooters", {
    p_shop_id: shopId,
    p_limit: limit,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
