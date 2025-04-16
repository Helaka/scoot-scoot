"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, User, Shield, HelpCircle, Bell, Menu, LogOut, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string | number
}

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Check if mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Update the navItems array to include the Social tab
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/rider-dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Bookings",
      href: "/rider-bookings",
      icon: <Calendar className="h-5 w-5" />,
      badge: 1,
    },
    {
      title: "Social",
      href: "/rider-social",
      icon: <Users className="h-5 w-5" />,
      badge: 3,
    },
    {
      title: "Profile",
      href: "/rider-profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/rider-settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Insurance",
      href: "/rider-insurance",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: "Support",
      href: "/rider-support",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <nav className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-2 py-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gradient-to-r from-purple-600 to-yellow-500 p-1">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-xs text-muted-foreground">john.doe@example.com</div>
                  </div>
                </div>
              </div>
              <div className="px-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSheetOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                      pathname === item.href && "bg-muted text-foreground",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {item.badge && <Badge className="ml-auto bg-yellow-500 text-black">{item.badge}</Badge>}
                  </Link>
                ))}
              </div>
              <div className="mt-auto border-t pt-4">
                <Button variant="ghost" className="w-full justify-start gap-2 px-3">
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <Link href="/rider-dashboard" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              SCOOTSCOOT
            </span>
          </Link>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasNotifications && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-yellow-500" />}
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/rider-profile">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
        </Button>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r bg-background md:block md:w-[240px] lg:w-[280px]">
          <div className="flex h-full flex-col gap-2">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/rider-dashboard" className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
                  SCOOTSCOOT
                </span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                      pathname === item.href && "bg-muted text-foreground",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {item.badge && <Badge className="ml-auto bg-yellow-500 text-black">{item.badge}</Badge>}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto border-t p-4">
              <div className="flex items-center gap-2 px-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground truncate">john.doe@example.com</div>
                </div>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log out</span>
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </div>
        </main>
      </div>
    </div>
  )
}
