"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, User, Route, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

export function RiderMobileNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/rider-dashboard",
      icon: Home,
      label: "Home",
    },
    {
      href: "/rider-explore",
      icon: Search,
      label: "Explore",
    },
    {
      href: "/rider-mode-entry",
      icon: Navigation,
      label: "Rider Mode",
    },
    {
      href: "/rider-rides",
      icon: Route,
      label: "My Rides",
    },
    {
      href: "/rider-profile",
      icon: User,
      label: "Profile",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around border-t bg-background">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex h-full w-full flex-col items-center justify-center",
            pathname === route.href ? "text-primary" : "text-muted-foreground hover:text-primary",
          )}
        >
          <route.icon className="h-5 w-5" />
          <span className="text-xs">{route.label}</span>
        </Link>
      ))}
    </div>
  )
}
