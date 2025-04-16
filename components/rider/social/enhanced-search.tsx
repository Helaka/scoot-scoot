"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X, User, MapPin, Calendar, Coffee, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type EnhancedSearchProps = {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function EnhancedSearch({ onSearch, placeholder = "Search...", className = "" }: EnhancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock suggestions data
  const suggestions = [
    {
      type: "rider",
      value: "Alex Chen",
      icon: <User className="h-4 w-4 text-blue-500" />,
      avatar: "/placeholder.svg?height=32&width=32",
      description: "@alexrider",
    },
    {
      type: "rider",
      value: "Sarah Kim",
      icon: <User className="h-4 w-4 text-blue-500" />,
      avatar: "/placeholder.svg?height=32&width=32",
      description: "@sarahk",
    },
    {
      type: "location",
      value: "Downtown Park",
      icon: <MapPin className="h-4 w-4 text-red-500" />,
      description: "Popular meeting spot",
    },
    {
      type: "location",
      value: "Beach Boardwalk",
      icon: <MapPin className="h-4 w-4 text-red-500" />,
      description: "Scenic coastal route",
    },
    {
      type: "interest",
      value: "Café Hopping",
      icon: <Coffee className="h-4 w-4 text-brown-500" />,
      description: "Find riders who enjoy visiting cafés",
    },
    {
      type: "interest",
      value: "Photography",
      icon: <Camera className="h-4 w-4 text-purple-500" />,
      description: "Find riders who enjoy taking photos",
    },
    {
      type: "group",
      value: "Sunset Beach Cruise",
      icon: <Calendar className="h-4 w-4 text-orange-500" />,
      description: "Today, 5:30 PM",
    },
  ]

  // Filter suggestions based on search query
  const filteredSuggestions =
    searchQuery.length > 0
      ? suggestions.filter(
          (suggestion) =>
            suggestion.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
            suggestion.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : []

  // Handle search submission
  const handleSearch = (value: string) => {
    if (!value.trim()) return

    onSearch(value)
    setSearchQuery(value)
    setOpen(false)

    // Add to recent searches if not already there
    if (!recentSearches.includes(value)) {
      setRecentSearches((prev) => [value, ...prev].slice(0, 5))
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    onSearch("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              className="pl-10 pr-10 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-300 dark:border-gray-700 rounded-full shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery)
                }
              }}
              onClick={() => setOpen(true)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              >
                <X className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[300px] overflow-hidden"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search..." value={searchQuery} onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>
              {recentSearches.length > 0 && (
                <CommandGroup heading="Recent Searches">
                  {recentSearches.map((search, index) => (
                    <CommandItem
                      key={`recent-${index}`}
                      onSelect={() => handleSearch(search)}
                      className="flex items-center gap-2"
                    >
                      <div className="text-muted-foreground">
                        <Search className="h-4 w-4" />
                      </div>
                      <span>{search}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {filteredSuggestions.length > 0 && (
                <CommandGroup heading="Suggestions">
                  {filteredSuggestions.map((suggestion, index) => (
                    <CommandItem
                      key={`suggestion-${index}`}
                      onSelect={() => handleSearch(suggestion.value)}
                      className="flex items-center gap-2"
                    >
                      {suggestion.type === "rider" ? (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={suggestion.avatar} alt={suggestion.value} />
                          <AvatarFallback>{suggestion.value.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="text-muted-foreground">{suggestion.icon}</div>
                      )}
                      <div className="flex flex-col">
                        <span>{suggestion.value}</span>
                        <span className="text-xs text-muted-foreground">{suggestion.description}</span>
                      </div>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {suggestion.type}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
