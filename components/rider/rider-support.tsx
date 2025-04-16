"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Phone,
  Mail,
  HelpCircle,
  AlertTriangle,
  Search,
  ChevronRight,
  CreditCard,
  User,
  Clock,
  Shield,
  Calendar,
} from "lucide-react"

// This component adapts based on the rider's current state
export function RiderSupport({ hasActiveRental = false }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("faq")

  // Different FAQ sections based on rider state
  const generalFaqs = [
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button on the homepage and following the registration process. You'll need to provide your email, create a password, and verify your identity.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit and debit cards, including Visa, Mastercard, American Express, and Discover. Some locations also support digital payment methods like Apple Pay and Google Pay.",
    },
    {
      question: "How do I update my personal information?",
      answer:
        "You can update your personal information by going to your Profile page. There, you can edit your name, email, phone number, and other account details.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security very seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your consent.",
    },
  ]

  const activeFaqs = [
    {
      question: "How do I extend my current rental?",
      answer:
        "You can extend your rental directly from your dashboard. Click on the 'Extend Rental' button on your active rental card and select your desired additional time.",
    },
    {
      question: "What should I do if the scooter breaks down?",
      answer:
        "If your scooter breaks down, please use the 'Report Issue' button on your active rental screen. This will notify the shop and our support team. If it's an emergency, please call our support hotline.",
    },
    {
      question: "How does the insurance coverage work?",
      answer:
        "Your selected insurance plan covers accidental damage to the scooter up to the specified amount. Basic coverage protects only the rented scooter, while Premium coverage also includes damage to other scooters in case of an accident.",
    },
    {
      question: "Can I return the scooter to a different location?",
      answer:
        "This depends on the shop's policy. Some shops allow returns at different locations for an additional fee, while others require returns to the original rental location. Check your rental details for specific information.",
    },
  ]

  const browsingFaqs = [
    {
      question: "How do I find scooters near me?",
      answer:
        "You can use the map view on the dashboard to see available scooters near your location. Make sure location services are enabled on your device for the best experience.",
    },
    {
      question: "What's the difference between scooter models?",
      answer:
        "Different scooter models offer varying features such as range, speed, comfort, and carrying capacity. Each listing includes detailed specifications to help you choose the right scooter for your needs.",
    },
    {
      question: "How do I book a scooter in advance?",
      answer:
        "You can book a scooter in advance by selecting your desired date and time on the scooter details page. Advance bookings may require a deposit depending on the shop's policy.",
    },
    {
      question: "Are there any age restrictions for renting?",
      answer:
        "Yes, you must be at least 18 years old to rent a scooter. Some high-performance models may have higher age requirements or require additional verification.",
    },
  ]

  // Determine which FAQs to show based on rider state
  const faqs = hasActiveRental ? [...activeFaqs, ...generalFaqs] : [...browsingFaqs, ...generalFaqs]

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  // Quick help topics
  const quickHelpTopics = [
    { title: "Booking Issues", icon: <Calendar className="h-5 w-5" /> },
    { title: "Payment Problems", icon: <CreditCard className="h-5 w-5" /> },
    { title: "Account Access", icon: <User className="h-5 w-5" /> },
    { title: "Scooter Damage", icon: <AlertTriangle className="h-5 w-5" /> },
    { title: "Extending Rental", icon: <Clock className="h-5 w-5" /> },
    { title: "Insurance Claims", icon: <Shield className="h-5 w-5" /> },
  ]

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      {/* Search bar */}
      <div className="mb-8">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search for help..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Emergency support for active rentals */}
      {hasActiveRental && (
        <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-700 dark:text-red-300">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Emergency Support
            </CardTitle>
            <CardDescription className="text-red-600 dark:text-red-300">
              For urgent issues with your current rental
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
              If you're experiencing an emergency with your rental, please call our emergency hotline immediately:
            </p>
            <p className="text-lg font-bold text-red-700 dark:text-red-300 mt-2">+1 (800) 999-8888</p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full">
              Call Emergency Support
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Quick help topics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Help Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickHelpTopics.map((topic, index) => (
            <Card key={index} className="hover:border-purple-300 transition-colors cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-3 mb-2">{topic.icon}</div>
                <h3 className="font-medium text-sm">{topic.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Chat with our support team in real-time</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Start Chat</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Call us at +1 (800) 123-4567</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Call Now
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Send Email
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Tabs for FAQs and Contact Form */}
      <Tabs defaultValue="faq" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No results found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try a different search term or browse the categories below
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("contact")}>
                Still need help? Contact us
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Send us a message and we'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What is your message about?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Please describe your issue in detail" rows={5} />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="attach-files" className="rounded border-gray-300" />
                  <label htmlFor="attach-files" className="text-sm">
                    Attach files or screenshots
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
