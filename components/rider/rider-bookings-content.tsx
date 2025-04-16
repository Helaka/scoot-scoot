"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, CreditCard } from "lucide-react"

export function RiderBookingsContent() {
  // Set default tab to "reservations" to make it visible in demo
  const [activeTab, setActiveTab] = useState("reservations")

  return (
    <div>
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <p className="text-muted-foreground">Manage your current and past scooter rentals.</p>

      <div className="mt-6 rounded-lg border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">Looking for another scooter?</h3>
            <p className="text-sm text-muted-foreground">Browse available scooters near you and book your next ride.</p>
          </div>
          <Button asChild>
            <Link href="/rider-discover">Find Scooters</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex space-x-1 rounded-lg bg-muted p-1">
          <button
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium ${
              activeTab === "active" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active Bookings
          </button>
          <button
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium ${
              activeTab === "past" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past Bookings
          </button>
          <button
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium ${
              activeTab === "reservations" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("reservations")}
          >
            Reservations
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "active" && <ActiveBookings />}
          {activeTab === "past" && <PastBookings />}
          {activeTab === "reservations" && <ReservationBookings />}
        </div>
      </div>
    </div>
  )
}

function ActiveBookings() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border">
        <div className="relative">
          <img src="/placeholder.svg?height=200&width=500" alt="Honda PCX 150cc" className="h-48 w-full object-cover" />
          <div className="absolute right-2 top-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold">Active</div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold">Honda PCX 150cc</h3>
          <p className="text-muted-foreground">Jungle Scooters Pai</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Start Date</div>
                <div>March 25, 2025</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">End Date</div>
                <div>March 27, 2025</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-1 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Remaining</div>
                <div>48 hours</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CreditCard className="mt-1 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Total Price</div>
                <div>$45</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex border-t bg-muted/50 p-4">
          <Button variant="outline" className="mr-auto">
            View Details
          </Button>
          <Button>Extend Rental</Button>
        </div>
      </div>
    </div>
  )
}

function PastBookings() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border">
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-bold">Honda Click 125i</h3>
              <p className="text-sm text-muted-foreground">Vintage Scooter Co.</p>
            </div>
            <div className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-500">Completed</div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div>March 15, 2025</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">End Date</div>
              <div>March 17, 2025</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Location</div>
              <div>Phuket, Thailand</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Price</div>
              <div>$99.98</div>
            </div>
          </div>
        </div>
        <div className="flex border-t bg-muted/50 p-4">
          <Button variant="outline" size="sm" className="mr-auto">
            View Receipt
          </Button>
          <Button size="sm">Book Again</Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-bold">Vespa Primavera 125cc</h3>
              <p className="text-sm text-muted-foreground">Jungle Scooters Pai</p>
            </div>
            <div className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500">Cancelled</div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div>March 10, 2025</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">End Date</div>
              <div>March 12, 2025</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Location</div>
              <div>Pai, Thailand</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Price</div>
              <div>$129.99</div>
            </div>
          </div>
        </div>
        <div className="flex border-t bg-muted/50 p-4">
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

function ReservationBookings() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Honda PCX 150cc</h3>
              <p className="text-sm text-muted-foreground">Jungle Scooters Pai</p>
            </div>
            <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500">Reserved</div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div className="font-medium">April 15, 2025</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">End Date</div>
              <div className="font-medium">April 17, 2025</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Pickup Time</div>
              <div className="font-medium">10:00 AM</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Price</div>
              <div className="font-medium">$89.99</div>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-muted p-4">
            <div className="text-sm font-medium">Cancellation Policy</div>
            <p className="text-sm text-muted-foreground">
              Free cancellation until 24 hours before pickup (April 14, 2025, 10:00 AM)
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t bg-muted/50 p-4">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Modify
            </Button>
            <Button variant="destructive" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Vespa Primavera</h3>
              <p className="text-sm text-muted-foreground">Barcelona Beach Shop</p>
            </div>
            <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500">Reserved</div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div className="font-medium">May 20, 2025</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">End Date</div>
              <div className="font-medium">May 21, 2025</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Pickup Time</div>
              <div className="font-medium">9:00 AM</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Price</div>
              <div className="font-medium">$45.50</div>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-muted p-4">
            <div className="text-sm font-medium">Cancellation Policy</div>
            <p className="text-sm text-muted-foreground">
              50% refund for cancellations made 48 hours before pickup (May 18, 2025, 9:00 AM)
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t bg-muted/50 p-4">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Modify
            </Button>
            <Button variant="destructive" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
