"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ESignature } from "@/components/ui/e-signature"
import { UploadIcon as FileUpload, Upload, Camera, CreditCard, Calendar, Check, AlertCircle } from "lucide-react"
import { DocumentService, type DocumentMetadata } from "@/services/document-service"

export default function DRPApplicationForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upload")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form state
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [licenseDocument, setLicenseDocument] = useState<DocumentMetadata | null>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    licenseNumber: "",
    issuedCountry: "",
    expiryDate: "",
  })

  const [signature, setSignature] = useState<string | null>(null)
  const [agreements, setAgreements] = useState({
    termsAndConditions: false,
    regionalRules: false,
    dataProcessing: false,
  })

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly")

  // Handle license file upload
  const handleLicenseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setLicenseFile(files[0])

      try {
        // Upload the license to the document service
        const document = await DocumentService.storeDocument(
          "current-user-id", // In a real app, this would be the actual user ID
          "license",
          files[0],
        )

        setLicenseDocument(document)
        setSuccess("License uploaded successfully")
        setError(null)

        // Move to the next tab after a short delay
        setTimeout(() => {
          setActiveTab("info")
          setSuccess(null)
        }, 1500)
      } catch (err) {
        setError("Failed to upload license. Please try again.")
        console.error(err)
      }
    }
  }

  // Handle selfie upload
  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setSelfieFile(files[0])
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (name: keyof typeof agreements, checked: boolean) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  // Handle signature change
  const handleSignatureChange = (dataUrl: string | null) => {
    setSignature(dataUrl)
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate form
      if (!licenseDocument) {
        throw new Error("Please upload your license")
      }

      if (!formData.fullName || !formData.licenseNumber) {
        throw new Error("Please fill in all required fields")
      }

      if (!signature) {
        throw new Error("Please sign the form")
      }

      if (!agreements.termsAndConditions || !agreements.regionalRules) {
        throw new Error("Please accept all required agreements")
      }

      // In a real implementation, we would process payment here

      // Generate the permit
      const permitData = {
        ...formData,
        photoUrl: selfieFile ? URL.createObjectURL(selfieFile) : undefined,
      }

      const permit = await DocumentService.generatePermit(
        "current-user-id", // In a real app, this would be the actual user ID
        licenseDocument,
        permitData,
      )

      // Navigate to success page
      router.push(`/rider-drp/success?permitId=${permit.id}`)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred")
      }
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Digital Ride Permit Application</CardTitle>
        <CardDescription>
          Get your ScootScoot Digital Ride Permit to enhance your riding experience worldwide
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload License</TabsTrigger>
            <TabsTrigger value="info" disabled={!licenseDocument}>
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="agreement" disabled={!licenseDocument}>
              Agreements
            </TabsTrigger>
            <TabsTrigger value="payment" disabled={!licenseDocument || !signature}>
              Payment
            </TabsTrigger>
          </TabsList>

          {/* License Upload Tab */}
          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex flex-col items-center justify-center gap-4">
                  <FileUpload className="h-12 w-12 text-yellow-500" />
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Upload Your Driver&apos;s License</h3>
                    <p className="text-sm text-muted-foreground">
                      We need a clear photo of your valid driver&apos;s license
                    </p>
                  </div>

                  <div className="w-full max-w-sm">
                    <Label htmlFor="license-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors">
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {licenseFile ? licenseFile.name : "Click to upload license"}
                          </p>
                        </div>
                      </div>
                      <Input
                        id="license-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLicenseUpload}
                      />
                    </Label>
                  </div>

                  <div className="w-full max-w-sm">
                    <Label htmlFor="selfie-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors">
                        <div className="flex flex-col items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selfieFile ? selfieFile.name : "Upload a selfie (optional)"}
                          </p>
                        </div>
                      </div>
                      <Input
                        id="selfie-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleSelfieUpload}
                      />
                    </Label>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <p>{success}</p>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("info")} disabled={!licenseDocument}>
                  Continue
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="info" className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name (as on license)</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="United States"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="DL12345678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuedCountry">Issued Country</Label>
                <Input
                  id="issuedCountry"
                  name="issuedCountry"
                  value={formData.issuedCountry}
                  onChange={handleInputChange}
                  placeholder="United States"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">License Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab("upload")}>
                Back
              </Button>
              <Button
                onClick={() => setActiveTab("agreement")}
                disabled={!formData.fullName || !formData.licenseNumber}
              >
                Continue
              </Button>
            </div>
          </TabsContent>

          {/* Agreements Tab */}
          <TabsContent value="agreement" className="space-y-4 py-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Terms & Agreements</h3>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreements.termsAndConditions}
                      onCheckedChange={(checked) => handleCheckboxChange("termsAndConditions", checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the ScootScoot Terms of Service
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        By checking this box, you agree to our terms of service and privacy policy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="rules"
                      checked={agreements.regionalRules}
                      onCheckedChange={(checked) => handleCheckboxChange("regionalRules", checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="rules"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I acknowledge regional scooter rules
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        I understand that I must follow all local traffic laws and regulations when operating a scooter.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="data"
                      checked={agreements.dataProcessing}
                      onCheckedChange={(checked) => handleCheckboxChange("dataProcessing", checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="data"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I consent to data processing
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        I consent to ScootScoot processing my personal data for the purpose of creating a Digital Ride
                        Permit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Signature</h3>
                <p className="text-sm text-muted-foreground">
                  Please sign below to confirm your agreement to all terms and conditions.
                </p>

                <ESignature
                  onChange={handleSignatureChange}
                  width={400}
                  height={150}
                  label="Sign here to confirm your application"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab("info")}>
                Back
              </Button>
              <Button
                onClick={() => setActiveTab("payment")}
                disabled={!signature || !agreements.termsAndConditions || !agreements.regionalRules}
              >
                Continue
              </Button>
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-4 py-4">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Choose Your Plan</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === "monthly"
                      ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedPlan("monthly")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Monthly Plan</h4>
                      <p className="text-sm text-muted-foreground">Perfect for short trips</p>
                    </div>
                    <div className="text-xl font-bold">$9.99</div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Valid for 1 month
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      License verification
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Downloadable PDF
                    </li>
                  </ul>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === "annual"
                      ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedPlan("annual")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Annual Plan</h4>
                      <p className="text-sm text-muted-foreground">Best value for frequent riders</p>
                    </div>
                    <div className="text-xl font-bold">$29.99</div>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 text-xs font-medium px-2 py-1 rounded">
                      Save 75%
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Valid for 1 year
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      License verification
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Downloadable PDF
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Verified rider badge
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Priority support
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Payment Information</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="flex">
                      <CreditCard className="h-5 w-5 text-muted-foreground mr-2 self-center" />
                      <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <div className="flex">
                      <Calendar className="h-5 w-5 text-muted-foreground mr-2 self-center" />
                      <Input id="expiryDate" placeholder="MM/YY" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" type="password" maxLength={4} />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab("agreement")}>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {isLoading ? "Processing..." : `Pay $${selectedPlan === "monthly" ? "9.99" : "29.99"}`}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
        <p>
          The Digital Ride Permit is not a government-issued document. It serves as proof that you have acknowledged
          regional scooter rules and have a valid driver&apos;s license.
        </p>
      </CardFooter>
    </Card>
  )
}
