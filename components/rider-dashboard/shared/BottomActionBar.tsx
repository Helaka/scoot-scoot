import { Home, Map, Clock, User, Shield, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { RiderContextState } from "@/contexts/rider-context"

interface BottomActionBarProps {
  contextState: RiderContextState
}

export function BottomActionBar({ contextState }: BottomActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around z-10">
      {/* Common actions */}
      <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-16 w-16">
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Button>

      {/* Context-specific actions */}
      {contextState === "looking" && (
        <>
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-16 w-16">
            <Map className="h-6 w-6" />
            <span className="text-xs mt-1">Map</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-16 w-16">
            <Clock className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </Button>
        </>
      )}

      {contextState === "active" && (
        <>
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-16 w-16">
            <Navigation className="h-6 w-6" />
            <span className="text-xs mt-1">Navigate</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-16 w-16">
            <Shield className="h-6 w-6" />
            <span className="text-xs mt-1">Safety</span>
          </Button>
        </>
      )}

      {contextState === "post_rental" && (
        <>
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-16 w-16">
            <Map className="h-6 w-6" />
            <span className="text-xs mt-1">Find New</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-16 w-16">
            <Clock className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </Button>
        </>
      )}

      {/* Common actions */}
      <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-16 w-16">
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Profile</span>
      </Button>
    </div>
  )
}
