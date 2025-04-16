"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Check, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RiderInsurance() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // Mock data for insurance plans
  const insurancePlans = [
    {
      id: "basic",
      name: "Basic Coverage",
      price: 15,
      coverageLimit: 500,
      description: "Covers damages to your rented scooter only",
      features: [
        "Covers damages to the rented scooter",
        "Up to $500 in damage coverage",
        "No deductible",
        "Easy claim process through the app",
      ],
    },
    {
      id: "premium",
      name: "Premium Coverage",
      price: 25,
      coverageLimit: 1000,
      description: "Covers your scooter and damage to other riders",
      features: [
        "Covers damages to the rented scooter",
        "Covers damages to other riders/scooters",
        "Up to $1,000 in total damage coverage",
        "No deductible",
        "Priority claim processing",
      ],
      recommended: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Accident Insurance</h1>
        <p className="text-muted-foreground">Protect yourself against unexpected damages.</p>
      </div>

      {/* Insurance Explainer */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-shrink-0 rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/30">
              <Shield className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Simple Accident Protection</h3>
              <p className="text-muted-foreground mb-4">
                Our shop-provided insurance offers simple, affordable protection against accidental damages to your
                rented scooter. For a small one-time fee, you can ride with peace of mind knowing you're covered in case
                of an accident.
              </p>
              <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Insurance is provided by the individual shop you rent from. Coverage details may vary slightly between
                  shops.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Plans */}
      <div className="grid gap-6 md:grid-cols-2">
        {insurancePlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden ${selectedPlan === plan.id ? "border-2 border-yellow-500 dark:border-yellow-600" : ""}`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-tl-none rounded-br-none bg-yellow-500 text-black">Recommended</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground ml-1">one-time fee</span>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.recommended ? "bg-yellow-500 hover:bg-yellow-600 text-black" : ""}`}
                variant={plan.recommended ? "default" : "outline"}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/rider-discover">Continue Without Insurance</Link>
        </Button>
        <Button className="gap-1" disabled={!selectedPlan}>
          Continue with Selected Plan
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1">What does the insurance cover?</h4>
            <p className="text-sm text-muted-foreground">
              The insurance covers accidental damage to the scooter you rent. The Premium plan also covers damages you
              may cause to other riders or their scooters in an accident.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">How do I make a claim?</h4>
            <p className="text-sm text-muted-foreground">
              In case of an accident, report it immediately through the app. Take photos of the damage and submit them
              with your claim. The shop will review your claim and process it accordingly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Is there a deductible?</h4>
            <p className="text-sm text-muted-foreground">
              No, there is no deductible for either plan. However, damages exceeding the coverage limit will be your
              responsibility.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
