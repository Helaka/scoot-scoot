"use client"

import { useState } from "react"
import { DollarSign, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

interface QuickPriceAdjustmentProps {
  originalPrice: number
  onPriceChange: (newPrice: number) => void
}

export function QuickPriceAdjustment({ originalPrice, onPriceChange }: QuickPriceAdjustmentProps) {
  const [adjustmentType, setAdjustmentType] = useState<"fixed" | "percentage">("fixed")
  const [adjustmentValue, setAdjustmentValue] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  const calculateNewPrice = (): number => {
    const value = Number.parseFloat(adjustmentValue)
    if (isNaN(value)) return originalPrice

    if (adjustmentType === "fixed") {
      return value
    } else {
      // Percentage discount
      return originalPrice * (1 - value / 100)
    }
  }

  const handleApply = () => {
    const newPrice = calculateNewPrice()
    onPriceChange(newPrice)
    setIsOpen(false)
    toast({
      title: "Price adjusted",
      description: `Price updated to $${newPrice.toFixed(2)}`,
    })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Adjust Price
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Quick Price Adjustment</h4>
            <p className="text-sm text-muted-foreground">Adjust the price for this booking only.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="original-price">Original Price</Label>
              <div className="col-span-2 flex items-center">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <Input id="original-price" value={originalPrice.toFixed(2)} readOnly className="bg-muted" />
              </div>
            </div>
            <RadioGroup
              defaultValue="fixed"
              value={adjustmentType}
              onValueChange={(value) => setAdjustmentType(value as "fixed" | "percentage")}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">Fixed Price</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage">Percentage Off</Label>
              </div>
            </RadioGroup>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="adjustment-value">{adjustmentType === "fixed" ? "New Price" : "Discount %"}</Label>
              <div className="col-span-2 flex items-center">
                {adjustmentType === "fixed" ? (
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                ) : (
                  <Percent className="mr-1 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  id="adjustment-value"
                  value={adjustmentValue}
                  onChange={(e) => setAdjustmentValue(e.target.value)}
                  placeholder={adjustmentType === "fixed" ? "0.00" : "0"}
                  type="number"
                  step={adjustmentType === "fixed" ? "0.01" : "1"}
                  min={adjustmentType === "fixed" ? "0" : "0"}
                  max={adjustmentType === "percentage" ? "100" : undefined}
                />
              </div>
            </div>
            {adjustmentValue && (
              <div className="grid grid-cols-3 items-center gap-4">
                <Label>New Price</Label>
                <div className="col-span-2 font-medium">${calculateNewPrice().toFixed(2)}</div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
