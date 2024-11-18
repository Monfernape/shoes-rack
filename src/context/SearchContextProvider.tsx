"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

export interface MemberContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchContext = createContext<MemberContextType | undefined>(undefined);

export const MemberContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
