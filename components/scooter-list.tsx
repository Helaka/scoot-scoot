"use client"

import { useState, useEffect } from "react"
import { getScooters } from "@/actions/scooter-actions"
import type { Scooter } from "@/types/database"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bike, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface ScooterListProps {
  shopId?: string
}

export function ScooterList({ shopId }: ScooterListProps) {
  const [scooters, setScooters] = useState<Scooter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadScooters() {
      try {
        setLoading(true)
        const data = await getScooters(shopId)
        setScooters(data)
        setError(null)
      } catch (err) {
        setError("Failed to load scooters")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadScooters()
  }, [shopId])

  if (loading) {
    return <div className="flex justify-center p-8">Loading scooters...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>
  }

  if (scooters.length === 0) {
    return (
      <div className="text-center p-8">
        <Bike className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium">No scooters found</h3>
        <p className="mt-1 text-gray-500">Get started by adding a new scooter.</p>
        <div className="mt-6">
          <Link href="/scooters/new">
            <Button>Add Scooter</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {scooters.map((scooter) => (
        <Card key={scooter.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{scooter.name || "Unnamed Scooter"}</CardTitle>
                <CardDescription>{scooter.model || "No model specified"}</CardDescription>
              </div>
              <StatusBadge status={scooter.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">License Plate:</span>
                <span className="text-sm font-medium">{scooter.license_plate || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Daily Rate:</span>
                <span className="text-sm font-medium">
                  {scooter.daily_rate ? `$${scooter.daily_rate.toFixed(2)}` : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Hourly Rate:</span>
                <span className="text-sm font-medium">
                  {scooter.hourly_rate ? `$${scooter.hourly_rate.toFixed(2)}` : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/scooters/${scooter.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <div className="flex gap-2">
              <Link href={`/scooters/${scooter.id}/edit`}>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: Scooter["status"] }) {
  let color = ""

  switch (status) {
    case "available":
      color = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      break
    case "rented":
      color = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      break
    case "maintenance":
      color = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      break
    case "reserved":
      color = "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      break
    case "inactive":
      color = "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      break
    default:
      color = "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }

  return <Badge className={`${color} capitalize`}>{status}</Badge>
}
