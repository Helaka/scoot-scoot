export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  const dateObj = typeof date === "string" ? new Date(date) : date

  return new Intl.DateTimeFormat("en-US", options || defaultOptions).format(dateObj)
}

export function formatDateTime(date: string | Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(dateObj)
}

export function formatTime(date: string | Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(dateObj)
}

export function calculateDuration(startDate: string | Date, endDate: string | Date) {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate
  const end = typeof endDate === "string" ? new Date(endDate) : endDate

  const durationMs = end.getTime() - start.getTime()
  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""}${hours > 0 ? `, ${hours} hour${hours !== 1 ? "s" : ""}` : ""}`
  }

  return `${hours} hour${hours !== 1 ? "s" : ""}`
}
