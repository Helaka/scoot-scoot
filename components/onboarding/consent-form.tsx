"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useMobile } from "@/hooks/use-mobile"

interface ConsentFormProps {
  onFormUpdate: (data: Record<string, any>) => void
  initialData?: Record<string, any>
}

export function ConsentForm({ onFormUpdate, initialData = {} }: ConsentFormProps) {
  const [termsAccepted, setTermsAccepted] = useState(initialData.termsAccepted || false)
  const [privacyAccepted, setPrivacyAccepted] = useState(initialData.privacyAccepted || false)
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(initialData.dataProcessingAccepted || false)
  const { isMobile } = useMobile()

  // Update parent component when form data changes
  useEffect(() => {
    onFormUpdate({
      termsAccepted,
      privacyAccepted,
      dataProcessingAccepted,
      allConsentsAccepted: termsAccepted && privacyAccepted && dataProcessingAccepted,
    })
  }, [termsAccepted, privacyAccepted, dataProcessingAccepted, onFormUpdate])

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium">Terms & Consent</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Please review and accept the following terms to complete your registration.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="terms">
          <AccordionTrigger className="text-sm font-medium">Terms of Service</AccordionTrigger>
          <AccordionContent>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>
                By using ScootScoot, you agree to abide by our terms of service, which include responsible use of rental
                scooters, adherence to local traffic laws, and proper parking in designated areas.
              </p>
              <p>
                You must be at least 18 years old to rent a scooter. You are responsible for any damages caused during
                your rental period. ScootScoot reserves the right to charge your payment method for damages or
                violations.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy">
          <AccordionTrigger className="text-sm font-medium">Privacy Policy</AccordionTrigger>
          <AccordionContent>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>
                ScootScoot collects personal information to provide and improve our services. This includes your name,
                contact information, payment details, location data during rentals, and usage patterns.
              </p>
              <p>
                We use this information to process rentals, ensure proper scooter operation, improve our services, and
                comply with legal requirements. Your information may be shared with rental shops, payment processors,
                and legal authorities when required.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-3 pt-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            className={isMobile ? "mt-1" : "mt-0.5"}
          />
          <Label htmlFor="terms" className="text-sm leading-tight">
            I accept the Terms of Service and confirm I have read and understood them
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="privacy"
            checked={privacyAccepted}
            onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
            className={isMobile ? "mt-1" : "mt-0.5"}
          />
          <Label htmlFor="privacy" className="text-sm leading-tight">
            I accept the Privacy Policy and understand how my data will be used
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="data-processing"
            checked={dataProcessingAccepted}
            onCheckedChange={(checked) => setDataProcessingAccepted(checked === true)}
            className={isMobile ? "mt-1" : "mt-0.5"}
          />
          <Label htmlFor="data-processing" className="text-sm leading-tight">
            I consent to the processing of my personal data, including ID documents and location data, for the purpose
            of providing rental services
          </Label>
        </div>
      </div>
    </div>
  )
}
