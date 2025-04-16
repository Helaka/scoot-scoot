"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ShopLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you would authenticate with your backend
      router.push("/shop-dashboard")
    }, 1500)
  }

  const handleDemoLogin = () => {
    setIsLoading(true)
    // Simulate demo login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/shop-dashboard?demo=true")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl">
        <Link
          href="/"
          className="absolute bottom-20 right-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl"></div>

      {/* Header - Simplified */}
      <header className="container mx-auto flex h-20 items-center px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-yellow-500">
            SCOOTSCOOT
          </h1>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/3 w-6 h-6 bg-white/80 rounded-full blur-sm"></div>
          <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-white/80 rounded-full blur-sm"></div>
          <div className="relative z-10">
            <CardHeader className="space-y-1 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-yellow-500">
                  SCOOTSCOOT
                </h1>
              </div>
              <CardTitle className="text-2xl">Rental Shop Access</CardTitle>
              <CardDescription>Login to your rental shop account or try our demo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="space-y-4 pt-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@business.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-yellow-600 hover:underline dark:text-yellow-400"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="signup" className="space-y-4 pt-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      router.push("/shop-onboarding")
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="signup-business">Business Name</Label>
                      <Input id="signup-business" type="text" placeholder="Beach Scooter Rentals" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Business Email</Label>
                      <Input id="signup-email" type="email" placeholder="your@business.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Business Phone</Label>
                      <Input id="signup-phone" type="tel" placeholder="+1 (555) 123-4567" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <Input id="signup-confirm" type="password" required />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white font-medium"
                    >
                      Create Business Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="relative w-full mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground dark:bg-gray-800">Or</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Button variant="outline" className="w-full" onClick={handleDemoLogin} disabled={isLoading}>
                  Try Demo Version
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  onClick={() => router.push("/shop-onboarding?mode=test")}
                >
                  Preview Onboarding Process
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  )
}
