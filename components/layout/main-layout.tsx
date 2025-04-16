import type { ReactNode } from "react"
import { AppHeader } from "@/components/ui/app-header"
import { AppFooter } from "@/components/ui/app-footer"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  )
}
