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
    primary: "bg-ab-accent text-black hover:bg-ab-accent-hover btn-interactive-primary",
    secondary: "bg-white text-black hover:bg-gray-100 btn-interactive-secondary",
    outline: "border border-ab-border bg-transparent text-ab-text hover:bg-ab-card hover:border-[#262626] btn-interactive-secondary",
    ghost: "bg-transparent text-ab-muted hover:text-ab-text hover:bg-[#111] btn-interactive-ghost",
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
