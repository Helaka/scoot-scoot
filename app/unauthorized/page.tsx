import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export const metadata: Metadata = {
  title: "Unauthorized | ScootScoot",
  description: "You do not have permission to access this page",
}

export default function UnauthorizedPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-4 text-center">
          <ShieldAlert className="h-16 w-16 text-red-500" />
          <h1 className="text-2xl font-semibold tracking-tight">Access Denied</h1>
          <p className="text-muted-foreground">You do not have permission to access this page</p>
        </div>
        <div className="flex justify-center">
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
