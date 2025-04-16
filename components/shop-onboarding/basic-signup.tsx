"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Bike } from "lucide-react"

interface BasicSignUpProps {
  initialData: {
    businessName: string
    email: string
    password: string
  }
  onComplete: (data: any) => void
  testMode?: boolean
}

export default function BasicSignUp({ initialData, onComplete, testMode = false }: BasicSignUpProps) {
  const [businessName, setBusinessName] = useState(initialData.businessName)
  const [email, setEmail] = useState(initialData.email)
  const [password, setPassword] = useState(initialData.password)
  const [confirmPassword, setConfirmPassword] = useState(initialData.password)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (testMode || validate()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        onComplete({
          businessName,
          email,
          password,
        })
      }, 1000)
    }
  }

  return (
    <Card className="w-full bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30 mt-6">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-full blur-sm opacity-70"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-full p-1">
              <Bike className="h-8 w-8 text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-yellow-500" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-yellow-500">
            SCOOTSCOOT
          </h1>
        </div>
        <CardTitle className="text-2xl">Create Your Rental Shop</CardTitle>
        <CardDescription>Let's get started with the basics. You can add more details later.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Beach Scooter Rentals"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={errors.businessName ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Business Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Continue to Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  )
}
