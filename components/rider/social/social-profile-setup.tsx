"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, Check, AlertCircle } from "lucide-react"

interface SocialProfileSetupProps {
  onComplete: () => void
  onCancel: () => void
}

export function SocialProfileSetup({ onComplete, onCancel }: SocialProfileSetupProps) {
  const [step, setStep] = useState(1)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [bio, setBio] = useState("")
  const [interests, setInterests] = useState({
    longRides: false,
    scenicRoutes: false,
    photography: false,
    sunsetRides: false,
    cafeHopping: false,
    mountainRides: false,
  })
  const [locationSharing, setLocationSharing] = useState(true)
  const [showAsAvailable, setShowAsAvailable] = useState(true)
  const [allowMessages, setAllowMessages] = useState(true)

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, we would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  // Handle interest toggle
  const handleInterestToggle = (interest: string) => {
    setInterests({
      ...interests,
      [interest]: !interests[interest as keyof typeof interests],
    })
  }

  // Check if form is valid for current step
  const isStepValid = () => {
    if (step === 1) {
      return !!profileImage
    } else if (step === 2) {
      return bio.length >= 10 && bio.length <= 150
    } else if (step === 3) {
      return Object.values(interests).some((value) => value)
    }
    return true
  }

  // Handle next step
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  // Handle previous step
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      onCancel()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Set Up Your Social Profile</h1>
        <p className="text-muted-foreground">Complete your profile to connect with other riders.</p>
      </div>

      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s < step
                  ? "bg-green-500 text-white"
                  : s === step
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {s < step ? <Check className="h-4 w-4" /> : s}
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              {s === 1 && "Photo"}
              {s === 2 && "Bio"}
              {s === 3 && "Interests"}
              {s === 4 && "Privacy"}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
            <CardDescription>Add a clear photo of your face. This helps other riders recognize you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center">
              <div className="relative mb-4">
                {profileImage ? (
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback>
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                </label>
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm font-medium">Photo Requirements:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Clear photo of your face</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Good lighting</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    <span>No group photos</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    <span>No landscape or object photos</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              Cancel
            </Button>
            <Button onClick={handleNextStep} disabled={!isStepValid()}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Bio</CardTitle>
            <CardDescription>Tell other riders a bit about yourself and your riding style.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (10-150 characters)</Label>
              <Textarea
                id="bio"
                placeholder="I'm an adventure seeker who loves exploring new routes and finding hidden gems..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="resize-none"
                rows={4}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{bio.length} characters</span>
                <span>{150 - bio.length} remaining</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Bio Tips:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Mention your riding experience</span>
                </li>
                <li className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Share what kind of rides you enjoy</span>
                </li>
                <li className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Include languages you speak</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button onClick={handleNextStep} disabled={!isStepValid()}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Riding Interests</CardTitle>
            <CardDescription>
              Select the types of rides you enjoy. This helps match you with like-minded riders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="long-rides"
                  checked={interests.longRides}
                  onCheckedChange={() => handleInterestToggle("longRides")}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="long-rides"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Long Rides
                  </label>
                  <p className="text-xs text-muted-foreground">Extended journeys, day trips</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="scenic-routes"
                  checked={interests.scenicRoutes}
                  onCheckedChange={() => handleInterestToggle("scenicRoutes")}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="scenic-routes"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Scenic Routes
                  </label>
                  <p className="text-xs text-muted-foreground">Beautiful landscapes, viewpoints</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="photography"
                  checked={interests.photography}
                  onCheckedChange={() => handleInterestToggle("photography")}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="photography"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Photography
                  </label>
                  <p className="text-xs text-muted-foreground">Photo stops, Instagram spots</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="sunset-rides"
                  checked={interests.sunsetRides}
                  onCheckedChange={() => handleInterestToggle("sunsetRides")}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="sunset-rides"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sunset Rides
                  </label>
                  <p className="text-xs text-muted-foreground">Evening cruises, golden hour</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="cafe-hopping"
                  checked={interests.cafeHopping}
                  onCheckedChange={() => handleInterestToggle("cafeHopping")}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="cafe-hopping"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Café Hopping
                  </label>
                  <p className="text-xs text-muted-foreground">Coffee breaks, local eateries</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="mountain-rides"
                  checked={interests.mountainRides}
                  onCheckedChange={() => handleInterestToggle("mountainRides")}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="mountain-rides"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mountain Rides
                  </label>
                  <p className="text-xs text-muted-foreground">Hill climbs, mountain views</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button onClick={handleNextStep} disabled={!isStepValid()}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control how you appear to other riders and who can contact you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="location-sharing">Location Sharing</Label>
                <p className="text-xs text-muted-foreground">Allow other riders to see your approximate location</p>
              </div>
              <Switch id="location-sharing" checked={locationSharing} onCheckedChange={setLocationSharing} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-available">Show as Available</Label>
                <p className="text-xs text-muted-foreground">Let others know when you're available for rides</p>
              </div>
              <Switch id="show-available" checked={showAsAvailable} onCheckedChange={setShowAsAvailable} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-messages">Allow Messages</Label>
                <p className="text-xs text-muted-foreground">Receive messages from other verified riders</p>
              </div>
              <Switch id="allow-messages" checked={allowMessages} onCheckedChange={setAllowMessages} />
            </div>

            <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4 text-sm text-yellow-800 dark:text-yellow-200">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 text-yellow-800 dark:text-yellow-200" />
                <div>
                  <p className="font-medium">Privacy Note</p>
                  <p className="mt-1">
                    Your profile will only be visible to other verified ScootScoot users. You can change these settings
                    at any time from your profile.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button onClick={handleNextStep}>Complete Setup</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
