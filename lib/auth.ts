import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

// These environment variables are automatically available from the Supabase integration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a server-side client (for server components and server actions)
export const createServerClient = cache(() => {
  const cookieStore = cookies()

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: "scootscoot-auth",
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(
        name: string,
        value: string,
        options: { path: string; maxAge: number; domain?: string; sameSite?: string; secure?: boolean },
      ) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: { path: string; domain?: string; sameSite?: string; secure?: boolean }) {
        cookieStore.set({ name, value: "", ...options, maxAge: 0 })
      },
    },
  })
})

// Create a single supabase client for server
export function getSupabaseServer() {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}

// Get the current session on the server
export async function getServerSession() {
  const supabase = createServerClient()
  return await supabase.auth.getSession()
}

// Get the current user on the server
export async function getServerUser() {
  const supabase = getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// Get user role from the database
export async function getUserRole(userId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("users").select("role").eq("id", userId).single()

  if (error || !data) {
    return null
  }

  return data.role
}

// Check if the current user has a specific role
export async function checkUserRole(role: string | string[]) {
  const user = await getServerUser()

  if (!user) {
    return false
  }

  const userRole = await getUserRole(user.id)

  if (!userRole) {
    return false
  }

  if (Array.isArray(role)) {
    return role.includes(userRole)
  }

  return userRole === role
}

// Middleware to protect routes based on authentication
export async function requireAuth(redirectTo = "/login") {
  const user = await getServerUser()

  if (!user) {
    redirect(redirectTo)
  }

  return user
}

// Middleware to protect routes based on role
export async function requireRole(role: string | string[], redirectTo = "/unauthorized") {
  const user = await requireAuth("/login")
  const hasRole = await checkUserRole(role)

  if (!hasRole) {
    redirect(redirectTo)
  }

  return user
}
