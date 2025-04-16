"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function VerifyPermitPage({ params }: { params: { permitId: string } }) {
  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "expired">("loading")
  const [permitData, setPermitData] = useState<{
    name: string
    issuedDate: string
    expiryDate: string
    permitNumber: string
  } | null>(null)

  useEffect(() => {
    // Simulate API call to verify permit
    const timer = setTimeout(() => {
      // For demo purposes, we'll randomly choose a status
      // In a real app, this would be an API call to verify the permit
      const statuses = ["valid", "invalid", "expired"]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)] as "valid" | "invalid" | "expired"

      setStatus(randomStatus)

      if (randomStatus === "valid" || randomStatus === "expired") {
        setPermitData({
          name: "Alex Johnson",
          issuedDate: "2023-05-15",
          expiryDate: randomStatus === "expired" ? "2023-11-15" : "2024-05-15",
          permitNumber: params.permitId,
        })
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [params.permitId])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-yellow-500" />
            Permit Verification
          </CardTitle>
          <CardDescription>Verifying permit #{params.permitId}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
              <p className="text-center text-muted-foreground">Verifying permit authenticity...</p>
            </div>
          )}

          {status === "valid" && permitData && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Valid Permit</h3>
                <p className="text-muted-foreground mt-1">This is an authentic Digital Ride Permit</p>
              </div>
              <div className="w-full mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{permitData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issued:</span>
                  <span className="font-medium">{new Date(permitData.issuedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="font-medium">{new Date(permitData.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Permit #:</span>
                  <span className="font-medium">{permitData.permitNumber}</span>
                </div>
              </div>
            </div>
          )}

          {status === "expired" && permitData && (
            <div className="flex flex-col items-center gap-4">
              <Clock className="h-16 w-16 text-amber-500" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-amber-600 dark:text-amber-400">Expired Permit</h3>
                <p className="text-muted-foreground mt-1">This permit has expired</p>
              </div>
              <div className="w-full mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{permitData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issued:</span>
                  <span className="font-medium">{new Date(permitData.issuedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expired:</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {new Date(permitData.expiryDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Permit #:</span>
                  <span className="font-medium">{permitData.permitNumber}</span>
                </div>
              </div>
            </div>
          )}

          {status === "invalid" && (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">Invalid Permit</h3>
                <p className="text-muted-foreground mt-1">This permit is not recognized in our system</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
