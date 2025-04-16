import { Bike, Filter, MapPin, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LookingView() {
  return (
    <div className="space-y-4 pb-20">
      {/* Search and Filter Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search location" className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs for Map and List View */}
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-2">
          {/* Map View */}
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <MapPin className="h-12 w-12 text-gray-400" />
            <div className="absolute bottom-4 right-4">
              <Button size="sm" className="h-8">
                <MapPin className="h-3 w-3 mr-1" />
                Use My Location
              </Button>
            </div>
          </div>

          {/* Nearby Scooters */}
          <h3 className="font-medium mt-4 mb-2">Nearby Scooters</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                    <Bike className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardContent className="flex-1 p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">ScootScoot #{i}00</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{(i * 0.2).toFixed(1)} miles away</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {Array(5)
                            .fill(0)
                            .map((_, j) => (
                              <Star
                                key={j}
                                className={`h-3 w-3 ${j < 4 ? "text-yellow-500" : "text-gray-300"}`}
                                fill={j < 4 ? "currentColor" : "none"}
                              />
                            ))}
                          <span className="text-xs ml-1 text-muted-foreground">(24)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">${(i * 2 + 3).toFixed(2)}/hr</span>
                        <Button size="sm" className="mt-2 h-8 w-full">
                          Rent
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-2">
          {/* List View */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">ScootScoot #{i}00</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{(i * 0.2).toFixed(1)} miles away</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">${(i * 2 + 3).toFixed(2)}/hr</span>
                      <Button size="sm" className="mt-2 h-8">
                        Rent
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <Bike className="h-4 w-4 mr-2" />
          All Scooters
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Nearest
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Highest Rated
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Lowest Price
        </Button>
      </div>
    </div>
  )
}
