"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Bell, Shield, History, User, LogOut, CheckCircle2, AlertCircle, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

export function RiderProfile() {
  const [activeTab, setActiveTab] = useState("personal")

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "January 2023",
    verificationStatus: "Verified",
    // Profile completion tracking
    profileCompletion: {
      percentage: 60,
      missingItems: ["passport", "address", "emergency contact", "preferred payment method"],
    },
  }

  // Profile completion items
  const completionItems = [
    { id: "personal", label: "Personal Info", completed: true },
    { id: "phone", label: "Phone Verified", completed: true },
    { id: "email", label: "Email Verified", completed: true },
    { id: "passport", label: "Passport Verified", completed: false },
    { id: "address", label: "Address Added", completed: false },
    { id: "payment", label: "Payment Method", completed: true },
    { id: "emergency", label: "Emergency Contact", completed: false },
    { id: "preferences", label: "Preferences Set", completed: true },
  ]

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      {/* Profile completion banner */}
      <Card className="mb-6 border-purple-200 bg-purple-50 dark:bg-purple-900/10 dark:border-purple-800/30">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-purple-800 dark:text-purple-300 flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Completion
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">
                    {user.profileCompletion.percentage}% Complete
                  </span>
                  <span className="text-purple-700 dark:text-purple-300">
                    {completionItems.filter((item) => item.completed).length}/{completionItems.length} Items
                  </span>
                </div>
                <Progress
                  value={user.profileCompletion.percentage}
                  className="h-2 bg-purple-200 dark:bg-purple-800/50"
                  indicatorClassName="bg-purple-600 dark:bg-purple-400"
                />
              </div>
            </div>
            <Button
              variant="default"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setActiveTab("personal")}
            >
              Complete Profile
            </Button>
          </div>

          {/* Completion checklist */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {completionItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-2 text-sm rounded-md px-2 py-1",
                  item.completed
                    ? "text-green-700 bg-green-100 dark:bg-green-900/20 dark:text-green-300"
                    : "text-amber-700 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300",
                )}
              >
                {item.completed ? (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-purple-200">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 rounded-full bg-purple-600 text-white p-1 shadow-md hover:bg-purple-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    {user.verificationStatus}
                  </div>
                </div>

                <div className="w-full pt-4">
                  <nav className="space-y-1">
                    <Button
                      variant={activeTab === "personal" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("personal")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Personal Info
                    </Button>
                    <Button
                      variant={activeTab === "payment" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("payment")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </Button>
                    <Button
                      variant={activeTab === "notifications" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button
                      variant={activeTab === "security" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("security")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                    <Button
                      variant={activeTab === "history" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("history")}
                    >
                      <History className="mr-2 h-4 w-4" />
                      Rental History
                    </Button>
                  </nav>
                </div>

                <Button variant="outline" className="w-full mt-6">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="w-full md:w-2/3">
          {activeTab === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex gap-2">
                    <Input id="email" type="email" defaultValue={user.email} className="flex-1" />
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Verified
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input id="phone" defaultValue={user.phone} className="flex-1" />
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Verified
                    </Button>
                  </div>
                </div>

                {/* Add the passport verification section here */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="passport" className="flex items-center gap-1">
                      Passport Verification
                      <span className="text-xs text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full font-medium">
                        Required
                      </span>
                    </Label>
                  </div>
                  <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Upload Passport Photo</h4>
                          <p className="text-sm text-muted-foreground">Clear photo of your passport ID page</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                            Pending
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center gap-2 bg-white dark:bg-gray-800">
                          <Camera className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm font-medium">Passport Front Page</p>
                          <p className="text-xs text-muted-foreground text-center">
                            Upload a clear photo of your passport ID page
                          </p>
                          <Button size="sm" className="mt-2">
                            Upload Photo
                          </Button>
                        </div>

                        <div className="border rounded-md p-2 flex flex-col items-center justify-center gap-2 bg-white dark:bg-gray-800">
                          <div className="aspect-[3/4] w-full bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">No photo uploaded</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>• Photo must clearly show your full name, passport number, and expiration date</p>
                        <p>• Make sure the entire passport page is visible and well-lit</p>
                        <p>• Your information will be securely stored and verified</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="address" className="flex items-center gap-1">
                      Address
                      <span className="text-xs text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full font-medium">
                        Required
                      </span>
                    </Label>
                  </div>
                  <Input id="address" placeholder="Enter your address" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="emergency" className="flex items-center gap-1">
                      Emergency Contact
                      <span className="text-xs text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full font-medium">
                        Required
                      </span>
                    </Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input id="emergency-name" placeholder="Contact name" />
                    <Input id="emergency-phone" placeholder="Contact phone" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="marketing" />
                  <Label htmlFor="marketing">Receive marketing emails</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods and billing information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Saved payment methods */}
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-10 w-10 text-primary" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Add New Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rental Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders about upcoming and active rentals</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Special Offers</Label>
                    <p className="text-sm text-muted-foreground">Get notified about discounts and special promotions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Account Updates</Label>
                    <p className="text-sm text-muted-foreground">Important information about your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Shops Nearby</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new rental shops open in your area
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-2">Add an extra layer of security to your account</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "history" && (
            <Card>
              <CardHeader>
                <CardTitle>Rental History</CardTitle>
                <CardDescription>View your past rentals and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Past rental item */}
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Electric Scooter XR-500</h3>
                        <p className="text-sm text-muted-foreground">March 15, 2023 - March 16, 2023</p>
                        <p className="text-sm">Downtown Scooter Rentals</p>
                        <div className="mt-2 flex space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$35.00</p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          View Receipt
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Another past rental */}
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">City Cruiser S2</h3>
                        <p className="text-sm text-muted-foreground">February 28, 2023 - March 1, 2023</p>
                        <p className="text-sm">Urban Mobility Rentals</p>
                        <div className="mt-2 flex space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$28.50</p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          View Receipt
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Load More
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
