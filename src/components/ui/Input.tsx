import React, { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-[8px] font-bold text-ab-muted uppercase ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex w-full rounded-lg border border-[#262626] bg-black p-2 text-[10px] text-ab-secondary ring-offset-ab-bg placeholder:text-ab-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ab-accent focus-visible:border-transparent transition-all",
            error && "border-red-500/50 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-[10px] text-red-400 ml-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
