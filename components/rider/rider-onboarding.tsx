"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChevronRight,
  ChevronLeft,
  User,
  Phone,
  CheckCircle2,
  MapPin,
  CreditCard,
  Shield,
  Camera,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

type OnboardingStep = "basics" | "verification" | "passport" | "location" | "payment" | "complete"
type VerificationMethod = "email" | "phone"

export function RiderOnboarding({ initialData = {} }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("basics")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>("phone")

  // Form data
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || "",
    email: initialData.email || "",
    password: initialData.password || "",
    confirmPassword: "",
    phone: initialData.phone || "",
    agreeToTerms: false,
  })

  // Handle form data changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Progress mapping
  const stepProgress = {
    basics: 16,
    verification: 32,
    passport: 48,
    location: 64,
    payment: 80,
    complete: 100,
  }

  // Handle next step
  const handleNextStep = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)

      // Move to next step
      if (currentStep === "basics") setCurrentStep("verification")
      else if (currentStep === "verification") setCurrentStep("passport")
      else if (currentStep === "passport") setCurrentStep("location")
      else if (currentStep === "location") setCurrentStep("payment")
      else if (currentStep === "payment") setCurrentStep("complete")
    }, 800)
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep === "verification") setCurrentStep("basics")
    else if (currentStep === "passport") setCurrentStep("verification")
    else if (currentStep === "location") setCurrentStep("passport")
    else if (currentStep === "payment") setCurrentStep("location")
  }

  // Handle completion
  const handleComplete = () => {
    router.push("/rider-dashboard")
  }

  // Skip optional step
  const handleSkip = () => {
    if (currentStep === "passport") setCurrentStep("location")
    else if (currentStep === "payment") setCurrentStep("complete")
  }

  return (
    <div className="container mx-auto py-6 max-w-md">
      <Card className="border-2 border-purple-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to ScootScoot</CardTitle>
          <CardDescription>Let's get you set up so you can start riding</CardDescription>
        </CardHeader>

        {/* Progress indicator */}
        <div className="px-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Getting Started</span>
            <span>Complete</span>
          </div>
          <Progress value={stepProgress[currentStep]} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>
              Step {Object.keys(stepProgress).indexOf(currentStep) + 1} of {Object.keys(stepProgress).length}
            </span>
            <span>{stepProgress[currentStep]}% Complete</span>
          </div>
        </div>

        <CardContent className="pt-6">
          {/* Step 1: Basic Information */}
          {currentStep === "basics" && (
            <div className="space-y-4">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-purple-600" />
              </div>

              <h2 className="text-xl font-semibold text-center">Basic Information</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">Let's start with your basic details</p>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Create Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleChange("agreeToTerms", checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Verification */}
          {currentStep === "verification" && (
            <div className="space-y-4">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {verificationMethod === "phone" ? (
                  <Phone className="h-6 w-6 text-purple-600" />
                ) : (
                  <Mail className="h-6 w-6 text-purple-600" />
                )}
              </div>

              <h2 className="text-xl font-semibold text-center">Verify Your Identity</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">
                Choose how you'd like to receive your verification code
              </p>

              <div className="space-y-4">
                <RadioGroup
                  defaultValue={verificationMethod}
                  onValueChange={(value) => setVerificationMethod(value as VerificationMethod)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="phone" id="phone-option" />
                    <Label htmlFor="phone-option" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Verify with Phone Number</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="email" id="email-option" />
                    <Label htmlFor="email-option" className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>Verify with Email</span>
                    </Label>
                  </div>
                </RadioGroup>

                {verificationMethod === "phone" ? (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="verifyEmail">Email Address</Label>
                    <Input
                      id="verifyEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                )}

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-700">
                  <p className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Your information is used for verification and safety purposes only.</span>
                  </p>
                </div>

                <Button className="w-full" variant="outline">
                  Send Verification Code
                </Button>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <div className="flex gap-2">
                    <Input id="code" placeholder="Enter 6-digit code" />
                    <Button variant="ghost" size="sm" className="whitespace-nowrap">
                      Resend
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Passport Verification */}
          {currentStep === "passport" && (
            <div className="space-y-4">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>

              <h2 className="text-xl font-semibold text-center">ID Verification</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">
                We need a clear photo of your ID for verification
              </p>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700 mb-4">
                <p className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>This step is optional now, but must be completed before renting a scooter.</span>
                </p>
              </div>

              <div className="space-y-3">
                <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center gap-2 bg-white">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">ID or Passport</p>
                  <p className="text-xs text-muted-foreground text-center">
                    Upload a clear photo of your ID or passport
                  </p>
                  <Button className="mt-2">Upload Photo</Button>
                </div>

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-700">
                  <p className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Your ID is required for verification and safety purposes.</span>
                  </p>
                </div>

                <div className="text-xs text-muted-foreground space-y-1 pt-2">
                  <p className="font-medium">Requirements:</p>
                  <p>• Photo must clearly show your full name and expiration date</p>
                  <p>• Make sure the entire ID is visible and well-lit</p>
                  <p>• Your information will be securely stored and verified</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Location */}
          {currentStep === "location" && (
            <div className="space-y-4">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>

              <h2 className="text-xl font-semibold text-center">Location Access</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">
                Allow location access to find scooters near you
              </p>

              <div className="space-y-3">
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-center">
                  <MapPin className="h-10 w-10 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">Find Nearby Scooters</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    We use your location to show available scooters near you and provide navigation
                  </p>
                  <Button className="w-full">Allow Location Access</Button>
                </div>

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-700">
                  <p className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>You can change location permissions anytime in your device settings.</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {currentStep === "payment" && (
            <div className="space-y-4">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>

              <h2 className="text-xl font-semibold text-center">Payment Method</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">
                Add a payment method for seamless rentals
              </p>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700 mb-4">
                <p className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>This step is optional now, but must be completed to book online.</span>
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input id="nameOnCard" placeholder="Enter name as it appears on card" />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox id="saveCard" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="saveCard"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this card for future rentals
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Complete */}
          {currentStep === "complete" && (
            <div className="space-y-4 text-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>

              <h2 className="text-xl font-semibold">You're All Set!</h2>
              <p className="text-muted-foreground text-sm mb-4">Your account has been created successfully</p>

              <div className="space-y-3">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-left dark:bg-green-900/20 dark:border-green-800">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">Profile Created</span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">
                        {verificationMethod === "phone" ? "Phone Verified" : "Email Verified"}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">ID Verification</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                        Required before rental
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">Payment Method</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                        Required for online booking
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You can now start exploring and renting scooters near you.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {currentStep !== "basics" && currentStep !== "complete" ? (
            <Button variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain spacing with flex justify-between
          )}

          {currentStep === "passport" || currentStep === "payment" ? (
            <Button variant="ghost" onClick={handleSkip}>
              Skip for now
            </Button>
          ) : null}

          {currentStep !== "complete" ? (
            <Button
              onClick={handleNextStep}
              disabled={
                loading ||
                (currentStep === "basics" &&
                  (!formData.fullName ||
                    !formData.email ||
                    !formData.password ||
                    !formData.confirmPassword ||
                    !formData.agreeToTerms ||
                    formData.password !== formData.confirmPassword))
              }
            >
              {loading ? "Processing..." : "Continue"}
              {!loading && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          ) : (
            <Button className="w-full" onClick={handleComplete}>
              Start Scooting
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
