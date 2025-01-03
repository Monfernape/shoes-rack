"use client";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useRef } from "react";

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
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSeachIcon = () => {
    onFocused();
    if (searchRef.current !== null) {
      searchRef.current.focus();
    }
  };

  const containerClassNames = [
    "relative flex justify-end transition-all duration-500 ease-out",
    fullWidthOnFocus && isShowIconOnly
      ? "w-full transition-all duration-500 ease-out"
      : "w-8",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClassNames = [
    "p-2 transition-all duration-500 ease-out",
    fullWidthOnFocus && isShowIconOnly ? "w-full" : "",
    "pl-6",
    "md:w-60",
    "rounded",
    "text-xs",
  ]
    .filter(Boolean)
    .join(" ");

  const iconClassNames = [
    "absolute top-1/2 transform -translate-y-1/2 text-gray-600 transition-all duration-500 ease-out",
    fullWidthOnFocus && isShowIconOnly
      ? "left-2 -translate-x-0" 
      : "left-1/2 -translate-x-1/2",
    "md:left-3",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassNames}>
      <Input
        type="search"
        placeholder="Search..."
        data-testid="searchInput"
        ref={searchRef}
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
      <MagnifyingGlassIcon
        onClick={handleSeachIcon}
        className={iconClassNames}
      />
    </div>
  );
};
