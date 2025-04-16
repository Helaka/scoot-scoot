"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle } from "lucide-react"

interface LegalAgreementsProps {
  initialData: {
    terms: boolean
    privacy: boolean
    rentalAgreement: boolean
  }
  onComplete: (data: any) => void
  testMode?: boolean
}

export default function LegalAgreements({ initialData, onComplete, testMode = false }: LegalAgreementsProps) {
  const [terms, setTerms] = useState(initialData.terms)
  const [privacy, setPrivacy] = useState(initialData.privacy)
  const [rentalAgreement, setRentalAgreement] = useState(initialData.rentalAgreement)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (testMode || (terms && privacy && rentalAgreement)) {
      setError("")
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        onComplete({
          terms,
          privacy,
          rentalAgreement,
        })
      }, 1000)
    } else {
      setError("You must accept all agreements to continue")
    }
  }

  const handleAcceptAll = () => {
    setTerms(true)
    setPrivacy(true)
    setRentalAgreement(true)
  }

  return (
    <Card className="w-full bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30 mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Legal Agreements</CardTitle>
        <CardDescription>Please review and accept our terms and policies before continuing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="rental">Rental Agreement</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-64 w-full rounded-md border p-4 mt-4">
            <TabsContent value="terms" className="space-y-4">
              <h3 className="text-lg font-medium">Terms of Service</h3>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the ScootScoot platform, including our
                website, mobile applications, and services (collectively, the "Service"). By accessing or using the
                Service, you agree to be bound by these Terms.
              </p>
              <h4 className="font-medium mt-4">1. Use of Service</h4>
              <p>
                ScootScoot provides a platform for rental shops to manage their scooter rental operations. You may use
                our Service only as permitted by these Terms and any applicable laws and regulations.
              </p>
              <h4 className="font-medium mt-4">2. Account Registration</h4>
              <p>
                To use certain features of the Service, you must register for an account. You agree to provide accurate,
                current, and complete information during the registration process and to update such information to keep
                it accurate, current, and complete.
              </p>
              <h4 className="font-medium mt-4">3. Subscription and Payments</h4>
              <p>
                ScootScoot offers subscription plans with different features and pricing. By selecting a subscription
                plan, you agree to pay the subscription fees as described at the time of purchase. Subscription fees are
                billed in advance on a monthly basis.
              </p>
              <h4 className="font-medium mt-4">4. Free Trial</h4>
              <p>
                We may offer a free trial period for our subscription plans. At the end of the free trial period, you
                will be automatically charged the applicable subscription fee unless you cancel your subscription before
                the end of the trial period.
              </p>
              <h4 className="font-medium mt-4">5. Termination</h4>
              <p>
                We may terminate or suspend your account and access to the Service at our sole discretion, without
                notice, for conduct that we believe violates these Terms or is harmful to other users of the Service,
                us, or third parties, or for any other reason.
              </p>
              <h4 className="font-medium mt-4">6. Limitation of Liability</h4>
              <p>
                In no event shall ScootScoot be liable for any indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from your access to or use of or inability to access or use the Service.
              </p>
              <h4 className="font-medium mt-4">7. Changes to Terms</h4>
              <p>
                We reserve the right to modify these Terms at any time. If we make changes to these Terms, we will
                provide notice of such changes, such as by sending an email notification, providing notice through the
                Service, or updating the "Last Updated" date at the beginning of these Terms.
              </p>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <h3 className="text-lg font-medium">Privacy Policy</h3>
              <p>
                This Privacy Policy describes how ScootScoot collects, uses, and discloses information about you when
                you use our Service. By using our Service, you consent to the collection, use, and disclosure of
                information as described in this Privacy Policy.
              </p>
              <h4 className="font-medium mt-4">1. Information We Collect</h4>
              <p>
                We collect information you provide directly to us, such as when you create an account, update your
                profile, use the features of the Service, or communicate with us. This information may include your
                name, email address, phone number, business information, payment information, and any other information
                you choose to provide.
              </p>
              <h4 className="font-medium mt-4">2. How We Use Your Information</h4>
              <p>
                We use the information we collect to provide, maintain, and improve our Service, to process
                transactions, to send you technical notices and support messages, to communicate with you about
                products, services, offers, and events, and for other purposes described in our Privacy Policy.
              </p>
              <h4 className="font-medium mt-4">3. Sharing of Information</h4>
              <p>
                We may share information about you as follows: with vendors, consultants, and other service providers
                who need access to such information to carry out work on our behalf; in response to a request for
                information if we believe disclosure is in accordance with any applicable law, regulation, or legal
                process; and with your consent or at your direction.
              </p>
              <h4 className="font-medium mt-4">4. Data Security</h4>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, and
                unauthorized access, disclosure, alteration, and destruction.
              </p>
              <h4 className="font-medium mt-4">5. Your Choices</h4>
              <p>
                You may update, correct, or delete information about you at any time by logging into your account and
                modifying your information or by contacting us. You may also opt out of receiving promotional
                communications from us by following the instructions in those communications.
              </p>
            </TabsContent>

            <TabsContent value="rental" className="space-y-4">
              <h3 className="text-lg font-medium">Rental Agreement Template</h3>
              <p>
                This Rental Agreement Template ("Template") is provided by ScootScoot as a starting point for rental
                shops to create their own rental agreements with customers. You may use this Template as is or modify it
                to suit your business needs.
              </p>
              <h4 className="font-medium mt-4">1. Rental Terms</h4>
              <p>
                The rental shop agrees to rent a scooter to the customer for the agreed-upon rental period. The customer
                agrees to return the scooter in the same condition as when received, except for normal wear and tear.
              </p>
              <h4 className="font-medium mt-4">2. Payment</h4>
              <p>
                The customer agrees to pay the rental shop the agreed-upon rental fee, plus any additional charges for
                late returns, damages, or other fees as specified in the rental agreement.
              </p>
              <h4 className="font-medium mt-4">3. Security Deposit</h4>
              <p>
                The rental shop may require a security deposit from the customer, which will be refunded upon return of
                the scooter in satisfactory condition.
              </p>
              <h4 className="font-medium mt-4">4. Customer Responsibilities</h4>
              <p>
                The customer agrees to use the scooter in a safe and responsible manner, to obey all traffic laws and
                regulations, to wear a helmet at all times while operating the scooter, and to not allow any other
                person to operate the scooter.
              </p>
              <h4 className="font-medium mt-4">5. Liability and Insurance</h4>
              <p>
                The customer assumes all liability for any damages, injuries, or losses that occur during the rental
                period. The rental shop may offer insurance options to the customer for an additional fee.
              </p>
              <h4 className="font-medium mt-4">6. Termination</h4>
              <p>
                The rental shop reserves the right to terminate the rental agreement at any time if the customer
                violates any terms of the agreement.
              </p>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={terms} onCheckedChange={(checked) => setTerms(checked as boolean)} />
            <Label htmlFor="terms" className="text-sm">
              I have read and agree to the Terms of Service
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="privacy" checked={privacy} onCheckedChange={(checked) => setPrivacy(checked as boolean)} />
            <Label htmlFor="privacy" className="text-sm">
              I have read and agree to the Privacy Policy
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rental"
              checked={rentalAgreement}
              onCheckedChange={(checked) => setRentalAgreement(checked as boolean)}
            />
            <Label htmlFor="rental" className="text-sm">
              I acknowledge the ScootScoot rental agreement template
            </Label>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button onClick={handleAcceptAll} variant="outline" className="w-full sm:w-auto">
            Accept All
          </Button>
          <Button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Complete Setup"}
          </Button>
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          By clicking "Complete Setup", you agree to all the terms and conditions outlined above.
        </p>
      </CardFooter>
    </Card>
  )
}
