"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Bike, Loader2 } from "lucide-react"

export function SignupForm() {
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
      const result = await signUp(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Account created successfully. Please check your email to verify your account.",
        })

        // Redirect to login page after successful signup
        router.push("/login")
      } else {
        setError(result.error || "An error occurred during signup")
        toast({
          title: "Error",
          description: result.error || "An error occurred during signup",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Signup error:", error)
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
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" placeholder="John" type="text" required className="border-gray-300" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" placeholder="Doe" type="text" required className="border-gray-300" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            required
            className="border-gray-300"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required className="border-gray-300" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="123-456-7890" required className="border-gray-300" />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </div>
  )
}
