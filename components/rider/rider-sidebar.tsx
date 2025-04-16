"use client"

import { Home, Calendar, CreditCard, Settings, HelpCircle, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function RiderSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/rider-dashboard",
      active: pathname === "/rider-dashboard",
    },
    {
      label: "My Bookings",
      icon: Calendar,
      href: "/rider-bookings",
      active: pathname === "/rider-bookings",
    },
    {
      label: "Payments",
      icon: CreditCard,
      href: "/rider-payments",
      active: pathname === "/rider-payments",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/rider-settings",
      active: pathname === "/rider-settings",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      href: "/rider-support",
      active: pathname === "/rider-support",
    },
  ]

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-50 text-gray-700">
      <div className="px-3 py-2 flex-1">
        <div className="mb-8 px-3">
          <h2 className="text-2xl font-bold text-primary">ScootScoot</h2>
          <p className="text-xs text-muted-foreground mt-1">Rider Portal</p>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                route.active ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
          asChild
        >
          <Link href="/rider-login">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}
