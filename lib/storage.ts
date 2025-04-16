// Simple storage utility for persisting data

export const STORAGE_KEYS = {
  RIDER_CONTEXT: "scootscoot-rider-context",
  USER_PREFERENCES: "scootscoot-user-preferences",
  AUTH_TOKEN: "scootscoot-auth-token",
}

export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(key, serialized)
  } catch (error) {
    console.error("Error saving to storage:", error)
  }
}

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  try {
    const serialized = localStorage.getItem(key)
    if (serialized === null) return defaultValue
    return JSON.parse(serialized) as T
  } catch (error) {
    console.error("Error getting from storage:", error)
    return defaultValue
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error("Error removing from storage:", error)
  }
}

export function clearStorage(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.clear()
  } catch (error) {
    console.error("Error clearing storage:", error)
  }
}
