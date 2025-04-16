"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface PassportScannerProps {
  onScanComplete: (customerData: {
    name: string
    nationality: string
    passportNumber: string
    dateOfBirth: string
    expiryDate: string
    isBlacklisted: boolean
    existingCustomer: boolean
    customerDetails?: any
  }) => void
}

export function PassportScanner({ onScanComplete }: PassportScannerProps) {
  const [scanning, setScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [uploadMode, setUploadMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startScanning = async () => {
    setScanning(true)
    setScanComplete(false)

    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please try uploading instead.",
        variant: "destructive",
      })
      setScanning(false)
    }
  }

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setScanning(false)
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

        // In a real app, we would send this image to an OCR service
        // For demo purposes, we'll simulate a successful scan
        processPassportData()
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, we would send this file to an OCR service
      // For demo purposes, we'll simulate a successful scan
      processPassportData()
    }
  }

  const processPassportData = () => {
    // Simulate API call to process passport data
    setTimeout(() => {
      stopScanning()
      setScanComplete(true)

      // Simulate checking if customer exists in database or is blacklisted
      const isExistingCustomer = Math.random() > 0.5
      const isBlacklisted = Math.random() < 0.1

      // Sample data - in a real app, this would come from OCR processing
      const customerData = {
        name: "John Smith",
        nationality: "United States",
        passportNumber: "123456789",
        dateOfBirth: "1985-05-15",
        expiryDate: "2030-05-14",
        isBlacklisted: isBlacklisted,
        existingCustomer: isExistingCustomer,
        customerDetails: isExistingCustomer
          ? {
              phone: "+1 555-123-4567",
              email: "john.smith@example.com",
              previousRentals: 3,
              lastRental: "2023-10-15",
            }
          : undefined,
      }

      if (isBlacklisted) {
        toast({
          title: "Warning: Blacklisted Customer",
          description: "This customer has been blacklisted. Rental not recommended.",
          variant: "destructive",
        })
      } else if (isExistingCustomer) {
        toast({
          title: "Existing Customer",
          description: "Customer information retrieved from database.",
          variant: "default",
        })
      } else {
        toast({
          title: "New Customer",
          description: "Passport scanned successfully.",
          variant: "default",
        })
      }

      onScanComplete(customerData)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => {
            setUploadMode(false)
            startScanning()
          }}
          disabled={scanning}
          variant={!uploadMode && !scanComplete ? "default" : "outline"}
        >
          <Camera className="mr-2 h-4 w-4" />
          Scan Passport
        </Button>
        <Button
          onClick={() => {
            setUploadMode(true)
            stopScanning()
            fileInputRef.current?.click()
          }}
          disabled={scanning}
          variant={uploadMode && !scanComplete ? "default" : "outline"}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

      {scanning && (
        <Card className="overflow-hidden">
          <div className="relative">
            <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
            <div className="absolute inset-0 border-2 border-dashed border-primary opacity-70 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white bg-black/50 p-1 rounded">
                Align passport
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <Button onClick={captureImage} variant="default" size="lg" className="rounded-full">
                <Camera className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </Card>
      )}

      {!scanning && !scanComplete && (
        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <Camera className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Scan passport to automatically fill customer information</p>
        </div>
      )}

      {scanComplete && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
          <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="font-medium">Passport scanned successfully</p>
          <p className="text-sm text-muted-foreground mt-1">Customer information has been filled automatically</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              setScanComplete(false)
              setUploadMode(false)
            }}
          >
            <RefreshCw className="mr-2 h-3 w-3" />
            Scan Again
          </Button>
        </div>
      )}
    </div>
  )
}
