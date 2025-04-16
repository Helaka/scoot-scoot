"use server"

import { createServerClient } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = formData.get("phone") as string

  const supabase = createServerClient()

  // Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (authError) {
    return { success: false, error: authError.message }
  }

  // If user was created successfully, add them to our users table
  if (authData.user) {
    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      role: "rider", // Default role for new users
      first_name: firstName,
      last_name: lastName,
      phone,
      // Removed password_hash field as it's handled by Supabase Auth
      status: "active",
    })

    if (dbError) {
      // If there was an error creating the user record, we should delete the auth user
      console.error("Error creating user record:", dbError)
      return { success: false, error: "Failed to create user profile" }
    }

    // Create rider profile
    const { error: profileError } = await supabase.from("rider_profiles").insert({
      user_id: authData.user.id,
    })

    if (profileError) {
      console.error("Error creating rider profile:", profileError)
      // We don't return an error here as the user account is still created
    }
  }

  return {
    success: true,
    message: "Registration successful! Please check your email to confirm your account.",
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  // Get user role from the users table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role, status")
    .eq("id", data.user.id)
    .single()

  if (userError || !userData) {
    return { success: false, error: "Failed to get user information" }
  }

  // Check if user is active
  if (userData.status !== "active") {
    await supabase.auth.signOut()
    return { success: false, error: "Your account is not active. Please contact support." }
  }

  // Store user role in a cookie for easy access
  cookies().set("user_role", userData.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Log the role for debugging
  console.log("Role from database:", userData.role)

  revalidatePath("/")

  return {
    success: true,
    user: data.user,
    role: userData.role,
  }
}

export async function signOut() {
  const supabase = createServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { success: false, error: error.message }
  }

  // Clear cookies
  cookies().delete("user_role")

  revalidatePath("/")
  redirect("/login")
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string

  const supabase = createServerClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/confirm`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return {
    success: true,
    message: "Password reset instructions have been sent to your email",
  }
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string

  const supabase = createServerClient()

  try {
    // Get the hash from the URL if available (for password reset flow)
    // This is needed because the user might not be logged in when resetting password
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      console.error("Password update error:", error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: "Password has been updated successfully",
    }
  } catch (error) {
    console.error("Unexpected error during password update:", error)
    return {
      success: false,
      error: "An unexpected error occurred during password update",
    }
  }
}

export async function updateProfile(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = formData.get("phone") as string

  const supabase = createServerClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  // Update user metadata in Auth
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name: lastName,
    },
  })

  if (authError) {
    return { success: false, error: authError.message }
  }

  // Update user record in database
  const { error: dbError } = await supabase
    .from("users")
    .update({
      first_name: firstName,
      last_name: lastName,
      phone,
    })
    .eq("id", user.id)

  if (dbError) {
    return { success: false, error: dbError.message }
  }

  revalidatePath("/profile")

  return {
    success: true,
    message: "Profile updated successfully",
  }
}
