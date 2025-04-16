"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Search,
  HelpCircle,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  ExternalLink,
  Send,
} from "lucide-react"

import { ShopLayout } from "./shop-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export function ShopSupport() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"
  const [activeTab, setActiveTab] = useState("help-center")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search initiated",
      description: `Searching for "${searchQuery}"...`,
    })
  }

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Support ticket submitted",
        description: "We'll get back to you as soon as possible.",
      })
    }, 1000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    toast({
      title: "Message sent",
      description: "Your message has been sent to support.",
    })
    setChatMessage("")
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">Get help with your ScootScoot shop and find answers to your questions</p>
        </div>

        <Tabs defaultValue="help-center" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="help-center" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden md:inline">Help Center</span>
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Documentation</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">Contact Us</span>
            </TabsTrigger>
            <TabsTrigger value="live-chat" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">Live Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="help-center" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Help Center</CardTitle>
                <CardDescription>Find answers to common questions and issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for help..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Learn how to set up your shop and start renting scooters
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardFooter>
                  </Card>

                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Managing Bookings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Learn how to manage bookings, cancellations, and refunds
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardFooter>
                  </Card>

                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Scooter Maintenance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Tips and guides for maintaining your scooter fleet
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardFooter>
                  </Card>

                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Billing & Payments</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Information about billing, payments, and subscriptions
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I add a new scooter to my fleet?</AccordionTrigger>
                      <AccordionContent>
                        To add a new scooter to your fleet, go to the "My Scooters" page and click on the "Add Scooter"
                        button. Fill in the required information such as model, serial number, and condition, then click
                        "Save". Your new scooter will be added to your fleet and available for rental.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I set up pricing for my scooters?</AccordionTrigger>
                      <AccordionContent>
                        To set up pricing, navigate to the "My Pricing" page. Here you can create different pricing
                        plans based on rental duration, scooter type, or season. You can also set up special offers and
                        discounts. Once you've configured your pricing, click "Save" to apply the changes.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>What happens if a scooter is damaged during rental?</AccordionTrigger>
                      <AccordionContent>
                        If a scooter is damaged during rental, you should document the damage with photos and notes in
                        the system. Navigate to the specific booking, click on "Report Issue", and follow the prompts to
                        document the damage. If you have insurance coverage, you can also initiate a claim from the
                        "Insurance" section.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How do I process a refund for a canceled booking?</AccordionTrigger>
                      <AccordionContent>
                        To process a refund, go to the "My Bookings" page, find the booking in question, and click on
                        "Cancel Booking". You'll be prompted to specify a refund amount based on your cancellation
                        policy. Once confirmed, the refund will be processed through your connected payment processor.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>How can I view my earnings and financial reports?</AccordionTrigger>
                      <AccordionContent>
                        You can view your earnings and financial reports in the "My Numbers" section. Here you'll find
                        detailed breakdowns of your revenue, expenses, and profit. You can filter by date range and
                        export reports in various formats for your accounting needs.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Comprehensive guides and tutorials for ScootScoot shop owners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="p-4">
                      <Badge className="w-fit mb-2">Beginner</Badge>
                      <CardTitle className="text-base">Shop Owner's Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">A complete guide to managing your ScootScoot shop</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Updated 2 weeks ago</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <span>Read</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="p-4">
                      <Badge className="w-fit mb-2">Intermediate</Badge>
                      <CardTitle className="text-base">Pricing Strategies</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Learn how to optimize your pricing for maximum profit
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Updated 1 month ago</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <span>Read</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="p-4">
                      <Badge className="w-fit mb-2">Advanced</Badge>
                      <CardTitle className="text-base">Fleet Management</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Advanced techniques for managing your scooter fleet
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Updated 3 weeks ago</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <span>Read</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Video Tutorials</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="p-4">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted-foreground"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <h4 className="font-medium">Getting Started with ScootScoot</h4>
                        <p className="text-sm text-muted-foreground mt-1">Learn the basics of setting up your shop</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-4">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted-foreground"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <h4 className="font-medium">Managing Bookings and Customers</h4>
                        <p className="text-sm text-muted-foreground mt-1">Learn how to handle bookings efficiently</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Documentation</h3>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">ScootScoot API Reference</CardTitle>
                      <CardDescription>Integrate your systems with the ScootScoot platform</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Our API allows you to programmatically manage your scooter fleet, bookings, and customer data.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <span>API Reference</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <span>Code Samples</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get in touch with our support team for personalized assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Submit a Support Ticket</h3>
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" placeholder="Brief description of your issue" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          Category
                        </label>
                        <select
                          id="category"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a category</option>
                          <option value="account">Account Issues</option>
                          <option value="billing">Billing & Payments</option>
                          <option value="technical">Technical Problems</option>
                          <option value="feature">Feature Requests</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="priority" className="text-sm font-medium">
                          Priority
                        </label>
                        <select
                          id="priority"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea id="description" placeholder="Please provide as much detail as possible" rows={5} />
                      </div>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Ticket"}
                      </Button>
                    </form>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">support@scootscoot.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Support Hours</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm">Monday - Friday</p>
                          <p className="text-sm">9:00 AM - 6:00 PM EST</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm">Saturday</p>
                          <p className="text-sm">10:00 AM - 4:00 PM EST</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm">Sunday</p>
                          <p className="text-sm">Closed</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Emergency support is available 24/7 for critical issues.
                      </p>
                    </div>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Need Immediate Help?</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm">
                          For urgent issues that require immediate attention, please call our emergency support line.
                        </p>
                        <Button variant="outline" className="mt-4 w-full">
                          Call Emergency Support
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live-chat" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Support</CardTitle>
                <CardDescription>Chat with our support team in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-md h-[400px] flex flex-col">
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>SS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">ScootScoot Support</p>
                        <p className="text-xs text-muted-foreground">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-auto space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>SS</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Hello! Welcome to ScootScoot support. How can I help you today?</p>
                        <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                      </div>
                    </div>

                    {isDemo && (
                      <>
                        <div className="flex gap-3 justify-end">
                          <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">
                              Hi, I'm having trouble adding a new scooter to my fleet. The form keeps giving me an
                              error.
                            </p>
                            <p className="text-xs text-primary-foreground/70 mt-1">10:32 AM</p>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                        </div>

                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>SS</AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">
                              I'm sorry to hear that. Can you tell me what error message you're seeing? Also, what
                              information are you trying to enter for the new scooter?
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">10:33 AM</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </form>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Other Support Options</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button variant="outline" className="justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Request a Call Back
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Schedule a Meeting
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ShopLayout>
  )
}

export default ShopSupport
