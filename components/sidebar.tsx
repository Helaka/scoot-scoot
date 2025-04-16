"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  Home,
  Bike,
  Map,
  Calendar,
  CreditCard,
  MessageSquare,
  User,
  FileCheck,
  Shield,
  Users,
  BarChart,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
  userType: "rider" | "shop" | "admin"
}

export function Sidebar({ className, userType = "rider" }: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"

  // Define navigation items based on user type
  const getNavItems = () => {
    if (userType === "rider") {
      return [
        { href: "/rider-dashboard", label: "Dashboard", icon: Home },
        { href: "/rider-find-scooters", label: "Find Scooters", icon: Map },
        { href: "/rider-rentals", label: "My Rentals", icon: Calendar },
        { href: "/rider-payments", label: "Payments", icon: CreditCard },
        { href: "/rider-support", label: "Support", icon: MessageSquare },
        { href: "/rider-profile", label: "Profile", icon: User },
        { href: "/rider-drp/application", label: "Digital Ride Permit", icon: FileCheck },
        { href: "/rider-insurance", label: "Insurance", icon: Shield },
      ]
    } else if (userType === "shop") {
      return [
        { href: "/shop-dashboard", label: "Dashboard", icon: Home },
        { href: "/shop-scooters", label: "My Scooters", icon: Bike },
        { href: "/shop-bookings", label: "Bookings", icon: Calendar },
        { href: "/shop-customers", label: "Customers", icon: Users },
        { href: "/shop-numbers", label: "Analytics", icon: BarChart },
        { href: "/shop-support", label: "Support", icon: MessageSquare },
        { href: "/shop-settings", label: "Settings", icon: Settings },
        { href: "/shop-help", label: "Help Center", icon: HelpCircle },
      ]
    } else {
      return [
        { href: "/admin-dashboard", label: "Dashboard", icon: Home },
        { href: "/admin-user-management", label: "Users", icon: User },
        { href: "/admin-fleet-management", label: "Fleet", icon: Bike },
        { href: "/admin-shop-management", label: "Shops", icon: Home },
        { href: "/admin-analytics", label: "Analytics", icon: BarChart },
        { href: "/admin-settings", label: "Settings", icon: Settings },
      ]
    }
  }

  const navItems = getNavItems()

  return (
    <div className={cn("flex h-screen w-64 flex-col border-r bg-background", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bike className="h-6 w-6 text-yellow-500" />
          <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
            ScootScoot
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={`${item.href}${isDemo ? "?demo=true" : ""}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-yellow-500 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  )
}
