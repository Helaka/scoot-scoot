"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveBookings } from "./active-bookings"
import { PastBookings } from "./past-bookings"
import { ReservationBookings } from "./reservation-bookings"

export function RiderBookings() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">View and manage your scooter bookings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <ActiveBookings />
        </TabsContent>
        <TabsContent value="reservations" className="space-y-4">
          <ReservationBookings />
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <PastBookings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
