import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive: "bg-blue-700 text-white hover:bg-blue-800",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-100 hover:text-blue-700",
        secondary: "bg-blue-100 text-blue-900 hover:bg-blue-200",
        ghost: "hover:bg-blue-100 hover:text-blue-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
        ebook: "bg-green-600 text-white hover:bg-green-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          variant !== 'outline' ? 'relative overflow-hidden' : ''
        )}
        ref={ref}
        {...props}
      >
        {props.children}
        {variant !== 'outline' && loading && (
          <span className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-beam-light" />
        )}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

