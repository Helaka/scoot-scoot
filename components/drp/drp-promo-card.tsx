import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, Shield, Star } from "lucide-react"
import Link from "next/link"

interface DRPPromoCardProps {
  className?: string
  compact?: boolean
}

export function DRPPromoCard({ className, compact = false }: DRPPromoCardProps) {
  return (
    <Card
      className={`overflow-hidden border border-yellow-200 bg-gradient-to-br from-white via-yellow-50 to-white dark:from-gray-900 dark:via-yellow-900/20 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all ${className}`}
    >
      <div className="absolute top-0 right-0">
        <Badge className="m-2 bg-yellow-500 text-black font-medium">New</Badge>
      </div>
      <CardHeader className={compact ? "pb-2" : ""}>
        <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
          <Shield className="h-6 w-6 text-yellow-500" />
          Digital Ride Permit
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pb-2" : ""}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm md:text-base">
              Get your official Digital Ride Permit and enjoy hassle-free scooter rentals anywhere in the city.
            </p>
            <ul className="space-y-1">
              {!compact && (
                <li className="flex items-start gap-2 text-sm">
                  <Star className="mt-0.5 h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span>Faster checkout at all locations</span>
                </li>
              )}
              <li className="flex items-start gap-2 text-sm">
                <Star className="mt-0.5 h-4 w-4 text-yellow-500 flex-shrink-0" />
                <span>Skip verification steps</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Star className="mt-0.5 h-4 w-4 text-yellow-500 flex-shrink-0" />
                <span>Valid for 12 months</span>
              </li>
              {!compact && (
                <li className="flex items-start gap-2 text-sm">
                  <Star className="mt-0.5 h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span>Exclusive discounts and offers</span>
                </li>
              )}
            </ul>
          </div>
          {!compact && (
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-yellow-200/50 dark:bg-yellow-900/20 blur-xl"></div>
              </div>
              <div className="relative flex h-40 w-40 items-center justify-center rounded-lg border-2 border-dashed border-yellow-300 dark:border-yellow-700 bg-white/80 dark:bg-gray-800/80 p-4">
                <FileCheck className="h-16 w-16 text-yellow-500" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/rider-drp/application" className="w-full">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Apply Now</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
