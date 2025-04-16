"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Maximize2, QrCode, Shield, Calendar, Globe, User } from "lucide-react"

interface DRPPreviewProps {
  permitData: {
    id: string
    fullName: string
    dateOfBirth: string
    nationality: string
    licenseNumber: string
    issuedCountry: string
    expiryDate: string
    issueDate: string
    photoUrl?: string
    permitType: "monthly" | "annual"
    qrCode: string
  }
  onDownload?: () => void
  onShare?: () => void
  onFullscreen?: () => void
}

export default function DRPPreview({ permitData, onDownload, onShare, onFullscreen }: DRPPreviewProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative perspective-1000">
        <div className={`relative transition-all duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
          {/* Front of permit */}
          <div className={`backface-hidden ${isFlipped ? "invisible" : "visible"}`}>
            <Card className="overflow-hidden border-2 border-yellow-500">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-600" />

              <CardHeader className="bg-gradient-to-r from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-yellow-500" />
                    <div>
                      <CardTitle className="text-xl">Verified Digital Ride Permit</CardTitle>
                      <CardDescription>Issued by ScootScoot Travel Platform</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                  >
                    {permitData.permitType === "monthly" ? "Monthly" : "Annual"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo and QR section */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-500">
                      <Image
                        src={permitData.photoUrl || "/placeholder.svg?height=128&width=128"}
                        alt={permitData.fullName}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>

                    <div className="w-32 h-32 border rounded-lg flex items-center justify-center bg-white">
                      <QrCode className="h-24 w-24 text-gray-800" />
                    </div>

                    <div className="text-center text-xs text-muted-foreground">Scan to verify</div>
                  </div>

                  {/* Permit details */}
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-yellow-500" />
                        <h3 className="font-medium">Rider Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <p className="font-medium">{permitData.fullName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date of Birth:</span>
                          <p className="font-medium">{formatDate(permitData.dateOfBirth)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Nationality:</span>
                          <p className="font-medium">{permitData.nationality}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">License No:</span>
                          <p className="font-medium">{permitData.licenseNumber}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-yellow-500" />
                        <h3 className="font-medium">License Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Issued Country:</span>
                          <p className="font-medium">{permitData.issuedCountry}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">License Expiry:</span>
                          <p className="font-medium">{formatDate(permitData.expiryDate)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-yellow-500" />
                        <h3 className="font-medium">Permit Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Permit ID:</span>
                          <p className="font-medium">{permitData.id.substring(0, 8).toUpperCase()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Issue Date:</span>
                          <p className="font-medium">{formatDate(permitData.issueDate)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valid Until:</span>
                          <p className="font-medium">
                            {permitData.permitType === "monthly"
                              ? formatDate(
                                  new Date(
                                    new Date(permitData.issueDate).setMonth(
                                      new Date(permitData.issueDate).getMonth() + 1,
                                    ),
                                  ).toISOString(),
                                )
                              : formatDate(
                                  new Date(
                                    new Date(permitData.issueDate).setFullYear(
                                      new Date(permitData.issueDate).getFullYear() + 1,
                                    ),
                                  ).toISOString(),
                                )}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <p className="font-medium text-green-600 dark:text-green-400">Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-100 dark:bg-gray-800 text-xs text-muted-foreground p-3">
                <p>
                  This certificate confirms that the rider has submitted a valid driver&apos;s license and agreed to the
                  regional traffic rules and ScootScoot rental policies. Not a government-issued IDP. Verified by
                  ScootScoot.
                </p>
              </CardFooter>
            </Card>
          </div>

          {/* Back of permit */}
          <div
            className={`absolute top-0 left-0 w-full backface-hidden rotate-y-180 ${
              isFlipped ? "visible" : "invisible"
            }`}
          >
            <Card className="overflow-hidden border-2 border-yellow-500">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-600" />

              <CardHeader className="bg-gradient-to-r from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900">
                <CardTitle className="text-xl">Regional Scooter Rules</CardTitle>
                <CardDescription>Important guidelines for safe riding</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">General Safety Rules</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Always wear a helmet when riding</li>
                      <li>Do not ride under the influence of alcohol or drugs</li>
                      <li>Observe all traffic signals and signs</li>
                      <li>Yield to pedestrians at all times</li>
                      <li>Do not use mobile devices while riding</li>
                      <li>Maintain a safe speed appropriate for conditions</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Parking Guidelines</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Park in designated scooter parking areas when available</li>
                      <li>Do not block pedestrian walkways or building entrances</li>
                      <li>Park upright using the kickstand</li>
                      <li>Avoid parking in private property without permission</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Rental Responsibilities</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Return the scooter in the same condition as received</li>
                      <li>Report any damages or issues immediately</li>
                      <li>Do not allow others to use the scooter during your rental period</li>
                      <li>Follow all rental shop specific guidelines</li>
                    </ul>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-100 dark:bg-gray-800 text-xs text-muted-foreground p-3 flex justify-between items-center">
                <p>Support contact: support@scootscoot.app</p>
                <p>Permit ID: {permitData.id.substring(0, 8).toUpperCase()}</p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Flip button */}
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full p-0"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <span className="sr-only">{isFlipped ? "Show Front" : "Show Back"}</span>
          {isFlipped ? "↺" : "↻"}
        </Button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <Button variant="outline" className="flex items-center gap-2" onClick={onDownload}>
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={onShare}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black" onClick={onFullscreen}>
          <Maximize2 className="h-4 w-4" />
          Fullscreen
        </Button>
      </div>
    </div>
  )
}
