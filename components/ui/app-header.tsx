import Link from "next/link"
import { SimpleThemeToggle } from "@/components/simple-theme-toggle"

interface AppHeaderProps {
  userType?: "rider" | "shop" | "admin" | "none"
  userName?: string
  isDemo?: boolean
}

export function AppHeader({ userType = "none", userName, isDemo = false }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border/40 bg-white/80 backdrop-blur-md px-4 py-3 dark:bg-gray-900/80">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent"
          >
            ScootScoot
          </Link>

          {userType !== "none" && (
            <span className="ml-2 text-sm text-muted-foreground">
              {userType === "rider"
                ? "Rider Portal"
                : userType === "shop"
                  ? "Shop Portal"
                  : userType === "admin"
                    ? "Admin Portal"
                    : ""}
            </span>
          )}

          {isDemo && (
            <span className="ml-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
              Demo
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SimpleThemeToggle />

          {userName && <span className="ml-2 text-sm hidden md:inline-block">{userName}</span>}
        </div>
      </div>
    </header>
  )
}
