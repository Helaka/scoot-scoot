import { redirect } from "next/navigation"

export default function AdminLoginRedirect({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get the redirectTo value safely
  const redirectPath = typeof searchParams.redirectTo === "string" ? searchParams.redirectTo : "/admin-dashboard"

  // Redirect to the consolidated login page with type=admin
  const loginUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  loginUrl.searchParams.set("redirect", redirectPath)
  loginUrl.searchParams.set("type", "admin")

  redirect(loginUrl.toString())
}
