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
}

export function RiderLoginForm({ redirectTo }: LoginFormProps) {
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
      console.log("Submitting login form...")
      const result = await signIn(formData)
      console.log("Login result:", result)

      if (result.success) {
        toast({
          title: "Success",
          description: "You have been logged in",
        })

        // If there's a specific redirect URL, use it
        if (redirectTo) {
          router.push(redirectTo)
        } else {
          // For rider login, always redirect to rider dashboard
          router.push("/rider-dashboard")
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
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-bold">Rider Login</h1>
          <p className="text-muted-foreground">Enter your email to sign in to your rider account</p>
        </div>

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

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/signup" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
