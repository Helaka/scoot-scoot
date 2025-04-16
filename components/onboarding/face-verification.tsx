"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RefreshCw, Check, Camera } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useMobile } from "@/hooks/use-mobile"

interface FaceVerificationProps {
  onFormUpdate: (data: Record<string, any>) => void
  initialData?: Record<string, any>
}

export function FaceVerification({ onFormUpdate, initialData = {} }: FaceVerificationProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(initialData.faceImageUrl || null)
  const [error, setError] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "failed">(
    initialData.verificationStatus || "idle",
  )
  const { isMobile } = useMobile()

  // Update parent component when form data changes
  useEffect(() => {
    if (capturedImage) {
      onFormUpdate({
        faceImageUrl: capturedImage,
        verificationStatus,
        verificationComplete: verificationStatus === "success",
      })
    }
  }, [capturedImage, verificationStatus, onFormUpdate])

  // Start the camera
  const startCamera = async () => {
    setError(null)

    try {
      const constraints = {
        video: {
          facingMode: "user", // Use front camera for face verification
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Could not access camera. Please check permissions.")
    }
  }

  // Stop the camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsCapturing(false)
    }
  }

  // Capture a photo
  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Get the image data URL
    const imageDataUrl = canvas.toDataURL("image/jpeg")
    setCapturedImage(imageDataUrl)

    // Stop the camera
    stopCamera()
  }

  // Reset the capture
  const resetCapture = () => {
    setCapturedImage(null)
    setVerificationStatus("idle")
    startCamera()
  }

  // Verify the face
  const verifyFace = async () => {
    if (!capturedImage) return

    setVerificationStatus("verifying")

    try {
      // In a real implementation, we would send the image to an API for verification
      // For now, we'll simulate a verification process with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a successful verification
      setVerificationStatus("success")
    } catch (err) {
      console.error("Error verifying face:", err)
      setVerificationStatus("failed")
      setError("Face verification failed. Please try again.")
    }
  }

  // Start camera when component mounts if no image is captured
  useEffect(() => {
    if (!capturedImage) {
      startCamera()
    }

    // Clean up when component unmounts
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Face Verification</Label>
        <p className="text-sm text-muted-foreground mt-1">
          We need to verify that you match your ID photo. Please look directly at the camera and ensure your face is
          well-lit.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          {isCapturing && (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto aspect-video object-cover" />
              <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-8 rounded-full pointer-events-none"></div>
            </>
          )}

          {capturedImage && (
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Captured face"
              className="w-full h-auto aspect-video object-cover"
            />
          )}

          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {verificationStatus === "verifying" && (
        <Alert>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertTitle>Verifying</AlertTitle>
          <AlertDescription>Please wait while we verify your face...</AlertDescription>
        </Alert>
      )}

      {verificationStatus === "success" && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Verification Successful</AlertTitle>
          <AlertDescription className="text-green-700">Your identity has been verified successfully.</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        {!capturedImage ? (
          <Button type="button" onClick={capturePhoto} className="flex-1 gap-2" disabled={!isCapturing}>
            <Camera className="h-4 w-4" />
            Capture Photo
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={resetCapture}
              className="flex-1"
              disabled={verificationStatus === "verifying" || verificationStatus === "success"}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake
            </Button>

            {verificationStatus !== "success" && (
              <Button
                type="button"
                onClick={verifyFace}
                className="flex-1"
                disabled={verificationStatus === "verifying"}
              >
                {verificationStatus === "verifying" ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
