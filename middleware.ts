import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Check if we're in a preview environment (v0.dev or similar)
  const isPreview =
    req.headers.get("host")?.includes("v0.dev") ||
    req.headers.get("user-agent")?.includes("Vercel") ||
    process.env.NODE_ENV === "development"

  // Skip authentication checks in preview environments
  if (isPreview) {
    return res
  }

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and trying to access protected routes
  if (!session) {
    const url = req.nextUrl.pathname

    // Skip authentication check for login pages
    if (
      url === "/login" ||
      url === "/rider-login" ||
      url === "/shop-login" ||
      url === "/admin-login" ||
      url === "/signup" ||
      url === "/forgot-password" ||
      url.startsWith("/reset-password")
    ) {
      return res
    }

    // Protected routes that require authentication
    if (url.startsWith("/rider-dashboard")) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirect", url)
      redirectUrl.searchParams.set("type", "rider")
      return NextResponse.redirect(redirectUrl)
    } else if (url.startsWith("/shop-dashboard")) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirect", url)
      redirectUrl.searchParams.set("type", "shop")
      return NextResponse.redirect(redirectUrl)
    } else if (url.startsWith("/admin-dashboard")) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirect", url)
      redirectUrl.searchParams.set("type", "admin")
      return NextResponse.redirect(redirectUrl)
    }

    // Allow access to public routes
    return res
  }

  // If session exists, check role-based access
  if (session) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Get user role from database
    const { data: userData } = await supabase.from("users").select("role, status").eq("id", user?.id).single()

    const role = userData?.role
    const url = req.nextUrl.pathname

    // Skip role checks for login and signup pages when already authenticated
    if (
      url === "/login" ||
      url === "/rider-login" ||
      url === "/shop-login" ||
      url === "/admin-login" ||
      url === "/signup"
    ) {
      // Redirect to appropriate dashboard if already logged in
      if (role === "rider") {
        return NextResponse.redirect(new URL("/rider-dashboard", req.url))
      } else if (role === "shop_owner" || role === "shop_staff") {
        return NextResponse.redirect(new URL("/shop-dashboard", req.url))
      } else if (role === "admin") {
        return NextResponse.redirect(new URL("/admin-dashboard", req.url))
      }
      return NextResponse.redirect(new URL("/", req.url))
    }

    // Redirect based on role
    if (role === "rider" && (url.startsWith("/shop-dashboard") || url.startsWith("/admin-dashboard"))) {
      return NextResponse.redirect(new URL("/rider-dashboard", req.url))
    }

    if (
      (role === "shop_owner" || role === "shop_staff") &&
      (url.startsWith("/rider-dashboard") || url.startsWith("/admin-dashboard"))
    ) {
      return NextResponse.redirect(new URL("/shop-dashboard", req.url))
    }

    if (role === "admin" && (url.startsWith("/rider-dashboard") || url.startsWith("/shop-dashboard"))) {
      return NextResponse.redirect(new URL("/admin-dashboard", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|signup|forgot-password|reset-password).*)"],
}
