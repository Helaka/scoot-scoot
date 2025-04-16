import { LandingPage } from "@/components/features/landing/landing-page"
import { getServerUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/auth"

export default async function HomePage() {
  // Check if user is logged in
  const user = await getServerUser()

  if (user) {
    // Get user role
    const supabase = createServerClient()
    const { data } = await supabase.from("users").select("role").eq("id", user.id).single()

    // Redirect based on role
    if (data?.role === "rider") {
      redirect("/rider-dashboard")
    } else if (data?.role === "shop_owner" || data?.role === "shop_staff") {
      redirect("/shop-dashboard")
    } else if (data?.role === "admin") {
      redirect("/admin-dashboard")
    }
  }

  // If not logged in, show the landing page
  return <LandingPage />
}
