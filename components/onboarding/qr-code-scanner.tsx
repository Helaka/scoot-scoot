"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/contexts/session-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AlertCircle, Camera, CheckCircle2 } from "lucide-react"

// In a real app, we would use a QR code scanning library
// For now, we'll simulate scanning

export function QRCodeScanner() {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const { activateSession, loading } = useSession()

  const startScanning = async () => {
    setError(null)
    setScanning(true)

    try {
      // In a real app, we would initialize the camera and QR scanner here
      // For now, we'll simulate finding a QR code after a delay
      setTimeout(() => {
        // Simulate finding a code
        handleCodeDetected("123456")
      }, 3000)
    } catch (err) {
      setError("Failed to access camera. Please check permissions and try again.")
      setScanning(false)
    }
  }

  const stopScanning = () => {
    setScanning(false)
    // In a real app, we would stop the camera stream here
  }

  const handleCodeDetected = async (code: string) => {
    stopScanning()

    try {
      // In a real app, we would get the rider ID from authentication
      const riderId = "rider-temp-id"
      const session = await activateSession(code, riderId)

      if (!session) {
        setError("Invalid or expired QR code. Please try again.")
        return
      }

      setSuccess(true)

      // Redirect to onboarding page after a short delay
      setTimeout(() => {
        router.push(`/onboarding?session=${session.id}`)
      }, 1500)
    } catch (err) {
      setError("Failed to activate session. Please try again.")
      console.error(err)
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Scan QR Code</CardTitle>
        <CardDescription>Scan the QR code provided by your rental shop</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>QR code accepted. Redirecting to onboarding...</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col items-center">
          {scanning ? (
            <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Scanning overlay */}
                <div className="w-3/4 h-3/4 border-2 border-primary rounded-lg relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-scan"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {scanning ? (
          <Button variant="outline" className="w-full" onClick={stopScanning} disabled={loading || success}>
            Cancel Scanning
          </Button>
        ) : (
          <Button className="w-full" onClick={startScanning} disabled={loading || success}>
            {loading ? <LoadingSpinner className="mr-2" /> : null}
            {loading ? "Processing..." : "Start Scanning"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
