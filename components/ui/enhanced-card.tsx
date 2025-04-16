import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-xl border bg-card text-card-foreground shadow-sm", {
  variants: {
    variant: {
      default: "",
      elevated: "shadow-md",
      outline: "border-2",
      ghost: "border-none shadow-none bg-transparent",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 dark:bg-black/10 dark:border-white/10",
    },
    hover: {
      default: "",
      lift: "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
      glow: "transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,195,0,0.3)]",
      border: "transition-all duration-300 hover:border-primary",
    },
    padding: {
      default: "p-6",
      none: "p-0",
      sm: "p-4",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    hover: "default",
    padding: "default",
  },
})

export interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

function EnhancedCard({ className, variant, hover, padding, ...props }: EnhancedCardProps) {
  return <div className={cn(cardVariants({ variant, hover, padding }), className)} {...props} />
}

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    padding: {
      default: "p-6",
      none: "p-0",
      sm: "p-4",
      lg: "p-8",
    },
  },
  defaultVariants: {
    padding: "default",
  },
})

interface EnhancedCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

function EnhancedCardHeader({ className, padding, ...props }: EnhancedCardHeaderProps) {
  return <div className={cn(cardHeaderVariants({ padding }), className)} {...props} />
}

const cardTitleVariants = cva("text-2xl font-semibold leading-none tracking-tight", {
  variants: {
    variant: {
      default: "",
      gradient: "bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface EnhancedCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {}

function EnhancedCardTitle({ className, variant, ...props }: EnhancedCardTitleProps) {
  return <h3 className={cn(cardTitleVariants({ variant }), className)} {...props} />
}

const cardDescriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {
    variant: {
      default: "",
      large: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface EnhancedCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {}

function EnhancedCardDescription({ className, variant, ...props }: EnhancedCardDescriptionProps) {
  return <p className={cn(cardDescriptionVariants({ variant }), className)} {...props} />
}

const cardContentVariants = cva("", {
  variants: {
    padding: {
      default: "p-6 pt-0",
      none: "p-0",
      sm: "p-4 pt-0",
      lg: "p-8 pt-0",
    },
  },
  defaultVariants: {
    padding: "default",
  },
})

interface EnhancedCardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

function EnhancedCardContent({ className, padding, ...props }: EnhancedCardContentProps) {
  return <div className={cn(cardContentVariants({ padding }), className)} {...props} />
}

const cardFooterVariants = cva("flex items-center", {
  variants: {
    padding: {
      default: "p-6 pt-0",
      none: "p-0",
      sm: "p-4 pt-0",
      lg: "p-8 pt-0",
    },
    align: {
      default: "justify-between",
      start: "justify-start gap-2",
      end: "justify-end gap-2",
      center: "justify-center gap-2",
      stretch: "justify-stretch",
    },
  },
  defaultVariants: {
    padding: "default",
    align: "default",
  },
})

interface EnhancedCardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

function EnhancedCardFooter({ className, padding, align, ...props }: EnhancedCardFooterProps) {
  return <div className={cn(cardFooterVariants({ padding, align }), className)} {...props} />
}

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent,
  EnhancedCardFooter,
}
