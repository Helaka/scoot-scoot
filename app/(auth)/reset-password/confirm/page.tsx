import type { Metadata } from "next"
import Link from "next/link"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password | ScootScoot",
  description: "Reset your ScootScoot password",
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side with gradient background - only visible on md and larger screens */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-b from-yellow-400 to-yellow-600 p-10 text-white md:flex">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>ScootScoot</span>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Reset Your Password</h1>
          <p className="text-lg">Create a new secure password for your ScootScoot account.</p>
          <div className="space-y-4">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <p className="italic text-white">
                "ScootScoot has made renting scooters so easy and convenient. The password reset process is quick and
                secure!"
              </p>
              <p className="mt-2 font-semibold">— Happy Customer</p>
            </div>
          </div>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} ScootScoot. All rights reserved.</p>
      </div>

      {/* Right side with form */}
      <div className="flex w-full flex-col justify-center p-4 md:w-1/2 md:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Reset Password</h2>
            <p className="text-muted-foreground">Enter your new password below</p>
          </div>
          <ResetPasswordForm />
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="underline underline-offset-4 hover:text-yellow-500">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
