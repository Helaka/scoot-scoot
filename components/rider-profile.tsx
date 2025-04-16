"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { VerificationSection } from "@/components/verification/verification-section"
import { VerificationHistory } from "@/components/verification/verification-history"

export function RiderProfile({ isDemo }: { isDemo?: boolean }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")

  const handleBackToDashboard = () => {
    router.push(`/rider-dashboard${isDemo ? "?demo=true" : ""}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBackToDashboard} className="mb-4">
          ← Back to Dashboard
        </Button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
            <Camera className="h-4 w-4" />
            <span className="sr-only">Change profile picture</span>
          </Button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  Rider
                </Badge>
              </div>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <Button className="w-full md:w-auto" size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <VerificationSection />

      {/* Verification History */}
      <VerificationHistory />

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="flex items-center justify-between mt-1 rounded-md border px-3 py-2">
                    <span>John Doe</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center justify-between mt-1 rounded-md border px-3 py-2">
                    <span>john.doe@example.com</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center justify-between mt-1 rounded-md border px-3 py-2">
                    <span>+1 (555) 123-4567</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="flex items-center justify-between mt-1 rounded-md border px-3 py-2">
                    <span>January 15, 1990</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Your current address details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-md border px-4 py-3">
                <div>
                  <p className="font-medium">123 Main Street, Apt 4B</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA 94103</p>
                  <p className="text-sm text-muted-foreground">United States</p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment, Notifications, and Security tabs (placeholder content) */}
        <TabsContent value="payment" className="space-y-4">
          <p>Payment methods and billing information will be displayed here.</p>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <p>Notification preferences will be displayed here.</p>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <p>Security settings will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
