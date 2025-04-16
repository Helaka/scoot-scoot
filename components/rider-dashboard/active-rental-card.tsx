"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ActiveRentalCardProps {
  scooterName: string
  scooterImage: string
  timeRemaining: {
    hours: number
    minutes: number
    percentage: number
  }
  returnLocation: string
  isLowTime?: boolean
  onExtend?: () => void
  onViewDetails?: () => void
}

export function ActiveRentalCard({
  scooterName,
  scooterImage,
  timeRemaining,
  returnLocation,
  isLowTime = false,
  onExtend,
  onViewDetails,
}: ActiveRentalCardProps) {
  const formattedTime = `${timeRemaining.hours}h ${timeRemaining.minutes}m`

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={scooterImage || "/placeholder.svg"} alt={scooterName} className="h-48 w-full object-cover" />
        {isLowTime && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Low Time
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">{scooterName}</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
                Time Remaining
              </span>
              <span className="font-medium">{formattedTime}</span>
            </div>
            <Progress value={timeRemaining.percentage} className={isLowTime ? "text-red-500" : ""} />
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Return Location</p>
              <p className="text-sm text-muted-foreground">{returnLocation}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-6 pt-0">
        <Button onClick={onExtend} className="flex-1">
          Extend Rental
        </Button>
        <Button variant="outline" onClick={onViewDetails} className="flex-1">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
