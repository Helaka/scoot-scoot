import type { ShopUser } from "@/types/user-types"

// In a real app, this would come from an authentication service
// For now, we'll use a simple mock implementation
class RoleDetectionService {
  // Mock user data
  private users: Record<string, ShopUser> = {
    "owner-1": {
      id: "owner-1",
      name: "Alex Johnson",
      email: "alex@scootscoot.com",
      role: "owner",
      permissions: ["manage_staff", "manage_finances", "manage_scooters", "manage_settings", "manage_customers"],
    },
    "manager-1": {
      id: "manager-1",
      name: "Jamie Smith",
      email: "jamie@scootscoot.com",
      role: "manager",
      permissions: ["manage_staff", "view_finances", "manage_scooters", "manage_customers"],
    },
    "mechanic-1": {
      id: "mechanic-1",
      name: "Chris Rodriguez",
      email: "chris@scootscoot.com",
      role: "mechanic",
      permissions: ["manage_maintenance", "view_scooters"],
    },
    "front-desk-1": {
      id: "front-desk-1",
      name: "Taylor Lee",
      email: "taylor@scootscoot.com",
      role: "front-desk",
      permissions: ["manage_bookings", "view_customers", "process_payments"],
    },
    "staff-1": {
      id: "staff-1",
      name: "Jordan Wilson",
      email: "jordan@scootscoot.com",
      role: "staff",
      permissions: ["view_bookings", "view_customers"],
    },
  }

  // Get user by ID
  public getUserById(id: string): ShopUser | null {
    return this.users[id] || null
  }

  // Get user by email
  public getUserByEmail(email: string): ShopUser | null {
    const user = Object.values(this.users).find((u) => u.email === email)
    return user || null
  }

  // Get current user (in a real app, this would check auth state)
  public getCurrentUser(): ShopUser | null {
    // For demo purposes, we'll return a user based on URL or other factors
    // In a real app, this would come from authentication

    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const role = urlParams.get("role")

      if (role === "manager") return this.users["manager-1"]
      if (role === "mechanic") return this.users["mechanic-1"]
      if (role === "front-desk") return this.users["front-desk-1"]
      if (role === "staff") return this.users["staff-1"]
    }

    // Default to owner
    return this.users["owner-1"]
  }

  // Check if user has permission
  public hasPermission(user: ShopUser, permission: string): boolean {
    return user.permissions.includes(permission)
  }
}

// Create and export a singleton instance
export const roleDetectionService = new RoleDetectionService()
