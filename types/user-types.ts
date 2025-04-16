export type ShopUserRole = "owner" | "manager" | "mechanic" | "front-desk" | "staff"

export interface ShopUser {
  id: string
  name: string
  email: string
  role: ShopUserRole
  permissions: string[]
  avatar?: string
}
