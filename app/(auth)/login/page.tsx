import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { Bike } from "lucide-react"

export const metadata: Metadata = {
  title: "Login | ScootScoot",
  description: "Login to your ScootScoot account",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Check if user is already logged in
  const user = await getServerUser()

  // Get the redirect URL safely
  const redirectTo = typeof searchParams.redirect === "string" ? searchParams.redirect : "/rider-dashboard"

  if (user) {
    redirect(redirectTo)
  }

  return (
    <div className="container relative min-h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500 to-orange-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Bike className="mr-2 h-6 w-6" />
          ScootScoot
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "ScootScoot has transformed how we explore the city. Quick, convenient, and eco-friendly!"
            </p>
            <footer className="text-sm">Sofia Chen</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
          </div>
          <LoginForm redirectTo={redirectTo} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/signup" className="hover:text-yellow-500 underline underline-offset-4">
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
