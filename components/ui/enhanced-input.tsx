"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        filled: "bg-muted/50 border-transparent focus-visible:bg-background",
        ghost: "border-transparent",
        underlined: "rounded-none border-0 border-b-2 px-0 focus-visible:ring-0 focus-visible:border-primary",
      },
      size: {
        default: "h-10",
        sm: "h-8 text-xs rounded-md px-2.5",
        lg: "h-12 rounded-lg px-4",
        xl: "h-14 text-base rounded-lg px-5",
      },
      rounded: {
        default: "",
        full: "rounded-full",
      },
      withIcon: {
        true: "pl-9",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      withIcon: false,
    },
  },
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  error?: string
}

const EnhancedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, rounded, withIcon, icon, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="relative w-full">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}

        <input
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            inputVariants({ variant, size, rounded, withIcon: !!icon, className }),
            error && "border-destructive focus-visible:ring-destructive",
          )}
          ref={ref}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    )
  },
)
EnhancedInput.displayName = "EnhancedInput"

export { EnhancedInput }
