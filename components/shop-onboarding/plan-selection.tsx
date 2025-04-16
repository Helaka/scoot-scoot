"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Check, CreditCard, Calendar, Lock } from "lucide-react"

interface PlanSelectionProps {
  initialData: {
    planType: string
    paymentMethod: string
    cardDetails: any
  }
  onComplete: (data: any) => void
  testMode?: boolean
}

export default function PlanSelection({ initialData, onComplete, testMode = false }: PlanSelectionProps) {
  const [planType, setPlanType] = useState(initialData.planType)
  const [cardNumber, setCardNumber] = useState(testMode ? "4242 4242 4242 4242" : "")
  const [cardName, setCardName] = useState(testMode ? "Test User" : "")
  const [expiryDate, setExpiryDate] = useState(testMode ? "12/25" : "")
  const [cvv, setCvv] = useState(testMode ? "123" : "")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "$12.99",
      trial: "7-day",
      features: ["1-5 scooters", "1 location", "Up to 3 users/employees", "Basic reporting", "Email support"],
    },
    {
      id: "standard",
      name: "Standard Plan",
      price: "$24.99",
      trial: "14-day",
      features: [
        "6-15 scooters",
        "1 location",
        "4-8 users/employees",
        "Advanced reporting",
        "Priority email support",
        "Phone support",
      ],
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: "$49.99",
      trial: "30-day",
      features: [
        "16+ scooters",
        "2-3 locations",
        "9-20 users/employees",
        "Custom reporting",
        "Priority support",
        "Dedicated account manager",
        "API access",
      ],
    },
  ]

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (!/^\d{4}( \d{4}){3}$/.test(cardNumber)) {
      newErrors.cardNumber = "Invalid card number format"
    }

    if (!cardName.trim()) {
      newErrors.cardName = "Name on card is required"
    }

    if (!expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date format (MM/YY)"
    }

    if (!cvv.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "Invalid CVV"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (testMode || validate()) {
      setIsLoading(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsLoading(false)
        onComplete({
          planType,
          paymentMethod: "card",
          cardDetails: {
            last4: cardNumber.slice(-4),
            expiry: expiryDate,
          },
        })
      }, 1500)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  const selectedPlan = plans.find((p) => p.id === planType) || plans[0]

  return (
    <Card className="w-full bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30 mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Plan</CardTitle>
        <CardDescription>
          Select the plan that best fits your business needs. All plans include a free trial.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={planType} onValueChange={setPlanType} className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border p-4 ${planType === plan.id ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-200 dark:border-gray-700"}`}
            >
              {planType === plan.id && (
                <div className="absolute top-4 right-4 h-5 w-5 text-purple-600 dark:text-purple-400">
                  <Check className="h-5 w-5" />
                </div>
              )}
              <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
              <Label htmlFor={plan.id} className="flex flex-col gap-1 cursor-pointer">
                <span className="font-semibold">{plan.name}</span>
                <span className="text-xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
                </span>
                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {plan.trial} free trial
                </span>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-4">Payment Information</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Lock className="h-4 w-4 inline mr-1" />
            Your card will not be charged until after your {selectedPlan.trial} free trial ends.
          </p>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                className={errors.cardNumber ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                placeholder="John Smith"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className={errors.cardName ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                  className={errors.expiryDate ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={4}
                  className={errors.cvv ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
              </div>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : `Continue with ${selectedPlan.name}`}
        </Button>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  )
}
