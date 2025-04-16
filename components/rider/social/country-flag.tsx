"use client"

interface CountryFlagProps {
  countryCode: string
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  className?: string
}

// Map of country codes to country names
const countryNames: Record<string, string> = {
  US: "United States",
  UK: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  NZ: "New Zealand",
  JP: "Japan",
  KR: "South Korea",
  CN: "China",
  IN: "India",
  BR: "Brazil",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  SG: "Singapore",
  TH: "Thailand",
  VN: "Vietnam",
  MY: "Malaysia",
  ID: "Indonesia",
  PH: "Philippines",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  PE: "Peru",
  ZA: "South Africa",
  // Add more as needed
}

export function CountryFlag({ countryCode, size = "md", showTooltip = true, className = "" }: CountryFlagProps) {
  // Convert country code to flag emoji
  const getCountryFlag = (code: string): string => {
    const codePoints = code
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  // Get country name from code
  const getCountryName = (code: string): string => {
    return countryNames[code.toUpperCase()] || code
  }

  // Size classes
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const flag = getCountryFlag(countryCode)

  if (!showTooltip) {
    return (
      <span className={`${sizeClasses[size]} ${className}`} title={getCountryName(countryCode)}>
        {flag}
      </span>
    )
  }

  return (
    <span className={`${sizeClasses[size]} ${className} cursor-help`} title={getCountryName(countryCode)}>
      {flag}
    </span>
  )
}
