"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Bike, Map, Calendar, CreditCard, MessageSquare, User, Menu, X, FileCheck, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavigationProps {
  isDemo?: boolean
  userType: "rider" | "shop" | "admin"
}

export function MobileNavigation({ isDemo = false, userType = "rider" }: MobileNavigationProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close sheet when path changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
        { href: "/shop-customers", label: "Customers", icon: User },
        { href: "/shop-numbers", label: "Analytics", icon: CreditCard },
        { href: "/shop-support", label: "Support", icon: MessageSquare },
      ]
    } else {
      return [
        { href: "/admin-dashboard", label: "Dashboard", icon: Home },
        { href: "/admin-user-management", label: "Users", icon: User },
        { href: "/admin-fleet-management", label: "Fleet", icon: Bike },
        { href: "/admin-shop-management", label: "Shops", icon: Home },
        { href: "/admin-analytics", label: "Analytics", icon: CreditCard },
      ]
    }
  }

  const navItems = getNavItems()

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] max-w-xs p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b">
              <Bike className="h-6 w-6 text-yellow-500" />
              <h1 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
                  ScootScoot
                </span>
              </h1>
            </div>

            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-1 px-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={`${item.href}${isDemo ? "?demo=true" : ""}`}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-gradient-to-r from-purple-600 to-yellow-500 text-white" : "hover:bg-muted",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="border-t p-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <X className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
