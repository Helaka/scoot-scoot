"use client"

import { useEffect, useState } from "react"
import { getSupabaseBrowser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthTestPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseBrowser()

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email: "test@example.com",
      password: "password123",
    })
  }

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "test@example.com",
      password: "password123",
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Test</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div>
              <p>Logged in as: {user.email}</p>
              <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto max-h-60">{JSON.stringify(user, null, 2)}</pre>
              <Button onClick={handleSignOut} className="mt-4">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p>Not logged in</p>
              <div className="flex gap-4">
                <Button onClick={handleSignIn}>Sign In (Test User)</Button>
                <Button onClick={handleSignUp} variant="outline">
                  Sign Up (Test User)
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
