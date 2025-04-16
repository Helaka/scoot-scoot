"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "@/components/ui/app-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Bike, Calendar, CreditCard, Home, LogOut, Map, MessageSquare, Settings, User, FileCheck } from "lucide-react"

interface RiderLayoutProps {
  children: React.ReactNode
}

export default function RiderLayout({ children }: RiderLayoutProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isDemo = searchParams?.get("demo") === "true"
  const [userName, setUserName] = useState("John Doe")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (isDemo) {
      setUserName("Demo User")
    }
  }, [isDemo])

  const isActive = (path: string) => {
    return pathname === path
  }

  // Update the handleLogout function to use the router
  const handleLogout = () => {
    setIsLoggingOut(true)
    // Simulate logout process
    setTimeout(() => {
      router.push("/rider-login")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-yellow-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900/90 dark:to-purple-950/50">
      {/* Header - Using consolidated AppHeader */}
      <AppHeader userType="rider" userName={userName} isDemo={isDemo} showNavLinks={false} />

      {/* Sidebar - Desktop Only */}
      <div className="fixed inset-y-0 left-0 z-20 hidden w-full max-w-xs flex-col border-r border-yellow-200/50 dark:border-yellow-900/20 bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 transition-transform md:flex md:static md:translate-x-0">
        <div className="flex items-center gap-2 px-2 py-4">
          <Bike className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
              ScootScoot
            </span>
          </h1>
        </div>
        <div className="mt-8 flex flex-col items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-semibold">{userName}</h2>
          <p className="text-sm text-muted-foreground">Rider</p>
          {isDemo && <Badge className="mt-2 bg-yellow-500 text-black">Demo Mode</Badge>}
        </div>

        {/* Add compact DRP promo in sidebar */}
        <div className="mt-4 px-2">
          <Link href="/rider-drp/application">
            <Button
              variant="outline"
              className="w-full justify-start border-yellow-200 bg-yellow-50/50 hover:bg-yellow-100/50 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:hover:bg-yellow-900/20"
            >
              <FileCheck className="mr-2 h-4 w-4 text-yellow-500" />
              <span className="flex flex-col items-start">
                <span className="text-sm font-medium">Get Your Permit</span>
                <span className="text-xs text-muted-foreground">Digital Ride Permit</span>
              </span>
            </Button>
          </Link>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-2 px-2">
          <Link href={`/rider-dashboard${isDemo ? "?demo=true" : ""}`}>
            <Button
              variant={isActive("/rider-dashboard") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/rider-dashboard") ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href={`/rider-find-scooters${isDemo ? "?demo=true" : ""}`}>
            <Button
              variant={isActive("/rider-find-scooters") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/rider-find-scooters") ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
            >
              <Map className="mr-2 h-4 w-4" />
              Find Scooters
            </Button>
          </Link>
          <Link href={`/rider-rentals${isDemo ? "?demo=true" : ""}`}>
            <Button
              variant={isActive("/rider-rentals") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/rider-rentals") ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
            >
              <Calendar className="mr-2 h-4 w-4" />
              My Rentals
            </Button>
          </Link>
          <Link href={`/rider-payments${isDemo ? "?demo=true" : ""}`}>
            <Button
              variant={isActive("/rider-payments") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/rider-payments") ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Payments
            </Button>
          </Link>
          <Link href={`/rider-support${isDemo ? "?demo=true" : ""}`}>
            <Button
              variant={isActive("/rider-support") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/rider-support") ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Support
            </Button>
          </Link>
          <Link href={`/rider-profile${isDemo ? "?demo=true" : ""}`}>
            <Button
              variant={isActive("/rider-profile") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/rider-profile") ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
        </nav>
        <div className="mt-auto px-2 pb-4">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-16 md:pb-0">
        {/* Page Content */}
        <main className="p-4 md:p-6">
          {isDemo && (
            <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-100 to-yellow-100 p-4 text-purple-800 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-yellow-900/30 dark:text-purple-200 backdrop-blur-sm border border-white/20 dark:border-purple-500/10">
              <h2 className="text-lg font-semibold">Demo Mode Active</h2>
              <p>You're currently viewing the demo version with sample data. Explore the features!</p>
            </div>
          )}

          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav isDemo={isDemo} userType="rider" />
      </div>
    </div>
  )
}
