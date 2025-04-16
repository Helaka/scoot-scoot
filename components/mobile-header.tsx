"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SimpleThemeToggle } from "@/components/simple-theme-toggle"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileHeaderProps {
  title: string
  userName: string
  userType: "rider" | "shop" | "admin"
  isDemo?: boolean
  showNotifications?: boolean
}

export function MobileHeader({
  title,
  userName,
  userType,
  isDemo = false,
  showNotifications = true,
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-yellow-200/50 dark:border-yellow-900/20 bg-white/80 backdrop-blur-lg px-4 dark:bg-gray-900/80 md:hidden">
      <MobileNavigation isDemo={isDemo} userType={userType} />

      <div className="flex-1">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <SimpleThemeToggle />

        {showNotifications && (
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        )}

        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
          <AvatarFallback>
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
