"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertCircle, ChevronRight } from "lucide-react"

interface RiderProfileDRPProps {
  hasDRP?: boolean
  permitId?: string
  expiryDate?: string
  permitType?: "monthly" | "annual"
}

export default function RiderProfileDRP({
  hasDRP = false,
  permitId = "",
  expiryDate = "",
  permitType = "monthly",
}: RiderProfileDRPProps) {
  const router = useRouter()

  const handleViewPermit = () => {
    router.push(`/rider-drp/view?permitId=${permitId}`)
  }

  const handleApplyForPermit = () => {
    router.push("/rider-drp/application")
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-yellow-500" />
            <CardTitle>Digital Ride Permit</CardTitle>
          </div>
          {hasDRP && <Badge className="bg-green-500">Active</Badge>}
        </div>
        <CardDescription>A digital certificate that verifies your riding credentials</CardDescription>
      </CardHeader>
      <CardContent>
        {hasDRP ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm text-muted-foreground">Permit ID</span>
              <span className="text-sm font-medium">{permitId.substring(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="text-sm font-medium capitalize">{permitType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Valid Until</span>
              <span className="text-sm font-medium">{formatDate(expiryDate)}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-4 space-y-3">
            <AlertCircle className="h-10 w-10 text-yellow-500" />
            <div>
              <h3 className="font-medium">No Digital Ride Permit</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get a Digital Ride Permit to enhance your riding experience and avoid issues with rental shops.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {hasDRP ? (
          <Button onClick={handleViewPermit} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            View Permit
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleApplyForPermit} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            Apply for Digital Ride Permit
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
