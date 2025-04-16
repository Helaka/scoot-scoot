"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { MapPin, Plus, Edit, Trash2, Clock, Phone, Globe, ChevronDown, ChevronUp, UserCog } from "lucide-react"
import { ShopLayout } from "./shop-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

interface Branch {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string
  isMainBranch: boolean
  managerId: string | null
  managerName: string | null
  managerEmail: string | null
  openingHours: {
    monday: { open: string; close: string; closed: boolean }
    tuesday: { open: string; close: string; closed: boolean }
    wednesday: { open: string; close: string; closed: boolean }
    thursday: { open: string; close: string; closed: boolean }
    friday: { open: string; close: string; closed: boolean }
    saturday: { open: string; close: string; closed: boolean }
    sunday: { open: string; close: string; closed: boolean }
  }
  website?: string
  description?: string
  status: "active" | "inactive"
}

export function ShopBranches() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"

  // Demo data
  const initialBranches: Branch[] = isDemo
    ? [
        {
          id: "branch-1",
          name: "Downtown ScootScoot",
          address: "123 Main Street",
          city: "San Francisco",
          state: "CA",
          zipCode: "94105",
          country: "United States",
          phone: "(415) 555-1234",
          email: "downtown@scootscoot.com",
          isMainBranch: true,
          managerId: "S-1001",
          managerName: "John Smith",
          managerEmail: "john.smith@scootscoot.com",
          openingHours: {
            monday: { open: "09:00", close: "18:00", closed: false },
            tuesday: { open: "09:00", close: "18:00", closed: false },
            wednesday: { open: "09:00", close: "18:00", closed: false },
            thursday: { open: "09:00", close: "18:00", closed: false },
            friday: { open: "09:00", close: "20:00", closed: false },
            saturday: { open: "10:00", close: "20:00", closed: false },
            sunday: { open: "10:00", close: "16:00", closed: false },
          },
          website: "https://scootscoot.com/downtown",
          description:
            "Our main branch located in the heart of downtown, offering a wide range of scooters for urban exploration.",
          status: "active",
        },
        {
          id: "branch-2",
          name: "Beach ScootScoot",
          address: "456 Ocean Avenue",
          city: "San Francisco",
          state: "CA",
          zipCode: "94121",
          country: "United States",
          phone: "(415) 555-5678",
          email: "beach@scootscoot.com",
          isMainBranch: false,
          managerId: "S-1002",
          managerName: "Emily Johnson",
          managerEmail: "emily.johnson@scootscoot.com",
          openingHours: {
            monday: { open: "10:00", close: "18:00", closed: false },
            tuesday: { open: "10:00", close: "18:00", closed: false },
            wednesday: { open: "10:00", close: "18:00", closed: false },
            thursday: { open: "10:00", close: "18:00", closed: false },
            friday: { open: "10:00", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "21:00", closed: false },
            sunday: { open: "09:00", close: "18:00", closed: false },
          },
          website: "https://scootscoot.com/beach",
          description: "Located near the beach, perfect for scenic coastal rides and beach exploration.",
          status: "active",
        },
      ]
    : []

  const [branches, setBranches] = useState<Branch[]>(initialBranches)
  const [isAddingBranch, setIsAddingBranch] = useState(false)
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null)
  const [expandedBranchId, setExpandedBranchId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null)

  // New branch form state
  const [formData, setFormData] = useState<Omit<Branch, "id">>({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    email: "",
    isMainBranch: branches.length === 0, // First branch is main by default
    managerId: null,
    managerName: null,
    managerEmail: null,
    openingHours: {
      monday: { open: "09:00", close: "17:00", closed: false },
      tuesday: { open: "09:00", close: "17:00", closed: false },
      wednesday: { open: "09:00", close: "17:00", closed: false },
      thursday: { open: "09:00", close: "17:00", closed: false },
      friday: { open: "09:00", close: "17:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: true },
    },
    website: "",
    description: "",
    status: "active",
  })

  const [staffMembers, setStaffMembers] = useState([
    {
      id: "S-1001",
      name: "John Smith",
      email: "john.smith@scootscoot.com",
      role: "manager",
    },
    {
      id: "S-1002",
      name: "Emily Johnson",
      email: "emily.johnson@scootscoot.com",
      role: "manager",
    },
    {
      id: "S-1003",
      name: "Michael Davis",
      email: "michael.davis@scootscoot.com",
      role: "staff",
    },
    {
      id: "S-1004",
      name: "Sarah Wilson",
      email: "sarah.wilson@scootscoot.com",
      role: "admin",
    },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleHoursChange = (day: keyof Branch["openingHours"], field: "open" | "close", value: string) => {
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: {
          ...formData.openingHours[day],
          [field]: value,
        },
      },
    })
  }

  const handleClosedDayChange = (day: keyof Branch["openingHours"], closed: boolean) => {
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: {
          ...formData.openingHours[day],
          closed,
        },
      },
    })
  }

  const handleAddBranch = () => {
    // Basic validation
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newBranch: Branch = {
      ...formData,
      id: `branch-${Date.now()}`,
    }

    // If this is set as main branch, update other branches
    if (newBranch.isMainBranch) {
      setBranches(
        branches.map((branch) => ({
          ...branch,
          isMainBranch: false,
        })),
      )
    }

    setBranches([...branches, newBranch])
    setIsAddingBranch(false)
    resetForm()

    toast({
      title: "Branch added",
      description: `${newBranch.name} has been added successfully.`,
    })
  }

  const handleEditBranch = () => {
    if (!editingBranchId) return

    // Basic validation
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const updatedBranches = branches.map((branch) => {
      if (branch.id === editingBranchId) {
        return {
          ...formData,
          id: branch.id,
        }
      }

      // If edited branch is now main branch, update other branches
      if (formData.isMainBranch && branch.id !== editingBranchId) {
        return {
          ...branch,
          isMainBranch: false,
        }
      }

      return branch
    })

    setBranches(updatedBranches)
    setEditingBranchId(null)
    resetForm()

    toast({
      title: "Branch updated",
      description: `${formData.name} has been updated successfully.`,
    })
  }

  const handleDeleteBranch = () => {
    if (!branchToDelete) return

    const branchName = branches.find((b) => b.id === branchToDelete)?.name || "Branch"

    // Check if it's the main branch
    const isMainBranch = branches.find((b) => b.id === branchToDelete)?.isMainBranch || false

    // Don't allow deleting the main branch if it's the only branch
    if (isMainBranch && branches.length === 1) {
      toast({
        title: "Cannot delete main branch",
        description: "You must have at least one branch. Set another branch as main before deleting this one.",
        variant: "destructive",
      })
      setIsDeleteDialogOpen(false)
      setBranchToDelete(null)
      return
    }

    // If deleting main branch, set another branch as main
    let updatedBranches = branches.filter((branch) => branch.id !== branchToDelete)

    if (isMainBranch && updatedBranches.length > 0) {
      updatedBranches = updatedBranches.map((branch, index) => {
        if (index === 0) {
          return {
            ...branch,
            isMainBranch: true,
          }
        }
        return branch
      })
    }

    setBranches(updatedBranches)
    setIsDeleteDialogOpen(false)
    setBranchToDelete(null)

    toast({
      title: "Branch deleted",
      description: `${branchName} has been deleted successfully.`,
    })
  }

  const startEditBranch = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId)
    if (!branch) return

    setFormData({
      name: branch.name,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      zipCode: branch.zipCode,
      country: branch.country,
      phone: branch.phone,
      email: branch.email,
      isMainBranch: branch.isMainBranch,
      managerId: branch.managerId,
      managerName: branch.managerName,
      managerEmail: branch.managerEmail,
      openingHours: branch.openingHours,
      website: branch.website || "",
      description: branch.description || "",
      status: branch.status,
    })
    setEditingBranchId(branchId)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      email: "",
      isMainBranch: branches.length === 0,
      managerId: null,
      managerName: null,
      managerEmail: null,
      openingHours: {
        monday: { open: "09:00", close: "17:00", closed: false },
        tuesday: { open: "09:00", close: "17:00", closed: false },
        wednesday: { open: "09:00", close: "17:00", closed: false },
        thursday: { open: "09:00", close: "17:00", closed: false },
        friday: { open: "09:00", close: "17:00", closed: false },
        saturday: { open: "10:00", close: "16:00", closed: false },
        sunday: { open: "10:00", close: "16:00", closed: true },
      },
      website: "",
      description: "",
      status: "active",
    })
  }

  const cancelForm = () => {
    setIsAddingBranch(false)
    setEditingBranchId(null)
    resetForm()
  }

  const toggleBranchExpansion = (branchId: string) => {
    if (expandedBranchId === branchId) {
      setExpandedBranchId(null)
    } else {
      setExpandedBranchId(branchId)
    }
  }

  const confirmDeleteBranch = (branchId: string) => {
    setBranchToDelete(branchId)
    setIsDeleteDialogOpen(true)
  }

  const handleManagerSelect = (managerId: string) => {
    const selectedManager = staffMembers.find((staff) => staff.id === managerId)
    if (selectedManager) {
      setFormData({
        ...formData,
        managerId: selectedManager.id,
        managerName: selectedManager.name,
        managerEmail: selectedManager.email,
      })
    } else {
      setFormData({
        ...formData,
        managerId: null,
        managerName: null,
        managerEmail: null,
      })
    }
  }

  const renderBranchForm = () => {
    return (
      <Card className="mb-6 bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30">
        <CardHeader>
          <CardTitle>{editingBranchId ? "Edit Branch" : "Add New Branch"}</CardTitle>
          <CardDescription>
            {editingBranchId ? "Update your branch information" : "Add a new branch location for your rental shop"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Basic Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Branch Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Downtown Branch"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value as "active" | "inactive")}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isMainBranch">Set as Main Branch</Label>
                  <Switch
                    id="isMainBranch"
                    checked={formData.isMainBranch}
                    onCheckedChange={(checked) => handleSwitchChange("isMainBranch", checked)}
                    disabled={
                      branches.length === 0 ||
                      (editingBranchId && branches.find((b) => b.id === editingBranchId)?.isMainBranch)
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  The main branch is used as the default location for your business.
                  {branches.length === 0 && " Since this is your first branch, it will be set as the main branch."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              Address Information <span className="text-red-500">*</span>
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="San Francisco"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="CA"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="94105"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="branch@scootscoot.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://scootscoot.com/branch"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Branch Manager</h3>
            <div className="space-y-2">
              <Label htmlFor="manager">Assign Manager</Label>
              <Select value={formData.managerId || ""} onValueChange={(value) => handleManagerSelect(value)}>
                <SelectTrigger id="manager">
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No manager assigned</SelectItem>
                  {staffMembers
                    .filter((staff) => staff.role === "manager" || staff.role === "admin")
                    .map((staff) => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.name} ({staff.email})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Can't find the right person? Add a new staff member with manager permissions.
                </p>
                <Link href="/shop-staff">
                  <Button variant="outline" size="sm" className="text-xs">
                    Manage Staff
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Opening Hours</h3>
            <div className="space-y-4">
              {(Object.keys(formData.openingHours) as Array<keyof Branch["openingHours"]>).map((day) => (
                <div key={day} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3 md:col-span-2">
                    <Label className="capitalize">{day}</Label>
                  </div>
                  <div className="col-span-9 md:col-span-3 flex items-center gap-2">
                    <Switch
                      id={`${day}-open`}
                      checked={!formData.openingHours[day].closed}
                      onCheckedChange={(checked) => handleClosedDayChange(day, !checked)}
                    />
                    <Label htmlFor={`${day}-open`} className="text-sm">
                      {formData.openingHours[day].closed ? "Closed" : "Open"}
                    </Label>
                  </div>
                  {!formData.openingHours[day].closed && (
                    <>
                      <div className="col-span-6 md:col-span-3">
                        <Input
                          type="time"
                          value={formData.openingHours[day].open}
                          onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                        />
                      </div>
                      <div className="col-span-6 md:col-span-3">
                        <Input
                          type="time"
                          value={formData.openingHours[day].close}
                          onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe this branch location..."
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={cancelForm}>
            Cancel
          </Button>
          <Button onClick={editingBranchId ? handleEditBranch : handleAddBranch}>
            {editingBranchId ? "Update Branch" : "Add Branch"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Branch Locations</h1>
          <p className="text-muted-foreground">Manage your rental shop locations</p>
        </div>

        {(isAddingBranch || editingBranchId) && renderBranchForm()}

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Branches</h2>
          {!isAddingBranch && !editingBranchId && (
            <Button onClick={() => setIsAddingBranch(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Branch
            </Button>
          )}
        </div>

        {branches.length === 0 ? (
          <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Branches Added Yet</h3>
              <p className="text-center text-muted-foreground mb-6 max-w-md">
                Add your first branch location to get started. Each branch can have its own address, contact
                information, and operating hours.
              </p>
              <Button onClick={() => setIsAddingBranch(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Branch
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {branches.map((branch) => (
              <Card
                key={branch.id}
                className={`bg-white/70 backdrop-blur-xl border ${
                  branch.isMainBranch
                    ? "border-yellow-300 dark:border-yellow-700"
                    : "border-white/20 dark:border-gray-700/30"
                } shadow-xl dark:bg-gray-800/60 transition-all`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {branch.name}
                        {branch.isMainBranch && (
                          <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-medium px-2 py-0.5 rounded">
                            Main Branch
                          </span>
                        )}
                        {branch.status === "inactive" && (
                          <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs font-medium px-2 py-0.5 rounded">
                            Inactive
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {branch.address}, {branch.city}, {branch.state} {branch.zipCode}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditBranch(branch.id)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDeleteBranch(branch.id)}
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                        disabled={branch.isMainBranch && branches.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleBranchExpansion(branch.id)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {expandedBranchId === branch.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="sr-only">{expandedBranchId === branch.id ? "Collapse" : "Expand"}</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {branch.openingHours.monday.closed
                          ? "Closed"
                          : `${branch.openingHours.monday.open} - ${branch.openingHours.monday.close}`}{" "}
                        (Monday)
                      </span>
                    </div>
                    {branch.website && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <a href={branch.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Website
                        </a>
                      </div>
                    )}
                    {branch.managerName && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <UserCog className="h-4 w-4" />
                        <span>Manager: {branch.managerName}</span>
                      </div>
                    )}
                  </div>

                  {expandedBranchId === branch.id && (
                    <div className="mt-4 pt-4 border-t">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="hours">
                          <AccordionTrigger className="text-sm font-medium">Opening Hours</AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {(Object.keys(branch.openingHours) as Array<keyof Branch["openingHours"]>).map((day) => (
                                <div key={day} className="flex justify-between py-1 capitalize">
                                  <span>{day}</span>
                                  <span>
                                    {branch.openingHours[day].closed
                                      ? "Closed"
                                      : `${branch.openingHours[day].open} - ${branch.openingHours[day].close}`}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        {branch.description && (
                          <AccordionItem value="description">
                            <AccordionTrigger className="text-sm font-medium">Description</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-muted-foreground">{branch.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                      </Accordion>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Branch</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this branch? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteBranch}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ShopLayout>
  )
}
