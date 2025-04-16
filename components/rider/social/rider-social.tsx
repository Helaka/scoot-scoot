"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialMapView } from "./social-map-view"
import { NearbyRidersList } from "./nearby-riders-list"
import { PassengerRequests } from "./passenger-requests"
import { GroupRides } from "./group-rides"
import { Button } from "@/components/ui/button"
import { Users, MapPin, User, Calendar, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SocialProfileSetup } from "./social-profile-setup"

export function RiderSocial() {
  const [activeTab, setActiveTab] = useState("map")
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [showProfileSetup, setShowProfileSetup] = useState(false)

  // If profile is not complete, show the profile setup prompt
  if (!isProfileComplete && !showProfileSetup) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ScootScoot Social</h1>
          <p className="text-muted-foreground">Connect with other riders, join group rides, and more.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Complete Your Social Profile</CardTitle>
            <CardDescription>
              Before you can use ScootScoot Social, you need to set up your social profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Your social profile helps other riders get to know you and find common interests.</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">What You'll Need:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-500" />
                    <span>A clear profile photo of your face</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-purple-500" />
                    <span>Your riding preferences and interests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    <span>Location sharing permissions</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Benefits:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>Find riding buddies with similar interests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>Join and create group rides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    <span>Discover new routes and destinations</span>
                  </li>
                </ul>
              </div>
            </div>
            <Button className="w-full" onClick={() => setShowProfileSetup(true)}>
              Set Up Your Social Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If user clicked to set up profile, show the profile setup component
  if (showProfileSetup) {
    return (
      <SocialProfileSetup
        onComplete={() => {
          setIsProfileComplete(true)
          setShowProfileSetup(false)
        }}
        onCancel={() => setShowProfileSetup(false)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ScootScoot Social</h1>
        <p className="text-muted-foreground">Connect with other riders, join group rides, and more.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="map" className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Map View</span>
            <span className="sm:hidden">Map</span>
          </TabsTrigger>
          <TabsTrigger value="riders" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Nearby Riders</span>
            <span className="sm:hidden">Riders</span>
          </TabsTrigger>
          <TabsTrigger value="passengers" className="flex items-center gap-1 relative">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Passengers</span>
            <span className="sm:hidden">Pass.</span>
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-yellow-500 text-black">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Group Rides</span>
            <span className="sm:hidden">Groups</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="m-0">
          <SocialMapView />
        </TabsContent>

        <TabsContent value="riders" className="m-0">
          <NearbyRidersList />
        </TabsContent>

        <TabsContent value="passengers" className="m-0">
          <PassengerRequests />
        </TabsContent>

        <TabsContent value="groups" className="m-0">
          <GroupRides />
        </TabsContent>
      </Tabs>
    </div>
  )
}
