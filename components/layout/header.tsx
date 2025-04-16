import Link from "next/link"
import { Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedThemeToggle } from "@/components/ui/enhanced-theme-toggle"

export function Header() {
  return (
    <header className="container mx-auto flex h-20 items-center justify-between px-4 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-lg mt-4 border border-white/20 dark:border-purple-800/20">
      <div className="flex items-center gap-2">
        <Bike className="h-8 w-8 text-yellow-500" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
          ScootScoot
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/about">
          <Button variant="ghost">About</Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost">Contact</Button>
        </Link>
        <EnhancedThemeToggle />
      </div>
    </header>
  )
}
