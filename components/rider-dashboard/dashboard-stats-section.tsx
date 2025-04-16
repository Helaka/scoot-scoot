"use client"

import { Route, Clock, Zap } from "lucide-react"
import { MetricCard } from "./metric-card"

interface RidingStats {
  distance: {
    value: string
    trend: {
      value: number
      isPositive: boolean
    }
  }
  time: {
    value: string
    trend: {
      value: number
      isPositive: boolean
    }
  }
  co2Saved: {
    value: string
    trend: {
      value: number
      isPositive: boolean
    }
  }
}

interface DashboardStatsSectionProps {
  stats?: RidingStats
}

export function DashboardStatsSection({
  stats = {
    distance: { value: "127 km", trend: { value: 12, isPositive: true } },
    time: { value: "14.5 hours", trend: { value: 8, isPositive: true } },
    co2Saved: { value: "42 kg", trend: { value: 15, isPositive: true } },
  },
}: DashboardStatsSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Your Riding Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard icon={Route} label="Total Distance" value={stats.distance.value} trend={stats.distance.trend} />
        <MetricCard icon={Clock} label="Riding Time" value={stats.time.value} trend={stats.time.trend} />
        <MetricCard icon={Zap} label="CO₂ Saved" value={stats.co2Saved.value} trend={stats.co2Saved.trend} />
      </div>
    </section>
  )
}
