import React from "react";
import { cn } from "@/lib/utils";

type DataSpinnerProps = {
  size?: "xs" | "sm" | "md" | "lg";
  isInputLoader?: boolean;
};

export const DataSpinner = ({
  size = "lg",
  isInputLoader = false
}: DataSpinnerProps) => {
  const sizeClasses = {
    xs: "w-4 h-4 border-2",
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-16 h-16 border-4",
  };
const style = isInputLoader ? "flex items-center w-full h-full relative" : "flex items-center w-full h-full bg-loader fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center";
  return (
    <div className={style}>
      <div
        className={cn(
          sizeClasses[size],
          "border-gray-200 border-t-gray-800 border-solid rounded-full animate-spin"
        )}>
      </div>
    </div>
  );
};
