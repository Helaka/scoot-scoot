"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface ScooterPhotoDocumentationProps {
  scooterId: string
  onPhotosUpdated: (photos: Record<string, string>) => void
}

type PhotoPosition = "front" | "back" | "left" | "right" | "dashboard" | "damage"

export function ScooterPhotoDocumentation({ scooterId, onPhotosUpdated }: ScooterPhotoDocumentationProps) {
  const [photos, setPhotos] = useState<Record<string, string>>({})
  const [currentPosition, setCurrentPosition] = useState<PhotoPosition | null>(null)
  const [cameraActive, setCameraActive] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const photoPositions: { id: PhotoPosition; label: string }[] = [
    { id: "front", label: "Front View" },
    { id: "back", label: "Back View" },
    { id: "left", label: "Left Side" },
    { id: "right", label: "Right Side" },
    { id: "dashboard", label: "Dashboard/Odometer" },
    { id: "damage", label: "Existing Damage (if any)" },
  ]

  const startCamera = async (position: PhotoPosition) => {
    setCurrentPosition(position)
    setCameraActive(true)

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
      setCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
    setCurrentPosition(null)
  }

  const capturePhoto = () => {
    if (!currentPosition) return

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const photoDataUrl = canvas.toDataURL("image/jpeg")

        setPhotos((prev) => {
          const updated = { ...prev, [currentPosition]: photoDataUrl }
          onPhotosUpdated(updated)
          return updated
        })

        toast({
          title: "Photo Captured",
          description: `${photoPositions.find((p) => p.id === currentPosition)?.label} photo saved`,
        })

        stopCamera()
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPosition) return

    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const photoDataUrl = event.target?.result as string

        setPhotos((prev) => {
          const updated = { ...prev, [currentPosition]: photoDataUrl }
          onPhotosUpdated(updated)
          return updated
        })

        toast({
          title: "Photo Uploaded",
          description: `${photoPositions.find((p) => p.id === currentPosition)?.label} photo saved`,
        })

        setCurrentPosition(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const deletePhoto = (position: PhotoPosition) => {
    setPhotos((prev) => {
      const updated = { ...prev }
      delete updated[position]
      onPhotosUpdated(updated)
      return updated
    })
  }

  return (
    <div className="space-y-4">
      {cameraActive ? (
        <Card>
          <CardContent className="p-0 relative">
            <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
            <div className="absolute inset-0 border-2 border-dashed border-primary opacity-70 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white bg-black/50 p-1 rounded">
                Position scooter in frame
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <Button onClick={stopCamera} variant="outline" size="sm" className="bg-white/80">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={capturePhoto} variant="default" size="lg" className="rounded-full">
                <Camera className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
          <canvas ref={canvasRef} className="hidden" />
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photoPositions.map((position) => (
            <Card key={position.id} className={`overflow-hidden ${photos[position.id] ? "border-green-500" : ""}`}>
              <CardContent className="p-0">
                {photos[position.id] ? (
                  <div className="relative">
                    <img
                      src={photos[position.id] || "/placeholder.svg"}
                      alt={position.label}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-1 right-1 flex space-x-1">
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-6 w-6 rounded-full bg-red-500/80"
                        onClick={() => deletePhoto(position.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                      <p className="text-white text-xs text-center">{position.label}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 p-2">
                    <p className="text-xs text-center mb-2">{position.label}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => startCamera(position.id)}>
                        <Camera className="h-3 w-3 mr-1" />
                        Camera
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setCurrentPosition(position.id)
                          fileInputRef.current?.click()
                        }}
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="font-medium">{Object.keys(photos).length}</span> of{" "}
          <span className="font-medium">{photoPositions.length}</span> photos taken
        </div>
        {Object.keys(photos).length >= 4 && (
          <div className="flex items-center text-green-600 text-sm">
            <Check className="h-4 w-4 mr-1" />
            Minimum photos complete
          </div>
        )}
      </div>
    </div>
  )
}
