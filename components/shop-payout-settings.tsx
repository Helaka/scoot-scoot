"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { CreditCard, BanknoteIcon as Bank, DollarSign, AlertCircle, Plus, Trash2, Edit, Save } from "lucide-react"
import { ShopLayout } from "./shop-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface PaymentMethod {
  id: string
  type: "bank_account" | "paypal" | "venmo" | "check"
  isDefault: boolean
  details: {
    accountName?: string
    accountNumber?: string
    routingNumber?: string
    bankName?: string
    email?: string
    phone?: string
    address?: string
  }
}

interface PayoutSettings {
  frequency: "daily" | "weekly" | "biweekly" | "monthly"
  minimumAmount: number
  automaticPayouts: boolean
  paymentMethods: PaymentMethod[]
  taxInformation: {
    taxId: string
    businessType: string
    taxDocuments: string[]
  }
}

export function ShopPayoutSettings() {
  const searchParams = useSearchParams()
  const isDemo = searchParams?.get("demo") === "true"

  // Demo data
  const initialSettings: PayoutSettings = isDemo
    ? {
        frequency: "weekly",
        minimumAmount: 50,
        automaticPayouts: true,
        paymentMethods: [
          {
            id: "pm-1",
            type: "bank_account",
            isDefault: true,
            details: {
              accountName: "ScootScoot LLC",
              accountNumber: "****6789",
              routingNumber: "****4321",
              bankName: "Chase Bank",
            },
          },
          {
            id: "pm-2",
            type: "paypal",
            isDefault: false,
            details: {
              email: "payments@scootscoot.com",
            },
          },
        ],
        taxInformation: {
          taxId: "XX-XXXXXXX",
          businessType: "llc",
          taxDocuments: ["W-9 Form"],
        },
      }
    : {
        frequency: "weekly",
        minimumAmount: 50,
        automaticPayouts: true,
        paymentMethods: [],
        taxInformation: {
          taxId: "",
          businessType: "",
          taxDocuments: [],
        },
      }

  const [settings, setSettings] = useState<PayoutSettings>(initialSettings)
  const [activeTab, setActiveTab] = useState("payment-methods")
  const [isAddingMethod, setIsAddingMethod] = useState(false)
  const [editingMethodId, setEditingMethodId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [methodToDelete, setMethodToDelete] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // New payment method form state
  const [newMethod, setNewMethod] = useState<Omit<PaymentMethod, "id">>({
    type: "bank_account",
    isDefault: settings.paymentMethods.length === 0,
    details: {},
  })

  const handleFrequencyChange = (value: string) => {
    setSettings({
      ...settings,
      frequency: value as PayoutSettings["frequency"],
    })
  }

  const handleMinimumAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10) || 0
    setSettings({
      ...settings,
      minimumAmount: value,
    })
  }

  const handleAutomaticPayoutsChange = (checked: boolean) => {
    setSettings({
      ...settings,
      automaticPayouts: checked,
    })
  }

  const handleNewMethodTypeChange = (value: string) => {
    setNewMethod({
      ...newMethod,
      type: value as PaymentMethod["type"],
      details: {},
    })
  }

  const handleNewMethodDetailChange = (field: string, value: string) => {
    setNewMethod({
      ...newMethod,
      details: {
        ...newMethod.details,
        [field]: value,
      },
    })
  }

  const handleNewMethodDefaultChange = (checked: boolean) => {
    setNewMethod({
      ...newMethod,
      isDefault: checked,
    })
  }

  const validateNewMethod = () => {
    if (newMethod.type === "bank_account") {
      if (
        !newMethod.details.accountName ||
        !newMethod.details.accountNumber ||
        !newMethod.details.routingNumber ||
        !newMethod.details.bankName
      ) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields for bank account.",
          variant: "destructive",
        })
        return false
      }
    } else if (newMethod.type === "paypal" || newMethod.type === "venmo") {
      if (!newMethod.details.email) {
        toast({
          title: "Missing information",
          description: `Please provide an email address for your ${newMethod.type === "paypal" ? "PayPal" : "Venmo"} account.`,
          variant: "destructive",
        })
        return false
      }
    } else if (newMethod.type === "check") {
      if (!newMethod.details.address) {
        toast({
          title: "Missing information",
          description: "Please provide a mailing address for check payments.",
          variant: "destructive",
        })
        return false
      }
    }
    return true
  }

  const addPaymentMethod = () => {
    if (!validateNewMethod()) return

    const newPaymentMethod: PaymentMethod = {
      ...newMethod,
      id: `pm-${Date.now()}`,
    }

    // If this is set as default, update other methods
    let updatedMethods = settings.paymentMethods
    if (newPaymentMethod.isDefault) {
      updatedMethods = updatedMethods.map((method) => ({
        ...method,
        isDefault: false,
      }))
    }

    setSettings({
      ...settings,
      paymentMethods: [...updatedMethods, newPaymentMethod],
    })

    setIsAddingMethod(false)
    setNewMethod({
      type: "bank_account",
      isDefault: settings.paymentMethods.length === 0,
      details: {},
    })

    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    })
  }

  const startEditMethod = (methodId: string) => {
    const method = settings.paymentMethods.find((m) => m.id === methodId)
    if (!method) return

    setNewMethod({
      type: method.type,
      isDefault: method.isDefault,
      details: { ...method.details },
    })

    setEditingMethodId(methodId)
    setIsAddingMethod(true)
  }

  const updatePaymentMethod = () => {
    if (!validateNewMethod() || !editingMethodId) return

    // If this is set as default, update other methods
    const updatedMethods = settings.paymentMethods.map((method) => {
      if (method.id === editingMethodId) {
        return {
          ...newMethod,
          id: method.id,
        }
      }

      // If edited method is now default, update other methods
      if (newMethod.isDefault && method.id !== editingMethodId) {
        return {
          ...method,
          isDefault: false,
        }
      }

      return method
    })

    setSettings({
      ...settings,
      paymentMethods: updatedMethods,
    })

    setIsAddingMethod(false)
    setEditingMethodId(null)
    setNewMethod({
      type: "bank_account",
      isDefault: settings.paymentMethods.length === 0,
      details: {},
    })

    toast({
      title: "Payment method updated",
      description: "Your payment method has been updated successfully.",
    })
  }

  const confirmDeleteMethod = (methodId: string) => {
    setMethodToDelete(methodId)
    setIsDeleteDialogOpen(true)
  }

  const deletePaymentMethod = () => {
    if (!methodToDelete) return

    const methodToRemove = settings.paymentMethods.find((m) => m.id === methodToDelete)
    if (!methodToRemove) return

    // Check if it's the default method
    const isDefault = methodToRemove.isDefault

    // Remove the method
    let updatedMethods = settings.paymentMethods.filter((method) => method.id !== methodToDelete)

    // If we removed the default method and there are other methods, set the first one as default
    if (isDefault && updatedMethods.length > 0) {
      updatedMethods = updatedMethods.map((method, index) => {
        if (index === 0) {
          return {
            ...method,
            isDefault: true,
          }
        }
        return method
      })
    }

    setSettings({
      ...settings,
      paymentMethods: updatedMethods,
    })

    setIsDeleteDialogOpen(false)
    setMethodToDelete(null)

    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully.",
    })
  }

  const cancelAddEdit = () => {
    setIsAddingMethod(false)
    setEditingMethodId(null)
    setNewMethod({
      type: "bank_account",
      isDefault: settings.paymentMethods.length === 0,
      details: {},
    })
  }

  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      taxInformation: {
        ...settings.taxInformation,
        taxId: e.target.value,
      },
    })
  }

  const handleBusinessTypeChange = (value: string) => {
    setSettings({
      ...settings,
      taxInformation: {
        ...settings.taxInformation,
        businessType: value,
      },
    })
  }

  const saveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your payout settings have been saved successfully.",
      })
    }, 1000)
  }

  const renderPaymentMethodForm = () => {
    return (
      <Card className="mb-6 bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30">
        <CardHeader>
          <CardTitle>{editingMethodId ? "Edit Payment Method" : "Add Payment Method"}</CardTitle>
          <CardDescription>
            {editingMethodId
              ? "Update your payment method details"
              : "Add a new payment method to receive your payouts"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Payment Method Type</Label>
            <RadioGroup
              value={newMethod.type}
              onValueChange={handleNewMethodTypeChange}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank_account" id="bank_account" />
                <Label htmlFor="bank_account" className="flex items-center gap-2 cursor-pointer">
                  <Bank className="h-4 w-4" />
                  Bank Account
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  PayPal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="venmo" id="venmo" />
                <Label htmlFor="venmo" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  Venmo
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="check" id="check" />
                <Label htmlFor="check" className="flex items-center gap-2 cursor-pointer">
                  <DollarSign className="h-4 w-4" />
                  Check
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            {newMethod.type === "bank_account" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">
                      Account Holder Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountName"
                      value={newMethod.details.accountName || ""}
                      onChange={(e) => handleNewMethodDetailChange("accountName", e.target.value)}
                      placeholder="John Doe or Business Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">
                      Bank Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bankName"
                      value={newMethod.details.bankName || ""}
                      onChange={(e) => handleNewMethodDetailChange("bankName", e.target.value)}
                      placeholder="Chase, Bank of America, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">
                      Routing Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="routingNumber"
                      value={newMethod.details.routingNumber || ""}
                      onChange={(e) => handleNewMethodDetailChange("routingNumber", e.target.value)}
                      placeholder="123456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">
                      Account Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountNumber"
                      value={newMethod.details.accountNumber || ""}
                      onChange={(e) => handleNewMethodDetailChange("accountNumber", e.target.value)}
                      placeholder="987654321"
                    />
                  </div>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Secure Information</AlertTitle>
                  <AlertDescription>
                    Your banking information is encrypted and stored securely. We use industry-standard security
                    measures to protect your data.
                  </AlertDescription>
                </Alert>
              </>
            )}

            {(newMethod.type === "paypal" || newMethod.type === "venmo") && (
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newMethod.details.email || ""}
                  onChange={(e) => handleNewMethodDetailChange("email", e.target.value)}
                  placeholder="your-email@example.com"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the email address associated with your {newMethod.type === "paypal" ? "PayPal" : "Venmo"}{" "}
                  account.
                </p>
              </div>
            )}

            {newMethod.type === "check" && (
              <div className="space-y-2">
                <Label htmlFor="address">
                  Mailing Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  value={newMethod.details.address || ""}
                  onChange={(e) => handleNewMethodDetailChange("address", e.target.value)}
                  placeholder="123 Main St, Apt 4B&#10;San Francisco, CA 94105"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Enter the address where you would like to receive check payments. Please note that check payments may
                  take 7-10 business days to arrive.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isDefault">Set as Default Payment Method</Label>
              <p className="text-sm text-muted-foreground">This will be your primary method for receiving payouts.</p>
            </div>
            <Switch
              id="isDefault"
              checked={newMethod.isDefault}
              onCheckedChange={handleNewMethodDefaultChange}
              disabled={
                settings.paymentMethods.length === 0 ||
                (editingMethodId && settings.paymentMethods.find((m) => m.id === editingMethodId)?.isDefault)
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={cancelAddEdit}>
            Cancel
          </Button>
          <Button onClick={editingMethodId ? updatePaymentMethod : addPaymentMethod}>
            {editingMethodId ? "Update Method" : "Add Method"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const renderPaymentMethodCard = (method: PaymentMethod) => {
    let icon, title, details

    switch (method.type) {
      case "bank_account":
        icon = <Bank className="h-5 w-5" />
        title = `${method.details.bankName} (${method.details.accountNumber})`
        details = `${method.details.accountName}`
        break
      case "paypal":
        icon = <CreditCard className="h-5 w-5" />
        title = "PayPal"
        details = method.details.email
        break
      case "venmo":
        icon = <CreditCard className="h-5 w-5" />
        title = "Venmo"
        details = method.details.email
        break
      case "check":
        icon = <DollarSign className="h-5 w-5" />
        title = "Check"
        details = method.details.address?.split("&#10;").join(", ")
        break
    }

    return (
      <Card
        key={method.id}
        className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30"
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  {title}
                  {method.isDefault && (
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{details}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => startEditMethod(method.id)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => confirmDeleteMethod(method.id)}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                disabled={method.isDefault && settings.paymentMethods.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <ShopLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Payout Settings</h1>
          <p className="text-muted-foreground">Manage how and when you receive payments from ScootScoot</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="payment-methods" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Methods</span>
            </TabsTrigger>
            <TabsTrigger value="payout-preferences" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Payout Preferences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment-methods" className="space-y-6 mt-6">
            {isAddingMethod && renderPaymentMethodForm()}

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Payment Methods</h2>
              {!isAddingMethod && (
                <Button onClick={() => setIsAddingMethod(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Payment Method
                </Button>
              )}
            </div>

            {settings.paymentMethods.length === 0 ? (
              <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Payment Methods Added</h3>
                  <p className="text-center text-muted-foreground mb-6 max-w-md">
                    Add a payment method to receive payouts from your ScootScoot rentals. You can add bank accounts,
                    PayPal, Venmo, or opt for check payments.
                  </p>
                  <Button onClick={() => setIsAddingMethod(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Your First Payment Method
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {settings.paymentMethods.map((method) => renderPaymentMethodCard(method))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="payout-preferences" className="space-y-6 mt-6">
            <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30">
              <CardHeader>
                <CardTitle>Payout Schedule</CardTitle>
                <CardDescription>Configure when and how you receive your payouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Payout Frequency</Label>
                    <Select value={settings.frequency} onValueChange={handleFrequencyChange}>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly (Every Monday)</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly (Every other Monday)</SelectItem>
                        <SelectItem value="monthly">Monthly (1st of each month)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Choose how often you want to receive payouts from your rentals.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumAmount">Minimum Payout Amount ($)</Label>
                    <Input
                      id="minimumAmount"
                      type="number"
                      min="0"
                      value={settings.minimumAmount}
                      onChange={handleMinimumAmountChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      We'll only send a payout when your balance exceeds this amount.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="automaticPayouts">Automatic Payouts</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically send payouts according to your schedule.
                      </p>
                    </div>
                    <Switch
                      id="automaticPayouts"
                      checked={settings.automaticPayouts}
                      onCheckedChange={handleAutomaticPayoutsChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-gray-800/60 dark:border-gray-700/30">
              <CardHeader>
                <CardTitle>Tax Information</CardTitle>
                <CardDescription>Provide your tax details for reporting purposes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID Number (EIN or SSN)</Label>
                    <Input
                      id="taxId"
                      value={settings.taxInformation.taxId}
                      onChange={handleTaxIdChange}
                      placeholder="XX-XXXXXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select value={settings.taxInformation.businessType} onValueChange={handleBusinessTypeChange}>
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual/Sole Proprietor</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="non_profit">Non-profit Organization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Tax Documents</AlertTitle>
                    <AlertDescription>
                      You'll need to complete a W-9 form (for US businesses) or W-8BEN form (for non-US businesses).
                      These forms will be available in your tax documents section once you save your settings.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={saveSettings} disabled={isSaving} className="flex items-center gap-2">
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Payout Settings
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Payment Method</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this payment method? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={deletePaymentMethod}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ShopLayout>
  )
}

export default ShopPayoutSettings
