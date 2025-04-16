"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bike, Coffee, Camera, Sunset, Mountain, MessageCircle, Star, MapPin, Calendar, Users } from "lucide-react"
import { CountryFlag } from "./country-flag"

interface RiderProfileModalProps {
  rider: any
  onClose: () => void
}

export function RiderProfileModal({ rider, onClose }: RiderProfileModalProps) {
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "riding":
        return "bg-blue-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "riding":
        return "Currently Riding"
      case "busy":
        return "Busy"
      default:
        return "Unknown"
    }
  }

  // Get interest icon
  const getInterestIcon = (interest: string) => {
    switch (interest) {
      case "longRides":
        return <Bike className="h-4 w-4" />
      case "scenicRoutes":
        return <Mountain className="h-4 w-4" />
      case "photography":
        return <Camera className="h-4 w-4" />
      case "sunsetRides":
        return <Sunset className="h-4 w-4" />
      case "cafeHopping":
        return <Coffee className="h-4 w-4" />
      case "mountainRides":
        return <Mountain className="h-4 w-4" />
      default:
        return null
    }
  }

  // Get interest text
  const getInterestText = (interest: string) => {
    switch (interest) {
      case "longRides":
        return "Long Rides"
      case "scenicRoutes":
        return "Scenic Routes"
      case "photography":
        return "Photography"
      case "sunsetRides":
        return "Sunset Rides"
      case "cafeHopping":
        return "Café Hopping"
      case "mountainRides":
        return "Mountain Rides"
      default:
        return interest
    }
  }

  // Mock data for rider's recent activity
  const recentActivity = [
    {
      type: "ride",
      title: "Completed a ride",
      location: "Patong Beach",
      date: "Yesterday",
    },
    {
      type: "group",
      title: "Joined a group ride",
      location: "Mountain Trail Adventure",
      date: "3 days ago",
    },
    {
      type: "review",
      title: "Left a review",
      location: "Jungle Scooters Pai",
      date: "1 week ago",
    },
  ]

  // Get country flag emoji from country code
  const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={rider.avatar} alt={rider.name} />
                <AvatarFallback>{rider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(rider.status)}`}
              />
              {rider.country && (
                <div className="absolute -top-1 -left-1 h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <CountryFlag countryCode={rider.country} size="sm" showTooltip={false} />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-xl">{rider.name}</DialogTitle>
                {rider.country && <CountryFlag countryCode={rider.country} size="lg" />}
              </div>
              <DialogDescription>{rider.handle}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About</h4>
            <p className="text-sm">{rider.bio}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Riding Interests</h4>
            <div className="flex flex-wrap gap-2">
              {rider.interests.map((interest) => (
                <div key={interest} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                  {getInterestIcon(interest)}
                  <span>{getInterestText(interest)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Activity</h4>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {activity.type === "ride" && <Bike className="h-4 w-4 text-blue-500" />}
                  {activity.type === "group" && <Users className="h-4 w-4 text-purple-500" />}
                  {activity.type === "review" && <Star className="h-4 w-4 text-yellow-500" />}
                  <div>
                    <p>{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.location} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Location</h4>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{rider.distance} miles away</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1 gap-1" onClick={onClose}>
            <Calendar className="h-4 w-4" />
            Invite to Ride
          </Button>
          <Button className="flex-1 gap-1">
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
