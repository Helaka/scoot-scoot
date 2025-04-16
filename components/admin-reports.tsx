"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Download,
  Calendar,
  BarChart3,
  Users,
  CreditCard,
  Bike,
  Clock,
  Printer,
  Mail,
  Share2,
  Edit,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminLayout } from "./admin-layout"

export default function AdminReports() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const isDev = searchParams?.get("dev") === "true"

  const [reportType, setReportType] = useState("financial")
  const [timeRange, setTimeRange] = useState("30d")
  const [format, setFormat] = useState("pdf")

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {isDemo && (
          <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            <h2 className="text-lg font-semibold">Demo Mode Active</h2>
            <p>
              You're viewing sample reports. In a real environment, you would see actual platform reports with real
              data.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and view platform reports</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
            <CardDescription>Create custom reports based on your requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial Report</SelectItem>
                    <SelectItem value="user">User Activity Report</SelectItem>
                    <SelectItem value="rental">Rental Report</SelectItem>
                    <SelectItem value="shop">Shop Performance Report</SelectItem>
                    <SelectItem value="maintenance">Maintenance Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="12m">Last 12 months</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Generate Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Recent Reports</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Financial</span>
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>User Activity</span>
            </TabsTrigger>
            <TabsTrigger value="rental" className="flex items-center gap-2">
              <Bike className="h-4 w-4" />
              <span>Rental</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recently Generated Reports</CardTitle>
                <CardDescription>Reports generated in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Generated On</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead>Generated By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "Monthly Financial Summary",
                          type: "Financial",
                          date: "2023-10-31",
                          format: "PDF",
                          user: "Admin",
                        },
                        {
                          name: "User Growth Analysis",
                          type: "User Activity",
                          date: "2023-10-28",
                          format: "Excel",
                          user: "Admin",
                        },
                        {
                          name: "Rental Patterns Q3",
                          type: "Rental",
                          date: "2023-10-15",
                          format: "PDF",
                          user: "Admin",
                        },
                        {
                          name: "Shop Performance Review",
                          type: "Shop",
                          date: "2023-10-10",
                          format: "PDF",
                          user: "Admin",
                        },
                        {
                          name: "Maintenance Schedule",
                          type: "Maintenance",
                          date: "2023-10-05",
                          format: "Excel",
                          user: "Admin",
                        },
                      ].map((report, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                          <TableCell>{report.format}</TableCell>
                          <TableCell>{report.user}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Printer className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Revenue, expenses, and financial performance</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Financial reports would be listed here</p>
                  <p className="text-sm">Generate a new financial report to see it in this section</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Reports</CardTitle>
                <CardDescription>User growth, engagement, and behavior</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Users className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">User activity reports would be listed here</p>
                  <p className="text-sm">Generate a new user activity report to see it in this section</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rental" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Rental Reports</CardTitle>
                <CardDescription>Rental patterns, duration, and frequency</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Bike className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Rental reports would be listed here</p>
                  <p className="text-sm">Generate a new rental report to see it in this section</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>Automatically generated reports on a schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Generation</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Weekly Financial Summary",
                      type: "Financial",
                      frequency: "Weekly",
                      next: "2023-11-06",
                      recipients: "admin@scootscoot.com",
                    },
                    {
                      name: "Monthly User Growth",
                      type: "User Activity",
                      frequency: "Monthly",
                      next: "2023-11-01",
                      recipients: "admin@scootscoot.com, marketing@scootscoot.com",
                    },
                    {
                      name: "Quarterly Performance Review",
                      type: "Shop",
                      frequency: "Quarterly",
                      next: "2024-01-01",
                      recipients: "admin@scootscoot.com, management@scootscoot.com",
                    },
                  ].map((report, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.frequency}</TableCell>
                      <TableCell>{new Date(report.next).toLocaleDateString()}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{report.recipients}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  )
}
