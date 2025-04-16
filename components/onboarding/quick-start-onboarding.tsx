"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AlertCircle, Smartphone } from "lucide-react"

export function QuickStartOnboarding() {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // In a real implementation, we would check if this phone number exists
      // and create a quick-start session for the user
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate a successful quick-start
      router.push("/onboarding?session=quick-start-123")
    } catch (err) {
      setError("Failed to start quick onboarding. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Start</CardTitle>
        <CardDescription>
          Already used ScootScoot before? Enter your phone number for a faster verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2" onClick={handleSubmit} disabled={!phone || loading}>
          {loading ? (
            <>
              <LoadingSpinner size="sm" />
              Checking...
            </>
          ) : (
            <>
              <Smartphone className="h-4 w-4" />
              Quick Verify
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
