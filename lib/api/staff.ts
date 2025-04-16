"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getStaffByShopId(shopId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("shop_staff")
    .select(`
      *,
      users(id, email, full_name, avatar_url),
      branches(id, name)
    `)
    .eq("shop_id", shopId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getStaffMember(staffId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("shop_staff")
    .select(`
      *,
      users(id, email, full_name, avatar_url, phone),
      branches(id, name)
    `)
    .eq("id", staffId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function addStaffMember(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const shopId = formData.get("shopId") as string
  const branchId = formData.get("branchId") as string
  const email = formData.get("email") as string
  const fullName = formData.get("fullName") as string
  const role = formData.get("role") as string
  const permissions = JSON.parse(formData.get("permissions") as string)

  // Check if user exists
  const { data: existingUser, error: userError } = await supabase.from("users").select("id").eq("email", email).single()

  let userId

  if (userError && userError.code === "PGRST116") {
    // User doesn't exist, create a new one
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: Math.random().toString(36).slice(-8), // Generate random password
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    })

    if (createError) {
      return { error: createError.message }
    }

    userId = newUser.user.id

    // Insert into users table
    await supabase.from("users").insert({
      id: userId,
      email,
      full_name: fullName,
      role: "shop_staff",
    })
  } else if (userError) {
    return { error: userError.message }
  } else {
    userId = existingUser.id
  }

  // Add staff member
  const { data, error } = await supabase
    .from("shop_staff")
    .insert({
      shop_id: shopId,
      branch_id: branchId || null,
      user_id: userId,
      role,
      permissions,
      status: "active",
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/staff`)
  return { success: true, staff: data }
}

export async function updateStaffMember(staffId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const branchId = formData.get("branchId") as string
  const role = formData.get("role") as string
  const permissions = JSON.parse(formData.get("permissions") as string)
  const status = formData.get("status") as string

  const { data, error } = await supabase
    .from("shop_staff")
    .update({
      branch_id: branchId || null,
      role,
      permissions,
      status,
    })
    .eq("id", staffId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/staff`)
  revalidatePath(`/shop/staff/${staffId}`)
  return { success: true, staff: data }
}

export async function removeStaffMember(staffId: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("shop_staff").update({ status: "inactive" }).eq("id", staffId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/staff`)
  return { success: true }
}
