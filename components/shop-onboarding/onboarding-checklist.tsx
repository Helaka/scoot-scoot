"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ChecklistItem {
  id: string
  title: string
  description: string
  path: string
  completed: boolean
}

export default function OnboardingChecklist() {
  const router = useRouter()
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "business-details",
      title: "Complete Business Details",
      description: "Add your address, operating hours, and license information",
      path: "/shop-settings",
      completed: false,
    },
    {
      id: "upload-logo",
      title: "Upload Business Logo",
      description: "Add your business logo to personalize your dashboard",
      path: "/shop-settings",
      completed: false,
    },
    {
      id: "add-scooter",
      title: "Add Your First Scooter",
      description: "Add details about your first scooter including photo and license plate",
      path: "/shop-scooters",
      completed: false,
    },
    {
      id: "setup-pricing",
      title: "Set Up Pricing Templates",
      description: "Create pricing templates for daily, weekly, and monthly rentals",
      path: "/shop-pricing",
      completed: false,
    },
    {
      id: "invite-staff",
      title: "Invite Staff Members",
      description: "Add team members and assign roles (Admin, Agent, Mechanic)",
      path: "/shop-staff",
      completed: false,
    },
    {
      id: "preview-profile",
      title: "Preview Public Profile",
      description: "See how customers will view your rental shop",
      path: "/shop-settings?preview=true",
      completed: false,
    },
  ])

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const completedCount = items.filter((item) => item.completed).length
  const progress = (completedCount / items.length) * 100

  return (
    <Card className="border-yellow-100 dark:border-yellow-800" id="onboarding-checklist">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Setup Checklist</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {completedCount} of {items.length} completed
          </span>
        </CardTitle>
        <CardDescription>Complete these steps to finish setting up your rental shop</CardDescription>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <button
                onClick={() => toggleItem(item.id)}
                className={`mt-0.5 flex-shrink-0 ${
                  item.completed
                    ? "text-green-500 hover:text-green-600"
                    : "text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500"
                }`}
              >
                {item.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                <span className="sr-only">{item.completed ? "Mark as incomplete" : "Mark as complete"}</span>
              </button>
              <div className="flex-1">
                <h4
                  className={`text-sm font-medium ${
                    item.completed ? "line-through text-gray-500 dark:text-gray-400" : ""
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400"
                onClick={() => router.push(item.path)}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Go to {item.title}</span>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
