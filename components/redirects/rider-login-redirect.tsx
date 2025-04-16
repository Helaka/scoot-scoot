"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface RiderLoginRedirectProps {
  redirectPath: string
}

export default function RiderLoginRedirect({ redirectPath }: RiderLoginRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    // Create the query string for the redirect
    const queryParams = new URLSearchParams()
    queryParams.set("redirect", redirectPath)
    queryParams.set("type", "rider")

    // Navigate to the login page with the appropriate parameters
    router.push(`/login?${queryParams.toString()}`)
  }, [router, redirectPath])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Redirecting...</h1>
        <p className="text-muted-foreground">Please wait while we redirect you to the login page.</p>
      </div>
    </div>
  )
}
