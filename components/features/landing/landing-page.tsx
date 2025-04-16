import { AppHeader } from "@/components/ui/app-header"
import { AppFooter } from "@/components/ui/app-footer"
import { HeroSection } from "./hero-section"
import { TestimonialsSection } from "./testimonials-section"

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </main>

      <AppFooter />
    </div>
  )
}
