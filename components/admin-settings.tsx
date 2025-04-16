"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminLayout } from "./admin-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Bell, Lock, Save, User, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminSettings() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const isDev = searchParams?.get("dev") === "true"
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("account")

  // Demo data
  const [formData, setFormData] = useState({
    name: "System Admin",
    email: "admin@scootscoot.com",
    language: "english",
    timezone: "utc-8",
    notifications: {
      email: true,
      push: true,
      sms: false,
      security: true,
      updates: true,
      marketing: false,
    },
    security: {
      twoFactor: true,
      sessionTimeout: "30",
      ipRestriction: isDev,
      apiAccess: isDev,
    },
    system: {
      maintenanceMode: false,
      debugMode: isDev,
      analyticsEnabled: true,
      logLevel: isDev ? "debug" : "error",
      cacheLifetime: "60",
    },
  })

  useEffect(() => {
    if (isDemo) {
      setFormData((prev) => ({
        ...prev,
        name: "Demo Admin",
        email: "demo@scootscoot.com",
      }))
    } else if (isDev) {
      setFormData((prev) => ({
        ...prev,
        name: "Developer Admin",
        email: "dev@scootscoot.com",
        security: {
          ...prev.security,
          ipRestriction: true,
          apiAccess: true,
        },
        system: {
          ...prev.system,
          debugMode: true,
          logLevel: "debug",
        },
      }))
    }
  }, [isDemo, isDev])

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSwitchChange = (section: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: checked,
      },
    }))
  }

  const handleSave = () => {
    // Simulate saving
    setSaveMessage("Settings saved successfully!")
    setTimeout(() => {
      setSaveMessage(null)
    }, 3000)
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your admin account and system settings</p>
        </div>

        {isDemo && (
          <Alert className="mb-6 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Demo Mode Active</AlertTitle>
            <AlertDescription>
              Settings changes in demo mode are not persisted. This is a demonstration environment only.
            </AlertDescription>
          </Alert>
        )}

        {isDev && (
          <Alert className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Developer Mode Active</AlertTitle>
            <AlertDescription>
              You have access to additional developer settings and configuration options.
            </AlertDescription>
          </Alert>
        )}

        {saveMessage && (
          <Alert className="mb-6 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-green-200 dark:border-green-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:w-auto">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>System</span>
              {isDev && <Badge className="ml-auto bg-blue-500 text-[10px]">Dev</Badge>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your admin profile information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Admin" />
                      <AvatarFallback className="text-2xl">
                        {formData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => setFormData({ ...formData, language: value })}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={formData.timezone}
                      onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-12">UTC-12:00</SelectItem>
                        <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                        <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                        <SelectItem value="utc">UTC+00:00 (GMT)</SelectItem>
                        <SelectItem value="utc+1">UTC+01:00 (Central European Time)</SelectItem>
                        <SelectItem value="utc+8">UTC+08:00 (China Standard Time)</SelectItem>
                        <SelectItem value="utc+9">UTC+09:00 (Japan Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="email-notifications">
                          Email
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={formData.notifications.email}
                        onCheckedChange={(checked) => handleSwitchChange("notifications", "email", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="push-notifications">
                          Push
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={formData.notifications.push}
                        onCheckedChange={(checked) => handleSwitchChange("notifications", "push", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="sms-notifications">
                          SMS
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive text message alerts</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={formData.notifications.sms}
                        onCheckedChange={(checked) => handleSwitchChange("notifications", "sms", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="security-notifications">
                          Security Alerts
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Login attempts, password changes, and security issues
                        </p>
                      </div>
                      <Switch
                        id="security-notifications"
                        checked={formData.notifications.security}
                        onCheckedChange={(checked) => handleSwitchChange("notifications", "security", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="updates-notifications">
                          System Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">New features, maintenance, and system changes</p>
                      </div>
                      <Switch
                        id="updates-notifications"
                        checked={formData.notifications.updates}
                        onCheckedChange={(checked) => handleSwitchChange("notifications", "updates", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="marketing-notifications">
                          Marketing
                        </Label>
                        <p className="text-sm text-muted-foreground">New services, promotions, and newsletters</p>
                      </div>
                      <Switch
                        id="marketing-notifications"
                        checked={formData.notifications.marketing}
                        onCheckedChange={(checked) => handleSwitchChange("notifications", "marketing", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="two-factor">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require a verification code in addition to your password
                      </p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={formData.security.twoFactor}
                      onCheckedChange={(checked) => handleSwitchChange("security", "twoFactor", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Select
                      value={formData.security.sessionTimeout}
                      onValueChange={(value) => handleInputChange("security", "sessionTimeout", value)}
                    >
                      <SelectTrigger id="session-timeout">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {isDev && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          Advanced Security
                          <Badge className="bg-blue-500">Developer</Badge>
                        </h3>
                        <div className="flex items-center justify-between space-x-2">
                          <div className="space-y-0.5">
                            <Label className="text-base" htmlFor="ip-restriction">
                              IP Restriction
                            </Label>
                            <p className="text-sm text-muted-foreground">Limit admin access to specific IP addresses</p>
                          </div>
                          <Switch
                            id="ip-restriction"
                            checked={formData.security.ipRestriction}
                            onCheckedChange={(checked) => handleSwitchChange("security", "ipRestriction", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <div className="space-y-0.5">
                            <Label className="text-base" htmlFor="api-access">
                              API Access
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Enable direct API access for this admin account
                            </p>
                          </div>
                          <Switch
                            id="api-access"
                            checked={formData.security.apiAccess}
                            onCheckedChange={(checked) => handleSwitchChange("security", "apiAccess", checked)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure global system settings and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="maintenance-mode">
                        Maintenance Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Put the system in maintenance mode (users will see a maintenance page)
                      </p>
                    </div>
                    <Switch
                      id="maintenance-mode"
                      checked={formData.system.maintenanceMode}
                      onCheckedChange={(checked) => handleSwitchChange("system", "maintenanceMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="analytics-enabled">
                        Analytics
                      </Label>
                      <p className="text-sm text-muted-foreground">Enable usage analytics and tracking</p>
                    </div>
                    <Switch
                      id="analytics-enabled"
                      checked={formData.system.analyticsEnabled}
                      onCheckedChange={(checked) => handleSwitchChange("system", "analyticsEnabled", checked)}
                    />
                  </div>

                  {isDev && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          Developer Settings
                          <Badge className="bg-blue-500">Developer</Badge>
                        </h3>
                        <div className="flex items-center justify-between space-x-2">
                          <div className="space-y-0.5">
                            <Label className="text-base" htmlFor="debug-mode">
                              Debug Mode
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Enable detailed error messages and debugging tools
                            </p>
                          </div>
                          <Switch
                            id="debug-mode"
                            checked={formData.system.debugMode}
                            onCheckedChange={(checked) => handleSwitchChange("system", "debugMode", checked)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="log-level">Log Level</Label>
                          <Select
                            value={formData.system.logLevel}
                            onValueChange={(value) => handleInputChange("system", "logLevel", value)}
                          >
                            <SelectTrigger id="log-level">
                              <SelectValue placeholder="Select log level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="error">Error</SelectItem>
                              <SelectItem value="warn">Warning</SelectItem>
                              <SelectItem value="info">Info</SelectItem>
                              <SelectItem value="debug">Debug</SelectItem>
                              <SelectItem value="trace">Trace</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cache-lifetime">Cache Lifetime (minutes)</Label>
                          <Select
                            value={formData.system.cacheLifetime}
                            onValueChange={(value) => handleInputChange("system", "cacheLifetime", value)}
                          >
                            <SelectTrigger id="cache-lifetime">
                              <SelectValue placeholder="Select cache lifetime" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 minutes</SelectItem>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="240">4 hours</SelectItem>
                              <SelectItem value="1440">24 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
