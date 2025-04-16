"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp, Download, Printer } from "lucide-react"

interface RentalAgreementPreviewProps {
  shopName: string
  riderName: string
  agreementDate: Date
}

export function RentalAgreementPreview({
  shopName = "Beach Scooters",
  riderName = "John Doe",
  agreementDate = new Date(),
}: RentalAgreementPreviewProps) {
  const [expanded, setExpanded] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real implementation, this would download the agreement as PDF
    alert("Downloading agreement as PDF...")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Rental Agreement</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className={`p-4 ${expanded ? "" : "max-h-64 overflow-hidden relative"}`}>
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold">{shopName}</h2>
              <h3 className="text-lg font-medium">Scooter Rental Agreement</h3>
              <p className="text-sm text-muted-foreground">Date: {agreementDate.toLocaleDateString()}</p>
            </div>

            <div>
              <p className="font-medium">Rider Information:</p>
              <p>Name: {riderName}</p>
            </div>

            <div>
              <p className="font-medium">Terms and Conditions:</p>
              <ScrollArea className={expanded ? "h-96" : "h-auto"}>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>1. Rental Period:</strong> The rental period begins when the rider takes possession of the
                    scooter and ends when the scooter is returned to the designated location.
                  </p>
                  <p>
                    <strong>2. Fees and Charges:</strong> The rider agrees to pay all rental fees, taxes, and charges
                    applicable to the rental. Additional charges may apply for late returns, damage, or violations.
                  </p>
                  <p>
                    <strong>3. Use of Equipment:</strong> The rider agrees to use the scooter in a careful and proper
                    manner, complying with all traffic laws and regulations. The scooter shall not be used:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>By anyone under the age of 18</li>
                    <li>Under the influence of alcohol or drugs</li>
                    <li>In violation of any traffic laws or regulations</li>
                    <li>For any illegal purpose</li>
                    <li>To carry passengers unless the scooter is designed for multiple riders</li>
                    <li>Outside of designated areas</li>
                  </ul>
                  <p>
                    <strong>4. Helmets and Safety:</strong> The rider acknowledges that helmets are recommended for all
                    riders and required by law in many jurisdictions. The rider assumes all risk of injury and damage
                    while using the scooter.
                  </p>
                  <p>
                    <strong>5. Damage and Loss:</strong> The rider is responsible for all damage to or loss of the
                    scooter, regardless of cause or fault. The rider agrees to pay for all repairs or replacement costs.
                  </p>
                  <p>
                    <strong>6. Insurance:</strong> The rider acknowledges that the rental fee does not include insurance
                    coverage for personal injury or property damage to third parties.
                  </p>
                  <p>
                    <strong>7. Release and Indemnification:</strong> The rider releases and discharges the rental
                    company from all claims, liabilities, and damages arising from the use of the scooter. The rider
                    agrees to indemnify and hold harmless the rental company from all claims, liabilities, and damages
                    related to the use of the scooter.
                  </p>
                  <p>
                    <strong>8. Governing Law:</strong> This agreement shall be governed by the laws of the jurisdiction
                    in which the scooter is rented.
                  </p>
                  <p>
                    <strong>9. Entire Agreement:</strong> This agreement constitutes the entire agreement between the
                    parties and supersedes all prior agreements and understandings, whether written or oral.
                  </p>
                </div>
              </ScrollArea>

              {!expanded && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="ghost" className="w-full" onClick={() => setExpanded(!expanded)}>
        {expanded ? (
          <>
            <ChevronUp className="h-4 w-4 mr-2" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-2" />
            Show Full Agreement
          </>
        )}
      </Button>
    </div>
  )
}
