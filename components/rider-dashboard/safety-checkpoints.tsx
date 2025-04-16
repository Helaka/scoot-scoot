"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Info } from "lucide-react"

export function SafetyCheckpoints() {
  const [checkpoints, setCheckpoints] = useState([
    {
      id: 1,
      location: "Main Beach Road",
      type: "police",
      distance: 1.2,
      active: true,
      lastReported: "10 min ago",
    },
    {
      id: 2,
      location: "Central Market",
      type: "helmet",
      distance: 2.5,
      active: true,
      lastReported: "25 min ago",
    },
  ])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Shield className="mr-2 h-4 w-4 text-yellow-500" />
          Safety Checkpoints Nearby
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {checkpoints.length > 0 ? (
          <div className="space-y-3">
            {checkpoints.map((checkpoint) => (
              <div
                key={checkpoint.id}
                className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className={
                        checkpoint.type === "police"
                          ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }
                    >
                      {checkpoint.type === "police" ? (
                        <AlertTriangle className="mr-1 h-3 w-3" />
                      ) : (
                        <Info className="mr-1 h-3 w-3" />
                      )}
                      {checkpoint.type === "police" ? "Police" : "Helmet Check"}
                    </Badge>
                    <span className="ml-2 text-xs text-muted-foreground">{checkpoint.lastReported}</span>
                  </div>
                  <p className="text-sm font-medium mt-1">{checkpoint.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{checkpoint.distance} km</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-2">No checkpoints reported nearby</p>
        )}

        <Button variant="outline" size="sm" className="w-full mt-3 text-xs" onClick={() => {}}>
          View All Checkpoints
        </Button>
      </CardContent>
    </Card>
  )
}
