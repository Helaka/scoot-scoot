"use client"

import type React from "react"

import { useState, useRef } from "react"
import { resetPassword } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Bike, Loader2 } from "lucide-react"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await resetPassword(formData)

      if (result.success) {
        setSuccess(result.message || "Password reset instructions have been sent to your email")
        toast({
          title: "Success",
          description: result.message || "Password reset instructions have been sent to your email",
        })
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        setError(result.error || "An error occurred during password reset")
        toast({
          title: "Error",
          description: result.error || "An error occurred during password reset",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Password reset error:", error)
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            required
            className="border-gray-300"
          />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}
        {success && <div className="text-sm text-green-500">{success}</div>}

        <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending reset link...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  )
}
