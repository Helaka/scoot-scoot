"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bike, Shield, Star, History, Calendar } from "lucide-react"
import { EmptyState } from "./empty-state"

interface ActivityItem {
  id: number
  type: "rental" | "insurance"
  scooter?: string
  plan?: string
  date: string
  amount: number
}

interface DashboardActivitySectionProps {
  recentActivity?: ActivityItem[]
  isDemo?: boolean
}

export function DashboardActivitySection({ recentActivity = [], isDemo = false }: DashboardActivitySectionProps) {
  const [activeTab, setActiveTab] = useState("activity")

  return (
    <section>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardContent className="p-6">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          {activity.type === "rental" ? (
                            <Bike className="h-4 w-4 text-primary" />
                          ) : (
                            <Shield className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{activity.type === "rental" ? activity.scooter : activity.plan}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${activity.amount.toFixed(2)}</p>
                        <div className="flex items-center text-yellow-500">
                          {activity.type === "rental" && (
                            <>
                              <Star className="h-3 w-3 fill-yellow-500" />
                              <Star className="h-3 w-3 fill-yellow-500" />
                              <Star className="h-3 w-3 fill-yellow-500" />
                              <Star className="h-3 w-3 fill-yellow-500" />
                              <Star className="h-3 w-3" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Recent Activity</h3>
                  <p className="text-sm text-muted-foreground mb-4">You haven't made any rentals or purchases yet.</p>
                  <Button>Find Scooters</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <EmptyState
            icon={Calendar}
            title="No Upcoming Reservations"
            description="You don't have any upcoming scooter reservations. Book a scooter in advance to secure your ride."
            actionLabel="Book a Scooter"
            actionHref="/rider-find-scooters"
            demo={isDemo}
          />
        </TabsContent>
      </Tabs>
    </section>
  )
}
