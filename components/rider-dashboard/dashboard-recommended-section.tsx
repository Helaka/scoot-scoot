"use client"

import { Link } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface RecommendedScooter {
  id: number
  name: string
  image: string
  distance: string
  price: number
  rating: number
  reviews: number
}

interface DashboardRecommendedSectionProps {
  scooters?: RecommendedScooter[]
  isDemo?: boolean
}

export function DashboardRecommendedSection({ scooters = [], isDemo = false }: DashboardRecommendedSectionProps) {
  // Default scooters if none provided
  const displayScooters =
    scooters.length > 0
      ? scooters
      : [
          {
            id: 1,
            name: "Honda PCX 150cc",
            image: "/placeholder.svg?height=150&width=300&text=Scooter%201",
            distance: "0.1 miles",
            price: 35,
            rating: 5,
            reviews: 21,
          },
          {
            id: 2,
            name: "Honda PCX 160cc",
            image: "/placeholder.svg?height=150&width=300&text=Scooter%202",
            distance: "0.2 miles",
            price: 40,
            rating: 5,
            reviews: 22,
          },
          {
            id: 3,
            name: "Honda PCX 170cc",
            image: "/placeholder.svg?height=150&width=300&text=Scooter%203",
            distance: "0.3 miles",
            price: 45,
            rating: 5,
            reviews: 23,
          },
        ]

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recommended For You</h2>
        <Link href={`/rider-find-scooters${isDemo ? "?demo=true" : ""}`}>
          <Button variant="link" className="text-primary">
            View All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayScooters.map((scooter) => (
          <Card key={scooter.id} className="overflow-hidden">
            <img src={scooter.image || "/placeholder.svg"} alt={scooter.name} className="h-40 w-full object-cover" />
            <CardContent className="p-4">
              <h3 className="font-semibold">{scooter.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">{scooter.distance}</p>
                <p className="font-medium">${scooter.price}/day</p>
              </div>
              <div className="flex items-center mt-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < scooter.rating ? "fill-yellow-500" : ""}`} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({scooter.reviews})</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
