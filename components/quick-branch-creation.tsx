"use client"

import type React from "react"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface QuickBranchCreationProps {
  onBranchCreated: (branchData: any) => void
}

export function QuickBranchCreation({ onBranchCreated }: QuickBranchCreationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [branchName, setBranchName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!branchName || !address || !city || !state || !zipCode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newBranch = {
        id: `branch-${Date.now()}`,
        name: branchName,
        address,
        city,
        state,
        zipCode,
        isMainBranch: false,
      }

      onBranchCreated(newBranch)
      setIsLoading(false)
      setIsOpen(false)

      // Reset form
      setBranchName("")
      setAddress("")
      setCity("")
      setState("")
      setZipCode("")

      toast({
        title: "Branch created",
        description: `${branchName} has been created successfully.`,
      })
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Create New Branch</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Branch Creation</DialogTitle>
          <DialogDescription>
            Create a new branch location for your rental shop. You can add more details later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quick-branch-name">
                Branch Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quick-branch-name"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="Downtown Branch"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quick-branch-address">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quick-branch-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quick-branch-city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quick-branch-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="San Francisco"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quick-branch-state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quick-branch-state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="CA"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quick-branch-zip">
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quick-branch-zip"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="94105"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Branch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
