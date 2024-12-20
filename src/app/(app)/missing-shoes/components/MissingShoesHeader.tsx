"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import NavigationButton from "@/common/NavigationButton";
import { Breadcrumbs } from "@/types";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface Props {
  breadcrumbs: Breadcrumbs[];
}

export const MissingShoesHeader = ({ breadcrumbs }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const [isTitleHide, setIsTitleHide] = useState(false);

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debounceValue) {
      router.push(`${Routes.MissingShoes}?key=${debounceValue}`);
    } else {
      router.push(pathname);
    }
  }, [debounceValue, pathname, router]);
  return (
    <HeaderWrapper breadcrumbs={breadcrumbs}>
      {pathname === Routes.MissingShoes && (
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              data-testid="searchInput"
              onFocus={() => setIsTitleHide(true)}
              onBlur={() => setIsTitleHide(false)}
              onChange={handleSearchQueryChange}
              className={`pr-4 py-2 h-7 ${
                isTitleHide ? "w-32 pl-10" : "w-2 pl-6"
              } md:w-60 md:pl-10 rounded text-xs`}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
          </div>
          <NavigationButton
            path={Routes.AddMissingShoes}
            buttonText="Add Shoes"
          />
        </div>
      )}
    </HeaderWrapper>
  );
};
