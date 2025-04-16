"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Filter,
  Users,
  Calendar,
  User,
  Bike,
  Coffee,
  Camera,
  Sunset,
  Mountain,
  MapPin,
  Clock,
  Star,
} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export type FilterSettings = {
  radius: number
  showRiders: boolean
  showGroups: boolean
  showPassengers: boolean
  availableOnly: boolean
  interests: {
    longRides: boolean
    scenicRoutes: boolean
    photography: boolean
    sunsetRides: boolean
    cafeHopping: boolean
    mountainRides: boolean
    nightRides: boolean
    cityTours: boolean
    beachRides: boolean
  }
  riderExperience: {
    beginner: boolean
    intermediate: boolean
    expert: boolean
  }
  rideLength: {
    short: boolean
    medium: boolean
    long: boolean
  }
  timeOfDay: {
    morning: boolean
    afternoon: boolean
    evening: boolean
    night: boolean
  }
}

type ConsolidatedFiltersProps = {
  settings: FilterSettings
  onChange: (settings: FilterSettings) => void
  onReset: () => void
  onApply: () => void
  activeFiltersCount: number
}

export function ConsolidatedFilters({
  settings,
  onChange,
  onReset,
  onApply,
  activeFiltersCount
}: ConsolidatedFiltersProps) {
  const [activeTab, setActiveTab] = useState("visibility")
  
  const updateSettings = (updates: Partial<FilterSettings>) => {
    onChange({ ...settings, ...updates })
  }
  
  const updateInterests = (interest: keyof FilterSettings['interests'], value: boolean) => {
    onChange({
      ...settings,
      interests: {
        ...settings.interests,
        [interest]: value
      }
    })
  }
  
  const updateRiderExperience = (level: keyof FilterSettings['riderExperience'], value: boolean) => {
    onChange({
      ...settings,
      riderExperience: {
        ...settings.riderExperience,
        [level]: value
      }
    })
  }
  
  const updateRideLength = (length: keyof FilterSettings['rideLength'], value: boolean) => {
    onChange({
      ...settings,
      rideLength: {
        ...settings.rideLength,
        [length]: value
      }
    })
  }
  
  const updateTimeOfDay = (time: keyof FilterSettings['timeOfDay'], value: boolean) => {
    onChange({
      ...settings,
      timeOfDay: {
        ...settings.timeOfDay,
        [time]: value
      }
    })
  }
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-300 dark:border-gray-700 shadow-md relative"
        >
          <Filter className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Riders & Rides</SheetTitle>
        </SheetHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="visibility" className="text-xs">
              Visibility
            </TabsTrigger>
            <TabsTrigger value="interests" className="text-xs">
              Interests
            </TabsTrigger>
            <TabsTrigger value="experience" className="text-xs">
              Experience
            </TabsTrigger>
            <TabsTrigger value="time" className="text-xs">
              Time
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(100vh-240px)]">
            <TabsContent value="visibility" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Search Radius</h3>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[settings.radius]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => updateSettings({ radius: value[0] })}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">{settings.radius} mi</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Show on Map</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Riders</span>
                    </div>
                    <Switch 
                      checked={settings.showRiders} 
                      onCheckedChange={(checked) => updateSettings({ showRiders: checked })} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Group Rides</span>
                    </div>
                    <Switch 
                      checked={settings.showGroups} 
                      onCheckedChange={(checked) => updateSettings({ showGroups: checked })} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Passengers</span>
                    </div>
                    <Switch 
                      checked={settings.showPassengers} 
                      onCheckedChange={(checked) => updateSettings({ showPassengers: checked })} 
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Available Riders Only</span>
                  </div>
                  <Switch 
                    checked={settings.availableOnly} 
                    onCheckedChange={(checked) => updateSettings({ availableOnly: checked })} 
                  />
                </div>
                <p className="text-xs text-muted-foreground">Only show riders who are currently available to join rides</p>
              </div>
            </TabsContent>
            
            <TabsContent value="interests" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Riding Interests</h3>
                <p className="text-xs text-muted-foreground">Find riders who share your interests</p>
                
                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.longRides} 
                      onCheckedChange={(checked) => updateInterests('longRides', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Bike className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Long Rides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.scenicRoutes} 
                      onCheckedChange={(checked) => updateInterests('scenicRoutes', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Scenic Routes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.photography} 
                      onCheckedChange={(checked) => updateInterests('photography', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-indigo-500" />
                      <span className="text-sm">Photography</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.sunsetRides} 
                      onCheckedChange={(checked) => updateInterests('sunsetRides', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Sunset className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Sunset Rides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.cafeHopping} 
                      onCheckedChange={(checked) => updateInterests('cafeHopping', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-brown-500" />
                      <span className="text-sm">Café Hopping</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.mountainRides} 
                      onCheckedChange={(checked) => updateInterests('mountainRides', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-green-700" />
                      <span className="text-sm">Mountain Rides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.nightRides} 
                      onCheckedChange={(checked) => updateInterests('nightRides', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Night Rides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.cityTours} 
                      onCheckedChange={(checked) => updateInterests('cityTours', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm">City Tours</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.interests.beachRides} 
                      onCheckedChange={(checked) => updateInterests('beachRides', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">Beach Rides</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Rider Experience</h3>
                <p className="text-xs text-muted-foreground">Find riders with similar experience levels</p>
                
                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.riderExperience.beginner} 
                      onCheckedChange={(checked) => updateRiderExperience('beginner', checked)} 
                    />
                    <span className="text-sm">Beginner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.riderExperience.intermediate} 
                      onCheckedChange={(checked) => updateRiderExperience('intermediate', checked)} 
                    />
                    <span className="text-sm">Intermediate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.riderExperience.expert} 
                      onCheckedChange={(checked) => updateRiderExperience('expert', checked)} 
                    />
                    <span className="text-sm">Expert</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Ride Length</h3>
                <p className="text-xs text-muted-foreground">Filter by preferred ride duration</p>
                
                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.rideLength.short} 
                      onCheckedChange={(checked) => updateRideLength('short', checked)} 
                    />
                    <span className="text-sm\">Short (< 30 min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.rideLength.medium} 
                      onCheckedChange={(checked) => updateRideLength('medium', checked)} 
                    />
                    <span className="text-sm">Medium (30-60 min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.rideLength.long} 
                      onCheckedChange={(checked) => updateRideLength('long', checked)} 
                    />
                    <span className="text-sm">Long (> 60 min)</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="time" className="mt-0 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Time of Day</h3>
                <p className="text-xs text-muted-foreground">Find rides at your preferred time</p>
                
                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.timeOfDay.morning} 
                      onCheckedChange={(checked) => updateTimeOfDay('morning', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Morning (6am-12pm)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.timeOfDay.afternoon} 
                      onCheckedChange={(checked) => updateTimeOfDay('afternoon', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Afternoon (12pm-5pm)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.timeOfDay.evening} 
                      onCheckedChange={(checked) => updateTimeOfDay('evening', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Evening (5pm-9pm)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={settings.timeOfDay.night} 
                      onCheckedChange={(checked) => updateTimeOfDay('night', checked)} 
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Night (9pm-6am)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        <SheetFooter className="mt-4 sm:justify-between">
          <Button 
            variant="outline" 
            onClick={onReset}
          >
            Reset All
          </Button>
          <Button onClick={onApply}>
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
