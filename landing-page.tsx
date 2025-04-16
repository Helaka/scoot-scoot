import Link from "next/link"
import { Bike, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white dark:from-purple-950 dark:via-purple-900 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto flex h-20 items-center justify-between px-4 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-lg mt-4 border border-white/20 dark:border-purple-800/20">
        <div className="flex items-center gap-2">
          <Bike className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-bold">ScootScoot</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Rent a Scooter{" "}
          <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">Anywhere</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          The easiest way to rent and manage scooters. Whether you're a rider looking for your next adventure or a
          rental shop managing your fleet.
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
              Find and book scooters for your next adventure. Easy payments, digital agreements, and hassle-free
              rentals.
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
              Manage your scooter fleet, track rentals, and grow your business with our comprehensive management
              platform.
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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-white/30 dark:from-purple-900/30 dark:to-gray-900/50 rounded-3xl blur-3xl -z-10"></div>
        <h2 className="mb-12 text-center text-3xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
          Why Choose ScootScoot?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 text-white dark:from-purple-600 dark:to-yellow-500">
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
                className="h-6 w-6"
              >
                <path d="m12 14 4-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Fast & Easy</h3>
            <p className="text-muted-foreground">
              Book a scooter in minutes or manage your entire fleet with our intuitive platform.
            </p>
          </div>
          <div className="rounded-lg p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 text-white dark:from-purple-600 dark:to-yellow-500">
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
                className="h-6 w-6"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Secure & Reliable</h3>
            <p className="text-muted-foreground">
              Digital agreements, secure payments, and verified profiles for peace of mind.
            </p>
          </div>
          <div className="rounded-lg p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 text-white dark:from-purple-600 dark:to-yellow-500">
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
                className="h-6 w-6"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Global Network</h3>
            <p className="text-muted-foreground">
              Access scooters worldwide with our growing network of rental partners.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-100 to-yellow-50 py-12 dark:from-purple-950 dark:to-gray-900 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Bike className="h-6 w-6 text-yellow-500" />
              <span className="text-lg font-bold">ScootScoot</span>
            </div>
            <div className="flex gap-8">
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="/help" className="text-sm text-muted-foreground hover:underline">
                Help Center
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ScootScoot. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
