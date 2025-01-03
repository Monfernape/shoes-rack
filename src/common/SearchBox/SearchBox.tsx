import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";

interface SearchboxProps {
  isShowIconOnly: boolean;
  onFocused: () => void;
  onBlurred: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidthOnFocus: boolean;
}

export const Searchbox = ({
  isShowIconOnly,
  onFocused,
  onBlurred,
  onChange,
  fullWidthOnFocus,
}: SearchboxProps) => {
  // Main container class names with conditional logic
  const containerClassNames = [
    "relative flex justify-end ",
    fullWidthOnFocus && isShowIconOnly ? "w-full transition-all duration-300 ease-in-out" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Calculate the base input width and padding
  const inputClassNames = [
    "p-2 ",
    fullWidthOnFocus && isShowIconOnly ? "w-full transition-all duration-300 ease-in-out" : "w-2",
    "pl-7",
    "md:w-60",
    "rounded",
    "text-xs",
  ]
    .filter(Boolean)
    .join(" ");

  // Calculate the icon position and transformation based on the props
  const iconClassNames = [
    "absolute top-1/2 transform -translate-y-1/2 text-gray-600",
    fullWidthOnFocus && isShowIconOnly
      ? "left-2 -translate-x-0 duration-300 ease-in-out"
      : "left-1/2 -translate-x-1/2 duration-300 ease-in-out",
    "md:left-4",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={containerClassNames}>
      <Input
        type="search"
        placeholder="Search..."
        data-testid="searchInput"
        onFocus={(e) => {
          e.target.placeholder = "Find in view...";
          if (onFocused) onFocused();
        }}
        onBlur={(e) => {
          e.target.placeholder = "Search";
          if (onBlurred) onBlurred();
        }}
        onChange={onChange}
        className={inputClassNames}
      />
      <MagnifyingGlassIcon onClick={()=>{onFocused()}} className={iconClassNames} />
    </div>
  );
};
