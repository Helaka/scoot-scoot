import { createClient } from "@supabase/supabase-js"

// These environment variables are automatically available from the Supabase integration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton instance for client-side usage
let clientInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseBrowser = () => {
  if (clientInstance) return clientInstance

  clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: "scootscoot-auth",
    },
  })
  return clientInstance
}

// Create a single supabase client for browser
let browserClient: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient

  browserClient = createClient(supabaseUrl, supabaseAnonKey)
  return browserClient
}
