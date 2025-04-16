"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { AppHeader } from "@/components/ui/app-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import {
  Home,
  Bike,
  DollarSign,
  Users,
  Calendar,
  BarChart2,
  UserCog,
  FileText,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ShopUser } from "@/types/user-types"
import { roleDetectionService } from "@/services/role-detection-service"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/ui/page-transition"

interface ShopLayoutProps {
  children: React.ReactNode
  currentUser?: ShopUser
}

export function ShopLayout({ children }: ShopLayoutProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<ShopUser | null>(null)

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    // Get the current user
    const user = roleDetectionService.getCurrentUser()
    setCurrentUser(user)
  }, [])

  // Add the report rider link to the navigation items array
  const navItems = [
    { name: "Dashboard", href: "/shop-dashboard", icon: Home },

    // Inventory management group
    { name: "My Scooters", href: "/shop-scooters", icon: Bike },
    { name: "My Pricing", href: "/shop-pricing", icon: DollarSign },

    // Business operations group
    { name: "My Bookings", href: "/shop-bookings", icon: Calendar },
    { name: "My Customers", href: "/shop-customers", icon: Users },
    { name: "Blacklist", href: "/shop-blacklist", icon: Shield },

    // Location management
    { name: "My Branches", href: "/shop-branches", icon: MapPin },
    { name: "My Staff", href: "/shop-staff", icon: UserCog },

    // Financial group
    { name: "My Numbers", href: "/shop-numbers", icon: BarChart2 },
    { name: "Payout Settings", href: "/shop-payout-settings", icon: DollarSign },
    { name: "My Reports", href: "/shop-reports", icon: FileText },

    // Insurance group
    { name: "Rider Insurance", href: "/shop-rider-insurance", icon: Shield },
    { name: "Business Insurance", href: "/shop-insurance", icon: FileText },
  ]

  const secondaryNavItems = [
    { name: "Settings", href: "/shop-settings", icon: Settings },
    { name: "Help & Support", href: "/shop-support", icon: HelpCircle },
  ]

  const NavLink = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive = pathname === item.href

    return (
      <Link
        href={`${item.href}${isDemo ? "?demo=true" : ""}`}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-purple-600 to-yellow-500 text-white shadow-md"
            : "hover:bg-white/80 dark:hover:bg-gray-800/60 hover:translate-x-1",
        )}
      >
        <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <item.icon className="h-5 w-5" />
        </motion.div>
        <span>{item.name}</span>
        {isActive && (
          <motion.div
            className="ml-auto h-2 w-2 rounded-full bg-white"
            layoutId="activeNavIndicator"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-yellow-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900/90 dark:to-purple-950/50">
      {/* Mobile-only header */}
      <div className="md:hidden">
        <AppHeader userType="shop" userName="Shop Admin" isDemo={isDemo} showNavLinks={false} />
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar for desktop */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-20 hidden w-full max-w-xs flex-col border-r border-yellow-200/50 dark:border-yellow-900/20 bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 transition-transform md:flex md:static md:translate-x-0",
          )}
        >
          <div className="border-b p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
                ScootScoot
              </span>{" "}
              <span>Rental Shop</span>
            </h1>
            <div className="flex items-center gap-2">{/* Header controls can go here if needed */}</div>
          </div>

          <div className="flex-1 overflow-auto py-2 px-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
              <div className="my-2 h-px bg-border" />
              {secondaryNavItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {currentUser?.name?.charAt(0) || "S"}
              </div>
              <div>
                <p className="text-sm font-medium">{currentUser?.name || "ScootScoot Shop"}</p>
                <p className="text-xs text-muted-foreground">
                  {currentUser?.role
                    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
                    : "shop@scootscoot.com"}
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="flex w-full items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium hover:bg-muted/80 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-br from-yellow-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900/90 dark:to-purple-950/50 pb-16 md:pb-6">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav isDemo={isDemo} userType="shop" />
      </div>
    </div>
  )
}
