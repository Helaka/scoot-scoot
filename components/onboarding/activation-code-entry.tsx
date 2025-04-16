"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/contexts/session-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function ActivationCodeEntry() {
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { activateSession, loading } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    try {
      // In a real app, we would get the rider ID from authentication
      const riderId = "rider-temp-id"
      const session = await activateSession(code, riderId)

      if (!session) {
        setError("Invalid or expired activation code. Please check and try again.")
        return
      }

      setSuccess(true)

      // Redirect to onboarding page after a short delay
      setTimeout(() => {
        router.push(`/onboarding?session=${session.id}`)
      }, 1500)
    } catch (err) {
      setError("Failed to activate session. Please try again.")
      console.error(err)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Enter Activation Code</CardTitle>
        <CardDescription>Enter the 6-digit code provided by your rental shop</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Code accepted. Redirecting to onboarding...</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                className="text-center text-2xl tracking-widest h-14"
                maxLength={6}
                disabled={loading || success}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={code.length !== 6 || loading || success}>
          {loading ? <LoadingSpinner className="mr-2" /> : null}
          {loading ? "Verifying..." : "Continue"}
        </Button>
      </CardFooter>
    </Card>
  )
}
