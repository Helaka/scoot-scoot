"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, UserX, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BlacklistCheckProps {
  customerId: string
  customerName: string
  customerEmail: string
  onContinue: () => void
  onCancel: () => void
}

export function BlacklistCheck({ customerId, customerName, customerEmail, onContinue, onCancel }: BlacklistCheckProps) {
  const [isChecking, setIsChecking] = useState(true)
  const [isBlacklisted, setIsBlacklisted] = useState(false)
  const [blacklistReason, setBlacklistReason] = useState("")
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    // Simulate API call to check blacklist status
    const checkBlacklistStatus = async () => {
      setIsChecking(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, let's pretend customer ID C-1003 is blacklisted
      if (customerId === "C-1003") {
        setIsBlacklisted(true)
        setBlacklistReason("Multiple instances of equipment damage and payment disputes")
        setShowDialog(true)
      } else {
        setIsBlacklisted(false)
        onContinue()
      }

      setIsChecking(false)
    }

    checkBlacklistStatus()
  }, [customerId, onContinue])

  if (isChecking) {
    return (
      <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Verifying customer status</AlertTitle>
        <AlertDescription>Please wait while we verify this customer's status...</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <UserX className="h-5 w-5" />
                Blacklisted Customer
              </DialogTitle>
              <DialogDescription>This customer has been blacklisted from the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-200">
                <p className="font-medium">
                  {customerName} ({customerEmail})
                </p>
                <p className="mt-1">Reason: {blacklistReason}</p>
              </div>
              <p className="text-sm">
                This customer has been blacklisted from the platform due to previous violations of our terms of service.
                Bookings for blacklisted customers are not allowed.
              </p>
              <div className="rounded-md bg-muted p-4 text-sm">
                <p className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>
                    The blacklist is a community protection feature that helps all shops avoid problematic customers.
                  </span>
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onCancel}>
                Cancel Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
