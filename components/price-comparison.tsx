"use client"

import { useState } from "react"
import { DollarSign, BarChart2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Scooter } from "@/types/scooter-types"

interface PriceComparisonProps {
  scooters: Scooter[]
}

export function PriceComparison({ scooters }: PriceComparisonProps) {
  const [activeTab, setActiveTab] = useState("hourly")

  // Group scooters by model
  const scootersByModel: Record<string, Scooter[]> = {}
  scooters.forEach((scooter) => {
    if (!scootersByModel[scooter.model]) {
      scootersByModel[scooter.model] = []
    }
    scootersByModel[scooter.model].push(scooter)
  })

  // Group scooters by engine size
  const scootersByEngineSize: Record<string, Scooter[]> = {}
  scooters.forEach((scooter) => {
    if (!scooter.engineSize) return

    const sizeCategory = scooter.engineSize <= 125 ? "100-125cc" : scooter.engineSize <= 150 ? "126-150cc" : "151cc+"

    if (!scootersByEngineSize[sizeCategory]) {
      scootersByEngineSize[sizeCategory] = []
    }
    scootersByEngineSize[sizeCategory].push(scooter)
  })

  // Calculate average prices
  const calculateAveragePrice = (
    scooters: Scooter[],
    priceType: "hourlyRate" | "dailyRate" | "weekendRate" | "weeklyRate",
  ) => {
    const prices = scooters.filter((s) => s.pricing && s.pricing[priceType]).map((s) => s.pricing![priceType]!)

    if (prices.length === 0) return 0
    return prices.reduce((sum, price) => sum + price, 0) / prices.length
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BarChart2 className="mr-2 h-4 w-4" />
          Price Comparison
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Scooter Price Comparison</DialogTitle>
          <DialogDescription>Compare pricing across your fleet by model and engine size</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="hourly" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hourly">Hourly Rates</TabsTrigger>
            <TabsTrigger value="daily">Daily Rates</TabsTrigger>
            <TabsTrigger value="weekend">Weekend Rates</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Rates</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="space-y-4">
            <h3 className="text-lg font-medium mt-4">By Model</h3>
            <div className="space-y-3">
              {Object.entries(scootersByModel).map(([model, modelScooters]) => (
                <div key={model} className="flex items-center justify-between">
                  <span>{model}</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {calculateAveragePrice(modelScooters, "hourlyRate").toFixed(2)}/hour
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-medium mt-6">By Engine Size</h3>
            <div className="space-y-3">
              {Object.entries(scootersByEngineSize).map(([sizeCategory, sizeScooters]) => (
                <div key={sizeCategory} className="flex items-center justify-between">
                  <span>{sizeCategory}</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {calculateAveragePrice(sizeScooters, "hourlyRate").toFixed(2)}/hour
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="daily" className="space-y-4">
            <h3 className="text-lg font-medium mt-4">By Model</h3>
            <div className="space-y-3">
              {Object.entries(scootersByModel).map(([model, modelScooters]) => (
                <div key={model} className="flex items-center justify-between">
                  <span>{model}</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {calculateAveragePrice(modelScooters, "dailyRate").toFixed(2)}/day
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-medium mt-6">By Engine Size</h3>
            <div className="space-y-3">
              {Object.entries(scootersByEngineSize).map(([sizeCategory, sizeScooters]) => (
                <div key={sizeCategory} className="flex items-center justify-between">
                  <span>{sizeCategory}</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {calculateAveragePrice(sizeScooters, "dailyRate").toFixed(2)}/day
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Similar content for weekend and weekly tabs */}
          <TabsContent value="weekend" className="space-y-4">
            {/* Weekend rates content */}
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            {/* Weekly rates content */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
