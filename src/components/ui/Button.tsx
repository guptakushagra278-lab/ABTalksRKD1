import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
};

export function Button({ 
  children, 
  variant = "primary", 
  fullWidth = false,
  className,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl btn-interactive disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-ab-accent text-ab-accent-fg hover:bg-ab-accent-hover btn-interactive-primary",
    secondary: "bg-ab-btn-secondary-bg text-ab-btn-secondary-fg hover:opacity-80 btn-interactive-secondary",
    outline: "border border-ab-border bg-transparent text-ab-text hover:bg-ab-card hover:border-ab-border-alt btn-interactive-secondary",
    ghost: "bg-transparent text-ab-muted hover:text-ab-text hover:bg-ab-card-alt btn-interactive-ghost",
  };

  const sizes = "px-5 py-2.5 text-xs uppercase";

  return (
    <button 
      className={cn(
        baseStyles,
        variants[variant],
        sizes,
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
