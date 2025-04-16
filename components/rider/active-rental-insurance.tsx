"use client"

import { Shield, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActiveRentalInsuranceProps {
  insuranceType: string | null
  endDate: string
}

export function ActiveRentalInsurance({ insuranceType, endDate }: ActiveRentalInsuranceProps) {
  // If no insurance, show a different card
  if (!insuranceType || insuranceType === "none") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Insurance Coverage</CardTitle>
          <CardDescription>You did not purchase insurance for this rental</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800/30 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-gray-100 dark:bg-gray-800/30 p-2">
                <Shield className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">No Accident Coverage</h3>
                <p className="text-sm text-muted-foreground">You are responsible for all damages to the scooter</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Without insurance, you are liable for any damages to the scooter during your rental period. Please ride
              carefully and follow all safety guidelines.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Insurance details based on type
  const insuranceDetails = {
    basic: {
      name: "Basic Accident Coverage",
      coverageType: "Scooter Damage Only",
      coverageLimit: "$500",
      feePaid: "$15 (one-time)",
      description:
        "This insurance covers damages you may cause to the rented scooter in case of an accident, up to the coverage limit.",
    },
    premium: {
      name: "Premium Accident Coverage",
      coverageType: "Scooter & Third-Party Damage",
      coverageLimit: "$1,000",
      feePaid: "$25 (one-time)",
      description:
        "This insurance covers damages to the rented scooter and any damages caused to other riders or their scooters in an accident, up to the coverage limit.",
    },
  }

  const details = insuranceType === "premium" ? insuranceDetails.premium : insuranceDetails.basic

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accident Insurance</CardTitle>
        <CardDescription>Your current insurance coverage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-full bg-yellow-100 dark:bg-yellow-800/30 p-2">
              <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{details.name}</h3>
              <p className="text-sm text-muted-foreground">Active until {endDate}</p>
            </div>
            <Badge className="ml-auto bg-yellow-500 text-black">Active</Badge>
          </div>
          <div className="space-y-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Coverage Type:</span>
              <span className="font-medium">{details.coverageType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Coverage Limit:</span>
              <span className="font-medium">{details.coverageLimit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fee Paid:</span>
              <span className="font-medium">{details.feePaid}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800/30">
            <p className="text-sm text-muted-foreground mb-3">{details.description}</p>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              View Coverage Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
