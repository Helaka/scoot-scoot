"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// Demo data - in a real app, this would come from an API
const branches = [
  { id: "all", name: "All Branches", isMain: false },
  { id: "branch-1", name: "Main Branch - Downtown", isMain: true },
  { id: "branch-2", name: "Beach Location", isMain: false },
  { id: "branch-3", name: "Airport Kiosk", isMain: false },
]

interface BranchSelectorProps {
  onBranchChange: (branchId: string) => void
  initialBranch?: string
  showAllOption?: boolean
  className?: string
}

export function BranchSelector({
  onBranchChange,
  initialBranch = "all",
  showAllOption = true,
  className,
}: BranchSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(initialBranch)

  // Filter branches based on showAllOption
  const filteredBranches = showAllOption ? branches : branches.filter((branch) => branch.id !== "all")

  // Set initial branch
  useEffect(() => {
    if (initialBranch) {
      setSelectedBranch(initialBranch)
    }
  }, [initialBranch])

  // Get the selected branch object
  const selected = branches.find((branch) => branch.id === selectedBranch)

  const handleSelect = (branchId: string) => {
    setSelectedBranch(branchId)
    setOpen(false)
    onBranchChange(branchId)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a branch"
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2 truncate">
            <Building2 className="h-4 w-4 shrink-0 opacity-50" />
            <span className="truncate">{selected?.name || "Select branch"}</span>
            {selected?.isMain && (
              <Badge variant="outline" className="ml-2 truncate">
                Main
              </Badge>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search branch..." />
          <CommandList>
            <CommandEmpty>No branch found.</CommandEmpty>
            <CommandGroup>
              {filteredBranches.map((branch) => (
                <CommandItem key={branch.id} value={branch.id} onSelect={() => handleSelect(branch.id)}>
                  <div className="flex items-center gap-2 w-full">
                    <Check className={cn("mr-2 h-4 w-4", selectedBranch === branch.id ? "opacity-100" : "opacity-0")} />
                    <span className="flex-1 truncate">{branch.name}</span>
                    {branch.isMain && (
                      <Badge variant="outline" className="ml-auto">
                        Main
                      </Badge>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
