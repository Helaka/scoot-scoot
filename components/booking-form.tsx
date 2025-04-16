"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBooking, type BookingData } from "@/actions/booking-actions"
import type { Scooter } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

interface BookingFormProps {
  scooter: Scooter
  userId: string
  insuranceOptions?: Array<{
    id: string
    name: string
    price: number
    description: string
  }>
}

export function BookingForm({ scooter, userId, insuranceOptions = [] }: BookingFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 1)))
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null)

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const calculateTotal = () => {
    const days = calculateTotalDays()
    let total = days * (scooter.daily_rate || 0)

    // Add insurance if selected
    if (selectedInsurance) {
      const insurance = insuranceOptions.find((i) => i.id === selectedInsurance)
      if (insurance) {
        total += insurance.price * days
      }
    }

    return total
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select start and end dates",
        variant: "destructive",
      })
      return
    }

    if (startDate >= endDate) {
      toast({
        title: "Error",
        description: "End date must be after start date",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const bookingData: BookingData = {
      rider_id: userId,
      scooter_id: scooter.id,
      shop_id: scooter.shop_id,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      total_amount: calculateTotal(),
    }

    if (selectedInsurance) {
      const insurance = insuranceOptions.find((i) => i.id === selectedInsurance)
      if (insurance) {
        bookingData.insurance_id = insurance.id
        bookingData.insurance_price = insurance.price
      }
    }

    try {
      const result = await createBooking(bookingData)

      if (result.success) {
        toast({
          title: "Booking created",
          description: "Your booking has been created successfully",
        })
        router.push(`/bookings/${result.bookingId}`)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create booking",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book {scooter.name || "Scooter"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <DatePicker id="start-date" selected={startDate} onSelect={setStartDate} minDate={new Date()} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <DatePicker
                id="end-date"
                selected={endDate}
                onSelect={setEndDate}
                minDate={startDate ? new Date(startDate.getTime() + 86400000) : new Date()}
              />
            </div>
          </div>

          {insuranceOptions.length > 0 && (
            <div className="space-y-2">
              <Label>Insurance Options</Label>
              <div className="space-y-2">
                {insuranceOptions.map((insurance) => (
                  <div key={insurance.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`insurance-${insurance.id}`}
                      checked={selectedInsurance === insurance.id}
                      onCheckedChange={(checked) => {
                        setSelectedInsurance(checked ? insurance.id : null)
                      }}
                    />
                    <Label htmlFor={`insurance-${insurance.id}`} className="flex-1">
                      <div className="flex justify-between">
                        <span>{insurance.name}</span>
                        <span>${insurance.price.toFixed(2)}/day</span>
                      </div>
                      <p className="text-sm text-gray-500">{insurance.description}</p>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Booking Summary</Label>
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex justify-between">
                <span>Daily Rate:</span>
                <span>${scooter.daily_rate?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Days:</span>
                <span>{calculateTotalDays()}</span>
              </div>
              {selectedInsurance && (
                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span>
                    ${(insuranceOptions.find((i) => i.id === selectedInsurance)?.price || 0).toFixed(2)} ×{" "}
                    {calculateTotalDays()} days
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
