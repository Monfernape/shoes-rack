"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import NavigationButton from "@/common/NavigationButton";
import { Breadcrumbs, Member } from "@/types";
import { MemberRole } from "@/constant/constant";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  breadcrumbs: Breadcrumbs[];
  user: Member;
}

export const MemberHeader = ({ breadcrumbs, user }: Props) => {
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
      router.push(`${Routes.Members}?key=${debounceValue}`);
    } else {
      router.push(pathname);
    }
  }, [debounceValue, pathname, router]);

  return (
    <HeaderWrapper breadcrumbs={breadcrumbs}>
      {pathname === Routes.Members && (
        <>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              onFocus={() => setIsTitleHide(true)}
              onBlur={() => setIsTitleHide(false)}
              onChange={handleSearchQueryChange}
              className={`pr-4 py-2 h-7 ${
                isTitleHide ? "w-32 pl-10" : "w-2 pl-6"
              } md:w-60 md:pl-10 rounded text-xs`}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
          </div>
          {user?.role !== MemberRole.Member && (
            <NavigationButton
              path={Routes.AddMember}
              buttonText="Add Member"
            />
          )}
        </>
      )}
    </HeaderWrapper>
  );
};
