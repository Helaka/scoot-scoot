"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getNotifications(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getUnreadNotificationsCount(userId: string) {
  const supabase = createServerSupabaseClient()

  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false)

  if (error) {
    throw new Error(error.message)
  }

  return count || 0
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/notifications`)
  return { success: true }
}

export async function markAllNotificationsAsRead(userId: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("notifications").update({ read: true }).eq("user_id", userId).eq("read", false)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/notifications`)
  return { success: true }
}

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: string,
  actionUrl?: string,
  metadata?: any,
) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      title,
      message,
      type,
      read: false,
      action_url: actionUrl,
      metadata: metadata || {},
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  return { success: true, notification: data }
}
