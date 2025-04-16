"use client"

import { useState } from "react"
import { FileText, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface AgreementViewerButtonProps {
  rentalId: string
  customerName: string
  scooterId: string
  className?: string
}

export function AgreementViewerButton({ rentalId, customerName, scooterId, className }: AgreementViewerButtonProps) {
  const [open, setOpen] = useState(false)

  // This would normally come from your backend
  const agreementText = `
    # SCOOTER RENTAL AGREEMENT
    
    ## Rental ID: ${rentalId}
    
    This agreement is made between **ScootScoot Rentals** and **${customerName}**.
    
    ### SCOOTER DETAILS
    - Scooter ID: ${scooterId}
    - Rental Period: [Start Date] to [End Date]
    - Daily Rate: $XX.XX
    
    ### TERMS AND CONDITIONS
    
    1. **Damage Responsibility**: The renter is responsible for any damage to the scooter during the rental period.
    2. **Insurance**: Basic insurance is included, covering [details].
    3. **Fuel Policy**: The scooter must be returned with the same fuel level as at pickup.
    4. **Late Returns**: Late returns will incur a fee of $XX per hour.
    
    ### SIGNATURES
    
    Rental Shop Representative: ________________________
    
    Customer Signature: ________________________
    
    Date: ________________________
  `

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Rental Agreement - ${rentalId}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              h1 { color: #333; }
              h2 { color: #555; }
              h3 { color: #777; }
            </style>
          </head>
          <body>
            <div style="white-space: pre-wrap;">${agreementText}</div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button variant="outline" size="sm" className={className} onClick={() => setOpen(true)}>
          <FileText className="h-4 w-4 mr-2" />
          View Agreement
        </Button>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Rental Agreement</DialogTitle>
            <DialogDescription>
              Rental ID: {rentalId} | Customer: {customerName}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto border rounded-md p-4 my-4">
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm">{agreementText}</pre>
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <div>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="default" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
