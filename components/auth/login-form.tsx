"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Bike, Loader2 } from "lucide-react"

interface LoginFormProps {
  redirectTo?: string
  loginType?: string
}

export function LoginForm({ redirectTo, loginType }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await signIn(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "You have been logged in",
        })

        // If there's a specific redirect URL, use it
        if (redirectTo) {
          router.push(redirectTo)
        } else {
          // Otherwise redirect based on role or to home page
          if (loginType === "rider") {
            router.push("/rider-dashboard")
          } else if (loginType === "shop") {
            router.push("/shop-dashboard")
          } else if (loginType === "admin") {
            router.push("/admin-dashboard")
          } else {
            // Home page will handle role-based redirection
            router.push("/")
          }
        }
      } else {
        setError(result.error || "An error occurred during login")
        toast({
          title: "Error",
          description: result.error || "An error occurred during login",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
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

      <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
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
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-yellow-500">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={isLoading}
            required
            className="border-gray-300"
          />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </div>
  )
}
