import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Your Adventure Starts With A{" "}
        <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">Scoot</span>
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
        ScootScoot connects riders & rental shops across Southeast Asia.
      </p>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Rider Card */}
        <div className="rounded-xl bg-white/60 p-8 shadow-lg backdrop-blur-md transition-all hover:shadow-xl hover:bg-white/80 border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 dark:hover:bg-gray-800/60">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 text-white dark:from-purple-600 dark:to-yellow-500 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </div>
          <h2 className="mb-3 text-2xl font-bold">Riders</h2>
          <p className="mb-6 text-muted-foreground">
            Find and book scooters for your next adventure. Easy payments, digital agreements, and hassle-free rentals.
          </p>
          <Link href="/rider-login">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white">
              Rider Login
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Rental Shop Card */}
        <div className="rounded-xl bg-white/60 p-8 shadow-lg backdrop-blur-md transition-all hover:shadow-xl hover:bg-white/80 border border-white/40 dark:bg-gray-800/40 dark:border-purple-500/20 dark:hover:bg-gray-800/60">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 text-white dark:from-purple-600 dark:to-yellow-500 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <path d="M19 16v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
              <path d="M12 2h7a2 2 0 0 1 2 2v7" />
              <path d="m22 2-7 7" />
              <path d="M7 12a5 5 0 0 0 5 5" />
              <path d="M17 12a5 5 0 0 0-5-5" />
            </svg>
          </div>
          <h2 className="mb-3 text-2xl font-bold">Rental Shops</h2>
          <p className="mb-6 text-muted-foreground">
            Manage your scooter fleet, track rentals, and grow your business with our comprehensive management platform.
          </p>
          <Link href="/shop-login">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white">
              Rental Shop Login
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
