"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/contexts/session-context"

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
