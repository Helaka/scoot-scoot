"use client"

import { AnimatePresence } from "framer-motion"
import { ClientProvider } from "@/components/client-provider"
import { ShopDashboard } from "@/components/shop-dashboard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export const dynamic = "force-static"

export default function ShopDashboardPage() {
  return (
    <AnimatePresence mode="wait">
      <ClientProvider fallback={<LoadingSpinner />}>
        <ShopDashboard />
      </ClientProvider>
    </AnimatePresence>
  )
}
