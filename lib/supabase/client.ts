import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a singleton instance for client-side
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Get the singleton instance
export const getSupabaseBrowser = () => {
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient()
  }
  return supabaseInstance
}
