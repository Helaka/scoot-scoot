"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Upload, ChevronRight, ChevronLeft, Check, X, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { Scooter, ScooterFuelType } from "@/types/scooter-types"

interface AddScooterWizardProps {
  onComplete: (scooter: Partial<Scooter>) => void
  onCancel: () => void
}

type ScooterImage = {
  id: string
  url: string
  file?: File
  isPrimary?: boolean
}

const SCOOTER_MODELS = [
  { value: "honda-click", label: "Honda Click 125i", cc: 125, fuelType: "petrol" as ScooterFuelType },
  { value: "yamaha-nmax", label: "Yamaha NMAX", cc: 155, fuelType: "petrol" as ScooterFuelType },
  { value: "honda-pcx", label: "Honda PCX", cc: 150, fuelType: "petrol" as ScooterFuelType },
  { value: "vespa-primavera", label: "Vespa Primavera", cc: 150, fuelType: "petrol" as ScooterFuelType },
  { value: "suzuki-burgman", label: "Suzuki Burgman", cc: 125, fuelType: "petrol" as ScooterFuelType },
  { value: "niu-nqi-gts", label: "NIU NQi GTS", cc: 0, fuelType: "electric" as ScooterFuelType },
  { value: "gogoro-smartscooter", label: "Gogoro Smartscooter", cc: 0, fuelType: "electric" as ScooterFuelType },
  { value: "custom", label: "Other/Custom Model", cc: 0, fuelType: "petrol" as ScooterFuelType },
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
  { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
  { value: "black", label: "Black", class: "bg-black" },
  { value: "white", label: "White", class: "bg-gray-200" },
  { value: "silver", label: "Silver", class: "bg-gray-400" },
  { value: "orange", label: "Orange", class: "bg-orange-500" },
]

export function AddScooterWizard({ onComplete, onCancel }: AddScooterWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<Scooter>>({
    id: `SC-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "available",
    totalRentals: 0,
    lastMaintenance: new Date().toISOString().split("T")[0],
    fuelType: "petrol",
    fuelLevel: 100,
    pricing: {
      customPricing: false,
    },
  })
  const [images, setImages] = useState<ScooterImage[]>([])
  const [isCapturing, setIsCapturing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [customModel, setCustomModel] = useState("")
  const [customEngineSize, setCustomEngineSize] = useState<number | undefined>(undefined)

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    // Prepare final data
    const finalData: Partial<Scooter> = {
      ...formData,
      images: images.map((img) => img.url),
    }

    onComplete(finalData)
    toast({
      title: "Scooter Added Successfully",
      description: `${formData.model} (${formData.id}) has been added to your inventory.`,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "model") {
      const selectedModel = SCOOTER_MODELS.find((model) => model.value === value)
      if (selectedModel && selectedModel.value !== "custom") {
        setFormData((prev) => ({
          ...prev,
          model: selectedModel.label,
          engineSize: selectedModel.cc,
          fuelType: selectedModel.fuelType,
        }))
      } else if (value === "custom") {
        // Handle custom model selection
        setFormData((prev) => ({
          ...prev,
          model: customModel || "Custom Model",
          engineSize: customEngineSize,
        }))
      }
    } else if (name === "fuelType") {
      setFormData((prev) => ({
        ...prev,
        fuelType: value as ScooterFuelType,
        // Reset battery or fuel level based on type
        ...(value === "electric"
          ? { batteryLevel: 100, fuelLevel: undefined }
          : { fuelLevel: 100, batteryLevel: undefined }),
      }))
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

  const handleCustomPricingToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        customPricing: checked,
      },
    }))
  }

  const handlePricingNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        pricingNotes: e.target.value,
      },
    }))
  }

  // Camera handling
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

      setIsCapturing(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions or try uploading images instead.",
        variant: "destructive",
      })
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsCapturing(false)
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newImageId = `img-${Date.now()}`
              const newImageUrl = URL.createObjectURL(blob)
              const newImage: ScooterImage = {
                id: newImageId,
                url: newImageUrl,
                file: new File([blob], `${newImageId}.jpg`, { type: "image/jpeg" }),
                isPrimary: images.length === 0, // First image is primary by default
              }

              setImages((prev) => [...prev, newImage])
            }
          },
          "image/jpeg",
          0.8,
        )
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newImages: ScooterImage[] = []

      Array.from(files).forEach((file) => {
        const newImageId = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        const newImageUrl = URL.createObjectURL(file)
        newImages.push({
          id: newImageId,
          url: newImageUrl,
          file: file,
          isPrimary: images.length === 0 && newImages.length === 0, // First image is primary by default
        })
      })

      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (imageId: string) => {
    const imageToRemove = images.find((img) => img.id === imageId)
    if (imageToRemove && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url)
    }

    const updatedImages = images.filter((img) => img.id !== imageId)

    // If we removed the primary image, set the first remaining image as primary
    if (imageToRemove?.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true
    }

    setImages(updatedImages)
  }

  const setPrimaryImage = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === imageId,
      })),
    )
  }

  // Cleanup function for camera
  const cleanupCamera = useCallback(() => {
    if (isCapturing) {
      stopCamera()
    }

    // Cleanup object URLs
    images.forEach((img) => {
      if (img.url) {
        URL.revokeObjectURL(img.url)
      }
    })
  }, [isCapturing, images])

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <p className="text-muted-foreground">Enter the basic details of your scooter.</p>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id">Scooter ID</Label>
                  <Input
                    id="id"
                    name="id"
                    value={formData.id || ""}
                    onChange={handleInputChange}
                    placeholder="SC-1234"
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
                  />
                </div>
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

              {formData.model === "Custom Model" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customModel">Custom Model Name</Label>
                    <Input
                      id="customModel"
                      value={customModel}
                      onChange={(e) => {
                        setCustomModel(e.target.value)
                        setFormData((prev) => ({ ...prev, model: e.target.value }))
                      }}
                      placeholder="Enter model name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="engineSize">Engine Size (cc)</Label>
                    <Input
                      id="engineSize"
                      type="number"
                      value={customEngineSize || ""}
                      onChange={(e) => {
                        const value = e.target.value ? Number.parseInt(e.target.value) : undefined
                        setCustomEngineSize(value)
                        setFormData((prev) => ({ ...prev, engineSize: value }))
                      }}
                      placeholder="125"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("fuelType", value)}
                    defaultValue={formData.fuelType || "petrol"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
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
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Photos</h2>
            <p className="text-muted-foreground">Take photos or upload images of your scooter.</p>

            <div className="grid gap-4">
              <Tabs defaultValue="camera" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="camera">Take Photo</TabsTrigger>
                  <TabsTrigger value="upload">Upload Images</TabsTrigger>
                </TabsList>
                <TabsContent value="camera" className="space-y-4">
                  <div className="relative">
                    {isCapturing ? (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-64 object-cover rounded-md bg-black"
                        />
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={captureImage}
                            className="bg-white/80 backdrop-blur-sm"
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Capture
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={stopCamera}
                            className="bg-white/80 backdrop-blur-sm"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Close Camera
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-md border-gray-300 p-4">
                        <Camera className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-4">Take photos directly with your camera</p>
                        <Button onClick={startCamera}>
                          <Camera className="mr-2 h-4 w-4" />
                          Open Camera
                        </Button>
                      </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                </TabsContent>
                <TabsContent value="upload" className="space-y-4">
                  <div
                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-md border-gray-300 p-4 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">Click to upload or drag and drop</p>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Images
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {images.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Images</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt="Scooter"
                          className={cn(
                            "h-24 w-full object-cover rounded-md",
                            image.isPrimary && "ring-2 ring-yellow-500",
                          )}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center space-x-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-white"
                            onClick={() => setPrimaryImage(image.id)}
                            disabled={image.isPrimary}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-white"
                            onClick={() => removeImage(image.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {image.isPrimary && (
                          <Badge className="absolute top-1 left-1 bg-yellow-500 text-[10px]">Primary</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Pricing</h2>
            <p className="text-muted-foreground">Set up pricing for this scooter.</p>

            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="customPricing" className="cursor-pointer">
                  Custom Pricing
                </Label>
                <Switch
                  id="customPricing"
                  checked={formData.pricing?.customPricing || false}
                  onCheckedChange={handleCustomPricingToggle}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weekendRate">Weekend Rate ($)</Label>
                  <Input
                    id="weekendRate"
                    name="weekendRate"
                    type="number"
                    step="0.01"
                    value={formData.pricing?.weekendRate || ""}
                    onChange={handlePricingChange}
                    placeholder="34.99"
                  />
                </div>
                <div>
                  <Label htmlFor="weeklyRate">Weekly Rate ($)</Label>
                  <Input
                    id="weeklyRate"
                    name="weeklyRate"
                    type="number"
                    step="0.01"
                    value={formData.pricing?.weeklyRate || ""}
                    onChange={handlePricingChange}
                    placeholder="149.99"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pricingNotes">Pricing Notes</Label>
                <Textarea
                  id="pricingNotes"
                  value={formData.pricing?.pricingNotes || ""}
                  onChange={handlePricingNotesChange}
                  placeholder="Any special pricing conditions or notes"
                  rows={3}
                />
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Additional Details</h2>
            <p className="text-muted-foreground">Add any additional information about your scooter.</p>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="mileage">Current Mileage (km)</Label>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  value={formData.mileage || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="nextMaintenanceDue">Next Maintenance Due</Label>
                <Input
                  id="nextMaintenanceDue"
                  name="nextMaintenanceDue"
                  type="date"
                  value={formData.nextMaintenanceDue || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                  placeholder="Any additional notes about this scooter"
                  rows={4}
                />
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Add New Scooter</h1>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Step {step} of {totalSteps}
          </span>
          <span>
            {step === 1 ? "Basic Info" : step === 2 ? "Photos" : step === 3 ? "Pricing" : "Additional Details"}
          </span>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={step === 1 ? onCancel : handleBack}>
          {step === 1 ? (
            "Cancel"
          ) : (
            <>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          )}
        </Button>

        <Button onClick={handleNext}>
          {step === totalSteps ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Scooter
            </>
          ) : (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
