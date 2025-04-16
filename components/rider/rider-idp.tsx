"use client"

import { useState } from "react"
import { FileText, Check, AlertCircle, ChevronRight, CreditCard, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function RiderIDP() {
  const [step, setStep] = useState(1)
  const [idpType, setIdpType] = useState("standard")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">International Driving Permit</h1>
        <p className="text-muted-foreground">Get your IDP online and ride legally in Thailand.</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step === i
                  ? "border-purple-500 bg-purple-50 text-purple-500"
                  : step > i
                    ? "border-green-500 bg-green-50 text-green-500"
                    : "border-gray-200 bg-gray-50 text-gray-400"
              }`}
            >
              {step > i ? <Check className="h-5 w-5" /> : i}
            </div>
            {i < 3 && <div className={`h-1 w-16 md:w-32 ${step > i ? "bg-green-500" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Choose IDP Type */}
      {step === 1 && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Choose Your IDP Type</CardTitle>
            <CardDescription>Select the International Driving Permit that suits your needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={idpType} onValueChange={setIdpType} className="space-y-4">
              <div
                className={`relative rounded-lg border p-4 ${idpType === "standard" ? "border-2 border-purple-500 bg-purple-50/50" : ""}`}
              >
                <RadioGroupItem value="standard" id="standard" className="absolute right-4 top-4" />
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-purple-100 p-3">
                    <FileText className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="standard" className="text-lg font-medium">
                      Standard IDP
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Valid for 1 year, recognized in Thailand and 150+ countries
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="text-xl font-bold">$49.99</span>
                      <Badge className="ml-2">Most Popular</Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                        <span>Digital delivery</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                        <span>24/7 support</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                        <span>Instant processing</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                        <span>Worldwide validity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`relative rounded-lg border p-4 ${idpType === "premium" ? "border-2 border-purple-500 bg-purple-50/50" : ""}`}
              >
                <RadioGroupItem value="premium" id="premium" className="absolute right-4 top-4" />
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-yellow-100 p-3">
                    <FileText className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="premium" className="text-lg font-medium">
                      Premium IDP
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Valid for 1 year, includes express processing and physical copy
                    </p>
                    <div className="mt-2">
                      <span className="text-xl font-bold">$79.99</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                        <span>Digital delivery</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                        <span>Physical copy</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                        <span>Express processing</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                        <span>Priority support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Important Information</h4>
                  <p className="text-sm">
                    An International Driving Permit (IDP) is required to legally drive in Thailand. Your IDP must be
                    used together with your valid home country driver's license.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => setStep(2)}>
              Continue
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Personal Information */}
      {step === 2 && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Enter your details as they appear on your driver's license</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter your first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter your last name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="nationality">
                    <SelectValue placeholder="Select your nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="nz">New Zealand</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Driver's License Number</Label>
                <Input id="licenseNumber" placeholder="Enter your license number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseCountry">License Issuing Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="licenseCountry">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="nz">New Zealand</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Upload Driver's License Photo</Label>
              <div className="rounded-lg border border-dashed p-6 text-center">
                <User className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop your license photo, or <span className="text-purple-500 cursor-pointer">browse</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Supported formats: JPG, PNG, PDF. Max size: 5MB</p>
                <Input id="photo" type="file" className="hidden" />
              </div>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Verification Required</h4>
                  <p className="text-sm">
                    Please ensure all information matches your driver's license exactly. Discrepancies may result in
                    your IDP being invalid.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)}>
              Continue
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Complete your IDP purchase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <span>{idpType === "standard" ? "Standard IDP" : "Premium IDP"}</span>
                  <span>${idpType === "standard" ? "49.99" : "79.99"}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Processing Fee</span>
                  <span>$4.99</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${idpType === "standard" ? "54.98" : "84.98"}</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="Enter name as it appears on card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <div className="relative">
                      <Input id="expiry" placeholder="MM/YY" />
                      <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="paypal" className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">You will be redirected to PayPal to complete your purchase.</p>
                  <Button className="mt-4">Continue with PayPal</Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Secure Payment</h4>
                  <p className="text-sm">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button>Complete Purchase</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
