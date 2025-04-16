"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Bike, Loader2 } from "lucide-react"

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const result = await updatePassword(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: result.message || "Your password has been updated successfully",
        })

        // Redirect to login page after successful password reset
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        setError(result.error || "An error occurred")
        toast({
          title: "Error",
          description: result.error || "An error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Password update error:", error)
      setError("An unexpected error occurred")
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-yellow-500/20 p-2">
          <Bike className="h-10 w-10 text-yellow-500" />
        </div>
      </div>

      <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            required
            minLength={8}
            className="border-gray-300"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            required
            minLength={8}
            className="border-gray-300"
          />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating Password...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  )
}
