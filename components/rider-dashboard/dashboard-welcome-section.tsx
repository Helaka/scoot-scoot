"use client"

import { Link } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickActionButton } from "./quick-action-button"
import { Map, FileCheck, Shield, Calendar } from "lucide-react"

interface DashboardWelcomeSectionProps {
  userName: string
  isDemo?: boolean
}

export function DashboardWelcomeSection({ userName, isDemo = false }: DashboardWelcomeSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Welcome back, {userName}</h2>
        <Link href={`/rider-profile${isDemo ? "?demo=true" : ""}`}>
          <Button variant="outline">View Profile</Button>
        </Link>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <QuickActionButton
              icon={Map}
              label="Find Scooters"
              description="Near you"
              href="/rider-find-scooters"
              variant="default"
              demo={isDemo}
            />
            <QuickActionButton
              icon={FileCheck}
              label="Get Permit"
              description="Digital Ride Permit"
              href="/rider-drp/application"
              demo={isDemo}
            />
            <QuickActionButton
              icon={Shield}
              label="Insurance"
              description="Protection plans"
              href="/rider-insurance"
              demo={isDemo}
            />
            <QuickActionButton
              icon={Calendar}
              label="My Rentals"
              description="View history"
              href="/rider-rentals"
              demo={isDemo}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
