import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={cn("bg-ab-card border border-[#262626] rounded-2xl overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("p-4 md:p-5", className)} {...props}>
      {children}
    </div>
  );
}
