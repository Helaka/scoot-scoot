"use client"
import { Shield, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InsuranceOption {
  id: string
  name: string
  price: number
  coverageLimit: number
  description: string
  recommended?: boolean
}

interface InsuranceSelectionProps {
  onSelect: (insuranceId: string | null) => void
  selectedInsurance: string | null
}

export function InsuranceSelection({ onSelect, selectedInsurance }: InsuranceSelectionProps) {
  // Insurance options - these would typically come from the shop's offerings
  const insuranceOptions: InsuranceOption[] = [
    {
      id: "none",
      name: "No Insurance",
      price: 0,
      coverageLimit: 0,
      description: "You'll be responsible for all damages",
    },
    {
      id: "basic",
      name: "Basic Coverage",
      price: 15,
      coverageLimit: 500,
      description: "Covers damages to your rented scooter only",
      recommended: true,
    },
    {
      id: "premium",
      name: "Premium Coverage",
      price: 25,
      coverageLimit: 1000,
      description: "Covers your scooter and damage to other riders",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Accident Insurance</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Info className="h-4 w-4" />
                <span className="sr-only">Insurance Info</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Insurance is provided by the shop and covers accidental damage to the scooter. A one-time fee is added
                to your rental.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {insuranceOptions.map((option) => (
          <Card
            key={option.id}
            className={`relative cursor-pointer transition-all ${
              selectedInsurance === option.id
                ? "border-2 border-yellow-500 dark:border-yellow-600 shadow-md"
                : "hover:border-yellow-200 dark:hover:border-yellow-800"
            }`}
            onClick={() => onSelect(option.id)}
          >
            {option.recommended && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-tl-none rounded-br-none bg-yellow-500 text-black">Recommended</Badge>
              </div>
            )}
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-full p-2 ${
                    selectedInsurance === option.id ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-muted"
                  }`}
                >
                  <Shield
                    className={`h-5 w-5 ${
                      selectedInsurance === option.id ? "text-yellow-600 dark:text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{option.name}</h4>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  {option.coverageLimit > 0 && <p className="text-sm mt-1">Coverage up to ${option.coverageLimit}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-3 flex justify-between items-center">
              <div className="font-semibold">{option.price > 0 ? `$${option.price}` : "Free"}</div>
              {selectedInsurance === option.id && (
                <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-1">
                  <Check className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
