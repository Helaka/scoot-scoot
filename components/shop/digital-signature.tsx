"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DigitalSignatureProps {
  onSignatureCapture: (signatureDataUrl: string) => void
}

export function DigitalSignature({ onSignatureCapture }: DigitalSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSigned, setHasSigned] = useState(false)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)
    setHasSigned(true)

    // Get the correct position
    const rect = canvas.getBoundingClientRect()
    let x, y

    if ("touches" in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get the correct position
    const rect = canvas.getBoundingClientRect()
    let x, y

    if ("touches" in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#000"

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)

      // Capture the signature
      const canvas = canvasRef.current
      if (canvas) {
        const signatureDataUrl = canvas.toDataURL("image/png")
        onSignatureCapture(signatureDataUrl)
      }
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSigned(false)
  }

  return (
    <div className="space-y-2">
      <div className="border rounded-md bg-white">
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="w-full touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" size="sm" onClick={clearSignature} disabled={!hasSigned}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>

        {hasSigned && (
          <div className="flex items-center text-sm text-green-600">
            <Check className="mr-1 h-4 w-4" />
            Signature captured
          </div>
        )}
      </div>
    </div>
  )
}
