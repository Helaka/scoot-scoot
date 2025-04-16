"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, Camera, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface DocumentUploadProps {
  onFormUpdate: (data: Record<string, any>) => void
  initialData?: Record<string, any>
}

export function DocumentUpload({ onFormUpdate, initialData = {} }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.documentPreviewUrl || null)
  const { isMobile } = useMobile()

  // Update parent component when form data changes
  useEffect(() => {
    if (file || previewUrl) {
      onFormUpdate({ documentFile: file, documentPreviewUrl: previewUrl })
    }
  }, [file, previewUrl, onFormUpdate])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const clearPreview = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Upload Your ID or Passport</Label>
        <p className="text-sm text-muted-foreground mt-1">
          We need a clear photo of your government-issued ID or passport.
        </p>
      </div>

      {!previewUrl ? (
        <div className="grid grid-cols-2 gap-3">
          <div
            className="relative cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/40 transition-colors p-4 flex flex-col items-center justify-center gap-2 h-32"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">Upload File</span>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          <div
            className="relative cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/40 transition-colors p-4 flex flex-col items-center justify-center gap-2 h-32"
            onClick={() => document.getElementById("camera-upload")?.click()}
          >
            <Camera className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">Take Photo</span>
            <input
              id="camera-upload"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden relative">
          <button
            onClick={clearPreview}
            className="absolute top-2 right-2 z-10 bg-black/70 text-white rounded-full p-1"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
          <CardContent className="p-0">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="ID Preview"
              className="w-full h-auto object-contain max-h-64"
            />
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-muted-foreground mt-2">
        <p>Make sure all details are clearly visible and the entire document is in frame.</p>
      </div>
    </div>
  )
}
