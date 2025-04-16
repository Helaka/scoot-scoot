"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, RefreshCw } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SignatureCaptureProps {
  onFormUpdate: (data: Record<string, any>) => void
  initialData?: Record<string, any>
}

export function SignatureCapture({ onFormUpdate, initialData = {} }: SignatureCaptureProps) {
  const [signatureType, setSignatureType] = useState("draw")
  const [signatureUrl, setSignatureUrl] = useState<string | null>(initialData.signatureUrl || null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const { isMobile } = useMobile()

  // Update parent component when form data changes
  useEffect(() => {
    if (signatureUrl) {
      onFormUpdate({ signatureUrl, signatureType })
    }
  }, [signatureUrl, signatureType, onFormUpdate])

  // Initialize canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.strokeStyle = "#000"
      }
    }
  }, [])

  // For file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setSignatureUrl(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  // For drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let clientX, clientY

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let clientX, clientY

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)

    const canvas = canvasRef.current
    if (!canvas) return

    // Save the signature as an image URL
    setSignatureUrl(canvas.toDataURL())
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignatureUrl(null)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Your Signature</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Please provide your signature to confirm your identity and agree to the rental terms.
        </p>
      </div>

      <Tabs value={signatureType} onValueChange={setSignatureType} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 w-full">
          <TabsTrigger value="draw">Draw</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="space-y-4">
          <Card>
            <CardContent className="p-0 relative">
              <canvas
                ref={canvasRef}
                width={500}
                height={200}
                className="w-full h-48 border border-input rounded-md touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearCanvas}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-muted-foreground">Draw your signature in the box above</div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div
            className="relative cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/40 transition-colors p-4 flex flex-col items-center justify-center gap-2 h-32"
            onClick={() => document.getElementById("signature-upload")?.click()}
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">Upload Signature Image</span>
            <input id="signature-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          {signatureUrl && signatureType === "upload" && (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={signatureUrl || "/placeholder.svg"}
                  alt="Signature Preview"
                  className="w-full h-auto object-contain max-h-48"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
