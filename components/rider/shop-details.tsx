"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  Heart,
  Share2,
  MessageSquare,
  Shield,
  Info,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export function ShopDetails({ shopId }: { shopId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedScooterId = searchParams?.get("scooter")
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedTab, setSelectedTab] = useState("scooters")
  const [selectedScooter, setSelectedScooter] = useState<string | null>(selectedScooterId)

  // Mock shop data
  const shop = {
    id: shopId,
    name: "Jungle Scooters Pai",
    description:
      "The best scooter rental shop in Pai, offering a wide range of automatic and manual scooters for your adventure needs. We provide helmets, insurance options, and excellent customer service.",
    logo: "/placeholder.svg?height=50&width=50",
    coverImage: "/placeholder.svg?height=300&width=900",
    rating: 4.8,
    reviews: 124,
    location: "123 Main Street, Pai, Thailand",
    phone: "+66 123 456 789",
    hours: "8:00 AM - 8:00 PM",
    website: "https://junglescooterspai.com",
    amenities: ["Helmets Included", "Free Map", "Insurance Options", "24/7 Support", "Passport or Credit Card Deposit"],
  }

  // Mock scooter data
  const scooters = [
    {
      id: "s-1001",
      name: "Honda PCX 150cc",
      type: "Automatic",
      color: "Black",
      price: 45,
      priceUnit: "day",
      deposit: 100,
      depositType: "passport",
      image: "/placeholder.svg?height=200&width=300",
      features: ["USB Charger", "Storage Box", "ABS Braking"],
      available: true,
    },
    {
      id: "s-1002",
      name: "Yamaha NMAX 155cc",
      type: "Automatic",
      color: "Blue",
      price: 50,
      priceUnit: "day",
      deposit: 100,
      depositType: "passport",
      image: "/placeholder.svg?height=200&width=300",
      features: ["USB Charger", "Storage Box", "ABS Braking", "Digital Display"],
      available: true,
    },
    {
      id: "s-1003",
      name: "Honda Click 125i",
      type: "Automatic",
      color: "Red",
      price: 40,
      priceUnit: "day",
      deposit: 100,
      depositType: "passport",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Storage Box", "Lightweight"],
      available: true,
    },
    {
      id: "s-1004",
      name: "Vespa Primavera 125cc",
      type: "Automatic",
      color: "White",
      price: 55,
      priceUnit: "day",
      deposit: 200,
      depositType: "credit card",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Classic Design", "Storage Box", "USB Charger"],
      available: true,
    },
    {
      id: "s-1005",
      name: "Honda Wave 110cc",
      type: "Manual",
      color: "Black",
      price: 35,
      priceUnit: "day",
      deposit: 100,
      depositType: "passport",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Fuel Efficient", "Lightweight"],
      available: false,
    },
    {
      id: "s-1006",
      name: "Suzuki Burgman 200cc",
      type: "Automatic",
      color: "Silver",
      price: 60,
      priceUnit: "day",
      deposit: 200,
      depositType: "credit card",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Luxury Seating", "Large Storage", "ABS Braking", "Digital Display"],
      available: true,
    },
  ]

  // Mock reviews data
  const reviews = [
    {
      id: "r-1001",
      user: {
        name: "Sarah T.",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "United States",
      },
      rating: 5,
      date: "March 15, 2025",
      comment:
        "Great service and well-maintained scooters. The staff was very helpful and provided a map with recommendations for places to visit. Would definitely rent from them again!",
    },
    {
      id: "r-1002",
      user: {
        name: "Michael L.",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Australia",
      },
      rating: 4,
      date: "March 10, 2025",
      comment:
        "Good scooters at reasonable prices. The Honda PCX was perfect for exploring Pai and surrounding areas. Only giving 4 stars because the pickup process took a bit longer than expected.",
    },
    {
      id: "r-1003",
      user: {
        name: "Emma K.",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Germany",
      },
      rating: 5,
      date: "March 5, 2025",
      comment:
        "Excellent experience! The scooter was in perfect condition and the staff gave us great tips for routes around Pai. The included helmet was clean and comfortable.",
    },
  ]

  // Set selected scooter from URL param
  useEffect(() => {
    if (selectedScooterId) {
      setSelectedScooter(selectedScooterId)
    }
  }, [selectedScooterId])

  const handleBack = () => {
    router.back()
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleScooterSelect = (scooterId: string) => {
    setSelectedScooter(scooterId)
  }

  const selectedScooterData = selectedScooter ? scooters.find((scooter) => scooter.id === selectedScooter) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={isFavorite ? "text-red-500" : ""}
            onClick={handleToggleFavorite}
          >
            <Heart className={isFavorite ? "fill-red-500" : ""} />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 />
          </Button>
        </div>
      </div>

      {/* Shop Cover Image */}
      <div className="aspect-[3/1] w-full overflow-hidden rounded-xl">
        <img src={shop.coverImage || "/placeholder.svg"} alt={shop.name} className="h-full w-full object-cover" />
      </div>

      {/* Shop Info */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-background">
              <AvatarImage src={shop.logo} alt={shop.name} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{shop.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="ml-1 font-medium">{shop.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{shop.reviews} reviews</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground">{shop.description}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-muted p-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="text-sm">
                <div className="font-medium">Location</div>
                <div className="text-muted-foreground">{shop.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-muted p-2">
                <Phone className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="text-sm">
                <div className="font-medium">Contact</div>
                <div className="text-muted-foreground">{shop.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-muted p-2">
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="text-sm">
                <div className="font-medium">Hours</div>
                <div className="text-muted-foreground">{shop.hours}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-muted p-2">
                <MessageSquare className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="text-sm">
                <div className="font-medium">Message</div>
                <Button variant="link" className="h-auto p-0 text-yellow-500">
                  Contact Shop
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {shop.amenities.map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shop Location</CardTitle>
              <CardDescription>Find us on the map</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-square w-full bg-muted">
                <div className="h-full w-full bg-[url('/placeholder.svg?height=300&width=300&text=Map')] bg-cover bg-center"></div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button variant="outline" className="gap-2">
                <MapPin className="h-4 w-4" />
                Get Directions
              </Button>
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Tabs for Scooters and Reviews */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scooters">Scooters</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Scooters Tab */}
        <TabsContent value="scooters" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scooters.map((scooter) => (
              <Card
                key={scooter.id}
                className={`overflow-hidden transition-all ${
                  selectedScooter === scooter.id ? "ring-2 ring-yellow-500" : ""
                } ${!scooter.available ? "opacity-60" : ""}`}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={scooter.image || "/placeholder.svg"}
                    alt={scooter.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{scooter.name}</h3>
                    {scooter.available ? (
                      <Badge className="bg-green-500">Available</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Unavailable
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{scooter.type}</span>
                    <span>{scooter.color}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {scooter.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-muted/50">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold">${scooter.price}</div>
                      <div className="text-xs text-muted-foreground">per {scooter.priceUnit}</div>
                    </div>
                    <Button
                      disabled={!scooter.available}
                      onClick={() => handleScooterSelect(scooter.id)}
                      variant={selectedScooter === scooter.id ? "default" : "outline"}
                    >
                      {selectedScooter === scooter.id ? "Selected" : "Select"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Customer Reviews</h2>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="ml-1 font-medium">{shop.rating}</span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground">{shop.reviews} reviews</span>
              </div>
            </div>
            <Button>Write a Review</Button>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={review.user.avatar} alt={review.user.name} />
                      <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{review.user.name}</h4>
                          <p className="text-xs text-muted-foreground">{review.user.location}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex items-center my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm mt-2">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            Load More Reviews
          </Button>
        </TabsContent>
      </Tabs>

      {/* Booking Sheet */}
      {selectedScooterData && (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="fixed bottom-4 right-4 left-4 md:left-auto md:right-8 md:bottom-8 md:w-auto z-50 bg-yellow-500 hover:bg-yellow-600 text-black">
              Book {selectedScooterData.name}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] rounded-t-xl">
            <SheetHeader>
              <SheetTitle>Book Your Scooter</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-6 overflow-auto max-h-[calc(90vh-10rem)]">
              <div className="flex items-start gap-4">
                <img
                  src={selectedScooterData.image || "/placeholder.svg"}
                  alt={selectedScooterData.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold">{selectedScooterData.name}</h3>
                  <p className="text-sm text-muted-foreground">{shop.name}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="ml-1 text-sm">{shop.rating}</span>
                    </div>
                    <span className="mx-2 text-xs text-muted-foreground">•</span>
                    <span className="text-sm">
                      ${selectedScooterData.price}/{selectedScooterData.priceUnit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Rental Details</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Pickup Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Return Date</Label>
                    <Input type="date" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Insurance Options</h4>
                <div className="space-y-3">
                  <Card className="overflow-hidden border-2 border-yellow-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-yellow-500" />
                          <div>
                            <h5 className="font-semibold">Standard Protection</h5>
                            <p className="text-sm text-muted-foreground">Recommended coverage</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500 text-black">Recommended</Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Damage up to $1,000</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Theft protection</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>$50 deductible</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Basic roadside assistance</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold">$9.99/day</span>
                        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                          Select
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          <div>
                            <h5 className="font-semibold">Basic Protection</h5>
                            <p className="text-sm text-muted-foreground">Minimal coverage</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Damage up to $500</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Theft protection</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <X className="h-4 w-4 text-red-500" />
                          <span>$100 deductible</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <X className="h-4 w-4 text-red-500" />
                          <span>No roadside assistance</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold">$4.99/day</span>
                        <Button size="sm" variant="outline">
                          Select
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          <div>
                            <h5 className="font-semibold">No Insurance</h5>
                            <p className="text-sm text-muted-foreground">Not recommended</p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-red-500 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                        >
                          High Risk
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-red-500 mt-0.5" />
                            <p>
                              Without insurance, you are responsible for all damages and theft. The shop may require a
                              larger deposit.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold">$0.00/day</span>
                        <Button size="sm" variant="outline">
                          Select
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Payment Method</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-muted p-2">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <h5 className="font-medium">Pay at Pickup</h5>
                        <p className="text-sm text-muted-foreground">Cash or card payment at the shop</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-muted p-2">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <h5 className="font-medium">Pay Now</h5>
                        <p className="text-sm text-muted-foreground">Secure your booking with online payment</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Booking Summary</h4>
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scooter Rental (2 days)</span>
                    <span>$90.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance (Standard)</span>
                    <span>$19.98</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span>$10.00</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>$119.98</span>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Deposit Required</p>
                      <p className="text-muted-foreground">
                        This shop requires a{" "}
                        {selectedScooterData.depositType === "passport" ? "passport" : "credit card"} deposit of $
                        {selectedScooterData.deposit}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <SheetClose asChild>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
              </SheetClose>
              <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black" asChild>
                <Link href="/rider-booking-confirmation">Confirm Booking</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

// Import additional icons
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard } from "lucide-react"
