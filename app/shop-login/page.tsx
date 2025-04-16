import { redirect } from "next/navigation"

export default function ShopLoginRedirect({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get the redirectTo value safely
  const redirectPath = typeof searchParams.redirectTo === "string" ? searchParams.redirectTo : "/shop-dashboard"

  // Redirect to the consolidated login page with type=shop
  const loginUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  loginUrl.searchParams.set("redirect", redirectPath)
  loginUrl.searchParams.set("type", "shop")

  redirect(loginUrl.toString())
}
