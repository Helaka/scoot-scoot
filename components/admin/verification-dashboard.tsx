"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AdminLayout } from "../admin-layout"
import { OnboardingService } from "@/services/onboarding-service"
import type { OnboardingSession } from "@/types/onboarding-types"
import { Search, CheckCircle, XCircle, AlertCircle, Clock, Eye } from "lucide-react"

export function VerificationDashboard() {
  const [sessions, setSessions] = useState<OnboardingSession[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // In a real implementation, we would fetch sessions from the backend
    // For now, we'll use our mock service
    const allSessions = OnboardingService.getShopSessions("shop-1")
    setSessions(allSessions)
  }, [])

  const filteredSessions = sessions.filter((session) => {
    // Filter by search term
    const matchesSearch =
      session.sessionId.includes(searchTerm) ||
      session.activationCode.includes(searchTerm) ||
      (session.riderId && session.riderId.includes(searchTerm))

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && session.status === "pending"
    if (activeTab === "active") return matchesSearch && session.status === "activated"
    if (activeTab === "completed") return matchesSearch && session.status === "completed"
    if (activeTab === "expired") return matchesSearch && session.status === "expired"

    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "activated":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "activated":
        return <AlertCircle className="h-5 w-5 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "expired":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Verification Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage rider verification sessions</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by ID, code, or rider..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Button variant="outline">Export</Button>
          <Button>Refresh</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="active">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Sessions</CardTitle>
                <CardDescription>{filteredSessions.length} sessions found</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b bg-muted/50 p-2 text-sm font-medium">
                    <div>Session ID</div>
                    <div>Created</div>
                    <div>Shop</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>

                  {filteredSessions.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No sessions found</div>
                  ) : (
                    <div className="divide-y">
                      {filteredSessions.map((session) => (
                        <div key={session.sessionId} className="grid grid-cols-5 items-center p-3">
                          <div className="font-medium">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(session.status)}
                              <span>{session.activationCode}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {session.sessionId.substring(0, 12)}...
                            </div>
                          </div>

                          <div className="text-sm">
                            {new Date(session.createdAt).toLocaleDateString()}
                            <div className="text-xs text-muted-foreground">
                              {new Date(session.createdAt).toLocaleTimeString()}
                            </div>
                          </div>

                          <div className="text-sm">{session.shopId}</div>

                          <div>{getStatusBadge(session.status)}</div>

                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
