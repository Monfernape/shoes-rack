"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import NavigationButton from "@/common/NavigationButton";
import { Breadcrumbs, Member } from "@/types";
import { MemberRole } from "@/constant/constant";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";
import useDebounce from "@/hooks/useDebounce";
import { Searchbox } from "@/common/SearchBox/SearchBox";
import useMediaQuery from "@/hooks/use-media-query";
interface Props {
  breadcrumbs: Breadcrumbs[];
  user: Member;
}

export const MemberHeader = ({ breadcrumbs, user }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const [isShowIconOnly, setIsShowIconOnly] = useState(false);
  const isMobileScreen = useMediaQuery("sm");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debounceValue) {
      router.push(`${Routes.Members}?key=${debounceValue}`);
    } else {
      router.push(pathname);
    }
  }, [debounceValue, pathname, router]);

  const onFocused = () => {
    setIsShowIconOnly(true);
  };
  const onBlurred = () => {
    setIsShowIconOnly(false);
  };

  return (
    <HeaderWrapper
      isShowBreadCrumbs={!isMobileScreen || !isShowIconOnly}
      breadcrumbs={breadcrumbs}
    >
      {pathname === Routes.Members && (
        <>
          <Searchbox
            isShowIconOnly={isShowIconOnly}
            fullWidthOnFocus={isMobileScreen}
            onFocused={onFocused}
            onBlurred={onBlurred}
            onChange={onChange}
          />
          {user?.role !== MemberRole.Member && (
            <NavigationButton path={Routes.AddMember} buttonText="Add Member" />
          )}
        </>
      )}
    </HeaderWrapper>
  );
};
