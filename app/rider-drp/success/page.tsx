"use client"

import { useSearchParams } from "next/navigation"
import DRPSuccess from "@/components/drp/drp-success"

export default function DRPSuccessPage() {
  const searchParams = useSearchParams()
  const permitId = searchParams?.get("permitId") || "unknown"

  return (
    <div className="container mx-auto py-8">
      <DRPSuccess permitId={permitId} />
    </div>
  )
}
