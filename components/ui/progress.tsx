"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const progressVariants = cva(
  `w-full h-full transition-all bg-primary`,
  {
    variants: {
      variant: {
        default: `bg-sky-600`,
        success: `bg-emerald-600`
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: 'default' | 'success'
  }
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVariants({ variant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
