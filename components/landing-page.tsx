"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { EnhancedThemeToggle } from "@/components/enhanced-theme-toggle"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah T.",
      location: "Bali, Indonesia",
      text: "ScootScoot made exploring Bali so easy! I rented a scooter for a week, and the digital agreement process was seamless. The app helped me find the perfect rental shop near my hotel.",
      role: "Traveler",
    },
    {
      name: "Michael L.",
      location: "Phuket, Thailand",
      text: "Since joining ScootScoot, our rental shop has seen a 40% increase in bookings. The management dashboard makes tracking our fleet and handling reservations incredibly efficient. Best business decision we've made!",
      role: "Shop Owner",
    },
    {
      name: "David K.",
      location: "Ho Chi Minh City, Vietnam",
      text: "The Driver's Responsibility Program through ScootScoot gave me peace of mind during my travels. The insurance coverage was affordable and the claims process was straightforward when I needed it.",
      role: "Frequent Rider",
    },
  ]

  useEffect(() => {
    // Force a re-render when the theme changes
    const handleThemeChange = () => {
      document.documentElement.classList.toggle("dark", theme === "dark")
    }

    handleThemeChange()

    // Set up testimonial slider
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    // Clean up
    return () => {
      clearInterval(interval)
    }
  }, [theme, testimonials.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white dark:from-purple-950 dark:via-purple-900 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="container mx-auto flex h-20 items-center justify-between px-4 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-lg mt-4 border border-white/20 dark:border-purple-800/20">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-purple-500 to-yellow-500 bg-clip-text text-transparent relative z-10">
            SCOOTSCOOT
          </h1>
        </div>

        {/* Add theme toggle to header */}
        <EnhancedThemeToggle variant="outline" />
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Your Adventure Starts With A{" "}
          <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">Scoot</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          The ScootScoot Platform connects riders & rental shops across Southeast Asia.
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
                <path d="M3 21h18" />
                <path d="M3 7v14" />
                <path d="M21 7v14" />
                <path d="M6 21v-4" />
                <path d="M18 21v-4" />
                <path d="M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
                <path d="M3 7h18" />
                <path d="M9 7v4" />
                <path d="M15 7v4" />
                <path d="M10 11h4" />
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

      {/* Testimonials Section - Updated to be more glassmorphic and slider-like */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-white/30 dark:from-purple-900/30 dark:to-gray-900/50 rounded-3xl blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-purple-800/30 shadow-xl p-8 md:p-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-yellow-400/5 z-0"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 p-[2px] flex-shrink-0">
                  <div className="h-full w-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
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
                      className="h-6 w-6 text-purple-500"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>

              <div className="relative">
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
                  className="absolute -top-2 -left-2 h-8 w-8 text-purple-300 opacity-40"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p className="mb-6 pl-4 text-lg italic">{testimonials[currentTestimonial].text}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentTestimonial === index ? "bg-purple-600" : "bg-purple-300 dark:bg-purple-700"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Preserved from the latest version */}
      <footer className="bg-gradient-to-r from-purple-100 to-yellow-50 py-12 dark:from-purple-950 dark:to-gray-900 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
                SCOOTSCOOT
              </span>
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
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} ScootScoot. All rights reserved.</span>
              <Link href="/admin-login" className="text-yellow-600 hover:underline dark:text-yellow-400">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
