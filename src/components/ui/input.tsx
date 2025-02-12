import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex  w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs transition-colors file:border-0 h-7 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
           ${hasError && "border-red-500 border focus-visible:ring-0"}`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
