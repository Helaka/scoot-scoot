"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, Users, UserPlus, UserCheck } from "lucide-react"

export function OnboardingAnalytics() {
  // Mock data for analytics
  const analytics = {
    total: 124,
    completed: 87,
    pending: 28,
    expired: 9,
    conversionRate: 70.2,
    averageTime: 8.5, // minutes
    weeklyData: [12, 18, 15, 22, 16, 14, 27],
    monthlyData: [45, 62, 78, 95, 110, 124],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Analytics</CardTitle>
        <CardDescription>Track your rider onboarding performance</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                      <h3 className="text-2xl font-bold">{analytics.total}</h3>
                    </div>
                    <div className="rounded-full bg-blue-100 p-2">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <h3 className="text-2xl font-bold">{analytics.completed}</h3>
                    </div>
                    <div className="rounded-full bg-green-100 p-2">
                      <UserCheck className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                      <h3 className="text-2xl font-bold">{analytics.conversionRate}%</h3>
                    </div>
                    <div className="rounded-full bg-purple-100 p-2">
                      <UserPlus className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Completion Time</p>
                      <h3 className="text-2xl font-bold">{analytics.averageTime} min</h3>
                    </div>
                    <div className="rounded-full bg-yellow-100 p-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-medium">Session Status Breakdown</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${(analytics.completed / analytics.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-green-600">
                    {Math.round((analytics.completed / analytics.total) * 100)}%
                  </span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Completed
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-yellow-600" />
                    Pending
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center gap-1">
                    <XCircle className="h-3 w-3 text-red-600" />
                    Expired
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="h-[200px] flex items-end justify-between gap-2">
              {analytics.weeklyData.map((value, index) => (
                <div key={index} className="relative flex-1">
                  <div
                    className="bg-primary/90 rounded-t-sm w-full absolute bottom-0"
                    style={{ height: `${(value / Math.max(...analytics.weeklyData)) * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Mon</span>
              <span className="text-xs">Tue</span>
              <span className="text-xs">Wed</span>
              <span className="text-xs">Thu</span>
              <span className="text-xs">Fri</span>
              <span className="text-xs">Sat</span>
              <span className="text-xs">Sun</span>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="h-[200px] flex items-end justify-between gap-2">
              {analytics.monthlyData.map((value, index) => (
                <div key={index} className="relative flex-1">
                  <div
                    className="bg-primary/90 rounded-t-sm w-full absolute bottom-0"
                    style={{ height: `${(value / Math.max(...analytics.monthlyData)) * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Jan</span>
              <span className="text-xs">Feb</span>
              <span className="text-xs">Mar</span>
              <span className="text-xs">Apr</span>
              <span className="text-xs">May</span>
              <span className="text-xs">Jun</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
