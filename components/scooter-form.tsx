"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createScooter, updateScooter } from "@/actions/scooter-actions"
import type { Scooter } from "@/types/database"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface ScooterFormProps {
  initialData?: Partial<Scooter>
  shopId: string
  isEditing?: boolean
}

export function ScooterForm({ initialData, shopId, isEditing = false }: ScooterFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Partial<Scooter>>({
    shop_id: shopId,
    name: initialData?.name || "",
    model: initialData?.model || "",
    description: initialData?.description || "",
    year: initialData?.year || undefined,
    license_plate: initialData?.license_plate || "",
    status: initialData?.status || "available",
    hourly_rate: initialData?.hourly_rate || undefined,
    daily_rate: initialData?.daily_rate || undefined,
    weekly_rate: initialData?.weekly_rate || undefined,
    ...initialData,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle numeric fields
    if (["hourly_rate", "daily_rate", "weekly_rate", "year"].includes(name)) {
      setFormData({
        ...formData,
        [name]: value === "" ? undefined : Number(value),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEditing && initialData?.id) {
        // Update existing scooter
        const result = await updateScooter(initialData.id, formData)

        if (result.success) {
          toast({
            title: "Scooter updated",
            description: "The scooter has been updated successfully.",
          })
          router.push("/scooters")
          router.refresh()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update scooter",
            variant: "destructive",
          })
        }
      } else {
        // Create new scooter
        const result = await createScooter(formData)

        if (result.success) {
          toast({
            title: "Scooter created",
            description: "The scooter has been created successfully.",
          })
          router.push("/scooters")
          router.refresh()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create scooter",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error)
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
        <CardTitle>{isEditing ? "Edit Scooter" : "Add New Scooter"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update the details of your scooter" : "Fill in the details to add a new scooter to your fleet"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Scooter Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="e.g., Yamaha NMAX 155cc"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={formData.model || ""}
                onChange={handleChange}
                placeholder="e.g., NMAX 155"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Describe the scooter"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year || ""}
                onChange={handleChange}
                placeholder="e.g., 2023"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license_plate">License Plate</Label>
              <Input
                id="license_plate"
                name="license_plate"
                value={formData.license_plate || ""}
                onChange={handleChange}
                placeholder="e.g., ABC123"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status || "available"}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
              <Input
                id="hourly_rate"
                name="hourly_rate"
                type="number"
                step="0.01"
                value={formData.hourly_rate || ""}
                onChange={handleChange}
                placeholder="e.g., 10.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daily_rate">Daily Rate ($)</Label>
              <Input
                id="daily_rate"
                name="daily_rate"
                type="number"
                step="0.01"
                value={formData.daily_rate || ""}
                onChange={handleChange}
                placeholder="e.g., 50.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weekly_rate">Weekly Rate ($)</Label>
              <Input
                id="weekly_rate"
                name="weekly_rate"
                type="number"
                step="0.01"
                value={formData.weekly_rate || ""}
                onChange={handleChange}
                placeholder="e.g., 250.00"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Scooter" : "Add Scooter"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
