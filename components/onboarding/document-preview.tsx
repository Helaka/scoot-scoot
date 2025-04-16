"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, RotateCw, ZoomIn, ZoomOut } from "lucide-react"

interface DocumentPreviewProps {
  documentUrl: string
  verificationStatus?: "pending" | "verified" | "rejected"
  onRetry?: () => void
}

export function DocumentPreview({ documentUrl, verificationStatus = "pending", onRetry }: DocumentPreviewProps) {
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const resetView = () => {
    setRotation(0)
    setZoom(1)
  }

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
            <AlertCircle className="h-3 w-3" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Document Preview</h3>
          {getStatusBadge()}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={zoomOut} disabled={zoom <= 0.5}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={zoomIn} disabled={zoom >= 3}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={rotateImage}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={resetView}>
            Reset
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0 flex items-center justify-center bg-gray-50 h-64">
          <div
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          >
            <img
              src={documentUrl || "/placeholder.svg?height=400&width=600"}
              alt="Document preview"
              className="object-contain max-h-64"
            />
          </div>
        </CardContent>
      </Card>

      {verificationStatus === "rejected" && onRetry && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onRetry}>
            Upload New Document
          </Button>
        </div>
      )}
    </div>
  )
}
