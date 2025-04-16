"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Check, RefreshCw } from "lucide-react"

interface ESignatureProps {
  onChange: (signatureDataUrl: string | null) => void
  value?: string | null
  height?: number
  width?: number
  className?: string
  label?: string
}

export function ESignature({
  onChange,
  value = null,
  height = 200,
  width = 400,
  className = "",
  label = "Sign here",
}: ESignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext("2d")
      if (context) {
        context.lineWidth = 2
        context.lineCap = "round"
        context.strokeStyle = "#000"
        setCtx(context)
      }
    }
  }, [])

  // Load initial value if provided
  useEffect(() => {
    if (value && ctx && canvasRef.current) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
        ctx.drawImage(img, 0, 0)
        setHasSignature(true)
      }
      img.src = value
    }
  }, [value, ctx])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx) return

    setIsDrawing(true)
    ctx.beginPath()

    // Get coordinates
    const canvas = canvasRef.current!
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

    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return

    // Get coordinates
    const canvas = canvasRef.current!
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

    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  const endDrawing = () => {
    if (isDrawing && ctx) {
      ctx.closePath()
      setIsDrawing(false)

      // Notify parent component of the signature
      if (hasSignature && canvasRef.current) {
        const dataUrl = canvasRef.current.toDataURL("image/png")
        onChange(dataUrl)
      }
    }
  }

  const clearSignature = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      setHasSignature(false)
      onChange(null)
    }
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="relative border rounded-md mb-2">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="touch-none w-full h-auto bg-white dark:bg-gray-800 rounded-md"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
            {label}
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" size="sm" onClick={clearSignature} disabled={!hasSignature}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={clearSignature}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          {hasSignature && (
            <Button type="button" variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
              <Check className="h-4 w-4 mr-2" />
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
