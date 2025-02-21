import { Button, type ButtonProps } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface CTAButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: "primary" | "secondary" | "outline" | "ebook"
  icon?: "arrow" | "download"
  fullWidth?: boolean
}

export function CTAButton({ variant, icon, fullWidth, className, children, ...props }: CTAButtonProps) {
  const baseClasses = "relative overflow-hidden group"
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-100 hover:text-blue-700",
    ebook: "bg-green-600 hover:bg-green-700 text-white",
  }

  const IconComponent = icon === "download" ? Download : ArrowRight

  return (
    <Button
      className={cn(baseClasses, variant ? variantClasses[variant] : '', fullWidth ? "w-full" : "", "group animate-pulse", className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {icon && <IconComponent className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
      </span>
      <span className="absolute inset-0 overflow-hidden">
        <span className="cta-highlight" />
      </span>
    </Button>
  )
}

