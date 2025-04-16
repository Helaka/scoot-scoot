"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ManualVerification } from "./manual-verification"

export function ShopOnboardingSessions() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Rider Onboarding</h2>
        <p className="text-muted-foreground">Manage rider onboarding sessions and verify riders in person</p>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Sessions</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="manual">Manual Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Onboarding Sessions</CardTitle>
              <CardDescription>Riders who are currently in the process of completing their onboarding</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">No active onboarding sessions at the moment</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Onboarding Sessions</CardTitle>
              <CardDescription>Riders who have successfully completed their onboarding</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">No completed onboarding sessions to display</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Expired Onboarding Sessions</CardTitle>
              <CardDescription>Onboarding sessions that have expired without completion</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">No expired onboarding sessions to display</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4 mt-6">
          <ManualVerification shopId="shop-123" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
