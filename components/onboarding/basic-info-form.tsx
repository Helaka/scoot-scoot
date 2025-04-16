"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"

interface BasicInfoFormProps {
  onFormUpdate: (data: Record<string, any>) => void
  initialData?: Record<string, any>
}

export function BasicInfoForm({ onFormUpdate, initialData = {} }: BasicInfoFormProps) {
  const [name, setName] = useState(initialData.name || "")
  const [email, setEmail] = useState(initialData.email || "")
  const [phone, setPhone] = useState(initialData.phone || "")
  const [country, setCountry] = useState(initialData.country || "")
  const { isMobile } = useMobile()

  // Update parent component when form data changes
  useEffect(() => {
    onFormUpdate({ name, email, phone, country })
  }, [name, email, phone, country, onFormUpdate])

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          autoComplete="name"
          className={isMobile ? "h-12" : ""}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          className={isMobile ? "h-12" : ""}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          autoComplete="tel"
          className={isMobile ? "h-12" : ""}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="country">Country</Label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger id="country" className={isMobile ? "h-12" : ""}>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="th">Thailand</SelectItem>
            <SelectItem value="vn">Vietnam</SelectItem>
            <SelectItem value="id">Indonesia</SelectItem>
            <SelectItem value="my">Malaysia</SelectItem>
            <SelectItem value="sg">Singapore</SelectItem>
            <SelectItem value="ph">Philippines</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
