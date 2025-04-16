"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Map, Calendar, User, Bike, LogOut, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface MobileBottomNavProps {
  isDemo?: boolean
  userType: "rider" | "shop" | "admin"
}

export function MobileBottomNav({ isDemo = false, userType = "rider" }: MobileBottomNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  // Define navigation items based on user type
  const getNavItems = () => {
    if (userType === "rider") {
      return [
        { href: "/rider-dashboard", label: "Home", icon: Home },
        { href: "/rider-find-scooters", label: "Find", icon: Map },
        { href: "/rider-social", label: "Social", icon: Users },
        { href: "/rider-profile", label: "Profile", icon: User },
      ]
    } else if (userType === "shop") {
      return [
        { href: "/shop-dashboard", label: "Home", icon: Home },
        { href: "/shop-scooters", label: "Scooters", icon: Bike },
        { href: "/shop-bookings", label: "Bookings", icon: Calendar },
        { href: "/shop-settings", label: "Settings", icon: User },
      ]
    } else {
      return [
        { href: "/admin-dashboard", label: "Home", icon: Home },
        { href: "/admin-user-management", label: "Users", icon: User },
        { href: "/admin-fleet-management", label: "Fleet", icon: Bike },
        { href: "/admin-settings", label: "Settings", icon: User },
      ]
    }
  }

  const navItems = getNavItems()

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would call an API to log the user out
    router.push(`/${userType}-login`)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-yellow-200/50 dark:border-yellow-900/20 backdrop-blur-lg">
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={`${item.href}${isDemo ? "?demo=true" : ""}`}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center",
                  isActive ? "text-yellow-500" : "text-muted-foreground",
                )}
              >
                <item.icon className={cn("h-5 w-5 mb-1", isActive ? "text-yellow-500" : "text-muted-foreground")} />
                <span className="text-xs">{item.label}</span>
              </div>
            </Link>
          )
        })}
        <button onClick={handleLogout} className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <LogOut className="h-5 w-5 mb-1 text-red-500" />
            <span className="text-xs">Logout</span>
          </div>
        </button>
      </nav>
    </div>
  )
}
