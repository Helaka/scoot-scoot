"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin, MoreHorizontal, Share2 } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

// Mock data for reservations
const reservations = [
  {
    id: "res-001",
    scooterName: "Vespa Primavera",
    scooterImage: "/placeholder.svg?height=100&width=150",
    startDate: "2025-04-15T10:00:00",
    endDate: "2025-04-17T18:00:00",
    location: "Barcelona Beach Shop",
    address: "Passeig Marítim, 08003 Barcelona",
    price: 89.99,
    currency: "EUR",
    cancellationPolicy: "Free cancellation until 24 hours before pickup",
    cancellationDeadline: "2025-04-14T10:00:00",
  },
  {
    id: "res-002",
    scooterName: "Honda PCX",
    scooterImage: "/placeholder.svg?height=100&width=150",
    startDate: "2025-05-20T09:00:00",
    endDate: "2025-05-21T17:00:00",
    location: "Madrid Central Rentals",
    address: "Gran Vía 42, 28013 Madrid",
    price: 45.5,
    currency: "EUR",
    cancellationPolicy: "50% refund for cancellations made 48 hours before pickup",
    cancellationDeadline: "2025-05-18T09:00:00",
  },
]

export function ReservationBookings() {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCancelReservation = (id: string) => {
    setSelectedReservation(id)
    setCancelDialogOpen(true)
  }

  const confirmCancelReservation = () => {
    // In a real app, this would call an API to cancel the reservation
    console.log(`Cancelling reservation ${selectedReservation}`)
    setCancelDialogOpen(false)
  }

  const addToCalendar = (reservation: any) => {
    // In a real app, this would generate a calendar event
    console.log(`Adding reservation ${reservation.id} to calendar`)
    alert("Calendar event created! Check your calendar app.")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Upcoming Reservations</h2>

      {reservations.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="font-medium">No upcoming reservations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            When you book a scooter for future dates, it will appear here.
          </p>
          <Button className="mt-4" variant="outline">
            Find Scooters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2">Upcoming</Badge>
                    <CardTitle className="text-lg">{reservation.scooterName}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => addToCalendar(reservation)}>Add to Calendar</DropdownMenuItem>
                      <DropdownMenuItem>Modify Dates</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCancelReservation(reservation.id)}>
                        Cancel Reservation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                  <div>
                    <Image
                      src={reservation.scooterImage || "/placeholder.svg"}
                      alt={reservation.scooterName}
                      width={150}
                      height={100}
                      className="rounded-md object-cover w-full h-auto"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pickup: {formatTime(reservation.startDate)} • Return: {formatTime(reservation.endDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{reservation.location}</p>
                        <p className="text-sm text-muted-foreground">{reservation.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Cancellation Policy:</span> {reservation.cancellationPolicy}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Deadline: {formatDate(reservation.cancellationDeadline)} at{" "}
                          {formatTime(reservation.cancellationDeadline)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/30 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="font-bold">
                    {reservation.price.toFixed(2)} {reservation.currency}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => addToCalendar(reservation)}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Add to Calendar
                  </Button>
                  <Button variant="default" size="sm">
                    Modify
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Reservation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this reservation? Please review the cancellation policy before proceeding.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium text-destructive">Cancellation Policy:</p>
            <p className="text-sm mt-1">{reservations.find((r) => r.id === selectedReservation)?.cancellationPolicy}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Reservation
            </Button>
            <Button variant="destructive" onClick={confirmCancelReservation}>
              Cancel Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
