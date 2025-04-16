"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Search } from "lucide-react"

const ActiveRentalDashboard = () => {
  const [isReportingIssue, setIsReportingIssue] = useState(false)
  const [isScooterFinderOpen, setIsScooterFinderOpen] = useState(false)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Active Rental</h1>

      {/* Quick Actions */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-16"
            onClick={() => setIsReportingIssue(true)}
          >
            <AlertTriangle className="h-5 w-5" />
            <span>Report Issue</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-16"
            onClick={() => setIsScooterFinderOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span>Find Another Scooter</span>
          </Button>
        </div>
      </section>

      {/* Placeholder for other rental details */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Rental Details</h2>
        <p>Scooter ID: 12345</p>
        <p>Time Started: 10:00 AM</p>
        <p>Current Cost: $5.00</p>
      </section>

      {/* Issue Reporting Modal (Placeholder) */}
      {isReportingIssue && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Report an Issue</h3>
            <p>This is a placeholder for the issue reporting modal.</p>
            <Button onClick={() => setIsReportingIssue(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* Scooter Finder Modal (Placeholder) */}
      {isScooterFinderOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Find Another Scooter</h3>
            <p>This is a placeholder for the scooter finder modal.</p>
            <Button onClick={() => setIsScooterFinderOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActiveRentalDashboard
