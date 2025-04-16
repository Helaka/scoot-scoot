"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bike,
  User,
  Calendar,
  Camera,
  FileText,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Clock,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScooterPhotoDocumentation } from "./scooter-photo-documentation"
import { RentalStatusBadge } from "./rental-status-badge"
import { toast } from "@/components/ui/use-toast"
import type { Scooter } from "@/types/scooter-types"
import { PassportScanner } from "./passport-scanner"
import { DigitalSignature } from "./digital-signature"

interface BookingWizardProps {
  scooters: Scooter[]
  onComplete: () => void
  onCancel: () => void
}

type Step = "scooter" | "passport" | "customer" | "duration" | "photos" | "agreement" | "confirm"

export function BookingWizard({ scooters, onComplete, onCancel }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>("scooter")
  const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [duration, setDuration] = useState("daily")
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0])
  const [returnTime, setReturnTime] = useState("18:00")
  const [photos, setPhotos] = useState<Record<string, string>>({})
  const [agreementAccepted, setAgreementAccepted] = useState(false)
  const [customerPassportData, setCustomerPassportData] = useState<any>(null)
  const [customerSignature, setCustomerSignature] = useState<string>("")
  const [staffSignature, setStaffSignature] = useState<string>("")

  const availableScooters = scooters.filter((s) => s.status === "available")

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: "scooter", label: "Select Scooter", icon: Bike },
    { id: "passport", label: "Verify ID", icon: User },
    { id: "customer", label: "Customer Info", icon: User },
    { id: "duration", label: "Rental Time", icon: Clock },
    { id: "photos", label: "Take Photos", icon: Camera },
    { id: "agreement", label: "Agreement", icon: FileText },
    { id: "confirm", label: "Confirm", icon: CheckCircle },
  ]

  const goToNextStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
    }
  }

  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  const handleComplete = () => {
    // In a real app, this would save the booking to the database
    toast({
      title: "Booking Complete",
      description: `Scooter ${selectedScooter?.id} has been rented to ${customerName}`,
    })
    onComplete()
  }

  const isStepComplete = (step: Step): boolean => {
    switch (step) {
      case "scooter":
        return !!selectedScooter
      case "passport":
        return !!customerPassportData
      case "customer":
        return !!customerName && !!customerPhone
      case "duration":
        return !!returnDate && !!returnTime
      case "photos":
        return Object.keys(photos).length >= 4 // Require at least 4 photos
      case "agreement":
        return agreementAccepted && !!customerSignature && !!staffSignature
      case "confirm":
        return true
      default:
        return false
    }
  }

  const canProceed = isStepComplete(currentStep)

  const renderStepContent = () => {
    switch (currentStep) {
      case "scooter":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">Choose a Scooter</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {availableScooters.map((scooter) => (
                <motion.div
                  key={scooter.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedScooter(scooter)}
                  className={`cursor-pointer rounded-lg border-2 p-4 ${
                    selectedScooter?.id === scooter.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="aspect-video relative mb-3 bg-muted rounded-md overflow-hidden">
                    <img
                      src={scooter.image || "/placeholder.svg?height=150&width=200"}
                      alt={scooter.model}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2">
                      <RentalStatusBadge status="available" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{scooter.id}</p>
                    <p className="text-sm text-muted-foreground">{scooter.model}</p>
                    <div className="mt-2 flex justify-center items-center">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{scooter.pricing?.dailyRate || "--"}/day</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "passport":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-center">Scan Customer ID</h3>
            <p className="text-sm text-center text-muted-foreground">
              Scan the customer's passport or ID to verify identity and auto-fill information
            </p>

            <PassportScanner
              onScanComplete={(data) => {
                setCustomerPassportData(data)

                // Auto-fill customer information
                setCustomerName(data.name)
                setCustomerPhone(data.customerDetails?.phone || "")

                // If blacklisted, show warning but allow to continue
                if (data.isBlacklisted) {
                  // Warning is shown by the PassportScanner component
                }

                // Automatically go to next step if data is complete
                if (data.name) {
                  setTimeout(() => goToNextStep(), 1500)
                }
              }}
            />

            {customerPassportData && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">ID Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{customerPassportData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nationality:</span>
                    <span className="font-medium">{customerPassportData.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Number:</span>
                    <span className="font-medium">{customerPassportData.passportNumber}</span>
                  </div>
                  {customerPassportData.existingCustomer && (
                    <div className="mt-2 pt-2 border-t">
                      <div className="text-green-600 font-medium flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Existing Customer
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Previous rentals: {customerPassportData.customerDetails?.previousRentals || 0}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )

      case "customer":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-center">Customer Information</h3>

            {customerPassportData && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm mb-4">
                <p className="font-medium">Information auto-filled from ID</p>
                <p className="text-muted-foreground">You can edit if needed</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter customer name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {selectedScooter && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Selected Scooter</h4>
                <div className="flex items-center">
                  <img
                    src={selectedScooter.image || "/placeholder.svg?height=50&width=70"}
                    alt={selectedScooter.model}
                    className="w-16 h-12 object-cover rounded-md mr-3"
                  />
                  <div>
                    <p className="font-medium">{selectedScooter.id}</p>
                    <p className="text-sm text-muted-foreground">{selectedScooter.model}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case "duration":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-center">Rental Duration</h3>

            <div className="flex justify-center space-x-4 mb-6">
              <Button
                variant={duration === "hourly" ? "default" : "outline"}
                onClick={() => setDuration("hourly")}
                className="flex-1"
              >
                <Clock className="mr-2 h-4 w-4" />
                Hourly
              </Button>
              <Button
                variant={duration === "daily" ? "default" : "outline"}
                onClick={() => setDuration("daily")}
                className="flex-1"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Daily
              </Button>
              <Button
                variant={duration === "weekly" ? "default" : "outline"}
                onClick={() => setDuration("weekly")}
                className="flex-1"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Weekly
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Return Time</label>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {selectedScooter && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium mb-2">Rental Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Scooter:</span>
                    <span className="font-medium">
                      {selectedScooter.id} ({selectedScooter.model})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span className="font-medium">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span className="font-medium">
                      $
                      {duration === "hourly"
                        ? selectedScooter.pricing?.hourlyRate
                        : duration === "daily"
                          ? selectedScooter.pricing?.dailyRate
                          : selectedScooter.pricing?.weeklyRate}
                      /{duration === "hourly" ? "hour" : duration === "daily" ? "day" : "week"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case "photos":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">Document Scooter Condition</h3>
            <p className="text-sm text-center text-muted-foreground">
              Take photos of the scooter from different angles
            </p>

            <ScooterPhotoDocumentation scooterId={selectedScooter?.id || ""} onPhotosUpdated={setPhotos} />
          </div>
        )

      case "agreement":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">Rental Agreement</h3>

            <div className="border rounded-lg p-4 max-h-[30vh] overflow-y-auto">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h4>SCOOTER RENTAL AGREEMENT</h4>
                <p>This agreement is made between ScootScoot Rentals and {customerName}.</p>

                <h5>SCOOTER DETAILS</h5>
                <ul>
                  <li>Scooter ID: {selectedScooter?.id}</li>
                  <li>Model: {selectedScooter?.model}</li>
                  <li>License Plate: {selectedScooter?.licensePlate}</li>
                </ul>

                <h5>RENTAL PERIOD</h5>
                <p>
                  From: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                </p>
                <p>
                  To: {new Date(returnDate).toLocaleDateString()} {returnTime}
                </p>

                <h5>TERMS AND CONDITIONS</h5>
                <ol>
                  <li>The renter must return the scooter in the same condition as received.</li>
                  <li>The renter is responsible for any damage to the scooter.</li>
                  <li>The scooter must be returned with the same fuel level as received.</li>
                  <li>Late returns will incur additional charges.</li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Customer Signature</h4>
                <DigitalSignature onSignatureCapture={setCustomerSignature} />
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Staff Signature</h4>
                <DigitalSignature onSignatureCapture={setStaffSignature} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreement-checkbox"
                checked={agreementAccepted}
                onChange={(e) => setAgreementAccepted(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="agreement-checkbox" className="text-sm">
                I confirm that the customer has read and agreed to the terms
              </label>
            </div>
          </div>
        )

      case "confirm":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-center">Confirm Booking</h3>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>

              <h4 className="font-medium text-center mb-4">Booking Summary</h4>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scooter:</span>
                  <span className="font-medium">
                    {selectedScooter?.id} ({selectedScooter?.model})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID Verified:</span>
                  <span className="font-medium text-green-500">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return by:</span>
                  <span className="font-medium">
                    {new Date(returnDate).toLocaleDateString()} at {returnTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-medium">
                    $
                    {duration === "hourly"
                      ? selectedScooter?.pricing?.hourlyRate
                      : duration === "daily"
                        ? selectedScooter?.pricing?.dailyRate
                        : selectedScooter?.pricing?.weeklyRate}
                    /{duration === "hourly" ? "hour" : duration === "daily" ? "day" : "week"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Photos taken:</span>
                  <span className="font-medium">{Object.keys(photos).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Agreement:</span>
                  <span className="font-medium text-green-500">Signed</span>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Please hand over the keys to the customer after confirming this booking.
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : isStepComplete(step.id)
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-muted text-muted-foreground"
                  }
                `}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-center hidden sm:block">{step.label}</span>
              {index < steps.length - 1 && <div className="absolute left-0 right-0 h-0.5 bg-muted top-5 -z-10"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={currentStep === "scooter" ? onCancel : goToPreviousStep}>
          {currentStep === "scooter" ? (
            "Cancel"
          ) : (
            <>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          )}
        </Button>

        <Button onClick={currentStep === "confirm" ? handleComplete : goToNextStep} disabled={!canProceed}>
          {currentStep === "confirm" ? (
            "Complete Booking"
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
