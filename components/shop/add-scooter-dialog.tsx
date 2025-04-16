"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import type { Scooter } from "@/types/scooter-types"

interface AddScooterDialogProps {
  onComplete: (scooter: Partial<Scooter>) => void
  onCancel: () => void
}

const SCOOTER_MODELS = [
  { value: "honda-click", label: "Honda Click 125i", cc: 125, fuelType: "petrol" },
  { value: "yamaha-nmax", label: "Yamaha NMAX", cc: 155, fuelType: "petrol" },
  { value: "honda-pcx", label: "Honda PCX", cc: 150, fuelType: "petrol" },
  { value: "vespa-primavera", label: "Vespa Primavera", cc: 150, fuelType: "petrol" },
  { value: "suzuki-burgman", label: "Suzuki Burgman", cc: 125, fuelType: "petrol" },
  { value: "niu-nqi-gts", label: "NIU NQi GTS", cc: 0, fuelType: "electric" },
  { value: "custom", label: "Other/Custom Model", cc: 0, fuelType: "petrol" },
]

const LOCATIONS = [
  { value: "main", label: "Main Store" },
  { value: "downtown", label: "Downtown" },
  { value: "beach", label: "Beach Front" },
  { value: "city", label: "City Center" },
]

const COLORS = [
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "black", label: "Black", class: "bg-black" },
  { value: "white", label: "White", class: "bg-gray-200" },
  { value: "silver", label: "Silver", class: "bg-gray-400" },
]

export function AddScooterDialog({ onComplete, onCancel }: AddScooterDialogProps) {
  const [formData, setFormData] = useState<Partial<Scooter>>({
    id: `SC-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "available",
    totalRentals: 0,
    lastMaintenance: new Date().toISOString().split("T")[0],
    fuelType: "petrol",
    fuelLevel: 100,
    location: "main",
    color: "red",
    pricing: {
      hourlyRate: 9.99,
      dailyRate: 29.99,
      weeklyRate: 149.99,
    },
  })
  const [images, setImages] = useState<string[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "model") {
      const selectedModel = SCOOTER_MODELS.find((model) => model.value === value)
      if (selectedModel) {
        setFormData((prev) => ({
          ...prev,
          model: selectedModel.label,
          engineSize: selectedModel.cc,
          fuelType: selectedModel.fuelType,
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [name]: Number.parseFloat(value),
      },
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setImageFile(file)

      // Create a preview URL
      const imageUrl = URL.createObjectURL(file)
      setImages([imageUrl])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would upload the image file to a server
    // and get back a permanent URL
    const finalData: Partial<Scooter> = {
      ...formData,
      image: images[0] || "/placeholder.svg?height=150&width=200",
    }

    onComplete(finalData)
    toast({
      title: "Scooter Added Successfully",
      description: `${formData.model} (${formData.id}) has been added to your inventory.`,
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add New Scooter</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="id">Scooter ID</Label>
            <Input
              id="id"
              name="id"
              value={formData.id || ""}
              onChange={handleInputChange}
              placeholder="SC-1234"
              required
            />
          </div>
          <div>
            <Label htmlFor="licensePlate">License Plate</Label>
            <Input
              id="licensePlate"
              name="licensePlate"
              value={formData.licensePlate || ""}
              onChange={handleInputChange}
              placeholder="ABC-123"
              required
            />
          </div>

          <div>
            <Label htmlFor="model">Model</Label>
            <Select onValueChange={(value) => handleSelectChange("model", value)} defaultValue="honda-click">
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {SCOOTER_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label} {model.cc > 0 && `(${model.cc}cc)`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Select onValueChange={(value) => handleSelectChange("color", value)} defaultValue="red">
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${color.class}`} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Select onValueChange={(value) => handleSelectChange("location", value)} defaultValue="main">
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="yearManufactured">Year Manufactured</Label>
            <Input
              id="yearManufactured"
              name="yearManufactured"
              type="number"
              value={formData.yearManufactured || ""}
              onChange={handleInputChange}
              placeholder={new Date().getFullYear().toString()}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Scooter Photo</Label>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="camera">Take Photo</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="space-y-4">
              <div
                className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-md border-gray-300 p-4 cursor-pointer"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {images.length > 0 ? (
                  <div className="relative w-full h-full">
                    <img
                      src={images[0] || "/placeholder.svg"}
                      alt="Scooter preview"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setImages([])
                        setImageFile(null)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">Click to upload or drag and drop</p>
                    <Button variant="outline" type="button">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </>
                )}
                <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </div>
            </TabsContent>
            <TabsContent value="camera" className="space-y-4">
              <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-md border-gray-300 p-4">
                <Camera className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-4">Take a photo of your scooter</p>
                <Button type="button">
                  <Camera className="mr-2 h-4 w-4" />
                  Open Camera
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label>Pricing</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                step="0.01"
                value={formData.pricing?.hourlyRate || ""}
                onChange={handlePricingChange}
                placeholder="9.99"
                required
              />
            </div>
            <div>
              <Label htmlFor="dailyRate">Daily Rate ($)</Label>
              <Input
                id="dailyRate"
                name="dailyRate"
                type="number"
                step="0.01"
                value={formData.pricing?.dailyRate || ""}
                onChange={handlePricingChange}
                placeholder="29.99"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" />
            Add Scooter
          </Button>
        </div>
      </form>
    </div>
  )
}
