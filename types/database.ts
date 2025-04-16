// Database types that match our Supabase schema

export interface User {
  id: string
  email: string
  role: "rider" | "shop_owner" | "shop_staff" | "admin"
  first_name: string | null
  last_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
  last_login: string | null
  status: "active" | "inactive" | "suspended"
  profile_image_url: string | null
}

export interface Shop {
  id: string
  owner_id: string
  name: string
  description: string | null
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
  latitude: number | null
  longitude: number | null
  phone: string | null
  email: string | null
  website: string | null
  logo_url: string | null
  business_hours: any | null
  created_at: string
  updated_at: string
  status: "active" | "inactive" | "pending" | "suspended"
  subscription_plan: string
  onboarding_completed: boolean
}

export interface Branch {
  id: string
  shop_id: string
  name: string
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
  latitude: number | null
  longitude: number | null
  phone: string | null
  email: string | null
  manager_id: string | null
  created_at: string
  updated_at: string
  status: "active" | "inactive"
}

export interface ShopStaff {
  id: string
  shop_id: string
  branch_id: string | null
  user_id: string
  role: "owner" | "manager" | "mechanic" | "front-desk" | "staff"
  permissions: any
  created_at: string
  updated_at: string
  status: "active" | "inactive" | "suspended"
}

export interface Scooter {
  id: string
  shop_id: string
  branch_id: string | null
  name: string | null
  model: string | null
  description: string | null
  year: number | null
  license_plate: string | null
  status: "available" | "rented" | "maintenance" | "reserved" | "inactive"
  hourly_rate: number | null
  daily_rate: number | null
  weekly_rate: number | null
  image_urls: string[] | null
  features: any | null
  specifications: any | null
  location_latitude: number | null
  location_longitude: number | null
  created_at: string
  updated_at: string
  fuel_type: "petrol" | "electric" | "hybrid" | null
  fuel_level: number | null
  battery_level: number | null
  mileage: number | null
  color: string | null
  engine_size: number | null
  last_maintenance: string | null
  next_maintenance_due: string | null
}

export interface RiderProfile {
  id: string
  user_id: string
  license_number: string | null
  license_country: string | null
  license_expiry: string | null
  date_of_birth: string | null
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  created_at: string
  updated_at: string
  verification_status: "unverified" | "pending" | "verified" | "rejected" | "expired" | "trusted"
  license_image_url: string | null
  id_image_url: string | null
  selfie_url: string | null
}

export interface Booking {
  id: string
  rider_id: string
  scooter_id: string
  shop_id: string
  start_time: string
  end_time: string
  pickup_location: string | null
  dropoff_location: string | null
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled"
  total_amount: number | null
  payment_status: "pending" | "paid" | "refunded" | "failed"
  created_at: string
  updated_at: string
  cancellation_reason: string | null
  notes: string | null
}

export interface InsurancePolicy {
  id: string
  shop_id: string
  name: string
  description: string | null
  price: number
  coverage_details: any | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BookingInsurance {
  id: string
  booking_id: string
  insurance_id: string
  price: number
  created_at: string
}

export interface OnboardingSession {
  id: string
  shop_id: string
  rider_id: string | null
  activation_code: string
  qr_code_url: string | null
  created_at: string
  expires_at: string
  activated_at: string | null
  completed_at: string | null
  status: "pending" | "activated" | "in_progress" | "completed" | "expired" | "rejected"
  completed_steps: any
  current_step: string | null
  metadata: any | null
}

export interface OnboardingDocument {
  id: string
  session_id: string
  rider_id: string | null
  type: "id" | "license" | "passport" | "signature" | "face" | "consent" | "other"
  url: string
  uploaded_at: string
  verified: boolean
  verified_at: string | null
  verified_by: string | null
  metadata: any | null
}

export interface RiderVerification {
  id: string
  rider_id: string
  session_id: string | null
  status: "unverified" | "pending" | "verified" | "rejected" | "expired" | "trusted"
  method: "self" | "shop" | "admin" | "paper" | null
  verified_by: string | null
  verified_at: string | null
  expires_at: string | null
  identity_document_url: string | null
  signature_url: string | null
  face_scan_url: string | null
  rejection_reason: string | null
  metadata: any | null
  created_at: string
  updated_at: string
}

export interface RentalAgreement {
  id: string
  session_id: string | null
  rider_id: string
  shop_id: string
  signed_at: string
  expires_at: string | null
  document_url: string
  terms_accepted: boolean
  version: string
  created_at: string
}

export interface Blacklist {
  id: string
  rider_id: string | null
  document_number: string | null
  document_type: "id" | "license" | "passport" | null
  reason: string
  added_by: string
  shop_id: string | null
  is_global: boolean
  created_at: string
  expires_at: string | null
  status: "active" | "inactive" | "expired"
  notes: string | null
  evidence_urls: string[] | null
}

export interface RiderDRP {
  id: string
  rider_id: string
  status: "pending" | "approved" | "rejected" | "expired"
  application_date: string
  approved_date: string | null
  expires_date: string | null
  discount_percentage: number
  approved_by: string | null
  document_url: string | null
  notes: string | null
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  read: boolean
  created_at: string
  action_url: string | null
  metadata: any | null
}
